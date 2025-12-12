// ============================================
// CONFIGURATION
// ============================================
const DEPARTEMENTS_ACTIFS = {
    "06": "Alpes-Maritimes", "13": "Bouches-du-Rhône", "17": "Charente-Maritime",
    "22": "Côtes-d'Armor", "30": "Gard", "31": "Haute-Garonne", "33": "Gironde",
    "34": "Hérault", "35": "Ille-et-Vilaine", "44": "Loire-Atlantique",
    "49": "Maine-et-Loire", "50": "Manche", "54": "Meurthe-et-Moselle",
    "56": "Morbihan", "69": "Rhône", "74": "Haute-Savoie", "83": "Var", "85": "Vendée",
};

const REGIONS = {
    "nouvelle-aquitaine": { nom: "Nouvelle-Aquitaine", departements: ["17", "33"] },
    "pays-de-la-loire": { nom: "Pays de la Loire", departements: ["44", "49", "85"] },
    "bretagne": { nom: "Bretagne", departements: ["22", "35", "56"] },
    "occitanie": { nom: "Occitanie", departements: ["30", "31", "34"] },
    "provence-alpes-cote-d-azur": { nom: "Provence-Alpes-Côte d'Azur", departements: ["06", "13", "83"] },
    "auvergne-rhone-alpes": { nom: "Auvergne-Rhône-Alpes", departements: ["69", "74"] },
    "normandie": { nom: "Normandie", departements: ["50"] },
    "grand-est": { nom: "Grand Est", departements: ["54"] }
};

const CALLMEBOT = { phone: "33635084014", apikey: "9990329" };
const TELEPHONE = "0 800 123 456";

