
import { GoogleGenAI } from '@google/genai';
import { GINA_DOCUMENT_TEXT } from '../constants/ginaDocumentText';
import type { ChatMessage } from '../types';

export const config = {
  runtime: 'edge',
};

// This function will only run on the server, where process.env is available.
// We wrap the initialization in a check to be robust, in case of build misconfigurations.
let ai: GoogleGenAI | null = null;
if (typeof window === 'undefined') {
    if (!process.env.API_KEY) {
        // This log helps in debugging Vercel environment variable setup.
        console.error("La variable d'environnement API_KEY n'est pas définie pour la fonction serverless.");
        // We don't throw an error here to prevent build failures, 
        // the handler will return an error response instead.
    } else {
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
}


const systemInstructionText = `Vous êtes un assistant IA expert pour les professionnels de la santé, spécialisé dans le rapport GINA (Global Initiative for Asthma) 2025. Votre UNIQUE source d'information est le document GINA 2025 fourni ci-dessous dans les balises <document>.

Vos tâches sont :
1.  Répondre aux questions de manière précise et concise en vous basant *uniquement* sur le contenu du document GINA 2025 fourni.
2.  Si la réponse se trouve dans le document, fournissez la réponse et, si possible, citez la section ou le numéro de page pertinent (par exemple, "selon l'Encadré 4-5 du GINA à la p.77...").
3.  Si l'utilisateur pose une question à laquelle il est impossible de répondre à l'aide du document fourni, vous DEVEZ répondre : "Je suis désolé, mais je ne peux pas répondre à cette question car l'information ne se trouve pas dans le guide GINA 2025 qui m'a été fourni."
4.  Ne répondez à aucune question non liée à la prise en charge de l'asthme ou aux directives GINA. N'utilisez aucune connaissance externe.
5.  Formatez vos réponses en utilisant Markdown pour plus de clarté (par exemple, utilisez des listes, du texte en gras).

<document>
${GINA_DOCUMENT_TEXT}
</document>
`;

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Méthode non autorisée', { status: 405 });
  }
  
  // Check if the AI client was initialized (i.e., if API_KEY was available on the server).
  if (!ai) {
    console.error("Client IA non initialisé. Vérifiez la variable d'environnement API_KEY.");
    return new Response(JSON.stringify({ error: "Le service d'IA n'est pas configuré correctement sur le serveur." }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { history } = await req.json() as { history: ChatMessage[] };

    if (!Array.isArray(history)) {
      return new Response('Corps de la requête invalide : "history" doit être un tableau.', { status: 400 });
    }

    const geminiStream = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: history,
      config: {
        systemInstruction: systemInstructionText,
      },
    });

    const responseStream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder();
            for await (const chunk of geminiStream) {
                const text = chunk.text;
                if(text) {
                    controller.enqueue(encoder.encode(text));
                }
            }
            controller.close();
        }
    });

    return new Response(responseStream, {
      headers: { 
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Erreur dans le gestionnaire de chat IA:', error);
    const errorMessage = error instanceof Error ? error.message : 'Une erreur interne est survenue.';
    return new Response(JSON.stringify({ error: `Erreur du serveur : ${errorMessage}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}