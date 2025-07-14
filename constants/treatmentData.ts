

import { AdultTreatmentOptions, ChildTreatmentOptions, YoungChildTreatmentOptions, TreatmentDetail } from '../types';

export const adultTreatments: AdultTreatmentOptions = {
  pathway1: { // Préféré : ICS-formotérol comme traitement de secours
    1: { 
      name: "ICS-formotérol à faible dose à la demande (Thérapie AIR)",
      reliever: "ICS-formotérol à faible dose (ex: budésonide/formotérol 200/6 mcg) à la demande pour les symptômes.",
      controller: "Le traitement de secours fournit le traitement anti-inflammatoire. Aucun traitement de fond quotidien n'est prescrit.",
      keyPoints: ["Ceci est la thérapie de secours anti-inflammatoire (AIR).", "Réduit significativement le risque d'exacerbations sévères par rapport au SABA seul.", "Un seul inhalateur simplifie le traitement."],
      notes: ["La dose quotidienne totale maximale recommandée est de 12 inhalations (72 mcg de formotérol).", "L'éducation du patient sur cette nouvelle stratégie est cruciale."]
    },
    2: { 
      name: "ICS-formotérol à faible dose à la demande (Thérapie AIR)",
      reliever: "ICS-formotérol à faible dose à la demande pour les symptômes.",
      controller: "Le traitement de secours fournit le traitement anti-inflammatoire. Aucun traitement de fond quotidien n'est prescrit.",
      keyPoints: ["Cette stratégie est pour les patients qui seraient autrement sous CSI à faible dose quotidiennement.", "Réduit toujours le risque d'exacerbation par rapport aux schémas basés sur le SABA."],
      notes: ["La dose quotidienne totale maximale recommandée est de 12 inhalations (72 mcg de formotérol)."]
    },
    3: { 
      name: "MART avec ICS-formotérol à faible dose",
      reliever: "ICS-formotérol à faible dose à la demande.",
      controller: "ICS-formotérol à faible dose en Thérapie de Fond et de Secours (MART).",
      keyPoints: ["Utilise un seul inhalateur pour le traitement de fond quotidien (ex: 1 bouffée 2x/j) et le soulagement des symptômes.", "Réduit les exacerbations sévères par rapport à une dose fixe de CSI-BALA + SABA."],
      notes: ["S'assurer que le patient comprend que le MART est à la fois pour un usage programmé et à la demande. Maximum 12 inhalations totales/jour."]
    },
    4: { 
      name: "MART avec ICS-formotérol à dose moyenne",
      reliever: "ICS-formotérol à faible dose à la demande (dans le cadre du MART).",
      controller: "ICS-formotérol à dose moyenne en MART (ex: 2 inhalations 2x/j).",
      keyPoints: ["Pour les patients non contrôlés par le MART à faible dose malgré une bonne observance.", "Conserve les avantages du régime MART à inhalateur unique."],
      additional: ["Envisager d'ajouter un AMLA (ex: tiotropium) pour un contrôle supplémentaire des symptômes si nécessaire avant de passer au palier 5."],
      referral: "Orienter vers un spécialiste pour évaluation afin d'envisager les options du palier 5 si le contrôle n'est pas atteint."
    },
    5: { 
      name: "Palier 5 : Évaluation par un spécialiste et traitements d'appoint",
      reliever: "ICS-formotérol à faible dose à la demande (si le MART est poursuivi).",
      controller: "MART avec ICS-formotérol à dose élevée, plus thérapies d'appoint.",
      additional: [
        "Ajouter un AMLA (Antagoniste Muscarinique à Longue Durée d'Action).",
        "Thérapies biologiques ciblées (anti-IgE, anti-IL5/5R, anti-IL4R, anti-TSLP) après phénotypage.",
        "Envisager la thermoplastie bronchique pour certains patients sélectionnés.",
        "En dernier recours, ajouter des corticostéroïdes oraux (CSO) à faible dose, avec des stratégies pour minimiser les risques à long terme."
      ],
      keyPoints: ["Ce palier nécessite une évaluation et une gestion par un spécialiste pour le phénotypage et la sélection des produits biologiques.", "L'objectif est d'améliorer le contrôle et de minimiser le besoin en CSO."],
      referral: "Essentiel pour une évaluation approfondie, un phénotypage et l'initiation des traitements du palier 5.",
    }
  },
  pathway2: { // Alternative : SABA de secours + autre(s) traitement(s) de fond
    1: { 
      name: "CSI pris à chaque utilisation de SABA",
      reliever: "SABA à la demande.",
      controller: "Prendre un CSI à faible dose à chaque utilisation de SABA.",
      keyPoints: ["Pour les patients avec des symptômes peu fréquents (moins de deux fois par mois) ET sans facteurs de risque d'exacerbation.", "Réduit le risque d'exacerbations sévères par rapport au traitement par SABA seul."],
      notes: ["Nécessite que le patient porte et utilise deux inhalateurs distincts, ou un produit combiné si disponible."]
    },
    2: { 
      name: "CSI à faible dose quotidien + SABA à la demande",
      reliever: "SABA à la demande.",
      controller: "Traitement de fond quotidien par CSI à faible dose.",
      additional: ["L'ARLT quotidien est une alternative, mais moins efficace que les CSI pour prévenir les exacerbations."],
      keyPoints: ["La pierre angulaire du traitement de fond. L'observance est essentielle."],
    },
    3: { 
      name: "CSI-BALA à faible dose quotidien + SABA à la demande",
      reliever: "SABA à la demande.",
      controller: "Inhalateur combiné CSI-BALA à faible dose quotidien.",
      additional: ["Alternativement, passer à un CSI à dose moyenne seul (moins efficace pour de nombreux patients).", "CSI à faible dose + ARLT est une autre alternative moins efficace."],
      keyPoints: ["L'ajout d'un BALA améliore les symptômes et la fonction pulmonaire, et réduit les exacerbations par rapport à l'augmentation de la dose de CSI seule pour la plupart des patients."],
    },
    4: { 
      name: "CSI-BALA à dose moyenne quotidien + SABA à la demande",
      reliever: "SABA à la demande.",
      controller: "CSI-BALA à dose moyenne quotidien.",
      additional: ["Envisager d'ajouter un AMLA (ex: tiotropium dans un inhalateur séparé ou dans le cadre d'une trithérapie)."],
      referral: "Orienter vers un spécialiste si le contrôle n'est pas atteint ou pour envisager les options du palier 5."
    },
    5: { 
      name: "Orientation vers un spécialiste + CSI-BALA à dose élevée +/- options",
      reliever: "SABA à la demande.",
      controller: "CSI-BALA à dose élevée.",
      additional: [
        "Ajouter un AMLA.",
        "Ajouter des thérapies biologiques ciblées (anti-IgE, anti-IL5/5R, anti-IL4R, anti-TSLP) après phénotypage.",
        "Ajouter des CSO à faible dose en dernier recours, en gérant les effets secondaires."
      ],
      referral: "Essentiel pour l'évaluation phénotypique et l'initiation de thérapies avancées."
    }
  }
};

