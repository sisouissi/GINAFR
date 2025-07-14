

import React from 'react';
import { ClipboardList, TrendingUp } from '../../../constants/icons';

const SectionCard: React.FC<{ title: string, icon: React.ReactElement, children: React.ReactNode }> = ({ title, icon, children }) => {
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
        <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center text-md">
                {clonedIcon}
                {title}
            </h3>
            <div className="pl-[30px] space-y-3 text-slate-700 text-sm">
                {children}
            </div>
        </div>
    );
};

const Box12Content: React.FC = () => {
  return (
    <div className="space-y-5">
      <SectionCard title="Tableau des Symptômes" icon={<ClipboardList className="text-sky-600" />}>
         <p>Le diagnostic est suggéré par une anamnèse de symptômes caractéristiques :</p>
         <ul className="list-disc list-inside space-y-1">
            <li>Sifflements</li>
            <li>Essoufflement</li>
            <li>Oppression thoracique</li>
            <li>Toux</li>
         </ul>
         <p>Ces symptômes typiquement :</p>
         <ul className="list-disc list-inside space-y-1">
            <li>Varient dans le temps et en intensité.</li>
            <li>Sont souvent pires la nuit ou au réveil.</li>
            <li>Sont déclenchés par des facteurs comme l'exercice, le rire, les allergènes ou l'air froid.</li>
            <li>Apparaissent ou s'aggravent fréquemment avec les infections virales.</li>
         </ul>
      </SectionCard>
      
      <SectionCard title="Confirmation par la Variabilité de la Fonction Pulmonaire" icon={<TrendingUp className="text-emerald-600" />}>
         <p>Le diagnostic doit être confirmé par une preuve documentée de variabilité excessive de la fonction pulmonaire. L'un des éléments suivants peut être utilisé :</p>
          <ul className="space-y-2">
              <li><strong>Réversibilité positive au bronchodilatateur (BD) :</strong>
                  <span className="block text-xs pl-4 text-slate-600">{'Adultes : Augmentation du VEMS >12% et >200mL. Enfants : Augmentation du VEMS >12% de la valeur prédite.'}</span>
              </li>
              <li><strong>Variabilité excessive du DEP :</strong>
                  <span className="block text-xs pl-4 text-slate-600">{'Adultes : Variabilité diurne quotidienne >10%. Enfants : >13%.'}</span>
              </li>
              <li><strong>Augmentation significative du VEMS après 4 semaines de traitement de fond :</strong>
                   <span className="block text-xs pl-4 text-slate-600">{'Adultes : Augmentation >12% et >200mL.'}</span>
              </li>
              <li><strong>Test de provocation à l'effort positif :</strong>
                   <span className="block text-xs pl-4 text-slate-600">{'Adultes : Chute du VEMS >10% et >200mL. Enfants : Chute du VEMS >12%.'}</span>
              </li>
              <li><strong>Test de provocation bronchique positif :</strong>
                   <span className="block text-xs pl-4 text-slate-600">{'Chute du VEMS >=20% avec la méthacholine/histamine.'}</span>
              </li>
               <li><strong>Variation excessive de la fonction pulmonaire entre les visites :</strong>
                   <span className="block text-xs pl-4 text-slate-600">{'Adultes : Variation du VEMS >12% et >200mL.'}</span>
              </li>
          </ul>
      </SectionCard>
    </div>
  );
};

export default Box12Content;
