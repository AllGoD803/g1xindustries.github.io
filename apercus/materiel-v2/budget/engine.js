(function(root){
  'use strict';
  const DAY=86400000, frequencies=['weekly','biweekly','semimonthly','monthly','quarterly','yearly'];
  function money(value,negative=false){const s=String(value).trim().replace(/[\s\u00a0\u202f]/g,'').replace(',','.');if(!(negative?/^-?\d+(?:\.\d{1,2})?$/:/^\d+(?:\.\d{1,2})?$/).test(s))throw Error('amount');const n=Math.round(Number(s)*100);if(!Number.isSafeInteger(n)||Math.abs(n)>1000000000)throw Error('amount');return n;}
  function date(value){if(!/^\d{4}-\d{2}-\d{2}$/.test(value))throw Error('date');const d=new Date(value+'T12:00:00Z');if(Number.isNaN(+d)||d.toISOString().slice(0,10)!==value)throw Error('date');return d;}
  function iso(d){return d.toISOString().slice(0,10);}
  function at(y,m,day){return new Date(Date.UTC(y,m,Math.min(day,new Date(Date.UTC(y,m+1,0)).getUTCDate()),12));}
  function dates(row,month){if(!/^\d{4}-\d{2}$/.test(month))throw Error('month');const first=date(month+'-01');const y=first.getUTCFullYear(),m=first.getUTCMonth(),last=at(y,m,31),anchor=date(row.anchor);if(!frequencies.includes(row.frequency))throw Error('frequency');const out=[];
    if(row.frequency==='weekly'||row.frequency==='biweekly'){const step=(row.frequency==='weekly'?7:14)*DAY;for(let n=+anchor+Math.ceil((+first-+anchor)/step)*step;n<=+last;n+=step)out.push(iso(new Date(n)));}
    else if(row.frequency==='semimonthly'){const a=anchor.getUTCDate(),b=Number(row.secondDay);if(!Number.isInteger(b)||a<1||a>28||b<1||b>28||a===b)throw Error('secondDay');out.push(iso(at(y,m,a)),iso(at(y,m,b)));}
    else if(row.frequency==='monthly')out.push(iso(at(y,m,anchor.getUTCDate())));
    else if(row.frequency==='quarterly'){if(((m-anchor.getUTCMonth())%3+3)%3===0)out.push(iso(at(y,m,anchor.getUTCDate())));}
    else if(m===anchor.getUTCMonth())out.push(iso(at(y,m,anchor.getUTCDate())));
    return out.sort();
  }
  function compute(data,month){let balance=money(data.balance,true),income=0,outgoing=0,minimum=balance;const events=[];for(const row of [data.income,...data.expenses]){const sign=row===data.income?1:-1;const cents=money(row.amount);for(const d of dates(row,month))events.push({date:d,label:row.label,provider:row.provider||'',category:row.category||'income',cents:sign*cents});}
    events.sort((a,b)=>a.date.localeCompare(b.date)||a.cents-b.cents);
    const days=[];for(const e of events){if(e.cents>=0)income+=e.cents;else outgoing-=e.cents;balance+=e.cents;let day=days.at(-1);if(!day||day.date!==e.date){day={date:e.date,events:[],balance};days.push(day);}day.events.push(e);day.balance=balance;}
    for(const d of days)minimum=Math.min(minimum,d.balance);
    return{income,outgoing,available:income-outgoing,ending:balance,minimum,events,days};
  }
  const api={money,date,dates,compute,frequencies};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.G1XBudget=api;
})(typeof window!=='undefined'?window:this);
