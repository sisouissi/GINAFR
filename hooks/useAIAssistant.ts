
import { useState, useCallback } from 'react';
import { ChatMessage } from '../types';

export const useAIAssistant = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (userMessage: string) => {
    if (!userMessage.trim()) return;

    setError(null);
    setIsLoading(true);

    const newUserMessage: ChatMessage = {
      role: 'user',
      parts: [{ text: userMessage }],
    };
    
    const historyForAPI = [...messages, newUserMessage];

    // Add user message and a temporary model message for the UI
    setMessages(prev => [...prev, newUserMessage, { role: 'model', parts: [{ text: '' }] }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ history: historyForAPI }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({ error: `Erreur HTTP ! Statut : ${response.status}` }));
        throw new Error(errData.error || `Erreur HTTP ! Statut : ${response.status}`);
      }

      if (!response.body) {
        throw new Error("Le corps de la réponse est vide.");
      }
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      let done = false;
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunkText = decoder.decode(value);
          setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage && lastMessage.role === 'model') {
              lastMessage.parts[0].text += chunkText;
            }
            return newMessages;
          });
        }
      }

    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Une erreur inconnue est survenue.';
      console.error("Erreur de l'assistant IA:", errorMessage);
      setError(`Erreur de communication avec le service d'IA. Veuillez réessayer. Détails : ${errorMessage}`);
      setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if(lastMessage && lastMessage.role === 'model' && lastMessage.parts[0].text === '') {
              return newMessages.slice(0, -1);
          }
          return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  return { messages, isLoading, error, sendMessage };
};