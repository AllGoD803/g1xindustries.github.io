(() => {
  'use strict';
  const E=window.G1XFilaments, $=id=>document.getElementById(id), KEY='g1x-filaments-demo-v1';
  const copy={
    fr:{skip:'Aller au contenu',back:'Retour aux projets G1X',lead:'De l’étiquette à l’inventaire. Photographiez, vérifiez, ajoutez.',demo:'DÉMO INTERACTIVE',scanTitle:'Lire une étiquette',frameTitle:'Une boîte, une étiquette.',frameHint:'Cadrez le texte de près, bien éclairé et sans reflet.',camera:'Prendre une photo',upload:'Choisir une image',sample:'Essayer avec une étiquette fictive',manual:'Saisir manuellement',recognize:'Lire cette étiquette',cancel:'Annuler',rawTitle:'Texte lu ou référence à rechercher',find:'Chercher dans le catalogue d’essai',privacy:'La photo reste sur votre appareil. La première lecture télécharge le moteur de reconnaissance.',verify:'Vérifier la fiche',brand:'Marque',material:'Matière et gamme',color:'Nom de la couleur',code:'Code couleur / référence',quantity:'Nombre de bobines',price:'Prix payé / unité · CAD',add:'Confirmer et ajouter',save:'Enregistrer la modification',cancelEdit:'Annuler la modification',priceHelp:'Prix facultatif, à saisir selon votre facture. Aucun prix n’est deviné à partir de la photo.',inventory:'Votre inventaire d’essai',spools:'Bobines',value:'Valeur renseignée · CAD',search:'Rechercher une couleur, une marque…',emptyTitle:'Votre première bobine commence ici.',emptyHint:'Scannez une étiquette ou essayez l’exemple, puis confirmez sa fiche.',noResults:'Aucune bobine ne correspond à votre recherche.',export:'Exporter',import:'Importer',storageHint:'Inventaire enregistré uniquement dans ce navigateur. Exportez-le pour le conserver ou le transférer. Aucun compte requis.',limitsTitle:'Une démo à essayer, un catalogue à enrichir.',limits:'5 références Bambu Lab sont proposées. Les autres filaments restent saisissables manuellement. La reconnaissance peut se tromper : vérifiez toujours la marque, la gamme et la référence. Cette démo n’est pas reliée à G1X-Control ni à HueForge.',catalogTitle:'Voir les références du catalogue d’essai',swatchNote:'Les pastilles de couleur sont indicatives. Le nom et la référence font foi.',contact:'Parlons du projet',edit:'Modifier',remove:'Retirer',use:'Utiliser',unknownPrice:'Prix non renseigné',noCode:'Sans référence',loading:'Préparation de la lecture… Le premier chargement peut prendre quelques instants.',reading:'Lecture en cours',ready:'Image prête. Touchez « Lire cette étiquette ».',sampleCaption:'Étiquette fictive de démonstration — aucune photo personnelle.',imageCaption:'Votre image — traitée sur cet appareil uniquement.',matched:'Référence repérée dans le catalogue d’essai. Choisissez la proposition, puis vérifiez la fiche.',multi:'Plusieurs références repérées. Sélectionnez celle de la boîte photographiée.',unmatched:'Aucune référence reconnue parmi les 5 références d’essai. Vous pouvez corriger le texte ou saisir la fiche manuellement.',noText:'Aucun texte lisible. Essayez une photo plus proche et mieux éclairée, ou saisissez la fiche.',selected:'Fiche préremplie. Vérifiez les informations et indiquez la quantité et le prix payé.',scanError:'La lecture n’a pas abouti. Vérifiez votre connexion pour le premier chargement, puis réessayez. La saisie manuelle reste disponible.',imageError:'Cette image ne peut pas être ouverte. Essayez une photo JPEG, PNG, WebP ou une capture d’écran.',fileLarge:'Choisissez une image de moins de 15 Mo.',imageLarge:'L’image est trop grande. Recadrez-la sur l’étiquette et réessayez.',cancelled:'Lecture annulée.',invalid:'Vérifiez la marque, la gamme, la couleur, la quantité entière (1 à 1 000) et le prix positif (deux décimales maximum).',added:'Bobine ajoutée à votre inventaire.',updated:'Fiche mise à jour.',removed:'Fiche retirée.',deleteQuestion:'Retirer cette fiche de votre inventaire d’essai ?',importQuestion:'Remplacer l’inventaire de ce navigateur par celui du fichier ? Exportez d’abord votre inventaire actuel pour le conserver.',imported:'Inventaire importé.',badImport:'Fichier non valide. Choisissez un export JSON de G1X Filaments (500 fiches maximum).',limit:'La démo accepte 500 fiches maximum. Exportez votre inventaire avant de continuer.',storageError:'La sauvegarde dans ce navigateur est indisponible. Votre saisie reste en mémoire pour cette visite : exportez-la avant de quitter.',readError:'L’inventaire enregistré n’a pas pu être lu. Il n’a pas été remplacé. Exportez vos nouvelles saisies avant de quitter.',exported:'Export préparé. Conservez le fichier JSON dans vos fichiers.',emptyExport:'Ajoutez une bobine avant d’exporter.',unpriced:n=>`${n} bobine${n>1?'s':''} sans prix, exclue${n>1?'s':''} de la valeur renseignée.`,priced:'Somme des quantités × prix unitaires renseignés.',unit:n=>`${n} bobine${n>1?'s':''}`,unitPrice:'/ unité',menu:'Menu',navTech:'Technologies',navEnergy:'Énergie',navAI:'Intelligence',navProjects:'Projets',navAbout:'À propos',navContact:'Contact'},
    en:{skip:'Skip to content',back:'Back to G1X projects',lead:'From label to inventory. Take a photo, check the details, add your spool.',demo:'INTERACTIVE DEMO',scanTitle:'Read a label',frameTitle:'One box. One label.',frameHint:'Frame the text closely, with good lighting and no glare.',camera:'Take a photo',upload:'Choose an image',sample:'Try a fictional sample label',manual:'Enter manually',recognize:'Read this label',cancel:'Cancel',rawTitle:'Recognized text or reference to search',find:'Search the sample catalogue',privacy:'Your photo stays on your device. The first scan downloads the recognition engine.',verify:'Check the details',brand:'Brand',material:'Material and range',color:'Colour name',code:'Colour code / reference',quantity:'Number of spools',price:'Price paid / unit · CAD',add:'Confirm and add',save:'Save changes',cancelEdit:'Cancel editing',priceHelp:'Optional price, taken from your receipt. No price is guessed from the photo.',inventory:'Your trial inventory',spools:'Spools',value:'Recorded value · CAD',search:'Search a colour, brand…',emptyTitle:'Your first spool starts here.',emptyHint:'Scan a label or try the sample, then confirm its details.',noResults:'No spool matches your search.',export:'Export',import:'Import',storageHint:'Inventory is saved only in this browser. Export it to keep a copy or transfer it. No account required.',limitsTitle:'A demo to try. A catalogue to grow.',limits:'5 Bambu Lab references are included. Other filaments can be entered manually. Recognition can make mistakes: always check the brand, range and reference. This demo is not connected to G1X-Control or HueForge.',catalogTitle:'View the sample catalogue references',swatchNote:'Colour swatches are approximate. Use the colour name and reference.',contact:'Discuss the project',edit:'Edit',remove:'Remove',use:'Use',unknownPrice:'Price not provided',noCode:'No reference',loading:'Preparing the scan… The first download may take a moment.',reading:'Reading label',ready:'Image ready. Select “Read this label”.',sampleCaption:'Fictional demonstration label — no personal photo.',imageCaption:'Your image — processed on this device only.',matched:'Reference found in the sample catalogue. Select the suggestion, then check the details.',multi:'Several references found. Select the one on the photographed box.',unmatched:'No matching reference among the 5 sample references. Correct the text or enter the details manually.',noText:'No readable text. Try a closer, well-lit photo or enter the details manually.',selected:'Details prefilled. Check them and enter the quantity and price paid.',scanError:'The scan could not be completed. Check your connection for the initial download, then try again. Manual entry remains available.',imageError:'This image could not be opened. Try a JPEG, PNG, WebP photo or a screenshot.',fileLarge:'Choose an image smaller than 15 MB.',imageLarge:'This image is too large. Crop it to the label and try again.',cancelled:'Scan cancelled.',invalid:'Check the brand, range, colour, whole-number quantity (1–1,000), and non-negative price (up to two decimal places).',added:'Spool added to your inventory.',updated:'Details updated.',removed:'Entry removed.',deleteQuestion:'Remove this entry from your trial inventory?',importQuestion:'Replace this browser’s inventory with the file? Export your current inventory first to keep a copy.',imported:'Inventory imported.',badImport:'Invalid file. Choose a G1X Filaments JSON export (up to 500 entries).',limit:'This demo supports up to 500 entries. Export your inventory before continuing.',storageError:'Browser saving is unavailable. Your entries remain in memory for this visit: export them before leaving.',readError:'The saved inventory could not be read and was not replaced. Export any new entries before leaving.',exported:'Export prepared. Keep the JSON file in your files.',emptyExport:'Add a spool before exporting.',unpriced:n=>`${n} spool${n>1?'s':''} without a price, excluded from the recorded value.`,priced:'Sum of quantities × recorded unit prices.',unit:n=>`${n} spool${n>1?'s':''}`,unitPrice:'/ unit',menu:'Menu',navTech:'Technologies',navEnergy:'Energy',navAI:'Intelligence',navProjects:'Projects',navAbout:'About',navContact:'Contact'}
  };
  let lang='fr',items=[],editing=null,busy=false,worker=null,run=0,blockedStorage=false,photoKind=null,tesseractPromise=null;
  const messages=new Map();
  try{lang=localStorage.getItem('g1x-language')==='en'?'en':'fr';}catch{}
  const t=k=>copy[lang][k]||k;
  const money=v=>new Intl.NumberFormat(lang==='fr'?'fr-CA':'en-CA',{style:'currency',currency:'CAD'}).format(v);
  function status(id,key,error=false){messages.set(id,{key,error});const p=$(id);p.textContent=t(key);p.classList.toggle('error',error);}
  function clearStatus(id){messages.delete(id);$(id).textContent='';}
  function el(tag,text,className){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(className)n.className=className;return n;}
  function language(value){
    lang=value==='en'?'en':'fr';document.documentElement.lang=lang;
    document.title=`G1X Filaments — ${lang==='fr'?'Démo':'Demo'} | G1X Industries`;
    document.querySelectorAll('[data-f]').forEach(n=>n.textContent=t(n.dataset.f));
    document.querySelectorAll('[data-i18n]').forEach(n=>{if(copy[lang][n.dataset.i18n])n.textContent=t(n.dataset.i18n);});
    document.querySelectorAll('[data-f-placeholder]').forEach(n=>n.placeholder=t(n.dataset.fPlaceholder));
    document.querySelectorAll('[data-lang]').forEach(n=>{n.classList.toggle('active',n.dataset.lang===lang);n.setAttribute('aria-pressed',String(n.dataset.lang===lang));});
    $('save-button').textContent=t(editing?'save':'add');
    $('preview-canvas').setAttribute('aria-label',lang==='fr'?'Étiquette sélectionnée':'Selected label');
    $('ocr-progress').setAttribute('aria-label',lang==='fr'?'Progression de la lecture':'Scan progress');
    $('matches').setAttribute('aria-label',lang==='fr'?'Correspondances proposées':'Suggested matches');
    if(photoKind)$('image-caption').textContent=t(photoKind==='sample'?'sampleCaption':'imageCaption');
    for(const [id,m] of messages)status(id,m.key,m.error);
    if($('matches').childElementCount)showCandidates(false);
    render();try{localStorage.setItem('g1x-language',lang);}catch{}
  }
  document.querySelectorAll('[data-lang]').forEach(n=>n.addEventListener('click',()=>language(n.dataset.lang)));
  const menuButton=document.querySelector('.menu-toggle'),nav=document.querySelector('.main-nav');
  menuButton.addEventListener('click',()=>{const opened=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(opened));});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));
  function persist(){
    try{if(blockedStorage)throw new Error('blocked');localStorage.setItem(KEY,JSON.stringify({app:'G1X Filaments',version:1,items}));clearStatus('storage-status');return true;}
    catch{status('storage-status','storageError',true);return false;}
  }
  try{const saved=localStorage.getItem(KEY);if(saved)items=E.importRecords(JSON.parse(saved));}
  catch{blockedStorage=true;status('storage-status','readError',true);}
  function render(){
    const sum=E.totals(items);$('total-count').textContent=sum.quantity;$('total-value').textContent=money(sum.cents/100);
    $('unpriced-note').textContent=sum.unpriced?t('unpriced')(sum.unpriced):t('priced');
    const search=$('search').value.trim().toLocaleLowerCase();const filtered=items.filter(i=>[i.brand,i.material,i.color,i.code].join(' ').toLocaleLowerCase().includes(search));
    const list=$('inventory-list');list.replaceChildren();
    filtered.forEach(item=>{
      const article=el('article',undefined,'f-item'),top=el('div',undefined,'f-item-top'),swatch=el('span',undefined,'f-swatch'),text=el('div');
      swatch.style.backgroundColor=item.hex;swatch.setAttribute('aria-hidden','true');
      text.append(el('h3',item.color),el('p',`${item.brand} · ${item.material}`),el('p',item.code||t('noCode')));top.append(swatch,text);
      const bottom=el('div',undefined,'f-item-bottom'),count=el('div');count.append(el('strong',t('unit')(item.quantity)),el('p',item.unitPrice===null?t('unknownPrice'):`${money(item.unitPrice)} ${t('unitPrice')}`));
      const actions=el('div',undefined,'f-small-actions'),edit=el('button',t('edit')),remove=el('button',t('remove'),'f-delete');edit.type=remove.type='button';
      edit.setAttribute('aria-label',`${t('edit')} ${item.color} ${item.code}`);remove.setAttribute('aria-label',`${t('remove')} ${item.color} ${item.code}`);
      edit.addEventListener('click',()=>fill(item));remove.addEventListener('click',()=>{if(!confirm(t('deleteQuestion')))return;items=items.filter(i=>i.id!==item.id);if(editing===item.id)resetForm();persist();render();status('form-status','removed');});
      actions.append(edit,remove);bottom.append(count,actions);article.append(top,bottom);list.append(article);
    });
    $('empty').hidden=items.length>0;$('no-results').hidden=!items.length||filtered.length>0;$('export-button').disabled=!items.length;
  }
  function resetForm(){editing=null;$('filament-form').reset();$('quantity').value='1';$('save-button').textContent=t('add');$('cancel-edit').hidden=true;}
  function fill(item){
    editing=item.id||null;for(const key of ['brand','material','color','code'])$(key).value=item[key]||'';
    $('quantity').value=item.quantity||1;$('price').value=item.unitPrice===null||item.unitPrice===undefined?'':String(item.unitPrice);
    $('save-button').textContent=t(editing?'save':'add');$('cancel-edit').hidden=!editing;
    clearStatus('form-status');$('brand').focus({preventScroll:true});$('filament-form').scrollIntoView({behavior:'smooth',block:'center'});
  }
  $('filament-form').addEventListener('submit',e=>{
    e.preventDefault();let value;
    try{value=E.validateRecord({brand:$('brand').value,material:$('material').value,color:$('color').value,code:$('code').value,quantity:$('quantity').value,unitPrice:$('price').value});}
    catch{status('form-status','invalid',true);return;}
    if(!editing&&items.length>=500){status('form-status','limit',true);return;}
    const wasEditing=!!editing,valueWithId={...value,id:editing||crypto.randomUUID()};
    if(editing)items=items.map(i=>i.id===editing?valueWithId:i);else items.unshift(valueWithId);
    persist();resetForm();render();status('form-status',wasEditing?'updated':'added');
  });
  $('cancel-edit').addEventListener('click',()=>{resetForm();clearStatus('form-status');});
  $('manual-button').addEventListener('click',()=>{resetForm();clearStatus('form-status');$('brand').focus();});
  $('search').addEventListener('input',render);
  function showCandidates(announce=true){
    const results=E.candidates($('raw-text').value);$('matches').replaceChildren();
    results.forEach(item=>{
      const button=el('button',undefined,'f-match');button.type='button';const swatch=el('span',undefined,'f-swatch');swatch.style.backgroundColor=item.hex;swatch.setAttribute('aria-hidden','true');const info=el('div');info.append(el('strong',`${item.color} · ${item.code}`),el('small',`${item.brand} · ${item.material}`));button.append(swatch,info,el('span',t('use')));
      button.addEventListener('click',()=>{fill(item);status('scan-status','selected');});$('matches').append(button);
    });
    if(announce)status('scan-status',results.length>1?'multi':results.length?'matched':'unmatched');
  }
  $('match-button').addEventListener('click',()=>showCandidates());
  function setBusy(value){busy=value;['camera-button','upload-button','sample-button','recognize-button','match-button'].forEach(id=>$(id).disabled=value);$('cancel-scan').hidden=!value;$('ocr-progress').hidden=!value;}
  function showImage(kind){photoKind=kind;$('image-preview').hidden=false;$('ocr-actions').hidden=false;$('image-caption').textContent=t(kind==='sample'?'sampleCaption':'imageCaption');$('raw-text').value='';$('matches').replaceChildren();status('scan-status','ready');}
  async function loadImage(file){
    if(!file||busy)return;if(file.size>15*1024*1024){status('scan-status','fileLarge',true);return;}
    const url=URL.createObjectURL(file);const image=new Image();
    try{await new Promise((ok,bad)=>{image.onload=ok;image.onerror=bad;image.src=url;});
      if(image.naturalWidth*image.naturalHeight>40000000){status('scan-status','imageLarge',true);return;}
      const scale=Math.min(1,2400/Math.max(image.naturalWidth,image.naturalHeight)),canvas=$('preview-canvas');canvas.width=Math.round(image.naturalWidth*scale);canvas.height=Math.round(image.naturalHeight*scale);const c=canvas.getContext('2d');c.fillStyle='#fff';c.fillRect(0,0,canvas.width,canvas.height);c.drawImage(image,0,0,canvas.width,canvas.height);showImage('photo');
    }catch{status('scan-status','imageError',true);}finally{URL.revokeObjectURL(url);}
  }
  $('camera-button').addEventListener('click',()=>$('camera-input').click());$('upload-button').addEventListener('click',()=>$('image-input').click());
  for(const id of ['camera-input','image-input'])$(id).addEventListener('change',e=>{loadImage(e.target.files[0]);e.target.value='';});
  function loadOCR(){
    if(window.Tesseract)return Promise.resolve(window.Tesseract);
    if(!tesseractPromise)tesseractPromise=new Promise((resolve,reject)=>{
      const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/tesseract.js@6.0.1/dist/tesseract.min.js';s.crossOrigin='anonymous';s.referrerPolicy='no-referrer';
      const timeout=setTimeout(()=>{s.remove();tesseractPromise=null;reject(new Error('load timeout'));},30000);
      s.onload=()=>{clearTimeout(timeout);resolve(window.Tesseract);};s.onerror=()=>{clearTimeout(timeout);s.remove();tesseractPromise=null;reject(new Error('load failed'));};document.head.append(s);
    });return tesseractPromise;
  }
  async function stopScan(key){++run;if(worker){const old=worker;worker=null;try{await old.terminate();}catch{}}setBusy(false);status('scan-status',key,key==='scanError');}
  async function recognize(){
    if(busy||!photoKind)return;const current=++run;setBusy(true);$('ocr-progress').value=0;status('scan-status','loading');$('matches').replaceChildren();
    const timeout=setTimeout(()=>{if(current===run)stopScan('scanError');},90000);
    let ownWorker;
    try{
      const OCR=await loadOCR();if(current!==run)return;
      ownWorker=await OCR.createWorker('eng',1,{logger:m=>{if(current!==run)return;if(m.status==='recognizing text'){$('ocr-progress').value=m.progress;messages.delete('scan-status');$('scan-status').textContent=`${t('reading')} · ${Math.round(m.progress*100)} %`;}}});
      if(current!==run){await ownWorker.terminate();return;}worker=ownWorker;
      const result=await ownWorker.recognize($('preview-canvas'));
      if(current!==run)return;$('raw-text').value=(result.data.text||'').slice(0,15000);$('raw-details').open=true;
      if(!$('raw-text').value.trim())status('scan-status','noText',true);else showCandidates();
    }catch{if(current===run)status('scan-status','scanError',true);}
    finally{clearTimeout(timeout);if(ownWorker){try{await ownWorker.terminate();}catch{}}if(current===run){worker=null;setBusy(false);}}
  }
  $('recognize-button').addEventListener('click',recognize);$('cancel-scan').addEventListener('click',()=>stopScan('cancelled'));
  $('sample-button').addEventListener('click',()=>{
    if(busy)return;const c=$('preview-canvas');c.width=1200;c.height=620;const ctx=c.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,c.width,c.height);ctx.fillStyle='#142438';ctx.font='bold 65px Arial';ctx.fillText('Bambu Lab',75,120);ctx.font='bold 80px Arial';ctx.fillText('PLA Silk+',75,240);ctx.font='64px Arial';ctx.fillText('Gold',75,350);ctx.font='bold 95px Arial';ctx.fillText('13405',680,350);ctx.font='40px Arial';ctx.fillText('1 kg  |  1.75 mm',75,455);ctx.font='24px Arial';ctx.fillText('FICTIONAL SAMPLE / ETIQUETTE FICTIVE',75,560);showImage('sample');recognize();
  });
  $('export-button').addEventListener('click',()=>{
    if(!items.length){status('storage-status','emptyExport');return;}
    const data={app:'G1X Filaments',version:1,exportedAt:new Date().toISOString(),items:items.map(({id,...item})=>item)};
    const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=`g1x-filaments-${new Date().toISOString().slice(0,10)}.json`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);status('storage-status','exported');
  });
  $('import-button').addEventListener('click',()=>$('import-input').click());$('import-input').addEventListener('change',async e=>{
    const file=e.target.files[0];e.target.value='';if(!file)return;let data;
    try{if(file.size>1024*1024)throw new Error('large');data=E.importRecords(JSON.parse(await file.text()));}catch{status('storage-status','badImport',true);return;}
    if((items.length||blockedStorage)&&!confirm(t('importQuestion')))return;items=data;blockedStorage=false;resetForm();const saved=persist();render();if(saved)status('storage-status','imported');
  });
  for(const product of E.catalog){$('catalog-list').append(el('li',`${product.brand} · ${product.material} · ${product.color} · ${product.code}`));}
  language(lang);
})();
