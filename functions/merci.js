export async function onRequest(context) {
    var TEL = "09 80 80 89 05";
    var TEL_CLEAN = TEL.replace(/\s/g, "");
    var MARQUE = "Ligne-Serrure";
    
    var html = '<!DOCTYPE html><html lang="fr"><head>';
    html += '<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start":new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src="https://www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);})(window,document,"script","dataLayer","GTM-MFN4PQQD");</script>';
    html += '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
    html += '<title>Demande envoyee | ' + MARQUE + '</title>';
    html += '<link rel="icon" type="image/png" href="/images/favicon.png">';
    html += '<link rel="apple-touch-icon" href="/images/favicon.png">';
    html += '<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">';
    html += '<style>';
    html += ':root{--green:#22C55E;--red:#DC2626;--dark:#1F2937;--gray:#6B7280;--white:#FFFFFF}';
    html += '*{margin:0;padding:0;box-sizing:border-box}body{font-family:"Open Sans",sans-serif;color:var(--dark);background:var(--white);min-height:100vh;display:flex;flex-direction:column}h1,h2{font-family:"Oswald",sans-serif;font-weight:700}';
    html += '@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}@keyframes checkmark{0%{transform:scale(0)}50%{transform:scale(1.2)}100%{transform:scale(1)}}';
    html += 'header{background:var(--white);box-shadow:0 2px 10px rgba(0,0,0,0.1);padding:15px 0}.header-inner{max-width:1200px;margin:0 auto;padding:0 20px;display:flex;justify-content:space-between;align-items:center}.logo{display:flex;align-items:center;gap:10px;text-decoration:none}.logo-icon{width:50px;height:50px;border-radius:10px;overflow:hidden}.logo-icon img{width:100%;height:100%;object-fit:cover}.logo-text{font-family:"Oswald",sans-serif;font-size:24px;color:var(--dark)}.logo-text span{color:var(--red)}.header-phone{display:flex;align-items:center;gap:8px;background:var(--green);color:var(--white);padding:12px 25px;border-radius:50px;text-decoration:none;font-weight:700;animation:pulse 2s infinite}';
    html += '.main{flex:1;display:flex;align-items:center;justify-content:center;padding:40px 20px}.success-box{text-align:center;max-width:500px}.success-icon{width:100px;height:100px;background:var(--green);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 30px;animation:checkmark 0.5s ease}.success-icon svg{width:50px;height:50px;fill:var(--white)}.success-box h1{font-size:32px;margin-bottom:15px;color:var(--dark)}.success-box h1 span{color:var(--green)}.success-box p{color:var(--gray);font-size:16px;line-height:1.6;margin-bottom:25px}.success-box .highlight{background:var(--green);color:var(--white);padding:20px;border-radius:12px;margin-bottom:25px}.success-box .highlight p{color:var(--white);margin:0;font-weight:600}.btn-call{display:inline-flex;align-items:center;gap:10px;background:var(--green);color:var(--white);padding:16px 32px;border-radius:10px;text-decoration:none;font-family:"Oswald",sans-serif;font-size:18px;animation:pulse 2s infinite;margin-bottom:15px}.btn-back{display:inline-block;color:var(--gray);text-decoration:none;font-size:14px}';
    html += 'footer{background:var(--dark);padding:20px 0;text-align:center}footer p{color:rgba(255,255,255,0.6);font-size:13px}';
    html += '@media(max-width:768px){.header-inner{flex-direction:column;gap:15px}.success-box h1{font-size:26px}}';
    html += '</style></head><body>';
    html += '<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MFN4PQQD" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>';
    
    html += '<header><div class="header-inner"><a href="/" class="logo"><div class="logo-icon"><img src="/images/favicon.png" alt="Logo"></div><div class="logo-text">Ligne <span>Serrure</span></div></a><a href="tel:' + TEL_CLEAN + '" class="header-phone">' + TEL + '</a></div></header>';
    
    html += '<main class="main"><div class="success-box">';
    html += '<div class="success-icon"><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></div>';
    html += '<h1>DEMANDE <span>ENVOYEE !</span></h1>';
    html += '<div class="highlight"><p>Un serrurier vous rappelle dans 2 minutes</p></div>';
    html += '<p>Gardez votre telephone a portee de main. Si vous ne recevez pas d\'appel, contactez-nous directement.</p>';
    html += '<a href="tel:' + TEL_CLEAN + '" class="btn-call"><svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>' + TEL + '</a>';
    html += '<br><a href="/" class="btn-back">Retour a l\'accueil</a>';
    html += '</div></main>';
    
    html += '<footer><p>2025 ' + MARQUE + '</p></footer>';
    html += '</body></html>';
    
    return new Response(html, { status: 200, headers: { "Content-Type": "text/html;charset=UTF-8" } });
}
