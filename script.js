const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const savedTheme=(()=>{try{return localStorage.getItem('wafaa-theme')}catch{return null}})();if(savedTheme==='light')document.body.classList.add('light');
function syncTheme(){$('#themeBtn').textContent=document.body.classList.contains('light')?'☾':'☀';$('#themeBtn').title=document.body.classList.contains('light')?'تفعيل الوضع الليلي':'تفعيل الوضع النهاري'}syncTheme();
$('#themeBtn').addEventListener('click',()=>{document.body.classList.toggle('light');try{localStorage.setItem('wafaa-theme',document.body.classList.contains('light')?'light':'dark')}catch{}syncTheme()});
$('#menuBtn').addEventListener('click',()=>{$('#nav').classList.toggle('open')});$$('#nav a').forEach(el=>el.addEventListener('click',()=>$('#nav').classList.remove('open')));
let ticking=false;window.addEventListener('pointermove',e=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{document.documentElement.style.setProperty('--mx',e.clientX+'px');document.documentElement.style.setProperty('--my',e.clientY+'px');ticking=false})},{passive:true});
function updateProgress(){$('#progress').style.width=(100*scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight))+'%'}window.addEventListener('scroll',updateProgress,{passive:true});updateProgress();
const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}})},{threshold:.08});function watch(){ $$('.reveal').forEach(el=>observer.observe(el))}watch();
const courses=[
{icon:'♛',name:'القيادة الإدارية',cat:'lead',text:'تنمية مهارات القيادة، بناء الفرق وإدارة العمل المؤسسي.'},
{icon:'◈',name:'التخطيط الاستراتيجي',cat:'lead',text:'مهارات التخطيط وتحديد الأولويات وبناء مسارات العمل.'},
{icon:'✦',name:'الإلقاء والتأثير',cat:'training',text:'مهارات الإلقاء والتواصل الفعال والتأثير على الجمهور.'},
{icon:'▤',name:'تدريب المدربين',cat:'training',text:'التأهيل التدريبي وتصميم وتقديم اللقاءات والورش.'},
{icon:'✺',name:'الإبداع والكورت',cat:'training',text:'التفكير الإبداعي وبرامج الكورت والذكاءات المتعددة.'},
{icon:'⌘',name:'التطبيقات المكتبية',cat:'tech',text:'Word وExcel وPowerPoint وAccess والإنترنت.'},
{icon:'◉',name:'التصميم الرقمي',cat:'tech',text:'تصميم الإنفوجرافيك واستخدام Photoshop والعروض.'},
{icon:'♡',name:'صناعة المبادرات',cat:'community',text:'ابتكار المبادرات المجتمعية وتطوير مسارات تنفيذها.'},
{icon:'❖',name:'العمل التطوعي',cat:'community',text:'تنظيم الفرق التطوعية والأنشطة والمشاركة المجتمعية.'}];
function renderCourses(filter='all'){$('#coursesGrid').innerHTML=courses.filter(c=>filter==='all'||c.cat===filter).map(c=>`<article class="course-card reveal visible"><div class="course-icon" aria-hidden="true">${c.icon}</div><h3>${c.name}</h3><p>${c.text}</p></article>`).join('')}renderCourses();$$('.filter').forEach(b=>b.addEventListener('click',()=>{$$('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderCourses(b.dataset.filter)}));
// المواضع تقريبية داخل رسم رمزي، ومستمدة من أسماء المواقع المذكورة في الملف المصدر.
const cities=[
{name:'تبوك',x:258,y:209},{name:'تيماء',x:319,y:240},{name:'ينبع',x:266,y:309},{name:'الرياض',x:518,y:356},{name:'الدمام',x:626,y:306},{name:'المجمعة',x:492,y:296},{name:'مكة',x:303,y:394},{name:'جدة',x:278,y:406},{name:'الهدا',x:324,y:400},{name:'رابغ',x:281,y:364},{name:'خليص',x:289,y:385},{name:'قديد',x:284,y:371},{name:'الليث',x:332,y:439},{name:'سبت العلايا',x:379,y:467},{name:'خميس مشيط',x:400,y:481},{name:'عسير',x:381,y:491},{name:'الكامل',x:322,y:371},{name:'مهد الذهب',x:357,y:324}];
const ns='http://www.w3.org/2000/svg';function svg(tag,attrs){const el=document.createElementNS(ns,tag);for(let [k,v]of Object.entries(attrs))el.setAttribute(k,v);return el}const pins=$('#mapPins');function selectCity(index){$$('.map-pin').forEach((el,i)=>el.classList.toggle('selected',i===index));$$('.city-chip').forEach((el,i)=>el.classList.toggle('active',i===index));$('#cityTitle').textContent=cities[index].name;$('#cityDesc').textContent=`${cities[index].name} من المواقع المشار إليها في خريطة التدريب بالسيرة الذاتية. لا تتضمن السيرة تاريخًا تفصيليًا أو عدد الدورات لكل مدينة.`}
cities.forEach((c,i)=>{const g=svg('g',{class:'map-pin',transform:`translate(${c.x} ${c.y})`,tabindex:'0',role:'button','aria-label':`عرض موقع التدريب: ${c.name}`});g.append(svg('circle',{class:'pin-ring',r:15}));g.append(svg('circle',{class:'pin-dot',r:6}));if(['تبوك','الرياض','الدمام','مكة','جدة','تيماء'].includes(c.name)){const t=svg('text',{x:0,y:-20,'text-anchor':'middle'});t.textContent=c.name;g.append(t)}g.addEventListener('click',()=>selectCity(i));g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selectCity(i)}});pins.append(g);let b=document.createElement('button');b.type='button';b.className='city-chip';b.textContent=c.name;b.onclick=()=>selectCity(i);$('#cityList').append(b)});selectCity(7);
const hajj=[
{name:'المشاعر',years:'1436هـ',desc:'مسؤولة الاستقبال والتقنية.',letters:'م',gradient:'linear-gradient(130deg,#3da1bf,#155c83)'},
{name:'ركب الهدى',years:'1437–1439هـ',desc:'مسؤوليات تقنية وثقافية وإشراف على الصالات والبرنامج الثقافي وفق ما ورد في السيرة.',letters:'ر',gradient:'linear-gradient(130deg,#55a77e,#176849)'},
{name:'الإفاضة',years:'1442هـ',desc:'الإشراف على التغذية ضمن أعمال الحملة.',letters:'إ',gradient:'linear-gradient(130deg,#b27ce4,#5a38a7)'},
{name:'الخير المكية',years:'1443هـ و1445–1447هـ',desc:'أدوار في البرنامج الثقافي ووحدة السعادة وإدارة الابتكار والإبداع، ومهام أخرى مرتبطة بخدمات الحملة.',letters:'خ',gradient:'linear-gradient(130deg,#eab46e,#a76b22)'},
{name:'الكاف',years:'1444هـ',desc:'الإشراف على البرنامج الثقافي، والمشاركة في مسار التكريم وجائزة المجلس التنسيقي بحسب السيرة.',letters:'ك',gradient:'linear-gradient(130deg,#ec7e9c,#b33b6c)'}];
const modal=$('#hajjModal');function openHajj(h){$('#modalLogo').innerHTML=`<div class="hajj-symbol" style="background:${h.gradient}">${h.letters}</div>`;$('#modalTitle').textContent=h.name;$('#modalDesc').textContent=h.desc;$('#modalYears').textContent=h.years;modal.classList.add('open');modal.setAttribute('aria-hidden','false');$('#closeModal').focus();document.body.style.overflow='hidden'}function closeHajj(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''}
$('#hajjGrid').innerHTML=hajj.map((h,i)=>`<button type="button" class="hajj-card reveal visible" data-hajj="${i}" title="حملة ${h.name}"><span class="hovername">حملة ${h.name}</span><span class="hajj-symbol" style="background:${h.gradient}" aria-hidden="true">${h.letters}</span><h3>${h.name}</h3><small>${h.years} · انقري للتفاصيل</small></button>`).join('');$$('[data-hajj]').forEach(el=>el.addEventListener('click',()=>openHajj(hajj[+el.dataset.hajj])));$('#closeModal').onclick=closeHajj;modal.addEventListener('click',e=>{if(e.target.dataset.close)closeHajj()});window.addEventListener('keydown',e=>{if(e.key==='Escape')closeHajj()});
const awards=[
{type:'فوز / تكريم',name:'المركز الأول في المسابقة العالمية لصانعات التغيير',detail:'عام 2024م'},
{type:'فوز / تكريم',name:'المركز الأول لجائزة المجلس التنسيقي لحملات حجاج الداخل',detail:'البرنامج الثقافي لحملة الكاف · 1444هـ'},
{type:'فوز / تكريم',name:'المركز الأول لجائزة رئيس الجامعة للتميز في خدمة المجتمع',detail:'عام 2021م'},
{type:'فوز / تكريم',name:'المركز الأول في جائزة تعزيز للجمعية الفيصلية',detail:'فئة الإداريين والفنيين · 1443هـ'},
{type:'فوز / تكريم',name:'المركز الثالث في مبادرة فرسان الوطن',detail:'مبادرة مكنهم · 1442هـ'},
{type:'وسام / تكريم',name:'وسام الإبداع والتميز',detail:'جوائز الملهمين العرب · 2024م'},
{type:'ترشيح',name:'الترشيح لجائزة الوسام العالمية للمرأة',detail:'القيادية والريادية · 2021م'},
{type:'ترشيح',name:'الترشيح لجائزة الإصرار',detail:'ضمن المرشحات المذكورات في السيرة'},
{type:'شهادة / تكريم',name:'شهادة التميز التدريبي',detail:'من صاحبة السمو الملكي الأميرة موضي آل سعود · 1431هـ'}];
$('#awardsGrid').innerHTML=awards.map(a=>`<article class="award-card reveal visible"><span class="award-type">✦ ${a.type}</span><h3>${a.name}</h3><p>${a.detail}</p></article>`).join('');const awardHtml=awards.map(a=>`<span class="marquee-award">✦ ${a.name}</span>`).join('');$('#awardsMarquee').innerHTML=awardHtml+awardHtml;
$('#year').textContent=new Date().getFullYear();
