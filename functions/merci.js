export async function onRequest(context) {
    var TEL = "01 84 60 60 60";
    var TEL_CLEAN = TEL.replace(/\s/g, "");
    var MARQUE = "Ligne-Serrure";
    
    var html = '<!DOCTYPE html><html lang="fr"><head>';
    html += '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
    html += '<title>Merci ! | ' + MARQUE + '</title>';
    html += '<link rel="preconnect" href="https://fonts.googleapis.com">';
    html += '<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">';
    html += '<style>';
    html += ':root{--green:#22C55E;--green-dark:#16A34A;--red:#DC2626;--red-dark:#B91C1C;--dark:#1F2937;--gray:#6B7280;--gray-light:#F9FAFB;--white:#FFFFFF}';
    html += '*{margin:0;padding:0;box-sizing:border-box}body{font-family:"Open Sans",sans-serif;color:var(--dark);background:var(--gray-light);min-height:100vh;display:flex;flex-direction:column}h1,h2,h3{font-family:"Oswald",sans-serif;font-weight:700}';
    html += '@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}';
    html += '@keyframes checkmark{0%{stroke-dashoffset:100}100%{stroke-dashoffset:0}}';
    html += '@keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}';
    html += '@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}';
    
    // Header
    html += 'header{background:var(--white);box-shadow:0 4px 20px rgba(0,0,0,0.1);padding:15px 0}';
    html += '.header-inner{max-width:1200px;margin:0 auto;padding:0 20px;display:flex;justify-content:space-between;align-items:center}';
    html += '.logo{display:flex;align-items:center;gap:12px;text-decoration:none}';
    html += '.logo-icon{width:55px;height:55px;background:var(--red);border-radius:12px;display:flex;align-items:center;justify-content:center}';
    html += '.logo-icon svg{width:32px;height:32px;fill:var(--white)}';
    html += '.logo-text{font-family:"Oswald",sans-serif;font-size:28px;color:var(--dark)}';
    html += '.logo-text span{color:var(--red)}';
    
    // Main content
    html += '.merci-container{flex:1;display:flex;align-items:center;justify-content:center;padding:40px 20px}';
    html += '.merci-card{background:var(--white);border-radius:30px;padding:60px;max-width:600px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.1);animation:fadeIn 0.8s ease-out}';
    html += '.success-circle{width:120px;height:120px;background:linear-gradient(135deg,var(--green),var(--green-dark));border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 30px;animation:float 3s ease-in-out infinite}';
    html += '.success-circle svg{width:60px;height:60px;fill:var(--white)}';
    html += '.merci-card h1{font-size:42px;color:var(--dark);margin-bottom:15px}';
    html += '.merci-card h1 span{color:var(--green)}';
    html += '.merci-card .subtitle{font-size:20px;color:var(--gray);margin-bottom:30px;line-height:1.6}';
    html += '.info-box{background:var(--gray-light);border-radius:15px;padding:25px;margin-bottom:30px;text-align:left}';
    html += '.info-box h3{font-size:18px;color:var(--dark);margin-bottom:15px;display:flex;align-items:center;gap:10px}';
    html += '.info-box h3 svg{width:24px;height:24px;fill:var(--red)}';
    html += '.info-box ul{list-style:none}';
    html += '.info-box li{padding:10px 0;border-bottom:1px solid rgba(0,0,0,0.05);display:flex;align-items:center;gap:10px;font-size:15px}';
    html += '.info-box li:last-child{border-bottom:none}';
    html += '.info-box li svg{width:20px;height:20px;fill:var(--green);flex-shrink:0}';
    html += '.urgence-box{background:linear-gradient(135deg,var(--red),var(--red-dark));border-radius:15px;padding:25px;margin-bottom:30px;color:var(--white)}';
    html += '.urgence-box h3{font-size:18px;margin-bottom:10px}';
    html += '.urgence-box a{color:var(--white);font-family:"Oswald",sans-serif;font-size:32px;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:10px}';
    html += '.urgence-box a svg{width:28px;height:28px;fill:var(--white)}';
    html += '.btn-retour{display:inline-flex;align-items:center;gap:10px;background:var(--dark);color:var(--white);padding:16px 35px;border-radius:12px;text-decoration:none;font-family:"Oswald",sans-serif;font-size:18px;transition:all 0.3s}';
    html += '.btn-retour:hover{background:var(--gray);transform:translateY(-3px)}';
    html += '.btn-retour svg{width:20px;height:20px;fill:var(--white)}';
    
    // Footer
    html += 'footer{padding:30px 0;background:var(--dark);text-align:center}';
    html += 'footer p{color:rgba(255,255,255,0.7);font-size:14px}';
    
    html += '</style></head><body>';
    
    // SVG Icons
    html += '<svg xmlns="http://www.w3.org/2000/svg" style="display:none">';
    html += '<symbol id="i-check" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></symbol>';
    html += '<symbol id="i-phone" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></symbol>';
    html += '<symbol id="i-clock" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></symbol>';
    html += '<symbol id="i-lock" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></symbol>';
    html += '<symbol id="i-arrow" viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></symbol>';
    html += '<symbol id="i-user" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></symbol>';
    html += '</svg>';
    
    // Header
    html += '<header><div class="header-inner"><a href="/" class="logo"><div class="logo-icon"><svg><use href="#i-lock"/></svg></div><div class="logo-text">Ligne <span>Serrure</span></div></a></div></header>';
    
    // Main content
    html += '<main class="merci-container"><div class="merci-card">';
    html += '<div class="success-circle"><svg><use href="#i-check"/></svg></div>';
    html += '<h1>MERCI <span>!</span></h1>';
    html += '<p class="subtitle">Votre demande a bien ete envoyee.<br>Un serrurier vous rappelle dans les <strong>2 minutes</strong>.</p>';
    
    html += '<div class="info-box"><h3><svg><use href="#i-clock"/></svg> Prochaines etapes</h3><ul>';
    html += '<li><svg><use href="#i-check"/></svg> Un technicien analyse votre demande</li>';
    html += '<li><svg><use href="#i-check"/></svg> Il vous rappelle pour confirmer l\'intervention</li>';
    html += '<li><svg><use href="#i-check"/></svg> Devis gratuit par telephone</li>';
    html += '<li><svg><use href="#i-check"/></svg> Intervention rapide a votre domicile</li>';
    html += '</ul></div>';
    
    html += '<div class="urgence-box"><h3>Besoin immediat ?</h3><a href="tel:' + TEL_CLEAN + '"><svg><use href="#i-phone"/></svg> ' + TEL + '</a></div>';
    
    html += '<a href="/" class="btn-retour"><svg><use href="#i-arrow"/></svg> Retour a l\'accueil</a>';
    html += '</div></main>';
    
    // Footer
    html += '<footer><div class="container"><p>2025 ' + MARQUE + ' - Tous droits reserves</p></div></footer>';
    
    html += '</body></html>';
    
    return new Response(html, { 
        status: 200, 
        headers: { "Content-Type": "text/html;charset=UTF-8" } 
    });
}
