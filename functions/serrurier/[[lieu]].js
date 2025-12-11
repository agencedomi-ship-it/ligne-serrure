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
var TELEPHONE = "0 800 123 456";

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
    
    if (DEPARTEMENTS_ACTIFS[rechercheClean]) {
        return { valide: true, type: "departement", code: rechercheClean, nom: DEPARTEMENTS_ACTIFS[rechercheClean], slug: rechercheClean };
    }
    
    for (var code in DEPARTEMENTS_ACTIFS) {
        if (slugify(DEPARTEMENTS_ACTIFS[code]) === slug) {
            return { valide: true, type: "departement", code: code, nom: DEPARTEMENTS_ACTIFS[code], slug: code };
        }
    }
    
    for (var regionSlug in REGIONS) {
        var regionData = REGIONS[regionSlug];
        if (slug === regionSlug || slug === slugify(regionData.nom)) {
            var depActifs = regionData.departements.filter(function(d) { return DEPARTEMENTS_ACTIFS[d]; });
            if (depActifs.length > 0) {
                return { valide: true, type: "region", code: regionSlug, nom: regionData.nom, slug: regionSlug, departements: depActifs };
            }
        }
    }
    
    if (/^\d{5}$/.test(rechercheClean)) {
        var codeDep = rechercheClean.substring(0, 2);
        if (DEPARTEMENTS_ACTIFS[codeDep]) {
            var villes = await getVillesDepartement(codeDep);
            for (var i = 0; i < villes.length; i++) {
                if (villes[i].codesPostaux && villes[i].codesPostaux.indexOf(rechercheClean) !== -1) {
                    return { valide: true, type: "code_postal", code: rechercheClean, nom: villes[i].nom, slug: rechercheClean, departement: codeDep };
                }
            }
        }
        return { valide: false, raison: "code_postal_hors_zone" };
    }
    
    for (var codeDep in DEPARTEMENTS_ACTIFS) {
        var villes = await getVillesDepartement(codeDep);
        for (var i = 0; i < villes.length; i++) {
            if (slugify(villes[i].nom) === slug) {
                return { valide: true, type: "ville", code: villes[i].code, nom: villes[i].nom, slug: slugify(villes[i].nom), departement: codeDep };
            }
        }
    }
    
    return { valide: false, raison: "lieu_non_trouve" };
}

