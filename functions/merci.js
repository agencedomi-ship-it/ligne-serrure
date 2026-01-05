export async function onRequest(context) {
    var html = '<!DOCTYPE html><html lang="fr"><head>';
    html += '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
    html += '<title>Merci | Ligne-Serrure</title>';
    html += '<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">';
    html += '<style>';
    html += ':root{--green:#22C55E;--dark:#1F2937;--white:#FFFFFF}';
    html += '*{margin:0;padding:0;box-sizing:border-box}';
    html += 'body{font-family:"Open Sans",sans-serif;background:var(--dark);color:var(--white);min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:20px}';
    html += '.container{max-width:500px}';
    html += '.icon{width:100px;height:100px;background:var(--green);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 30px}';
    html += '.icon svg{width:50px;height:50px;fill:var(--white)}';
    html += 'h1{font-family:"Oswald",sans-serif;font-size:36px;margin-bottom:15px}';
    html += 'p{color:#9CA3AF;font-size:18px;margin-bottom:30px;line-height:1.6}';
    html += 'a{display:inline-block;background:var(--green);color:var(--white);padding:15px 40px;border-radius:10px;text-decoration:none;font-weight:600;transition:opacity 0.3s}';
    html += 'a:hover{opacity:0.9}';
    html += '</style></head><body>';
    html += '<div class="container">';
    html += '<div class="icon"><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></div>';
    html += '<h1>MERCI !</h1>';
    html += '<p>Votre demande a bien ete envoyee. Un serrurier vous rappelle dans les 2 minutes.</p>';
    html += '<a href="/">Retour a l\'accueil</a>';
    html += '</div></body></html>';
    return new Response(html, { status: 200, headers: { "Content-Type": "text/html;charset=UTF-8" } });
}