export const childTreatments: ChildTreatmentOptions = { // Pour les enfants de 6-11 ans
  track1: { // Voie 1 : MART avec ICS-formotérol (Budésonide/Formotérol 100/6, dose délivrée 80/4.5)
    3: { 
      name: "MART avec ICS-formotérol à faible dose",
      reliever: "ICS-formotérol à faible dose (ex: Bud/Form 100/6) 1 inhalation à la demande.",
      controller: "Traitement de fond par ICS-formotérol à faible dose (1 inhalation une ou deux fois par jour) plus à la demande (MART).",
      keyPoints: ["Le MART est une option préférée au Palier 3.", "Simplifie le traitement à un seul inhalateur."],
      notes: ["Maximum 8 inhalations totales par jour de Bud/Form 100/6 (GINA 2025, Encadré 4-8)."]
    },
    4: { 
      name: "MART avec ICS-formotérol à dose moyenne",
      reliever: "ICS-formotérol à faible dose (ex: Bud/Form 100/6) 1 inhalation à la demande.",
      controller: "Augmentation de la dose de fond : Bud/Form 100/6, 2 inhalations deux fois par jour, plus à la demande (MART). Ceci est une dose moyenne de CSI.",
      referral: "L'orientation vers un avis d'expert est une alternative à l'augmentation de la dose.",
      notes: ["Maximum 8 inhalations totales par jour. Une consultation spécialisée est fortement conseillée."]
    }
  },
  track2: { // Voie 2 : SABA de secours + autre traitement de fond
    1: { 
      name: "CSI pris à chaque utilisation de SABA",
      reliever: "SABA à la demande (pMDI + chambre d'inhalation).",
      controller: "CSI à faible dose pris à chaque utilisation de SABA.",
      keyPoints: ["C'est le traitement de fond préféré au Palier 1.", "Réduit le risque d'exacerbations sévères par rapport au SABA seul."]
    },
    2: { 
      name: "CSI à faible dose quotidien",
      reliever: "SABA à la demande (pMDI + chambre d'inhalation).",
      controller: "Traitement de fond quotidien par CSI à faible dose.",
      keyPoints: ["C'est le traitement de fond préféré au Palier 2."],
      additional: ["L'ARLT quotidien est une alternative, mais moins efficace."]
    },
    3: { 
      name: "CSI à dose moyenne OU CSI-BALA à faible dose",
      reliever: "SABA à la demande (pMDI + chambre d'inhalation).",
      controller: "Augmenter à un CSI à dose moyenne, OU ajouter un BALA pour maintenir une faible dose de CSI.",
      keyPoints: ["Choisir en fonction de l'évaluation du patient et de sa préférence. Le CSI-BALA peut offrir un meilleur contrôle des symptômes pour certains."]
    },
    4: { 
      name: "Orientation, ou CSI-BALA à dose moyenne",
      reliever: "SABA à la demande (pMDI + chambre d'inhalation).",
      controller: "CSI-BALA à dose moyenne.",
      additional: ["L'ajout de tiotropium (pour les 6 ans et plus) peut être envisagé par les spécialistes."],
      referral: "L'orientation vers un pédiatre spécialiste est l'option préférée à ce palier."
    }
  }
};

