
import { AdultTreatmentOptions, ChildTreatmentOptions, YoungChildTreatmentOptions, TreatmentDetail } from '../types';

export const adultTreatments: AdultTreatmentOptions = {
  pathway1: { // Préférée : CSI-formotérol MART (Maintenance And Reliever Therapy)
    1: { 
      name: "CSI-formotérol faible dose PRN",
      reliever: "CSI-formotérol faible dose PRN (si besoin)",
      controller: "CSI-formotérol faible dose PRN (si besoin) (c'est le même inhalateur)",
      keyPoints: ["Traitement de secours ET de fond unique pour les Paliers 1-2 de la Voie 1.", "Réduit le risque d'exacerbations sévères."],
      notes: "La dose quotidienne maximale de formotérol doit être prise en compte (ex : 72mcg, équivalent à 12 inhalations de budésonide/formotérol 100/6 ou 6 inhalations de 200/6)."
    },
    2: { 
      name: "CSI-formotérol faible dose PRN",
      reliever: "CSI-formotérol faible dose PRN (si besoin)",
      controller: "CSI-formotérol faible dose PRN (si besoin) (c'est le même inhalateur)",
      keyPoints: ["Traitement de secours ET de fond unique pour les Paliers 1-2 de la Voie 1.", "Réduit le risque d'exacerbations sévères."],
      notes: "La dose quotidienne maximale de formotérol doit être prise en compte."
    },
    3: { 
      name: "CSI-formotérol faible dose MART",
      reliever: "CSI-formotérol faible dose PRN (si besoin)",
      controller: "CSI-formotérol faible dose en traitement de fond et de secours (MART)",
      keyPoints: ["Schéma MART : utiliser le même inhalateur pour le traitement de fond (ex: 1 bouffée matin et soir) et de secours.", "Efficace pour réduire les exacerbations."],
      notes: "Assurer l'éducation du patient sur le schéma MART. Dose de fond typique: 1 inhalation 2x/j."
    },
    4: { 
      name: "CSI-formotérol dose moyenne MART",
      reliever: "CSI-formotérol faible dose PRN (si besoin) (dans le cadre du MART)",
      controller: "CSI-formotérol dose moyenne en traitement MART (ex: budésonide/formotérol 160/4.5µg ou 200/6µg, 2 inhalations 2x/j, ou équivalent beclométasone/formotérol).",
      keyPoints: ["Augmenter la dose de fond du CSI-formotérol dans le cadre du schéma MART.", "Assurer l'éducation du patient sur le schéma MART et la dose maximale de formotérol."],
      additional: ["Autres options de contrôle à considérer (si MART dose moyenne non suffisant/mal toléré avant référence) : LTRA, ou immunothérapie sublinguale aux acariens (SLIT HDM) si indiquée."],
      referral: "Référer pour évaluation spécialisée si le contrôle n'est toujours pas atteint ou pour envisager des options de Palier 5."
    },
    5: { 
      name: "Palier 5 : Évaluation Spécialisée et Traitements Additifs",
      reliever: "CSI-formotérol faible dose PRN (si besoin) (si la stratégie MART est maintenue)",
      controller: "Optimisation par spécialiste. Les options principales sont listées ci-dessous.",
      additional: [
        "Ajout d'un AMLA (Antagoniste Muscarinique de Longue Action) au traitement CSI-formotérol MART (dose moyenne ou élevée).",
        "Augmentation à CSI-formotérol dose élevée en traitement MART (après évaluation par spécialiste).",
        "Biothérapies ciblées (ex: anti-IgE, anti-IL5/5R, anti-IL4R, anti-TSLP) après phénotypage.",
        "En dernier recours, corticostéroïdes oraux (CSO) à la plus faible dose possible et pour la durée la plus courte."
      ],
      keyPoints: ["Ce palier nécessite une évaluation et une prise en charge par un spécialiste.", "Le choix des traitements additionnels dépend du phénotype de l'asthme et de la réponse aux traitements précédents.", "Objectif : améliorer le contrôle, réduire les exacerbations et le besoin en CSO."],
      referral: "Indispensable pour évaluation approfondie, phénotypage et initiation/suivi des traitements de Palier 5.",
      notes: ["Si une biothérapie est initiée, la stratégie MART avec CSI-formotérol peut généralement être poursuivie, potentiellement à une dose de CSI réduite sous supervision spécialisée."]
    }
  },
  pathway2: { // Alternative : Soulageur BACA + autre(s) contrôleur(s)
    1: { 
      name: "CSI pris avec BACA PRN",
      reliever: "BACA PRN (si besoin)",
      controller: "Prendre CSI faible dose chaque fois que le BACA est pris (soit en association CSI-BACA, soit inhalateurs séparés).",
      keyPoints: ["Pour les patients avec symptômes moins de deux fois par mois ET sans facteurs de risque d'exacerbations.", "Cette stratégie réduit le risque d'exacerbations comparé au BACA seul."],
      notes: "Non indiqué pour les patients avec symptômes fréquents ou facteurs de risque."
    },
    2: { 
      name: "CSI faible dose quotidien + BACA PRN",
      reliever: "BACA PRN (si besoin)",
      controller: "CSI faible dose quotidiennement en traitement de fond.",
      additional: ["Alternativement, LTRA (Antagoniste des récepteurs des leucotriènes) quotidien (moins efficace que CSI).", "Autre option (moins préférée): CSI pris chaque fois que le BACA est pris."],
      keyPoints: ["Pour les patients avec symptômes deux fois par mois ou plus, mais moins que quotidiennement."],
    },
    3: { 
      name: "CSI faible dose-BADA quotidien + BACA PRN",
      reliever: "BACA PRN (si besoin)",
      controller: "CSI faible dose-BADA en traitement de fond.",
      additional: ["Alternativement, CSI dose moyenne seul, ou CSI faible dose + LTRA."],
      keyPoints: ["CSI-BADA préféré à l'augmentation de la dose de CSI seul pour de nombreux patients."],
    },
    4: { 
      name: "CSI dose moyenne-BADA quotidien + BACA PRN",
      reliever: "BACA PRN (si besoin)",
      controller: "CSI dose moyenne-BADA en traitement de fond.",
      additional: ["Alternativement, CSI forte dose seul (généralement moins efficace et plus d'effets secondaires que CSI moyen-BADA).", "Ajout d'AMLA (ex : tiotropium) - référer pour évaluation si envisagé.", "Autres options: LTRA, SLIT (acariens)."],
      referral: "Référer pour évaluation spécialisée si le contrôle n'est pas atteint ou pour envisager des options de Palier 5."
    },
    5: { 
      name: "Référence spécialiste + CSI-BADA dose forte +/- options",
      reliever: "BACA PRN (si besoin)",
      controller: "CSI forte dose-BADA.",
      additional: [
        "Ajout d'AMLA.",
        "Biothérapies ciblées après phénotypage.",
        "En dernier recours, CSO faible dose (évaluer risques/bénéfices)."
      ],
      referral: "Indispensable pour évaluation phénotypique +/- biothérapie."
    }
  }
};