// ============================================
// FONCTIONS UTILITAIRES
// ============================================
function slugify(text) {
    return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

async function getVillesDepartement(codeDep) {
    try {
        const response = await fetch(`https://geo.api.gouv.fr/departements/${codeDep}/communes?fields=nom,code,codesPostaux`);
        if (!response.ok) return [];
        return await response.json();
    } catch (error) { return []; }
}

async function validerLieu(recherche) {
    const slug = slugify(recherche);
    const rechercheClean = recherche.trim();
    
    if (DEPARTEMENTS_ACTIFS[rechercheClean]) {
        return { valide: true, type: 'departement', code: rechercheClean, nom: DEPARTEMENTS_ACTIFS[rechercheClean], slug: rechercheClean };
    }
    
    for (const [code, nom] of Object.entries(DEPARTEMENTS_ACTIFS)) {
        if (slugify(nom) === slug) {
            return { valide: true, type: 'departement', code, nom, slug: code };
        }
    }
    
    for (const [regionSlug, regionData] of Object.entries(REGIONS)) {
        if (slug === regionSlug || slug === slugify(regionData.nom)) {
            const depActifs = regionData.departements.filter(d => DEPARTEMENTS_ACTIFS[d]);
            if (depActifs.length > 0) {
                return { valide: true, type: 'region', code: regionSlug, nom: regionData.nom, slug: regionSlug, departements: depActifs };
            }
        }
    }
    
    if (/^\d{5}$/.test(rechercheClean)) {
        const codeDep = rechercheClean.startsWith('97') ? rechercheClean.substring(0, 3) : rechercheClean.substring(0, 2);
        if (DEPARTEMENTS_ACTIFS[codeDep]) {
            const villes = await getVillesDepartement(codeDep);
            const villesTrouvees = villes.filter(v => v.codesPostaux && v.codesPostaux.includes(rechercheClean));
            if (villesTrouvees.length > 0) {
                return { valide: true, type: 'code_postal', code: rechercheClean, nom: villesTrouvees[0].nom, slug: rechercheClean, departement: codeDep };
            }
        }
        return { valide: false, raison: 'code_postal_hors_zone' };
    }
    
    for (const codeDep of Object.keys(DEPARTEMENTS_ACTIFS)) {
        const villes = await getVillesDepartement(codeDep);
        const villeTrouvee = villes.find(v => slugify(v.nom) === slug);
        if (villeTrouvee) {
            return { valide: true, type: 'ville', code: villeTrouvee.code, nom: villeTrouvee.nom, slug: slugify(villeTrouvee.nom), departement: codeDep };
        }
    }
    
    return { valide: false, raison: 'lieu_non_trouve' };
}

// ============================================
// TEMPLATE HTML
// ============================================
function generateHTML(lieu, data) {
    const { nom, type } = data;
    let prefix = 'a ';
    if (type === 'departement') prefix = 'dans le ';
    if (type === 'region') prefix = 'en ';
    const titreComplet = `${prefix}${nom}`;
    const TEL_CLEAN = TELEPHONE.replace(/\s/g, '');
    
    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Serrurier ${nom} - Depannage 24h/24 | Intervention rapide</title>
    <meta name="description" content="Serrurier ${titreComplet} disponible 24h/24. Intervention en 30 minutes, devis gratuit.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        :root{--primary:#E63946;--primary-dark:#C1121F;--secondary:#1D3557;--accent:#F4A261;--white:#FFFFFF;--dark:#1A1A2E;--gray:#6B7280;--gray-light:#F3F4F6;--success:#10B981}
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:'Open Sans',sans-serif;color:var(--dark);line-height:1.6}
        h1,h2,h3,h4{font-family:'Montserrat',sans-serif}
        .icon{width:24px;height:24px;fill:currentColor}
        .icon-sm{width:18px;height:18px}
        .icon-lg{width:32px;height:32px}
        .icon-xl{width:40px;height:40px}
        
        .top-bar{background:var(--secondary);color:var(--white);padding:10px 0;font-size:14px}
        .top-bar-inner{max-width:1200px;margin:0 auto;padding:0 20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px}
        .top-bar-left{display:flex;align-items:center;gap:24px}
        .top-bar-item{display:flex;align-items:center;gap:8px}
        .top-bar-item svg{fill:var(--accent)}
        .top-bar-right{display:flex;align-items:center;gap:16px}
        .urgence-badge{background:var(--primary);padding:6px 14px;border-radius:4px;font-weight:600;display:flex;align-items:center;gap:6px;animation:pulse 2s infinite}
        .urgence-badge svg{fill:white}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.7}}
        .top-bar-right a{color:white;text-decoration:none;font-weight:600;display:flex;align-items:center;gap:6px}
        .top-bar-right a svg{fill:white}
        
        header{background:var(--white);box-shadow:0 2px 20px rgba(0,0,0,.08);position:sticky;top:0;z-index:100}
        .header-inner{max-width:1200px;margin:0 auto;padding:16px 20px;display:flex;justify-content:space-between;align-items:center}
        .logo{display:flex;align-items:center;gap:12px;text-decoration:none}
        .logo-icon{width:50px;height:50px;background:linear-gradient(135deg,var(--primary),var(--primary-dark));border-radius:12px;display:flex;align-items:center;justify-content:center}
        .logo-icon svg{width:28px;height:28px;fill:white}
        .logo-text{font-family:'Montserrat',sans-serif;font-weight:800;font-size:24px;color:var(--secondary)}
        .logo-text span{color:var(--primary)}
        .logo-sub{font-size:12px;color:var(--gray);font-weight:500}
        nav{display:flex;gap:32px}
        nav a{color:var(--secondary);text-decoration:none;font-weight:600;font-size:15px}
        nav a:hover{color:var(--primary)}
        .btn-phone{display:flex;align-items:center;gap:10px;background:var(--primary);color:white;padding:14px 28px;border-radius:50px;text-decoration:none;font-weight:700;font-size:18px;transition:all .3s;box-shadow:0 4px 15px rgba(230,57,70,.3)}
        .btn-phone:hover{background:var(--primary-dark);transform:translateY(-2px)}
        .btn-phone svg{fill:white}
        
        .hero{background:linear-gradient(135deg,var(--secondary),#0D1B2A);color:var(--white);padding:80px 0;position:relative}
        .hero-inner{max-width:1200px;margin:0 auto;padding:0 20px;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
        .hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);padding:8px 16px;border-radius:50px;font-size:14px;margin-bottom:24px}
        .hero-badge .dot{width:8px;height:8px;background:var(--success);border-radius:50%;animation:blink 1.5s infinite}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
        .hero h1{font-size:clamp(36px,5vw,56px);font-weight:900;line-height:1.1;margin-bottom:24px}
        .hero h1 span{color:var(--accent)}
        .hero-subtitle{font-size:18px;opacity:.9;margin-bottom:32px;max-width:500px}
        .hero-features{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:40px}
        .hero-feature{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.1);padding:10px 16px;border-radius:8px;font-size:14px;font-weight:500}
        .hero-feature svg{fill:var(--accent);width:18px;height:18px}
        .hero-buttons{display:flex;gap:16px;flex-wrap:wrap}
        .btn-primary{display:inline-flex;align-items:center;gap:10px;background:var(--primary);color:white;padding:18px 36px;border-radius:8px;text-decoration:none;font-weight:700;font-size:18px;transition:all .3s;border:none;cursor:pointer}
        .btn-primary:hover{background:var(--primary-dark);transform:translateY(-2px)}
        .btn-primary svg{fill:white}
        .btn-secondary{display:inline-flex;align-items:center;gap:10px;background:transparent;color:white;padding:18px 36px;border-radius:8px;text-decoration:none;font-weight:600;border:2px solid rgba(255,255,255,.3);transition:all .3s}
        .btn-secondary:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.5)}
        
        .trust-box{background:var(--white);border-radius:20px;padding:40px;color:var(--dark);box-shadow:0 25px 50px rgba(0,0,0,.3)}
        .trust-header{text-align:center;margin-bottom:30px}
        .trust-header h3{font-size:24px;font-weight:800;color:var(--secondary);margin-bottom:8px}
        .trust-rating{display:flex;align-items:center;justify-content:center;gap:8px}
        .trust-stars{display:flex;gap:2px}
        .trust-stars svg{fill:#FBBF24;width:20px;height:20px}
        .trust-score{font-weight:700;font-size:18px}
        .trust-reviews{color:var(--gray);font-size:14px}
        .trust-features{display:flex;flex-direction:column;gap:16px;margin-bottom:30px}
        .trust-feature{display:flex;align-items:center;gap:16px;padding:16px;background:var(--gray-light);border-radius:12px}
        .trust-feature-icon{width:48px;height:48px;background:var(--primary);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .trust-feature-icon svg{fill:white;width:24px;height:24px}
        .trust-feature-text h4{font-size:16px;font-weight:700;color:var(--secondary);margin-bottom:2px}
        .trust-feature-text p{font-size:14px;color:var(--gray)}
        .trust-cta{text-align:center}
        .trust-cta .btn-primary{width:100%;justify-content:center;font-size:20px;padding:20px}
        .trust-cta p{margin-top:12px;font-size:13px;color:var(--gray)}
        
        .container{max-width:1200px;margin:0 auto;padding:0 20px}
        .section-header{text-align:center;margin-bottom:50px}
        .section-header h2{font-size:36px;font-weight:800;color:var(--secondary);margin-bottom:16px}
        .section-header p{font-size:18px;color:var(--gray);max-width:600px;margin:0 auto}
        
        .services{padding:80px 0;background:var(--gray-light)}
        .services-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px}
        .service-card{background:var(--white);border-radius:16px;padding:32px;text-align:center;transition:all .3s;border:2px solid transparent}
        .service-card:hover{transform:translateY(-8px);border-color:var(--primary);box-shadow:0 20px 40px rgba(0,0,0,.1)}
        .service-icon{width:80px;height:80px;background:linear-gradient(135deg,var(--primary),var(--primary-dark));border-radius:20px;display:flex;align-items:center;justify-content:center;margin:0 auto 24px}
        .service-icon svg{fill:white;width:40px;height:40px}
        .service-card h3{font-size:20px;font-weight:700;color:var(--secondary);margin-bottom:12px}
        .service-card p{color:var(--gray);font-size:15px;margin-bottom:20px}
        .service-price{display:inline-block;background:#F1FAEE;color:var(--primary);padding:8px 20px;border-radius:50px;font-weight:700;font-size:14px}
        
        .why-us{padding:80px 0;background:var(--white)}
        .why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:32px}
        .why-item{text-align:center}
        .why-number{font-family:'Montserrat',sans-serif;font-size:48px;font-weight:900;color:var(--primary);margin-bottom:8px}
        .why-item h4{font-size:18px;font-weight:700;color:var(--secondary);margin-bottom:8px}
        .why-item p{font-size:14px;color:var(--gray)}
        
        .assurance{padding:80px 0;background:linear-gradient(135deg,var(--secondary),#0D1B2A);color:var(--white)}
        .assurance .section-header h2{color:var(--white)}
        .assurance .section-header p{color:rgba(255,255,255,.8)}
        .assurance-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:50px}
        .assurance-card{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);border-radius:16px;padding:32px;text-align:center;transition:all .3s}
        .assurance-card:hover{background:rgba(255,255,255,.15);transform:translateY(-4px)}
        .assurance-icon{width:70px;height:70px;background:var(--accent);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px}
        .assurance-icon svg{fill:white;width:32px;height:32px}
        .assurance-card h3{font-size:20px;font-weight:700;margin-bottom:12px}
        .assurance-card p{font-size:15px;opacity:.9}
        .logos-section{text-align:center}
        .logos-section h4{font-size:18px;margin-bottom:24px;opacity:.9}
        .logos-grid{display:flex;flex-wrap:wrap;justify-content:center;gap:16px}
        .logo-item{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);padding:16px 28px;border-radius:8px;font-weight:700;font-size:14px}
        
        .contact{padding:80px 0;background:var(--gray-light)}
        .contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start}
        .contact-info h3{font-size:28px;font-weight:800;color:var(--secondary);margin-bottom:20px}
        .contact-info>p{color:var(--gray);font-size:16px;margin-bottom:32px;line-height:1.7}
        .contact-methods{display:flex;flex-direction:column;gap:20px}
        .contact-method{display:flex;align-items:center;gap:20px;padding:20px;background:var(--white);border-radius:12px;box-shadow:0 4px 15px rgba(0,0,0,.05)}
        .contact-method-icon{width:56px;height:56px;background:var(--primary);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .contact-method-icon svg{fill:white;width:28px;height:28px}
        .contact-method-icon.location{background:var(--secondary)}
        .contact-method-text h4{font-size:16px;font-weight:700;color:var(--secondary);margin-bottom:4px}
        .contact-method-text p{color:var(--gray);font-size:14px}
        .contact-method-text a{color:var(--primary);font-weight:700;font-size:18px;text-decoration:none}
        
        .form-box{background:var(--white);border-radius:20px;padding:40px;box-shadow:0 10px 40px rgba(0,0,0,.1)}
        .form-box h3{font-size:24px;font-weight:800;color:var(--secondary);margin-bottom:8px}
        .form-box>p{color:var(--gray);margin-bottom:30px}
        .form-group{margin-bottom:20px}
        .form-group label{display:block;font-weight:600;color:var(--secondary);margin-bottom:8px;font-size:14px}
        .form-group input,.form-group select,.form-group textarea{width:100%;padding:14px 18px;border:2px solid var(--gray-light);border-radius:10px;font-size:16px;font-family:inherit;transition:all .3s}
        .form-group input:focus,.form-group select:focus,.form-group textarea:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 4px rgba(230,57,70,.1)}
        .form-group textarea{resize:vertical;min-height:100px}
        .form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        .btn-submit{width:100%;padding:18px;background:var(--success);color:white;border:none;border-radius:10px;font-size:18px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:12px;transition:all .3s;font-family:inherit}
        .btn-submit:hover{background:#0ea572;transform:translateY(-2px)}
        .btn-submit:disabled{opacity:.7;cursor:not-allowed}
        .btn-submit svg{fill:white;width:20px;height:20px}
        .form-note{text-align:center;margin-top:16px;font-size:13px;color:var(--gray);display:flex;align-items:center;justify-content:center;gap:6px}
        .form-note svg{fill:var(--gray);width:14px;height:14px}
        .success-message{display:none;text-align:center;padding:40px}
        .success-message.show{display:block}
        .success-icon{width:80px;height:80px;background:var(--success);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 24px}
        .success-icon svg{fill:white;width:40px;height:40px}
        .success-message h4{font-size:24px;color:var(--secondary);margin-bottom:12px}
        .success-message p{color:var(--gray);font-size:16px}
        
        .testimonials{padding:80px 0;background:var(--white)}
        .testimonials-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px}
        .testimonial-card{background:var(--gray-light);border-radius:16px;padding:32px}
        .testimonial-stars{display:flex;gap:4px;margin-bottom:16px}
        .testimonial-stars svg{fill:#FBBF24;width:20px;height:20px}
        .testimonial-text{font-size:16px;line-height:1.7;margin-bottom:24px;color:var(--dark)}
        .testimonial-author{display:flex;align-items:center;gap:16px}
        .testimonial-avatar{width:50px;height:50px;background:var(--primary);color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700}
        .testimonial-info h4{font-size:16px;font-weight:600;color:var(--secondary)}
        .testimonial-info p{font-size:14px;color:var(--gray)}
        
        .cta-section{padding:80px 0;background:linear-gradient(135deg,var(--primary),var(--primary-dark));color:var(--white);text-align:center}
        .cta-section h2{font-size:40px;font-weight:900;margin-bottom:16px}
        .cta-section p{font-size:20px;opacity:.9;margin-bottom:32px}
        .cta-phone{display:inline-flex;align-items:center;gap:16px;background:var(--white);color:var(--primary);padding:24px 48px;border-radius:16px;text-decoration:none;font-family:'Montserrat',sans-serif;font-size:32px;font-weight:900;transition:all .3s;box-shadow:0 10px 40px rgba(0,0,0,.2)}
        .cta-phone:hover{transform:scale(1.05)}
        .cta-phone svg{fill:var(--primary);width:32px;height:32px}
        
        footer{background:var(--dark);color:var(--white);padding:60px 0 30px}
        .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px;margin-bottom:40px}
        .footer-brand h3{font-size:24px;font-weight:800;margin-bottom:16px;display:flex;align-items:center;gap:10px}
        .footer-brand h3 svg{fill:var(--primary);width:28px;height:28px}
        .footer-brand p{color:rgba(255,255,255,.7);font-size:15px;line-height:1.7}
        .footer-links h4{font-size:16px;font-weight:700;margin-bottom:20px}
        .footer-links ul{list-style:none}
        .footer-links li{margin-bottom:12px}
        .footer-links a{color:rgba(255,255,255,.7);text-decoration:none;font-size:14px}
        .footer-links a:hover{color:var(--primary)}
        .footer-bottom{border-top:1px solid rgba(255,255,255,.1);padding-top:30px;text-align:center;color:rgba(255,255,255,.5);font-size:14px}
        
        .floating-btn{position:fixed;bottom:24px;right:24px;width:60px;height:60px;background:var(--success);border-radius:50%;display:flex;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 6px 20px rgba(0,0,0,.3);z-index:1000;animation:bounce 2s infinite}
        .floating-btn svg{fill:white;width:28px;height:28px}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        
        @media(max-width:1024px){.hero-inner{grid-template-columns:1fr}.trust-box{max-width:500px;margin:0 auto}.why-grid{grid-template-columns:repeat(2,1fr)}.assurance-grid{grid-template-columns:1fr}.contact-grid{grid-template-columns:1fr}.footer-grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:768px){.top-bar-inner{justify-content:center;text-align:center}.top-bar-left{flex-direction:column;gap:8px}nav{display:none}.hero{padding:60px 0}.hero-buttons{flex-direction:column}.btn-primary,.btn-secondary{width:100%;justify-content:center}.why-grid{grid-template-columns:1fr}.form-row{grid-template-columns:1fr}.footer-grid{grid-template-columns:1fr;text-align:center}.cta-phone{font-size:24px;padding:20px 32px}}
    </style>
