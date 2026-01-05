export async function onRequest(context) {
    var html = '<!DOCTYPE html><html lang="fr"><head>';
    html += '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
    html += '<title>Politique de Confidentialite | Ligne-Serrure</title>';
    html += '<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">';
    html += '<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:"Open Sans",sans-serif;background:#111;color:#fff;padding:40px 20px;line-height:1.8}.container{max-width:800px;margin:0 auto}h1{font-family:"Oswald",sans-serif;font-size:36px;margin-bottom:30px;color:#F59E0B}h2{font-family:"Oswald",sans-serif;font-size:22px;margin:30px 0 15px;color:#F59E0B}p{color:#9CA3AF;margin-bottom:15px}a{color:#F59E0B}</style>';
    html += '</head><body><div class="container">';
    html += '<h1>Politique de Confidentialite</h1>';
    html += '<h2>Donnees collectees</h2><p>Nous collectons uniquement les informations necessaires au traitement de votre demande : nom, telephone, code postal et description du probleme.</p>';
    html += '<h2>Utilisation</h2><p>Ces donnees sont utilisees exclusivement pour vous recontacter et traiter votre demande de depannage.</p>';
    html += '<h2>Conservation</h2><p>Vos donnees sont conservees pendant la duree necessaire au traitement de votre demande.</p>';
    html += '<h2>Vos droits</h2><p>Vous disposez d\'un droit d\'acces, de rectification et de suppression de vos donnees.</p>';
    html += '<p><a href="/">Retour a l\'accueil</a></p>';
    html += '</div></body></html>';
    return new Response(html, { status: 200, headers: { "Content-Type": "text/html;charset=UTF-8" } });
}
