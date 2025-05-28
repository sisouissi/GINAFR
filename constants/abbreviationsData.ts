
export interface Abbreviation {
  abbr: string;
  full: string;
  description?: string; // Optional further clarification
}

export const abbreviationsList: Abbreviation[] = [
  { abbr: 'GINA', full: 'Global Initiative for Asthma', description: "Initiative mondiale pour l'asthme." },
  { abbr: 'CSI', full: 'Corticostéroïde Inhalé', description: "Médicament anti-inflammatoire de base dans le traitement de l'asthme." },
  { abbr: 'BACA', full: 'Bêta-2 Agoniste de Courte Durée d\'Action', description: "Médicament de secours pour soulager rapidement les symptômes (ex: Salbutamol)." },
  { abbr: 'BADA', full: 'Bêta-2 Agoniste de Longue Durée d\'Action', description: "Médicament de fond pour contrôler l'asthme, toujours utilisé en association avec un CSI." },
  { abbr: 'AMLA', full: 'Antagoniste Muscarinique de Longue Action', description: "Autre type de bronchodilatateur de longue durée d'action utilisé en traitement de fond additionnel." },
  { abbr: 'MART', full: 'Maintenance And Reliever Therapy', description: "Stratégie thérapeutique où le même inhalateur CSI-formotérol est utilisé pour le traitement de fond et de secours." },
  { abbr: 'PRN', full: 'Pro Re Nata', description: "Expression latine signifiant 'si besoin' ou 'au besoin'." },
  { abbr: 'CSO', full: 'Corticostéroïdes Oraux', description: "Médicaments anti-inflammatoires puissants pris par voie orale (ex: Prednisone), généralement pour les exacerbations sévères ou l'asthme très sévère." },
  { abbr: 'LTRA', full: 'Antagoniste des Récepteurs des Leucotriènes', description: "Classe de médicaments de fond pris par voie orale (ex: Montélukast)." },
  { abbr: 'SLIT', full: 'Immunothérapie Sublinguale', description: "Traitement de désensibilisation administré sous la langue, par exemple pour les acariens." },
  { abbr: 'HDM', full: 'House Dust Mite', description: "Acariens de la poussière de maison, un allergène courant." },
  { abbr: 'DEP', full: 'Débit Expiratoire de Pointe', description: "Mesure du débit d'air maximal lors d'une expiration forcée, utilisée pour surveiller l'asthme." },
  { abbr: 'VEMS', full: 'Volume Expiratoire Maximal par Seconde', description: "Volume d'air expiré pendant la première seconde d'une expiration forcée, mesuré par spirométrie." },
  { abbr: 'SaO2', full: 'Saturation artérielle en Oxygène', description: "Pourcentage d'hémoglobine transportant de l'oxygène dans le sang artériel." },
  { abbr: 'IVR', full: 'Infection Virale Respiratoire', description: "Infection des voies respiratoires causée par un virus (ex: rhume, grippe)." },
  { abbr: 'pMDI', full: 'Pressurized Metered-Dose Inhaler', description: "Inhalateur-doseur pressurisé (aérosol-doseur)." },
  { abbr: 'DPI', full: 'Dry Powder Inhaler', description: "Inhalateur de poudre sèche." },
  { abbr: 'API', full: 'Asthma Predictive Index', description: "Indice Prédictif d'Asthme, utilisé chez les jeunes enfants." },
  { abbr: 'ACQ', full: 'Asthma Control Questionnaire', description: "Questionnaire de Contrôle de l'Asthme." },
  { abbr: 'ACT', full: 'Asthma Control Test', description: "Test de Contrôle de l'Asthme." },
  { abbr: 'FeNO', full: 'Fractional exhaled Nitric Oxide', description: "Fraction d'oxyde nitrique dans l'air exhalé, un marqueur de l'inflammation des voies aériennes de type 2." },
  { abbr: 'IgE', full: 'Immunoglobuline E', description: "Type d'anticorps impliqué dans les réactions allergiques." },
  { abbr: 'IL', full: 'Interleukine', description: "Type de cytokine (protéine de signalisation) impliquée dans l'inflammation." },
  { abbr: 'TSLP', full: 'Thymic Stromal LymphoPoietin', description: "Lymphopoïétine Stromale Thymique, une cytokine impliquée dans l'inflammation de type 2." },
  { abbr: 'CRSwNP', full: 'Chronic Rhinosinusitis with Nasal Polyps', description: "Rhinosinusite Chronique avec Polypes Nasaux." },
  { abbr: 'CRSsNP', full: 'Chronic Rhinosinusitis without Nasal Polyps', description: "Rhinosinusite Chronique sans Polypes Nasaux." },
  { abbr: 'RGO', full: 'Reflux Gastro-Œsophagien', description: "Remontée du contenu de l'estomac dans l'œsophage." },
  { abbr: 'AOS', full: 'Apnée Obstructive du Sommeil', description: "Trouble du sommeil caractérisé par des arrêts répétés de la respiration." },
  { abbr: 'BPCO', full: 'Bronchopneumopathie Chronique Obstructive', description: "Maladie pulmonaire chronique obstruant le flux d'air des poumons." },
  { abbr: 'SU', full: 'Service des Urgences', description: "Service hospitalier pour les urgences médicales." },
  { abbr: 'USI', full: 'Unité de Soins Intensifs', description: "Service hospitalier pour les patients nécessitant une surveillance et des soins intensifs." },
  { abbr: 'OMS', full: 'Organisation Mondiale de la Santé', description: "Agence spécialisée de l'ONU pour la santé publique." },
];
