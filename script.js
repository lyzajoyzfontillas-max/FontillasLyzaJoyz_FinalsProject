// Carousel slides (SVG art)
var slides=[
 '<img src="assets/botolan-map.png" alt="Map of Botolan">',
 '<img src="assets/college-botolan.png" alt="Polytechnic College of Botolan">',
 '<img src="assets/technology-gallery.png" alt="Technology">'
];
var cur=1,stage=document.getElementById('stage'),dots=document.getElementById('dots'),timer;
function render(){
 var n=slides.length,l=(cur+n-1)%n,r=(cur+1)%n;
 stage.innerHTML='';
 [[l,'l'],[cur,'mid'],[r,'r']].forEach(function(a){
  var d=document.createElement('div');d.className='slide '+a[1];d.innerHTML=slides[a[0]];
  d.setAttribute('role','button');d.setAttribute('aria-label','Slide '+(a[0]+1));
  d.onclick=function(){go(a[0])};stage.appendChild(d);
 });
 dots.innerHTML='';
 slides.forEach(function(_,i){var b=document.createElement('button');b.className=i===cur?'on':'';b.setAttribute('aria-label','Go to slide '+(i+1));b.onclick=function(){go(i)};dots.appendChild(b)});
}
function go(i){cur=i;render();restart()}
function restart(){clearInterval(timer);timer=setInterval(function(){cur=(cur+1)%slides.length;render()},4000)}
var sx=null;stage.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});
stage.addEventListener('touchend',function(e){if(sx===null)return;var dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>30)go((cur+(dx<0?1:slides.length-1))%slides.length);sx=null});
render();restart();

// Photo upload
var photo=document.getElementById('photo'),file=document.getElementById('file');
photo.onclick=function(){file.click()};
photo.onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();file.click()}};
file.onchange=function(){var f=file.files[0];if(!f)return;var r=new FileReader();r.onload=function(){photo.innerHTML='<img alt="Lyza Joyz Fontillas" src="'+r.result+'"><span>Click to change photo</span>'};r.readAsDataURL(f)};

// Nav highlight on scroll
var links=[].slice.call(document.querySelectorAll('nav a'));
var obs=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-40% 0px -55% 0px'});
document.querySelectorAll('section').forEach(function(s){obs.observe(s)});

// Login modal
var modal=document.getElementById('modal'),msg=document.getElementById('msg'),lb=document.getElementById('openLogin');
function open(){modal.classList.add('open');msg.textContent='';document.getElementById('u').focus()}
function close(){modal.classList.remove('open')}
lb.onclick=function(){if(lb.dataset.in){lb.textContent='LOG IN';delete lb.dataset.in}else open()};
document.getElementById('cancel').onclick=close;
modal.onclick=function(e){if(e.target===modal)close()};
document.addEventListener('keydown',function(e){if(e.key==='Escape')close();if(e.key==='Enter'&&modal.classList.contains('open'))document.getElementById('go').click()});
document.getElementById('go').onclick=function(){
 var u=document.getElementById('u').value.trim(),p=document.getElementById('p').value;
 if(!u||!p){msg.textContent='Enter your username and password.';return}
 lb.textContent='LOG OUT';lb.dataset.in=1;close();document.getElementById('u').value='';document.getElementById('p').value='';
};