</head>
<body>
    <svg xmlns="http://www.w3.org/2000/svg" style="display:none">
        <symbol id="i-lock" viewBox="0 0 24 24"><path d="M12 1C8.676 1 6 3.676 6 7v2H4v14h16V9h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v2H8V7c0-2.276 1.724-4 4-4zm0 10c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/></symbol>
        <symbol id="i-phone" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></symbol>
        <symbol id="i-location" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></symbol>
        <symbol id="i-clock" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></symbol>
        <symbol id="i-bolt" viewBox="0 0 24 24"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></symbol>
        <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></symbol>
        <symbol id="i-card" viewBox="0 0 24 24"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></symbol>
        <symbol id="i-check" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></symbol>
        <symbol id="i-door" viewBox="0 0 24 24"><path d="M19 19V5c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v14H3v2h18v-2h-2zm-2 0H7V5h10v14zm-4-8c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z"/></symbol>
        <symbol id="i-key" viewBox="0 0 24 24"><path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></symbol>
        <symbol id="i-tool" viewBox="0 0 24 24"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></symbol>
        <symbol id="i-home" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></symbol>
        <symbol id="i-doc" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></symbol>
        <symbol id="i-users" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></symbol>
        <symbol id="i-euro" viewBox="0 0 24 24"><path d="M15 18.5c-2.51 0-4.68-1.42-5.76-3.5H15v-2H8.58c-.05-.33-.08-.66-.08-1s.03-.67.08-1H15V9H9.24C10.32 6.92 12.5 5.5 15 5.5c1.61 0 3.09.59 4.23 1.57L21 5.3C19.41 3.87 17.3 3 15 3c-3.92 0-7.24 2.51-8.48 6H3v2h3.06c-.04.33-.06.66-.06 1s.02.67.06 1H3v2h3.52c1.24 3.49 4.56 6 8.48 6 2.31 0 4.41-.87 6-2.3l-1.78-1.77c-1.13.98-2.6 1.57-4.22 1.57z"/></symbol>
        <symbol id="i-star" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></symbol>
        <symbol id="i-send" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></symbol>
        <symbol id="i-secure" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></symbol>
    </svg>

    <div class="top-bar">
        <div class="top-bar-inner">
            <div class="top-bar-left">
                <div class="top-bar-item"><svg class="icon-sm"><use href="#i-location"/></svg> Serrurier ${titreComplet}</div>
                <div class="top-bar-item"><svg class="icon-sm"><use href="#i-clock"/></svg> Disponible 24h/24 - 7j/7</div>
            </div>
            <div class="top-bar-right">
                <span class="urgence-badge"><svg class="icon-sm"><use href="#i-bolt"/></svg> URGENCE</span>
                <a href="tel:${TEL_CLEAN}"><svg class="icon-sm"><use href="#i-phone"/></svg> ${TELEPHONE}</a>
            </div>
        </div>
    </div>

    <header>
        <div class="header-inner">
            <a href="/" class="logo">
                <div class="logo-icon"><svg><use href="#i-lock"/></svg></div>
                <div><div class="logo-text">Ligne<span>Serrure</span></div><div class="logo-sub">Votre serrurier ${titreComplet}</div></div>
            </a>
            <nav><a href="#services">Services</a><a href="#assurance">Assurance</a><a href="#avis">Avis</a><a href="#contact">Contact</a></nav>
            <a href="tel:${TEL_CLEAN}" class="btn-phone"><svg class="icon"><use href="#i-phone"/></svg> ${TELEPHONE}</a>
        </div>
    </header>

    <section class="hero">
        <div class="hero-inner">
            <div>
                <div class="hero-badge"><span class="dot"></span> Serrurier disponible maintenant</div>
                <h1>SERRURIER <span>${nom.toUpperCase()}</span></h1>
                <p class="hero-subtitle">Intervention rapide en 30 minutes ${titreComplet}. Depannage serrurerie 24h/24, ouverture de porte, changement de serrure. Devis gratuit.</p>
                <div class="hero-features">
                    <div class="hero-feature"><svg><use href="#i-bolt"/></svg> Intervention 30 min</div>
                    <div class="hero-feature"><svg><use href="#i-shield"/></svg> Agree assurance</div>
                    <div class="hero-feature"><svg><use href="#i-card"/></svg> Paiement facilite</div>
                    <div class="hero-feature"><svg><use href="#i-check"/></svg> Garantie 2 ans</div>
                </div>
                <div class="hero-buttons">
                    <a href="tel:${TEL_CLEAN}" class="btn-primary"><svg class="icon"><use href="#i-phone"/></svg> Appeler maintenant</a>
                    <a href="#contact" class="btn-secondary">Demander un devis</a>
                </div>
            </div>
            <div class="trust-box">
                <div class="trust-header">
                    <h3>Pourquoi nous choisir ?</h3>
                    <div class="trust-rating">
                        <span class="trust-stars"><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg></span>
                        <span class="trust-score">4.9/5</span>
                        <span class="trust-reviews">(2 847 avis)</span>
                    </div>
                </div>
                <div class="trust-features">
                    <div class="trust-feature"><div class="trust-feature-icon"><svg><use href="#i-bolt"/></svg></div><div class="trust-feature-text"><h4>Intervention express</h4><p>Sur place en 30 minutes maximum</p></div></div>
                    <div class="trust-feature"><div class="trust-feature-icon"><svg><use href="#i-euro"/></svg></div><div class="trust-feature-text"><h4>Devis gratuit</h4><p>Prix fixe avant intervention</p></div></div>
                    <div class="trust-feature"><div class="trust-feature-icon"><svg><use href="#i-shield"/></svg></div><div class="trust-feature-text"><h4>Agree assurances</h4><p>Prise en charge facilitee</p></div></div>
                </div>
                <div class="trust-cta"><a href="tel:${TEL_CLEAN}" class="btn-primary"><svg class="icon"><use href="#i-phone"/></svg> ${TELEPHONE}</a><p>Appel gratuit</p></div>
            </div>
        </div>
    </section>

    <section class="services" id="services">
        <div class="container">
            <div class="section-header"><h2>Nos services ${titreComplet}</h2><p>Une equipe de serruriers professionnels a votre service</p></div>
            <div class="services-grid">
                <div class="service-card"><div class="service-icon"><svg><use href="#i-door"/></svg></div><h3>Ouverture de porte</h3><p>Porte claquee, cle perdue ou cassee. Ouverture sans degat en 30 minutes.</p><span class="service-price">A partir de 89EUR</span></div>
                <div class="service-card"><div class="service-icon"><svg><use href="#i-lock"/></svg></div><h3>Changement de serrure</h3><p>Remplacement de serrure toutes marques. Serrures 3 et 5 points.</p><span class="service-price">A partir de 129EUR</span></div>
                <div class="service-card"><div class="service-icon"><svg><use href="#i-shield"/></svg></div><h3>Blindage de porte</h3><p>Securisez votre domicile avec nos solutions certifiees A2P.</p><span class="service-price">A partir de 890EUR</span></div>
                <div class="service-card"><div class="service-icon"><svg><use href="#i-key"/></svg></div><h3>Double de cles</h3><p>Reproduction de cles classiques et haute securite sur place.</p><span class="service-price">A partir de 15EUR</span></div>
                <div class="service-card"><div class="service-icon"><svg><use href="#i-home"/></svg></div><h3>Installation serrure</h3><p>Pose de serrures connectees, biometriques et haute securite.</p><span class="service-price">A partir de 149EUR</span></div>
                <div class="service-card"><div class="service-icon"><svg><use href="#i-tool"/></svg></div><h3>Depannage urgent</h3><p>Intervention 24h/24 pour toutes urgences serrurerie.</p><span class="service-price">A partir de 99EUR</span></div>
            </div>
        </div>
    </section>

    <section class="why-us">
        <div class="container">
            <div class="section-header"><h2>Votre serrurier de confiance</h2><p>Des chiffres qui parlent d eux-memes</p></div>
            <div class="why-grid">
                <div class="why-item"><div class="why-number">15+</div><h4>Annees d experience</h4><p>Un savoir-faire reconnu</p></div>
                <div class="why-item"><div class="why-number">30 min</div><h4>Temps d intervention</h4><p>Rapidite garantie</p></div>
                <div class="why-item"><div class="why-number">50 000+</div><h4>Clients satisfaits</h4><p>Et ce n est pas fini</p></div>
                <div class="why-item"><div class="why-number">24/7</div><h4>Disponibilite</h4><p>Jour et nuit</p></div>
            </div>
        </div>
    </section>

    <section class="assurance" id="assurance">
        <div class="container">
            <div class="section-header"><h2>Prise en charge Assurance</h2><p>Nous travaillons avec toutes les compagnies d assurance</p></div>
            <div class="assurance-grid">
                <div class="assurance-card"><div class="assurance-icon"><svg><use href="#i-shield"/></svg></div><h3>Agree toutes assurances</h3><p>Partenaires des principales compagnies d assurance.</p></div>
                <div class="assurance-card"><div class="assurance-icon"><svg><use href="#i-doc"/></svg></div><h3>Facture detaillee</h3><p>Facture conforme aux exigences pour remboursement.</p></div>
                <div class="assurance-card"><div class="assurance-icon"><svg><use href="#i-users"/></svg></div><h3>Assistance administrative</h3><p>Accompagnement dans vos demarches.</p></div>
            </div>
            <div class="logos-section"><h4>Nos partenaires</h4><div class="logos-grid"><div class="logo-item">AXA</div><div class="logo-item">MAIF</div><div class="logo-item">Groupama</div><div class="logo-item">MACIF</div><div class="logo-item">Allianz</div><div class="logo-item">GMF</div><div class="logo-item">MAAF</div><div class="logo-item">MMA</div><div class="logo-item">Matmut</div><div class="logo-item">Generali</div></div></div>
        </div>
    </section>

    <section class="contact" id="contact">
        <div class="container">
            <div class="section-header"><h2>Contactez-nous</h2><p>Demandez un devis gratuit ou une intervention rapide</p></div>
            <div class="contact-grid">
                <div class="contact-info">
                    <h3>Besoin d un serrurier ?</h3>
                    <p>Notre equipe est disponible 24h/24 et 7j/7 pour repondre a toutes vos urgences en serrurerie.</p>
                    <div class="contact-methods">
                        <div class="contact-method"><div class="contact-method-icon"><svg><use href="#i-phone"/></svg></div><div class="contact-method-text"><h4>Par telephone</h4><p>Reponse immediate 24h/24</p><a href="tel:${TEL_CLEAN}">${TELEPHONE}</a></div></div>
                        <div class="contact-method"><div class="contact-method-icon location"><svg><use href="#i-location"/></svg></div><div class="contact-method-text"><h4>Zone d intervention</h4><p>Intervention rapide ${titreComplet}</p></div></div>
                    </div>
                </div>
                <div class="form-box">
                    <div id="formContainer">
                        <h3>Demande de devis gratuit</h3>
                        <p>Remplissez le formulaire, nous vous recontactons rapidement</p>
                        <form id="contactForm">
                            <div class="form-row"><div class="form-group"><label>Nom complet *</label><input type="text" id="nom" required placeholder="Votre nom"></div><div class="form-group"><label>Telephone *</label><input type="tel" id="telephone" required placeholder="06 12 34 56 78"></div></div>
                            <div class="form-group"><label>Adresse d intervention *</label><input type="text" id="adresse" required placeholder="Numero, rue, ville"></div>
                            <div class="form-group"><label>Type de probleme *</label><select id="probleme" required><option value="">Selectionnez</option><option>Porte claquee</option><option>Cle perdue</option><option>Cle cassee</option><option>Serrure bloquee</option><option>Cambriolage</option><option>Changement serrure</option><option>Blindage</option><option>Double cles</option><option>Autre</option></select></div>
                            <div class="form-group"><label>Urgence *</label><select id="urgence" required><option value="">Selectionnez</option><option>URGENT - Maintenant</option><option>Aujourd hui</option><option>Prochains jours</option><option>Juste un devis</option></select></div>
                            <div class="form-group"><label>Message</label><textarea id="message" placeholder="Decrivez votre situation..."></textarea></div>
                            <button type="submit" class="btn-submit" id="submitBtn"><svg><use href="#i-send"/></svg> Envoyer ma demande</button>
                            <p class="form-note"><svg><use href="#i-secure"/></svg> Vos donnees sont securisees</p>
                        </form>
                    </div>
                    <div class="success-message" id="successMessage"><div class="success-icon"><svg><use href="#i-check"/></svg></div><h4>Demande envoyee !</h4><p>Un serrurier vous contactera rapidement.</p></div>
                </div>
            </div>
        </div>
    </section>

    <section class="testimonials" id="avis">
        <div class="container">
            <div class="section-header"><h2>Avis clients</h2><p>Des milliers de clients nous font confiance</p></div>
            <div class="testimonials-grid">
                <div class="testimonial-card"><div class="testimonial-stars"><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg></div><p class="testimonial-text">"Intervention tres rapide, le serrurier est arrive en 20 minutes. Travail propre et prix conforme. Je recommande !"</p><div class="testimonial-author"><div class="testimonial-avatar">M</div><div class="testimonial-info"><h4>Marie D.</h4><p>Cliente ${titreComplet}</p></div></div></div>
                <div class="testimonial-card"><div class="testimonial-stars"><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg></div><p class="testimonial-text">"Porte claquee un dimanche soir, ils sont intervenus en moins d une heure. Professionnel et efficace. Merci !"</p><div class="testimonial-author"><div class="testimonial-avatar">P</div><div class="testimonial-info"><h4>Pierre L.</h4><p>Client ${titreComplet}</p></div></div></div>
                <div class="testimonial-card"><div class="testimonial-stars"><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg></div><p class="testimonial-text">"Changement de serrure suite a un cambriolage. Equipe rassurante et travail impeccable."</p><div class="testimonial-author"><div class="testimonial-avatar">S</div><div class="testimonial-info"><h4>Sophie M.</h4><p>Cliente ${titreComplet}</p></div></div></div>
            </div>
        </div>
    </section>

    <section class="cta-section">
        <div class="container"><h2>Besoin d un serrurier ?</h2><p>Appelez-nous maintenant, nous intervenons en 30 minutes</p><a href="tel:${TEL_CLEAN}" class="cta-phone"><svg><use href="#i-phone"/></svg> ${TELEPHONE}</a></div>
    </section>

    <footer>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand"><h3><svg><use href="#i-lock"/></svg> Ligne Serrure</h3><p>Votre serrurier de confiance ${titreComplet}, disponible 24h/24 et 7j/7.</p></div>
                <div class="footer-links"><h4>Services</h4><ul><li><a href="#">Ouverture porte</a></li><li><a href="#">Changement serrure</a></li><li><a href="#">Blindage</a></li><li><a href="#">Double cles</a></li></ul></div>
                <div class="footer-links"><h4>Infos</h4><ul><li><a href="#">Tarifs</a></li><li><a href="#assurance">Assurance</a></li><li><a href="#contact">Contact</a></li></ul></div>
                <div class="footer-links"><h4>Contact</h4><ul><li><a href="tel:${TEL_CLEAN}">${TELEPHONE}</a></li><li><a href="#">24h/24 - 7j/7</a></li></ul></div>
            </div>
            <div class="footer-bottom"><p>2025 Ligne Serrure - Tous droits reserves</p></div>
        </div>
    </footer>

    <a href="tel:${TEL_CLEAN}" class="floating-btn"><svg><use href="#i-phone"/></svg></a>

    <script>
        const CALLMEBOT_PHONE = '${CALLMEBOT.phone}';
        const CALLMEBOT_APIKEY = '${CALLMEBOT.apikey}';
        const LIEU = '${nom}';
        document.getElementById('contactForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            const btn = document.getElementById('submitBtn');
            btn.disabled = true;
            btn.innerHTML = 'Envoi...';
            const data = {nom: document.getElementById('nom').value, telephone: document.getElementById('telephone').value, adresse: document.getElementById('adresse').value, probleme: document.getElementById('probleme').value, urgence: document.getElementById('urgence').value, message: document.getElementById('message').value || 'Aucun'};
            const msg = '*NOUVEAU CONTACT*\\n\\n*Page:* Serrurier ' + LIEU + '\\n*Nom:* ' + data.nom + '\\n*Tel:* ' + data.telephone + '\\n*Adresse:* ' + data.adresse + '\\n*Probleme:* ' + data.probleme + '\\n*Urgence:* ' + data.urgence + '\\n*Message:* ' + data.message;
            try { await fetch('https://api.callmebot.com/whatsapp.php?phone=' + CALLMEBOT_PHONE + '&text=' + encodeURIComponent(msg) + '&apikey=' + CALLMEBOT_APIKEY, {method:'GET',mode:'no-cors'}); } catch(e) {}
            document.getElementById('formContainer').style.display = 'none';
            document.getElementById('successMessage').classList.add('show');
        });
        document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', function(e) { e.preventDefault(); const t = document.querySelector(this.getAttribute('href')); if(t) t.scrollIntoView({behavior:'smooth'}); }));
    </script>
