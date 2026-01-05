// ============================================
// CONFIGURATION DES DÉPARTEMENTS
// ============================================
// Pour ajouter un département : ajoutez son numéro dans la liste
// Pour retirer un département : supprimez sa ligne
// ============================================

export const DEPARTEMENTS_ACTIFS = {
    "06": "Alpes-Maritimes",
    "13": "Bouches-du-Rhône",
    "17": "Charente-Maritime",
    "22": "Côtes-d'Armor",
    "30": "Gard",
    "31": "Haute-Garonne",
    "33": "Gironde",
    "34": "Hérault",
    "35": "Ille-et-Vilaine",
    "44": "Loire-Atlantique",
    "49": "Maine-et-Loire",
    "50": "Manche",
    "54": "Meurthe-et-Moselle",
    "56": "Morbihan",
    "69": "Rhône",
    "74": "Haute-Savoie",
    "83": "Var",
    "85": "Vendée",
    // ----------------------------------------
    // AJOUTEZ VOS NOUVEAUX DÉPARTEMENTS ICI :
    // "75": "Paris",
    // "92": "Hauts-de-Seine",
    // ----------------------------------------
};

export const REGIONS = {
    "nouvelle-aquitaine": { nom: "Nouvelle-Aquitaine", departements: ["17", "33"] },
    "pays-de-la-loire": { nom: "Pays de la Loire", departements: ["44", "49", "85"] },
    "bretagne": { nom: "Bretagne", departements: ["22", "35", "56"] },
    "occitanie": { nom: "Occitanie", departements: ["30", "31", "34"] },
    "provence-alpes-cote-d-azur": { nom: "Provence-Alpes-Côte d'Azur", departements: ["06", "13", "83"] },
    "auvergne-rhone-alpes": { nom: "Auvergne-Rhône-Alpes", departements: ["69", "74"] },
    "normandie": { nom: "Normandie", departements: ["50"] },
    "grand-est": { nom: "Grand Est", departements: ["54"] }
};

export const CALLMEBOT = { phone: "33635084014", apikey: "9990329" };
export const TELEPHONE = "0 800 123 456";
