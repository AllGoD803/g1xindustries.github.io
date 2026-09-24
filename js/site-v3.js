(() => {
  'use strict';
  const html=document.documentElement;
  const translations=[...document.querySelectorAll('[data-fr][data-en]')];
  const menu=document.querySelector('.menu-toggle'),nav=document.getElementById('main-nav');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let paused=reduced.matches;
  function setLanguage(lang){
    if(!['fr','en'].includes(lang))lang='fr';
    html.lang=lang;
    // These attributes contain only trusted, authored website copy.
    translations.forEach(el=>{el.innerHTML=el.dataset[lang];});
    document.querySelectorAll('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===lang)));
    try{localStorage.setItem('g1x-language',lang);}catch{}
    updateMotion();document.dispatchEvent(new Event('g1x:language'));
  }
  function updateMotion(){
    html.classList.toggle('preview-motion-off',paused||document.hidden||reduced.matches);
    const control=document.getElementById('motion-pause');
    if(control){control.textContent=html.lang==='en'?(paused?'Enable animations':'Pause animations'):(paused?'Activer les animations':'Pause des animations');control.setAttribute('aria-pressed',String(paused));}
  }
  document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>setLanguage(b.dataset.lang)));
  menu?.addEventListener('click',()=>{const opened=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(opened));nav.classList.toggle('is-open',opened);});
  nav?.addEventListener('click',e=>{if(e.target.closest('a')){menu.setAttribute('aria-expanded','false');nav.classList.remove('is-open');}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('is-open')){nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');menu.focus();}});
  document.getElementById('motion-pause')?.addEventListener('click',()=>{paused=!paused;updateMotion();});
  reduced.addEventListener('change',()=>{if(reduced.matches)paused=true;updateMotion();});
  document.addEventListener('visibilitychange',updateMotion);
  document.getElementById('print-report')?.addEventListener('click',()=>window.print());
  let lang='fr';try{lang=localStorage.getItem('g1x-language')||'fr';}catch{}
  setLanguage(lang);
  // Keep links from the existing standalone demos useful after the restructure.
  if(location.pathname==='/'){
    const aliases={technologies:'/technologies/',energie:'/technologies/',intelligence:'/technologies/gen1-nexus/',balises:'/technologies/balises/',geoscan:'/technologies/geoscan/',techops:'/technologies/techops/',reception:'/vision/',projets:'/#logiciels'};
    const destination=aliases[location.hash.slice(1)];if(destination)location.replace(destination);
  }
})();
