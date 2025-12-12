export async function onRequest(context) {
    var MARQUE = "Ligne-Serrure";
    var TEL = "01 84 60 60 60";
    
    var html = '<!DOCTYPE html><html lang="fr"><head>';
    html += '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
    html += '<title>Mentions Legales | ' + MARQUE + '</title>';
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
    html += '<section class="legal-hero"><h1>MENTIONS <span>LEGALES</span></h1></section>';
    
    // Content
    html += '<main class="legal-content">';
    
    html += '<div class="legal-section"><h2>1. Editeur du site</h2>';
    html += '<p><strong>Raison sociale :</strong> ' + MARQUE + '</p>';
    html += '<p><strong>Forme juridique :</strong> [A completer]</p>';
    html += '<p><strong>Siege social :</strong> [Adresse a completer]</p>';
    html += '<p><strong>Telephone :</strong> ' + TEL + '</p>';
    html += '<p><strong>Email :</strong> contact@ligne-serrure.fr</p>';
    html += '<p><strong>SIRET :</strong> [A completer]</p>';
    html += '<p><strong>Directeur de la publication :</strong> [Nom a completer]</p></div>';
    
    html += '<div class="legal-section"><h2>2. Hebergement</h2>';
    html += '<p><strong>Hebergeur :</strong> Cloudflare, Inc.</p>';
    html += '<p><strong>Adresse :</strong> 101 Townsend St, San Francisco, CA 94107, USA</p>';
    html += '<p><strong>Site web :</strong> www.cloudflare.com</p></div>';
    
    html += '<div class="legal-section"><h2>3. Propriete intellectuelle</h2>';
    html += '<p>L\'ensemble des elements figurant sur ce site (textes, images, logos, icones, sons, logiciels, etc.) sont proteges par les lois francaises et internationales relatives a la propriete intellectuelle.</p>';
    html += '<p>Toute reproduction, representation, modification, publication, adaptation de tout ou partie des elements du site est interdite, sauf autorisation ecrite prealable.</p></div>';
    
    html += '<div class="legal-section"><h2>4. Limitation de responsabilite</h2>';
    html += '<p>' + MARQUE + ' s\'efforce d\'assurer au mieux l\'exactitude et la mise a jour des informations diffusees sur ce site. Toutefois, ' + MARQUE + ' ne peut garantir l\'exactitude, la precision ou l\'exhaustivite des informations mises a disposition.</p>';
    html += '<p>En consequence, ' + MARQUE + ' decline toute responsabilite pour les eventuelles imprecisions, inexactitudes ou omissions portant sur des informations disponibles sur ce site.</p></div>';
    
    html += '<div class="legal-section"><h2>5. Liens hypertextes</h2>';
    html += '<p>Le site peut contenir des liens hypertextes vers d\'autres sites. ' + MARQUE + ' n\'exerce aucun controle sur ces sites et decline toute responsabilite quant a leur contenu.</p></div>';
    
    html += '<div class="legal-section"><h2>6. Droit applicable</h2>';
    html += '<p>Les presentes mentions legales sont soumises au droit francais. En cas de litige, les tribunaux francais seront seuls competents.</p></div>';
    
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