export const youngChildTreatments: YoungChildTreatmentOptions = {
  1: {
    stepDescription: "Palier 1 : Pour les sifflements viraux peu fréquents et peu/pas de symptômes entre les épisodes.",
    preferred: {
      name: "SABA de secours à la demande",
      reliever: "SABA inhalé via pMDI + chambre d'inhalation à valve avec masque facial.",
      keyPoints: ["Tous les enfants devraient avoir un SABA pour soulager les symptômes."],
      notes: ["L'éducation des parents sur la reconnaissance des symptômes et la technique d'inhalation correcte est essentielle."]
    },
    alternatives: [
      {
        id: 'INTERMITTENT_ICS_STEP1',
        name: "Courtes cures intermittentes de CSI",
        controller: "Initier une courte cure de CSI à faible dose au début d'une infection respiratoire virale.",
        keyPoints: ["Pour les enfants avec uniquement des sifflements d'origine virale, qui sont asymptomatiques entre les épisodes.", "Peut réduire la sévérité mais nécessite une reconnaissance et une utilisation fiables par les parents."]
      }
    ]
  },
  2: {
    stepDescription: "Palier 2 : Pour les schémas de symptômes suggérant un asthme persistant.",
    preferred: {
      name: "CSI à faible dose quotidien",
      reliever: "SABA inhalé à la demande.",
      controller: "Commencer un CSI à faible dose quotidien via pMDI + chambre d'inhalation.",
      keyPoints: ["Indiqué si les épisodes de sifflement sont fréquents (3 ou plus par an) ou s'il y a des symptômes entre les épisodes.", "L'option la plus efficace pour réduire les symptômes et les exacerbations."],
      notes: ["Réévaluer la réponse après 2-3 mois avant d'envisager une augmentation. Vérifier l'observance et la technique d'inhalation."]
    },
    alternatives: [
      {
        id: 'DAILY_LTRA',
        name: "ARLT quotidien",
        controller: "Antagoniste des Récepteurs aux Leucotriènes (ARLT) quotidien.",
        keyPoints: ["Une alternative, en particulier s'il y a des préoccupations concernant les CSI ou une rhinite allergique coexistante.", "Moins efficace que le CSI quotidien."],
        notes: ["Surveiller les effets secondaires neuropsychiatriques potentiels (ex: troubles du sommeil, changements d'humeur)."]
      },
      {
        id: 'INTERMITTENT_ICS_STEP2',
        name: "Courtes cures intermittentes de CSI",
        keyPoints: ["Peut être envisagé pour les enfants avec des sifflements exclusivement d'origine virale sans symptômes entre les épisodes, mais est moins efficace que le CSI quotidien si les symptômes deviennent persistants."]
      }
    ]
  },
  3: {
    stepDescription: "Palier 3 : Si l'asthme n'est pas contrôlé avec un CSI à faible dose.",
    preferred: {
      name: "Doubler la dose 'faible' quotidienne de CSI",
      reliever: "SABA inhalé à la demande.",
      controller: "Augmenter à une dose moyenne de CSI (généralement le double de la dose 'faible').",
      keyPoints: ["D'abord, confirmer la technique d'inhalation correcte, une bonne observance et le contrôle des déclencheurs environnementaux."],
      referral: "L'orientation vers un spécialiste est fortement recommandée à ce palier."
    }
  },
  4: {
    stepDescription: "Palier 4 : Poursuivre le traitement de fond et orienter vers un spécialiste.",
    preferred: {
      name: "Prise en charge spécialisée",
      reliever: "SABA inhalé à la demande.",
      controller: "Continuer le CSI à dose moyenne.",
      additional: ["Le spécialiste peut envisager d'ajouter un ARLT au CSI.", "Toute augmentation supplémentaire relève uniquement de la prise en charge spécialisée."],
      keyPoints: ["Confirmer le diagnostic d'asthme.", "Optimiser la gestion des comorbidités.", "S'assurer que les facteurs environnementaux sont pris en compte."],
      referral: "Ce palier nécessite des soins spécialisés continus."
    }
  }
};


