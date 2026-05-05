// ── SLIDE 1 · TITLE ──────────────────────────
"POLYSEMY".split('').forEach((l,i)=>{
  const s=document.createElement('span');
  s.className='letter';s.textContent=l;
  s.style.animationDelay=`${.15+i*.07}s`;
  document.getElementById('titleWrap').appendChild(s);
});

// ── SLIDE 2 · DEFINITION REVEAL ──────────────
function animDef(){
  document.querySelectorAll('.def-line').forEach((l,i)=>
    setTimeout(()=>l.classList.add('show'),300+i*370));
  setTimeout(()=>document.getElementById('def-note').classList.add('show'),300+4*370);
}

// ── SLIDE 3 · vs HOMONYMY ────────────────────
function animVs(){
  const seq=[
    ['vl-l',0],['vl-r',0],
    ['hb1',250],['hb2',420],
    ['pmC',300],['ps1',560],['ps2',700],['ps3',840],
    ['vs-dl',650],['vs-dr',650],
    ['vs-ol',950],['vs-or',950],
  ];
  seq.forEach(([id,d])=>setTimeout(()=>document.getElementById(id).classList.add('show'),d));
  setTimeout(drawPolyMini,900);
  setTimeout(()=>{
    document.getElementById('hb1').classList.add('homo-drift-1');
    document.getElementById('hb2').classList.add('homo-drift-2');
  },750);
}

function drawPolyMini(){
  const svg=document.getElementById('pmSvg');
  svg.innerHTML='';
  const stage=svg.parentElement;
  const sw=stage.offsetWidth,sh=stage.offsetHeight;
  const cx=sw*.5,cy=sh*.5,mr=34;
  const sats=[
    {x:12+27,y:16+27},
    {x:sw-12-27,y:16+27},
    {x:sw*.5,y:sh-6-27},
  ];
  sats.forEach(p=>{
    const dx=p.x-cx,dy=p.y-cy;
    const dist=Math.sqrt(dx*dx+dy*dy);
    const ux=dx/dist,uy=dy/dist;
    const line=document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1',cx+ux*mr);line.setAttribute('y1',cy+uy*mr);
    line.setAttribute('x2',p.x-ux*27);line.setAttribute('y2',p.y-uy*27);
    line.setAttribute('stroke','rgba(242,189,104,0.42)');
    line.setAttribute('stroke-width','1');
    line.setAttribute('stroke-dasharray','3 3');
    svg.appendChild(line);
  });
}

// ── SLIDE 4 · TABLE BUBBLES ──────────────────
const MEANINGS=[
  {text:"a piece of\nfurniture",r:56,fc:'bf1'},
  {text:"people seated\nat a table",r:52,fc:'bf2'},
  {text:"the food\non a table",r:50,fc:'bf3'},
  {text:"flat piece of\nstone or wood",r:58,fc:'bf4'},
  {text:"orderly arrangement\nof data",r:60,fc:'bf5'},
  {text:"part of a\nmachine-tool",r:50,fc:'bf6'},
  {text:"a plateau;\nlevel area",r:53,fc:'bf7'},
];
const POS=[[19,19],[50,12],[81,19],[84,54],[74,83],[26,83],[16,54]];
let revCount=0;
const satEls=[],lineEls=[];

(function buildBubbles(){
  const stage=document.getElementById('bStage');
  const svg=document.getElementById('conn-svg');
  MEANINGS.forEach((m,i)=>{
    const b=document.createElement('div');
    b.className=`bubble b-sat ${m.fc}`;
    b.style.cssText=`left:${POS[i][0]}%;top:${POS[i][1]}%;width:${m.r*2}px;height:${m.r*2}px;`;
    const num=document.createElement('span');num.className='bnum';num.textContent=i+1;
    b.appendChild(num);b.appendChild(document.createTextNode(m.text));
    stage.appendChild(b);satEls.push(b);
    const ln=document.createElementNS('http://www.w3.org/2000/svg','line');
    ln.setAttribute('stroke','rgba(127,214,255,0.32)');
    ln.setAttribute('stroke-width','1');ln.setAttribute('stroke-dasharray','4 4');
    ln.style.opacity='0';ln.style.transition='opacity .5s .2s';
    svg.appendChild(ln);lineEls.push(ln);
  });
})();

function updateLines(){
  const stage=document.getElementById('bStage');
  const sw=stage.offsetWidth,sh=stage.offsetHeight,cx=sw*.5,cy=sh*.5,mr=77;
  MEANINGS.forEach((m,i)=>{
    const bx=sw*POS[i][0]/100,by=sh*POS[i][1]/100;
    const dx=bx-cx,dy=by-cy,dist=Math.sqrt(dx*dx+dy*dy);
    const ux=dx/dist,uy=dy/dist;
    lineEls[i].setAttribute('x1',cx+ux*mr);lineEls[i].setAttribute('y1',cy+uy*mr);
    lineEls[i].setAttribute('x2',bx-ux*m.r);lineEls[i].setAttribute('y2',by-uy*m.r);
  });
}
updateLines();
window.addEventListener('resize',updateLines);

