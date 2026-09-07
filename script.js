const menuToggle=document.getElementById('menuToggle');
const navLinks=document.getElementById('navLinks');
menuToggle.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuToggle.setAttribute('aria-expanded',open)});
document.querySelectorAll('.nav-links a').forEach(link=>link.addEventListener('click',()=>{navLinks.classList.remove('open');menuToggle.setAttribute('aria-expanded','false')}));

const sections=[...document.querySelectorAll('main section[id]')];
const navAnchors=[...document.querySelectorAll('.nav-links a[href^="#"]')];
const updateActive=()=>{let current='accueil';const y=window.scrollY+130;sections.forEach(section=>{if(y>=section.offsetTop)current=section.id});navAnchors.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${current}`))};

const progress=document.getElementById('scrollProgress');
const backTop=document.getElementById('backTop');
const onScroll=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=`${max?window.scrollY/max*100:0}%`;backTop.classList.toggle('show',window.scrollY>500);updateActive()};
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
backTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

const filters=document.querySelectorAll('.filter');const projects=document.querySelectorAll('.project');
filters.forEach(filter=>filter.addEventListener('click',()=>{filters.forEach(b=>b.classList.remove('active'));filter.classList.add('active');const category=filter.dataset.filter;projects.forEach(project=>project.classList.toggle('hidden',category!=='all'&&project.dataset.category!==category))}));

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const counters=document.querySelectorAll('[data-counter]');
const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target;const target=Number(el.dataset.counter);const suffix=el.dataset.suffix||'';let start=0;const step=Math.max(1,Math.ceil(target/35));const tick=()=>{start=Math.min(target,start+step);el.textContent=start+suffix;if(start<target)requestAnimationFrame(tick)};tick();counterObserver.unobserve(el)}),{threshold:.7});
counters.forEach(c=>counterObserver.observe(c));

const themeToggle=document.getElementById('themeToggle');
const savedTheme=localStorage.getItem('portfolio-theme');
if(savedTheme==='light')document.body.classList.add('light');
const updateThemeIcon=()=>themeToggle.textContent=document.body.classList.contains('light')?'☀':'☾';
updateThemeIcon();
themeToggle.addEventListener('click',()=>{document.body.classList.toggle('light');localStorage.setItem('portfolio-theme',document.body.classList.contains('light')?'light':'dark');updateThemeIcon()});

const form=document.getElementById('contactForm');const message=document.getElementById('formMessage');
form.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form);const subject=encodeURIComponent(`Contact portfolio — ${data.get('name')}`);const body=encodeURIComponent(`Nom : ${data.get('name')}\nEmail : ${data.get('email')}\n\nMessage :\n${data.get('message')}`);window.location.href=`mailto:khemiriahmed6@gmail.com?subject=${subject}&body=${body}`;message.textContent='Votre client e-mail va s’ouvrir avec le message prérempli.'});

document.getElementById('year').textContent=new Date().getFullYear();
