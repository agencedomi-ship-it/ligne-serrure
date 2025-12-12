export async function onRequest(context) {
    var MARQUE = "Ligne-Serrure";
    var TEL = "01 84 60 60 60";
    var TEL_CLEAN = TEL.replace(/\s/g, "");
    
    var html = '<!DOCTYPE html><html lang="fr"><head>';
    html += '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
    html += '<title>' + MARQUE + ' | Serrurier Urgence 24h/24 partout en France</title>';
    html += '<meta name="description" content="Serrurier d\'urgence 24h/24 et 7j/7. Intervention en 15 minutes. Devis gratuit. Appelez le ' + TEL + '">';
    html += '<link rel="preconnect" href="https://fonts.googleapis.com">';
    html += '<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">';
    html += '<style>';
    
    // Variables CSS
    html += ':root{--green:#22C55E;--green-dark:#16A34A;--red:#DC2626;--red-dark:#B91C1C;--dark:#1F2937;--gray:#6B7280;--gray-light:#F3F4F6;--white:#FFFFFF}';
    html += '*{margin:0;padding:0;box-sizing:border-box}';
    html += 'body{font-family:"Open Sans",sans-serif;background:var(--dark);color:var(--white);min-height:100vh;display:flex;flex-direction:column}';
    html += 'h1,h2,h3{font-family:"Oswald",sans-serif;font-weight:700}';
    
    // Animations
    html += '@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}';
    html += '@keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}';
    
    // Header
    html += 'header{padding:20px 0}';
    html += '.header-inner{max-width:1200px;margin:0 auto;padding:0 20px;display:flex;justify-content:space-between;align-items:center}';
    html += '.logo{display:flex;align-items:center;gap:12px;text-decoration:none}';
    html += '.logo-icon{width:50px;height:50px;background:var(--red);border-radius:12px;display:flex;align-items:center;justify-content:center}';
    html += '.logo-icon svg{width:28px;height:28px;fill:var(--white)}';
    html += '.logo-text{font-family:"Oswald",sans-serif;font-size:24px;color:var(--white)}';
    html += '.logo-text span{color:var(--red)}';
    html += '.header-phone{display:flex;align-items:center;gap:10px;background:var(--green);color:var(--white);padding:12px 25px;border-radius:50px;text-decoration:none;font-weight:700;font-size:16px;animation:pulse 2s infinite}';
    html += '.header-phone:hover{background:var(--green-dark)}';
    html += '.header-phone svg{width:20px;height:20px;fill:var(--white)}';
    
    // Hero
    html += '.hero{flex:1;display:flex;align-items:center;justify-content:center;padding:40px 20px}';
    html += '.hero-content{max-width:800px;text-align:center;animation:fadeIn 0.8s ease-out}';
    html += '.hero h1{font-size:56px;margin-bottom:20px;line-height:1.1}';
    html += '.hero h1 span{color:var(--red)}';
    html += '.hero-subtitle{font-size:20px;color:var(--gray-light);margin-bottom:40px;line-height:1.6}';
    
    // Search box
    html += '.search-box{background:rgba(255,255,255,0.05);border-radius:20px;padding:30px;margin-bottom:40px}';
    html += '.search-container{position:relative}';
    html += '.search-form{display:flex;gap:10px}';
    html += '.search-input{flex:1;padding:18px 25px;font-size:18px;border:2px solid transparent;border-radius:12px;background:var(--white);color:var(--dark);outline:none;transition:all 0.3s}';
    html += '.search-input:focus{border-color:var(--red)}';
    html += '.search-input::placeholder{color:var(--gray)}';
    html += '.search-btn{padding:18px 35px;background:var(--red);color:var(--white);border:none;border-radius:12px;font-family:"Oswald",sans-serif;font-size:18px;cursor:pointer;display:flex;align-items:center;gap:10px;transition:all 0.3s}';
    html += '.search-btn:hover{background:var(--red-dark)}';
    html += '.search-btn svg{width:20px;height:20px;fill:var(--white)}';
    
    // Suggestions dropdown
    html += '.suggestions{position:absolute;top:100%;left:0;right:0;background:var(--white);border-radius:12px;margin-top:10px;box-shadow:0 10px 40px rgba(0,0,0,0.3);display:none;z-index:100;max-height:300px;overflow-y:auto}';
    html += '.suggestions.show{display:block}';
    html += '.suggestion-item{padding:15px 20px;color:var(--dark);cursor:pointer;border-bottom:1px solid var(--gray-light);display:flex;align-items:center;gap:12px;transition:background 0.2s}';
    html += '.suggestion-item:last-child{border-bottom:none}';
    html += '.suggestion-item:hover{background:var(--gray-light)}';
    html += '.suggestion-item svg{width:20px;height:20px;fill:var(--gray)}';
    html += '.suggestion-item span{font-weight:600}';
    html += '.suggestion-type{font-size:12px;color:var(--gray);margin-left:auto;text-transform:uppercase}';
    html += '.search-error{color:var(--red);margin-top:15px;display:none}';
    html += '.search-error.show{display:block}';
    
    // Features
    html += '.features{display:flex;justify-content:center;gap:40px;flex-wrap:wrap}';
    html += '.feature{display:flex;align-items:center;gap:10px;color:var(--gray-light)}';
    html += '.feature svg{width:24px;height:24px;fill:var(--green)}';
    
    // Footer
    html += 'footer{padding:30px 0;text-align:center;border-top:1px solid rgba(255,255,255,0.1)}';
    html += 'footer p{color:var(--gray);font-size:14px}';
    html += 'footer a{color:var(--gray);text-decoration:none;margin:0 10px}';
    html += 'footer a:hover{color:var(--white)}';
    
    // Responsive
    html += '@media(max-width:768px){';
    html += '.hero h1{font-size:36px}';
    html += '.search-form{flex-direction:column}';
    html += '.features{gap:20px}';
    html += '.header-phone span{display:none}';
    html += '}';
    
    html += '</style></head><body>';
    
    // SVG Icons
    html += '<svg xmlns="http://www.w3.org/2000/svg" style="display:none">';
    html += '<symbol id="i-lock" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></symbol>';
    html += '<symbol id="i-phone" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></symbol>';
    html += '<symbol id="i-search" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></symbol>';
    html += '<symbol id="i-location" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></symbol>';
    html += '<symbol id="i-bolt" viewBox="0 0 24 24"><path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66l.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"/></symbol>';
    html += '<symbol id="i-clock" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></symbol>';
    html += '<symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></symbol>';
    html += '<symbol id="i-check" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></symbol>';
    html += '</svg>';
    
    // Header
    html += '<header><div class="header-inner">';
    html += '<a href="/" class="logo"><div class="logo-icon"><svg><use href="#i-lock"/></svg></div><div class="logo-text">Ligne <span>Serrure</span></div></a>';
    html += '<a href="tel:' + TEL_CLEAN + '" class="header-phone"><svg><use href="#i-phone"/></svg><span>' + TEL + '</span></a>';
    html += '</div></header>';
    
    // Hero
    html += '<main class="hero"><div class="hero-content">';
    html += '<h1>SERRURIER <span>D\'URGENCE</span><br>PRES DE CHEZ VOUS</h1>';
    html += '<p class="hero-subtitle">Intervention en 15 minutes, 24h/24 et 7j/7.<br>Trouvez un serrurier dans votre ville.</p>';
    
    // Search box
    html += '<div class="search-box"><div class="search-container">';
    html += '<form class="search-form" id="searchForm">';
    html += '<input type="text" class="search-input" id="searchInput" placeholder="Ville, code postal ou departement..." autocomplete="off">';
    html += '<button type="submit" class="search-btn"><svg><use href="#i-search"/></svg> Rechercher</button>';
    html += '</form>';
    html += '<div class="suggestions" id="suggestions"></div>';
    html += '<p class="search-error" id="searchError">Erreur de recherche</p>';
    html += '</div></div>';
    
    // Features
    html += '<div class="features">';
    html += '<div class="feature"><svg><use href="#i-bolt"/></svg> 15 min d\'intervention</div>';
    html += '<div class="feature"><svg><use href="#i-clock"/></svg> 24h/24 - 7j/7</div>';
    html += '<div class="feature"><svg><use href="#i-shield"/></svg> Agree assurances</div>';
    html += '</div>';
    
    html += '</div></main>';
    
    // Footer
    html += '<footer>';
    html += '<p>2025 ' + MARQUE + ' - Tous droits reserves</p>';
    html += '<p><a href="/mentions-legales">Mentions legales</a><a href="/confidentialite">Confidentialite</a><a href="/cgu">CGU</a></p>';
    html += '</footer>';
    
    // JavaScript
    html += '<script>';
    html += 'var searchInput = document.getElementById("searchInput");';
    html += 'var suggestions = document.getElementById("suggestions");';
    html += 'var searchForm = document.getElementById("searchForm");';
    html += 'var searchError = document.getElementById("searchError");';
    html += 'var debounceTimer;';
    
    // Fetch suggestions
    html += 'searchInput.addEventListener("input", function() {';
    html += '  clearTimeout(debounceTimer);';
    html += '  var query = this.value.trim();';
    html += '  searchError.classList.remove("show");';
    html += '  if (query.length < 2) { suggestions.classList.remove("show"); return; }';
    html += '  debounceTimer = setTimeout(function() {';
    html += '    fetch("/api/suggestions?q=" + encodeURIComponent(query))';
    html += '      .then(function(r) { return r.json(); })';
    html += '      .then(function(data) {';
    html += '        if (data.length === 0) { suggestions.classList.remove("show"); return; }';
    html += '        var html = "";';
    html += '        data.forEach(function(item) {';
    html += '          var icon = item.type === "ville" ? "location" : (item.type === "departement" ? "location" : "location");';
    html += '          html += "<div class=\\"suggestion-item\\" data-slug=\\"" + item.slug + "\\"><svg><use href=\\"#i-" + icon + "\\"/></svg><span>" + item.nom + "</span><span class=\\"suggestion-type\\">" + item.type + "</span></div>";';
    html += '        });';
    html += '        suggestions.innerHTML = html;';
    html += '        suggestions.classList.add("show");';
    html += '        document.querySelectorAll(".suggestion-item").forEach(function(el) {';
    html += '          el.addEventListener("click", function() {';
    html += '            window.location.href = "/serrurier/" + this.dataset.slug;';
    html += '          });';
    html += '        });';
    html += '      })';
    html += '      .catch(function(err) {';
    html += '        searchError.classList.add("show");';
    html += '        suggestions.classList.remove("show");';
    html += '      });';
    html += '  }, 300);';
    html += '});';
    
    // Form submit
    html += 'searchForm.addEventListener("submit", function(e) {';
    html += '  e.preventDefault();';
    html += '  var query = searchInput.value.trim();';
    html += '  if (query.length >= 2) {';
    html += '    var slug = query.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");';
    html += '    window.location.href = "/serrurier/" + slug;';
    html += '  }';
    html += '});';
    
    // Close suggestions on click outside
    html += 'document.addEventListener("click", function(e) {';
    html += '  if (!e.target.closest(".search-container")) {';
    html += '    suggestions.classList.remove("show");';
    html += '  }';
    html += '});';
    
    html += '</script>';
    html += '</body></html>';
    
    return new Response(html, { 
        status: 200, 
        headers: { "Content-Type": "text/html;charset=UTF-8" } 
    });
}