function spawnParticles(bx,by){
  for(let i=0;i<9;i++){
    const p=document.createElement('div');p.className='ptcl';
    p.style.left=bx+'px';p.style.top=by+'px';
    const ang=(i/9)*Math.PI*2,dist=35+Math.random()*28;
    p.style.setProperty('--tx',Math.cos(ang)*dist+'px');
    p.style.setProperty('--ty',Math.sin(ang)*dist+'px');
    document.body.appendChild(p);
    p.addEventListener('animationend',()=>p.remove());
  }
}

function spawnRipple(){
  const r=document.createElement('div');r.className='ripple';
  document.getElementById('bStage').appendChild(r);
  r.addEventListener('animationend',()=>r.remove());
}

function revealBubble(){
  if(revCount>=MEANINGS.length) return;
  const i=revCount;
  const stage=document.getElementById('bStage');
  const sw=stage.offsetWidth,sh=stage.offsetHeight;
  spawnRipple();
  spawnParticles(sw*POS[i][0]/100,sh*POS[i][1]/100);
  satEls[i].classList.add('shown');
  satEls[i].addEventListener('animationend',()=>satEls[i].classList.add('done'),{once:true});
  setTimeout(()=>lineEls[i].style.opacity='1',120);
  revCount++;
  document.getElementById('b-count').textContent=`${revCount} / ${MEANINGS.length}`;
  document.getElementById('b-hint').textContent=revCount>=MEANINGS.length
    ?'All meanings revealed · Press → to continue'
    :'Press → or click to reveal more';
}

document.getElementById('bStage').addEventListener('click',e=>{
  if(e.target.closest('.b-sat')||e.target.closest('.b-main')) return;
  if(currentSlide===4&&revCount<MEANINGS.length) revealBubble();
});

// ── FLIP CARDS ────────────────────────────────
document.querySelectorAll('.flip-card').forEach(c=>{
  c.addEventListener('click',()=>c.classList.toggle('flipped'));
});

// ── SLIDE 6 · TIMELINE ────────────────────────
function animTimeline(){
  document.getElementById('s6').classList.add('tl-on');
  document.querySelectorAll('.t-item').forEach(el=>{
    const d=parseInt(el.dataset.d)||0;
    setTimeout(()=>el.classList.add('show'),d+200);
  });
}

// ── SLIDE 7 · FEATURES ────────────────────────
function animFeats(){
  document.querySelectorAll('.feat').forEach(el=>{
    const d=parseInt(el.dataset.d)||0;
    setTimeout(()=>el.classList.add('show'),d);
  });
}

// ── SLIDE 8 · END ─────────────────────────────
function animEnd(){
  document.getElementById('s8').classList.add('end-on');
  setTimeout(()=>document.getElementById('mb1').classList.add('show'),350);
  setTimeout(()=>document.getElementById('mb2').classList.add('show'),600);
  setTimeout(()=>document.getElementById('mb3').classList.add('show'),850);
}

// ── NAVIGATION ────────────────────────────────
const TOTAL=8;
let currentSlide=1,transitioning=false;
const slides=document.querySelectorAll('.slide');
const dotsEl=document.getElementById('navDots');

for(let i=0;i<TOTAL;i++){
  const d=document.createElement('div');
  d.className='dot'+(i===0?' active':'');
  d.addEventListener('click',()=>goTo(i+1));
  dotsEl.appendChild(d);
}

function updateNav(){
  document.querySelectorAll('.dot').forEach((d,i)=>d.classList.toggle('active',i===currentSlide-1));
  document.getElementById('slideLbl').textContent=
    String(currentSlide).padStart(2,'0')+' / '+String(TOTAL).padStart(2,'0');
}

function onEnter(n){
  if(n===2) animDef();
  if(n===3) animVs();
  if(n===6) animTimeline();
  if(n===7) animFeats();
  if(n===8) animEnd();
}

function goTo(n){
  if(n<1||n>TOTAL||n===currentSlide||transitioning) return;
  transitioning=true;
  const old=slides[currentSlide-1],nxt=slides[n-1];
  old.classList.remove('active');old.classList.add('s-exit');
  nxt.classList.add('s-enter');
  setTimeout(()=>{
    old.classList.remove('s-exit');
    nxt.classList.remove('s-enter');nxt.classList.add('active');
    currentSlide=n;updateNav();onEnter(n);transitioning=false;
  },750);
}

function next(){
  if(currentSlide===4&&revCount<MEANINGS.length){revealBubble();return}
  goTo(currentSlide+1);
}
function prev(){goTo(currentSlide-1)}

document.getElementById('nextBtn').addEventListener('click',next);
document.getElementById('prevBtn').addEventListener('click',prev);
document.getElementById('touchNext').addEventListener('click',next);
document.getElementById('touchPrev').addEventListener('click',prev);
document.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight'||e.key===' '){e.preventDefault();next()}
  if(e.key==='ArrowLeft'){e.preventDefault();prev()}
});
