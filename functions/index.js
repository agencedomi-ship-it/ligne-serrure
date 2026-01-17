<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ligne Serrure - Trouvez un serrurier pres de chez vous</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root{--primary:#F5A623;--primary-dark:#E09000;--dark:#0D0D0D;--dark-light:#1A1A1A;--gray:#888;--white:#FFF;--success:#10B981;--error:#E63946}
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:'DM Sans',sans-serif;background:var(--dark);color:var(--white);min-height:100vh}
        header{padding:24px 40px;display:flex;justify-content:space-between;align-items:center;max-width:1400px;margin:0 auto}
        .logo{display:flex;align-items:center;gap:12px;text-decoration:none}
        .logo-icon{width:50px;height:50px;border-radius:10px;overflow:hidden}
        .logo-icon img{width:100%;height:100%;object-fit:cover}
        .logo-text{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:2px;color:var(--white)}
        .logo-text span{color:var(--primary)}
        .header-phone{display:flex;align-items:center;gap:12px;background:var(--primary);color:var(--dark);padding:12px 24px;border-radius:50px;text-decoration:none;font-weight:700;transition:all .3s}
        .header-phone:hover{background:var(--primary-dark);transform:translateY(-2px)}
        .header-phone svg{width:20px;height:20px;fill:var(--dark)}
        .hero{max-width:900px;margin:0 auto;padding:80px 20px 120px;text-align:center}
        .hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(245,166,35,.1);border:1px solid rgba(245,166,35,.3);padding:8px 20px;border-radius:50px;font-size:14px;color:var(--primary);margin-bottom:32px}
        .hero-badge .dot{width:8px;height:8px;background:var(--success);border-radius:50%;animation:blink 1.5s infinite}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
        .hero h1{font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,10vw,80px);letter-spacing:4px;line-height:1;margin-bottom:24px}
        .hero h1 span{color:var(--primary)}
        .hero p{font-size:18px;color:var(--gray);max-width:600px;margin:0 auto 48px;line-height:1.6}
        .search-container{max-width:600px;margin:0 auto;position:relative}
        .search-box{display:flex;background:var(--dark-light);border:2px solid #333;border-radius:16px;overflow:hidden;transition:all .3s}
        .search-box:focus-within{border-color:var(--primary);box-shadow:0 0 0 4px rgba(245,166,35,.1)}
        .search-box input{flex:1;padding:20px 24px;background:transparent;border:none;color:var(--white);font-size:18px;font-family:inherit;outline:none}
        .search-box input::placeholder{color:var(--gray)}
        .search-box button{padding:20px 32px;background:var(--primary);border:none;color:var(--dark);font-size:16px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:8px;transition:all .3s;font-family:inherit}
        .search-box button:hover{background:var(--primary-dark)}
        .search-box button svg{width:20px;height:20px;fill:var(--dark)}
        .popular{margin-top:40px}
        .popular h4{font-size:14px;color:var(--gray);margin-bottom:20px;font-weight:500}
        .popular-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:12px}
        .popular-tag{padding:12px 24px;background:var(--dark-light);border:1px solid #333;border-radius:50px;color:var(--white);text-decoration:none;font-size:14px;font-weight:500;transition:all .3s}
        .popular-tag:hover{border-color:var(--primary);background:rgba(245,166,35,.1);color:var(--primary)}
        .features{max-width:1200px;margin:0 auto;padding:80px 20px;display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:32px}
        .feature{background:var(--dark-light);border:1px solid #333;border-radius:16px;padding:32px;text-align:center;transition:all .3s}
        .feature:hover{border-color:var(--primary);transform:translateY(-4px)}
        .feature-icon{width:64px;height:64px;background:rgba(245,166,35,.1);border-radius:16px;display:flex;align-items:center;justify-content:center;margin:0 auto 20px}
        .feature-icon svg{width:32px;height:32px;fill:var(--primary)}
        .feature h3{font-size:20px;font-weight:700;margin-bottom:12px}
        .feature p{color:var(--gray);font-size:15px;line-height:1.6}
        footer{text-align:center;padding:40px 20px;border-top:1px solid #333;color:var(--gray);font-size:14px}
        footer a{color:var(--primary);text-decoration:none;margin:0 10px}
        @media(max-width:768px){header{padding:16px 20px;flex-direction:column;gap:16px}.hero{padding:60px 20px 80px}.search-box{flex-direction:column}.search-box button{justify-content:center}.header-phone{width:100%;justify-content:center}}
    </style>
</head>
<body>
    <svg xmlns="http://www.w3.org/2000/svg" style="display:none">
        <symbol id="i-phone" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></symbol>
        <symbol id="i-search" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></symbol>
        <symbol id="i-bolt" viewBox="0 0 24 24"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></symbol>
        <symbol id="i-euro" viewBox="0 0 24 24"><path d="M15 18.5c-2.51 0-4.68-1.42-5.76-3.5H15v-2H8.58c-.05-.33-.08-.66-.08-1s.03-.67.08-1H15V9H9.24C10.32 6.92 12.5 5.5 15 5.5c1.61 0 3.09.59 4.23 1.57L21 5.3C19.41 3.87 17.3 3 15 3c-3.92 0-7.24 2.51-8.48 6H3v2h3.06c-.04.33-.06.66-.06 1s.02.67.06 1H3v2h3.52c1.24 3.49 4.56 6 8.48 6 2.31 0 4.41-.87 6-2.3l-1.78-1.77c-1.13.98-2.6 1.57-4.22 1.57z"/></symbol>
        <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></symbol>
        <symbol id="i-clock" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></symbol>
    </svg>

    <header>
        <a href="/" class="logo">
            <div class="logo-icon">
                <img src="https://i.ibb.co/4R5xvKsL/Logo-moderne-avec-maison-et-lettres-LS.png" alt="Logo LS">
            </div>
            <div class="logo-text">LIGNE<span>SERRURE</span></div>
        </a>
        <a href="tel:0980808905" class="header-phone"><svg><use href="#i-phone"/></svg> 09 80 80 89 05</a>
    </header>

    <section class="hero">
        <div class="hero-badge"><span class="dot"></span> Serruriers disponibles 24h/24</div>
        <h1>TROUVEZ UN <span>SERRURIER</span></h1>
        <p>Entrez votre ville, code postal ou departement pour trouver un serrurier professionnel disponible immediatement.</p>
        
        <div class="search-container">
            <form class="search-box" id="searchForm">
                <input type="text" id="searchInput" placeholder="Ville, code postal ou departement..." autocomplete="off" required>
                <button type="submit"><svg><use href="#i-search"/></svg> Rechercher</button>
            </form>
        </div>

        <div class="popular">
            <h4>Recherches populaires</h4>
            <div class="popular-tags">
                <a href="/serrurier/paris" class="popular-tag">Paris</a>
                <a href="/serrurier/lyon" class="popular-tag">Lyon</a>
                <a href="/serrurier/marseille" class="popular-tag">Marseille</a>
                <a href="/serrurier/bordeaux" class="popular-tag">Bordeaux</a>
                <a href="/serrurier/nice" class="popular-tag">Nice</a>
                <a href="/serrurier/toulouse" class="popular-tag">Toulouse</a>
                <a href="/serrurier/nantes" class="popular-tag">Nantes</a>
                <a href="/serrurier/92" class="popular-tag">Hauts-de-Seine (92)</a>
            </div>
        </div>
    </section>

    <section class="features">
        <div class="feature">
            <div class="feature-icon"><svg><use href="#i-bolt"/></svg></div>
            <h3>Intervention en 20 min</h3>
            <p>Nos serruriers se deplacent rapidement pour intervenir chez vous.</p>
        </div>
        <div class="feature">
            <div class="feature-icon"><svg><use href="#i-euro"/></svg></div>
            <h3>Devis gratuit</h3>
            <p>Recevez un devis transparent et sans engagement avant toute intervention.</p>
        </div>
        <div class="feature">
            <div class="feature-icon"><svg><use href="#i-shield"/></svg></div>
            <h3>Agree assurances</h3>
            <p>Tous nos serruriers sont agrees par les compagnies d assurance.</p>
        </div>
        <div class="feature">
            <div class="feature-icon"><svg><use href="#i-clock"/></svg></div>
            <h3>Disponible 24h/24</h3>
            <p>Nos serruriers sont disponibles jour et nuit, 7j/7.</p>
        </div>
    </section>

    <footer>
        <p>2025 Ligne Serrure - Tous droits reserves | <a href="tel:0980808905">09 80 80 89 05</a></p>
        <p><a href="/mentions-legales">Mentions legales</a><a href="/confidentialite">Confidentialite</a><a href="/cgu">CGU</a></p>
    </footer>
</body>
</html>