export const childTreatments: ChildTreatmentOptions = { // Pour les enfants de 6-11 ans
  track1: { // Voie 1: MART avec CSI-formotérol (ex: Budésonide/Formotérol 80/4.5µg délivré)
    1: { 
      name: "CSI-formotérol faible dose PRN",
      reliever: "CSI-formotérol faible dose (ex: Bud/Form 100/6 [80/4.5µg délivré], 1 inh.) PRN",
      controller: "Identique au reliever",
      keyPoints: ["Pour les enfants avec symptômes peu fréquents (<2x/mois).", "Utiliser le même inhalateur pour soulagement et contrôle."],
      notes: ["Max 8 inhalations totales par jour de Bud/Form 100/6 (80/4.5µg délivré) (GINA 2025, Encart 4-8)."]
    },
    2: { 
      name: "CSI-formotérol faible dose PRN",
      reliever: "CSI-formotérol faible dose (ex: Bud/Form 100/6 [80/4.5µg délivré], 1 inh.) PRN",
      controller: "Identique au reliever",
      keyPoints: ["Pour les enfants avec symptômes ≥ 2x/mois.", "Alternative au CSI faible dose quotidien + BACA PRN."],
      notes: ["Max 8 inhalations totales par jour de Bud/Form 100/6 (80/4.5µg délivré) (GINA 2025, Encart 4-8)."]
    },
    3: { 
      name: "CSI-formotérol faible dose MART",
      reliever: "CSI-formotérol faible dose (ex: Bud/Form 100/6 [80/4.5µg délivré], 1 inh.) PRN",
      controller: "CSI-formotérol faible dose (ex: Bud/Form 100/6 [80/4.5µg délivré]) 1 inhalation matin et soir ET PRN (MART).",
      keyPoints: ["Schéma MART.", "Assurer l'éducation sur l'utilisation en fond ET en secours."],
      notes: ["Max 8 inhalations totales par jour de Bud/Form 100/6 (80/4.5µg délivré) (GINA 2025, Encart 4-8)."]
    },
    4: { 
      name: "CSI-formotérol dose moyenne MART",
      reliever: "CSI-formotérol faible dose (ex: Bud/Form 100/6 [80/4.5µg délivré], 1 inh.) PRN",
      controller: "CSI-formotérol faible dose (ex: Bud/Form 100/6 [80/4.5µg délivré]) 2 inhalations matin et soir ET PRN (MART). (Ceci correspond à une dose moyenne de CSI)",
      keyPoints: ["Augmentation de la dose de fond du MART."],
      referral: "Référer pour évaluation si le contrôle n'est pas atteint.",
      notes: ["Max 8 inhalations totales par jour de Bud/Form 100/6 (80/4.5µg délivré) (GINA 2025, Encart 4-8)."]
    }
  },
  track2: { // Voie 2: Soulageur BACA + autre contrôleur
    1: { 
      name: "CSI pris avec BACA PRN",
      reliever: "BACA PRN (si besoin)",
      controller: "CSI faible dose pris chaque fois que le BACA est pris.",
      keyPoints: ["Pour les enfants avec sibilances peu fréquentes (<2x/mois) ou symptômes induits par l'effort.", "Réduit le risque d'exacerbations comparé au BACA seul."]
    },
    2: { 
      name: "CSI faible dose quotidien + BACA PRN",
      reliever: "BACA PRN (si besoin)",
      controller: "CSI faible dose quotidiennement en traitement de fond.",
      keyPoints: ["C'est le traitement de fond préféré si Voie 1 non choisie/disponible."],
      additional: ["LTRA quotidien est une alternative, mais moins efficace que les CSI."]
    },
    3: { 
      name: "CSI dose moyenne OU CSI faible dose-BADA, + BACA PRN",
      reliever: "BACA PRN (si besoin)",
      controller: "CSI dose moyenne quotidiennement, OU CSI faible dose-BADA quotidiennement.",
      keyPoints: ["Le choix entre CSI dose moyenne et CSI faible dose-BADA dépend du profil du patient et des préférences."],
    },
    4: { 
      name: "Référence spécialiste +/- CSI dose moyenne-BADA + BACA PRN",
      reliever: "BACA PRN (si besoin)",
      controller: "CSI dose moyenne-BADA quotidiennement.",
      additional: ["Ajout de tiotropium (si ≥6 ans et approuvé)."],
      referral: "Référer en urgence à un pneumo-pédiatre ou allergologue."
    }
  }
};

