
import React from 'react';
import AssessmentCard from './AssessmentCard';
import Button from '../../ui/Button';
import { useNavigation } from '../../../contexts/NavigationContext';
import { BarChart3, ChevronRight } from 'lucide-react';

const Stage9_MonitorResponse: React.FC = () => {
  const { navigateTo } = useNavigation();
  return (
    <AssessmentCard title="Suivre et Gérer le Traitement de l'Asthme Sévère" icon={<BarChart3 />}>
        
        <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-md mb-6">
            <h3 className="font-semibold text-green-800 text-lg mb-2">En cas de bonne réponse à la thérapie ciblée de Type 2</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-green-700 pl-4">
                <li>Réévaluer le patient tous les 3 à 6 mois.</li>
                <li>D'abord, envisager de diminuer/arrêter les CSO (et vérifier l'insuffisance surrénalienne), puis envisager d'arrêter les autres médicaments d'appoint pour l'asthme.</li>
                <li>L'ordre de réduction des traitements est basé sur le bénéfice observé, les effets secondaires potentiels, le coût et la préférence du patient.</li>
                <li>Ensuite, si l'asthme est bien contrôlé pendant 3 à 6 mois, envisager de réduire la dose de fond de CSI-BALA, mais ne pas arrêter le CSI-BALA de fond.</li>
                <li>Pour la plupart des patients, la thérapie biologique doit être poursuivie.</li>
            </ul>
        </div>
        
        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-md">
            <h3 className="font-semibold text-red-800 text-lg mb-2">En cas d'absence de bonne réponse à la thérapie ciblée de Type 2</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-red-700 pl-4">
                <li>Arrêter la thérapie biologique.</li>
                <li>Revoir les bases : diagnostic différentiel, technique d'inhalation, observance, comorbidités, effets secondaires, soutien émotionnel.</li>
                <li>Envisager une TDM thoracique haute résolution (si non faite).</li>
                <li>
                    Réévaluer le phénotype et les options de traitement
                    <ul className="list-circle list-inside pl-5 mt-1">
                        <li>Expectorations induites (si disponible).</li>
                        <li>Envisager d'ajouter de l'azithromycine à faible dose.</li>
                        <li>Envisager une bronchoscopie pour des diagnostics alternatifs/supplémentaires.</li>
                        <li>En dernier recours, envisager d'ajouter des CSO à faible dose, mais mettre en œuvre des stratégies pour minimiser les effets secondaires.</li>
                        <li>Envisager la thermoplastie bronchique (+ inscription au registre).</li>
                    </ul>
                </li>
                 <li>Arrêter les thérapies d'appoint inefficaces.</li>
                <li>Ne pas arrêter les CSI.</li>
            </ul>
        </div>
        
        <p className="text-xs text-slate-500 text-center mt-6">
            Référence : Rapport GINA 2025, Encadré 8-5, p. 145
        </p>

        <div className="mt-6 border-t border-slate-200 pt-5 text-center">
            <Button 
                onClick={() => navigateTo('SEVERE_ASTHMA_STAGE_10')}
                variant="primary"
                size="lg"
                rightIcon={<ChevronRight />}
            >
                Étape Suivante : Soins Continus
            </Button>
        </div>

    </AssessmentCard>
  );
};

export default Stage9_MonitorResponse;