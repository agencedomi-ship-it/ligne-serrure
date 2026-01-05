export async function onRequest(context) {
    var html = '<!DOCTYPE html><html lang="fr"><head>';
    html += '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
    html += '<title>Politique de Confidentialite | Ligne-Serrure</title>';
    html += '<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">';
    html += '<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:"Open Sans",sans-serif;background:#111;color:#fff;padding:40px 20px;line-height:1.8}.container{max-width:800px;margin:0 auto}h1{font-family:"Oswald",sans-serif;font-size:36px;margin-bottom:30px;color:#F59E0B}h2{font-family:"Oswald",sans-serif;font-size:22px;margin:30px 0 15px;color:#F59E0B}p,li{color:#9CA3AF;margin-bottom:10px}ul{margin-left:20px}a{color:#F59E0B}.back{display:inline-block;margin-top:30px;background:#F59E0B;color:#111;padding:12px 25px;border-radius:8px;text-decoration:none;font-weight:600}</style>';
    html += '</head><body><div class="container">';
    html += '<h1>Politique de Confidentialite</h1>';
    html += '<p>Derniere mise a jour : Janvier 2026</p>';
    
    html += '<h2>Responsable du traitement</h2>';
    html += '<p><strong>Ligne-Serrure SARL</strong></p>';
    html += '<p>13 Rue des Muriers, 75020 Paris</p>';
    html += '<p>SIRET : 992 992 750 00016</p>';
    html += '<p>Representee par Cristian TURCAN</p>';
    
    html += '<h2>Donnees collectees</h2>';
    html += '<p>Nous collectons uniquement les informations necessaires au traitement de votre demande :</p>';
    html += '<ul>';
    html += '<li>Nom et prenom</li>';
    html += '<li>Numero de telephone</li>';
    html += '<li>Code postal et adresse</li>';
    html += '<li>Description du probleme de serrurerie</li>';
    html += '<li>Photos eventuelles du probleme</li>';
    html += '</ul>';
    
    html += '<h2>Finalite du traitement</h2>';
    html += '<p>Vos donnees sont utilisees exclusivement pour :</p>';
    html += '<ul>';
    html += '<li>Vous recontacter dans les meilleurs delais</li>';
    html += '<li>Traiter votre demande de depannage ou devis</li>';
    html += '<li>Organiser l\'intervention d\'un serrurier</li>';
    html += '</ul>';
    
    html += '<h2>Base legale</h2>';
    html += '<p>Le traitement de vos donnees est fonde sur l\'execution d\'un contrat (article 6.1.b du RGPD) : votre demande d\'intervention ou de devis.</p>';
    
    html += '<h2>Destinataires des donnees</h2>';
    html += '<p>Vos donnees sont transmises uniquement :</p>';
    html += '<ul>';
    html += '<li>A notre equipe interne pour traiter votre demande</li>';
    html += '<li>Aux serruriers partenaires intervenant chez vous</li>';
    html += '</ul>';
    html += '<p>Nous ne vendons jamais vos donnees a des tiers.</p>';
    
    html += '<h2>Duree de conservation</h2>';
    html += '<p>Vos donnees sont conservees pendant 3 ans a compter de votre derniere interaction avec nos services, conformement a la reglementation.</p>';
    
    html += '<h2>Vos droits</h2>';
    html += '<p>Conformement au RGPD, vous disposez des droits suivants :</p>';
    html += '<ul>';
    html += '<li><strong>Droit d\'acces :</strong> obtenir une copie de vos donnees</li>';
    html += '<li><strong>Droit de rectification :</strong> corriger vos donnees</li>';
    html += '<li><strong>Droit a l\'effacement :</strong> supprimer vos donnees</li>';
    html += '<li><strong>Droit a la portabilite :</strong> recevoir vos donnees dans un format structure</li>';
    html += '<li><strong>Droit d\'opposition :</strong> vous opposer au traitement</li>';
    html += '</ul>';
    html += '<p>Pour exercer ces droits, contactez-nous au 01 84 60 60 60.</p>';
    
    html += '<h2>Securite</h2>';
    html += '<p>Nous mettons en oeuvre des mesures techniques et organisationnelles appropriees pour proteger vos donnees contre tout acces non autorise.</p>';
    
    html += '<h2>Reclamation</h2>';
    html += '<p>En cas de difficulte, vous pouvez introduire une reclamation aupres de la CNIL : <a href="https://www.cnil.fr" target="_blank">www.cnil.fr</a></p>';
    
    html += '<a href="/" class="back">Retour a l\'accueil</a>';
    html += '</div></body></html>';
    return new Response(html, { status: 200, headers: { "Content-Type": "text/html;charset=UTF-8" } });
}
