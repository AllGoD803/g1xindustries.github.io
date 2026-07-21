const translations={
  fr:{viewPoster:"Voir l’affiche complète →",visionTag:"Une vision pour le territoire",visionTitle:"Les ressources, les données et les décisions restent ici.",visionText:"Un écosystème local où l’énergie, les capteurs et l’intelligence travaillent ensemble au service des communautés.",skip:"Aller au contenu",menu:"Menu",navTech:"Technologies",navEnergy:"Énergie",navAI:"Intelligence",navProjects:"Projets",navAbout:"À propos",navContact:"Contact",heroEyebrow:"Conçu et développé au Québec",heroTitle:"L’intelligence locale rencontre l’énergie de demain.",heroLead:"Énergie intelligente. Technologie locale. Innovation québécoise.",discover:"Découvrir G1X",seeTech:"Voir nos technologies",point1:"Données locales",point2:"Énergie résiliente",point3:"IA en périphérie",energyTag:"Solutions intégrées",energyTitle:"Énergie intelligente",energyIntro:"Produire, stocker et optimiser une énergie propre, fiable et adaptée au territoire.",hydro:"Microcentrales et systèmes hydroélectriques modulaires à faible impact.",aero:"Turbines et systèmes éoliens adaptés aux conditions nordiques.",solar:"Solutions solaires haute efficacité pour réseaux autonomes.",learn:"En savoir plus →",aiTag:"Intelligence souveraine",aiTitle:"La puissance de l’IA, là où les données sont générées.",aiText:"Traitement local, confidentialité renforcée et fonctionnement autonome, sans dépendance permanente au nuage.",ai1:"IA en périphérie",ai2:"Données locales, contrôle total",ai3:"Architecture évolutive",beaconTag:"Le territoire en temps réel",beaconTitle:"Balises G1X",beaconText:"Des stations météo intelligentes et autonomes conçues pour fournir des données précises, même loin des réseaux traditionnels.",live:"Données en temps réel",geoTag:"Comprendre le sous-sol",geoText:"Acquisition multi-capteurs, cartographie avancée et intelligence artificielle pour transformer les données du terrain en décisions exploitables.",techopsTag:"Infrastructure locale",techopsText:"Des systèmes compacts, robustes et adaptés à l’intelligence locale, aux capteurs et aux environnements exigeants.",projectsTag:"Recherche et développement",projectsTitle:"Projets en développement",project1:"Microproduction hydroélectrique modulaire",project2:"Énergie éolienne adaptée au climat nordique",project3:"Réseau météo autonome et distribué",project4:"Cartographie géophysique intelligente",aboutTitle:"Bâtir ici. Penser plus loin.",aboutText:"G1X Industries développe au Québec des technologies qui rapprochent l’énergie, les données et l’intelligence. Notre objectif : créer des systèmes utiles, autonomes et conçus pour le réel.",contactTag:"Parlons de votre projet",contactTitle:"Construisons la prochaine innovation."},
  en:{viewPoster:"View full poster →",visionTag:"A vision for the territory",visionTitle:"Resources, data and decisions stay here.",visionText:"A local ecosystem where energy, sensors and intelligence work together for communities.",skip:"Skip to content",menu:"Menu",navTech:"Technologies",navEnergy:"Energy",navAI:"Intelligence",navProjects:"Projects",navAbout:"About",navContact:"Contact",heroEyebrow:"Designed and developed in Quebec",heroTitle:"Local intelligence meets tomorrow’s energy.",heroLead:"Smart energy. Local technology. Quebec innovation.",discover:"Discover G1X",seeTech:"Explore our technologies",point1:"Local data",point2:"Resilient energy",point3:"Edge AI",energyTag:"Integrated solutions",energyTitle:"Smart energy",energyIntro:"Generate, store and optimize clean, reliable energy adapted to the territory.",hydro:"Low-impact modular micro-generation and hydroelectric systems.",aero:"Wind turbines and systems designed for northern conditions.",solar:"High-efficiency solar solutions for autonomous networks.",learn:"Learn more →",aiTag:"Sovereign intelligence",aiTitle:"The power of AI, where data is generated.",aiText:"Local processing, stronger privacy and autonomous operation without permanent cloud dependency.",ai1:"Edge AI",ai2:"Local data, full control",ai3:"Scalable architecture",beaconTag:"The territory in real time",beaconTitle:"G1X Beacons",beaconText:"Smart autonomous weather stations designed to deliver accurate data, even far from traditional networks.",live:"Real-time data",geoTag:"Understand the subsurface",geoText:"Multi-sensor acquisition, advanced mapping and artificial intelligence turn field data into actionable decisions.",techopsTag:"Local infrastructure",techopsText:"Compact, rugged systems built for local intelligence, sensors and demanding environments.",projectsTag:"Research and development",projectsTitle:"Projects in development",project1:"Modular hydroelectric micro-generation",project2:"Wind energy adapted to northern climates",project3:"Autonomous distributed weather network",project4:"Intelligent geophysical mapping",aboutTitle:"Build here. Think further.",aboutText:"G1X Industries develops Quebec technologies that bring energy, data and intelligence together. Our goal is to create useful, autonomous systems designed for the real world.",contactTag:"Let’s discuss your project",contactTitle:"Let’s build the next innovation."}
};
Object.assign(translations.fr,{demoData:"DONNÉES DE DÉMONSTRATION",wind:"Vent",temperature:"Température",pressure:"Pression",last24:"Évolution — 24 dernières heures",demoNote:"Valeurs simulées pour illustrer l’interface. Connexion aux capteurs requise pour afficher des données réelles.",systemOnline:"SYSTÈME EN LIGNE",fieldInputs:"ENTRÉES TERRAIN",localCompute:"CALCUL LOCAL",services:"SERVICES",analytics:"Analytique",alerts:"Alertes",sync:"Synchronisation",localStorage:"Stockage local",encryption:"Chiffrement",power:"Alimentation",protection:"Protection visée",conceptNote:"Architecture conceptuelle — spécifications finales à valider pendant le développement."});
Object.assign(translations.en,{demoData:"DEMONSTRATION DATA",wind:"Wind",temperature:"Temperature",pressure:"Pressure",last24:"Trend — Last 24 hours",demoNote:"Simulated values illustrating the interface. A sensor connection is required to display real data.",systemOnline:"SYSTEM ONLINE",fieldInputs:"FIELD INPUTS",localCompute:"LOCAL COMPUTE",services:"SERVICES",analytics:"Analytics",alerts:"Alerts",sync:"Synchronization",localStorage:"Local storage",encryption:"Encryption",power:"Power input",protection:"Target protection",conceptNote:"Conceptual architecture — final specifications to be validated during development."});
const menuButton=document.querySelector('.menu-toggle');
const menu=document.querySelector('.main-nav');
menuButton.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});
menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));
function setLanguage(lang){const dictionary=translations[lang]||translations.fr;document.documentElement.lang=lang;document.querySelectorAll('[data-i18n]').forEach(node=>{const value=dictionary[node.dataset.i18n];if(value)node.textContent=value;});document.querySelectorAll('.localized-poster').forEach(image=>{image.src=lang==='en'?image.dataset.enSrc:image.dataset.frSrc;});document.querySelectorAll('.localized-poster-link').forEach(link=>{link.href=lang==='en'?link.dataset.enSrc:link.dataset.frSrc;});document.querySelectorAll('[data-lang]').forEach(button=>button.classList.toggle('active',button.dataset.lang===lang));localStorage.setItem('g1x-language',lang);}
document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.lang)));
setLanguage(localStorage.getItem('g1x-language')||'fr');

