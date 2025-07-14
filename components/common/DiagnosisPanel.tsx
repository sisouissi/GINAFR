

import React from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { useUIState } from '../../contexts/UIStateContext';
import Button from '../ui/Button';
import { Route, FileText, Activity, AlertTriangle, ShieldAlert, ShieldCheck, TrendingDown } from 'lucide-react';
import Box12Content from './modal_content/Box12Content';
import Box13Content from './modal_content/Box13Content';
import Box14Content from './modal_content/Box14Content';
import Box15Content from './modal_content/Box15Content';
import BiomarkersContent from './modal_content/BiomarkersContent';

const DiagnosisPanel: React.FC = () => {
    const { navigateTo } = useNavigation();
    const { openInfoModal } = useUIState();

    return (
        <div>
            <h2 className="text-lg font-semibold mb-5 text-slate-700">Options de Diagnostic :</h2>
            <div className="space-y-3">
                <Button
                    onClick={() => navigateTo('INITIAL_DIAGNOSIS_FLOWCHART_STEP')}
                    leftIcon={<Route />}
                    variant="primary"
                    fullWidth
                    justify="start"
                    aria-label="Faire le diagnostic initial (Organigramme)"
                >
                    Faire le diagnostic initial
                </Button>
                <Button
                    onClick={() => openInfoModal("Critères pour le diagnostic initial (Encadré 1-2)", <Box12Content />)}
                    leftIcon={<FileText />}
                    variant="secondary"
                    fullWidth
                    justify="start"
                    aria-label="Voir les critères pour le diagnostic initial"
                >
                    Critères du diagnostic initial
                </Button>
                <Button
                    onClick={() => openInfoModal("Patient déjà sous traitement par CSI (Encadré 1-4)", <Box14Content />)}
                    leftIcon={<ShieldAlert />}
                    variant="secondary"
                    fullWidth
                    justify="start"
                    aria-label="Voir les conseils pour un patient déjà sous traitement contenant des CSI"
                >
                    Patient sous traitement par CSI
                </Button>
                <Button
                    onClick={() => openInfoModal("Confirmation du diagnostic (Encadré 1-5)", <Box15Content />)}
                    leftIcon={<ShieldCheck />}
                    variant="secondary"
                    fullWidth
                    justify="start"
                    aria-label="Voir l'approche par étapes pour confirmer le diagnostic"
                >
                    Confirmation du diagnostic
                </Button>
                <Button
                    onClick={() => navigateTo('STEP_DOWN_ASSESS_STEP')}
                    leftIcon={<TrendingDown />}
                    variant="secondary"
                    fullWidth
                    justify="start"
                    aria-label="Diminuer le traitement par CSI"
                >
                    Diminuer le traitement par CSI
                </Button>
                <Button
                    onClick={() => openInfoModal("Rôle des biomarqueurs de type 2", <BiomarkersContent />)}
                    leftIcon={<Activity />}
                    variant="secondary"
                    fullWidth
                    justify="start"
                    aria-label="Voir le rôle des biomarqueurs de type 2"
                >
                    Rôle des biomarqueurs de type 2
                </Button>
                <Button
                    onClick={() => openInfoModal("Diagnostic différentiel de l'asthme (GINA 2025, Encadré 1-3)", <Box13Content />)}
                    leftIcon={<AlertTriangle />}
                    variant="secondary"
                    fullWidth
                    justify="start"
                    aria-label="Voir le diagnostic différentiel"
                >
                    Diagnostic différentiel
                </Button>
            </div>
        </div>
    );
};

export default DiagnosisPanel;
