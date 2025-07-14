
import React from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { useUIState } from '../../contexts/UIStateContext';
import Button from '../ui/Button';
import { Route, FlaskConical, TestTubeDiagonal, Beaker, Biohazard } from 'lucide-react';
import NonT2TreatmentContent from './modal_content/NonT2TreatmentContent';
import NonBiologicT2TreatmentContent from './modal_content/NonBiologicT2TreatmentContent';
import BiologicTherapyGuideContent from './modal_content/BiologicTherapyGuideContent';


const SevereAsthmaPanel: React.FC = () => {
    const { navigateTo } = useNavigation();
    const { openInfoModal } = useUIState();

    return (
        <div>
            <h2 className="text-lg font-semibold mb-5 text-slate-700">Options pour l'Asthme Sévère :</h2>
            <div className="space-y-3">
                <Button
                    onClick={() => navigateTo('SEVERE_ASTHMA_STAGE_1')}
                    leftIcon={<Route />}
                    variant="primary"
                    fullWidth
                    justify="start"
                    aria-label="Lancer le parcours de l'asthme sévère"
                >
                    Parcours Asthme Sévère
                </Button>
                <Button
                    onClick={() => openInfoModal("Autres Traitements (Non-Type 2)", <NonT2TreatmentContent />)}
                    leftIcon={<TestTubeDiagonal />}
                    variant="secondary"
                    fullWidth
                    justify="start"
                    aria-label="Voir les autres traitements en l'absence d'inflammation de Type 2"
                >
                    Autres Traitements (Non-Type 2)
                </Button>
                 <Button
                    onClick={() => openInfoModal("Options Non Biologiques (Type 2)", <NonBiologicT2TreatmentContent />)}
                    leftIcon={<Beaker />}
                    variant="secondary"
                    fullWidth
                    justify="start"
                    aria-label="Voir les options non biologiques en cas d'inflammation de Type 2"
                >
                    Options non biologiques (Type 2)
                </Button>
                 <Button
                    onClick={() => openInfoModal("Guide pour la Thérapie Biologique (Asthme Type 2)", <BiologicTherapyGuideContent />)}
                    leftIcon={<Biohazard />}
                    variant="secondary"
                    fullWidth
                    justify="start"
                    aria-label="Guide pour sélectionner une thérapie biologique ciblée de Type 2"
                >
                    Guide des Thérapies Biologiques
                </Button>
            </div>
        </div>
    );
};

export default SevereAsthmaPanel;