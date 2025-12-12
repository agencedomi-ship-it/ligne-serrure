export async function onRequest(context) {
    var MARQUE = "Ligne-Serrure";
    var TEL = "01 84 60 60 60";
    
    var html = '<!DOCTYPE html><html lang="fr"><head>';
    html += '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
    html += '<title>Politique de Confidentialite | ' + MARQUE + '</title>';
    html += '<link rel="preconnect" href="https://fonts.googleapis.com">';
    html += '<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">';
    html += '<style>';
    html += ':root{--red:#DC2626;--red-dark:#B91C1C;--dark:#1F2937;--gray:#6B7280;--gray-light:#F9FAFB;--white:#FFFFFF}';
    html += '*{margin:0;padding:0;box-sizing:border-box}body{font-family:"Open Sans",sans-serif;color:var(--dark);background:var(--white)}h1,h2,h3{font-family:"Oswald",sans-serif;font-weight:700}';
    
    // Header
    html += 'header{background:var(--white);box-shadow:0 4px 20px rgba(0,0,0,0.1);padding:15px 0;position:sticky;top:0;z-index:100}';
    html += '.header-inner{max-width:1200px;margin:0 auto;padding:0 20px;display:flex;justify-content:space-between;align-items:center}';
    html += '.logo{display:flex;align-items:center;gap:12px;text-decoration:none}';
    html += '.logo-icon{width:55px;height:55px;background:var(--red);border-radius:12px;display:flex;align-items:center;justify-content:center}';
    html += '.logo-icon svg{width:32px;height:32px;fill:var(--white)}';
    html += '.logo-text{font-family:"Oswald",sans-serif;font-size:28px;color:var(--dark)}';
    html += '.logo-text span{color:var(--red)}';
    
    // Content
    html += '.legal-hero{background:linear-gradient(135deg,var(--gray-light),var(--white));padding:60px 0;text-align:center}';
    html += '.legal-hero h1{font-size:48px;color:var(--dark)}';
    html += '.legal-hero h1 span{color:var(--red)}';
    html += '.legal-content{max-width:900px;margin:0 auto;padding:60px 20px}';
    html += '.legal-section{margin-bottom:40px}';
    html += '.legal-section h2{font-size:24px;color:var(--red);margin-bottom:15px;padding-bottom:10px;border-bottom:2px solid var(--gray-light)}';
    html += '.legal-section p,.legal-section li{font-size:16px;line-height:1.8;color:var(--gray);margin-bottom:15px}';
    html += '.legal-section ul{margin-left:20px}';
    html += '.legal-section strong{color:var(--dark)}';
    
    // Footer
    html += 'footer{padding:40px 0;background:var(--dark);text-align:center}';
    html += 'footer p{color:rgba(255,255,255,0.7);font-size:14px}';
    html += 'footer a{color:rgba(255,255,255,0.7);text-decoration:none;margin:0 15px}';
    html += 'footer a:hover{color:var(--white)}';
    
    html += '</style></head><body>';
    
    // SVG
    html += '<svg xmlns="http://www.w3.org/2000/svg" style="display:none"><symbol id="i-lock" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></symbol></svg>';
    
    // Header
    html += '<header><div class="header-inner"><a href="/" class="logo"><div class="logo-icon"><svg><use href="#i-lock"/></svg></div><div class="logo-text">Ligne <span>Serrure</span></div></a></div></header>';
    
    // Hero
    html += '<section class="legal-hero"><h1>POLITIQUE DE <span>CONFIDENTIALITE</span></h1></section>';
    
    // Content
    html += '<main class="legal-content">';
    
    html += '<div class="legal-section"><h2>1. Collecte des donnees personnelles</h2>';
    html += '<p>Dans le cadre de nos services, nous collectons les donnees suivantes :</p>';
    html += '<ul><li>Nom et prenom</li><li>Numero de telephone</li><li>Code postal</li><li>Adresse d\'intervention (facultatif)</li><li>Type de probleme rencontre</li></ul>';
    html += '<p>Ces donnees sont collectees uniquement lorsque vous remplissez nos formulaires de contact ou de demande d\'intervention.</p></div>';
    
    html += '<div class="legal-section"><h2>2. Utilisation des donnees</h2>';
    html += '<p>Vos donnees personnelles sont utilisees exclusivement pour :</p>';
    html += '<ul><li>Vous recontacter suite a votre demande</li><li>Organiser une intervention de depannage</li><li>Etablir un devis</li><li>Assurer le suivi de nos prestations</li></ul>';
    html += '<p>Nous ne vendons ni ne louons vos donnees a des tiers.</p></div>';
    
    html += '<div class="legal-section"><h2>3. Conservation des donnees</h2>';
    html += '<p>Vos donnees personnelles sont conservees pendant une duree maximale de 3 ans a compter de notre dernier contact, conformement aux obligations legales.</p></div>';
    
    html += '<div class="legal-section"><h2>4. Securite des donnees</h2>';
    html += '<p>Nous mettons en oeuvre toutes les mesures techniques et organisationnelles appropriees pour proteger vos donnees personnelles contre tout acces non autorise, modification, divulgation ou destruction.</p></div>';
    
    html += '<div class="legal-section"><h2>5. Vos droits</h2>';
    html += '<p>Conformement au Reglement General sur la Protection des Donnees (RGPD), vous disposez des droits suivants :</p>';
    html += '<ul><li><strong>Droit d\'acces :</strong> obtenir la confirmation que vos donnees sont traitees et en obtenir une copie</li>';
    html += '<li><strong>Droit de rectification :</strong> faire corriger vos donnees inexactes ou incompletes</li>';
    html += '<li><strong>Droit a l\'effacement :</strong> demander la suppression de vos donnees</li>';
    html += '<li><strong>Droit a la portabilite :</strong> recevoir vos donnees dans un format structure</li>';
    html += '<li><strong>Droit d\'opposition :</strong> vous opposer au traitement de vos donnees</li></ul>';
    html += '<p>Pour exercer ces droits, contactez-nous par telephone au ' + TEL + ' ou par email a contact@ligne-serrure.fr</p></div>';
    
    html += '<div class="legal-section"><h2>6. Cookies</h2>';
    html += '<p>Notre site utilise des cookies techniques necessaires a son bon fonctionnement. Aucun cookie publicitaire ou de tracking n\'est utilise.</p></div>';
    
    html += '<div class="legal-section"><h2>7. Modification de la politique</h2>';
    html += '<p>Nous nous reservons le droit de modifier cette politique de confidentialite a tout moment. Toute modification sera publiee sur cette page avec une date de mise a jour.</p>';
    html += '<p><strong>Derniere mise a jour :</strong> Janvier 2025</p></div>';
    
    html += '</main>';
    
    // Footer
    html += '<footer><p>2025 ' + MARQUE + ' - Tous droits reserves</p>';
    html += '<p><a href="/mentions-legales">Mentions legales</a><a href="/confidentialite">Confidentialite</a><a href="/cgu">CGU</a></p></footer>';
    
    html += '</body></html>';
    
    return new Response(html, { 
        status: 200, 
        headers: { "Content-Type": "text/html;charset=UTF-8" } 
    });
}
