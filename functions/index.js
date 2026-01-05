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
    html += ':root{--orange:#F59E0B;--orange-dark:#D97706;--dark:#111111;--dark-lighter:#1a1a1a;--gray:#6B7280;--gray-light:#9CA3AF;--white:#FFFFFF}';
    html += '*{margin:0;padding:0;box-sizing:border-box}';
    html += 'body{font-family:"Open Sans",sans-serif;background:var(--dark);color:var(--white);min-height:100vh;display:flex;flex-direction:column}';
    html += 'h1,h2,h3{font-family:"Oswald",sans-serif;font-weight:700;text-transform:uppercase}';
    
    // Header
    html += 'header{padding:25px 0}';
    html += '.header-inner{max-width:1200px;margin:0 auto;padding:0 20px;display:flex;justify-content:space-between;align-items:center}';
    html += '.logo{font-family:"Oswald",sans-serif;font-size:28px;font-weight:700;font-style:italic;color:var(--white);text-decoration:none}';
    html += '.logo span{color:var(--orange)}';
    html += '.header-phone{display:flex;align-items:center;gap:10px;background:transparent;border:2px solid var(--orange);color:var(--orange);padding:12px 25px;border-radius:50px;text-decoration:none;font-weight:700;font-size:16px;transition:all 0.3s}';
    html += '.header-phone:hover{background:var(--orange);color:var(--dark)}';
    html += '.header-phone svg{width:18px;height:18px;fill:currentColor}';
    
    // Hero
    html += '.hero{flex:1;display:flex;align-items:center;justify-content:center;padding:40px 20px;text-align:center}';
    html += '.hero-content{max-width:900px}';
    
    // Badge
    html += '.badge{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);padding:10px 20px;border-radius:50px;margin-bottom:30px;font-size:14px;color:var(--orange)}';
    html += '.badge-dot{width:8px;height:8px;background:#22C55E;border-radius:50%;animation:blink 1s infinite}';
    html += '@keyframes blink{0%,100%{opacity:1}50%{opacity:0.4}}';
    
    // Title
    html += '.hero h1{font-size:72px;margin-bottom:25px;line-height:1}';
    html += '.hero h1 span{color:var(--orange)}';
    html += '.hero-subtitle{font-size:18px;color:var(--gray-light);margin-bottom:50px;line-height:1.6;max-width:600px;margin-left:auto;margin-right:auto}';
    
    // Search box
    html += '.search-container{position:relative;max-width:700px;margin:0 auto 50px}';
    html += '.search-form{display:flex;background:var(--dark-lighter);border:1px solid #333;border-radius:12px;overflow:hidden}';
    html += '.search-input{flex:1;padding:20px 25px;font-size:16px;border:none;background:transparent;color:var(--white);outline:none}';
    html += '.search-input::placeholder{color:var(--gray)}';
    html += '.search-btn{padding:20px 30px;background:var(--orange);color:var(--dark);border:none;font-family:"Open Sans",sans-serif;font-size:16px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:8px;transition:all 0.3s}';
    html += '.search-btn:hover{background:var(--orange-dark)}';
    html += '.search-btn svg{width:18px;height:18px;fill:currentColor}';
    
    // Suggestions dropdown
    html += '.suggestions{position:absolute;top:100%;left:0;right:0;background:var(--dark-lighter);border:1px solid #333;border-radius:12px;margin-top:10px;display:none;z-index:100;max-height:300px;overflow-y:auto}';
    html += '.suggestions.show{display:block}';
    html += '.suggestion-item{padding:15px 20px;color:var(--white);cursor:pointer;border-bottom:1px solid #333;display:flex;align-items:center;gap:12px;transition:background 0.2s}';
    html += '.suggestion-item:last-child{border-bottom:none}';
    html += '.suggestion-item:hover{background:rgba(255,255,255,0.05)}';
    html += '.suggestion-item svg{width:18px;height:18px;fill:var(--gray)}';
    html += '.suggestion-type{font-size:12px;color:var(--gray);margin-left:auto;text-transform:uppercase}';
    html += '.search-error{color:#EF4444;margin-top:15px;display:none}';
    html += '.search-error.show{display:block}';
    
    // Popular searches
    html += '.popular{text-align:center}';
    html += '.popular-title{font-size:14px;color:var(--gray);margin-bottom:20px}';
    html += '.popular-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}';
    html += '.popular-tag{background:var(--dark-lighter);border:1px solid #333;color:var(--white);padding:10px 20px;border-radius:50px;text-decoration:none;font-size:14px;transition:all 0.3s}';
    html += '.popular-tag:hover{border-color:var(--orange);color:var(--orange)}';
    
    // Footer
    html += 'footer{padding:30px 0;text-align:center;border-top:1px solid #222}';
    html += 'footer p{color:var(--gray);font-size:14px}';
    html += 'footer a{color:var(--gray);text-decoration:none;margin:0 10px}';
    html += 'footer a:hover{color:var(--white)}';
    
    // Responsive
    html += '@media(max-width:768px){';
    html += '.hero h1{font-size:42px}';
    html += '.search-form{flex-direction:column}';
    html += '.search-btn{justify-content:center}';
    html += '.header-phone span{display:none}';
    html += '}';
    
    html += '</style></head><body>';
    
    // Header
    html += '<header><div class="header-inner">';
    html += '<a href="/" class="logo">LIGNE<span>SERRURE</span></a>';
    html += '<a href="tel:' + TEL_CLEAN + '" class="header-phone"><svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg><span>' + TEL + '</span></a>';
    html += '</div></header>';
    
    // Hero
    html += '<main class="hero"><div class="hero-content">';
    
    // Badge
    html += '<div class="badge"><span class="badge-dot"></span> Serruriers disponibles 24h/24</div>';
    
    // Title
    html += '<h1>TROUVEZ UN <span>SERRURIER</span></h1>';
    html += '<p class="hero-subtitle">Entrez votre ville, code postal ou departement pour trouver un serrurier professionnel disponible immediatement.</p>';
    
    // Search box
    html += '<div class="search-container">';
    html += '<form class="search-form" id="searchForm">';
    html += '<input type="text" class="search-input" id="searchInput" placeholder="Ville, code postal ou departement..." autocomplete="off">';
    html += '<button type="submit" class="search-btn"><svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg> Rechercher</button>';
    html += '</form>';
    html += '<div class="suggestions" id="suggestions"></div>';
    html += '<p class="search-error" id="searchError">Erreur de recherche</p>';
    html += '</div>';
    
    // Popular searches
    html += '<div class="popular">';
    html += '<p class="popular-title">Recherches populaires</p>';
    html += '<div class="popular-tags">';
    html += '<a href="/serrurier/nantes" class="popular-tag">Nantes</a>';
    html += '<a href="/serrurier/bordeaux" class="popular-tag">Bordeaux</a>';
    html += '<a href="/serrurier/lyon" class="popular-tag">Lyon</a>';
    html += '<a href="/serrurier/rennes" class="popular-tag">Rennes</a>';
    html += '<a href="/serrurier/nice" class="popular-tag">Nice</a>';
    html += '<a href="/serrurier/toulouse" class="popular-tag">Toulouse</a>';
    html += '<a href="/serrurier/montpellier" class="popular-tag">Montpellier</a>';
    html += '</div>';
    html += '<div class="popular-tags" style="margin-top:10px">';
    html += '<a href="/serrurier/44" class="popular-tag">Loire-Atlantique (44)</a>';
    html += '</div>';
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
    html += '          html += "<div class=\\"suggestion-item\\" data-slug=\\"" + item.slug + "\\"><svg viewBox=\\"0 0 24 24\\"><path d=\\"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z\\"/></svg><span>" + item.nom + "</span><span class=\\"suggestion-type\\">" + item.type + "</span></div>";';
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
