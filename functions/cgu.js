export async function onRequest(context) {
    var MARQUE = "Ligne-Serrure";
    var TEL = "01 84 60 60 60";
    
    var html = '<!DOCTYPE html><html lang="fr"><head>';
    html += '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
    html += '<title>Conditions Generales d\'Utilisation | ' + MARQUE + '</title>';
    html += '<link rel="preconnect" href="https://fonts.googleapis.com">';
    html += '<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">';
    html += '<style>';
    html += ':root{--red:#DC2626;--red-dark:#B91C1C;--dark:#1F2937;--gray:#6B7280;--gray-light:#F9FAFB;--white:#FFFFFF}';
    html += '*{margin:0;padding:0;box-sizing:border-box}body{font-family:"Open Sans",sans-serif;color:var(--dark);background:var(--white)}h1,h2,h3{font-family:"Oswald",sans-serif;font-weight:700}';
    
    // Header
    html += 'header{background:var(--white);box-shadow:0 4px 20px rgba(0,0,0,0.1);padding:15px 0;position:sticky;top:0;z-index:100}';
    html += '.header-inner{max-width:1200px;margin:0 auto;padding:0 20px;display:flex;justify-content:space-between;align-items:center}';
    html += '.logo{display:flex;align-items:center;gap:12px;text-decoration:none}';
    html += '.logo-icon{width:55px;height:55px;background:var(--red);border-radius:12px;display:flex;align-items:center;justify-content:center}';
    html += '.logo-icon svg{width:32px;height:32px;fill:var(--white)}';
    html += '.logo-text{font-family:"Oswald",sans-serif;font-size:28px;color:var(--dark)}';
    html += '.logo-text span{color:var(--red)}';
    
    // Content
    html += '.legal-hero{background:linear-gradient(135deg,var(--gray-light),var(--white));padding:60px 0;text-align:center}';
    html += '.legal-hero h1{font-size:48px;color:var(--dark)}';
    html += '.legal-hero h1 span{color:var(--red)}';
    html += '.legal-content{max-width:900px;margin:0 auto;padding:60px 20px}';
    html += '.legal-section{margin-bottom:40px}';
    html += '.legal-section h2{font-size:24px;color:var(--red);margin-bottom:15px;padding-bottom:10px;border-bottom:2px solid var(--gray-light)}';
    html += '.legal-section p,.legal-section li{font-size:16px;line-height:1.8;color:var(--gray);margin-bottom:15px}';
    html += '.legal-section ul{margin-left:20px}';
    html += '.legal-section strong{color:var(--dark)}';
    
    // Footer
    html += 'footer{padding:40px 0;background:var(--dark);text-align:center}';
    html += 'footer p{color:rgba(255,255,255,0.7);font-size:14px}';
    html += 'footer a{color:rgba(255,255,255,0.7);text-decoration:none;margin:0 15px}';
    html += 'footer a:hover{color:var(--white)}';
    
    html += '</style></head><body>';
    
    // SVG
    html += '<svg xmlns="http://www.w3.org/2000/svg" style="display:none"><symbol id="i-lock" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></symbol></svg>';
    
    // Header
    html += '<header><div class="header-inner"><a href="/" class="logo"><div class="logo-icon"><svg><use href="#i-lock"/></svg></div><div class="logo-text">Ligne <span>Serrure</span></div></a></div></header>';
    
    // Hero
    html += '<section class="legal-hero"><h1>CONDITIONS GENERALES <span>D\'UTILISATION</span></h1></section>';
    
    // Content
    html += '<main class="legal-content">';
    
    html += '<div class="legal-section"><h2>1. Objet</h2>';
    html += '<p>Les presentes Conditions Generales d\'Utilisation (CGU) ont pour objet de definir les modalites d\'utilisation du site ' + MARQUE + ' et des services proposes.</p>';
    html += '<p>En utilisant ce site, vous acceptez sans reserve les presentes CGU.</p></div>';
    
    html += '<div class="legal-section"><h2>2. Services proposes</h2>';
    html += '<p>' + MARQUE + ' propose des services de serrurerie incluant :</p>';
    html += '<ul><li>Ouverture de porte (porte claquee, cle perdue, cle cassee)</li>';
    html += '<li>Changement et remplacement de serrure</li>';
    html += '<li>Installation et reparation de blindage de porte</li>';
    html += '<li>Depannage de rideaux metalliques</li>';
    html += '<li>Ouverture et installation de coffres-forts</li>';
    html += '<li>Installation de portes blindees</li></ul></div>';
    
    html += '<div class="legal-section"><h2>3. Tarification</h2>';
    html += '<p>Les prix indiques sur le site sont donnes a titre indicatif. Un devis gratuit et detaille est systematiquement etabli avant toute intervention.</p>';
    html += '<p>Le client est libre d\'accepter ou de refuser le devis. Aucun frais ne sera facture en cas de refus du devis.</p>';
    html += '<p>Les tarifs peuvent varier selon :</p>';
    html += '<ul><li>Le type d\'intervention</li><li>La complexite du travail</li><li>Les pieces necessaires</li><li>L\'horaire d\'intervention (jour, nuit, week-end, jours feries)</li></ul></div>';
    
    html += '<div class="legal-section"><h2>4. Interventions</h2>';
    html += '<p>Nos interventions sont realisees par des techniciens qualifies et experimentes. Nous nous engageons a :</p>';
    html += '<ul><li>Intervenir dans les meilleurs delais</li><li>Fournir un travail de qualite</li><li>Utiliser des pieces de rechange de qualite</li><li>Garantir nos interventions</li></ul></div>';
    
    html += '<div class="legal-section"><h2>5. Garanties</h2>';
    html += '<p>Toutes nos interventions sont garanties. Les pieces installees beneficient de la garantie constructeur.</p>';
    html += '<p>En cas de probleme suite a une intervention, contactez-nous pour une prise en charge dans le cadre de la garantie.</p></div>';
    
    html += '<div class="legal-section"><h2>6. Responsabilites</h2>';
    html += '<p>Le client s\'engage a :</p>';
    html += '<ul><li>Fournir des informations exactes lors de la demande d\'intervention</li>';
    html += '<li>Etre present ou represente lors de l\'intervention</li>';
    html += '<li>Justifier de son droit d\'acces au local concerne</li>';
    html += '<li>Regler le montant de l\'intervention apres accord du devis</li></ul></div>';
    
    html += '<div class="legal-section"><h2>7. Paiement</h2>';
    html += '<p>Le paiement s\'effectue a la fin de l\'intervention. Nous acceptons :</p>';
    html += '<ul><li>Carte bancaire</li><li>Especes</li><li>Cheque</li></ul>';
    html += '<p>Une facture detaillee est remise au client apres chaque intervention.</p></div>';
    
    html += '<div class="legal-section"><h2>8. Droit de retractation</h2>';
    html += '<p>Conformement a l\'article L221-28 du Code de la consommation, le droit de retractation ne peut etre exerce pour les interventions d\'urgence realisees a domicile lorsque le consommateur a expressement demande une intervention immediate.</p></div>';
    
    html += '<div class="legal-section"><h2>9. Litiges</h2>';
    html += '<p>En cas de litige, une solution amiable sera recherchee avant toute action judiciaire. A defaut, les tribunaux francais seront seuls competents.</p>';
    html += '<p>Conformement aux dispositions du Code de la consommation, vous pouvez recourir gratuitement au service de mediation de la consommation.</p></div>';
    
    html += '<div class="legal-section"><h2>10. Modification des CGU</h2>';
    html += '<p>Nous nous reservons le droit de modifier les presentes CGU a tout moment. Les modifications entrent en vigueur des leur publication sur le site.</p>';
    html += '<p><strong>Derniere mise a jour :</strong> Janvier 2025</p></div>';
    
    html += '</main>';
    
    // Footer
    html += '<footer><p>2025 ' + MARQUE + ' - Tous droits reserves</p>';
    html += '<p><a href="/mentions-legales">Mentions legales</a><a href="/confidentialite">Confidentialite</a><a href="/cgu">CGU</a></p></footer>';
    
    html += '</body></html>';
    
    return new Response(html, { 
        status: 200, 
        headers: { "Content-Type": "text/html;charset=UTF-8" } 
    });
}
