export async function onRequest(context) {
    var html = '<!DOCTYPE html><html lang="fr"><head>';
    html += '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
    html += '<title>Conditions Generales d\'Utilisation | Ligne-Serrure</title>';
    html += '<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">';
    html += '<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:"Open Sans",sans-serif;background:#111;color:#fff;padding:40px 20px;line-height:1.8}.container{max-width:800px;margin:0 auto}h1{font-family:"Oswald",sans-serif;font-size:36px;margin-bottom:30px;color:#F59E0B}h2{font-family:"Oswald",sans-serif;font-size:22px;margin:30px 0 15px;color:#F59E0B}p,li{color:#9CA3AF;margin-bottom:10px}ul{margin-left:20px}a{color:#F59E0B}.back{display:inline-block;margin-top:30px;background:#F59E0B;color:#111;padding:12px 25px;border-radius:8px;text-decoration:none;font-weight:600}</style>';
    html += '</head><body><div class="container">';
    html += '<h1>Conditions Generales d\'Utilisation</h1>';
    html += '<p>Derniere mise a jour : Janvier 2026</p>';
    
    html += '<h2>Article 1 - Objet</h2>';
    html += '<p>Les presentes Conditions Generales d\'Utilisation (CGU) regissent l\'acces et l\'utilisation du site Ligne-Serrure. En utilisant ce site, vous acceptez pleinement ces conditions.</p>';
    
    html += '<h2>Article 2 - Editeur du site</h2>';
    html += '<p><strong>Ligne-Serrure SARL</strong></p>';
    html += '<p>13 Rue des Muriers, 75020 Paris</p>';
    html += '<p>SIRET : 992 992 750 00016</p>';
    html += '<p>Telephone : 01 84 60 60 60</p>';
    
    html += '<h2>Article 3 - Services proposes</h2>';
    html += '<p>Ligne-Serrure propose un service de mise en relation entre les utilisateurs et des serruriers professionnels pour :</p>';
    html += '<ul>';
    html += '<li>Ouverture de porte</li>';
    html += '<li>Changement et remplacement de serrure</li>';
    html += '<li>Blindage de porte</li>';
    html += '<li>Depannage d\'urgence 24h/24</li>';
    html += '<li>Installation de portes blindees</li>';
    html += '<li>Reparation de rideaux metalliques</li>';
    html += '<li>Ouverture de coffres-forts</li>';
    html += '</ul>';
    
    html += '<h2>Article 4 - Acces au site</h2>';
    html += '<p>Le site est accessible gratuitement a tout utilisateur disposant d\'un acces Internet. Les frais lies a l\'acces au site sont a la charge de l\'utilisateur.</p>';
    
    html += '<h2>Article 5 - Responsabilite</h2>';
    html += '<p>Ligne-Serrure s\'engage a fournir un service de qualite et a traiter les demandes dans les meilleurs delais. Toutefois, nous ne pouvons garantir :</p>';
    html += '<ul>';
    html += '<li>L\'absence d\'interruption ou d\'erreur du site</li>';
    html += '<li>Un delai d\'intervention precis (indicatif : 15-30 minutes)</li>';
    html += '</ul>';
    
    html += '<h2>Article 6 - Tarification</h2>';
    html += '<p>Les prix affiches sur le site sont indicatifs et correspondent a des tarifs de base. Un devis gratuit et detaille est etabli sur place avant toute intervention. Le client reste libre d\'accepter ou de refuser ce devis.</p>';
    
    html += '<h2>Article 7 - Propriete intellectuelle</h2>';
    html += '<p>L\'ensemble des elements du site (textes, images, logos, design) sont proteges par le droit de la propriete intellectuelle. Toute reproduction, meme partielle, est strictement interdite sans autorisation prealable.</p>';
    
    html += '<h2>Article 8 - Donnees personnelles</h2>';
    html += '<p>La collecte et le traitement des donnees personnelles sont decrits dans notre <a href="/confidentialite">Politique de Confidentialite</a>.</p>';
    
    html += '<h2>Article 9 - Modification des CGU</h2>';
    html += '<p>Ligne-Serrure se reserve le droit de modifier les presentes CGU a tout moment. Les utilisateurs seront informes de toute modification par la mise a jour de cette page.</p>';
    
    html += '<h2>Article 10 - Droit applicable</h2>';
    html += '<p>Les presentes CGU sont soumises au droit francais. En cas de litige, les tribunaux de Paris seront seuls competents.</p>';
    
    html += '<h2>Article 11 - Contact</h2>';
    html += '<p>Pour toute question concernant ces CGU, contactez-nous au 01 84 60 60 60.</p>';
    
    html += '<a href="/" class="back">Retour a l\'accueil</a>';
    html += '</div></body></html>';
    return new Response(html, { status: 200, headers: { "Content-Type": "text/html;charset=UTF-8" } });
}
