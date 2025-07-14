
import React from 'react';
import { Users, Stethoscope, TestTubeDiagonal, Activity, ShieldAlert, MessageCircle } from 'lucide-react';

const ClinicalPhenotypesContent: React.FC = () => {

    return (
  <div className="space-y-6">
            <div className="text-sm text-slate-600 leading-relaxed">
                <p className="mb-4">
                    Les phénotypes cliniques de l'asthme sont des groupes reconnaissables de caractéristiques démographiques, cliniques et/ou pathophysiologiques qui sont souvent utilisés en pratique clinique (GINA 2025, Encadré 3-6).
                </p>
            </div>

            <div className="space-y-4">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <div className="flex items-start">
                        <Users className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={20} />
                        <div>
                            <h3 className="font-semibold text-blue-800 mb-2">Asthme Allergique</h3>
                            <p className="text-sm text-blue-700 leading-relaxed">
                                C'est le phénotype d'asthme le plus facilement reconnaissable, qui commence souvent dans l'enfance et est associé à des antécédents personnels et/ou familiaux de maladie allergique comme l'eczéma, la rhinite allergique, ou une allergie alimentaire ou médicamenteuse. L'examen des expectorations de ces patients avant traitement révèle souvent une inflammation des voies respiratoires à éosinophiles.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                    <div className="flex items-start">
                        <Stethoscope className="text-orange-600 mr-3 mt-1 flex-shrink-0" size={20} />
                        <div>
                            <h3 className="font-semibold text-orange-800 mb-2">Asthme Non Allergique</h3>
                            <p className="text-sm text-orange-700 leading-relaxed">
                                Certains adultes ont un asthme qui n'est pas associé à une allergie. Les expectorations de ces patients peuvent être éosinophiliques, neutrophiliques, ou ne contenir que peu de cellules inflammatoires (paucigranulocytaire). Les patients avec un asthme non allergique répondent souvent moins bien aux corticostéroïdes inhalés.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4 rounded-r-lg">
                    <div className="flex items-start">
                        <MessageCircle className="text-cyan-600 mr-3 mt-1 flex-shrink-0" size={20} />
                        <div>
                            <h3 className="font-semibold text-cyan-800 mb-2">Toux Équivalent d'Asthme (Cough-Variant Asthma)</h3>
                            <p className="text-sm text-cyan-700 leading-relaxed">
                                Une cause fréquente de toux chronique où la toux, typiquement non productive, est le seul symptôme. Le diagnostic est confirmé en démontrant une hyperréactivité bronchique et une réponse positive au traitement de l'asthme.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                    <div className="flex items-start">
                        <Activity className="text-purple-600 mr-3 mt-1 flex-shrink-0" size={20} />
                        <div>
                            <h3 className="font-semibold text-purple-800 mb-2">Asthme à Début Tardif</h3>
                            <p className="text-sm text-purple-700 leading-relaxed">
                                Certains adultes, en particulier les femmes, présentent un asthme pour la première fois à l'âge adulte. Ces patients ont tendance à être non allergiques, et nécessitent souvent des doses plus élevées de CSI ou sont relativement réfractaires au traitement par corticostéroïdes.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                    <div className="flex items-start">
                        <TestTubeDiagonal className="text-green-600 mr-3 mt-1 flex-shrink-0" size={20} />
                        <div>
                            <h3 className="font-semibold text-green-800 mb-2">Asthme avec Obstruction Fixe des Voies Aériennes</h3>
                            <p className="text-sm text-green-700 leading-relaxed">
                                Certains patients avec un asthme de longue date développent une obstruction fixe des voies aériennes que l'on pense due à un remodelage des voies respiratoires. Ces patients ont une réversibilité réduite au bronchodilatateur malgré un traitement par corticostéroïdes oraux.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                    <div className="flex items-start">
                        <ShieldAlert className="text-red-600 mr-3 mt-1 flex-shrink-0" size={20} />
                        <div>
                            <h3 className="font-semibold text-red-800 mb-2">Asthme avec Obésité</h3>
                            <p className="text-sm text-red-700 leading-relaxed">
                                Certains patients obèses asthmatiques ont des symptômes respiratoires importants et peu d'inflammation éosinophilique des voies respiratoires. Ces patients ont souvent des comorbidités et peuvent montrer une amélioration symptomatique moindre avec les médicaments standards contre l'asthme.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <h4 className="font-semibold text-slate-800 mb-2 text-sm">Utilité Clinique</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                    Ces phénotypes peuvent être utiles pour prédire les réponses probables au traitement et les résultats, mais leur utilité clinique est encore en cours d'évaluation. La présence de multiples caractéristiques phénotypiques chez un même patient est courante.
                </p>
            </div>
        </div>
    );
};

export default ClinicalPhenotypesContent;
