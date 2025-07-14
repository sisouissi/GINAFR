

export interface Abbreviation {
  abbr: string;
  full: string;
  description?: string; // Clarification supplémentaire facultative
}

export const abbreviationsList: Abbreviation[] = [
  { abbr: 'ACQ', full: 'Questionnaire sur le Contrôle de l\'Asthme', description: "Questionnaire pour évaluer le contrôle de l'asthme." },
  { abbr: 'ACT', full: 'Test de Contrôle de l\'Asthme', description: "Test pour évaluer le contrôle de l'asthme." },
  { abbr: 'AIR', full: 'Traitement de Secours Anti-Inflammatoire', description: 'Un inhalateur de secours contenant à la fois un bronchodilatateur et un médicament anti-inflammatoire (CSI).' },
  { abbr: 'API', full: 'Indice Prédictif d\'Asthme', description: "Utilisé chez les jeunes enfants pour prédire la probabilité d'asthme." },
  { abbr: 'BD', full: 'Bronchodilatateur', description: 'Type de médicament qui facilite la respiration en relaxant les muscles des poumons et en élargissant les voies aériennes (bronches).' },
  { abbr: 'BPCO', full: 'Bronchopneumopathie Chronique Obstructive', description: "Maladie pulmonaire chronique qui obstrue le flux d'air des poumons." },
  { abbr: 'CRSwNP', full: 'Rhinosinusite Chronique avec Polypes Nasaux' },
  { abbr: 'CRSsNP', full: 'Rhinosinusite Chronique sans Polypes Nasaux' },
  { abbr: 'DPI', full: 'Inhalateur de Poudre Sèche', description: "Dispositif d'inhalation délivrant le médicament sous forme de poudre sèche." },
  { abbr: 'ECG', full: 'Électrocardiogramme', description: 'Test qui enregistre le signal électrique du cœur pour vérifier différentes conditions cardiaques.' },
  { abbr: 'SU', full: 'Service des Urgences', description: "Département hospitalier pour les urgences médicales." },
  { abbr: 'FeNO', full: 'Fraction d\'Oxyde Nitrique Exhalé', description: "Un marqueur de l'inflammation des voies aériennes de type 2." },
  { abbr: 'VEMS', full: 'Volume Expiratoire Maximal par Seconde', description: "Volume d'air expiré dans la première seconde d'une expiration forcée, mesuré par spirométrie." },
  { abbr: 'RGO', full: 'Reflux Gastro-Œsophagien', description: "Remontée du contenu de l'estomac dans l'œsophage." },
  { abbr: 'GINA', full: 'Initiative Mondiale pour l\'Asthme', description: "L'organisation qui produit le rapport de stratégie mondiale pour la gestion de l'asthme." },
  { abbr: 'HDM', full: 'Acarien de la Poussière de Maison', description: "Un allergène d'intérieur courant." },
  { abbr: 'USI', full: 'Unité de Soins Intensifs', description: "Département hospitalier pour les patients gravement malades nécessitant une surveillance et des soins intensifs." },
  { abbr: 'CSI', full: 'Corticostéroïde Inhalé', description: "Médicament anti-inflammatoire de base dans le traitement de l'asthme." },
  { abbr: 'IgE', full: 'Immunoglobuline E', description: "Type d'anticorps impliqué dans les réactions allergiques." },
  { abbr: 'IL', full: 'Interleukine', description: "Type de cytokine (protéine de signalisation) impliquée dans l'inflammation." },
  { abbr: 'IL4R', full: 'Récepteur de l\'Interleukine-4', description: 'La cible du dupilumab, une thérapie biologique.' },
  { abbr: 'IL5/5R', full: 'Interleukine-5/Récepteur de l\'Interleukine-5', description: 'Les cibles du mépolizumab, reslizumab et benralizumab, des thérapies biologiques.' },
  { abbr: 'IV', full: 'Intraveineux', description: 'Relatif à l\'administration de substances directement dans une veine.' },
  { abbr: 'BALA', full: 'Bêta-2-agoniste à Longue Durée d\'Action', description: "Médicament de fond pour l'asthme, toujours utilisé en association avec un CSI." },
  { abbr: 'AMLA', full: 'Antagoniste Muscarinique à Longue Durée d\'Action', description: "Un autre type de bronchodilatateur à longue durée d'action utilisé comme traitement de fond d'appoint." },
  { abbr: 'ARLT', full: 'Antagoniste des Récepteurs aux Leucotriènes', description: "Classe de médicaments de fond oraux (ex: Montélukast)." },
  { abbr: 'MART', full: 'Thérapie de Fond et de Secours', description: "Stratégie de traitement où le même inhalateur ICS-formotérol est utilisé pour le traitement de fond et de secours." },
  { abbr: 'AINS', full: 'Anti-inflammatoires Non Stéroïdiens', description: 'Classe de médicaments pouvant déclencher des exacerbations d\'asthme chez certains patients (ex: aspirine, ibuprofène).' },
  { abbr: 'CSO', full: 'Corticostéroïdes Oraux', description: "Médicaments anti-inflammatoires puissants pris par voie orale (ex: Prednisone), généralement pour les exacerbations sévères ou l'asthme très sévère." },
  { abbr: 'SAOS', full: 'Syndrome d\'Apnées Obstructives du Sommeil', description: "Trouble du sommeil caractérisé par des pauses respiratoires répétées." },
  { abbr: 'DEP', full: 'Débit Expiratoire de Pointe', description: "Mesure du débit d'air maximal lors d'une expiration forcée, utilisée pour le suivi de l'asthme." },
  { abbr: 'pMDI', full: 'Aérosol-doseur Pressurisé', description: "Dispositif d'inhalation pressurisé." },
  { abbr: 'PRN', full: 'Pro Re Nata', description: "Locution latine signifiant 'au besoin'." },
  { abbr: 'QTc', full: 'Intervalle QT corrigé', description: 'Une mesure effectuée sur un électrocardiogramme pour évaluer certaines propriétés électriques du cœur.' },
  { abbr: 'SABA', full: 'Bêta-2-agoniste à Courte Durée d\'Action', description: "Médicament de secours pour un soulagement rapide des symptômes (ex: Salbutamol/Albutérol)." },
  { abbr: 'SaO2', full: 'Saturation artérielle en Oxygène', description: "Pourcentage d'hémoglobine transportant de l'oxygène dans le sang artériel." },
  { abbr: 'ITSL', full: 'Immunothérapie Sublinguale', description: "Traitement de désensibilisation administré sous la langue, ex: pour les acariens." },
  { abbr: 'T2', full: 'Inflammation de Type 2', description: 'Une voie inflammatoire dans l\'asthme souvent caractérisée par des éosinophiles et des réponses allergiques.' },
  { abbr: 'TSLP', full: 'Lymphopoïétine Stromale Thymique', description: "Une cytokine impliquée dans l'inflammation de type 2." },
  { abbr: 'IVRS', full: 'Infection des Voies Respiratoires Supérieures', description: "Infection des voies aériennes supérieures causée par un virus (ex: rhume, grippe)." },
  { abbr: 'DVCC', full: 'Dysfonction des Cordes Vocales', description: 'Aussi connue sous le nom d\'Obstruction Laryngée Inductible (OLI). Une condition qui peut mimer les symptômes de l\'asthme.' },
  { abbr: 'OMS', full: 'Organisation Mondiale de la Santé', description: "Agence spécialisée de l'ONU pour la santé publique." },
];