</body>
</html>`;
}

function generate404(recherche) {
    return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Zone non desservie - Ligne Serrure</title><link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;800&family=Open+Sans&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Open Sans',sans-serif;background:#F3F4F6;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}.container{background:white;border-radius:20px;padding:60px 40px;text-align:center;max-width:500px;box-shadow:0 10px 40px rgba(0,0,0,.1)}.icon{width:80px;height:80px;margin:0 auto 24px;background:#E63946;border-radius:50%;display:flex;align-items:center;justify-content:center}.icon svg{fill:white;width:40px;height:40px}h1{font-family:'Montserrat',sans-serif;font-size:28px;color:#1D3557;margin-bottom:16px}p{color:#6B7280;font-size:16px;margin-bottom:32px;line-height:1.6}.search-term{background:#F3F4F6;padding:8px 16px;border-radius:8px;font-weight:600;color:#E63946;display:inline-block;margin-bottom:24px}.btn{display:inline-block;background:#E63946;color:white;padding:16px 32px;border-radius:8px;text-decoration:none;font-weight:600;transition:all .3s}.btn:hover{background:#C1121F;transform:translateY(-2px)}</style></head><body><div class="container"><div class="icon"><svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg></div><h1>Zone non desservie</h1><div class="search-term">"${recherche}"</div><p>Desole, nous n intervenons pas encore dans cette zone. Veuillez rechercher une autre ville ou departement.</p><a href="/" class="btn">Retour a l accueil</a></div></body></html>`;
}

// ============================================
// HANDLER CLOUDFLARE
// ============================================
export async function onRequest(context) {
    const url = new URL(context.request.url);
    const path = url.pathname;
    const match = path.match(/^\\/serrurier\\/(.+)$/);
    
    if (!match) return new Response('Not Found', { status: 404 });
    
    const lieu = decodeURIComponent(match[1]).toLowerCase().trim();
    if (!lieu) return Response.redirect('/', 302);
    
    try {
        const validation = await validerLieu(lieu);
        if (validation.valide) {
            return new Response(generateHTML(lieu, validation), { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
        } else {
            return new Response(generate404(lieu), { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
        }
    } catch (error) {
        return new Response('<html><body><h1>Erreur</h1><a href="/">Retour</a></body></html>', { status: 500, headers: { 'Content-Type': 'text/html' } });
    }
}
