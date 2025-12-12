var DEPARTEMENTS_ACTIFS = {
    "06": "Alpes-Maritimes", "13": "Bouches-du-Rhone", "17": "Charente-Maritime",
    "22": "Cotes-d-Armor", "30": "Gard", "31": "Haute-Garonne", "33": "Gironde",
    "34": "Herault", "35": "Ille-et-Vilaine", "44": "Loire-Atlantique",
    "49": "Maine-et-Loire", "50": "Manche", "54": "Meurthe-et-Moselle",
    "56": "Morbihan", "69": "Rhone", "74": "Haute-Savoie", "83": "Var", "85": "Vendee",
    "75": "Paris", "77": "Seine-et-Marne", "78": "Yvelines", "91": "Essonne",
    "92": "Hauts-de-Seine", "93": "Seine-Saint-Denis", "94": "Val-de-Marne", "95": "Val-d-Oise"
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

var CALLMEBOT = { phone: "33635084014", apikey: "9990329" };
var TELEGRAM = { botToken: "8509813115:AAHJXvp9_AHBFTpA-S7Td0IEXgZJatVSwdI", chatId: "7695629846" };

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

async function validerLieu(recherche) {
    var slug = slugify(recherche);
    var rechercheClean = recherche.trim();
    
    // Verifier si c'est un departement
    if (DEPARTEMENTS_ACTIFS[rechercheClean]) {
        return { valide: true, type: "departement", code: rechercheClean, nom: DEPARTEMENTS_ACTIFS[rechercheClean], slug: rechercheClean };
    }
    for (var code in DEPARTEMENTS_ACTIFS) {
        if (slugify(DEPARTEMENTS_ACTIFS[code]) === slug) {
            return { valide: true, type: "departement", code: code, nom: DEPARTEMENTS_ACTIFS[code], slug: code };
        }
    }
    
    // Verifier si c'est une region
    for (var regionSlug in REGIONS) {
        var regionData = REGIONS[regionSlug];
        if (slug === regionSlug || slug === slugify(regionData.nom)) {
            var depActifs = regionData.departements.filter(function(d) { return DEPARTEMENTS_ACTIFS[d]; });
            if (depActifs.length > 0) {
                return { valide: true, type: "region", code: regionSlug, nom: regionData.nom, slug: regionSlug, departements: depActifs };
            }
        }
    }
    
    // Chercher la ville via l'API geo.api.gouv.fr
    // Convertir les tirets en espaces pour la recherche
    var rechercheVille = rechercheClean.replace(/-/g, " ");
    try {
        var response = await fetch("https://geo.api.gouv.fr/communes?nom=" + encodeURIComponent(rechercheVille) + "&fields=nom,code,codeDepartement&limit=5");
        if (response.ok) {
            var villes = await response.json();
            for (var i = 0; i < villes.length; i++) {
                var ville = villes[i];
                // Verifier si le departement est actif
                if (DEPARTEMENTS_ACTIFS[ville.codeDepartement]) {
                    // Verifier si le slug correspond
                    if (slugify(ville.nom) === slug || slug.includes(slugify(ville.nom)) || slugify(ville.nom).includes(slug)) {
                        return { valide: true, type: "ville", code: ville.code, nom: ville.nom, slug: slugify(ville.nom), departement: ville.codeDepartement };
                    }
                }
            }
        }
    } catch (e) {
        console.log("Erreur API geo:", e);
    }
    
    return { valide: false, raison: "lieu_non_trouve" };
}

function generateHTML(lieu, data, theme) {
    var nom = data.nom;
    var type = data.type;
    var prefix = "a ";
    if (type === "departement") prefix = "dans le ";
    if (type === "region") prefix = "en ";
    var titreComplet = prefix + nom;
    if (theme === "luxe") {
        return generateLuxeHTML(nom, titreComplet);
    }
    return generateSOSHTML(nom, titreComplet);
}

function generateSOSHTML(nom, titreComplet) {
    var TEL = "01 84 60 60 60";
    var TEL_CLEAN = TEL.replace(/\s/g, "");
    var MARQUE = "SOS Serrurier";
    
    var html = '<!DOCTYPE html><html lang="fr"><head>';
    html += '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
    html += '<title>' + MARQUE + ' ' + nom + ' | URGENCE 24H/24 - Intervention 15min</title>';
    html += '<meta name="description" content="URGENCE Serrurier ' + titreComplet + '. Intervention en 15 minutes, 24h/24. Appelez le ' + TEL + '">';
    html += '<link rel="preconnect" href="https://fonts.googleapis.com">';
    html += '<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">';
    html += '<style>';
    
    // Variables CSS - Vert pour les boutons
    html += ':root{--green:#22C55E;--green-dark:#16A34A;--green-light:#DCFCE7;--red:#DC2626;--red-dark:#B91C1C;--red-light:#FEE2E2;--dark:#1F2937;--gray:#6B7280;--gray-light:#F9FAFB;--white:#FFFFFF}';
    html += '*{margin:0;padding:0;box-sizing:border-box}body{font-family:"Open Sans",sans-serif;color:var(--dark);background:var(--white);overflow-x:hidden}h1,h2,h3,h4{font-family:"Oswald",sans-serif;font-weight:700}';
    
    // Animations
    html += '@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}';
    html += '@keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}';
    html += '@keyframes blink{0%,100%{opacity:1}50%{opacity:0.7}}';
    html += '@keyframes moveLines{0%{transform:translateX(-100%)}100%{transform:translateX(100vw)}}';
    html += '@keyframes dotPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.2);opacity:0.8}}';
    
    // Traits rouges animés
    html += '.animated-bg{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;overflow:hidden}';
    html += '.line{position:absolute;height:2px;background:linear-gradient(90deg,transparent,var(--red),transparent);opacity:0.3}';
    html += '.line:nth-child(1){top:20%;width:200px;animation:moveLines 8s linear infinite}';
    html += '.line:nth-child(2){top:40%;width:150px;animation:moveLines 12s linear infinite 2s}';
    html += '.line:nth-child(3){top:60%;width:250px;animation:moveLines 10s linear infinite 4s}';
    html += '.line:nth-child(4){top:80%;width:180px;animation:moveLines 9s linear infinite 1s}';
    html += '.line:nth-child(5){top:10%;width:120px;animation:moveLines 11s linear infinite 3s}';
    
    // Animation Neon Background
    html += '.neon-bg{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.15}';
    html += '.neon-bg svg{width:100%;height:100%}';
    html += '.neon-path{fill:none;stroke:var(--red);stroke-width:2;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 0 8px var(--red)) drop-shadow(0 0 20px var(--red)) drop-shadow(0 0 40px rgba(220,38,38,0.5))}';
    html += '.key-path{stroke-dasharray:1000;stroke-dashoffset:1000;animation:drawKey 8s ease-in-out infinite}';
    html += '.lock-path{stroke-dasharray:800;stroke-dashoffset:800;animation:drawLock 8s ease-in-out infinite 8s}';
    html += '@keyframes drawKey{0%{stroke-dashoffset:1000;opacity:0}10%{opacity:1}50%{stroke-dashoffset:0;opacity:1}60%{opacity:1}100%{stroke-dashoffset:-1000;opacity:0}}';
    html += '@keyframes drawLock{0%{stroke-dashoffset:800;opacity:0}10%{opacity:1}50%{stroke-dashoffset:0;opacity:1}60%{opacity:1}100%{stroke-dashoffset:-800;opacity:0}}';
    
    // Bandeau urgence avec point vert
    html += '.urgence-bar{background:var(--red);color:var(--white);padding:12px 0;position:relative;z-index:10}';
    html += '.urgence-bar-inner{max-width:1200px;margin:0 auto;padding:0 20px;display:flex;justify-content:center;align-items:center;gap:15px;flex-wrap:wrap}';
    html += '.urgence-bar .status{display:flex;align-items:center;gap:8px;background:rgba(0,0,0,0.2);padding:8px 16px;border-radius:50px}';
    html += '.urgence-bar .dot{width:10px;height:10px;background:var(--green);border-radius:50%;animation:dotPulse 1.5s infinite}';
    html += '.urgence-bar .status span{font-size:14px;font-weight:600;color:var(--white)}';
    
    // Header
    html += 'header{background:var(--white);box-shadow:0 4px 20px rgba(0,0,0,0.1);position:sticky;top:0;z-index:100}';
    html += '.header-inner{max-width:1200px;margin:0 auto;padding:15px 20px;display:flex;justify-content:space-between;align-items:center}';
    html += '.logo{display:flex;align-items:center;gap:12px;text-decoration:none}';
    html += '.logo-icon{width:55px;height:55px;background:var(--red);border-radius:12px;display:flex;align-items:center;justify-content:center}';
    html += '.logo-icon svg{width:32px;height:32px;fill:var(--white)}';
    html += '.logo-text{font-family:"Oswald",sans-serif;font-size:28px;color:var(--dark)}';
    html += '.logo-text span{color:var(--red)}';
    html += '.header-phone{display:flex;align-items:center;gap:10px;background:var(--green);color:var(--white);padding:15px 30px;border-radius:50px;text-decoration:none;font-weight:700;font-size:18px;animation:pulse 2s infinite}';
    html += '.header-phone:hover{background:var(--green-dark)}';
    html += '.header-phone svg{width:22px;height:22px;fill:var(--white)}';
    
    // Hero avec formulaire express
    html += '.hero{background:linear-gradient(135deg,var(--gray-light) 0%,var(--white) 100%);padding:60px 0;position:relative;z-index:1}';
    html += '.hero-inner{max-width:1200px;margin:0 auto;padding:0 20px;display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center}';
    html += '.hero-content{animation:slideUp 0.8s ease-out}';
    html += '.hero h1{font-size:48px;line-height:1.1;margin-bottom:20px;color:var(--dark)}';
    html += '.hero h1 span{color:var(--red)}';
    html += '.hero-subtitle{font-size:18px;color:var(--gray);margin-bottom:25px;line-height:1.6}';
    html += '.hero-features{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:25px}';
    html += '.hero-feature{display:flex;align-items:center;gap:8px;background:var(--white);padding:10px 16px;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,0.08);font-weight:600;font-size:13px}';
    html += '.hero-feature svg{width:18px;height:18px;fill:var(--red)}';
    html += '.hero-buttons{display:flex;gap:15px;flex-wrap:wrap}';
    html += '.btn-call{display:inline-flex;align-items:center;gap:10px;background:var(--green);color:var(--white);padding:16px 35px;border-radius:12px;text-decoration:none;font-family:"Oswald",sans-serif;font-size:18px;letter-spacing:1px;transition:all 0.3s;animation:pulse 2s infinite}';
    html += '.btn-call:hover{background:var(--green-dark);transform:translateY(-3px)}';
    html += '.btn-call svg{width:22px;height:22px;fill:var(--white)}';
    html += '.btn-devis{display:inline-flex;align-items:center;gap:10px;background:var(--white);color:var(--red);padding:16px 35px;border-radius:12px;text-decoration:none;font-family:"Oswald",sans-serif;font-size:18px;letter-spacing:1px;border:2px solid var(--red);transition:all 0.3s}';
    html += '.btn-devis:hover{background:var(--red-light)}';
    
    // Formulaire Express
    html += '.express-form{background:var(--white);border-radius:20px;padding:30px;box-shadow:0 20px 60px rgba(0,0,0,0.15);animation:slideUp 0.8s ease-out 0.2s both}';
    html += '.express-form h3{font-size:22px;color:var(--dark);margin-bottom:5px;text-align:center}';
    html += '.express-form .subtitle{font-size:14px;color:var(--gray);margin-bottom:20px;text-align:center}';
    html += '.express-form .form-group{margin-bottom:15px}';
    html += '.express-form label{display:block;font-weight:600;margin-bottom:6px;font-size:13px;color:var(--dark)}';
    html += '.express-form input{width:100%;padding:14px;background:var(--gray-light);border:2px solid transparent;border-radius:10px;font-size:15px;transition:all 0.3s}';
    html += '.express-form input:focus{outline:none;border-color:var(--red);background:var(--white)}';
    html += '.express-form .btn-express{width:100%;padding:16px;background:var(--green);color:var(--white);border:none;border-radius:10px;font-family:"Oswald",sans-serif;font-size:18px;cursor:pointer;transition:all 0.3s;animation:pulse 2s infinite}';
    html += '.express-form .btn-express:hover{background:var(--green-dark)}';
    html += '.express-form .success{display:none;text-align:center;padding:20px}';
    html += '.express-form .success.show{display:block}';
    html += '.express-form .success svg{width:50px;height:50px;fill:var(--red);margin-bottom:15px}';
    html += '.express-form .success h4{color:var(--dark);margin-bottom:8px}';
    html += '.express-form .success p{color:var(--gray);font-size:14px}';
    
    // Assurances avec logos
    html += '.assurances{padding:40px 0;background:var(--gray-light);position:relative;z-index:1}';
    html += '.assurances-inner{max-width:1200px;margin:0 auto;padding:0 20px}';
    html += '.assurances-title{text-align:center;font-size:13px;color:var(--gray);text-transform:uppercase;letter-spacing:2px;margin-bottom:20px}';
    html += '.assurances-logos{display:flex;justify-content:center;flex-wrap:wrap;gap:30px;align-items:center}';
    html += '.assurances-logos img{height:40px;width:auto;opacity:0.8;transition:opacity 0.3s}';
    html += '.assurances-logos img:hover{opacity:1}';
    
    // Services avec images
    html += '.services{padding:80px 0;background:var(--white);position:relative;z-index:1}';
    html += '.container{max-width:1200px;margin:0 auto;padding:0 20px}';
    html += '.section-header{text-align:center;margin-bottom:50px}';
    html += '.section-header h2{font-size:40px;color:var(--dark);margin-bottom:15px}';
    html += '.section-header h2 span{color:var(--red)}';
    html += '.section-header p{font-size:17px;color:var(--gray)}';
    html += '.services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:25px}';
    html += '.service-card{background:var(--white);border-radius:20px;overflow:hidden;border:2px solid var(--gray-light);transition:all 0.4s}';
    html += '.service-card:hover{border-color:var(--red);transform:translateY(-10px);box-shadow:0 20px 40px rgba(220,38,38,0.15)}';
    html += '.service-img{width:100%;height:200px;object-fit:cover}';
    html += '.service-content{padding:25px;text-align:center}';
    html += '.service-card h3{font-size:20px;color:var(--dark);margin-bottom:10px}';
    html += '.service-card p{color:var(--gray);font-size:14px;line-height:1.6;margin-bottom:15px}';
    html += '.service-price{display:inline-block;background:var(--red-light);color:var(--red);padding:8px 20px;border-radius:50px;font-weight:700;font-size:14px}';
    
    // Avis
    html += '.avis{padding:80px 0;background:var(--gray-light);position:relative;z-index:1}';
    html += '.avis-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:25px}';
    html += '.avis-card{background:var(--white);border-radius:20px;padding:30px;box-shadow:0 5px 20px rgba(0,0,0,0.05)}';
    html += '.avis-stars{display:flex;gap:4px;margin-bottom:15px}';
    html += '.avis-stars svg{width:20px;height:20px;fill:#FBBF24}';
    html += '.avis-text{font-size:15px;line-height:1.7;color:var(--dark);margin-bottom:20px}';
    html += '.avis-author{display:flex;align-items:center;gap:12px}';
    html += '.avis-avatar{width:45px;height:45px;background:var(--red);color:var(--white);border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700}';
    html += '.avis-info h4{font-size:15px;font-weight:700;color:var(--dark)}';
    html += '.avis-info p{font-size:13px;color:var(--gray)}';
    
    // Contact
    html += '.contact{padding:80px 0;background:var(--white);position:relative;z-index:1}';
    html += '.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:50px;align-items:start}';
    html += '.contact-info h3{font-size:34px;color:var(--dark);margin-bottom:20px}';
    html += '.contact-info h3 span{color:var(--red)}';
    html += '.contact-info>p{color:var(--gray);font-size:16px;line-height:1.7;margin-bottom:30px}';
    html += '.contact-methods{display:flex;flex-direction:column;gap:15px}';
    html += '.contact-method{display:flex;align-items:center;gap:15px;padding:18px;background:var(--gray-light);border-radius:15px}';
    html += '.contact-method svg{width:30px;height:30px;fill:var(--red)}';
    html += '.contact-method h4{font-family:"Open Sans",sans-serif;font-size:13px;font-weight:600;color:var(--gray);margin-bottom:3px}';
    html += '.contact-method a{color:var(--red);font-size:18px;font-weight:700;text-decoration:none}';
    html += '.contact-method span{color:var(--dark);font-size:14px}';
    
    // Form box
    html += '.form-box{background:var(--white);border-radius:20px;padding:35px;box-shadow:0 10px 40px rgba(0,0,0,0.1);border:2px solid var(--gray-light)}';
    html += '.form-box h3{font-size:26px;color:var(--dark);margin-bottom:25px;text-align:center}';
    html += '.form-group{margin-bottom:18px}';
    html += '.form-group label{display:block;font-weight:600;margin-bottom:8px;font-size:14px;color:var(--dark)}';
    html += '.form-group input,.form-group select{width:100%;padding:14px;background:var(--gray-light);border:2px solid transparent;border-radius:10px;font-size:15px;transition:all 0.3s}';
    html += '.form-group input:focus,.form-group select:focus{outline:none;border-color:var(--red);background:var(--white)}';
    html += '.form-row{display:grid;grid-template-columns:1fr 1fr;gap:15px}';
    html += '.btn-submit{width:100%;padding:16px;background:var(--green);color:var(--white);border:none;border-radius:10px;font-family:"Oswald",sans-serif;font-size:18px;cursor:pointer;transition:all 0.3s}';
    html += '.btn-submit:hover{background:var(--green-dark)}';
    html += '.success-message{display:none;text-align:center;padding:40px}';
    html += '.success-message.show{display:block}';
    html += '.success-icon{width:70px;height:70px;background:var(--red);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px}';
    html += '.success-icon svg{width:35px;height:35px;fill:var(--white)}';
    
    // CTA
    html += '.cta{padding:80px 0;background:linear-gradient(135deg,var(--green),var(--green-dark));text-align:center;position:relative;z-index:1}';
    html += '.cta h2{font-size:40px;color:var(--white);margin-bottom:15px}';
    html += '.cta p{font-size:18px;color:rgba(255,255,255,0.9);margin-bottom:30px}';
    html += '.cta-phone{display:inline-flex;align-items:center;gap:15px;background:var(--white);color:var(--green);padding:20px 50px;border-radius:15px;text-decoration:none;font-family:"Oswald",sans-serif;font-size:30px;animation:pulse 2s infinite}';
    html += '.cta-phone svg{width:30px;height:30px;fill:var(--green)}';
    
    // FAQ Carrousel
    html += '.faq{padding:80px 0;background:var(--gray-light);position:relative;z-index:1;overflow:hidden}';
    html += '.faq-track{display:flex;gap:25px;animation:scrollFaq 30s linear infinite}';
    html += '.faq-track:hover{animation-play-state:paused}';
    html += '@keyframes scrollFaq{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}';
    html += '.faq-card{flex:0 0 350px;background:var(--white);border-radius:20px;padding:30px;box-shadow:0 5px 20px rgba(0,0,0,0.08);border-left:4px solid var(--red)}';
    html += '.faq-card h4{font-size:17px;color:var(--dark);margin-bottom:12px;line-height:1.4}';
    html += '.faq-card p{font-size:14px;color:var(--gray);line-height:1.7}';
    
    // Footer
    html += 'footer{padding:40px 0;background:var(--dark);text-align:center;position:relative;z-index:1}';
    html += 'footer p{color:rgba(255,255,255,0.7);font-size:14px}';
    
    // Floating button
    html += '.floating-btn{position:fixed;bottom:25px;right:25px;width:65px;height:65px;background:var(--green);border-radius:50%;display:flex;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 5px 25px rgba(34,197,94,0.4);z-index:1000;animation:pulse 2s infinite}';
    html += '.floating-btn svg{width:30px;height:30px;fill:var(--white)}';
    
    // Responsive - Même rendu mobile/desktop
    html += '@media(max-width:1024px){.hero-inner,.contact-grid{grid-template-columns:1fr}.services-grid,.avis-grid{grid-template-columns:repeat(2,1fr)}.hero{padding:40px 0}}';
    html += '@media(max-width:768px){.hero h1{font-size:32px}.section-header h2{font-size:28px}.services-grid,.avis-grid{grid-template-columns:1fr}.form-row{grid-template-columns:1fr}.header-inner{flex-direction:column;gap:15px}.header-phone{width:100%;justify-content:center}.urgence-bar-inner{flex-direction:column;text-align:center}.hero-features{justify-content:center}.hero-buttons{flex-direction:column;width:100%}.hero-buttons a{width:100%;justify-content:center}}';
    
    html += '</style></head><body>';
    
    // Traits rouges animés
    html += '<div class="animated-bg"><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div></div>';
    
    // Neon SVG Background - Clé et Serrure
    html += '<div class="neon-bg"><svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">';
    // Clé (position gauche)
    html += '<path class="neon-path key-path" d="M200 400 L200 350 C200 300 250 250 300 250 C350 250 400 300 400 350 C400 400 350 450 300 450 L300 500 L350 500 L350 550 L300 550 L300 600 L380 600 L380 650 L300 650 L300 750 L250 750 L250 650 L250 600 L250 550 L250 500 L250 450 L200 450 Z M300 300 C275 300 250 325 250 350 C250 375 275 400 300 400 C325 400 350 375 350 350 C350 325 325 300 300 300 Z"/>';
    // Serrure (position droite)
    html += '<path class="neon-path lock-path" d="M1550 350 L1550 300 C1550 220 1600 170 1680 170 C1760 170 1810 220 1810 300 L1810 350 L1850 350 L1850 600 L1510 600 L1510 350 L1550 350 Z M1600 350 L1760 350 L1760 300 C1760 250 1730 220 1680 220 C1630 220 1600 250 1600 300 L1600 350 Z M1680 420 C1650 420 1630 445 1630 475 C1630 495 1640 510 1660 520 L1650 560 L1710 560 L1700 520 C1720 510 1730 495 1730 475 C1730 445 1710 420 1680 420 Z"/>';
    html += '</svg></div>';
    
    // SVG Icons
    html += '<svg xmlns="http://www.w3.org/2000/svg" style="display:none"><symbol id="i-phone" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></symbol><symbol id="i-clock" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></symbol><symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></symbol><symbol id="i-check" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></symbol><symbol id="i-bolt" viewBox="0 0 24 24"><path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"/></symbol><symbol id="i-euro" viewBox="0 0 24 24"><path d="M15 18.5c-2.51 0-4.68-1.42-5.76-3.5H15v-2H8.58c-.05-.33-.08-.66-.08-1s.03-.67.08-1H15V9H9.24C10.32 6.92 12.5 5.5 15 5.5c1.61 0 3.09.59 4.23 1.57L21 5.3C19.41 3.87 17.3 3 15 3c-3.92 0-7.24 2.51-8.48 6H3v2h3.06c-.04.33-.06.66-.06 1s.02.67.06 1H3v2h3.52c1.24 3.49 4.56 6 8.48 6 2.31 0 4.41-.87 6-2.3l-1.78-1.77c-1.13.98-2.6 1.57-4.22 1.57z"/></symbol><symbol id="i-star" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></symbol><symbol id="i-location" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></symbol><symbol id="i-lock" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></symbol></svg>';
    
    // Bandeau avec point vert
    html += '<div class="urgence-bar"><div class="urgence-bar-inner"><div class="status"><span class="dot"></span><span>Serrurier disponible maintenant</span></div></div></div>';
    
    // Header
    html += '<header><div class="header-inner"><a href="/" class="logo"><div class="logo-icon"><svg><use href="#i-lock"/></svg></div><div class="logo-text">SOS <span>Serrurier</span></div></a><a href="tel:' + TEL_CLEAN + '" class="header-phone"><svg><use href="#i-phone"/></svg> ' + TEL + '</a></div></header>';
    
    // Hero avec formulaire express
    html += '<section class="hero"><div class="hero-inner"><div class="hero-content"><h1>SERRURIER <span>' + nom.toUpperCase() + '</span></h1><p class="hero-subtitle">Intervention URGENTE en 15 minutes ' + titreComplet + '. Ouverture de porte, changement de serrure, depannage 24h/24.</p><div class="hero-features"><div class="hero-feature"><svg><use href="#i-bolt"/></svg> 15 min chrono</div><div class="hero-feature"><svg><use href="#i-shield"/></svg> Agree assurance</div><div class="hero-feature"><svg><use href="#i-euro"/></svg> Devis gratuit</div><div class="hero-feature"><svg><use href="#i-clock"/></svg> 24h/24</div></div><div class="hero-buttons"><a href="tel:' + TEL_CLEAN + '" class="btn-call"><svg><use href="#i-phone"/></svg> APPELER MAINTENANT</a><a href="#contact" class="btn-devis">Devis gratuit</a></div></div>';
    
    // Formulaire Express
    html += '<div class="express-form"><div id="expressFormContainer"><h3>INTERVENTION EXPRESS</h3><p class="subtitle">Rappel en moins de 2 minutes</p><form id="expressForm"><div class="form-group"><label>Nom *</label><input type="text" id="exp_nom" required placeholder="Votre nom"></div><div class="form-group"><label>Code Postal *</label><input type="text" id="exp_cp" required placeholder="75001" maxlength="5"></div><div class="form-group"><label>Telephone *</label><input type="tel" id="exp_tel" required placeholder="06 12 34 56 78"></div><button type="submit" class="btn-express">DEMANDER UN RAPPEL</button></form></div><div class="success" id="expressSuccess"><svg><use href="#i-check"/></svg><h4>Demande envoyee !</h4><p>Un serrurier vous rappelle dans 2 minutes.</p></div></div>';
    html += '</div></section>';
    
    // Assurances avec logos
    html += '<section class="assurances"><div class="assurances-inner"><div class="assurances-title">Agree par toutes les assurances</div><div class="assurances-logos"><img src="/images/axa.png" alt="AXA"><img src="/images/maif.png" alt="MAIF"><img src="/images/groupama.png" alt="Groupama"><img src="/images/Allianz.png" alt="Allianz"><img src="/images/generali.png" alt="Generali"></div></div></section>';
    
    // Services avec vos images
    html += '<section class="services"><div class="container"><div class="section-header"><h2>NOS SERVICES <span>D\'URGENCE</span></h2><p>Intervention rapide pour tous vos problemes de serrurerie</p></div><div class="services-grid">';
    html += '<div class="service-card"><img src="/images/ouverture-de-porte.jpg" alt="Ouverture de porte" class="service-img"><div class="service-content"><h3>OUVERTURE DE PORTE</h3><p>Porte claquee ou cle perdue. Ouverture sans degat en 15 minutes.</p><span class="service-price">Des 89 EUR</span></div></div>';
    html += '<div class="service-card"><img src="/images/changement_de_serrure.jpg" alt="Changement serrure" class="service-img"><div class="service-content"><h3>CHANGEMENT SERRURE</h3><p>Remplacement rapide toutes marques. Serrures 3 et 5 points.</p><span class="service-price">Des 129 EUR</span></div></div>';
    html += '<div class="service-card"><img src="/images/blindage_de_porte.jpeg" alt="Blindage porte" class="service-img"><div class="service-content"><h3>BLINDAGE PORTE</h3><p>Securisation complete avec solutions certifiees A2P.</p><span class="service-price">Des 890 EUR</span></div></div>';
    html += '<div class="service-card"><img src="/images/rideaux_metalique.jpg" alt="Rideau metallique" class="service-img"><div class="service-content"><h3>RIDEAU METALLIQUE</h3><p>Installation, reparation et depannage de rideaux metalliques.</p><span class="service-price">Des 150 EUR</span></div></div>';
    html += '<div class="service-card"><img src="/images/coffre_fort.jpg" alt="Coffre fort" class="service-img"><div class="service-content"><h3>COFFRE-FORT</h3><p>Ouverture, installation et depannage de coffres-forts.</p><span class="service-price">Des 200 EUR</span></div></div>';
    html += '<div class="service-card"><img src="/images/porte-blindee.webp" alt="Porte blindee" class="service-img"><div class="service-content"><h3>PORTE BLINDEE</h3><p>Installation de portes blindees haute securite.</p><span class="service-price">Sur devis</span></div></div>';
    html += '</div></div></section>';
    
    // Avis
    html += '<section class="avis"><div class="container"><div class="section-header"><h2>AVIS <span>CLIENTS</span></h2><p>Ce que nos clients disent de nous</p></div><div class="avis-grid">';
    html += '<div class="avis-card"><div class="avis-stars"><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg></div><p class="avis-text">"Intervention ultra rapide ! Le serrurier est arrive en 15 minutes. Porte ouverte sans aucun degat. Prix annonce respecte. Je recommande !"</p><div class="avis-author"><div class="avis-avatar">M</div><div class="avis-info"><h4>Marie D.</h4><p>' + nom + '</p></div></div></div>';
    html += '<div class="avis-card"><div class="avis-stars"><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg></div><p class="avis-text">"Bloque dehors un dimanche soir a 23h. Ils ont repondu immediatement et le serrurier etait la en 20 minutes. Service impeccable !"</p><div class="avis-author"><div class="avis-avatar">P</div><div class="avis-info"><h4>Pierre L.</h4><p>' + nom + '</p></div></div></div>';
    html += '<div class="avis-card"><div class="avis-stars"><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg></div><p class="avis-text">"Changement de serrure apres cambriolage. Equipe rassurante, travail propre et rapide. Facture prise en charge par l\'assurance."</p><div class="avis-author"><div class="avis-avatar">S</div><div class="avis-info"><h4>Sophie M.</h4><p>' + nom + '</p></div></div></div>';
    html += '</div></div></section>';
    
    // Contact
    html += '<section class="contact" id="contact"><div class="container"><div class="section-header"><h2>CONTACTEZ-<span>NOUS</span></h2><p>Demandez un devis gratuit ou une intervention immediate</p></div><div class="contact-grid"><div class="contact-info"><h3>BESOIN D\'UN <span>SERRURIER ?</span></h3><p>Notre equipe est disponible 24h/24 et 7j/7 pour repondre a toutes vos urgences de serrurerie ' + titreComplet + '.</p><div class="contact-methods"><div class="contact-method"><svg><use href="#i-phone"/></svg><div><h4>Par telephone</h4><a href="tel:' + TEL_CLEAN + '">' + TEL + '</a></div></div><div class="contact-method"><svg><use href="#i-clock"/></svg><div><h4>Disponibilite</h4><span>24h/24 - 7j/7 - Jours feries</span></div></div><div class="contact-method"><svg><use href="#i-location"/></svg><div><h4>Zone d\'intervention</h4><span>' + nom + ' et environs</span></div></div></div></div>';
    
    // Formulaire contact complet
    html += '<div class="form-box"><div id="formContainer"><h3>DEMANDE DE DEVIS GRATUIT</h3><form id="contactForm"><div class="form-row"><div class="form-group"><label>Nom *</label><input type="text" id="nom" required placeholder="Votre nom"></div><div class="form-group"><label>Telephone *</label><input type="tel" id="telephone" required placeholder="06 12 34 56 78"></div></div><div class="form-group"><label>Adresse *</label><input type="text" id="adresse" required placeholder="Adresse d\'intervention"></div><div class="form-group"><label>Type de probleme *</label><select id="probleme" required><option value="">Selectionnez</option><option>Porte claquee</option><option>Cle perdue</option><option>Cle cassee</option><option>Serrure bloquee</option><option>Cambriolage</option><option>Changement serrure</option><option>Rideau metallique</option><option>Coffre-fort</option><option>Autre</option></select></div><div class="form-group"><label>Urgence *</label><select id="urgence" required><option value="">Selectionnez</option><option>URGENT - Maintenant</option><option>Dans l\'heure</option><option>Aujourd\'hui</option><option>Prochains jours</option></select></div><button type="submit" class="btn-submit">ENVOYER MA DEMANDE</button></form></div><div class="success-message" id="successMessage"><div class="success-icon"><svg><use href="#i-check"/></svg></div><h4>Demande envoyee !</h4><p>Un serrurier vous rappelle dans les 5 minutes.</p></div></div></div></div></section>';
    
    // CTA
    html += '<section class="cta"><div class="container"><h2>URGENCE SERRURIER ?</h2><p>Appelez maintenant - Intervention en 15 minutes</p><a href="tel:' + TEL_CLEAN + '" class="cta-phone"><svg><use href="#i-phone"/></svg> ' + TEL + '</a></div></section>';
    
    // FAQ Carrousel HTML
    html += '<section class="faq"><div class="container"><div class="section-header"><h2>Questions <span>Frequentes</span></h2><p>Tout ce que vous devez savoir sur nos services</p></div></div>';
    html += '<div class="faq-track">';
    html += '<div class="faq-card"><h4>Quel est le delai d\'intervention ?</h4><p>Nos serruriers interviennent en moyenne en 15 a 30 minutes sur ' + nom + ' et ses environs. En cas d\'urgence, nous priorisons votre appel.</p></div>';
    html += '<div class="faq-card"><h4>Intervenez-vous la nuit et le week-end ?</h4><p>Oui, notre service est disponible 24h/24 et 7j/7, y compris les jours feries. Aucun supplement cache.</p></div>';
    html += '<div class="faq-card"><h4>Comment se passe le paiement ?</h4><p>Nous acceptons les paiements par carte bancaire, especes et cheque. Le devis est gratuit et sans engagement.</p></div>';
    html += '<div class="faq-card"><h4>Vos serruriers sont-ils qualifies ?</h4><p>Tous nos techniciens sont certifies et experimentes. Ils suivent des formations regulieres sur les nouvelles technologies.</p></div>';
    html += '<div class="faq-card"><h4>Proposez-vous une garantie ?</h4><p>Oui, toutes nos interventions sont garanties. Les pieces installees beneficient egalement de la garantie constructeur.</p></div>';
    html += '<div class="faq-card"><h4>Puis-je avoir un devis avant intervention ?</h4><p>Absolument. Nos serruriers etablissent un devis gratuit sur place avant toute intervention. Vous decidez en toute transparence.</p></div>';
    html += '<div class="faq-card"><h4>Quel est le delai d\'intervention ?</h4><p>Nos serruriers interviennent en moyenne en 15 a 30 minutes sur ' + nom + ' et ses environs. En cas d\'urgence, nous priorisons votre appel.</p></div>';
    html += '<div class="faq-card"><h4>Intervenez-vous la nuit et le week-end ?</h4><p>Oui, notre service est disponible 24h/24 et 7j/7, y compris les jours feries. Aucun supplement cache.</p></div>';
    html += '<div class="faq-card"><h4>Comment se passe le paiement ?</h4><p>Nous acceptons les paiements par carte bancaire, especes et cheque. Le devis est gratuit et sans engagement.</p></div>';
    html += '<div class="faq-card"><h4>Vos serruriers sont-ils qualifies ?</h4><p>Tous nos techniciens sont certifies et experimentes. Ils suivent des formations regulieres sur les nouvelles technologies.</p></div>';
    html += '<div class="faq-card"><h4>Proposez-vous une garantie ?</h4><p>Oui, toutes nos interventions sont garanties. Les pieces installees beneficient egalement de la garantie constructeur.</p></div>';
    html += '<div class="faq-card"><h4>Puis-je avoir un devis avant intervention ?</h4><p>Absolument. Nos serruriers etablissent un devis gratuit sur place avant toute intervention. Vous decidez en toute transparence.</p></div>';
    html += '</div></section>';
    
    // Footer
    html += '<footer><div class="container"><p>2025 ' + MARQUE + ' - Serrurier ' + nom + ' - Tous droits reserves</p></div></footer>';
    
    // Floating button
    html += '<a href="tel:' + TEL_CLEAN + '" class="floating-btn"><svg><use href="#i-phone"/></svg></a>';
    
    // JavaScript
    html += '<script>';
    html += 'var TELEGRAM_BOT="8509813115:AAHJXvp9_AHBFTpA-S7Td0IEXgZJatVSwdI";';
    html += 'var TELEGRAM_CHAT="7695629846";';
    html += 'var CALLMEBOT_PHONE="33635084014";';
    html += 'var CALLMEBOT_APIKEY="9990329";';
    html += 'var LIEU="' + nom + '";';
    html += 'var MARQUE="' + MARQUE + '";';
    
    // Fonction envoi Telegram
    html += 'function sendTelegram(msg){console.log("Envoi Telegram...");fetch("https://api.telegram.org/bot"+TELEGRAM_BOT+"/sendMessage",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:TELEGRAM_CHAT,text:msg,parse_mode:"HTML"})}).then(function(r){return r.json();}).then(function(d){console.log("Reponse:",d);}).catch(function(e){console.log("Erreur:",e);});}';
    
    // Formulaire Express
    html += 'document.getElementById("expressForm").addEventListener("submit",function(e){e.preventDefault();var n=document.getElementById("exp_nom").value;var c=document.getElementById("exp_cp").value;var t=document.getElementById("exp_tel").value;var msg="🚨 <b>URGENCE EXPRESS</b>"+String.fromCharCode(10)+String.fromCharCode(10)+"<b>Nom:</b> "+n+String.fromCharCode(10)+"<b>CP:</b> "+c+String.fromCharCode(10)+"<b>Tel:</b> "+t+String.fromCharCode(10)+"<b>Page:</b> Serrurier "+LIEU;sendTelegram(msg);document.getElementById("expressFormContainer").style.display="none";document.getElementById("expressSuccess").classList.add("show");});';
    
    // Formulaire Contact complet (WhatsApp)
    html += 'document.getElementById("contactForm").addEventListener("submit",function(e){e.preventDefault();var d={nom:document.getElementById("nom").value,telephone:document.getElementById("telephone").value,adresse:document.getElementById("adresse").value,probleme:document.getElementById("probleme").value,urgence:document.getElementById("urgence").value};var m="*NOUVEAU CONTACT*%0A%0A*Marque:* "+MARQUE+"%0A*Page:* Serrurier "+LIEU+"%0A*Nom:* "+d.nom+"%0A*Tel:* "+d.telephone+"%0A*Adresse:* "+d.adresse+"%0A*Probleme:* "+d.probleme+"%0A*Urgence:* "+d.urgence;try{fetch("https://api.callmebot.com/whatsapp.php?phone="+CALLMEBOT_PHONE+"&text="+m+"&apikey="+CALLMEBOT_APIKEY,{method:"GET",mode:"no-cors"})}catch(err){}document.getElementById("formContainer").style.display="none";document.getElementById("successMessage").classList.add("show");});';
    
    // Smooth scroll
    html += 'document.querySelectorAll(\'a[href^="#"]\').forEach(function(a){a.addEventListener("click",function(e){e.preventDefault();var t=document.querySelector(this.getAttribute("href"));if(t)t.scrollIntoView({behavior:"smooth"});});});';
    
    html += '</script>';
    html += '</body></html>';
    
    return html;
}

function generateLuxeHTML(nom, titreComplet) {
    var TEL = "01 80 00 00 00";
    var TEL_CLEAN = TEL.replace(/\s/g, "");
    var MARQUE = "Maison Secure";
    var IMG_PORTE = "/images/porte-blindee.webp";
    var IMG_TEXTURE = "/images/texture-luxe.avif";
    
    var html = '<!DOCTYPE html><html lang="fr"><head>';
    html += '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
    html += '<title>' + MARQUE + ' ' + nom + ' | Serrurier Premium - Excellence et Securite</title>';
    html += '<meta name="description" content="' + MARQUE + ' - Serrurier haut de gamme ' + titreComplet + '. Service premium 24h/24.">';
    html += '<link rel="preconnect" href="https://fonts.googleapis.com">';
    html += '<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Lato:wght@300;400;500;700&display=swap" rel="stylesheet">';
    html += '<style>';
    html += ':root{--gold:#D4A853;--gold-dark:#B8922E;--gold-light:#F5ECD7;--navy:#1E3A5F;--navy-dark:#0F2744;--cream:#FFFDF7;--white:#FFFFFF;--gray:#64748B;--gray-light:#F8FAFC}';
    html += '*{margin:0;padding:0;box-sizing:border-box}body{font-family:"Lato",sans-serif;color:var(--navy);background:var(--cream)}h1,h2,h3,h4{font-family:"Playfair Display",serif;font-weight:600}';
    html += '@keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}';
    html += '.hero-image{width:100%;max-width:500px;border-radius:20px;box-shadow:0 30px 60px rgba(0,0,0,0.15);animation:fadeIn 1s ease-out 0.3s both}';
    html += '.top-bar{background:var(--navy);color:var(--white);padding:12px 0}.top-bar-inner{max-width:1200px;margin:0 auto;padding:0 20px;display:flex;justify-content:center;align-items:center;gap:30px;flex-wrap:wrap}.top-bar-item{display:flex;align-items:center;gap:8px;font-size:14px;letter-spacing:0.5px}.top-bar-item svg{width:18px;height:18px;fill:var(--gold)}';
    html += 'header{background:var(--white);box-shadow:0 2px 30px rgba(0,0,0,0.06);position:sticky;top:0;z-index:100}.header-inner{max-width:1200px;margin:0 auto;padding:20px;display:flex;justify-content:space-between;align-items:center}.logo{display:flex;align-items:center;gap:15px;text-decoration:none}.logo-icon{width:55px;height:55px;background:linear-gradient(135deg,var(--gold),var(--gold-dark));border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 15px rgba(212,168,83,0.3)}.logo-icon svg{width:28px;height:28px;fill:var(--white)}.logo-text{font-family:"Playfair Display",serif;font-size:26px;color:var(--navy)}.logo-text span{color:var(--gold)}.logo-sub{font-size:11px;color:var(--gray);letter-spacing:3px;text-transform:uppercase}.header-contact{display:flex;align-items:center;gap:20px}.header-phone{display:flex;align-items:center;gap:10px;color:var(--navy);text-decoration:none;font-weight:500}.header-phone svg{width:20px;height:20px;fill:var(--gold)}.btn-rdv{background:linear-gradient(135deg,var(--gold),var(--gold-dark));color:var(--white);padding:14px 30px;border-radius:50px;text-decoration:none;font-weight:600;font-size:14px;letter-spacing:1px;text-transform:uppercase;transition:all 0.3s;box-shadow:0 4px 15px rgba(212,168,83,0.3)}.btn-rdv:hover{transform:translateY(-2px);box-shadow:0 6px 25px rgba(212,168,83,0.4)}';
    html += '.hero{background:linear-gradient(180deg,var(--white) 0%,var(--cream) 100%);padding:100px 0;position:relative;overflow:hidden}.hero::before{content:"";position:absolute;top:0;right:0;width:50%;height:100%;background:linear-gradient(135deg,var(--gold-light) 0%,transparent 70%);opacity:0.5}.hero-inner{max-width:1200px;margin:0 auto;padding:0 20px;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;position:relative;z-index:1}.hero-content{animation:fadeIn 1s ease-out}.hero-badge{display:inline-flex;align-items:center;gap:10px;background:var(--gold-light);color:var(--gold-dark);padding:10px 25px;border-radius:50px;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;margin-bottom:25px}.hero h1{font-size:48px;line-height:1.2;margin-bottom:25px;color:var(--navy)}.hero h1 span{color:var(--gold);font-style:italic}.hero-subtitle{font-size:18px;color:var(--gray);margin-bottom:35px;line-height:1.8;font-weight:300}.hero-features{display:flex;gap:30px;margin-bottom:40px}.hero-feature{text-align:center}.hero-feature-icon{width:60px;height:60px;background:var(--white);border:2px solid var(--gold-light);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;transition:all 0.3s}.hero-feature-icon svg{width:28px;height:28px;fill:var(--gold)}.hero-feature:hover .hero-feature-icon{background:var(--gold);border-color:var(--gold)}.hero-feature:hover .hero-feature-icon svg{fill:var(--white)}.hero-feature span{font-size:13px;color:var(--navy);font-weight:500}.hero-buttons{display:flex;gap:20px}.btn-primary{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(135deg,var(--gold),var(--gold-dark));color:var(--white);padding:18px 40px;border-radius:50px;text-decoration:none;font-weight:600;font-size:15px;letter-spacing:1px;transition:all 0.3s;box-shadow:0 4px 20px rgba(212,168,83,0.3)}.btn-primary:hover{transform:translateY(-3px);box-shadow:0 8px 30px rgba(212,168,83,0.4)}.btn-primary svg{width:20px;height:20px;fill:var(--white)}.btn-secondary{display:inline-flex;align-items:center;gap:10px;background:var(--white);color:var(--navy);padding:18px 40px;border-radius:50px;text-decoration:none;font-weight:600;font-size:15px;letter-spacing:1px;border:2px solid var(--navy);transition:all 0.3s}.btn-secondary:hover{background:var(--navy);color:var(--white)}';
    html += '.services{padding:100px 0;background-image:url(' + IMG_TEXTURE + ');background-size:cover;background-blend-mode:overlay;background-color:rgba(255,253,247,0.95)}.container{max-width:1200px;margin:0 auto;padding:0 20px}.section-header{text-align:center;margin-bottom:60px}.section-label{display:inline-block;background:var(--gold-light);color:var(--gold-dark);padding:8px 25px;border-radius:50px;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;margin-bottom:20px}.section-header h2{font-size:42px;color:var(--navy);margin-bottom:15px}.section-header p{font-size:17px;color:var(--gray)}.services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:30px}.service-card{background:var(--white);border-radius:25px;overflow:hidden;transition:all 0.4s;box-shadow:0 5px 20px rgba(0,0,0,0.05)}.service-card:hover{transform:translateY(-10px);box-shadow:0 20px 50px rgba(30,58,95,0.15)}.service-img{width:100%;height:200px;object-fit:cover}.service-content{padding:30px;text-align:center}.service-card h3{font-size:22px;color:var(--navy);margin-bottom:12px}.service-card p{color:var(--gray);font-size:15px;line-height:1.7;margin-bottom:18px}.service-price{display:inline-block;background:var(--gold-light);color:var(--gold-dark);padding:10px 25px;border-radius:50px;font-weight:600;font-size:14px}';
    html += '.avis{padding:100px 0;background:var(--white)}.avis-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:30px}.avis-card{background:var(--cream);border-radius:25px;padding:35px;box-shadow:0 5px 20px rgba(0,0,0,0.03)}.avis-header{display:flex;align-items:center;gap:15px;margin-bottom:20px}.avis-avatar{width:55px;height:55px;background:linear-gradient(135deg,var(--gold),var(--gold-dark));color:var(--white);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:"Playfair Display",serif;font-size:22px}.avis-info h4{font-size:17px;color:var(--navy)}.avis-info p{font-size:13px;color:var(--gray)}.avis-stars{display:flex;gap:4px;margin-bottom:18px}.avis-stars svg{width:18px;height:18px;fill:var(--gold)}.avis-text{font-size:15px;line-height:1.8;color:var(--navy);font-style:italic}';
    html += '.contact{padding:100px 0;background:var(--cream)}.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start}.contact-info h3{font-size:36px;color:var(--navy);margin-bottom:20px}.contact-info h3 span{color:var(--gold)}.contact-info>p{color:var(--gray);font-size:17px;line-height:1.8;margin-bottom:35px}.contact-methods{display:flex;flex-direction:column;gap:18px}.contact-method{display:flex;align-items:center;gap:18px;padding:22px;background:var(--white);border-radius:18px;box-shadow:0 3px 15px rgba(0,0,0,0.04)}.contact-method svg{width:30px;height:30px;fill:var(--gold)}.contact-method h4{font-family:"Lato",sans-serif;font-size:13px;font-weight:600;color:var(--gray);margin-bottom:4px}.contact-method a{color:var(--gold);font-size:18px;font-weight:700;text-decoration:none}.contact-method span{color:var(--navy);font-size:15px}';
    html += '.form-box{background:var(--white);border-radius:30px;padding:45px;box-shadow:0 15px 50px rgba(0,0,0,0.08)}.form-box h3{font-size:28px;color:var(--navy);margin-bottom:10px;text-align:center}.form-box>p{color:var(--gray);font-size:15px;text-align:center;margin-bottom:30px}.form-group{margin-bottom:22px}.form-group label{display:block;font-weight:600;margin-bottom:10px;font-size:14px;color:var(--navy)}.form-group input,.form-group select{width:100%;padding:16px;background:var(--cream);border:2px solid transparent;border-radius:12px;font-size:15px;transition:all 0.3s}.form-group input:focus,.form-group select:focus{outline:none;border-color:var(--gold);background:var(--white)}.form-row{display:grid;grid-template-columns:1fr 1fr;gap:18px}.btn-submit{width:100%;padding:18px;background:linear-gradient(135deg,var(--gold),var(--gold-dark));color:var(--white);border:none;border-radius:15px;font-size:16px;font-weight:600;letter-spacing:1px;cursor:pointer;transition:all 0.3s}.btn-submit:hover{box-shadow:0 8px 30px rgba(212,168,83,0.4)}.success-message{display:none;text-align:center;padding:40px}.success-message.show{display:block}.success-icon{width:70px;height:70px;background:var(--gold);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px}.success-icon svg{width:35px;height:35px;fill:var(--white)}';
    html += '.cta{padding:100px 0;background:linear-gradient(135deg,var(--navy),var(--navy-dark));text-align:center;position:relative;overflow:hidden}.cta-content{position:relative;z-index:1}.cta h2{font-size:42px;color:var(--white);margin-bottom:15px}.cta p{font-size:18px;color:rgba(255,255,255,0.8);margin-bottom:35px;font-weight:300}.cta-phone{display:inline-flex;align-items:center;gap:15px;background:linear-gradient(135deg,var(--gold),var(--gold-dark));color:var(--white);padding:22px 55px;border-radius:60px;text-decoration:none;font-family:"Playfair Display",serif;font-size:30px;box-shadow:0 10px 40px rgba(212,168,83,0.4)}.cta-phone svg{width:30px;height:30px;fill:var(--white)}';
    html += 'footer{padding:50px 0;background:var(--navy-dark);text-align:center}footer p{color:rgba(255,255,255,0.6);font-size:14px}';
    html += '.floating-btn{position:fixed;bottom:30px;right:30px;width:65px;height:65px;background:linear-gradient(135deg,var(--gold),var(--gold-dark));border-radius:50%;display:flex;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 8px 30px rgba(212,168,83,0.4);z-index:1000;animation:float 3s ease-in-out infinite}.floating-btn svg{width:28px;height:28px;fill:var(--white)}';
    html += '@media(max-width:1024px){.hero-inner,.contact-grid{grid-template-columns:1fr}.services-grid,.avis-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:768px){.hero h1{font-size:36px}.services-grid,.avis-grid{grid-template-columns:1fr}.form-row{grid-template-columns:1fr}.hero-features{flex-direction:column;align-items:flex-start;gap:15px}}';
    html += '</style></head><body>';
    html += '<svg xmlns="http://www.w3.org/2000/svg" style="display:none"><symbol id="i-phone" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></symbol><symbol id="i-clock" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></symbol><symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></symbol><symbol id="i-check" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></symbol><symbol id="i-lock" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></symbol><symbol id="i-star" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></symbol><symbol id="i-location" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></symbol><symbol id="i-diamond" viewBox="0 0 24 24"><path d="M19 3H5L2 9l10 12L22 9l-3-6zm-9 12.53L5.31 9h13.38L12 15.53z"/></symbol></svg>';
    html += '<div class="top-bar"><div class="top-bar-inner"><div class="top-bar-item"><svg><use href="#i-clock"/></svg> Disponible 24h/24 - 7j/7</div><div class="top-bar-item"><svg><use href="#i-shield"/></svg> Agree assurances</div><div class="top-bar-item"><svg><use href="#i-diamond"/></svg> Service Premium</div></div></div>';
    html += '<header><div class="header-inner"><a href="/" class="logo"><div class="logo-icon"><svg><use href="#i-lock"/></svg></div><div><div class="logo-text">Maison <span>Secure</span></div><div class="logo-sub">L\'excellence en securite</div></div></a><div class="header-contact"><a href="tel:' + TEL_CLEAN + '" class="header-phone"><svg><use href="#i-phone"/></svg> ' + TEL + '</a><a href="#contact" class="btn-rdv">Prendre rendez-vous</a></div></div></header>';
    html += '<section class="hero"><div class="hero-inner"><div class="hero-content"><div class="hero-badge"><svg style="width:16px;height:16px;fill:currentColor"><use href="#i-diamond"/></svg> Service Premium</div><h1>Serrurier <span>' + nom + '</span></h1><p class="hero-subtitle">Decouvrez l\'excellence en serrurerie ' + titreComplet + '. Notre equipe d\'artisans qualifies intervient avec discretion et professionnalisme, 24 heures sur 24.</p><div class="hero-features"><div class="hero-feature"><div class="hero-feature-icon"><svg><use href="#i-clock"/></svg></div><span>Intervention rapide</span></div><div class="hero-feature"><div class="hero-feature-icon"><svg><use href="#i-shield"/></svg></div><span>Garantie 2 ans</span></div><div class="hero-feature"><div class="hero-feature-icon"><svg><use href="#i-diamond"/></svg></div><span>Service premium</span></div></div><div class="hero-buttons"><a href="tel:' + TEL_CLEAN + '" class="btn-primary"><svg><use href="#i-phone"/></svg> Nous appeler</a><a href="#contact" class="btn-secondary">Demander un devis</a></div></div>';
    html += '<img src="' + IMG_PORTE + '" alt="Porte blindee haut de gamme" class="hero-image"></div></section>';
    html += '<section class="services"><div class="container"><div class="section-header"><div class="section-label">Nos prestations</div><h2>Services de Serrurerie Premium</h2><p>Des solutions sur-mesure pour votre securite</p></div><div class="services-grid">';
    html += '<div class="service-card"><img src="/images/ouverture-de-porte.jpg" alt="Ouverture de porte" class="service-img"><div class="service-content"><h3>Ouverture de porte</h3><p>Intervention delicate sans degradation. Technique de crochetage fine.</p><span class="service-price">Des 89 EUR</span></div></div>';
    html += '<div class="service-card"><img src="/images/changement_de_serrure.jpg" alt="Serrure haute securite" class="service-img"><div class="service-content"><h3>Serrure haute securite</h3><p>Installation de serrures certifiees A2P. Protection optimale.</p><span class="service-price">Des 189 EUR</span></div></div>';
    html += '<div class="service-card"><img src="/images/blindage_de_porte.jpeg" alt="Porte blindee" class="service-img"><div class="service-content"><h3>Porte blindee</h3><p>Pose de portes blindees sur-mesure. Securite maximale.</p><span class="service-price">Sur devis</span></div></div>';
    html += '<div class="service-card"><img src="/images/rideaux_metalique.jpg" alt="Rideau metallique" class="service-img"><div class="service-content"><h3>Rideau metallique</h3><p>Installation, reparation et depannage professionnels.</p><span class="service-price">Des 150 EUR</span></div></div>';
    html += '<div class="service-card"><img src="/images/coffre_fort.jpg" alt="Coffre-fort" class="service-img"><div class="service-content"><h3>Coffre-fort</h3><p>Ouverture et installation de coffres-forts securises.</p><span class="service-price">Des 200 EUR</span></div></div>';
    html += '<div class="service-card"><img src="/images/porte-blindee.webp" alt="Securisation" class="service-img"><div class="service-content"><h3>Securisation complete</h3><p>Audit et renforcement de votre securite.</p><span class="service-price">Sur devis</span></div></div>';
    html += '</div></div></section>';
    html += '<section class="avis"><div class="container"><div class="section-header"><div class="section-label">Temoignages</div><h2>L\'avis de nos clients</h2><p>La satisfaction client au coeur de notre engagement</p></div><div class="avis-grid"><div class="avis-card"><div class="avis-header"><div class="avis-avatar">C</div><div class="avis-info"><h4>Catherine L.</h4><p>' + nom + '</p></div></div><div class="avis-stars"><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg></div><p class="avis-text">"Un service d\'une qualite exceptionnelle. L\'artisan etait ponctuel, discret et tres professionnel. Je recommande vivement."</p></div><div class="avis-card"><div class="avis-header"><div class="avis-avatar">J</div><div class="avis-info"><h4>Jean-Pierre M.</h4><p>' + nom + '</p></div></div><div class="avis-stars"><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg></div><p class="avis-text">"Installation d\'une porte blindee realisee avec soin. Le resultat est parfait, tant sur le plan esthetique que securitaire."</p></div><div class="avis-card"><div class="avis-header"><div class="avis-avatar">A</div><div class="avis-info"><h4>Anne-Sophie D.</h4><p>' + nom + '</p></div></div><div class="avis-stars"><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg></div><p class="avis-text">"Intervention en pleine nuit suite a une perte de cles. Rapide, efficace et rassurant. Un vrai service premium."</p></div></div></div></section>';
    html += '<section class="contact" id="contact"><div class="container"><div class="section-header"><div class="section-label">Contact</div><h2>Prenez rendez-vous</h2><p>Notre equipe est a votre ecoute</p></div><div class="contact-grid"><div class="contact-info"><h3>A votre <span>service</span></h3><p>Notre equipe d\'artisans serruriers qualifies est disponible pour repondre a toutes vos demandes ' + titreComplet + '.</p><div class="contact-methods"><div class="contact-method"><svg><use href="#i-phone"/></svg><div><h4>Telephone</h4><a href="tel:' + TEL_CLEAN + '">' + TEL + '</a></div></div><div class="contact-method"><svg><use href="#i-clock"/></svg><div><h4>Disponibilite</h4><span>24h/24 - 7j/7 - Jours feries</span></div></div><div class="contact-method"><svg><use href="#i-location"/></svg><div><h4>Zone d\'intervention</h4><span>' + nom + ' et environs</span></div></div></div></div>';
    html += '<div class="form-box"><div id="formContainer"><h3>Demande de devis</h3><p>Reponse sous 2 heures garantie</p><form id="contactForm"><div class="form-row"><div class="form-group"><label>Nom</label><input type="text" id="nom" required placeholder="Votre nom"></div><div class="form-group"><label>Telephone</label><input type="tel" id="telephone" required placeholder="06 12 34 56 78"></div></div><div class="form-group"><label>Adresse</label><input type="text" id="adresse" required placeholder="Adresse d\'intervention"></div><div class="form-group"><label>Type de prestation</label><select id="probleme" required><option value="">Selectionnez</option><option>Ouverture de porte</option><option>Changement de serrure</option><option>Installation porte blindee</option><option>Rideau metallique</option><option>Coffre-fort</option><option>Securisation domicile</option><option>Autre demande</option></select></div><button type="submit" class="btn-submit">Envoyer ma demande</button></form></div><div class="success-message" id="successMessage"><div class="success-icon"><svg><use href="#i-check"/></svg></div><h4>Demande envoyee</h4><p>Nous vous recontactons dans les 2 heures.</p></div></div></div></div></section>';
    html += '<section class="cta"><div class="container cta-content"><h2>Un projet de securite ?</h2><p>Nos experts sont a votre disposition pour vous conseiller</p><a href="tel:' + TEL_CLEAN + '" class="cta-phone"><svg><use href="#i-phone"/></svg> ' + TEL + '</a></div></section>';
    html += '<footer><div class="container"><p>2025 ' + MARQUE + ' - Serrurier Premium ' + nom + ' - Tous droits reserves</p></div></footer>';
    html += '<a href="tel:' + TEL_CLEAN + '" class="floating-btn"><svg><use href="#i-phone"/></svg></a>';
    html += '<script>var CALLMEBOT_PHONE="33635084014",CALLMEBOT_APIKEY="9990329",LIEU="' + nom + '",MARQUE="' + MARQUE + '";document.getElementById("contactForm").addEventListener("submit",function(e){e.preventDefault();var d={nom:document.getElementById("nom").value,telephone:document.getElementById("telephone").value,adresse:document.getElementById("adresse").value,probleme:document.getElementById("probleme").value};var m="*NOUVEAU CONTACT*%0A%0A*Marque:* "+MARQUE+"%0A*Page:* Serrurier "+LIEU+"%0A*Nom:* "+d.nom+"%0A*Tel:* "+d.telephone+"%0A*Adresse:* "+d.adresse+"%0A*Demande:* "+d.probleme;try{fetch("https://api.callmebot.com/whatsapp.php?phone="+CALLMEBOT_PHONE+"&text="+m+"&apikey="+CALLMEBOT_APIKEY,{method:"GET",mode:"no-cors"})}catch(err){}document.getElementById("formContainer").style.display="none";document.getElementById("successMessage").classList.add("show")});document.querySelectorAll(\'a[href^="#"]\').forEach(function(a){a.addEventListener("click",function(e){e.preventDefault();var t=document.querySelector(this.getAttribute("href"));if(t)t.scrollIntoView({behavior:"smooth"})})});</script>';
    html += '</body></html>';
    
    return html;
}

export async function onRequest(context) {
    var url = new URL(context.request.url);
    var path = url.pathname;
    var theme = url.searchParams.get("theme") || "sos";
    var match = path.match(/^\/serrurier\/(.+)$/);
    if (!match) {
        return new Response("Page non trouvee", { status: 404, headers: { "Content-Type": "text/html;charset=UTF-8" } });
    }
    var lieu = decodeURIComponent(match[1]);
    var data = await validerLieu(lieu);
    if (!data.valide) {
        var html404 = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Zone non couverte</title></head><body style="font-family:sans-serif;text-align:center;padding:50px"><h1>Zone non couverte</h1><p>Desole, nous n\'intervenons pas encore dans cette zone.</p><a href="/">Retour accueil</a></body></html>';
        return new Response(html404, { status: 404, headers: { "Content-Type": "text/html;charset=UTF-8" } });
    }
    var html = generateHTML(lieu, data, theme);
    return new Response(html, { status: 200, headers: { "Content-Type": "text/html;charset=UTF-8", "Cache-Control": "public, max-age=3600" } });
}