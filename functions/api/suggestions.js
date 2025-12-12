var DEPARTEMENTS_ACTIFS = {
    "06": "Alpes-Maritimes",
    "13": "Bouches-du-Rhone",
    "17": "Charente-Maritime",
    "22": "Cotes-d-Armor",
    "30": "Gard",
    "31": "Haute-Garonne",
    "33": "Gironde",
    "34": "Herault",
    "35": "Ille-et-Vilaine",
    "44": "Loire-Atlantique",
    "49": "Maine-et-Loire",
    "50": "Manche",
    "54": "Meurthe-et-Moselle",
    "56": "Morbihan",
    "69": "Rhone",
    "74": "Haute-Savoie",
    "83": "Var",
    "85": "Vendee",
    "75": "Paris",
    "77": "Seine-et-Marne",
    "78": "Yvelines",
    "91": "Essonne",
    "92": "Hauts-de-Seine",
    "93": "Seine-Saint-Denis",
    "94": "Val-de-Marne",
    "95": "Val-d-Oise"
};

var REGIONS = {
    "nouvelle-aquitaine": { nom: "Nouvelle-Aquitaine", departements: ["17", "33"] },
    "pays-de-la-loire": { nom: "Pays de la Loire", departements: ["44", "49", "85"] },
    "bretagne": { nom: "Bretagne", departements: ["22", "35", "56"] },
    "occitanie": { nom: "Occitanie", departements: ["30", "31", "34"] },
    "provence-alpes-cote-d-azur": { nom: "Provence-Alpes-Cote d Azur", departements: ["06", "13", "83"] },
    "auvergne-rhone-alpes": { nom: "Auvergne-Rhone-Alpes", departements: ["69", "74"] },
    "normandie": { nom: "Normandie", departements: ["50"] },
    "grand-est": { nom: "Grand Est", departements: ["54"] },
    "ile-de-france": { nom: "Ile-de-France", departements: ["75", "77", "78", "91", "92", "93", "94", "95"] }
};

function slugify(text) {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

async function getVillesDepartement(codeDep) {
    try {
        var response = await fetch("https://geo.api.gouv.fr/departements/" + codeDep + "/communes?fields=nom,code,codesPostaux");
        if (!response.ok) return [];
        return await response.json();
    } catch (error) { return []; }
}

async function rechercherSuggestions(query, limit) {
    var slug = slugify(query);
    var suggestions = [];
    var queryClean = query.trim();
    
    if (/^\d{5}$/.test(queryClean)) {
        var codeDep = queryClean.substring(0, 2);
        if (DEPARTEMENTS_ACTIFS[codeDep]) {
            var villes = await getVillesDepartement(codeDep);
            for (var i = 0; i < villes.length; i++) {
                var v = villes[i];
                if (v.codesPostaux && v.codesPostaux.indexOf(queryClean) !== -1) {
                    suggestions.push({ type: "code_postal", nom: v.nom + " (" + queryClean + ")", slug: queryClean });
                }
            }
        }
        return suggestions.slice(0, limit);
    }
    
    if (/^\d{2,4}$/.test(queryClean)) {
        var codeDep = queryClean.substring(0, 2);
        if (DEPARTEMENTS_ACTIFS[codeDep]) {
            if (queryClean.length === 2) {
                suggestions.push({ type: "departement", nom: DEPARTEMENTS_ACTIFS[codeDep] + " (" + codeDep + ")", slug: codeDep });
            }
            var villes = await getVillesDepartement(codeDep);
            for (var i = 0; i < villes.length; i++) {
                var v = villes[i];
                if (v.codesPostaux) {
                    for (var j = 0; j < v.codesPostaux.length; j++) {
                        var cp = v.codesPostaux[j];
                        if (cp.indexOf(queryClean) === 0) {
                            var exists = false;
                            for (var k = 0; k < suggestions.length; k++) {
                                if (suggestions[k].nom.indexOf(cp) !== -1) exists = true;
                            }
                            if (!exists) {
                                suggestions.push({ type: "code_postal", nom: v.nom + " (" + cp + ")", slug: cp });
                            }
                        }
                    }
                }
            }
        }
        return suggestions.slice(0, limit);
    }
    
    for (var code in DEPARTEMENTS_ACTIFS) {
        var nom = DEPARTEMENTS_ACTIFS[code];
        if (code.indexOf(queryClean) !== -1 || slugify(nom).indexOf(slug) !== -1) {
            suggestions.push({ type: "departement", nom: nom + " (" + code + ")", slug: code });
        }
    }
    
    for (var regionSlug in REGIONS) {
        var regionData = REGIONS[regionSlug];
        if (slugify(regionData.nom).indexOf(slug) !== -1) {
            suggestions.push({ type: "region", nom: regionData.nom, slug: regionSlug });
        }
    }
    
    if (query.length >= 2) {
        for (var codeDep in DEPARTEMENTS_ACTIFS) {
            var villes = await getVillesDepartement(codeDep);
            for (var i = 0; i < villes.length; i++) {
                var v = villes[i];
                if (slugify(v.nom).indexOf(slug) !== -1) {
                    var exists = false;
                    for (var k = 0; k < suggestions.length; k++) {
                        if (suggestions[k].slug === slugify(v.nom)) exists = true;
                    }
                    if (!exists) {
                        suggestions.push({ type: "ville", nom: v.nom + " (" + codeDep + ")", slug: slugify(v.nom) });
                    }
                }
            }
        }
    }
    
    return suggestions.slice(0, limit);
}

export async function onRequest(context) {
    var url = new URL(context.request.url);
    var query = url.searchParams.get("q") || "";
    
    var headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=300"
    };
    
    if (query.length < 2) {
        return new Response(JSON.stringify([]), { headers: headers });
    }
    
    try {
        var suggestions = await rechercherSuggestions(query, 15);
        return new Response(JSON.stringify(suggestions), { headers: headers });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500, headers: headers });
    }
}