function generateHTML(lieu, data) {
    var nom = data.nom;
    var type = data.type;
    var prefix = "a ";
    if (type === "departement") prefix = "dans le ";
    if (type === "region") prefix = "en ";
    var titreComplet = prefix + nom;
    var TEL_CLEAN = TELEPHONE.replace(/\s/g, "");
    
    var html = '<!DOCTYPE html>';
    html += '<html lang="fr">';
    html += '<head>';
    html += '<meta charset="UTF-8">';
    html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
    html += '<title>Serrurier ' + nom + ' - Depannage 24h/24</title>';
    html += '<meta name="description" content="Serrurier ' + titreComplet + ' disponible 24h/24. Intervention en 30 minutes.">';
    html += '<link rel="preconnect" href="https://fonts.googleapis.com">';
    html += '<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet">';
    html += '<style>';
    html += ':root{--primary:#E63946;--primary-dark:#C1121F;--secondary:#1D3557;--accent:#F4A261;--white:#FFFFFF;--dark:#1A1A2E;--gray:#6B7280;--gray-light:#F3F4F6;--success:#10B981}';
    html += '*{margin:0;padding:0;box-sizing:border-box}';
    html += 'body{font-family:"Open Sans",sans-serif;color:var(--dark);line-height:1.6}';
    html += 'h1,h2,h3,h4{font-family:"Montserrat",sans-serif}';
    html += '.top-bar{background:var(--secondary);color:var(--white);padding:10px 0;font-size:14px}';
    html += '.top-bar-inner{max-width:1200px;margin:0 auto;padding:0 20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px}';
    html += '.top-bar-left{display:flex;align-items:center;gap:24px}';
    html += '.top-bar-item{display:flex;align-items:center;gap:8px}';
    html += '.top-bar-item svg{fill:var(--accent);width:18px;height:18px}';
    html += '.top-bar-right{display:flex;align-items:center;gap:16px}';
    html += '.urgence-badge{background:var(--primary);padding:6px 14px;border-radius:4px;font-weight:600;display:flex;align-items:center;gap:6px}';
    html += '.urgence-badge svg{fill:white;width:18px;height:18px}';
    html += '.top-bar-right a{color:white;text-decoration:none;font-weight:600;display:flex;align-items:center;gap:6px}';
    html += '.top-bar-right a svg{fill:white;width:18px;height:18px}';
    html += 'header{background:var(--white);box-shadow:0 2px 20px rgba(0,0,0,.08);position:sticky;top:0;z-index:100}';
    html += '.header-inner{max-width:1200px;margin:0 auto;padding:16px 20px;display:flex;justify-content:space-between;align-items:center}';
    html += '.logo{display:flex;align-items:center;gap:12px;text-decoration:none}';
    html += '.logo-icon{width:50px;height:50px;background:linear-gradient(135deg,var(--primary),var(--primary-dark));border-radius:12px;display:flex;align-items:center;justify-content:center}';
    html += '.logo-icon svg{width:28px;height:28px;fill:white}';
    html += '.logo-text{font-family:"Montserrat",sans-serif;font-weight:800;font-size:24px;color:var(--secondary)}';
    html += '.logo-text span{color:var(--primary)}';
    html += '.btn-phone{display:flex;align-items:center;gap:10px;background:var(--primary);color:white;padding:14px 28px;border-radius:50px;text-decoration:none;font-weight:700;font-size:18px}';
    html += '.btn-phone svg{fill:white;width:20px;height:20px}';
    html += '.hero{background:linear-gradient(135deg,var(--secondary),#0D1B2A);color:var(--white);padding:80px 0}';
    html += '.hero-inner{max-width:1200px;margin:0 auto;padding:0 20px}';
    html += '.hero h1{font-size:48px;font-weight:900;line-height:1.1;margin-bottom:24px}';
    html += '.hero h1 span{color:var(--accent)}';
    html += '.hero-subtitle{font-size:18px;opacity:.9;margin-bottom:32px;max-width:600px}';
    html += '.hero-buttons{display:flex;gap:16px;flex-wrap:wrap}';
    html += '.btn-primary{display:inline-flex;align-items:center;gap:10px;background:var(--primary);color:white;padding:18px 36px;border-radius:8px;text-decoration:none;font-weight:700;font-size:18px}';
    html += '.btn-primary svg{fill:white;width:20px;height:20px}';
    html += '.container{max-width:1200px;margin:0 auto;padding:0 20px}';
    html += '.section-header{text-align:center;margin-bottom:50px}';
    html += '.section-header h2{font-size:36px;font-weight:800;color:var(--secondary);margin-bottom:16px}';
    html += '.section-header p{font-size:18px;color:var(--gray)}';
    html += '.services{padding:80px 0;background:var(--gray-light)}';
    html += '.services-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px}';
    html += '.service-card{background:var(--white);border-radius:16px;padding:32px;text-align:center}';
    html += '.service-icon{width:80px;height:80px;background:linear-gradient(135deg,var(--primary),var(--primary-dark));border-radius:20px;display:flex;align-items:center;justify-content:center;margin:0 auto 24px}';
    html += '.service-icon svg{fill:white;width:40px;height:40px}';
    html += '.service-card h3{font-size:20px;font-weight:700;color:var(--secondary);margin-bottom:12px}';
    html += '.service-card p{color:var(--gray);font-size:15px;margin-bottom:20px}';
    html += '.service-price{display:inline-block;background:#F1FAEE;color:var(--primary);padding:8px 20px;border-radius:50px;font-weight:700}';
    html += '.contact{padding:80px 0;background:var(--gray-light)}';
    html += '.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px}';
    html += '.contact-info h3{font-size:28px;font-weight:800;color:var(--secondary);margin-bottom:20px}';
    html += '.contact-info p{color:var(--gray);margin-bottom:32px}';
    html += '.form-box{background:var(--white);border-radius:20px;padding:40px;box-shadow:0 10px 40px rgba(0,0,0,.1)}';
    html += '.form-box h3{font-size:24px;font-weight:800;color:var(--secondary);margin-bottom:8px}';
    html += '.form-group{margin-bottom:20px}';
    html += '.form-group label{display:block;font-weight:600;color:var(--secondary);margin-bottom:8px}';
    html += '.form-group input,.form-group select,.form-group textarea{width:100%;padding:14px 18px;border:2px solid var(--gray-light);border-radius:10px;font-size:16px}';
    html += '.form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}';
    html += '.btn-submit{width:100%;padding:18px;background:var(--success);color:white;border:none;border-radius:10px;font-size:18px;font-weight:700;cursor:pointer}';
    html += '.success-message{display:none;text-align:center;padding:40px}';
    html += '.success-message.show{display:block}';
    html += '.cta-section{padding:80px 0;background:linear-gradient(135deg,var(--primary),var(--primary-dark));color:var(--white);text-align:center}';
    html += '.cta-section h2{font-size:40px;font-weight:900;margin-bottom:16px}';
    html += '.cta-phone{display:inline-flex;align-items:center;gap:16px;background:var(--white);color:var(--primary);padding:24px 48px;border-radius:16px;text-decoration:none;font-size:32px;font-weight:900}';
    html += '.cta-phone svg{fill:var(--primary);width:32px;height:32px}';
    html += 'footer{background:var(--dark);color:var(--white);padding:40px 0;text-align:center}';
    html += '.floating-btn{position:fixed;bottom:24px;right:24px;width:60px;height:60px;background:var(--success);border-radius:50%;display:flex;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 6px 20px rgba(0,0,0,.3);z-index:1000}';
    html += '.floating-btn svg{fill:white;width:28px;height:28px}';
    html += '@media(max-width:768px){.hero h1{font-size:32px}.contact-grid{grid-template-columns:1fr}.form-row{grid-template-columns:1fr}.cta-phone{font-size:24px;padding:20px 32px}}';
    html += '</style>';
    html += '</head>';
    html += '<body>';
    
    html += '<svg xmlns="http://www.w3.org/2000/svg" style="display:none">';
    html += '<symbol id="i-phone" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></symbol>';
    html += '<symbol id="i-location" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></symbol>';
    html += '<symbol id="i-clock" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></symbol>';
    html += '<symbol id="i-bolt" viewBox="0 0 24 24"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></symbol>';
    html += '<symbol id="i-lock" viewBox="0 0 24 24"><path d="M12 1C8.676 1 6 3.676 6 7v2H4v14h16V9h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v2H8V7c0-2.276 1.724-4 4-4z"/></symbol>';
    html += '<symbol id="i-door" viewBox="0 0 24 24"><path d="M19 19V5c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v14H3v2h18v-2h-2zm-2 0H7V5h10v14z"/></symbol>';
    html += '<symbol id="i-key" viewBox="0 0 24 24"><path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></symbol>';
    html += '<symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></symbol>';
    html += '<symbol id="i-tool" viewBox="0 0 24 24"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></symbol>';
    html += '<symbol id="i-home" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></symbol>';
    html += '<symbol id="i-send" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></symbol>';
    html += '<symbol id="i-check" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></symbol>';
    html += '</svg>';
    
    html += '<div class="top-bar"><div class="top-bar-inner">';
    html += '<div class="top-bar-left">';
    html += '<div class="top-bar-item"><svg><use href="#i-location"/></svg> Serrurier ' + titreComplet + '</div>';
    html += '<div class="top-bar-item"><svg><use href="#i-clock"/></svg> Disponible 24h/24</div>';
    html += '</div>';
    html += '<div class="top-bar-right">';
    html += '<span class="urgence-badge"><svg><use href="#i-bolt"/></svg> URGENCE</span>';
    html += '<a href="tel:' + TEL_CLEAN + '"><svg><use href="#i-phone"/></svg> ' + TELEPHONE + '</a>';
    html += '</div></div></div>';
    
    html += '<header><div class="header-inner">';
    html += '<a href="/" class="logo"><div class="logo-icon"><svg><use href="#i-lock"/></svg></div>';
    html += '<div class="logo-text">Ligne<span>Serrure</span></div></a>';
    html += '<a href="tel:' + TEL_CLEAN + '" class="btn-phone"><svg><use href="#i-phone"/></svg> ' + TELEPHONE + '</a>';
    html += '</div></header>';
    
    html += '<section class="hero"><div class="hero-inner">';
    html += '<h1>SERRURIER <span>' + nom.toUpperCase() + '</span></h1>';
    html += '<p class="hero-subtitle">Intervention rapide en 30 minutes ' + titreComplet + '. Depannage serrurerie 24h/24, ouverture de porte, changement de serrure. Devis gratuit.</p>';
    html += '<div class="hero-buttons">';
    html += '<a href="tel:' + TEL_CLEAN + '" class="btn-primary"><svg><use href="#i-phone"/></svg> Appeler maintenant</a>';
    html += '</div></div></section>';
    
    html += '<section class="services" id="services"><div class="container">';
    html += '<div class="section-header"><h2>Nos services ' + titreComplet + '</h2><p>Une equipe de serruriers professionnels</p></div>';
    html += '<div class="services-grid">';
    html += '<div class="service-card"><div class="service-icon"><svg><use href="#i-door"/></svg></div><h3>Ouverture de porte</h3><p>Porte claquee, cle perdue. Ouverture en 30 min.</p><span class="service-price">A partir de 89 EUR</span></div>';
    html += '<div class="service-card"><div class="service-icon"><svg><use href="#i-lock"/></svg></div><h3>Changement serrure</h3><p>Remplacement toutes marques.</p><span class="service-price">A partir de 129 EUR</span></div>';
    html += '<div class="service-card"><div class="service-icon"><svg><use href="#i-shield"/></svg></div><h3>Blindage porte</h3><p>Solutions certifiees A2P.</p><span class="service-price">A partir de 890 EUR</span></div>';
    html += '<div class="service-card"><div class="service-icon"><svg><use href="#i-key"/></svg></div><h3>Double de cles</h3><p>Reproduction sur place.</p><span class="service-price">A partir de 15 EUR</span></div>';
    html += '<div class="service-card"><div class="service-icon"><svg><use href="#i-home"/></svg></div><h3>Installation</h3><p>Serrures connectees et haute securite.</p><span class="service-price">A partir de 149 EUR</span></div>';
    html += '<div class="service-card"><div class="service-icon"><svg><use href="#i-tool"/></svg></div><h3>Depannage urgent</h3><p>Intervention 24h/24.</p><span class="service-price">A partir de 99 EUR</span></div>';
    html += '</div></div></section>';
    
    html += '<section class="contact" id="contact"><div class="container">';
    html += '<div class="section-header"><h2>Contactez-nous</h2><p>Demandez un devis gratuit</p></div>';
    html += '<div class="contact-grid">';
    html += '<div class="contact-info"><h3>Besoin d un serrurier ?</h3><p>Notre equipe est disponible 24h/24 et 7j/7.</p>';
    html += '<a href="tel:' + TEL_CLEAN + '" class="btn-primary"><svg><use href="#i-phone"/></svg> ' + TELEPHONE + '</a></div>';
    html += '<div class="form-box"><div id="formContainer">';
    html += '<h3>Demande de devis gratuit</h3>';
    html += '<form id="contactForm">';
    html += '<div class="form-row"><div class="form-group"><label>Nom *</label><input type="text" id="nom" required></div>';
    html += '<div class="form-group"><label>Telephone *</label><input type="tel" id="telephone" required></div></div>';
    html += '<div class="form-group"><label>Adresse *</label><input type="text" id="adresse" required></div>';
    html += '<div class="form-group"><label>Probleme *</label><select id="probleme" required><option value="">Selectionnez</option><option>Porte claquee</option><option>Cle perdue</option><option>Serrure bloquee</option><option>Changement serrure</option><option>Autre</option></select></div>';
    html += '<div class="form-group"><label>Urgence *</label><select id="urgence" required><option value="">Selectionnez</option><option>URGENT - Maintenant</option><option>Aujourd hui</option><option>Prochains jours</option></select></div>';
    html += '<button type="submit" class="btn-submit">Envoyer</button>';
    html += '</form></div>';
    html += '<div class="success-message" id="successMessage"><h3>Demande envoyee !</h3><p>Un serrurier vous contactera rapidement.</p></div>';
    html += '</div></div></div></section>';
    
    html += '<section class="cta-section"><div class="container">';
    html += '<h2>Besoin d un serrurier ?</h2>';
    html += '<p>Appelez maintenant, intervention en 30 minutes</p>';
    html += '<a href="tel:' + TEL_CLEAN + '" class="cta-phone"><svg><use href="#i-phone"/></svg> ' + TELEPHONE + '</a>';
    html += '</div></section>';
    
    html += '<footer><div class="container"><p>2025 Ligne Serrure - Tous droits reserves</p></div></footer>';
    
    html += '<a href="tel:' + TEL_CLEAN + '" class="floating-btn"><svg><use href="#i-phone"/></svg></a>';
    
    html += '<script>';
    html += 'var CALLMEBOT_PHONE = "' + CALLMEBOT.phone + '";';
    html += 'var CALLMEBOT_APIKEY = "' + CALLMEBOT.apikey + '";';
    html += 'var LIEU = "' + nom + '";';
    html += 'document.getElementById("contactForm").addEventListener("submit", function(e) {';
    html += 'e.preventDefault();';
    html += 'var data = {nom: document.getElementById("nom").value, telephone: document.getElementById("telephone").value, adresse: document.getElementById("adresse").value, probleme: document.getElementById("probleme").value, urgence: document.getElementById("urgence").value};';
    html += 'var msg = "NOUVEAU CONTACT - Page: Serrurier " + LIEU + " - Nom: " + data.nom + " - Tel: " + data.telephone + " - Adresse: " + data.adresse + " - Probleme: " + data.probleme + " - Urgence: " + data.urgence;';
    html += 'try { fetch("https://api.callmebot.com/whatsapp.php?phone=" + CALLMEBOT_PHONE + "&text=" + encodeURIComponent(msg) + "&apikey=" + CALLMEBOT_APIKEY, {method:"GET",mode:"no-cors"}); } catch(err) {}';
    html += 'document.getElementById("formContainer").style.display = "none";';
    html += 'document.getElementById("successMessage").classList.add("show");';
    html += '});';
    html += '</script>';
    
    html += '</body></html>';
    
    return html;
}