export const youngChildTreatments: YoungChildTreatmentOptions = {
  1: {
    stepDescription: "Palier 1 : Soulageur BACA PRN. Option CSI intermittent si indiqué.",
    preferred: {
      name: "BACA PRN seul",
      reliever: "BACA inhalé (pMDI + chambre d'inhalation avec masque facial/embout buccal si adapté à l'âge) PRN.",
      keyPoints: ["Pour enfants avec sibilances virales peu fréquentes (ex: <3 épisodes/an) ET peu ou pas de symptômes entre les épisodes."],
      notes: ["L'éducation des parents/soignants sur la reconnaissance des symptômes et l'utilisation du BACA est cruciale."]
    },
    alternatives: [
      {
        id: 'INTERMITTENT_ICS_STEP1',
        name: "CSI intermittent court",
        reliever: "BACA inhalé PRN.",
        controller: "CSI faible dose intermittent (ex: au début des symptômes d'IVR ou d'exacerbation, pour 7-10 jours).",
        keyPoints: ["Pour enfants avec sibilances déclenchées UNIQUEMENT par des IVR, qui sont peu fréquentes (<3/an), ET qui n'ont aucun symptôme entre les épisodes.", "Considérer si les bénéfices l'emportent sur les coûts et les inconvénients."],
        notes: ["Nécessite une reconnaissance précoce des symptômes par les parents/soignants et un bon suivi."]
      }
    ]
  },
  2: {
    stepDescription: "Palier 2 : Traitement de fond quotidien à faible dose de CSI préféré. Alternatives : LTRA ou CSI intermittent.",
    preferred: {
      name: "CSI faible dose quotidien",
      reliever: "BACA inhalé PRN.",
      controller: "CSI faible dose quotidiennement (pMDI + chambre + masque/embout).",
      keyPoints: ["Traitement initial de fond préféré si le profil symptomatique le justifie (ex: sibilances ≥3 épisodes/an OU symptômes entre les épisodes OU exacerbations sévères récentes)."],
      notes: ["Réévaluer la réponse après 2-3 mois. Vérifier observance et technique d'inhalation."]
    },
    alternatives: [
      {
        id: 'DAILY_LTRA',
        name: "LTRA quotidien",
        reliever: "BACA inhalé PRN.",
        controller: "Antagoniste des récepteurs des leucotriènes (LTRA) quotidiennement.",
        keyPoints: ["Alternative si les CSI ne sont pas jugés appropriés ou préférés après discussion.", "Moins efficace que les CSI quotidiens pour la plupart des enfants."],
        notes: ["Surveiller les effets secondaires neuropsychiatriques (voir avertissements GINA)."]
      },
      {
        id: 'INTERMITTENT_ICS_STEP2',
        name: "CSI intermittent court",
        reliever: "BACA inhalé PRN.",
        controller: "CSI faible dose intermittent (ex: au début des symptômes d'IVR ou d'exacerbation, pour 7-10 jours).",
        keyPoints: ["Alternative pour enfants avec sibilances uniquement lors des IVR mais fréquentes (≥3/an) OU sévères, ET asymptomatiques entre les épisodes.", "Moins de données d'efficacité que les CSI quotidiens pour l'asthme persistant."],
      }
    ]
  },
  3: {
    stepDescription: "Palier 3 : Augmenter la dose de contrôleur (typiquement CSI dose moyenne). Référer à un spécialiste.",
    preferred: {
      name: "Doubler la dose faible de CSI (devient dose moyenne)",
      reliever: "BACA inhalé PRN.",
      controller: "CSI dose moyenne quotidiennement (généralement le double de la dose faible du Palier 2).",
      keyPoints: ["Si le contrôle n'est pas atteint avec CSI faible dose quotidien (après vérification de l'observance, technique, et facteurs environnementaux)."],
      referral: "Une référence à un spécialiste (pneumo-pédiatre ou allergologue) est fortement recommandée à ce palier pour confirmer le diagnostic, revoir le traitement et explorer d'autres options."
    }
    // Pas d'alternatives courantes listées à ce palier dans GINA Encart 11-2 pour les ≤5 ans avant référence.
  },
  4: {
    stepDescription: "Palier 4 : Poursuivre le traitement de fond et référer (ou continuer) la prise en charge spécialisée.",
    preferred: {
      name: "Maintenir traitement & Référer/Suivi Spécialisé",
      reliever: "BACA inhalé PRN.",
      controller: "Poursuivre la dose de CSI la plus faible permettant le contrôle (potentiellement dose moyenne).",
      additional: ["Le spécialiste peut envisager d'autres options : ex : LTRA en ajout au CSI, CSI à plus forte dose, CSI intermittent à haute dose. Les options sont limitées et doivent être soigneusement évaluées."],
      keyPoints: ["Ne pas augmenter davantage le traitement sans avis spécialisé approfondi.", "Le but est d'optimiser le contrôle avec le minimum de traitement nécessaire et d'identifier les patients pour une prise en charge plus spécialisée."],
      referral: "Prise en charge spécialisée indispensable à ce niveau."
    }
  }
};

