
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface AccordionSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  content: string;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ title, isOpen, onToggle, content }) => {
  return (
    <div className="border border-slate-200 rounded-lg mb-2">
      <button
        onClick={onToggle}
        className="w-full p-4 text-left bg-slate-50 hover:bg-slate-100 transition-colors duration-200 flex items-center justify-between"
      >
        <span className="font-medium text-slate-800">{title}</span>
        {isOpen ? (
          <ChevronDown size={20} className="text-slate-600" />
        ) : (
          <ChevronRight size={20} className="text-slate-600" />
        )}
      </button>
      {isOpen && (
        <div className="p-4 bg-white border-t border-slate-200">
          <p className="text-slate-700 text-sm leading-relaxed">{content}</p>
        </div>
      )}
    </div>
  );
};

const NonPharmacologicalStrategyContent: React.FC = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const strategies = [
    {
      id: 'smoking-cessation',
      intervention: 'Arrêt du Tabac/Vapotage',
      recommendation: "Conseiller vivement d'arrêter de fumer et fournir des ressources de soutien, y compris des conseils, des interventions comportementales et une pharmacothérapie appropriée (thérapies de substitution nicotinique, varénicline ou bupropion). Éviter l'exposition au tabagisme passif. L'arrêt du tabac est l'intervention la plus importante pour améliorer le contrôle de l'asthme et prévenir la progression de la maladie."
    },
    {
      id: 'physical-activity',
      intervention: 'Activité Physique et Exercice',
      recommendation: "Encourager une activité physique régulière dans le cadre d'un mode de vie sain. Fournir des conseils sur la prévention de la bronchoconstriction induite par l'exercice par un échauffement approprié, l'utilisation d'un bronchodilatateur avant l'effort si nécessaire, et le choix d'activités adaptées. La natation et d'autres activités d'endurance sont particulièrement bénéfiques."
    },
    {
      id: 'trigger-management',
      intervention: 'Identification et Éviction des Déclencheurs',
      recommendation: "Identifier systématiquement et aider les patients à éviter les déclencheurs confirmés, y compris : les allergènes (acariens, squames d'animaux, pollen, moisissures), les expositions professionnelles, les polluants atmosphériques, les infections respiratoires, les médicaments (aspirine, AINS, bêta-bloquants) et le stress émotionnel. Fournir des stratégies d'éviction spécifiques pour chaque déclencheur identifié."
    },
    {
      id: 'action-plan',
      intervention: 'Plan d\'Action Écrit pour l\'Asthme',
      recommendation: "Fournir à chaque patient un plan d'action personnalisé et écrit pour l'asthme qui comprend : les instructions de gestion quotidienne, comment reconnaître l'aggravation de l'asthme, les mesures spécifiques à prendre lors d'une exacerbation, quand chercher des soins d'urgence et les coordonnées d'urgence. Revoir et mettre à jour le plan régulièrement."
    },
    {
      id: 'weight-management',
      intervention: 'Gestion du Poids',
      recommendation: "Pour les patients en surpoids ou obèses, fournir un soutien pour atteindre et maintenir un poids santé par des conseils diététiques appropriés et une activité physique. La perte de poids peut améliorer le contrôle de l'asthme, réduire les besoins en médicaments et améliorer la qualité de vie chez les patients obèses asthmatiques."
    },
    {
      id: 'inhaler-technique',
      intervention: 'Formation à la Technique d\'Inhalation',
      recommendation: "Fournir une formation complète sur la technique d'inhalation correcte à chaque visite. Utiliser une démonstration physique, une contre-démonstration par le patient, et fournir des instructions écrites. Vérifier la technique régulièrement car elle se détériore avec le temps. Une mauvaise technique d'inhalation est une cause majeure d'échec du traitement."
    },
    {
      id: 'medication-adherence',
      intervention: 'Soutien à l\'Observance Médicamenteuse',
      recommendation: "Évaluer et surmonter les obstacles à l'observance médicamenteuse, y compris le coût, les effets secondaires, la complexité du régime et les croyances du patient sur les médicaments. Fournir une éducation sur l'importance des médicaments de fond même en l'absence de symptômes. Envisager des aides à l'observance et des régimes simplifiés si approprié."
    },
    {
      id: 'environmental-control',
      intervention: 'Contrôle de l\'Environnement Intérieur',
      recommendation: "Conseiller sur la réduction des allergènes et irritants intérieurs : utiliser des housses anti-acariens pour la literie, laver la literie chaque semaine à l'eau chaude, maintenir une faible humidité (30-50%), assurer une ventilation adéquate, éviter les tapis dans les chambres, et utiliser des filtres HEPA. Traiter les problèmes de moisissures et réduire l'exposition aux composés organiques volatils."
    },
    {
      id: 'dietary-considerations',
      intervention: 'Facteurs Diététiques et Nutritionnels',
      recommendation: "Encourager une alimentation équilibrée riche en fruits et légumes, qui peut avoir des effets protecteurs. Identifier et éviter les déclencheurs alimentaires spécifiques chez les patients ayant des allergies alimentaires confirmées. Envisager une supplémentation en vitamine D chez les patients carencés. Éviter les aliments et boissons contenant des sulfites chez les personnes sensibles."
    },
    {
      id: 'stress-management',
      intervention: 'Gestion du Stress et Soutien Psychologique',
      recommendation: "Évaluer l'anxiété, la dépression et les déclencheurs liés au stress. Fournir des techniques de gestion du stress, y compris des exercices de relaxation, des techniques de respiration et la pleine conscience. Envisager une orientation vers des professionnels de la santé mentale si indiqué. Aborder les barrières psychologiques à l'auto-gestion de l'asthme."
    },
    {
      id: 'education-selfmanagement',
      intervention: 'Éducation du Patient et Auto-gestion',
      recommendation: "Fournir une éducation complète sur l'asthme couvrant : la compréhension de la maladie, les objectifs du traitement, les buts des médicaments et leur utilisation correcte, les techniques de surveillance (débit de pointe, suivi des symptômes), la reconnaissance et l'éviction des déclencheurs, et quand demander de l'aide. Utiliser du matériel éducatif culturellement approprié et vérifier régulièrement la compréhension."
    },
    {
      id: 'occupational-factors',
      intervention: 'Facteurs Professionnels et Environnementaux',
      recommendation: "Identifier les déclencheurs et les expositions liés au travail. Fournir des conseils sur les modifications du lieu de travail, l'utilisation d'équipements de protection individuelle, et quand envisager une modification ou un changement de poste. Aborder les problèmes de qualité de l'air intérieur et extérieur. Conseiller sur le moment des activités de plein air en fonction de la qualité de l'air et des prévisions polliniques."
    }
  ];

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      <div className="sticky top-0 bg-white pb-2 border-b border-slate-200">
        <p className="text-sm text-slate-600">
          Les interventions non pharmacologiques sont des composantes essentielles d'une prise en charge complète de l'asthme. 
          Ces stratégies fondées sur des preuves complètent le traitement médicamenteux et peuvent améliorer significativement le contrôle de l'asthme, 
          réduire les exacerbations et améliorer la qualité de vie.
        </p>
      </div>
      
      <div className="space-y-2">
        {strategies.map((strategy) => (
          <AccordionSection
            key={strategy.id}
            title={strategy.intervention}
            isOpen={openSections[strategy.id] || false}
            onToggle={() => toggleSection(strategy.id)}
            content={strategy.recommendation}
          />
        ))}
      </div>
      
      <div className="mt-6 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-md">
        <p className="text-blue-800 text-sm">
          <strong>Important :</strong> Ces stratégies non pharmacologiques doivent être mises en œuvre parallèlement 
          à un traitement pharmacologique approprié, et non en remplacement des médicaments nécessaires. La combinaison 
          des deux approches assure une prise en charge optimale de l'asthme.
        </p>
      </div>
      
      <div className="mt-4 p-3 bg-green-50 border-l-4 border-green-400 rounded-r-md">
        <p className="text-green-800 text-sm">
          <strong>Mise en œuvre :</strong> Prioriser les interventions en fonction des besoins individuels du patient, 
          de ses préférences et des déclencheurs identifiés. Un suivi régulier est essentiel pour évaluer l'efficacité 
          et effectuer les ajustements nécessaires.
        </p>
      </div>
      
      <p className="text-xs text-slate-500 text-center mt-4">Référence : Rapport de Stratégie GINA 2025</p>
    </div>
  );
};

export default NonPharmacologicalStrategyContent;