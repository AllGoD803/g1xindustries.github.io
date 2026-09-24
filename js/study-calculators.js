(function(root){
  'use strict';
  const calculations={
    node:(wh,usable,derate,watts)=>({usableWh:wh*usable/100*derate/100,days:wh*usable/100*derate/100/(watts*24)}),
    hydro:(litres,head,efficiency,availability)=>{const kw=9.81*(litres/1000)*head*efficiency/100;return{kw,kwh:kw*8760*availability/100};},
    sales:(price,variable,fixed)=>({margin:price-variable,count:price>variable?Math.ceil(fixed/(price-variable)):null})
  };
  if(typeof module!=='undefined'&&module.exports){module.exports=calculations;return;}
  const definitions=[['calc-node',['battery-wh','usable','derate','node-w'],'node'],['calc-hydro',['flow','head','hydro-eff','availability'],'hydro'],['calc-sales',['price','variable','fixed'],'sales']];
  const num=(n,max=1)=>new Intl.NumberFormat(document.documentElement.lang==='en'?'en-CA':'fr-CA',{maximumFractionDigits:max}).format(n);
  function update(form,ids,kind){
    const inputs=ids.map(id=>document.getElementById(id));const output=form.querySelector('output');const en=document.documentElement.lang==='en';
    if(inputs.some(el=>el.value.trim()===''||!Number.isFinite(el.valueAsNumber)||!el.validity.valid)){output.textContent=en?'Enter valid values within the indicated ranges.':'Entrez des valeurs valides dans les plages indiquées.';return;}
    const result=calculations[kind](...inputs.map(el=>el.valueAsNumber));
    if(kind==='node')output.textContent=num(result.days)+(en?' days':' jours')+'\n'+num(result.usableWh)+(en?' usable Wh':' Wh utilisables');
    else if(kind==='hydro')output.textContent=num(result.kw,3)+' kW\n'+num(result.kwh,0)+(en?' kWh/year':' kWh/an');
    else output.textContent=result.count===null?(en?'No cost-recovery threshold: contribution is zero or negative.':'Aucun seuil de récupération : contribution nulle ou négative.'):(num(result.count,0)+(en?' sales':' ventes')+'\n'+num(result.margin,2)+(en?' CAD contribution / sale':' CAD de contribution / vente'));
  }
  for(const [id,ids,kind] of definitions){const form=document.getElementById(id);if(!form)continue;form.addEventListener('submit',e=>e.preventDefault());form.addEventListener('input',()=>update(form,ids,kind));document.addEventListener('g1x:language',()=>update(form,ids,kind));update(form,ids,kind);}
})(typeof window!=='undefined'?window:this);
