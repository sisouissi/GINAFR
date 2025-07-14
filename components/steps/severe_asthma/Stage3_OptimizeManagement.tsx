
import React from 'react';
import { useNavigation } from '../../../contexts/NavigationContext';
import AssessmentCard from './AssessmentCard';
import Button from '../../ui/Button';
import { Heart, Calendar, ChevronRight } from 'lucide-react';

const Stage3_OptimizeManagement: React.FC = () => {
  const { navigateTo } = useNavigation();
  return (
    <div>
        <AssessmentCard title="Optimiser la Prise en Charge" icon={<Heart />}>
        <div className="space-y-4">
            <h4 className="font-semibold text-lg text-slate-800">Étapes Clés d'Optimisation :</h4>
            <ul className="space-y-3 text-sm text-slate-700 list-disc list-inside">
            <li>Confirmer et corriger la technique d'inhalation avec une démonstration physique.</li>
            <li>Aborder les obstacles à l'observance (ex: coût, complexité, craintes d'effets secondaires, croyances).</li>
            <li>Fournir un plan d'action écrit pour l'asthme et s'assurer qu'il est compris.</li>
            <li>Envisager le CSI-formotérol en MART si disponible et approprié pour simplifier le schéma thérapeutique.</li>
            <li>Traiter activement les comorbidités identifiées (ex: RSCaPN, RGO, SAOS).</li>
            <li>Aborder les facteurs de risque modifiables (ex: arrêt du tabac, éviction des allergènes).</li>
            <li>Envisager des interventions non pharmacologiques (ex: activité physique, perte de poids).</li>
            <li>Assurer un essai de CSI-BALA à haute dose pendant 3-6 mois si non déjà utilisé.</li>
            </ul>
        </div>
        </AssessmentCard>
        <div className="mt-6 p-4 rounded-lg border border-sky-200 bg-sky-50">
            <div className="flex items-start">
                <Calendar className="text-sky-600 mr-3 mt-1 flex-shrink-0" size={24}/>
                <div>
                    <h4 className="font-semibold text-sky-800">Laisser du Temps aux Interventions</h4>
                    <p className="text-sm text-sky-700 mt-1">
                        Les interventions listées ci-dessus doivent être mises en œuvre. Planifiez un rendez-vous de suivi dans <strong>3 à 6 mois</strong> pour évaluer la réponse du patient à cette prise en charge optimisée.
                    </p>
                </div>
            </div>
             <div className="mt-6 border-t border-sky-300 pt-4">
                 <Button 
                    onClick={() => navigateTo('SEVERE_ASTHMA_STAGE_4')}
                    fullWidth
                    size="lg"
                    variant="primary"
                    rightIcon={<ChevronRight />}
                 >
                    Procéder à la Réévaluation de la Réponse (après 3-6 mois)
                </Button>
            </div>
        </div>
    </div>
  );
};

export default Stage3_OptimizeManagement;