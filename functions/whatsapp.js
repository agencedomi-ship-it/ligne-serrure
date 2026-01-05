export async function onRequest(context) {
    var TELEGRAM = { botToken: "8478377033:AAECMsQCzeae_oi-5ScmCmYMeB8acEvHYUw", chatId: "-5210740167" };
    
    var html = '<!DOCTYPE html><html lang="fr"><head>';
    html += '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">';
    html += '<title>Contact WhatsApp | Ligne-Serrure</title>';
    html += '<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">';
    html += '<style>';
    html += '*{margin:0;padding:0;box-sizing:border-box}body{font-family:"Open Sans",sans-serif;background:#0B141A;min-height:100vh;display:flex;flex-direction:column}';
    html += '.wa-header{background:#1F2C34;padding:12px 16px;display:flex;align-items:center;gap:12px;position:sticky;top:0;z-index:100}.wa-back{width:24px;height:24px;fill:#00A884;cursor:pointer}.wa-avatar{width:40px;height:40px;background:#00A884;border-radius:50%;display:flex;align-items:center;justify-content:center}.wa-avatar svg{width:24px;height:24px;fill:#fff}.wa-info{flex:1}.wa-name{color:#fff;font-weight:600;font-size:16px}.wa-status{color:#8696A0;font-size:13px}';
    html += '.wa-chat{flex:1;padding:16px;overflow-y:auto;background:#0B141A}.wa-messages{max-width:500px;margin:0 auto;display:flex;flex-direction:column;gap:8px}';
    html += '.wa-bubble{max-width:85%;padding:8px 12px;border-radius:8px;font-size:14px;line-height:1.4;animation:fadeIn 0.3s ease}@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.wa-bubble.bot{background:#1F2C34;color:#E9EDEF;align-self:flex-start;border-top-left-radius:0}.wa-bubble.user{background:#005C4B;color:#E9EDEF;align-self:flex-end;border-top-right-radius:0}.wa-bubble .time{font-size:11px;color:#8696A0;margin-top:4px;text-align:right}';
    html += '.wa-options{display:flex;flex-direction:column;gap:8px;margin-top:12px}.wa-option{background:#1F2C34;border:1px solid #2A3942;color:#00A884;padding:12px 16px;border-radius:8px;font-size:14px;cursor:pointer;transition:all 0.2s;text-align:left}.wa-option:hover{background:#2A3942;border-color:#00A884}.wa-option.selected{background:#005C4B;border-color:#005C4B;color:#fff}';
    html += '.wa-form{display:none;flex-direction:column;gap:12px;margin-top:12px}.wa-form.show{display:flex}.wa-input-group{display:flex;flex-direction:column;gap:4px}.wa-input-group label{color:#8696A0;font-size:12px}.wa-input{background:#1F2C34;border:1px solid #2A3942;color:#E9EDEF;padding:12px;border-radius:8px;font-size:14px;outline:none}.wa-input:focus{border-color:#00A884}.wa-input::placeholder{color:#8696A0}.wa-input:disabled{opacity:0.7}.wa-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}';
    html += '.wa-upload{display:flex;flex-direction:column;gap:8px}.wa-upload-btn{background:#1F2C34;border:2px dashed #2A3942;color:#8696A0;padding:20px;border-radius:8px;font-size:14px;cursor:pointer;text-align:center}.wa-upload-btn:hover{border-color:#00A884;color:#00A884}.wa-upload-btn.has-file{border-color:#00A884;color:#00A884;border-style:solid}.wa-upload-btn svg{width:32px;height:32px;fill:currentColor;margin-bottom:8px}.wa-preview{display:none;gap:8px;flex-wrap:wrap}.wa-preview.show{display:flex}.wa-preview-img{width:80px;height:80px;object-fit:cover;border-radius:8px;border:2px solid #00A884}';
    html += '.wa-send{background:#00A884;color:#fff;border:none;padding:14px 24px;border-radius:8px;font-size:15px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px}.wa-send:hover{background:#008F72}.wa-send:disabled{background:#2A3942;cursor:not-allowed}.wa-send svg{width:20px;height:20px;fill:currentColor}';
    html += '.step{display:none}.step.active{display:block}';
    html += '.wa-success{text-align:center;padding:40px 20px}.wa-success-icon{width:80px;height:80px;background:#00A884;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px}.wa-success-icon svg{width:40px;height:40px;fill:#fff}.wa-success h3{color:#E9EDEF;font-size:22px;margin-bottom:12px}.wa-success p{color:#8696A0;font-size:15px}.wa-success-btn{display:inline-block;background:#00A884;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:24px}';
    html += '</style></head><body>';
    
    html += '<div class="wa-header"><svg class="wa-back" onclick="history.back()" viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg><div class="wa-avatar"><svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg></div><div class="wa-info"><div class="wa-name">Ligne-Serrure</div><div class="wa-status">En ligne</div></div></div>';
    
    html += '<div class="wa-chat"><div class="wa-messages" id="messages">';
    
    html += '<div class="step active" id="step1"><div class="wa-bubble bot">Bonjour ! Comment puis-je vous aider ?<div class="time">Maintenant</div></div><div class="wa-options" id="options1"><div class="wa-option" data-value="Porte claquee" onclick="selectOption(1,this)">Porte claquee / Cle oubliee</div><div class="wa-option" data-value="Cle perdue" onclick="selectOption(1,this)">Cle perdue ou volee</div><div class="wa-option" data-value="Cle cassee" onclick="selectOption(1,this)">Cle cassee dans la serrure</div><div class="wa-option" data-value="Serrure bloquee" onclick="selectOption(1,this)">Serrure bloquee</div><div class="wa-option" data-value="Cambriolage" onclick="selectOption(1,this)">Cambriolage / Effraction</div><div class="wa-option" data-value="Changement serrure" onclick="selectOption(1,this)">Changement de serrure</div><div class="wa-option" data-value="Autre" onclick="selectOption(1,this)">Autre</div></div></div>';
    
    html += '<div class="step" id="step2"><div class="wa-bubble bot">C\'est urgent ?<div class="time">Maintenant</div></div><div class="wa-options" id="options2"><div class="wa-option" data-value="URGENT - Maintenant" onclick="selectOption(2,this)">Oui, MAINTENANT</div><div class="wa-option" data-value="Dans 1 heure" onclick="selectOption(2,this)">Dans l\'heure</div><div class="wa-option" data-value="Aujourd\'hui" onclick="selectOption(2,this)">Aujourd\'hui</div><div class="wa-option" data-value="Cette semaine" onclick="selectOption(2,this)">Cette semaine</div></div></div>';
    
    html += '<div class="step" id="step3"><div class="wa-bubble bot">Photo du probleme ? (facultatif)<div class="time">Maintenant</div></div><div class="wa-upload"><label class="wa-upload-btn" id="uploadBtn"><svg viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg><div>Ajouter une photo</div><input type="file" id="photoInput" accept="image/*" multiple hidden onchange="handlePhotos(this)"></label><div class="wa-preview" id="photoPreview"></div><button class="wa-send" onclick="goToStep4()">Continuer</button></div></div>';
    
    html += '<div class="step" id="step4"><div class="wa-bubble bot">Vos coordonnees pour etre rappele.<div class="time">Maintenant</div></div><div class="wa-form show"><div class="wa-input-group"><label>Nom *</label><input type="text" class="wa-input" id="nom" placeholder="Jean Dupont" required></div><div class="wa-input-group"><label>Telephone *</label><input type="tel" class="wa-input" id="telephone" placeholder="0612345678" required maxlength="10"></div><div class="wa-row"><div class="wa-input-group"><label>Code postal *</label><input type="text" class="wa-input" id="codepostal" placeholder="75001" required maxlength="5" oninput="rechercherVille(this.value)"></div><div class="wa-input-group"><label>Ville</label><input type="text" class="wa-input" id="ville" placeholder="..." disabled></div></div><div class="wa-input-group"><label>Adresse *</label><input type="text" class="wa-input" id="adresse" placeholder="123 rue de Paris" required></div><div class="wa-input-group"><label>Details (optionnel)</label><textarea class="wa-input" id="details" placeholder="Decrivez..." rows="2"></textarea></div><button class="wa-send" id="sendBtn" onclick="sendForm()">Envoyer</button></div></div>';
    
    html += '<div class="step" id="step5"><div class="wa-success"><div class="wa-success-icon"><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></div><h3>Demande envoyee !</h3><p>Rappel dans 2 minutes.</p><a href="/" class="wa-success-btn">Retour</a></div></div>';
    
    html += '</div></div>';
    
    html += '<script>';
    html += 'var TELEGRAM_BOT="' + TELEGRAM.botToken + '",TELEGRAM_CHAT="' + TELEGRAM.chatId + '",formData={probleme:"",urgence:"",photos:[],ville:""};';
    
    html += 'function selectOption(step,el){el.classList.add("selected");var v=el.dataset.value;var b=document.createElement("div");b.className="wa-bubble user";b.innerHTML=v+"<div class=\\"time\\">Maintenant</div>";document.getElementById("step"+step).appendChild(b);document.getElementById("options"+step).style.display="none";if(step===1){formData.probleme=v;setTimeout(function(){showStep(2)},600);}if(step===2){formData.urgence=v;setTimeout(function(){showStep(3)},600);}}';
    
    html += 'function showStep(n){document.getElementById("step"+n).classList.add("active");document.getElementById("step"+n).scrollIntoView({behavior:"smooth"});}';
    
    html += 'var villeTimeout;function rechercherVille(cp){clearTimeout(villeTimeout);var vi=document.getElementById("ville");if(cp.length!==5){vi.value="";formData.ville="";return;}vi.value="...";villeTimeout=setTimeout(function(){fetch("https://geo.api.gouv.fr/communes?codePostal="+cp+"&fields=nom&limit=1").then(function(r){return r.json()}).then(function(d){if(d&&d.length>0){vi.value=d[0].nom;formData.ville=d[0].nom;}else{vi.value="?";}}).catch(function(){vi.value="?";});},300);}';
    
    html += 'function handlePhotos(input){var files=input.files;var preview=document.getElementById("photoPreview");var btn=document.getElementById("uploadBtn");formData.photos=[];if(files.length>0){btn.classList.add("has-file");btn.querySelector("div").textContent=files.length+" photo(s)";preview.classList.add("show");preview.innerHTML="";for(var i=0;i<files.length;i++){(function(file){var reader=new FileReader();reader.onload=function(e){preview.innerHTML+="<img src=\\""+e.target.result+"\\" class=\\"wa-preview-img\\">";formData.photos.push(e.target.result);};reader.readAsDataURL(file);})(files[i]);}}}';
    
    html += 'function goToStep4(){var b=document.createElement("div");b.className="wa-bubble user";b.innerHTML=(formData.photos.length>0?formData.photos.length+" photo(s)":"Pas de photo")+"<div class=\\"time\\">Maintenant</div>";document.getElementById("step3").appendChild(b);document.querySelector("#step3 .wa-upload").style.display="none";setTimeout(function(){showStep(4)},600);}';
    
    html += 'function b64toBlob(b64,type){var bs=atob(b64),n=bs.length,u8=new Uint8Array(n);for(var i=0;i<n;i++)u8[i]=bs.charCodeAt(i);return new Blob([u8],{type:type||"image/jpeg"});}';
    
    html += 'async function sendForm(){var nom=document.getElementById("nom").value.trim();var tel=document.getElementById("telephone").value.trim();var cp=document.getElementById("codepostal").value.trim();var ville=document.getElementById("ville").value.trim();var adresse=document.getElementById("adresse").value.trim();var details=document.getElementById("details").value.trim();if(!nom||!tel||!cp||!adresse){alert("Remplissez les champs obligatoires");return;}if(!/^[0-9]{10}$/.test(tel)){alert("Numero invalide");return;}var btn=document.getElementById("sendBtn");btn.disabled=true;btn.innerHTML="Envoi...";';
    
    // Construction adresse complete pour liens GPS
    html += 'var adresseComplete=adresse+", "+cp+" "+ville+", France";';
    html += 'var adresseEncoded=encodeURIComponent(adresseComplete);';
    html += 'var linkGoogleMaps="https://www.google.com/maps/search/?api=1&query="+adresseEncoded;';
    html += 'var linkWaze="https://waze.com/ul?q="+adresseEncoded;';
    
    // Message avec emojis et liens
    html += 'var msg="\\ud83d\\udea8 <b>NOUVELLE DEMANDE</b> \\ud83d\\udea8\\n\\n";';
    html += 'msg+="\\ud83d\\udd27 <b>Probleme:</b> "+formData.probleme+"\\n";';
    html += 'msg+="\\u23f0 <b>Urgence:</b> "+formData.urgence+"\\n\\n";';
    html += 'msg+="\\ud83d\\udc64 <b>Nom:</b> "+nom+"\\n";';
    html += 'msg+="\\ud83d\\udcde <b>Tel:</b> "+tel+"\\n";';
    html += 'msg+="\\ud83d\\udccd <b>Adresse:</b> "+adresse+"\\n";';
    html += 'msg+="\\ud83c\\udfd9 <b>Ville:</b> "+cp+" "+ville+"\\n";';
    html += 'if(details)msg+="\\ud83d\\udcdd <b>Details:</b> "+details+"\\n";';
    html += 'msg+="\\n\\ud83d\\uddfa <b>GPS:</b>\\n";';
    html += 'msg+="<a href=\\""+linkGoogleMaps+"\\">Google Maps</a> | <a href=\\""+linkWaze+"\\">Waze</a>";';
    
    html += 'try{if(formData.photos.length>0){var base64=formData.photos[0].split(",")[1];var blob=b64toBlob(base64);var fd=new FormData();fd.append("chat_id",TELEGRAM_CHAT);fd.append("photo",blob,"photo.jpg");fd.append("caption",msg);fd.append("parse_mode","HTML");await fetch("https://api.telegram.org/bot"+TELEGRAM_BOT+"/sendPhoto",{method:"POST",body:fd});for(var i=1;i<formData.photos.length;i++){var b=formData.photos[i].split(",")[1];var bl=b64toBlob(b);var f=new FormData();f.append("chat_id",TELEGRAM_CHAT);f.append("photo",bl,"photo.jpg");f.append("caption","Photo "+(i+1)+" - "+nom);await fetch("https://api.telegram.org/bot"+TELEGRAM_BOT+"/sendPhoto",{method:"POST",body:f});}}else{await fetch("https://api.telegram.org/bot"+TELEGRAM_BOT+"/sendMessage",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:TELEGRAM_CHAT,text:msg,parse_mode:"HTML",disable_web_page_preview:false})});}showStep(5);document.querySelector("#step4 .wa-form").style.display="none";}catch(e){console.error(e);alert("Erreur");btn.disabled=false;btn.innerHTML="Envoyer";}}';
    
    html += '</script></body></html>';
    
    return new Response(html, { status: 200, headers: { "Content-Type": "text/html;charset=UTF-8" } });
}
