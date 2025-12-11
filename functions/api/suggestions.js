const DEPARTEMENTS_ACTIFS = {
    "06": "Alpes-Maritimes", "13": "Bouches-du-Rhone", "17": "Charente-Maritime",
    "22": "Cotes-d'Armor", "30": "Gard", "31": "Haute-Garonne", "33": "Gironde",
    "34": "Herault", "35": "Ille-et-Vilaine", "44": "Loire-Atlantique",
    "49": "Maine-et-Loire", "50": "Manche", "54": "Meurthe-et-Moselle",
    "56": "Morbihan", "69": "Rhone", "74": "Haute-Savoie", "83": "Var", "85": "Vendee","75": "Paris",
    "77": "Seine-et-Marne", "78": "Yvelines", "91": "Essonne","92": "Hauts-de-Seine",
    "93": "Seine-Saint-Denis", "94": "Val-de-Marne", "95": "Val-d'Oise",
};

const REGIONS = {
    "nouvelle-aquitaine": { nom: "Nouvelle-Aquitaine", departements: ["17", "33"] },
    "pays-de-la-loire": { nom: "Pays de la Loire", departements: ["44", "49", "85"] },
    "bretagne": { nom: "Bretagne", departements: ["22", "35", "56"] },
    "occitanie": { nom: "Occitanie", departements: ["30", "31", "34"] },
    "provence-alpes-cote-d-azur": { nom: "Provence-Alpes-Cote d'Azur", departements: ["06", "13", "83"] },
    "auvergne-rhone-alpes": { nom: "Auvergne-Rhone-Alpes", departements: ["69", "74"] },
    "normandie": { nom: "Normandie", departements: ["50"] },
    "grand-est": { nom: "Grand Est", departements: ["54"] }
    "ile-de-france": { nom: "Ile-de-France", departements: ["75", "77", "78", "91", "92", "93", "94", "95"] },
};

function slugify(text) {
    return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

async function getVillesDepartement(codeDep) {
    try {
        const response = await fetch(`https://geo.api.gouv.fr/departements/${codeDep}/communes?fields=nom,code`);
        if (!response.ok) return [];
        return await response.json();
    } catch (error) { return []; }
}

async function rechercherSuggestions(query, limit = 10) {
    const slug = slugify(query);
    const suggestions = [];
    
    for (const [code, nom] of Object.entries(DEPARTEMENTS_ACTIFS)) {
        if (code.includes(query) || slugify(nom).includes(slug)) {
            suggestions.push({ type: 'departement', nom: `${nom} (${code})`, slug: code });
        }
    }
    
    for (const [regionSlug, regionData] of Object.entries(REGIONS)) {
        if (slugify(regionData.nom).includes(slug)) {
            const depActifs = regionData.departements.filter(d => DEPARTEMENTS_ACTIFS[d]);
            if (depActifs.length > 0) {
                suggestions.push({ type: 'region', nom: regionData.nom, slug: regionSlug });
            }
        }
    }
    
    if (query.length >= 2) {
        for (const codeDep of Object.keys(DEPARTEMENTS_ACTIFS)) {
            const villes = await getVillesDepartement(codeDep);
            const villesTrouvees = villes.filter(v => slugify(v.nom).includes(slug));
            villesTrouvees.slice(0, 3).forEach(v => {
                if (!suggestions.find(s => s.slug === slugify(v.nom))) {
                    suggestions.push({ type: 'ville', nom: `${v.nom} (${codeDep})`, slug: slugify(v.nom) });
                }
            });
        }
    }
    
    return suggestions.slice(0, limit);
}

export async function onRequest(context) {
    const url = new URL(context.request.url);
    const query = url.searchParams.get('q') || '';
    
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300'
    };
    
    if (query.length < 2) {
        return new Response(JSON.stringify([]), { headers });
    }
    
    try {
        const suggestions = await rechercherSuggestions(query, 10);
        return new Response(JSON.stringify(suggestions), { headers });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Erreur serveur' }), { status: 500, headers });
    }
}
