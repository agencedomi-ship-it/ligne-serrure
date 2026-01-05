export async function onRequest(context) {
    var html = '<!DOCTYPE html><html lang="fr"><head>';
    html += '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
    html += '<title>CGU | Ligne-Serrure</title>';
    html += '<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">';
    html += '<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:"Open Sans",sans-serif;background:#111;color:#fff;padding:40px 20px;line-height:1.8}.container{max-width:800px;margin:0 auto}h1{font-family:"Oswald",sans-serif;font-size:36px;margin-bottom:30px;color:#F59E0B}h2{font-family:"Oswald",sans-serif;font-size:22px;margin:30px 0 15px;color:#F59E0B}p{color:#9CA3AF;margin-bottom:15px}a{color:#F59E0B}</style>';
    html += '</head><body><div class="container">';
    html += '<h1>Conditions Generales d\'Utilisation</h1>';
    html += '<h2>Objet</h2><p>Les presentes CGU regissent l\'utilisation du site Ligne-Serrure.</p>';
    html += '<h2>Services</h2><p>Ligne-Serrure propose un service de mise en relation avec des serruriers professionnels.</p>';
    html += '<h2>Responsabilite</h2><p>Nous nous engageons a fournir un service de qualite et a traiter vos demandes dans les meilleurs delais.</p>';
    html += '<p><a href="/">Retour a l\'accueil</a></p>';
    html += '</div></body></html>';
    return new Response(html, { status: 200, headers: { "Content-Type": "text/html;charset=UTF-8" } });
}