export const exacerbationPlanDetails = {
  adult: {
    mildModerateAtHome: {
      title: "Exacerbation Légère à Modérée - Prise en Charge à Domicile (Adultes/Adolescents)",
      steps: [
        "Augmenter le médicament de secours : Prendre 2-4 bouffées de BACA (ou 1-2 bouffées de CSI-formotérol si Voie 1) toutes les 20 minutes pendant 1 heure, si nécessaire.",
        "Si sous CSI-formotérol MART : Peut augmenter la dose de fond ou utiliser temporairement CSI-formotérol comme secours plus fréquemment (jusqu'à la dose maximale autorisée).",
        "Si sous autre traitement de fond : Envisager de débuter une courte cure de corticostéroïdes oraux (CSO) si prescrit par le médecin (ex : Prednisone 40-50mg/jour pendant 5-7 jours).",
        "Contacter le médecin ou consulter en urgence si les symptômes ne s'améliorent pas ou si des CSO sont débutés."
      ],
      whenToSeekUrgentHelp: [
        "Le soulageur est nécessaire plus fréquemment que toutes les 3-4 heures.",
        "Les symptômes s'aggravent ou ne s'améliorent pas après 24-48 heures de traitement intensifié.",
        "Difficulté à parler en phrases complètes.",
        "Somnolence ou confusion.",
        "Lèvres ou ongles cyanosés (bleus)."
      ]
    },
    severeInER: {
      title: "Exacerbation Sévère - Prise en Charge aux Urgences (Adultes/Adolescents)",
      keyTreatments: [
        "Oxygène pour maintenir SaO2 >94% (92-95% pendant la grossesse).",
        "BACA inhalé à doses répétées (ex : 4-10 bouffées par pMDI + chambre d'inhalation, répéter toutes les 20 min pendant 1 heure). Envisager BACA nébulisé si sévère.",
        "Bromure d'ipratropium (surtout si sévère).",
        "Corticostéroïdes systémiques (Prednisone orale ou hydrocortisone/méthylprednisolone IV).",
        "Envisager sulfate de magnésium IV pour les cas sévères ne répondant pas au traitement initial."
      ],
      monitoring: ["VEMS ou DEP, SaO2, état clinique."]
    }
  },
  child: { // 6-11 ans
     mildModerateAtHome: {
      title: "Exacerbation Légère à Modérée - Prise en Charge à Domicile (Enfants 6-11 ans)",
      steps: [
        "Donner 2-4 bouffées de BACA (pMDI + chambre d'inhalation) toutes les 20 minutes pendant 1 heure maximum.",
        "Si les symptômes s'améliorent, continuer BACA 2-4 bouffées toutes les 3-4 heures pendant 24-48 heures.",
        "Si sous CSI quotidien, s'assurer qu'il est poursuivi (peut doubler la dose pendant 7-14 jours sur avis médical).",
        "Contacter le médecin pour évaluation. Des corticostéroïdes oraux peuvent être nécessaires (ex : 1-2 mg/kg de prednisone, max 40mg, pendant 3-5 jours)."
      ],
      whenToSeekUrgentHelp: [
        "BACA nécessaire plus que toutes les 3-4 heures après la première heure.",
        "Les symptômes s'aggravent ou ne s'améliorent pas.",
        "L'enfant est trop essoufflé pour parler, manger ou jouer.",
        "Tirage intercostal (les côtes se creusent à chaque respiration).",
        "L'enfant est très somnolent ou agité."
      ]
    },
    severeInER: {
      title: "Exacerbation Sévère - Prise en Charge aux Urgences (Enfants 6-11 ans)",
       keyTreatments: [
        "Oxygène pour maintenir SaO2 >94%.",
        "BACA inhalé (pMDI + chambre d'inhalation de préférence, ou nébuliseur si sévère) - ex : 4-10 bouffées, répéter toutes les 20 min.",
        "Bromure d'ipratropium avec BACA pour les exacerbations modérées/sévères.",
        "Corticostéroïdes oraux (ex : prednisone 1-2 mg/kg, max 40mg)."
      ],
       monitoring: ["Saturation en oxygène, fréquence respiratoire, fréquence cardiaque, signes de lutte respiratoire, capacité à parler."]
    }
  },
  youngChild: { // <= 5 ans
    mildModerateAtHome: {
      title: "Épisode Léger à Modéré - Prise en Charge à Domicile (Enfants ≤5 ans)",
      steps: [
        "Donner 2 bouffées de BACA (pMDI + chambre d'inhalation + masque facial) toutes les 20 minutes pendant 1 heure maximum.",
        "Si les symptômes s'améliorent, continuer BACA 2 bouffées toutes les 4-6 heures pendant 24-48 heures.",
        "Contacter le médecin pour évaluation. Des corticostéroïdes oraux peuvent être nécessaires (ex : 1-2 mg/kg de prednisone, max 20mg, pendant 3-5 jours)."
      ],
       whenToSeekUrgentHelp: [
        "BACA nécessaire plus fréquemment après la première heure.",
        "Les symptômes s'aggravent ou ne s'améliorent pas.",
        "L'enfant est trop essoufflé pour parler, manger ou jouer.",
        "L'enfant présente un tirage, un battement des ailes du nez ou un geignement expiratoire.",
        "L'enfant est très somnolent, agité, ou a les lèvres bleues."
      ]
    },
    severeInER: {
      title: "Épisode Sévère - Prise en Charge aux Urgences (Enfants ≤5 ans)",
       keyTreatments: [
        "Oxygène pour maintenir SaO2 >94%.",
        "BACA inhalé (pMDI + chambre d'inhalation + masque facial de préférence) - ex : 2-6 bouffées, répéter toutes les 20 min.",
        "Envisager le bromure d'ipratropium avec le BACA pour les épisodes modérés/sévères.",
        "Corticostéroïdes oraux (ex : prednisone 1-2 mg/kg, max 20mg)."
      ],
      monitoring: ["Saturation en oxygène, fréquence respiratoire, fréquence cardiaque, signes de lutte respiratoire."]
    }
  }
};
// End of file safety comment
