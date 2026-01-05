export async function onRequest(context) {
    var TELEGRAM = { botToken: "8478377033:AAECMsQCzeae_oi-5scmCmYMeB8acEvHYUw", chatId: "-5210740167" };
    
    var html = '<!DOCTYPE html><html lang="fr"><head>';
    html += '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">';
    html += '<title>Contact WhatsApp | Ligne-Serrure</title>';
    html += '<meta name="description" content="Contactez un serrurier en urgence via WhatsApp. Reponse immediate.">';
    html += '<link rel="preconnect" href="https://fonts.googleapis.com">';
    html += '<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">';
    html += '<style>';
    
    // Reset et base
    html += '*{margin:0;padding:0;box-sizing:border-box}';
    html += 'body{font-family:"Open Sans",sans-serif;background:#0B141A;min-height:100vh;display:flex;flex-direction:column}';
    
    // Header WhatsApp style
    html += '.wa-header{background:#1F2C34;padding:12px 16px;display:flex;align-items:center;gap:12px;position:sticky;top:0;z-index:100}';
    html += '.wa-back{width:24px;height:24px;fill:#00A884;cursor:pointer}';
    html += '.wa-avatar{width:40px;height:40px;background:#00A884;border-radius:50%;display:flex;align-items:center;justify-content:center}';
    html += '.wa-avatar svg{width:24px;height:24px;fill:#fff}';
    html += '.wa-info{flex:1}';
    html += '.wa-name{color:#fff;font-weight:600;font-size:16px}';
    html += '.wa-status{color:#8696A0;font-size:13px}';
    
    // Chat container
    html += '.wa-chat{flex:1;padding:16px;overflow-y:auto;background:#0B141A url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAG1BMVEUfIS4fIS4fIS4fIS4fIS4fIS4fIS4fIS4fIS7WBhLIAAAACHRSTlMzMzMzMzMzM8chqGAAAAA8SURBVDjLY2AYBaNgFIyCUTAKRsEoGPogAGJQADEogBgUQAwKIAYFEIMCiEEBxKAAYlAAMSiAGBRADADVTwMhGjpM5QAAAABJRU5ErkJggg==") repeat}';
    html += '.wa-messages{max-width:500px;margin:0 auto;display:flex;flex-direction:column;gap:8px}';
    
    // Bulles de message
    html += '.wa-bubble{max-width:85%;padding:8px 12px;border-radius:8px;font-size:14px;line-height:1.4;position:relative;animation:fadeIn 0.3s ease}';
    html += '@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}';
    html += '.wa-bubble.bot{background:#1F2C34;color:#E9EDEF;align-self:flex-start;border-top-left-radius:0}';
    html += '.wa-bubble.user{background:#005C4B;color:#E9EDEF;align-self:flex-end;border-top-right-radius:0}';
    html += '.wa-bubble .time{font-size:11px;color:#8696A0;margin-top:4px;text-align:right}';
    
    // Options de réponse
    html += '.wa-options{display:flex;flex-direction:column;gap:8px;margin-top:12px}';
    html += '.wa-option{background:#1F2C34;border:1px solid #2A3942;color:#00A884;padding:12px 16px;border-radius:8px;font-size:14px;cursor:pointer;transition:all 0.2s;text-align:left}';
    html += '.wa-option:hover{background:#2A3942;border-color:#00A884}';
    html += '.wa-option.selected{background:#005C4B;border-color:#005C4B;color:#fff}';
    
    // Formulaire input
    html += '.wa-form{display:none;flex-direction:column;gap:12px;margin-top:12px}';
    html += '.wa-form.show{display:flex}';
    html += '.wa-input-group{display:flex;flex-direction:column;gap:4px}';
    html += '.wa-input-group label{color:#8696A0;font-size:12px}';
    html += '.wa-input{background:#1F2C34;border:1px solid #2A3942;color:#E9EDEF;padding:12px;border-radius:8px;font-size:14px;outline:none;transition:border-color 0.2s}';
    html += '.wa-input:focus{border-color:#00A884}';
    html += '.wa-input::placeholder{color:#8696A0}';
    
    // Upload photo
    html += '.wa-upload{display:flex;flex-direction:column;gap:8px}';
    html += '.wa-upload-btn{background:#1F2C34;border:2px dashed #2A3942;color:#8696A0;padding:20px;border-radius:8px;font-size:14px;cursor:pointer;text-align:center;transition:all 0.2s}';
    html += '.wa-upload-btn:hover{border-color:#00A884;color:#00A884}';
    html += '.wa-upload-btn.has-file{border-color:#00A884;color:#00A884;border-style:solid}';
    html += '.wa-upload-btn svg{width:32px;height:32px;fill:currentColor;margin-bottom:8px}';
    html += '.wa-preview{display:none;gap:8px;flex-wrap:wrap}';
    html += '.wa-preview.show{display:flex}';
    html += '.wa-preview-img{width:80px;height:80px;object-fit:cover;border-radius:8px;border:2px solid #00A884}';
    html += '.wa-preview-remove{position:absolute;top:-8px;right:-8px;width:24px;height:24px;background:#DC2626;border-radius:50%;color:#fff;border:none;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center}';
    html += '.wa-preview-item{position:relative}';
    
    // Bouton envoyer
    html += '.wa-send{background:#00A884;color:#fff;border:none;padding:14px 24px;border-radius:8px;font-size:15px;font-weight:600;cursor:pointer;transition:background 0.2s;display:flex;align-items:center;justify-content:center;gap:8px}';
    html += '.wa-send:hover{background:#008F72}';
    html += '.wa-send:disabled{background:#2A3942;cursor:not-allowed}';
    html += '.wa-send svg{width:20px;height:20px;fill:currentColor}';
    
    // Footer input style WhatsApp
    html += '.wa-footer{background:#1F2C34;padding:12px 16px;display:flex;align-items:center;gap:12px;position:sticky;bottom:0}';
    html += '.wa-footer-input{flex:1;background:#2A3942;border:none;color:#E9EDEF;padding:12px 16px;border-radius:24px;font-size:14px;outline:none}';
    html += '.wa-footer-btn{width:48px;height:48px;background:#00A884;border:none;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer}';
    html += '.wa-footer-btn svg{width:24px;height:24px;fill:#fff}';
    
    // Étapes
    html += '.step{display:none}';
    html += '.step.active{display:block}';
    
    // Loader
    html += '.wa-loader{display:flex;gap:4px;padding:12px}';
    html += '.wa-loader span{width:8px;height:8px;background:#8696A0;border-radius:50%;animation:bounce 1.4s infinite ease-in-out both}';
    html += '.wa-loader span:nth-child(1){animation-delay:-0.32s}';
    html += '.wa-loader span:nth-child(2){animation-delay:-0.16s}';
    html += '@keyframes bounce{0%,80%,100%{transform:scale(0)}40%{transform:scale(1)}}';
    
    // Succès
    html += '.wa-success{text-align:center;padding:40px 20px}';
    html += '.wa-success-icon{width:80px;height:80px;background:#00A884;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px}';
    html += '.wa-success-icon svg{width:40px;height:40px;fill:#fff}';
    html += '.wa-success h3{color:#E9EDEF;font-size:22px;margin-bottom:12px}';
    html += '.wa-success p{color:#8696A0;font-size:15px;line-height:1.6}';
    html += '.wa-success-btn{display:inline-block;background:#00A884;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:24px}';
    
    html += '</style></head><body>';
    
    // Header
    html += '<div class="wa-header">';
    html += '<svg class="wa-back" onclick="history.back()" viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>';
    html += '<div class="wa-avatar"><svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg></div>';
    html += '<div class="wa-info"><div class="wa-name">Ligne-Serrure</div><div class="wa-status">En ligne - Repond immediatement</div></div>';
    html += '</div>';
    
    // Chat
    html += '<div class="wa-chat"><div class="wa-messages" id="messages">';
    
    // Étape 1 : Type de problème
    html += '<div class="step active" id="step1">';
    html += '<div class="wa-bubble bot">Bonjour ! Je suis l\'assistant Ligne-Serrure. Comment puis-je vous aider aujourd\'hui ?<div class="time">Maintenant</div></div>';
    html += '<div class="wa-options" id="options1">';
    html += '<div class="wa-option" data-value="Porte claquee" onclick="selectOption(1, this)">Porte claquee / Cle oubliee</div>';
    html += '<div class="wa-option" data-value="Cle perdue" onclick="selectOption(1, this)">Cle perdue ou volee</div>';
    html += '<div class="wa-option" data-value="Cle cassee" onclick="selectOption(1, this)">Cle cassee dans la serrure</div>';
    html += '<div class="wa-option" data-value="Serrure bloquee" onclick="selectOption(1, this)">Serrure bloquee / Endommagee</div>';
    html += '<div class="wa-option" data-value="Cambriolage" onclick="selectOption(1, this)">Cambriolage / Effraction</div>';
    html += '<div class="wa-option" data-value="Changement serrure" onclick="selectOption(1, this)">Changement de serrure</div>';
    html += '<div class="wa-option" data-value="Autre" onclick="selectOption(1, this)">Autre probleme</div>';
    html += '</div></div>';
    
    // Étape 2 : Urgence
    html += '<div class="step" id="step2">';
    html += '<div class="wa-bubble bot">D\'accord, je comprends. C\'est urgent ?<div class="time">Maintenant</div></div>';
    html += '<div class="wa-options" id="options2">';
    html += '<div class="wa-option" data-value="URGENT - Maintenant" onclick="selectOption(2, this)">Oui, j\'ai besoin d\'aide MAINTENANT</div>';
    html += '<div class="wa-option" data-value="Dans 1 heure" onclick="selectOption(2, this)">Dans l\'heure</div>';
    html += '<div class="wa-option" data-value="Aujourd\'hui" onclick="selectOption(2, this)">Aujourd\'hui</div>';
    html += '<div class="wa-option" data-value="Cette semaine" onclick="selectOption(2, this)">Cette semaine (devis)</div>';
    html += '</div></div>';
    
    // Étape 3 : Photo
    html += '<div class="step" id="step3">';
    html += '<div class="wa-bubble bot">Pour mieux vous aider, pouvez-vous prendre une photo du probleme ? (facultatif)<div class="time">Maintenant</div></div>';
    html += '<div class="wa-upload">';
    html += '<label class="wa-upload-btn" id="uploadBtn">';
    html += '<svg viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>';
    html += '<div>Appuyez pour ajouter une photo</div>';
    html += '<input type="file" id="photoInput" accept="image/*" multiple hidden onchange="handlePhotos(this)">';
    html += '</label>';
    html += '<div class="wa-preview" id="photoPreview"></div>';
    html += '<button class="wa-send" onclick="goToStep4()">Continuer <svg viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg></button>';
    html += '</div></div>';
    
    // Étape 4 : Coordonnées
    html += '<div class="step" id="step4">';
    html += '<div class="wa-bubble bot">Parfait ! Plus que vos coordonnees pour qu\'un serrurier vous rappelle dans les 2 minutes.<div class="time">Maintenant</div></div>';
    html += '<div class="wa-form show">';
    html += '<div class="wa-input-group"><label>Votre nom *</label><input type="text" class="wa-input" id="nom" placeholder="Jean Dupont" required></div>';
    html += '<div class="wa-input-group"><label>Votre telephone *</label><input type="tel" class="wa-input" id="telephone" placeholder="0612345678" required maxlength="10"></div>';
    html += '<div class="wa-input-group"><label>Code postal *</label><input type="text" class="wa-input" id="codepostal" placeholder="75001" required maxlength="5"></div>';
    html += '<div class="wa-input-group"><label>Adresse (optionnel)</label><input type="text" class="wa-input" id="adresse" placeholder="123 rue de Paris"></div>';
    html += '<div class="wa-input-group"><label>Details supplementaires (optionnel)</label><textarea class="wa-input" id="details" placeholder="Decrivez votre probleme..." rows="3"></textarea></div>';
    html += '<button class="wa-send" id="sendBtn" onclick="sendForm()">Envoyer ma demande <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button>';
    html += '</div></div>';
    
    // Étape 5 : Succès
    html += '<div class="step" id="step5">';
    html += '<div class="wa-success">';
    html += '<div class="wa-success-icon"><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></div>';
    html += '<h3>Demande envoyee !</h3>';
    html += '<p>Un serrurier va vous rappeler dans les 2 prochaines minutes. Gardez votre telephone a portee de main.</p>';
    html += '<a href="/" class="wa-success-btn">Retour a l\'accueil</a>';
    html += '</div></div>';
    
    html += '</div></div>';
    
    // Script
    html += '<script>';
    html += 'var TELEGRAM_BOT="' + TELEGRAM.botToken + '";';
    html += 'var TELEGRAM_CHAT="' + TELEGRAM.chatId + '";';
    html += 'var formData={probleme:"",urgence:"",photos:[]};';
    
    // Sélection option
    html += 'function selectOption(step,el){';
    html += '  var value=el.dataset.value;';
    html += '  el.classList.add("selected");';
    html += '  var userBubble=document.createElement("div");';
    html += '  userBubble.className="wa-bubble user";';
    html += '  userBubble.innerHTML=value+"<div class=\\"time\\">Maintenant</div>";';
    html += '  document.getElementById("step"+step).appendChild(userBubble);';
    html += '  document.getElementById("options"+step).style.display="none";';
    html += '  if(step===1){formData.probleme=value;setTimeout(function(){showStep(2)},800);}';
    html += '  if(step===2){formData.urgence=value;setTimeout(function(){showStep(3)},800);}';
    html += '}';
    
    // Afficher étape
    html += 'function showStep(n){';
    html += '  document.getElementById("step"+n).classList.add("active");';
    html += '  document.getElementById("step"+n).scrollIntoView({behavior:"smooth"});';
    html += '}';
    
    // Gestion photos
    html += 'function handlePhotos(input){';
    html += '  var files=input.files;';
    html += '  var preview=document.getElementById("photoPreview");';
    html += '  var uploadBtn=document.getElementById("uploadBtn");';
    html += '  if(files.length>0){';
    html += '    uploadBtn.classList.add("has-file");';
    html += '    uploadBtn.querySelector("div").textContent=files.length+" photo(s) selectionnee(s)";';
    html += '    preview.classList.add("show");';
    html += '    preview.innerHTML="";';
    html += '    for(var i=0;i<files.length;i++){';
    html += '      var reader=new FileReader();';
    html += '      reader.onload=function(e){';
    html += '        var item=document.createElement("div");';
    html += '        item.className="wa-preview-item";';
    html += '        item.innerHTML="<img src=\\""+e.target.result+"\\" class=\\"wa-preview-img\\">";';
    html += '        preview.appendChild(item);';
    html += '        formData.photos.push(e.target.result);';
    html += '      };';
    html += '      reader.readAsDataURL(files[i]);';
    html += '    }';
    html += '  }';
    html += '}';
    
    // Aller à l'étape 4
    html += 'function goToStep4(){';
    html += '  var userBubble=document.createElement("div");';
    html += '  userBubble.className="wa-bubble user";';
    html += '  userBubble.innerHTML=(formData.photos.length>0?formData.photos.length+" photo(s) envoyee(s)":"Pas de photo")+"<div class=\\"time\\">Maintenant</div>";';
    html += '  document.getElementById("step3").appendChild(userBubble);';
    html += '  document.querySelector("#step3 .wa-upload").style.display="none";';
    html += '  setTimeout(function(){showStep(4)},800);';
    html += '}';
    
    // Envoi formulaire
    html += 'function sendForm(){';
    html += '  var nom=document.getElementById("nom").value.trim();';
    html += '  var tel=document.getElementById("telephone").value.trim();';
    html += '  var cp=document.getElementById("codepostal").value.trim();';
    html += '  var adresse=document.getElementById("adresse").value.trim();';
    html += '  var details=document.getElementById("details").value.trim();';
    html += '  if(!nom||!tel||!cp){alert("Veuillez remplir tous les champs obligatoires");return;}';
    html += '  if(!/^[0-9]{10}$/.test(tel)){alert("Numero de telephone invalide");return;}';
    html += '  if(!/^[0-9]{5}$/.test(cp)){alert("Code postal invalide");return;}';
    html += '  var btn=document.getElementById("sendBtn");';
    html += '  btn.disabled=true;';
    html += '  btn.innerHTML="Envoi en cours...";';
    
    // Message texte
    html += '  var msg="<b>DEMANDE WHATSAPP</b>\\n\\n";';
    html += '  msg+="<b>Probleme:</b> "+formData.probleme+"\\n";';
    html += '  msg+="<b>Urgence:</b> "+formData.urgence+"\\n";';
    html += '  msg+="<b>Nom:</b> "+nom+"\\n";';
    html += '  msg+="<b>Tel:</b> "+tel+"\\n";';
    html += '  msg+="<b>CP:</b> "+cp+"\\n";';
    html += '  if(adresse)msg+="<b>Adresse:</b> "+adresse+"\\n";';
    html += '  if(details)msg+="<b>Details:</b> "+details+"\\n";';
    html += '  msg+="<b>Photos:</b> "+(formData.photos.length>0?formData.photos.length+" photo(s)":"Aucune");';
    
    // Envoyer message texte
    html += '  fetch("https://api.telegram.org/bot"+TELEGRAM_BOT+"/sendMessage",{';
    html += '    method:"POST",';
    html += '    headers:{"Content-Type":"application/json"},';
    html += '    body:JSON.stringify({chat_id:TELEGRAM_CHAT,text:msg,parse_mode:"HTML"})';
    html += '  }).then(function(){';
    
    // Envoyer photos
    html += '    if(formData.photos.length>0){';
    html += '      var photoPromises=formData.photos.map(function(photoData){';
    html += '        var base64=photoData.split(",")[1];';
    html += '        var blob=b64toBlob(base64,"image/jpeg");';
    html += '        var fd=new FormData();';
    html += '        fd.append("chat_id",TELEGRAM_CHAT);';
    html += '        fd.append("photo",blob,"photo.jpg");';
    html += '        fd.append("caption","Photo de "+nom+" - "+tel);';
    html += '        return fetch("https://api.telegram.org/bot"+TELEGRAM_BOT+"/sendPhoto",{method:"POST",body:fd});';
    html += '      });';
    html += '      return Promise.all(photoPromises);';
    html += '    }';
    html += '  }).then(function(){';
    html += '    showStep(5);';
    html += '    document.querySelector("#step4 .wa-form").style.display="none";';
    html += '  }).catch(function(err){';
    html += '    console.error(err);';
    html += '    alert("Erreur lors de l\'envoi. Veuillez reessayer.");';
    html += '    btn.disabled=false;';
    html += '    btn.innerHTML="Envoyer ma demande";';
    html += '  });';
    html += '}';
    
    // Utilitaire base64 vers blob
    html += 'function b64toBlob(b64Data,contentType){';
    html += '  contentType=contentType||"";';
    html += '  var sliceSize=512;';
    html += '  var byteCharacters=atob(b64Data);';
    html += '  var byteArrays=[];';
    html += '  for(var offset=0;offset<byteCharacters.length;offset+=sliceSize){';
    html += '    var slice=byteCharacters.slice(offset,offset+sliceSize);';
    html += '    var byteNumbers=new Array(slice.length);';
    html += '    for(var i=0;i<slice.length;i++){byteNumbers[i]=slice.charCodeAt(i);}';
    html += '    var byteArray=new Uint8Array(byteNumbers);';
    html += '    byteArrays.push(byteArray);';
    html += '  }';
    html += '  return new Blob(byteArrays,{type:contentType});';
    html += '}';
    
    html += '</script>';
    html += '</body></html>';
    
    return new Response(html, { status: 200, headers: { "Content-Type": "text/html;charset=UTF-8" } });
}
