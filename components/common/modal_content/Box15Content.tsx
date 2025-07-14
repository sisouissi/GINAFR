

import React from 'react';
import { HelpCircle, TrendingUp, ListChecks, Droplets, ShieldCheck, ArrowRight } from '../../../constants/icons';

const Step: React.FC<{
  stepNumber: number;
  title: string;
  icon: React.ReactElement;
  children: React.ReactNode;
}> = ({ stepNumber, title, icon, children }) => {
  let clonedIcon = null;
  if (icon) {
      const existingClassName = (icon.props as any).className || '';
      let newClassName = 'mr-2.5';
      if (existingClassName) newClassName += ' ' + existingClassName;

      const iconProps = {
        size: 20,
        className: newClassName,
      };
      clonedIcon = React.cloneElement(icon as React.ReactElement<any>, iconProps);
  }

  return (
    <div className="flex items-start">
      <div className="flex flex-col items-center mr-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 text-slate-600 font-bold text-lg">
          {stepNumber}
        </div>
        {stepNumber < 5 && <div className="w-px h-12 bg-slate-300 my-1"></div>}
      </div>
      <div className="flex-1 p-4 bg-white rounded-lg border border-slate-200 shadow-sm mt-1">
        <h3 className="font-semibold text-slate-800 mb-2 flex items-center text-md">
            {clonedIcon}
            {title}
        </h3>
        <div className="text-slate-700 text-sm space-y-2">
            {children}
        </div>
      </div>
    </div>
  );
};


const Box15Content: React.FC = () => {
    return (
        <div className="space-y-0">
            <p className="text-sm text-slate-600 mb-6">
                Confirmer un diagnostic d'asthme est un processus de collecte de preuves. Suivez ces étapes pour une approche structurée basée sur les recommandations du GINA.
            </p>

            <Step stepNumber={1} title="Suspicion Clinique" icon={<HelpCircle className="text-sky-600" />}>
                <p>Commencez par une anamnèse détaillée des symptômes respiratoires (sifflements, toux, essoufflement, oppression thoracique).</p>
                <ul className="list-disc list-inside pl-2">
                    <li>Les symptômes sont-ils variables dans le temps et en intensité ?</li>
                    <li>Y a-t-il des déclencheurs typiques (ex: exercice, allergènes, infections virales) ?</li>
                    <li>Y a-t-il des antécédents personnels ou familiaux d'atopie (asthme, eczéma, rhinite allergique) ?</li>
                </ul>
            </Step>

            <Step stepNumber={2} title="Test Objectif (Spirométrie)" icon={<TrendingUp className="text-emerald-600" />}>
                <p>Effectuez une spirométrie avec un test de bronchodilatation (BD). Un test de réversibilité positif est une preuve solide de l'asthme.</p>
                <p className="text-xs text-slate-500">Si le test est négatif, cela n'exclut pas l'asthme, surtout si le patient va bien au moment du test ou est déjà sous traitement.</p>
            </Step>

            <Step stepNumber={3} title="Autres Tests Objectifs" icon={<ListChecks className="text-amber-600" />}>
                <p>Si la spirométrie initiale n'est pas diagnostique, envisagez d'autres tests pour documenter la limitation variable du débit aérien :</p>
                <ul className="list-disc list-inside pl-2">
                    <li><strong>Suivi du DEP :</strong> Évaluer la variabilité diurne sur 2 semaines.</li>
                    <li><strong>Test de Provocation Bronchique :</strong> Avec de la méthacholine ou à l'effort, si disponible et sûr.</li>
                    <li><strong>Essai Thérapeutique :</strong> Un essai de CSI pendant 4-8 semaines, avec une mesure objective de la fonction pulmonaire avant et après, peut être diagnostique.</li>
                </ul>
            </Step>

            <Step stepNumber={4} title="Évaluation de l'Inflammation de Type 2" icon={<Droplets className="text-red-500" />}>
                 <p>La mesure des biomarqueurs comme le FeNO ou les éosinophiles sanguins est recommandée.</p>
                 <ul className="list-disc list-inside pl-2">
                    <li>Des marqueurs élevés soutiennent un diagnostic d'asthme de type 2.</li>
                    <li>Ils prédisent fortement une bonne réponse aux CSI, ce qui peut accroître la confiance dans un essai thérapeutique.</li>
                </ul>
            </Step>

            <Step stepNumber={5} title="Synthèse et Conclusion" icon={<ShieldCheck className="text-violet-600" />}>
                <p>Combinez toutes les preuves pour parvenir à une conclusion diagnostique finale :</p>
                <div className="mt-2 space-y-2">
                    <div className="flex items-start"><ArrowRight size={14} className="mr-2 mt-1 text-emerald-600 flex-shrink-0" /><div><strong>Diagnostic Confirmé :</strong> Symptômes typiques + preuve objective de limitation variable du débit aérien.</div></div>
                    <div className="flex items-start"><ArrowRight size={14} className="mr-2 mt-1 text-red-600 flex-shrink-0" /><div><strong>Diagnostic Improbable :</strong> Symptômes atypiques ET tests de fonction pulmonaire constamment normaux. Investiguer d'autres pistes.</div></div>
                     <div className="flex items-start"><ArrowRight size={14} className="mr-2 mt-1 text-amber-600 flex-shrink-0" /><div><strong>Diagnostic Incertain :</strong> Résultats incohérents. Peut nécessiter une orientation vers un spécialiste ou une observation plus approfondie.</div></div>
                </div>
            </Step>
        </div>
    );
};

export default Box15Content;