function generate404(recherche) {
    var html = '<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">';
    html += '<title>Zone non desservie</title>';
    html += '<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:sans-serif;background:#F3F4F6;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}.container{background:white;border-radius:20px;padding:60px 40px;text-align:center;max-width:500px}h1{font-size:28px;color:#1D3557;margin-bottom:16px}p{color:#6B7280;margin-bottom:32px}.btn{display:inline-block;background:#E63946;color:white;padding:16px 32px;border-radius:8px;text-decoration:none}</style>';
    html += '</head><body><div class="container">';
    html += '<h1>Zone non desservie</h1>';
    html += '<p>Desole, nous n intervenons pas encore dans cette zone: "' + recherche + '"</p>';
    html += '<a href="/" class="btn">Retour</a>';
    html += '</div></body></html>';
    return html;
}

export async function onRequest(context) {
    var url = new URL(context.request.url);
    var path = url.pathname;
    var regex = /^\/serrurier\/(.+)$/;
    var match = path.match(regex);
    
    if (!match) return new Response("Not Found", { status: 404 });
    
    var lieu = decodeURIComponent(match[1]).toLowerCase().trim();
    if (!lieu) return Response.redirect("/", 302);
    
    try {
        var validation = await validerLieu(lieu);
        if (validation.valide) {
            return new Response(generateHTML(lieu, validation), { status: 200, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
        } else {
            return new Response(generate404(lieu), { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } });
        }
    } catch (error) {
        return new Response("<html><body><h1>Erreur</h1><a href='/'>Retour</a></body></html>", { status: 500, headers: { "Content-Type": "text/html" } });
    }
}
