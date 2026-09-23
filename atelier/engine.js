(function(root){
  'use strict';
  const round = n => Math.round((n + Number.EPSILON) * 100) / 100;
  const num = (v, max=10000000) => { const n=Number(v); if(!Number.isFinite(n)||n<0||n>max) throw Error('Valeur numérique invalide.'); return n; };
  function calculate(q){
    const materials=q.materials.map(r=>round(num(r.qty,10000)*num(r.cost)));
    const labor=q.labor.map(r=>round(num(r.hours,10000)*num(r.rate)));
    const material=round(materials.reduce((a,b)=>a+b,0));
    const work=round(labor.reduce((a,b)=>a+b,0));
    const base=round(material+work+num(q.subcontract)+num(q.overhead));
    const contingency=round(base*num(q.contingency,100)/100);
    const cost=round(base+contingency);
    const margin=num(q.margin,90);
    const sale=round(cost/(1-margin/100));
    const profit=round(sale-cost);
    const tax1=round(sale*num(q.tax1,30)/100);
    const tax2=round(sale*num(q.tax2,30)/100);
    const total=round(sale+tax1+tax2);
    const actual=q.actual===''||q.actual===null?null:num(q.actual);
    return {materials,labor,material,work,base,contingency,cost,sale,profit,tax1,tax2,total,actual,actualProfit:actual===null?null:round(sale-actual),actualMargin:actual===null||sale===0?null:round((sale-actual)/sale*100)};
  }
  const string=(v,max=5000)=>typeof v==='string'&&v.length<=max;
  function validateQuote(q){
    if(!q||typeof q!=='object') throw Error('Projet invalide.');
    for(const k of ['id','number','title','client','contact','scope','notes','company','companyContact','tax1Name','tax2Name','taxIds','date','validUntil']) if(!string(q[k]))throw Error('Champ de projet invalide : '+k);
    if(!['draft','sent','accepted','done'].includes(q.status))throw Error('Statut invalide.');
    for(const field of ['materials','labor']){
      if(!Array.isArray(q[field])||q[field].length>100)throw Error('Liste de coûts invalide.');
      q[field].forEach(r=>{if(!r||!string(r.name,500))throw Error('Désignation invalide.');});
    }
    calculate(q);
    return q;
  }
  function parseBackup(text){
    if(text.length>2000000)throw Error('Le fichier dépasse 2 Mo.');
    const d=JSON.parse(text);
    if(d.format!=='g1x-atelier'||d.version!==1||!Array.isArray(d.quotes)||d.quotes.length>100)throw Error('Ce fichier n’est pas une sauvegarde G1X Atelier version 1.');
    d.quotes.forEach(validateQuote);
    return d.quotes;
  }
  const api={round,calculate,validateQuote,parseBackup};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  else root.Atelier=api;
})(typeof window!=='undefined'?window:globalThis);