export const exacerbationPlanDetails = {
  adult: {
    mildModerateAtHome: {
      title: "Prise en charge de l'exacerbation légère à modérée (Adultes)",
      steps: [
        "Traitement de secours : Augmenter la fréquence. Pour le SABA, prendre 2-4 bouffées toutes les 20 minutes pendant 1 heure. Pour l'ICS-formotérol AIR/MART, prendre 1 bouffée supplémentaire si besoin (jusqu'à un max total de 12 bouffées/jour).",
        "Corticostéroïdes systémiques : Commencer rapidement. Dose typique : Prednisone 40-50mg par jour pendant 5-7 jours. La diminution progressive n'est généralement pas nécessaire pour des cures de cette durée.",
        "Évaluer la réponse : Si les symptômes s'améliorent et que le soulagement dure au moins 3-4 heures, continuer l'utilisation accrue du traitement de secours et revoir le traitement de fond.",
        "Traitement de fond : Revoir et envisager d'augmenter le traitement de fond à long terme. Une exacerbation signale un échec de la prise en charge actuelle."
      ],
      whenToSeekUrgentHelp: [
        "Les symptômes s'aggravent rapidement malgré l'augmentation du traitement de secours.",
        "Difficulté à parler en phrases complètes ou essoufflement au repos.",
        "Somnolence, confusion ou cyanose (lèvres/ongles bleus).",
        "DEP inférieur à 60% de la meilleure valeur personnelle ou de la valeur prédite."
      ],
      notes: "L'autogestion doit suivre le plan d'action écrit de l'asthme du patient. Se référer à l'Encadré 9-2 du GINA 2025 pour des conseils détaillés."
    },
    severeInER: {
      title: "Prise en charge de l'exacerbation sévère - Soins d'urgence (Adultes)",
      keyTreatments: [
        "Oxygène : Titrer pour maintenir une SaO2 de 93-95%.",
        "Bronchodilatateurs : SABA à forte dose inhalé plus bromure d'ipratropium, administrés de manière répétée pendant la première heure via pMDI avec chambre d'inhalation ou nébuliseur.",
        "Corticostéroïdes systémiques : Administrer dans l'heure. La prednisone orale (1mg/kg, max 50mg) est efficace. Utiliser l'hydrocortisone IV si le patient ne peut pas prendre de médicaments par voie orale.",
        "Envisager le sulfate de magnésium IV (2g IV sur 20 min) pour les patients avec un VEMS inférieur à 25-30% de la valeur prédite ou ceux qui répondent mal au traitement initial."
      ],
      monitoring: ["Évaluation fréquente des signes cliniques (fréquence respiratoire, utilisation des muscles accessoires, parole), de la SaO2 et de la fonction pulmonaire (DEP ou VEMS) pour évaluer la réponse."],
      notes: "Les critères d'admission incluent une réponse faible/transitoire au traitement, une fonction pulmonaire durablement basse (DEP < 60%), une somnolence ou une confusion. Voir GINA 2025, Encadré 9-4."
    }
  },
  child: { // 6-11 ans
     mildModerateAtHome: {
      title: "Prise en charge de l'exacerbation légère à modérée (Enfant 6-11 ans)",
      steps: [
        "Traitement de secours : Donner 2-4 bouffées de SABA (pMDI + chambre d'inhalation) toutes les 20 minutes pendant 1 heure.",
        "Corticostéroïdes oraux : Contacter rapidement un médecin. Une courte cure de prednisolone orale (1-2 mg/kg, max 40mg, pendant 3-5 jours) est généralement nécessaire.",
        "Traitement de fond : Revoir le traitement de fond. Une augmentation temporaire peut être conseillée dans le cadre du plan d'action.",
        "Évaluer la réponse : Si les symptômes ne sont pas soulagés, ou si le traitement de secours est nécessaire plus souvent que toutes les 3-4 heures, consulter un médecin d'urgence."
      ],
      whenToSeekUrgentHelp: [
        "Traitement de secours nécessaire plus souvent que toutes les 3-4 heures.",
        "L'enfant est trop essoufflé pour parler, manger ou jouer.",
        "Tirage intercostal à chaque respiration (rétractions).",
        "L'enfant est très somnolent, confus ou agité."
      ],
      notes: "Tout médicament de secours doit être administré via pMDI avec une chambre d'inhalation à valve (spacer). Voir GINA 2025, Encadré 9-3."
    },
    severeInER: {
      title: "Prise en charge de l'exacerbation sévère - Soins d'urgence (Enfant 6-11 ans)",
       keyTreatments: [
        "Oxygène : Titrer pour maintenir une SaO2 supérieure à 94%.",
        "Bronchodilatateurs : SABA inhalé (4-10 bouffées via chambre d'inhalation) + Bromure d'Ipratropium (2-4 bouffées), qui peuvent être répétés toutes les 20 minutes pendant la première heure.",
        "Corticostéroïdes systémiques : Administrer rapidement de la prednisolone orale (1-2 mg/kg, max 40mg). La voie IV n'est généralement pas supérieure si l'enfant peut prendre la voie orale.",
        "Envisager le magnésium IV pour les cas graves avec une mauvaise réponse initiale. Le SABA IV est réservé aux soins intensifs uniquement."
      ],
       monitoring: ["Surveillance continue de la saturation en oxygène, de la fréquence respiratoire, de la fréquence cardiaque et du travail respiratoire (tirage)."],
       notes: "L'admission à l'hôpital est requise en cas de réponse faible ou transitoire au traitement initial. Voir GINA 2025, Encadré 9-4."
    }
  },
  youngChild: { // <= 5 ans
    mildModerateAtHome: {
      title: "Prise en charge de l'épisode de sifflement léger à modéré (Enfant <=5 ans)",
      steps: [
        "Traitement de secours : Donner 2 bouffées de SABA (pMDI + chambre d'inhalation + masque facial). Peut être répété toutes les 20 minutes jusqu'à 3 doses (total 6 bouffées en 1 heure).",
        "Évaluer la réponse : Si les symptômes s'améliorent et que le soulagement dure plus de 3 heures, continuer SABA 2 bouffées toutes les 4-6 heures si besoin pendant 1-2 jours. Si la réponse est faible, consulter d'urgence.",
        "Contacter le médecin : Les parents doivent informer leur médecin de l'épisode. Les CSO ne sont généralement pas initiés par les parents à la maison mais peuvent être prescrits après évaluation."
      ],
       whenToSeekUrgentHelp: [
        "Les symptômes s'aggravent ou ne s'améliorent pas après 1 heure de traitement initial par SABA.",
        "L'enfant est trop essoufflé pour s'alimenter, parler ou pleurer.",
        "Montre des signes de détresse respiratoire sévère (tirage, battement des ailes du nez, geignement).",
        "L'enfant devient somnolent, confus, ou a les lèvres bleues."
      ],
      notes: "La clé est la reconnaissance et l'intervention précoces basées sur le plan d'action écrit de l'enfant. Voir GINA 2025, Encadré 11-4."
    },
    severeInER: {
      title: "Prise en charge de l'épisode de sifflement sévère - Soins d'urgence (Enfant <=5 ans)",
       keyTreatments: [
        "Oxygène : Administrer pour maintenir une SaO2 supérieure à 94%.",
        "Bronchodilatateurs : SABA inhalé (4-6 bouffées via chambre d'inhalation) répété toutes les 20 minutes, avec du bromure d'ipratropium pour les épisodes modérés/sévères.",
        "Corticostéroïdes systémiques : Prednisolone 1-2 mg/kg (max 20mg pour 0-2 ans ; 30mg pour 3-5 ans) pendant 3-5 jours est recommandée pour la plupart des épisodes traités aux urgences."
      ],
      monitoring: ["Évaluation continue de la saturation en oxygène, de la fréquence cardiaque, de la fréquence respiratoire et du travail respiratoire."],
      notes: "Les exacerbations sévères à cet âge nécessitent une évaluation rapide aux urgences. Voir GINA 2025, Encadré 11-5."
    }
  }
};
