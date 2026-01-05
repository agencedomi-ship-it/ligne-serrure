export async function onRequest(context) {
    var html = '<!DOCTYPE html><html lang="fr"><head>';
    html += '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
    html += '<title>Mentions Legales | Ligne-Serrure</title>';
    html += '<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">';
    html += '<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:"Open Sans",sans-serif;background:#111;color:#fff;padding:40px 20px;line-height:1.8}.container{max-width:800px;margin:0 auto}h1{font-family:"Oswald",sans-serif;font-size:36px;margin-bottom:30px;color:#F59E0B}h2{font-family:"Oswald",sans-serif;font-size:22px;margin:30px 0 15px;color:#F59E0B}p,li{color:#9CA3AF;margin-bottom:10px}ul{margin-left:20px;list-style:none}a{color:#F59E0B}.back{display:inline-block;margin-top:30px;background:#F59E0B;color:#111;padding:12px 25px;border-radius:8px;text-decoration:none;font-weight:600}</style>';
    html += '</head><body><div class="container">';
    html += '<h1>Mentions Legales</h1>';
    
    html += '<h2>Editeur du site</h2>';
    html += '<p><strong>Ligne-Serrure</strong></p>';
    html += '<p>Service de serrurerie d\'urgence 24h/24</p>';
    html += '<p>13 Rue des Muriers, 75020 Paris</p>';
    html += '<p>Telephone : 01 84 60 60 60</p>';
    
    html += '<h2>Informations legales</h2>';
    html += '<ul>';
    html += '<li><strong>Raison sociale :</strong> Ligne-Serrure SARL</li>';
    html += '<li><strong>SIREN :</strong> 992 992 750</li>';
    html += '<li><strong>SIRET :</strong> 992 992 750 00016</li>';
    html += '<li><strong>Numero TVA :</strong> FR10992992750</li>';
    html += '<li><strong>Forme juridique :</strong> Societe a responsabilite limitee (SARL)</li>';
    html += '<li><strong>Date de creation :</strong> 16 septembre 2025</li>';
    html += '<li><strong>Activite (NAF/APE) :</strong> Conseil en systemes et logiciels informatiques - 6202A</li>';
    html += '</ul>';
    
    html += '<h2>Directeur de la publication</h2>';
    html += '<p>Cristian TURCAN</p>';
    
    html += '<h2>Hebergement</h2>';
    html += '<p>Cloudflare, Inc.</p>';
    html += '<p>101 Townsend St, San Francisco, CA 94107, USA</p>';
    html += '<p>www.cloudflare.com</p>';
    
    html += '<h2>Propriete intellectuelle</h2>';
    html += '<p>L\'ensemble du contenu de ce site (textes, images, logos) est protege par le droit d\'auteur. Toute reproduction est interdite sans autorisation prealable.</p>';
    
    html += '<h2>Contact</h2>';
    html += '<p>Pour toute question, contactez-nous au 01 84 60 60 60</p>';
    
    html += '<a href="/" class="back">Retour a l\'accueil</a>';
    html += '</div></body></html>';
    return new Response(html, { status: 200, headers: { "Content-Type": "text/html;charset=UTF-8" } });
}
