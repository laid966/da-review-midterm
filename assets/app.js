
(function(){
  var doc=document.documentElement;
  try{var t=localStorage.getItem('da-theme');if(t)doc.setAttribute('data-theme',t);}catch(e){}
  var btn=document.getElementById('theme');
  if(btn){btn.addEventListener('click',function(){
    var n=doc.getAttribute('data-theme')==='dark'?'light':'dark';
    doc.setAttribute('data-theme',n);
    try{localStorage.setItem('da-theme',n)}catch(e){}
    var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',n==='dark'?'#0d1219':'#4c5fd5');
    btn.textContent=n==='dark'?'☀':'☾';
  });}
  var prog=document.getElementById('prog'),totop=document.getElementById('totop');
  function onscroll(){
    var d=doc.scrollHeight-window.innerHeight,y=window.scrollY||doc.scrollTop||0;
    if(prog)prog.style.width=(d>0?Math.min(100,y/d*100):0)+'%';
    if(totop)totop.style.display=y>700?'grid':'none';
  }
  window.addEventListener('scroll',onscroll,{passive:true});onscroll();
  if(totop)totop.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});
  var chips=[].slice.call(document.querySelectorAll('.tabs a'));
  var secs=chips.map(function(c){var h=c.getAttribute('href');return h&&h.charAt(0)==='#'?document.querySelector(h):null;}).filter(Boolean);
  function setActive(id){
    chips.forEach(function(c){c.classList.toggle('active',c.getAttribute('href')==='#'+id)});
    var a=chips.filter(function(c){return c.classList.contains('active')})[0];
    if(a&&a.parentNode&&a.parentNode.scrollWidth>a.parentNode.clientWidth){
      try{a.scrollIntoView({inline:'center',block:'nearest',behavior:'smooth'})}catch(e){}
    }
  }
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting)setActive(e.target.id);});
    },{rootMargin:'-46% 0px -50% 0px',threshold:0});
    secs.forEach(function(s){io.observe(s)});
  }
  var all=document.getElementById('expand');
  if(all){all.addEventListener('click',function(){
    var opened=all.getAttribute('data-open')==='1';
    var ds=document.querySelectorAll('details');
    for(var i=0;i<ds.length;i++)ds[i].open=!opened;
    all.setAttribute('data-open',opened?'0':'1');
    all.textContent=opened?'展开全部答案':'收起全部答案';
  });}
  window.addEventListener('beforeprint',function(){
    var ds=document.querySelectorAll('details');
    for(var i=0;i<ds.length;i++){ds[i].setAttribute('data-was',ds[i].open?'1':'0');ds[i].open=true;}
  });
  window.addEventListener('afterprint',function(){
    var ds=document.querySelectorAll('details');
    for(var i=0;i<ds.length;i++){if(ds[i].getAttribute('data-was')==='0')ds[i].open=false;}
  });
  var cd=document.getElementById('cdays');
  if(cd){
    try{
      var target=new Date('2026-10-29T08:00:00+08:00');
      var days=Math.ceil((target-Date.now())/86400000);
      if(days>0)cd.textContent=days<=1?'今天/明天考试，直接看"考前30分钟"':('还有 '+days+' 天');
      else cd.textContent='考试已开始/结束，按本手册复习即可';
    }catch(e){}
  }
})();