// Lightweight interactive atmosphere. Pointer updates are batched per frame.
const hero=document.querySelector('.hero');
let pointerFrame=0;
function updateAtmosphere(event){
  if(!hero||pointerFrame)return;
  pointerFrame=requestAnimationFrame(()=>{
    const rect=hero.getBoundingClientRect();
    const point=event.touches?.[0]||event;
    const x=Math.max(0,Math.min(100,((point.clientX-rect.left)/rect.width)*100));
    const y=Math.max(0,Math.min(100,((point.clientY-rect.top)/rect.height)*100));
    hero.style.setProperty('--pointer-x',`${x}%`);
    hero.style.setProperty('--pointer-y',`${y}%`);
    pointerFrame=0;
  });
}
hero?.addEventListener('pointermove',updateAtmosphere,{passive:true});
hero?.addEventListener('touchmove',updateAtmosphere,{passive:true});

const headerBrand=document.querySelector('.site-header .brand');
let brandTimer;
function activateBrand(){
  clearTimeout(brandTimer);
  headerBrand?.classList.remove('brand-activated');
  requestAnimationFrame(()=>headerBrand?.classList.add('brand-activated'));
  brandTimer=setTimeout(()=>headerBrand?.classList.remove('brand-activated'),1100);
}
headerBrand?.addEventListener('pointerdown',activateBrand,{passive:true});
headerBrand?.addEventListener('focus',activateBrand);

document.querySelectorAll('.section-heading,.feature-card,.split>*,.project-card,.contact .narrow').forEach(node=>node.classList.add('reveal-ready'));
if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}
  }),{threshold:.12,rootMargin:'0px 0px -45px'});
  document.querySelectorAll('.reveal-ready').forEach(node=>revealObserver.observe(node));
}else{
  document.querySelectorAll('.reveal-ready').forEach(node=>node.classList.add('is-visible'));
}
