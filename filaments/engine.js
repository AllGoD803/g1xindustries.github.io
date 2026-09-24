(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.G1XFilaments=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const catalog=Object.freeze([
    {brand:'Bambu Lab',material:'PLA Silk+',color:'Gold',code:'13405',hex:'#C99B42'},
    {brand:'Bambu Lab',material:'PLA Silk+',color:'Silver',code:'13109',hex:'#AAB3BF'},
    {brand:'Bambu Lab',material:'PLA Basic',color:'Gold',code:'10401',hex:'#C6A353'},
    {brand:'Bambu Lab',material:'PLA Translucent',color:'Blue',code:'13611',hex:'#145CCB'},
    {brand:'Bambu Lab',material:'PLA Translucent',color:'Mellow Yellow',code:'13410',hex:'#EFDBAA'}
  ].map(Object.freeze));
  const clean=(v,max=100)=>typeof v==='string'?v.trim().slice(0,max):'';
  function candidates(text){
    // Exact standalone references only: never match five digits inside a barcode.
    const tokens=new Set(String(text).match(/\b\d{5}\b/g)||[]);
    return catalog.filter(p=>tokens.has(p.code));
  }
  function number(value,optional=false){
    if(optional&&(value===null||value===undefined||String(value).trim()===''))return null;
    const s=String(value).trim().replace(',','.');
    if(!/^\d+(?:\.\d{1,2})?$/.test(s))throw new Error('number');
    return Number(s);
  }
  function validateRecord(raw){
    if(!raw||typeof raw!=='object')throw new Error('record');
    const brand=clean(raw.brand),material=clean(raw.material),color=clean(raw.color),code=clean(raw.code,60);
    if(!brand||!material||!color)throw new Error('required');
    const quantity=number(raw.quantity),unitPrice=number(raw.unitPrice,true);
    if(!Number.isInteger(quantity)||quantity<1||quantity>1000)throw new Error('quantity');
    if(unitPrice!==null&&(!Number.isFinite(unitPrice)||unitPrice>100000))throw new Error('price');
    const match=catalog.find(p=>p.code===code&&p.brand===brand&&p.material===material&&p.color===color);
    return {brand,material,color,code,quantity,unitPrice,currency:'CAD',hex:match?match.hex:'#8292A5'};
  }
  function importRecords(data){
    if(!data||data.app!=='G1X Filaments'||data.version!==1||!Array.isArray(data.items)||data.items.length>500)throw new Error('import');
    return data.items.map((item,i)=>({...validateRecord(item),id:'import-'+Date.now()+'-'+i}));
  }
  function totals(items){
    return items.reduce((a,item)=>{a.quantity+=item.quantity;if(item.unitPrice===null)a.unpriced+=item.quantity;else a.cents+=Math.round(item.unitPrice*100)*item.quantity;return a;},{quantity:0,cents:0,unpriced:0});
  }
  return {catalog,candidates,validateRecord,importRecords,totals};
});
