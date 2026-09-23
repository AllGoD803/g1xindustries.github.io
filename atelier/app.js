(function(){
  'use strict';
  const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
  const fmt=new Intl.NumberFormat('fr-CA',{style:'currency',currency:'CAD'});
  const cash=n=>fmt.format(n);
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const uid=()=>globalThis.crypto?.randomUUID?.()||'p-'+Date.now()+'-'+Math.random().toString(16).slice(2);
  const date=d=>new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,10);
  const key='g1x-atelier-v1';
  const blank=()=>({id:uid(),number:'DEV-'+date(new Date()).replace(/-/g,'')+'-'+Math.random().toString(36).slice(2,6).toUpperCase(),title:'Nouveau projet',client:'',contact:'',scope:'',notes:'',company:'',companyContact:'',taxIds:'',date:date(new Date()),validUntil:date(new Date(Date.now()+30*86400000)),status:'draft',materials:[],labor:[],subcontract:0,overhead:0,contingency:0,margin:30,tax1Name:'Taxe 1',tax2Name:'Taxe 2',tax1:0,tax2:0,actual:'',demo:false});
  function demo(){return {...blank(),title:'Support d’établi sur mesure',client:'Client de démonstration',scope:'Fabrication d’un support d’établi en acier, 1 unité.\nDécoupe, assemblage soudé et préparation avant finition.\nExemple de chiffrage uniquement; aucune étude technique incluse.',notes:'Exemple fictif. Transport et installation exclus.\nDélais et conditions de paiement à convenir avant acceptation.',company:'Atelier de démonstration',materials:[{name:'Profilés acier · lot',qty:1,cost:189},{name:'Fixations · ensemble',qty:1,cost:20},{name:'Consommables de soudage',qty:1,cost:35}],labor:[{name:'Préparation et découpe',hours:1.5,rate:45},{name:'Assemblage et soudure',hours:3,rate:52},{name:'Ébavurage et finition',hours:1.5,rate:42}],subcontract:125,overhead:40,contingency:8,margin:30,demo:true};}
  let quotes=[],currentId,saveFailed=false,loadFailed=false,toastTimer;
  try{const raw=localStorage.getItem(key);if(raw)quotes=Atelier.parseBackup(raw);}catch(e){loadFailed=true;saveFailed=true;}
  if(!quotes.length)quotes=[demo()];currentId=quotes[0].id;
  const q=()=>quotes.find(x=>x.id===currentId);
  function toast(msg,error=false){const el=$('#toast');el.textContent=msg;el.classList.toggle('error',error);el.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.hidden=true,7000);}
  function save(){
    const el=$('#storage-status');
    if(loadFailed){el.textContent='Ancienne sauvegarde illisible : elle est préservée. Exportez votre travail actuel pour le conserver.';el.classList.add('error');return;}
    try{localStorage.setItem(key,JSON.stringify({format:'g1x-atelier',version:1,quotes}));saveFailed=false;el.classList.remove('error');el.textContent='✓ Enregistré sur cet appareil · '+new Date().toLocaleTimeString('fr-CA',{hour:'2-digit',minute:'2-digit'})+' · Exportez une copie pour la conserver.';}
    catch(e){saveFailed=true;el.classList.add('error');el.textContent='Enregistrement local indisponible : exportez vos projets avant de fermer cette page.';}
  }
  function options(){const select=$('#project-select');select.replaceChildren();quotes.forEach(p=>{const o=document.createElement('option');o.value=p.id;o.textContent=p.title||'Projet sans titre';select.append(o);});select.value=currentId;}
  function rowHTML(type,row,i){const material=type==='materials',a=material?'qty':'hours',b=material?'cost':'rate';return '<div class="cost-row" data-type="'+type+'" data-index="'+i+'"><label class="row-name">Désignation<input data-row="name" maxlength="500" value="'+esc(row.name)+'" placeholder="'+(material?'Matériau':'Opération')+'"></label><label>'+(material?'Quantité':'Heures')+'<input type="number" inputmode="decimal" min="0" max="10000" step="0.01" data-row="'+a+'" required value="'+row[a]+'"></label><label>'+(material?'Coût/unité · $':'Coût/h · $')+'<input type="number" inputmode="decimal" min="0" max="10000000" step="0.01" data-row="'+b+'" required value="'+row[b]+'"></label><button class="remove-row" aria-label="Retirer cette ligne" data-remove="'+type+'" data-index="'+i+'">×</button><span class="row-total">'+cash(Atelier.round(row[a]*row[b]))+'</span></div>';}
  function rows(){for(const [type,id]of [['materials','material-rows'],['labor','labor-rows']])$('#'+id).innerHTML=q()[type].length?q()[type].map((r,i)=>rowHTML(type,r,i)).join(''):'<p class="empty-rows">Aucune ligne. Touchez « Ajouter » pour commencer.</p>';}
  const line=(label,n,classes='')=>'<div class="break-line '+classes+'"><span>'+esc(label)+'</span><strong>'+cash(n)+'</strong></div>';
  function metrics(){
    const p=q(),c=Atelier.calculate(p);
    $('#metric-cost').textContent=cash(c.cost);$('#metric-sale').textContent=cash(c.sale);$('#metric-profit').textContent=cash(c.profit);$('#metric-margin').textContent='Marge cible : '+p.margin.toLocaleString('fr-CA')+' % du prix';
    $('#breakdown').innerHTML=line('Matériaux',c.material)+line('Travail',c.work)+line('Sous-traitance',p.subcontract)+line('Frais d’atelier',p.overhead)+line('Réserve d’imprévus',c.contingency)+line('Coût prévu',c.cost,'divider')+line('Marge prévue',c.profit)+line('Prix avant taxes',c.sale,'divider sale')+(p.tax1?line(p.tax1Name||'Taxe 1',c.tax1):'')+(p.tax2?line(p.tax2Name||'Taxe 2',c.tax2):'');
    $('#client-total').textContent=cash(c.total);$('#tax-note').textContent=p.tax1||p.tax2?'Taxes calculées selon les taux saisis.':'Aucune taxe appliquée. Vérifiez votre situation avant d’envoyer.';
    const a=$('#actual-result');a.classList.toggle('negative',c.actualProfit!==null&&c.actualProfit<0);a.textContent=c.actual===null?'Ajoutez le coût réel pour voir le résultat.':'Marge réelle : '+cash(c.actualProfit)+(c.actualMargin===null?'':' · '+c.actualMargin.toLocaleString('fr-CA')+' % du prix')+'. Écart de coût : '+cash(c.actual-c.cost)+' par rapport à la prévision.';
    $$('.cost-row').forEach(row=>{const r=p[row.dataset.type][Number(row.dataset.index)];row.querySelector('.row-total').textContent=cash(Atelier.round(row.dataset.type==='materials'?r.qty*r.cost:r.hours*r.rate));});
  }
  function render(){options();$$('[data-field]').forEach(el=>el.value=q()[el.dataset.field]);$('#example-badge').hidden=!q().demo;rows();metrics();save();$('#preview-quote').disabled=!!$('#page-outil').querySelector('input:invalid');}
  function valid(){const bad=$('#page-outil').querySelector('input:invalid,textarea:invalid,select:invalid');if(bad){go('outil');bad.reportValidity();bad.focus();toast('Corrigez le champ indiqué avant de continuer.',true);return false;}if(q().validUntil<q().date){toast('La date de validité doit suivre la date de soumission.',true);return false;}return true;}
  function add(p){if(!valid())return;if(quotes.length>=100){toast('Limite de 100 projets atteinte. Exportez puis retirez les anciens projets.',true);return;}quotes.unshift(p);currentId=p.id;render();}
  function go(page){if(!['outil','offre','guide'].includes(page))page='outil';$$('.page').forEach(el=>el.hidden=el.id!=='page-'+page);$$('.nav').forEach(el=>{el.classList.toggle('active',el.dataset.page===page);if(el.dataset.page===page)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');});if(location.hash!=='#'+page)history.replaceState(null,'','#'+page);window.scrollTo(0,0);}
  $$('[data-page]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.page)));window.addEventListener('hashchange',()=>go(location.hash.slice(1)));
  document.addEventListener('input',e=>{
    const el=e.target;
    if(el.matches('[data-field]')){
      if(!el.checkValidity()){$('#preview-quote').disabled=true;return;}
      q()[el.dataset.field]=el.dataset.number?(el.value===''&&el.dataset.field==='actual'?'':Number(el.value)):el.value;
      if(el.dataset.field==='title')options();
    }else if(el.matches('[data-row]')){
      if(!el.checkValidity()){$('#preview-quote').disabled=true;return;}
      const row=el.closest('.cost-row');q()[row.dataset.type][Number(row.dataset.index)][el.dataset.row]=el.dataset.row==='name'?el.value:Number(el.value);
    }else return;
    $('#preview-quote').disabled=!!$('#page-outil').querySelector('input:invalid');metrics();save();
  });
  document.addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(!b)return;q()[b.dataset.remove].splice(Number(b.dataset.index),1);rows();metrics();save();$('#preview-quote').disabled=!!$('#page-outil').querySelector('input:invalid');});
  $('#add-material').addEventListener('click',()=>{if(!valid())return;if(q().materials.length>=100)return toast('Maximum de 100 lignes.',true);q().materials.push({name:'',qty:1,cost:0});rows();metrics();save();$('#material-rows .cost-row:last-child input').focus();});
  $('#add-labor').addEventListener('click',()=>{if(!valid())return;if(q().labor.length>=100)return toast('Maximum de 100 lignes.',true);q().labor.push({name:'',hours:1,rate:0});rows();metrics();save();$('#labor-rows .cost-row:last-child input').focus();});
  $('#new-project').addEventListener('click',()=>{const p=blank();for(const k of ['company','companyContact','taxIds','tax1Name','tax2Name','tax1','tax2'])if(!q().demo)p[k]=q()[k];add(p);});
  $('#duplicate-project').addEventListener('click',()=>{const p=JSON.parse(JSON.stringify(q()));p.id=uid();p.number=blank().number;p.title+=' · copie';p.status='draft';p.actual='';add(p);toast('Projet dupliqué. Le coût réel a été remis à vide.');});
  $('#project-select').addEventListener('change',e=>{if(!valid()){e.target.value=currentId;return;}currentId=e.target.value;render();});
  $('#delete-project').addEventListener('click',()=>{if(!confirm('Supprimer « '+q().title+' » de cet appareil? Exportez-le d’abord si vous souhaitez le garder.'))return;quotes=quotes.filter(p=>p.id!==currentId);if(!quotes.length)quotes=[blank()];currentId=quotes[0].id;render();toast('Projet supprimé de cet appareil.');});
  function download(data,name,type){const url=URL.createObjectURL(new Blob([data],{type}));const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);}
  function exportQuotes(items){if(!valid())return;download(JSON.stringify({format:'g1x-atelier',version:1,exportedAt:new Date().toISOString(),quotes:items},null,2),'g1x-atelier-'+date(new Date())+'.json','application/json');toast('Export préparé. Conservez le fichier dans Fichiers ou vos sauvegardes.');}
  $('#export-project').addEventListener('click',()=>exportQuotes([q()]));$$('.export-all').forEach(b=>b.addEventListener('click',()=>exportQuotes(quotes)));
  $('#import-button').addEventListener('click',()=>$('#import-file').click());
  $('#import-file').addEventListener('change',async e=>{const f=e.target.files[0];if(!f)return;try{if(!valid())return;if(f.size>2000000)throw Error('Le fichier dépasse 2 Mo.');const incoming=Atelier.parseBackup(await f.text());if(incoming.length+quotes.length>100)throw Error('L’import dépasserait la limite de 100 projets.');incoming.forEach(p=>{p.id=uid();});quotes.unshift(...incoming);if(incoming.length)currentId=incoming[0].id;render();toast(incoming.length+' projet(s) importé(s).');}catch(err){toast('Import refusé : '+err.message,true);}finally{e.target.value='';}});
  $('#demo-button').addEventListener('click',()=>{add(demo());go('outil');});
  async function copyText(text){try{await navigator.clipboard.writeText(text);toast('Message copié.');}catch(e){toast('Copie automatique indisponible. Sélectionnez le texte pour le copier.',true);}}
  $('#copy-outreach')?.addEventListener('click',()=>copyText($('#outreach-text').textContent));
  function readableDate(v){if(!/^\d{4}-\d{2}-\d{2}$/.test(v))return v;return new Date(v+'T12:00:00').toLocaleDateString('fr-CA',{day:'numeric',month:'long',year:'numeric'});}
  function quoteHTML(p){const c=Atelier.calculate(p);return (p.demo?'<div class="quote-watermark">EXEMPLE FICTIF · Ne pas envoyer comme une offre réelle.</div>':'')+'<div class="quote-heading"><div class="quote-company"><h2>'+esc(p.company||'Votre atelier')+'</h2><p>'+esc(p.companyContact)+'</p></div><div class="quote-ref"><h3>SOUMISSION</h3><p>'+esc(p.number)+'<br>'+esc(readableDate(p.date))+'<br>Valide jusqu’au '+esc(readableDate(p.validUntil))+'</p></div></div><section class="quote-section"><h3>Préparée pour</h3><p>'+esc(p.client||'Client à préciser')+'<br>'+esc(p.contact)+'</p></section><h2 class="quote-title">'+esc(p.title)+'</h2><section class="quote-section"><h3>Travaux inclus</h3><p class="quote-scope">'+esc(p.scope||'Travaux à préciser avant envoi.')+'</p></section><div class="quote-totals">'+line('Prix avant taxes',c.sale)+(p.tax1?line(p.tax1Name+' ('+p.tax1+' %)',c.tax1):'')+(p.tax2?line(p.tax2Name+' ('+p.tax2+' %)',c.tax2):'')+line('Total · CAD',c.total,'divider sale')+'</div>'+(p.notes?'<section class="quote-section"><h3>Conditions et exclusions</h3><p class="quote-terms">'+esc(p.notes)+'</p></section>':'')+'<p class="quote-meta">Montants en dollars canadiens. '+(p.tax1||p.tax2?'Taxes selon les taux indiqués.':'Aucune taxe appliquée.')+(p.taxIds?'<br>'+esc(p.taxIds):'')+'<br>Document de soumission. Ne constitue pas une facture.</p>';}
  $('#preview-quote').addEventListener('click',()=>{if(!valid())return;$('#quote-preview').innerHTML=quoteHTML(q());$('#quote-dialog').showModal();});
  $('#close-quote').addEventListener('click',()=>$('#quote-dialog').close());$('#print-quote').addEventListener('click',()=>window.print());
  window.addEventListener('beforeunload',e=>{if(saveFailed){e.preventDefault();e.returnValue='';}});
  render();go(location.hash.slice(1)||'outil');
})();
