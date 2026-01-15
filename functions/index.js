export async function onRequest(context) {
    var TEL = "09 80 80 89 05";
    var TEL_CLEAN = TEL.replace(/\s/g, "");
    var MARQUE = "Ligne-Serrure";
    
    var html = '<!DOCTYPE html><html lang="fr"><head>';
    html += '<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start":new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src="https://www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);})(window,document,"script","dataLayer","GTM-MFN4PQQD");</script>';
    html += '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
    html += '<title>' + MARQUE + ' | Serrurier Urgence 24h/24</title>';
    html += '<meta name="description" content="Serrurier urgence 24h/24. Intervention en 20 minutes. Devis gratuit.">';
    html += '<link rel="icon" type="image/png" href="/images/favicon.png">';
    html += '<link rel="apple-touch-icon" href="/images/favicon.png">';
    html += '<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">';
    html += '<style>';
    html += ':root{--green:#22C55E;--red:#DC2626;--dark:#1F2937;--gray:#6B7280;--gray-light:#F9FAFB;--white:#FFFFFF}';
    html += '*{margin:0;padding:0;box-sizing:border-box}body{font-family:"Open Sans",sans-serif;color:var(--dark);background:var(--white)}h1,h2,h3{font-family:"Oswald",sans-serif;font-weight:700}';
    html += '@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}';
    html += 'header{background:var(--white);box-shadow:0 2px 10px rgba(0,0,0,0.1);padding:15px 0}.header-inner{max-width:1200px;margin:0 auto;padding:0 20px;display:flex;justify-content:space-between;align-items:center}.logo{display:flex;align-items:center;gap:10px;text-decoration:none}.logo-icon{width:50px;height:50px;border-radius:10px;overflow:hidden}.logo-icon img{width:100%;height:100%;object-fit:cover}.logo-text{font-family:"Oswald",sans-serif;font-size:24px;color:var(--dark)}.logo-text span{color:var(--red)}.header-phone{display:flex;align-items:center;gap:8px;background:var(--green);color:var(--white);padding:12px 25px;border-radius:50px;text-decoration:none;font-weight:700;animation:pulse 2s infinite}';
    html += '.hero{background:linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url("/images/camion.png") center/cover;padding:100px 0;text-align:center;color:var(--white)}.hero h1{font-size:48px;margin-bottom:20px}.hero h1 span{color:var(--red)}.hero p{font-size:18px;margin-bottom:30px;opacity:0.9}.hero-buttons{display:flex;gap:15px;justify-content:center;flex-wrap:wrap}.btn-call{display:inline-flex;align-items:center;gap:8px;background:var(--green);color:var(--white);padding:16px 32px;border-radius:10px;text-decoration:none;font-family:"Oswald",sans-serif;font-size:18px;animation:pulse 2s infinite}.btn-search{display:inline-flex;align-items:center;background:var(--white);color:var(--red);padding:16px 32px;border-radius:10px;text-decoration:none;font-family:"Oswald",sans-serif;font-size:18px}';
    html += '.search-section{padding:60px 0;background:var(--gray-light)}.search-box{max-width:600px;margin:0 auto;text-align:center}.search-box h2{font-size:32px;margin-bottom:20px}.search-box h2 span{color:var(--red)}.search-form{display:flex;gap:10px}.search-form input{flex:1;padding:16px;border:2px solid var(--gray-light);border-radius:10px;font-size:16px}.search-form input:focus{outline:none;border-color:var(--red)}.search-form button{background:var(--red);color:var(--white);border:none;padding:16px 32px;border-radius:10px;font-family:"Oswald",sans-serif;font-size:16px;cursor:pointer}';
    html += '.features{padding:60px 0}.features-grid{max-width:1200px;margin:0 auto;padding:0 20px;display:grid;grid-template-columns:repeat(4,1fr);gap:30px;text-align:center}.feature-card{padding:30px}.feature-icon{font-size:48px;margin-bottom:15px}.feature-card h3{font-size:18px;margin-bottom:10px}.feature-card p{color:var(--gray);font-size:14px}';
    html += 'footer{background:var(--dark);padding:30px 0;text-align:center}footer p{color:rgba(255,255,255,0.6);font-size:13px}footer a{color:rgba(255,255,255,0.6);text-decoration:none;margin:0 10px}';
    html += '@media(max-width:768px){.hero h1{font-size:32px}.features-grid{grid-template-columns:1fr 1fr}.search-form{flex-direction:column}.header-inner{flex-direction:column;gap:15px}}';
    html += '</style></head><body>';
    html += '<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MFN4PQQD" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>';
    
    html += '<header><div class="header-inner"><a href="/" class="logo"><div class="logo-icon"><img src="/images/favicon.png" alt="Logo"></div><div class="logo-text">Ligne <span>Serrure</span></div></a><a href="tel:' + TEL_CLEAN + '" class="header-phone">' + TEL + '</a></div></header>';
    
    html += '<section class="hero"><div><h1>SERRURIER <span>URGENCE</span></h1><p>Intervention en 20 minutes - 24h/24 - 7j/7</p><div class="hero-buttons"><a href="tel:' + TEL_CLEAN + '" class="btn-call">APPELER ' + TEL + '</a><a href="/autour-de-vous" class="btn-search">TROUVER UN SERRURIER</a></div></div></section>';
    
    html += '<section class="search-section"><div class="search-box"><h2>RECHERCHER <span>VOTRE VILLE</span></h2><form class="search-form" onsubmit="searchCity(event)"><input type="text" id="citySearch" placeholder="Entrez votre ville ou code postal..." required><button type="submit">RECHERCHER</button></form></div></section>';
    
    html += '<section class="features"><div class="features-grid"><div class="feature-card"><div class="feature-icon">⚡</div><h3>INTERVENTION 20 MIN</h3><p>Nos serruriers arrivent en 20 minutes</p></div><div class="feature-card"><div class="feature-icon">🔒</div><h3>CERTIFIE A2P</h3><p>Serrures agreees assurance</p></div><div class="feature-card"><div class="feature-icon">💰</div><h3>DEVIS GRATUIT</h3><p>Prix transparent sans surprise</p></div><div class="feature-card"><div class="feature-icon">🕐</div><h3>24H/24 7J/7</h3><p>Disponible jour et nuit</p></div></div></section>';
    
    html += '<footer><p>2025 ' + MARQUE + '</p><p><a href="/mentions-legales">Mentions legales</a><a href="/confidentialite">Confidentialite</a><a href="/cgu">CGU</a></p></footer>';
    
    html += '<script>function searchCity(e){e.preventDefault();var city=document.getElementById("citySearch").value.trim().toLowerCase().replace(/\\s+/g,"-");window.location.href="/serrurier/"+encodeURIComponent(city);}</script>';
    html += '</body></html>';
    
    return new Response(html, { status: 200, headers: { "Content-Type": "text/html;charset=UTF-8" } });
}
