(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function a(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(i){if(i.ep)return;i.ep=!0;const s=a(i);fetch(i.href,s)}})();const n=(e,t=document)=>t.querySelector(e),m=(e,t=document)=>Array.from(t.querySelectorAll(e)),g=e=>"./"+e.replace(/^\//,""),k=matchMedia("(prefers-reduced-motion: reduce)"),z=matchMedia("(min-width: 961px)"),w=(...e)=>e.map((t,a)=>`<span class="ln" style="--i:${a}"><span>${t}</span></span>`).join(""),x=e=>e.toLocaleString("en-US"),q=window.gsap,B=window.ScrollTrigger;q&&B&&q.registerPlugin(B);function P(e,t,a,o,i="top bottom",s="bottom top",r="(prefers-reduced-motion: no-preference)"){!q||!B||q.matchMedia().add(r,()=>{q.fromTo(e,a,{...o,ease:"none",scrollTrigger:{trigger:t,start:i,end:s,scrub:.6}})})}function ve(){const e=m("[data-reveal]");if(k.matches||!("IntersectionObserver"in window)){e.forEach(a=>a.classList.add("is-in"));return}const t=new IntersectionObserver(a=>a.forEach(o=>{o.isIntersecting&&(o.target.classList.add("is-in"),t.unobserve(o.target))}),{threshold:.12,rootMargin:"0px 0px -7% 0px"});e.forEach(a=>t.observe(a)),k.addEventListener("change",()=>{k.matches&&e.forEach(a=>a.classList.add("is-in"))})}function he(){const e=m("video[data-film]"),t=new Map,a=s=>{if(t.get(s)&&!document.hidden&&!k.matches&&s.dataset.hold!=="true"){if(s.dataset.film==="once"&&s.ended)return;s.ended&&(s.currentTime=0),!s.getAttribute("src")&&s.dataset.src&&(s.src=s.dataset.src),s.play().then(()=>s.classList.add("is-playing")).catch(()=>{})}else s.pause()},o=new IntersectionObserver(s=>s.forEach(r=>{const c=r.target;t.set(c,r.isIntersecting&&r.intersectionRatio>=.2),a(c)}),{threshold:[0,.2,.5]});e.forEach(s=>{s.muted=!0,s.playsInline=!0,s.addEventListener("ended",()=>{s.loop&&(s.currentTime=0,a(s))}),s.addEventListener("error",()=>{s.hidden=!0}),o.observe(s)});const i=()=>e.forEach(a);document.addEventListener("visibilitychange",i),k.addEventListener("change",i),document.addEventListener("films:sync",i)}function ue(){const e=new IntersectionObserver(t=>t.forEach(a=>{if(!a.isIntersecting)return;e.unobserve(a.target);const o=a.target,i=Number(o.dataset.count);if(k.matches)return;const s=performance.now(),r=c=>{const b=Math.min((c-s)/1400,1);o.textContent=String(Math.round(i*(1-Math.pow(1-b,3)))),b<1&&requestAnimationFrame(r)};requestAnimationFrame(r)}),{threshold:.6});m("[data-count]").forEach(t=>e.observe(t))}function me(){const e=new IntersectionObserver(a=>a.forEach(o=>o.target.classList.toggle("motion-away",!o.isIntersecting)),{rootMargin:"120px 0px"});m("main > section, main > .ticker").forEach(a=>e.observe(a));const t=()=>document.documentElement.classList.toggle("page-away",document.hidden);document.addEventListener("visibilitychange",t),t()}function N(e,{auto:t=0,onSelect:a}={}){const o=e.querySelector('[role="tablist"]'),i=Array.from(o.querySelectorAll('[role="tab"]')),s=i.map(d=>document.getElementById(d.getAttribute("aria-controls")||"")).filter(d=>!!d),r=new Set(s).size===1;let c=0,b=!1,y=!1,u=!1,v=0;const p=()=>t>0&&b&&!y&&!u&&!document.hidden&&!k.matches,h=()=>{clearTimeout(v),e.classList.toggle("is-auto",p()),p()&&(v=window.setTimeout(()=>l((c+1)%i.length),t))};function l(d,$=!1){c=d,$&&(u=!0),i.forEach((f,j)=>{const L=j===d;f.setAttribute("aria-selected",String(L)),f.tabIndex=L?0:-1,f.classList.remove("is-timing"),L&&(f.offsetWidth,f.classList.add("is-timing"))}),r?s[0]?.setAttribute("aria-labelledby",i[d].id):s.forEach((f,j)=>{const L=j===d;f.classList.toggle("is-active",L),f.inert=!L,f.setAttribute("aria-hidden",String(!L))}),e.style.setProperty("--tab-index",String(d)),e.dataset.tab=String(d),a?.(d,$),h()}return i.forEach((d,$)=>d.addEventListener("click",()=>l($,!0))),o.addEventListener("keydown",d=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(d.key))return;d.preventDefault();const $=d.key==="Home"?0:d.key==="End"?i.length-1:(c+(["ArrowRight","ArrowDown"].includes(d.key)?1:-1)+i.length)%i.length;l($,!0),i[$].focus({preventScroll:!0})}),e.style.setProperty("--tab-time",`${t}ms`),t&&(new IntersectionObserver(d=>{b=d[0].isIntersecting,h()},{threshold:.35}).observe(e),e.addEventListener("pointerenter",()=>{y=!0,h()}),e.addEventListener("pointerleave",()=>{y=!1,h()}),e.addEventListener("focusin",()=>{u=!0,h()}),document.addEventListener("visibilitychange",h),k.addEventListener("change",h)),l(0),{select:l}}function ge(){m("dialog").forEach(e=>{e.addEventListener("click",t=>{t.target===e&&e.close()}),m("[data-close]",e).forEach(t=>t.addEventListener("click",()=>e.close()))})}const _=[["#workflow","功能介紹"],["#quant-proof","量化實戰"],["#stories","用戶回饋"],["#companionship","擺渡人陪伴"],["#evolution","持續進化"],["#creator-journey","個人黑卡"]],fe=`
<a class="skip" href="#main">跳至主要內容</a>
<header class="nav" id="nav">
 <a class="brand" href="#home" aria-label="ARK 方舟運算首頁"><span class="logo"><img src="${g("/assets/ark-logo.png")}" alt="ARK" width="56" height="56"></span><span class="brand-name">方舟運算</span></a>
 <nav class="nav-links" aria-label="主要導覽">${_.map(([e,t])=>`<a href="${e}">${t}</a>`).join("")}</nav>
 <a class="btn btn-light nav-cta" href="#plans">購買方案</a>
 <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-menu" aria-label="開啟選單"><span></span><span></span></button>
 <div class="nav-progress" aria-hidden="true"><i></i></div>
</header>
<div class="nav-menu" id="nav-menu" hidden><nav aria-label="行動版導覽">${_.map(([e,t],a)=>`<a href="${e}"><small>0${a+1}</small>${t}</a>`).join("")}<a class="btn btn-light" href="#plans">購買方案</a></nav></div>`,O=(e,t,a,o,i,s)=>`
 <figure class="device device-${e}"><div class="device-rise"><div class="device-float"><div class="device-body"><svg viewBox="${o}" preserveAspectRatio="xMidYMin slice" role="img" aria-label="${a}"><image href="${g(t)}" width="1264" height="${i}"/></svg><span class="device-glare" aria-hidden="true"></span></div></div></div><figcaption>${s}</figcaption></figure>`,be=["買了就下跌。","賣了又起漲。","不知道下一步怎麼做？"],ye=`
<section id="home" class="hero">
 <div class="hero-bg" aria-hidden="true">
  <picture><source media="(max-width: 900px)" srcset="${g("/assets/homepage/hero-bay-mobile-poster.jpg")}"><img src="${g("/assets/homepage/hero-bay-poster.jpg")}" alt="" fetchpriority="high" width="1280" height="720"></picture>
  <video class="hero-film" muted playsinline loop preload="none"></video>
  <div class="hero-shade"></div>
 </div>
 <div class="hero-inner wrap">
  <div class="hero-copy">
   <p class="kicker hero-kicker" data-reveal>ARK 方舟運算・台美股量化系統</p>
   <h1 class="split" data-reveal>${w("你常為投資","擔心嗎？")}</h1>
   <p class="sr-only">每次買了就下跌、賣了又起漲，完全不知道下一步怎麼做？</p>
   <p class="hero-pain" data-reveal aria-hidden="true"><span class="rotor">${be.map((e,t)=>`<span class="${t===0?"is-on":""}">${e}</span>`).join("")}</span></p>
   <p class="hero-answer" data-reveal>方舟把位階、資金配置與股數算給你看。<br><b>買賣之前，先有依據。</b></p>
   <div class="hero-cta" data-reveal><a class="btn btn-light" href="#workflow">看看方舟怎麼幫你<i aria-hidden="true">↓</i></a><a class="btn btn-ghost" href="#plans">直接看方案</a></div>
  </div>
  <div class="hero-phones" aria-label="方舟 APP 實際畫面：入選策略績效、風控運算與主動式 ETF">
   <div class="hero-halo" aria-hidden="true"></div>
   ${O("left","/assets/v34/strategy.jpg","美光科技入選策略績效，包含報價與完整圖表","0 55 1264 2560",2780,"入選策略績效")}
   ${O("right","/assets/v33/etf.jpg","主動式 ETF 持股異動","0 100 1264 2560",2780,"主動式 ETF")}
   ${O("center","/assets/v33/risk.jpg","風控運算與資金配置","0 30 1264 2560",3176,"風控運算")}
  </div>
 </div>
 <a class="hero-scroll" href="#workflow" aria-label="往下看功能介紹"><span></span></a>
</section>
<div class="ticker" aria-hidden="true"><div class="ticker-track">${[0,1].map(()=>["該賣哪一檔？","還能再加碼嗎？","現在買會不會太貴？","到底要買幾股？","跌了要不要停損？","漲了要不要先賣？"].map((e,t)=>`<span class="${t%2?"is-solid":""}">${e}</span><i>◆</i>`).join("")).join("")}</div></div>`;function $e(){const e=n("#nav"),t=n("#nav-menu"),a=n(".nav-toggle"),o=n(".nav-progress i"),i=p=>{t.hidden=!p,a.setAttribute("aria-expanded",String(p)),a.setAttribute("aria-label",p?"關閉選單":"開啟選單"),document.documentElement.classList.toggle("menu-open",p)};a.addEventListener("click",()=>i(t.hidden)),m("a",t).forEach(p=>p.addEventListener("click",()=>i(!1))),addEventListener("keydown",p=>{p.key==="Escape"&&!t.hidden&&(i(!1),a.focus())}),z.addEventListener("change",()=>{z.matches&&i(!1)});let s=!1;const r=()=>{s=!1;const p=document.documentElement.scrollHeight-innerHeight;e.classList.toggle("is-scrolled",scrollY>24),o.style.transform=`scaleX(${p>0?Math.min(1,scrollY/p):0})`};addEventListener("scroll",()=>{s||(s=!0,requestAnimationFrame(r))},{passive:!0}),addEventListener("resize",r),r();const c=m(".nav-links a"),b=[["#workflow",["workflow"]],["#quant-proof",["quant-proof"]],["#stories",["stories"]],["#companionship",["companionship"]],["#evolution",["evolution","awakening"]],["#creator-journey",["creator-journey","create","ecosystem","program"]]],y=new Set,u=()=>{const p=b.find(([,h])=>h.some(l=>y.has(l)))?.[0];c.forEach(h=>h.getAttribute("href")===p?h.setAttribute("aria-current","true"):h.removeAttribute("aria-current"))},v=new IntersectionObserver(p=>{p.forEach(h=>h.isIntersecting?y.add(h.target.id):y.delete(h.target.id)),u()},{rootMargin:"-45% 0px -50% 0px"});b.flatMap(([,p])=>p).forEach(p=>{const h=document.getElementById(p);h&&v.observe(h)})}function we(){const e=n("#home"),t=n(".hero-film",e),a=matchMedia("(max-width: 900px)"),o=()=>!!navigator.connection?.saveData,i=()=>g(a.matches?"/assets/homepage/hero-bay-mobile-loop.mp4":"/assets/homepage/hero-bay-loop.mp4");let s=!1;const r=()=>{if(k.matches||o()||!s||document.hidden){t.pause();return}t.getAttribute("src")!==i()&&(t.classList.remove("is-playing"),t.src=i()),t.play().catch(()=>{})};t.addEventListener("playing",()=>t.classList.add("is-playing")),t.addEventListener("error",()=>t.classList.remove("is-playing")),new IntersectionObserver(c=>{s=c[0].isIntersecting,r()},{threshold:.1}).observe(e),document.addEventListener("visibilitychange",r),k.addEventListener("change",r),a.addEventListener("change",r)}function ke(){const e=m(".rotor span");let t=0;k.matches||setInterval(()=>{if(document.hidden||n("#home").classList.contains("motion-away"))return;e[t].classList.remove("is-on"),e[t].classList.add("is-out");const a=e[t];setTimeout(()=>a.classList.remove("is-out"),700),t=(t+1)%e.length,e[t].classList.add("is-on")},2600)}function Ae(){const e=n("#home"),t=n(".hero-phones",e);requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.add("is-entered")));const a=matchMedia("(hover: hover) and (pointer: fine)");let o=!1,i=0,s=0;e.addEventListener("pointermove",r=>{if(!a.matches||!z.matches||k.matches)return;const c=e.getBoundingClientRect();i=(r.clientX-c.left)/c.width-.5,s=(r.clientY-c.top)/c.height-.5,o||(o=!0,requestAnimationFrame(()=>{o=!1,t.style.setProperty("--mx",i.toFixed(3)),t.style.setProperty("--my",s.toFixed(3))}))}),e.addEventListener("pointerleave",()=>{t.style.setProperty("--mx","0"),t.style.setProperty("--my","0")}),P(n(".hero-copy",e),e,{yPercent:0,opacity:1},{yPercent:-12,opacity:.15},"top top","bottom 35%"),P(m(".device-left,.device-right",e),e,{yPercent:0},{yPercent:-16},"top top","bottom top","(prefers-reduced-motion: no-preference) and (min-width: 961px)"),P(n(".device-center",e),e,{yPercent:0},{yPercent:-7},"top top","bottom top","(prefers-reduced-motion: no-preference) and (min-width: 961px)"),P(n(".hero-bg picture",e),e,{scale:1},{scale:1.12},"top top","bottom top")}function xe(){$e(),we(),ke(),Ae()}const oe="/assets/homepage/",D=[{name:"調節",screen:"調節庫存",question:["想調節持股，","先看哪一檔？"],value:"用錢之前，先看持股。",description:"查看持股位階、建議調節金額與股數，把生活用錢需求一起考慮。",fields:["持股位階","調節金額","調節股數"],file:"adjust-shares.jpg",view:"0 925 1264 830",alt:"調節庫存中美光、蘋果與群益台灣精選高息的位階、建議調節金額與股數",next:"持股看清了，再看資金怎麼安排。"},{name:"風控",screen:"風控運算",question:["下一筆投入，","資金怎麼安排？"],value:"看過配置，再安排資金。",description:"一起看市場指標與持股配置建議，再檢視目前持股、可用資金和建議布局金額。",fields:["市場與配置","持股與資金","布局金額"],file:"",view:"0 0 874 640",alt:"方舟風控運算錄影：持股配置建議與五項市場指標",next:"資金有了安排，再回到想布局的標的。"},{name:"布局自選",screen:"布局自選",question:["選好標的，","要買多少？"],value:"把標的，接到具體股數。",description:"從台美股自選清單，查看位階、即時淨值、折溢價，以及位階股數與風控股數。",fields:["標的與位階","位階股數","風控股數"],file:"layout-shares.jpg",view:"0 440 1264 830",alt:"布局自選中永豐台灣ESG、群益半導體收益與主動統一台股增長的位階與股數",next:"操作之後，讓紀錄接上下一次決定。"},{name:"復盤・交流",screen:"主題看板",question:["操作之後，","有問題找誰討論？"],value:"更新紀錄，回頭檢視；想不通的，一起討論。",description:"把操作心得和遇到的問題帶到主題看板，看看夥伴怎麼想，也分享自己的做法。",fields:["主題看板","心得分享","夥伴討論"],file:"community.jpg",view:"0 570 1264 895",alt:"方舟主題看板中投資心法與產業討論的真實介面",next:"從交流到實戰，看看大家留下的紀錄。"}],W=(e,t,a,o="")=>`<svg class="shot" viewBox="${t}" role="img" aria-label="${a}"><image href="${g(oe+e)}" width="1264" height="2780"/>${o}</svg>`;function G(e){const t=D[e],a=`${t.view.split(" ")[2]} / ${t.view.split(" ")[3]}`;let o="";return e===0&&(o=`${W(t.file,t.view,t.alt)}<div class="lift" aria-hidden="true"><div class="lift-float"><svg viewBox="440 933 552 814"><image href="${g(oe+t.file)}" width="1264" height="2780"/></svg></div></div>`),e===1&&(o=`<video class="risk-film" data-film="loop" muted playsinline loop preload="none" poster="${g("/assets/v37/risk-demo-poster.jpg")}" aria-label="${t.alt}"><source src="${g("/assets/v37/risk-demo.mp4")}" type="video/mp4"></video>`),e===2&&(o=`${W(t.file,t.view,t.alt,'<rect class="focus-rect" x="955" y="448" width="301" height="814" rx="18"/>')}<svg class="guide-arrow" viewBox="0 0 64 64" aria-hidden="true"><path d="M8 20 L30 20 L30 6 L58 32 L30 58 L30 44 L8 44 Z"/></svg>`),e===3&&(o=W(t.file,t.view,t.alt,'<g class="marks" aria-hidden="true"><path pathLength="1" d="M 537 1175 Q 745 1182 977 1175"/><path pathLength="1" d="M 206 1238 Q 445 1244 700 1237"/></g>')),`<figure class="frame frame-${e}"><div class="frame-bar"><span>方舟 APP</span><b>${t.screen}</b></div><div class="frame-view" style="aspect-ratio:${a}">${o}</div></figure>`}const Le=`
<section id="workflow" class="flow" aria-labelledby="workflow-title">
 <div class="wrap flow-head">
  <p class="chapter-tag" data-reveal><b>第一章</b><span>把投資做穩</span></p>
  <h2 id="workflow-title" class="split h-xl" data-reveal>${w("買賣之前，","<em>先有依據。</em>")}</h2>
  <p class="lead" data-reveal>投資最讓人焦慮的，是四個得自己決定的時刻。<br>方舟在每一個時刻，給你一組看得懂的數字。</p>
 </div>
 <nav class="flow-nav" aria-label="四個決策時刻"><div class="wrap">${D.map((e,t)=>`<a href="#step-${t}" data-step-link="${t}"><span>0${t+1}</span>${e.name}</a>`).join("")}<i class="flow-nav-bar" aria-hidden="true"></i></div></nav>
 <div class="wrap flow-body">
  <div class="flow-steps">${D.map((e,t)=>`
   <article id="step-${t}" class="step" data-step="${t}" aria-labelledby="step-q-${t}">
    <p class="step-no"><span>時刻 0${t+1}</span>${e.name}</p>
    <h3 id="step-q-${t}">${e.question.join("<br>")}</h3>
    <p class="step-value">${e.value}</p>
    <p class="step-desc">${e.description}</p>
    <ul class="step-fields" aria-label="你會看到">${e.fields.map(a=>`<li>${a}</li>`).join("")}</ul>
    <div class="step-figure">${G(t)}</div>
    <p class="step-next"><span aria-hidden="true">↓</span>${e.next}</p>
   </article>`).join("")}
  </div>
  <aside class="flow-stage" aria-label="隨閱讀進度切換的方舟 APP 畫面"><div class="flow-stage-inner">${D.map((e,t)=>`<div class="stage-panel ${t===0?"is-active":""}" data-panel="${t}" ${t?'inert aria-hidden="true"':""}>${G(t)}</div>`).join("")}</div></aside>
 </div>
</section>`;function Ee(){const e=n("#workflow"),t=m("[data-step]",e),a=m("[data-step-link]",e),o=m("[data-panel]",e),i=n(".flow-nav-bar",e);let s=-1;function r(u){u!==s&&(s=u,a.forEach((v,p)=>p===u?v.setAttribute("aria-current","step"):v.removeAttribute("aria-current")),t.forEach((v,p)=>v.classList.toggle("is-current",p===u)),o.forEach((v,p)=>{const h=p===u;v.classList.toggle("is-active",h),v.inert=!h,v.setAttribute("aria-hidden",String(!h))}),e.style.setProperty("--step",String(u)),i.style.transform=`translateX(${u*100}%)`,m(".risk-film",e).forEach(v=>{v.dataset.hold=String(!!v.closest(".flow-stage")&&u!==1)}),document.dispatchEvent(new Event("films:sync")))}const c=new Map,b=new IntersectionObserver(u=>{u.forEach(h=>c.set(h.target,h.isIntersecting?h.intersectionRatio:0));let v=-1,p=0;t.forEach((h,l)=>{const d=c.get(h)||0;d>p&&(p=d,v=l)}),v>=0&&r(v)},{rootMargin:"-38% 0px -38% 0px",threshold:[0,.2,.5,.8,1]});t.forEach(u=>b.observe(u)),a.forEach((u,v)=>u.addEventListener("click",p=>{p.preventDefault(),t[v].scrollIntoView({block:z.matches?"center":"start",behavior:k.matches?"auto":"smooth"}),history.replaceState(null,"",u.hash)}));const y=new IntersectionObserver(u=>u.forEach(v=>{v.isIntersecting&&v.intersectionRatio>=.72?v.target.classList.add("is-seen"):(!v.isIntersecting||v.intersectionRatio<=.05)&&v.target.classList.remove("is-seen")}),{threshold:[0,.05,.72]});m(".frame",e).forEach(u=>y.observe(u)),r(0)}const E=[{id:"new-47",file:"new-220147.jpg",market:"美股",state:"realized",label:"已實現損益",date:"",currency:"USD",size:[1178,871],view:"0 0 1178 871",post:"",person:""},{id:"new-03",file:"new-220103.jpg",market:"美股",state:"realized",label:"已實現損益",date:"",currency:"USD",size:[1179,1215],view:"0 300 1179 915",post:"",person:""},{id:"new-00",file:"new-220100.jpg",market:"台股",state:"realized",label:"已實現損益",date:"",currency:"TWD",size:[1179,1375],view:"0 300 1179 1075",post:"",person:""},{id:"new-24",file:"new-220124.jpg",market:"美股",state:"unspecified",label:"交易損益紀錄",date:"",currency:"USD",size:[1206,1523],view:"0 0 1206 1523",post:"",person:""},{id:"record-2",file:"v31-statement-002.jpg",market:"台股",state:"realized",label:"已實現損益",date:"",currency:"TWD",size:[1179,1901],view:"0 0 1179 1901",post:"",person:""},{id:"record-70",file:"v31-statement-070.jpg",market:"美股",state:"realized",label:"已實現損益",date:"",currency:"USD",size:[1264,881],view:"0 0 1264 881",post:"",person:""},{id:"record-23",file:"v31-statement-023.jpg",market:"美股",state:"inventory",label:"庫存預估損益",date:"",currency:"USD",size:[1206,816],view:"0 0 1206 816",post:"",person:""},{id:"record-48",file:"v31-statement-048.jpg",market:"美股",state:"inventory",label:"庫存預估損益",date:"",currency:"TWD",size:[1100,1488],view:"0 0 1100 1488",post:"",person:""},{id:"record-5",file:"v31-statement-005.jpg",market:"台股",state:"realized",label:"已實現損益",date:"",currency:"TWD",size:[1206,1997],view:"0 0 1206 1997",post:"",person:""},{id:"record-4",file:"v31-statement-004.jpg",market:"台股",state:"realized",label:"已實現損益",date:"",currency:"TWD",size:[1284,2196],view:"0 0 1284 2196",post:"",person:""},{id:"record-8",file:"v31-statement-008.jpg",market:"台股",state:"realized",label:"已實現損益",date:"",currency:"TWD",size:[1284,2196],view:"0 0 1284 2196",post:"",person:""},{id:"record-12",file:"v31-statement-012.jpg",market:"台股",state:"inventory",label:"庫存參考損益",date:"",currency:"TWD",size:[1206,596],view:"0 0 1206 596",post:"",person:""},{id:"record-24",file:"v31-statement-024.jpg",market:"美股",state:"inventory",label:"庫存預估損益",date:"",currency:"USD",size:[1080,697],view:"0 0 1080 697",post:"",person:""},{id:"record-72",file:"v31-statement-072.jpg",market:"美股",state:"inventory",label:"庫存預估損益",date:"",currency:"TWD",size:[1263,880],view:"0 0 1263 880",post:"",person:""}],Pe=[{id:"mailey-inventory",file:"08-mailey-inventory.jpg",market:"未標示",state:"inventory",label:"庫存累積損益",date:"",currency:"TWD",size:[1197,300],view:"0 0 1197 300",post:"mailey-post.jpg",person:"麥莉"},{id:"tcl-realized",file:"09-tcl-realized.jpg",market:"台股",state:"realized",label:"已實現損益",date:"",currency:"TWD",size:[1246,1225],view:"0 625 1246 600",post:"tcl-post.jpg",person:"TCL"}],je=`我是今年一月份開始使用「方舟運算」這個 APP 的。一開始是因為收到用戶邀請，參加了一場免費講座，在講座中初步了解這套系統的運作邏輯後，就決定開始訂閱使用。


實際使用之後，對我在投資上的改變其實滿大的。以前我買 ETF 比較偏向分散、長期領股息，但沒有一個明確的比較依據，也不太會去調整配置或選股。透過方舟運算，我可以清楚比較不同 ETF 之間的報酬表現，並且做出相對客觀的判斷。因此在年初的時候，我透過 APP 比較報酬功能，依照績效做了一次性的定期定額 ETF 調整。

另外一個很大的收穫，是學會「調節」。過去我其實是買了股票或 ETF 之後就長期放著，不太知道什麼時候該調整，導致資金沒有流動性。使用這個 APP 之後，它會提供一些位階與趨勢的判斷，讓我知道哪些標的已經在相對高點或升溫，可以適時調節，釋放資金去做更好的配置。原本我的庫存水位偏高，但經過幾次調整之後，現在已經維持在一個比較可控的水位，保留部分資金可以再參與市場。

除了 APP 本身，我也參加了一次方舟的免費實體講座。講座結束後，還有提供一對一指導諮詢，教練花了大約半小時，很細心地針對我的狀況給建議，真的很用心！在那場課程中，大概有十位學員，只有兩位沒有投資美股，而我剛好就是其中之一，也因為這樣，讓我開始學習了美股。

過年之後，我正式開始複委託投入美股，並採用「100 元美股戰法」慢慢建立部位。雖然近期市場波動比較大，但透過價值區的概念去選股，還是有獲利，例如上週調節了 PL，就是從美股價值區選出來的。

現在我幾乎每天早上通勤時，都會先用 APP 看台股 ETF 的淨值，然後依照合理價格去掛單，讓我在進場時更有信心，也比較不會有「買貴、追高或被套牢」的焦慮，也因此在上週終止了所有定期定額的投資，因為定期定額可能會買到溢價的股票，決定在習慣依照 APP 淨值的操作後，在三個月不到的時間內做了這個重大的改變。

整體來說，方舟運算對我最大的幫助，不只是提供數據參考，而是幫助我建立了一套更有紀律、有邏輯的投資方式～`,T="/assets/v6/",Ie=["new-00","new-03","new-47","record-2","record-70","record-23"],Te=e=>`${e.market} · ${e.label}`,J=(e,t)=>`<button type="button" class="tile" data-proof="${e.id}" style="--i:${t%6}" aria-label="查看${e.market}${e.label}原始截圖"><span class="tile-shot"><svg viewBox="${e.view}" preserveAspectRatio="xMidYMin slice" role="img" aria-label="${e.market}${e.label}原始截圖"><image href="${g(T+e.file)}" width="${e.size[0]}" height="${e.size[1]}"/></svg></span><span class="tile-cap"><span><b>${e.market}</b>${e.label}<small>${e.currency}</small></span><i aria-hidden="true">↗</i></span></button>`,ze=`
<section id="quant-proof" class="proof" aria-labelledby="quant-title">
 <div class="band">
  <div class="band-media"><img src="${g("/assets/v42/quant-code.jpg")}" alt="" width="1280" height="720" loading="lazy"><video data-film="loop" muted playsinline loop preload="none" poster="${g("/assets/v42/quant-code.jpg")}" aria-label="量化運算概念影片"><source src="${g("/assets/v42/quant-code.mp4")}" type="video/mp4"></video><div class="band-shade" aria-hidden="true"></div></div>
  <div class="band-copy wrap">
   <p class="kicker" data-reveal>量化實戰</p>
   <h2 id="quant-title" class="split h-xl" data-reveal>${w("把「感覺」，","換成<em>算得出來</em>的依據。")}</h2>
   <p class="lead" data-reveal>規則交給運算，決定留給你。</p>
  </div>
 </div>
 <div id="statement-wall" class="wrap wall-head">
  <h3 class="split h-lg" data-reveal>${w("方舟量化，","實戰對帳單。")}</h3>
  <p class="lead" data-reveal>用戶分享的實際帳戶截圖。<br>原圖呈現——不重繪、不合併、不加總。</p>
 </div>
 <div class="wall wrap" data-reveal aria-label="精選實戰對帳單牆">${Ie.map((e,t)=>J(E.find(a=>a.id===e),t)).join("")}</div>
 <p class="wall-note wrap">以上為用戶分享的對帳單原圖，僅供參考；過去績效不代表未來結果。</p>
 <details class="catalog wrap"><summary><span>瀏覽更多對帳單</span><i aria-hidden="true">＋</i></summary>
  <div class="catalog-filters" role="group" aria-label="篩選實戰紀錄">${[["all","全部"],["台股","台股"],["美股","美股"],["realized","已實現"],["inventory","庫存損益"]].map(([e,t],a)=>`<button type="button" data-proof-filter="${e}" aria-pressed="${a===0}">${t}</button>`).join("")}</div>
  <p class="sr-only" role="status" data-proof-status></p>
  <div class="catalog-grid">${E.map((e,t)=>J(e,t)).join("")}</div>
 </details>
</section>
<dialog id="proof-dialog" class="viewer" aria-labelledby="proof-title">
 <header><div><h3 id="proof-title"></h3><p id="proof-context"></p></div><button type="button" class="viewer-close" data-close>關閉</button></header>
 <div class="viewer-controls"><button type="button" data-proof-prev>← 上一張</button><span id="proof-position"></span><button type="button" data-proof-next>下一張 →</button><button type="button" data-proof-zoom aria-pressed="false">放大閱讀</button></div>
 <div class="viewer-original"><img alt=""></div>
</dialog>`,ne=[{id:"retirement",name:"退休倒數365天",quote:"敢賣之後，<br>發現自己更快樂了。",summary:"從只敢存股，到開始調節持股。",file:"retirement-post.jpg",size:[1179,792],avatar:"20 380 140 140",view:"185 480 770 285",pair:"retirement"},{id:"shqnn",name:"Shqnn",quote:"更有紀律、<br>有邏輯的投資方式。",summary:"比較 ETF、學會調節；通勤時查淨值、安排掛單，也透過實體交流學習。",file:"",size:[0,0],avatar:"",view:"",pair:""},{id:"mailey",name:"麥莉",quote:"總是在更好的<br>方向前進。",summary:"第一次實體交流後，開始精簡持股。接下來，希望跟前輩學習如何解放雙手。",file:"mailey-post.jpg",size:[1264,623],avatar:"35 36 100 100",view:"190 105 1074 518",pair:"mailey-inventory"},{id:"tcl",name:"TCL",quote:"朝著自己人生規劃<br>目標前進。",summary:"調節持股，把資金安排連回房屋整修、搬遷與裝潢的生活目標。",file:"tcl-post.jpg",size:[1264,626],avatar:"35 35 100 100",view:"190 105 1074 521",pair:"tcl-realized"}],re=(e,t=!1)=>`<svg ${t?'class="story-avatar"':""} viewBox="${t?e.avatar:e.view}" role="img" aria-label="${e.name}${t?"的原頭像":"分享原文"}"><image href="${g(T+e.file)}" width="${e.size[0]}" height="${e.size[1]}"/></svg>`,Se=e=>`${e.id==="retirement"?"":`<button type="button" data-story="${e.id}">${e.id==="shqnn"?"App Store 分享":"查看原文"}</button>`}${e.pair?`<button type="button" data-story="${e.id}" data-story-result>對帳單成績</button>`:""}`,qe=`
<section id="stories" class="stories" aria-labelledby="stories-title">
 <div class="wrap stories-head">
  <p class="kicker" data-reveal>用戶回饋</p>
  <h2 id="stories-title" class="split h-xl" data-reveal>${w("看看大家","怎麼說。")}</h2>
 </div>
 <div class="wrap story-grid">${ne.map((e,t)=>`
  <article class="story" data-reveal style="--i:${t}">
   <span class="story-mark" aria-hidden="true">「</span>
   <blockquote>${e.quote}</blockquote>
   <p class="story-summary">${e.summary}</p>
   <footer><div class="story-person">${e.file?re(e,!0):'<span class="story-letter" aria-label="Shqnn 字母頭像">S</span>'}<h3>${e.name}</h3></div><div class="story-actions">${Se(e)}</div></footer>
  </article>`).join("")}</div>
</section>
<dialog id="story-dialog" class="viewer" aria-labelledby="story-title">
 <header><div><h3 id="story-title"></h3></div><button type="button" data-story-zoom aria-pressed="false">放大原文</button><button type="button" class="viewer-close" data-close>關閉</button></header>
 <div class="story-source"></div>
</dialog>`,Y=(e,t,a,o,i,s,r)=>`<figure class="${e}" data-reveal><button type="button" data-photo="${t}" data-photo-title="${a}" aria-label="查看完整照片：${a}"><img src="${g(T+t)}" alt="${o}" loading="lazy" width="${s}" height="${r}"></button><figcaption>${i}</figcaption></figure>`,Me=`
<section id="companionship" class="companion" aria-labelledby="companion-title">
 <div class="wrap companion-head">
  <p class="kicker" data-reveal>擺渡人陪伴 · 實體交流</p>
  <h2 id="companion-title" class="split h-xl" data-reveal>${w("從第一次使用，","<em>有人陪著你。</em>")}</h2>
  <p class="lead" data-reveal>工具會用是一回事，用得安心是另一回事。<br>帶著問題來，和擺渡人、團隊一起找下一步。</p>
 </div>
 <div class="wrap companion-scene">
  ${Y("photo photo-room","live-day-room.jpg","方舟實體課堂","方舟實體課堂全景，學員分桌使用筆電，講師在大螢幕旁示範","方舟實體課堂",1400,1050)}
  ${Y("photo photo-help","live-help.jpg","桌邊交流與指導","擺渡人在桌邊與學員討論筆電操作","依每個人的進度，一起處理問題。",825,1100)}
  ${Y("photo photo-table","live-day-table.jpg","夥伴實體交流","夥伴圍桌交流與實作","一起討論，把卡住的地方說出來。",1400,1050)}
 </div>
</section>
<dialog id="photo-dialog" class="viewer" aria-labelledby="photo-title"><header><div><h3 id="photo-title"></h3></div><button type="button" class="viewer-close" data-close>關閉</button></header><div class="viewer-original"><img alt=""></div></dialog>`,Ce=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");function De(){const e=n(".band");P(n(".band-media",e),e,{clipPath:"inset(7% 5% 7% 5% round 28px)"},{clipPath:"inset(0% 0% 0% 0% round 0px)"},"top 85%","top 15%");const t=n("#proof-dialog"),a=n(".viewer-original",t),o=n("[data-proof-zoom]",t);let i=0;const s=()=>{const l=E[i];n("#proof-title",t).textContent=Te(l),n("#proof-context",t).textContent=`${l.currency} · ${l.label}`,n("#proof-position",t).textContent=`${i+1} / ${E.length}`;const d=n("img",a);d.src=g(T+l.file),d.alt=`${l.market}${l.label}完整原始截圖`,a.classList.remove("is-zoomed"),o.setAttribute("aria-pressed","false"),o.textContent="放大閱讀",a.scrollTop=0,a.scrollLeft=0},r=l=>{i=(i+l+E.length)%E.length,s()};m("[data-proof]").forEach(l=>l.addEventListener("click",()=>{i=E.findIndex(d=>d.id===l.dataset.proof),s(),t.showModal()})),n("[data-proof-prev]",t).addEventListener("click",()=>r(-1)),n("[data-proof-next]",t).addEventListener("click",()=>r(1)),o.addEventListener("click",()=>{const l=a.classList.toggle("is-zoomed");o.setAttribute("aria-pressed",String(l)),o.textContent=l?"恢復大小":"放大閱讀"}),t.addEventListener("keydown",l=>{l.key==="ArrowRight"&&(l.preventDefault(),r(1)),l.key==="ArrowLeft"&&(l.preventDefault(),r(-1))});const c=m("[data-proof-filter]"),b=m(".catalog-grid [data-proof]");c.forEach(l=>l.addEventListener("click",()=>{const d=l.dataset.proofFilter;c.forEach(f=>f.setAttribute("aria-pressed",String(f===l)));let $=0;b.forEach(f=>{const j=E.find(L=>L.id===f.dataset.proof);f.hidden=!(d==="all"||j.market===d||j.state===d),f.hidden||$++}),n("[data-proof-status]").textContent=`顯示 ${$} 份紀錄`}));const y=n("#story-dialog"),u=n(".story-source",y),v=n("[data-story-zoom]",y);v.addEventListener("click",()=>{const l=u.classList.toggle("is-zoomed");v.setAttribute("aria-pressed",String(l)),v.textContent=l?"恢復大小":"放大原文"}),m("[data-story]").forEach(l=>l.addEventListener("click",()=>{const d=ne.find(f=>f.id===l.dataset.story);n("#story-title",y).textContent=`${d.name} · ${d.id==="shqnn"?"App Store 分享":"分享原文"}`,u.classList.remove("is-zoomed"),v.hidden=!d.file,v.textContent="放大原文",v.setAttribute("aria-pressed","false");const $=d.pair==="retirement"?{file:"retirement-detail.JPG",label:"已實現損益"}:Pe.find(f=>f.id===d.pair);u.innerHTML=`<div class="story-post"><h4>使用心得</h4>${d.file?re(d):je.split(/\n\s*\n/).filter(Boolean).map(f=>`<p>${Ce(f.trim())}</p>`).join("")}</div>${$?`<div class="story-result" tabindex="-1"><h4>對帳單成績 · ${$.label}</h4><img src="${g(T+$.file)}" alt="${d.name}分享的原始對帳單"></div>`:""}`,u.classList.toggle("has-result",!!$),y.showModal(),l.hasAttribute("data-story-result")&&n(".story-result",u)?.focus()}));const p=n("#photo-dialog");m("[data-photo]").forEach(l=>l.addEventListener("click",()=>{n("h3",p).textContent=l.dataset.photoTitle;const d=n("img",p);d.src=g(T+l.dataset.photo),d.alt=l.dataset.photoTitle,p.showModal()}));const h=n(".companion-scene");P(n(".photo-help",h),h,{y:60},{y:-60},"top bottom","bottom top","(prefers-reduced-motion: no-preference) and (min-width: 961px)"),P(n(".photo-table",h),h,{y:110},{y:-30},"top bottom","bottom top","(prefers-reduced-motion: no-preference) and (min-width: 961px)")}const Fe={monthly:"https://glx.tw/iyNK4Y",annualAuto:"https://glx.tw/qwQRJD",annualOnce:"https://glx.tw/pbYMaM",studioOnce:"https://glx.tw/CjNdv3"},A={monthly:{auto:988,points:200},annual:{auto:6388,once:7388,autoPoints:1200,oncePoints:1100},studio:{auto:98e3,once:98e3,autoPoints:36e3,oncePoints:36e3}},S=[{v:"1.8.2",type:"新功能",text:"主動式 ETF，新增減碼排行榜。",source:6},{v:"1.8.1",type:"修正",text:"修正擺渡人關懷顯示邏輯。",source:6},{v:"1.8.0",type:"新功能",text:"新增擺渡成員關懷系統，整合客服窗口。",source:6},{v:"1.7.6",type:"修正",text:"個股基本資料加回說明，修正每日可用金額資料。",source:6},{v:"1.7.5",type:"新功能",text:"台美產業個股新增現金流指標。",source:6},{v:"1.7.1",type:"修正",text:"改善 iOS 26 播放進度條操作。",source:5},{v:"1.7.0",type:"新功能",text:"更新方舟擺渡人更換流程，整理通知與介面體驗。",source:5},{v:"1.6.8",type:"修正",text:"修正個人關注看板文章放大後的返回列表顯示。",source:4},{v:"1.6.7",type:"優化",text:"活動行事曆以不同熱點顏色區隔報名狀態。",source:4},{v:"1.6.6",type:"優化",text:"看板貼文支援圖片多選。",source:4},{v:"1.6.5",type:"新功能",text:"點擊看板頭像，可跳轉擺渡人清單。",source:4},{v:"1.6.4",type:"修正",text:"修正看板列表與個股討論頁為空時的閃退。",source:3},{v:"1.6.3",type:"優化",text:"台幣與美金閒錢數值可跨設備同步。",source:3},{v:"1.6.2",type:"修正",text:"修正權限、閃退與連線狀態問題。",source:3},{v:"1.6.1",type:"優化",text:"活動中心新增 Line 群資訊，改善看板與功能入口。",source:3},{v:"1.6.0",type:"新功能",text:"活動中心新增主題看板與個人看板。",source:2},{v:"1.5.0",type:"新功能",text:"方舟電台與直播收聽入口。",source:2},{v:"1.4.2",type:"新功能",text:"策略頁新增盤中折溢價排行。",source:1},{v:"1.4.1",type:"優化",text:"改善自選資訊與 ETF 共同持股體驗。",source:0},{v:"1.4.0",type:"新功能",text:"指數貢獻排行、方舟啟航及 ETF 共同持股策略。",source:0},{v:"1.3.7",type:"優化",text:"改善錯誤回應的提示訊息。",source:0},{v:"1.3.6",type:"修正",text:"修正庫存編輯表頭後未更新，策略績效預設顯示 120 天。",source:0}],U=[{n:"25",name:"從安裝到實作，讓想法開始成形。",label:"方舟運算・教學與共創基地",text:"由方舟運算團隊整合教學、實作與共創基地服務，從工具安裝到應用展示，提供交流與實作的場域，讓你的需求有地方展開。",tags:["方舟運算團隊","教學與實作","創業基地","交流與展示"],note:"教學、交流與空間使用依方案及預約安排。"},{n:"18",name:"你的產品，有技術底氣。",label:"百商數位・星系數位",text:"整合研發、資料庫、資安、後端與 API 資源，搭配開發工具、資料串接與技術支援，協助建立產品運作的技術基礎。",tags:["研發與開發工具","資料庫與資料串接","資安","後端與 API","技術支援"],note:"依產品需求與方案範圍，安排對應服務。"},{n:"17",name:"把內容，做出影響力。",label:"影音・專業協作・內容製作",text:"結合影音設備、專業協作與內容製作資源，從內容規劃到影音呈現，讓作品有清楚的表達。有計劃的參加者，可獲得 YouTube 經營與營利準備輔導。",tags:["影音製作","專業協作","內容製作","YouTube 經營"],note:"營利資格由平台審核，輔導不保證收益。"},{n:"15",name:"讓產品與專業，被更多人看見。",label:"數碼投顧・媒體與出版資源",text:"連結媒體、出版與雜誌相關資源，拓展品牌內容、採訪與出版合作的機會。另提供法務及投顧相關資源連結，依需求洽詢。",tags:["法務／投顧資源","媒體與雜誌","品牌內容","採訪與出版合作"],note:"各項專業服務依實際需求與約定範圍提供。"}],K=[{name:"我的工具",title:"把需要的資料，串成自己的工具。",desc:"透過 API 教學、策略程式規劃與設計協助，討論你需要的資料與應用；工程改版提案享優先受理與評估。",layers:["資料串接","API 應用","功能組合","我的工具"],screen:"資料 × 應用",foot:"資料串接與應用實作協助"},{name:"我的 App",title:"從產品想法，到 App 實作。",desc:"方舟運算團隊帶你理解製作方式與 App Store 上架流程。App 準備就緒即可安排上架協助，無須等滿一年。",layers:["產品需求","功能開發","介面整合","我的 App"],screen:"想法 → App",foot:"App 製作與上架指導"},{name:"我的營運",title:"把金流與客服，接進營運流程。",desc:"與方舟運算團隊討論金流串接、客服系統與營運流程，透過指導與實作，補上產品運作需要的環節。",layers:["服務流程","金流串接","客服系統","我的營運"],screen:"服務 × 營運",foot:"金流串接與客服系統輔導"},{name:"AI Agent",title:"離開現場，也能繼續實作。",desc:"針對 AI Agent 建置與相關應用需求，提供優先協助。從工作流程出發，運用 AI 與雪鴞 API，逐步延續現場的實作。",layers:["需求整理","建立工具","AI Agent 協作"],screen:"AI Agent",foot:"AI Agent 建置與應用優先協助"}],Re=[{version:"1.3.6",added:0,improved:1,fixed:1,source:0},{version:"1.3.7",added:0,improved:1,fixed:0,source:0},{version:"1.4.0",added:3,improved:3,fixed:1,source:0},{version:"1.4.1",added:0,improved:2,fixed:0,source:0},{version:"1.4.2",added:1,improved:6,fixed:1,source:1},{version:"1.5.0",added:1,improved:5,fixed:1,source:2},{version:"1.6.0",added:2,improved:0,fixed:6,source:2},{version:"1.6.1",added:0,improved:4,fixed:3,source:3},{version:"1.6.2",added:0,improved:0,fixed:4,source:3},{version:"1.6.3",added:0,improved:1,fixed:3,source:3},{version:"1.6.4",added:0,improved:0,fixed:1,source:3},{version:"1.6.5",added:1,improved:1,fixed:1,source:4},{version:"1.6.6",added:0,improved:2,fixed:2,source:4},{version:"1.6.7",added:0,improved:3,fixed:2,source:4},{version:"1.6.8",added:0,improved:0,fixed:1,source:4},{version:"1.7.0",added:1,improved:11,fixed:2,source:5},{version:"1.7.1",added:0,improved:1,fixed:1,source:5},{version:"1.7.5",added:3,improved:0,fixed:0,source:6},{version:"1.7.6",added:0,improved:0,fixed:2,source:6},{version:"1.8.0",added:1,improved:1,fixed:1,source:6},{version:"1.8.1",added:0,improved:0,fixed:1,source:6},{version:"1.8.2",added:1,improved:0,fixed:0,source:6}],I=Re.reduce((e,t)=>({added:e.added+t.added,improved:e.improved+t.improved,fixed:e.fixed+t.fixed}),{added:0,improved:0,fixed:0}),Ne=[{top:300,bottom:2390},{top:320,bottom:2520},{top:330,bottom:1960},{top:330,bottom:2460},{top:395,bottom:2460},{top:335,bottom:1990},{top:520,bottom:2430}],F=e=>{const t=Ne[e],a=t.bottom-t.top;return`<div class="record-crop" style="aspect-ratio:1230 / ${a}"><img src="${g(`/assets/releases/image${e}.png`)}" alt="方舟版本更新紀錄，已裁除手機狀態欄與商店導覽" width="1290" height="2796" draggable="false" loading="lazy" style="width:${1290/1230*100}%;left:${-30/1230*100}%;top:${-t.top/a*100}%"></div>`},Oe=e=>e==="修正"?"體驗提升":e,V=S,R=0,We=[["看得更完整","資料，持續擴充。","從 ETF 共同持股、指數貢獻排行，到現金流指標與主動式 ETF 減碼排行。","v1.4.0 → v1.8.2"],["連結更多內容","功能，持續擴展。","方舟電台、直播入口、主題看板與個人看板，讓資訊與交流更集中。","v1.5.0 → v1.6.0"],["用起來更順","細節，持續打磨。","圖片多選、活動報名狀態、播放操作與穩定性，逐次改善你每天的使用體驗。","v1.6.2 → v1.7.1"]],Ye=`
<section id="evolution" class="evolution" aria-labelledby="evolution-title">
 <div class="wrap evolution-head">
  <div>
   <p class="kicker" data-reveal>持續進化</p>
   <h2 id="evolution-title" class="split h-xl" data-reveal>${w("今天訂閱的方舟，","<em>明天還會更好。</em>")}</h2>
  </div>
  <p class="lead" data-reveal>你付的不只是現在的功能。<br>每一次更新，都為了更好用。</p>
 </div>
 <div class="wrap stats" data-reveal>
  <div class="stat"><strong data-count="${S.length}">${S.length}</strong><span>重要改版</span></div>
  <div class="stat"><strong data-count="${I.added}">${I.added}</strong><span>功能新增</span></div>
  <div class="stat"><strong data-count="${I.improved+I.fixed}">${I.improved+I.fixed}</strong><span>優化與修正</span></div>
 </div>
 <p class="wrap stats-note">統計自已收錄的 ${S.length} 個版本改版紀錄，並非完整年度統計。</p>
 <div class="wrap highlights">${We.map(([e,t,a,o],i)=>`<article data-reveal style="--i:${i}"><span>0${i+1} / ${e}</span><h3>${t}</h3><p>${a}</p><small>${o}</small></article>`).join("")}</div>
 <div class="wrap versions">
  <div class="versions-viewer" aria-hidden="true"><div class="handset"><div class="handset-screen" data-record-screen>${F(V[R].source)}</div></div><p>方舟 APP 原始版本紀錄</p></div>
  <div class="versions-list">
   <div class="versions-head"><h3>版本時間軸</h3><p class="versions-hint">選一個版本，看當時的原始紀錄。</p></div>
   <ol class="versions-track" aria-label="${S.length} 個版本的進化紀錄">${V.map((e,t)=>`<li><button type="button" class="version ${t===R?"is-active":""}" data-version="${t}" data-source="${e.source}" aria-pressed="${t===R}"><b>v${e.v}</b><span class="version-type type-${e.type==="新功能"?"new":e.type==="優化"?"tune":"fix"}">${Oe(e.type)}</span><span class="version-text">${e.text}</span><i aria-hidden="true">↗</i></button></li>`).join("")}</ol>
  </div>
 </div>
</section>
<dialog id="record-dialog" class="viewer viewer-narrow" aria-labelledby="record-title"><header><div><h3 id="record-title">方舟 APP 原始版本紀錄</h3></div><button type="button" class="viewer-close" data-close>關閉</button></header><div class="viewer-original record-original"></div></dialog>`,He=`
<section id="awakening" class="awakening" aria-labelledby="awakening-title">
 <div class="awakening-film"><img src="${g("/assets/v6/ark-awakening-v3-poster.jpg")}" alt="ARK 品牌能量畫面" loading="lazy" width="1280" height="720"><video data-film="once" muted playsinline preload="none" poster="${g("/assets/v6/ark-awakening-v3-poster.jpg")}" aria-label="ARK 品牌影片"><source src="${g("/assets/v6/ark-awakening-v3.mp4")}" type="video/mp4"></video><div class="awakening-shade" aria-hidden="true"></div></div>
 <div class="awakening-copy">
  <h2 id="awakening-title" data-reveal>喚醒你的方舟。</h2>
  <p data-reveal>把投資做穩之後，方舟還能陪你走得更遠——<br>從使用工具，到打造屬於自己的工具。</p>
 </div>
</section>`;function Be(){const e=n("[data-record-screen]"),t=m("[data-version]"),a=n("#record-dialog");let o=Number(t[R].dataset.source);t.forEach(i=>i.addEventListener("click",()=>{const s=Number(i.dataset.source);t.forEach(r=>{const c=r===i;r.classList.toggle("is-active",c),r.setAttribute("aria-pressed",String(c))}),z.matches?s!==o&&(o=s,e.innerHTML=F(s),e.scrollTop=0,e.classList.remove("is-swapped"),e.offsetWidth,e.classList.add("is-swapped")):(n(".record-original",a).innerHTML=F(s),a.showModal())})),n(".handset").addEventListener("click",()=>{n(".record-original",a).innerHTML=F(o),a.showModal()})}const Z=[{day:"週一",english:"MONDAY",topic:"寫作與出版",short:"寫作",title:`從社群文章，
展開你的出書計畫。`,description:"從社群貼文、觀點整理到出書計畫，與團隊討論你的個人內容方向，逐步把專業與經驗整理成作品。",details:[["社群經營","文章主題、內容寫作與經營討論"],["出書計畫","書稿架構、出版提案與洽談方向"]],image:"/assets/ark-mon-writing-r34.webp",alt:"講師以白板上的書稿帶領寫作討論，學員在桌邊記錄與交流",position:"50% 50%"},{day:"週二",english:"TUESDAY",topic:"API、研發與產品",short:"工程",title:`把你的需求，
整理成開發方向。`,description:"從想服務的使用者出發，與團隊討論網站、App、API 與 AI Agent，把想法整理成可實作的產品需求。工程提案依可行性與排程評估。",details:[["產品需求","目標使用者、功能需求與實作方向"],["第一版實作","討論可用工具與模組，逐步做出可展示的第一版；依需求安排 API、資料串接與回測實作示範。"]],image:"/assets/ark-tue-api-r34.webp",alt:"研發人員透過大螢幕檢視程式碼、API 測試與應用介面",position:"50% 50%"},{day:"週三",english:"WEDNESDAY",topic:"產業研究與趨勢",short:"產業",title:`一起研究產業，
看見下一步的方向。`,description:"每週三 15:00–16:00，與產業團隊深入研究產業變化與市場趨勢，帶著你的觀察一起交流。",details:[["朋友同行","請事先告知人數，以利確認座位。"],["無法到場","可詢問當日精華逐字稿。"]],image:"/assets/ark-wed-tea-r34.webp",alt:"三位參與者在下午茶桌邊，搭配產業資料與筆記交流",position:"50% 50%"},{day:"週四",english:"THURSDAY",topic:"影音與形象製作",short:"影音",title:`長短影音到直播，
找到你的呈現方式。`,description:"從長短影音、直播到形象內容，與團隊討論拍攝與製作方式，讓你的作品、產品與品牌有更清楚的呈現。",details:[["長短影音","內容企劃、拍攝與錄製討論"],["直播與形象","直播呈現、形象內容與製作討論"]],image:"/assets/ark-thu-video-r34.webp",alt:"攝影師使用腳架上的相機與麥克風，拍攝桌邊受訪者",position:"50% 50%"},{day:"週五",english:"FRIDAY",topic:"媒體曝光與採訪",short:"媒體",title:`把你的故事，
帶到媒體面前。`,description:"從媒體、Podcast、記者採訪到刊物，整理適合對外溝通的主題，與團隊討論曝光需求與合作方式。",details:[["媒體與 Podcast","採訪題材、節目主題與品牌故事"],["刊物合作","雜誌、週刊內容與出刊規劃"]],image:"/assets/ark-fri-publications-r34.webp",alt:"兩本以 ARK 為刊名的人物封面雜誌，呈現品牌內容與刊物合作方向",position:"50% 50%"}],H=[{name:"資料串接",title:"需要的資料，成為你的工具。",description:"從雪鴞包與雪鴞 API 出發，提供 API 教學、策略程式規劃與設計協助；工程改版需求享優先受理與評估。"},{name:"APP 上架",title:"從一個想法，到一支 APP。",description:"方舟運算團隊帶你製作 APP、理解上架流程。準備就緒即可安排上架協助，無須等滿一年；實際上架依平台審核結果辦理。"},{name:"金流與客服",title:"讓產品接得上營運。",description:"討論金流串接、客服系統與營運流程，透過指導和實作協助，釐清產品運作需要的環節。"}],Ue=[{name:"需求整理",title:"先選定，一件想完成的事。",description:"從你的素材、目標與工作方式出發，和團隊整理適合交給 AI 協助的任務。",items:["盤點手上的素材","拆解工作步驟","確認需要的協助"]},{name:"建立工具",title:"把需要的資料，接進流程。",description:"運用 AI 與雪鴞 API，討論資料如何串接、工具如何組合，再透過實作調整。",items:["選擇資料來源","規劃串接方式","測試與調整流程"]},{name:"AI Agent 協作",title:"離開現場，繼續你的計畫。",description:"把建立的工作流程帶回日常使用，檢視 AI 的輸出、補充素材，再帶著進度與團隊討論。",items:["延續日常實作","檢視與調整輸出","帶著進度再交流"]}],M=e=>e.replaceAll("App","APP").replaceAll("APP Store","App Store"),Ke=e=>`<ol class="pipe" style="--n:${e.length}">${e.map((t,a)=>`<li style="--i:${a}"><span>0${a+1}</span><b>${M(t)}</b></li>`).join("")}<i class="pipe-pulse" aria-hidden="true"></i></ol>`,Xe=e=>{const t=K[e],a=e<3?`<div class="track-support"><span>實作支援｜${H[e].name}</span><h4>${H[e].title}</h4><p>${H[e].description}</p></div>`:`<ol class="agent-steps">${Ue.map((o,i)=>`<li><span>0${i+1} ${o.name}</span><h4>${o.title}</h4><p>${o.description}</p><ul>${o.items.map(s=>`<li>${s}</li>`).join("")}</ul></li>`).join("")}</ol>`;return`<div class="track-panel ${e===0?"is-active":""}" role="tabpanel" id="track-panel-${e}" aria-labelledby="track-tab-${e}" tabindex="0" ${e?'inert aria-hidden="true"':""}>
  <div class="track-copy"><h3>${M(t.title)}</h3><p>${M(t.desc)}</p><small>${M(t.foot)}</small></div>
  <div class="track-visual">${Ke(t.layers)}${a}</div>
 </div>`},Qe=`
<section id="creator-journey" class="opener" aria-labelledby="opener-title">
 <div class="opener-bg" aria-hidden="true"><img src="${g("/assets/homepage/creator-horizon.png")}" alt="" loading="lazy" width="1672" height="941"><div class="opener-shade"></div></div>
 <div class="wrap opener-copy">
  <p class="chapter-tag is-gold" data-reveal><b>第二章</b><span>把想法做出來｜個人黑卡</span></p>
  <h2 id="opener-title" class="split h-xl" data-reveal>${w("啟動你的創業計畫，","<em>方舟陪你一起落實。</em>")}</h2>
  <p class="lead" data-reveal>資料、AI、APP 與創作資源，<br>接上你想完成的下一個計畫。</p>
  <ol class="route" data-reveal aria-label="從構想到實作的過程"><li><span>01</span>帶著想法</li><li><span>02</span>一起實作</li><li><span>03</span>累積作品</li></ol>
  <a class="text-link" href="#create" data-reveal>看看有哪些實作支援<i aria-hidden="true">↓</i></a>
 </div>
 <p class="opener-credit">空間為情境示意，非基地實景。</p>
</section>

<section id="create" class="create" aria-labelledby="create-title">
 <div class="wrap create-head">
  <div>
   <p class="kicker" data-reveal>個人黑卡｜共創基地</p>
   <h2 id="create-title" class="split h-xl" data-reveal>${w("從想法，","開始動手實作。")}</h2>
  </div>
  <div class="create-intro" data-reveal>
   <p>方舟運算團隊陪你釐清需求、安排適合的資源，透過主題交流與實作協助，逐步推進自己的作品、產品與事業。</p>
   <p><b>帶著書稿、影音企劃、應用構想或經營問題來，先選定一個最想完成的計畫。</b></p>
  </div>
 </div>
 <div class="wrap tracks" data-reveal>
  <div class="track-tabs" role="tablist" aria-label="選擇你想完成的事">${K.map((e,t)=>`<button type="button" role="tab" id="track-tab-${t}" aria-controls="track-panel-${t}" aria-selected="${t===0}" tabindex="${t===0?0:-1}"><small>0${t+1}</small>${M(e.name)}</button>`).join("")}</div>
  <div class="track-panels">${K.map((e,t)=>Xe(t)).join("")}</div>
 </div>
 <div class="wrap create-foot"><ol class="steps-line"><li>釐清你的需求</li><li>一起動手實作</li><li>帶著成果往前</li></ol><p>適合專業創作者、產品構想者、企業經營者，以及正在探索創業方向的夥伴。</p></div>
 <div id="delivery" class="wrap base">
  <figure class="base-photo" data-reveal><img src="${g("/assets/ark-creator-base-r34.webp")}" alt="創作者在基地內使用平板與筆電實作，並分組交流" loading="lazy" width="1536" height="1024"><figcaption>共享座位 · 創作者基地</figcaption></figure>
  <div class="base-copy">
   <p class="kicker" data-reveal>個人黑卡｜實作支援</p>
   <h3 class="split h-lg" data-reveal>${w("你想做的，","有了實現的資源。")}</h3>
   <p data-reveal>從資料串接、APP 製作到營運工具，與團隊整理使用需求、盤點可用工具與模組，逐步做出可展示的第一版。</p>
   <div class="base-note" data-reveal><h4>讓產品，也有開始的地方。</h4><p>方舟運算團隊整合教學、實作與交流。帶著問題和進度來，在依預約安排的基地空間中，一起推進自己的計畫。</p></div>
  </div>
 </div>
</section>

<section id="ecosystem" class="ecosystem" aria-labelledby="ecosystem-title">
 <div class="wrap ecosystem-head">
  <p class="kicker" data-reveal>個人黑卡｜團隊與空間</p>
  <h2 id="ecosystem-title" class="split h-xl" data-reveal>${w("四個樓層的專業，","<em>接上你的計畫。</em>")}</h2>
  <p class="lead" data-reveal>連結內容、技術、產業研究與媒體上的專業；各樓層資源依方案範圍與實際需求安排。</p>
 </div>
 <div class="wrap floors" data-reveal>
  <div class="floor-tabs" role="tablist" aria-label="樓層資源" aria-orientation="vertical">${U.map((e,t)=>`<button type="button" role="tab" id="floor-tab-${t}" aria-controls="floor-panel" aria-selected="${t===0}" tabindex="${t===0?0:-1}"><b>${e.n}<small>F</small></b><span>${["創作者基地","研發與技術支援","影音與內容製作","媒體與出版"][t]}</span></button>`).join("")}</div>
  <div class="floor-visual"><img src="${g("/assets/ark-open-floors-final.png")}" alt="創作者基地、工程、影音與媒體公關的四層資源概念" loading="lazy" width="1672" height="941">${U.map((e,t)=>`<button type="button" class="floor-band" data-band="${t}" tabindex="-1" aria-hidden="true"><span>${e.n}F</span></button>`).join("")}<small>方舟資源概念視覺</small></div>
  <div class="floor-info" id="floor-panel" role="tabpanel" aria-labelledby="floor-tab-0" aria-live="polite" tabindex="0"><div><span data-floor="label"></span><h3 data-floor="name"></h3></div><div><p data-floor="text"></p><div class="floor-tags" data-floor="tags"></div><small data-floor="note"></small></div></div>
 </div>
 <div class="wrap bridge" data-reveal><span>創業落實陪跑</span><h3>帶著進度來，一起找下一步。</h3></div>
</section>

<section id="program" class="program" aria-labelledby="program-title">
 <div class="wrap program-head">
  <div>
   <p class="kicker" data-reveal>個人黑卡｜每週計畫</p>
   <h2 id="program-title" class="split h-xl" data-reveal>${w("從內容創作到 APP 開發，","<em>週一到週五，陪你實作。</em>")}</h2>
  </div>
  <p class="lead" data-reveal>依需求參與，不需每天到場。<br>帶著問題與進度來就好。</p>
 </div>
 <div class="wrap week" data-reveal>
  <div class="week-tabs" role="tablist" aria-label="每週創業計畫">${Z.map((e,t)=>`<button type="button" role="tab" id="week-tab-${t}" aria-controls="week-panel-${t}" aria-selected="${t===0}" tabindex="${t===0?0:-1}" aria-label="${e.day} ${e.topic}"><span>${e.day}</span><b>${e.topic}</b><em aria-hidden="true">${e.short}</em></button>`).join("")}</div>
  <div class="week-panels">${Z.map((e,t)=>`<div class="week-panel ${t===0?"is-active":""}" role="tabpanel" id="week-panel-${t}" aria-labelledby="week-tab-${t}" tabindex="0" ${t?'inert aria-hidden="true"':""}>
   <div class="week-visual"><img src="${g(e.image)}" alt="${e.alt}" width="1536" height="1024" loading="lazy" decoding="async" style="object-position:${e.position}"></div>
   <div class="week-copy"><p class="week-day"><span>${e.day}</span><span lang="en">${e.english}</span></p><h3>${e.title.split(`
`).join("<br>")}</h3><p>${e.description}</p><dl>${e.details.map(([a,o])=>`<div><dt>${a}</dt><dd>${o}</dd></div>`).join("")}</dl></div>
  </div>`).join("")}</div>
 </div>
 <p class="wrap program-note">平日主題培育於 15:00 開始，週三產業交流為 15:00–16:00，其餘主題結束時間依活動安排。實際場次請至股東活動中心確認及報名。</p>
</section>`;function _e(){const e=n("#creator-journey");P(n(".opener-bg img",e),e,{scale:1.02,yPercent:-4},{scale:1.16,yPercent:4}),N(n(".tracks"),{auto:z.matches?7e3:0});const t=n(".floor-visual"),a=n("#floor-panel"),o=N(n(".floors"),{auto:6e3,onSelect:(r,c)=>{const b=U[r];n('[data-floor="label"]',a).textContent=b.label,n('[data-floor="name"]',a).textContent=b.name,n('[data-floor="text"]',a).textContent=b.text,n('[data-floor="note"]',a).textContent=b.note,n('[data-floor="tags"]',a).innerHTML=b.tags.map(y=>`<span>${y}</span>`).join(""),t.dataset.floor=String(r),a.classList.remove("is-swapped"),(c||a.dataset.ready)&&(a.offsetWidth,a.classList.add("is-swapped")),a.dataset.ready="1"}});m(".floor-band").forEach(r=>r.addEventListener("click",()=>o.select(Number(r.dataset.band),!0)));const i=n(".week");N(i,{auto:6500});const s=new IntersectionObserver(r=>{r.some(c=>c.isIntersecting)&&(m(".week-visual img",i).forEach(c=>{c.loading="eager"}),s.disconnect())},{rootMargin:"900px 0px"});s.observe(i)}const le=[{id:"team-line",title:"核心團隊專線｜提問優先處理",description:"透過 LINE 官方帳號提問，設定黑卡專屬標籤，由方舟運算核心團隊優先處理，盡力即時回應。"},{id:"installation",title:"方舟啟航｜申裝優先安排",description:"優先安排方舟啟航申裝服務。"},{id:"custom",title:"客製化服務｜依需求安排資源",description:"依你的目標，討論內容、技術或產品需求，確認服務範圍後安排資源。"},{id:"engineering",title:"工程改版提案優先評估",description:"釐清使用者需求，討論網站、App、API、UI／UX 與後台規格，盤點可用工具與模組，逐步推進可展示的第一版。工程提案享優先受理與評估，實際開發依可行性與排程確認。"},{id:"agent",title:"AI Agent 建置優先協助",description:"針對 AI Agent 建置及相關應用需求，提供優先協助。"},{id:"technical",title:"技術與策略教學｜協助建置與設定",description:"提供 API 教學、策略程式規劃與設計協助，討論如何運用財經資料打造自己的工具，並依需求安排 API、資料串接與回測實作示範；有需要時，也可協助 AI 工具安裝與設定。"},{id:"industry",title:"每週產業分析｜深度交流",description:"每週三 15:00–16:00，與產業團隊深度分析與交流。朋友同行請事先告知人數，以利確認座位；無法出席可詢問當日精華逐字稿。"},{id:"company",title:"公司創立與勞健保流程協助",description:"協助了解公司創立流程及勞健保相關事項；尚未投保者，可協助了解適用資格與辦理方式。"},{id:"events",title:"大型活動座位與餐敘優先安排",description:"每月各縣市大型活動，享優先保留座位與安排餐敘，並優先安排於方舟團隊鄰近座位。場次依活動公告。",note:"大型活動的保留座位與餐敘安排，依活動規則扣除點數。"},{id:"points",title:"點數兌換商品｜第一優先保留",description:"可使用點數兌換的商品，黑卡會員享第一優先保留。"}],de=[{id:"ferry",title:"優先成為方舟團隊擺渡子",description:"相關參與安排與方舟運算團隊確認。"},{id:"app-review",title:"自動化複盤",description:"包含方舟 App 的自動化複盤功能。"},{id:"app-trading",title:"AI 量化交易",description:"包含方舟 App 的 AI 量化交易功能。"},{id:"integration",title:"資料串接實作協助（雪鴞包與 API）",description:"透過雪鴞包與 API，協助資料串接實作。"},{id:"app",title:"App 製作與上架指導",description:"依專案確認的範圍，協助 App 製作、部署、上架操作及過程中的問題處理。App 準備就緒即可安排上架協助，無須等滿一年；實際上架依平台審核結果辦理。"},{id:"operations",title:"金流串接與客服系統輔導",description:"透過需求討論、指導與實作協助，釐清產品的付款、客服與營運流程。"},{id:"weekly",title:"每週主題聚會與專業指導",description:"週一寫作與出版、週二 API、研發與產品、週三產業研究、週四影音與形象製作、週五媒體與採訪。平日主題培育於 15:00 開始，週三產業交流為 15:00–16:00，其餘主題結束時間依活動安排。依需求參與，不需每天到場；實際場次請至股東活動中心確認。另有公司基金運作教學，了解公司資金與團隊福利規劃。"},{id:"room",title:"「Infinity 會議室」使用權",description:"使用方式依預約與服務安排確認。"},{id:"base",title:"方舟創業者基地空間",description:"提供交流與實作空間，依預約安排使用。"}],Ge=e=>[...le,...de].find(t=>t.id===e),ce=["team-line","installation","ferry","app-review","app-trading","custom","engineering","agent","technical","industry","app","integration","operations","company","weekly","events","points","room","base"],Je=Ge("events").note,Ve="以主題聚會、專業指導、需求討論與實作協助為核心；超出方案範圍的委託開發、製作及第三方費用另行報價。",Ze=`
  <section class="service-information section" id="enterprise-service-notes" aria-labelledby="service-notes-title">
    <h2 id="service-notes-title">服務與訂閱說明</h2>
    <div class="service-information-grid">
    <div class="enterprise-service-notes">
    <h3>個人黑卡</h3>
    <p>${Ve} 執行前會說明服務範圍、時程與費用，經你確認後安排。</p>
    <p>功能需求享有優先評估，實際開發依可行性與排程確認。出版、媒體刊登與 App 上架，依合作單位或平台審核結果辦理。</p>
    <p id="black-card-activity-note">${Je}</p>
    <details class="enterprise-service-details"><summary>查看參與及使用方式</summary><div>
      <p>基地空間與「Infinity 會議室」依預約安排，使用方式於預約前說明。</p>
      <p>平日主題培育於 15:00 開始，週三產業交流為 15:00–16:00，其餘主題結束時間依活動安排。實際場次請至股東活動中心確認及報名。基地服務時間不代表各主題活動的起訖時間。</p>
      <p>客製開發、委託製作、付費媒體刊登，以及平台帳號、API 或其他第三方費用，若未列入方案包含範圍，將另行說明及報價。</p>
    </div></details>
    </div>
    <div class="subscription-service-notes">
      <h3>訂閱與會員權益</h3>
      <p><b>會員服務依購買當日所選方案提供。</b> 網站內容更新不會自動變更既有訂單的服務內容。</p>
      <p><b>既有用戶</b> 可延續既有方案金額與會員點數；升級新方案需依適用規則補差額。</p>
      <p>金額以新臺幣計。自動續訂與一次付款依選定方式辦理；完整條款及服務範圍請以正式訂閱入口為準。</p>
      <p>月方案與年方案均含雪鴞 API 存取；個人黑卡另提供團隊協作、需求討論與實作支援。YouTube 輔導不保證平台審核或收益。</p>
      <div class="refund-policy" aria-labelledby="refund-policy-title">
        <h3 id="refund-policy-title">7 日確認期與退費原則</h3>
        <ol>
          <li>付款完成並開通服務後，本期 APP 權限即開始提供。</li>
          <li>自開通日起 7 日內，若未大量使用 APP 服務，且未使用會員點數兌換課程／活動，可申請取消本期方案並退費。</li>
          <li>超過 7 日後，本期方案視為正式生效，權限可使用至到期日。</li>
        </ol>
      </div>
    </div>
    </div>
    <div class="service-hours"><div><h3>基地服務時間</h3><p>週一至週五 <span>15:00–21:00</span></p></div><div><p>安裝、應用、提示詞大全。</p><p>至股東活動中心確認主題場次及報名。</p></div></div>
  </section>`,X=e=>[...le,...de].find(t=>t.id===e),ee=["自動化複盤","AI 量化交易","雪鴞 API 存取","持續提供的功能更新"],et=[["team-line","透過 LINE 官方帳號，由核心團隊優先處理。"],["installation","方舟啟航申裝服務，享優先安排。"],["agent","AI Agent 建置與相關應用，提供優先協助。"]],pe=["app-review","app-trading","integration"],tt={"app-review":"自動化複盤","app-trading":"AI 量化交易",integration:"雪鴞 API 存取"},te=ce.filter(e=>!pe.includes(e)),Q='<span class="tick" aria-hidden="true">✓</span>',C=`<td class="is-yes">${Q}<span class="sr-only">包含</span></td>`,ae='<td class="is-no"><span aria-hidden="true">—</span><span class="sr-only">不包含</span></td>';function se(e,t,a,o,i,s){return`<article class="plan" data-plan="${e}" data-reveal aria-label="${a}">
  <p class="plan-step">${t}</p>
  ${e==="annual"?'<span class="plan-badge" data-annual-value hidden>最划算</span>':""}
  <span class="plan-name">${a}</span><h3>${o}</h3><p class="plan-audience">${i}</p>
  ${e==="annual"?`<div class="billing" role="group" aria-label="${a}付款方式"><button type="button" aria-pressed="false" data-billing="auto">自動續訂</button><button type="button" aria-pressed="true" data-billing="once">一次付款</button></div>`:'<div class="billing-fixed">每月自動續訂</div>'}
  <div class="price"><small>NT$</small><strong></strong><span>／${e==="monthly"?"月":"年"}</span></div>
  <p class="points"><span class="points-cycle"></span><b></b><span>點會員點數</span></p>
  <p class="plan-app">方舟 APP 使用權限：調節、風控、布局自選與主題看板。</p>
  <ul>${s.map(r=>`<li>${Q}${r}</li>`).join("")}</ul>
  <a class="purchase" aria-disabled="true">訂閱連結即將開放</a><small class="billing-note"></small>
 </article>`}const at=`<article class="plan plan-black" data-plan="studio" data-reveal aria-label="個人黑卡">
 <div class="plan-black-glow" aria-hidden="true"></div>
 <p class="plan-step">03 ・ 共創</p>
 <span class="plan-name">個人黑卡</span><h3>你的計畫，有團隊陪你一起推進。</h3>
 <p class="plan-audience">帶著產品構想、內容作品或經營問題來，與方舟運算團隊討論需求，安排適合的資源。</p>
 <ul class="black-priorities">${et.map(([e,t])=>`<li>${Q}<div><h4>${X(e).title}</h4><p>${t}</p></div></li>`).join("")}</ul>
 <p class="black-more">另含資料串接、產品實作與基地交流等支援。<a href="#black-card-rights" data-open-rights>查看完整 19 項權益 ↗</a></p>
 <div class="black-checkout"><div class="billing-fixed">年方案</div><div class="price"><small>NT$</small><strong></strong><span>／年</span></div><p class="points"><span class="points-cycle"></span><b></b><span>點會員點數</span></p><a class="purchase purchase-gold" aria-disabled="true">訂閱連結即將開放</a><small class="billing-note"></small></div>
</article>`,st=`
<div class="compare" data-reveal>
 <div class="compare-head"><h3>三個方案，差在哪裡？</h3><p>月方案與年方案是投資工具；個人黑卡在這之上，多了一整個團隊。</p></div>
 <div class="compare-scroll"><table>
  <thead><tr><th scope="col"><span class="sr-only">項目</span></th><th scope="col">月方案</th><th scope="col">年方案</th><th scope="col" class="is-black">個人黑卡</th></tr></thead>
  <tbody>
   <tr class="compare-group"><th scope="rowgroup" colspan="4">費用與點數</th></tr>
   <tr><th scope="row">方案費用</th><td>NT$${x(A.monthly.auto)}<small>／月</small></td><td>NT$${x(A.annual.auto)}<small>／年・自動續訂</small><br>NT$${x(A.annual.once)}<small>／年・一次付款</small></td><td class="is-black">NT$${x(A.studio.once)}<small>／年</small></td></tr>
   <tr><th scope="row">會員點數</th><td>每月領 ${x(A.monthly.points)} 點</td><td>每年領 ${x(A.annual.autoPoints)} 點<small>（自動續訂）</small><br>一次領 ${x(A.annual.oncePoints)} 點<small>（一次付款）</small></td><td class="is-black">一次領 ${x(A.studio.oncePoints)} 點</td></tr>
   <tr><th scope="row">付款方式</th><td>每月自動續訂</td><td>自動續訂，或一次付款不續訂</td><td class="is-black">一次付款，不自動續訂</td></tr>
   <tr class="compare-group"><th scope="rowgroup" colspan="4">投資工具</th></tr>
   ${pe.map(e=>`<tr><th scope="row">${tt[e]}</th>${C}${C}${C.replace("is-yes","is-yes is-black")}</tr>`).join("")}
   <tr class="compare-group is-black-group"><th scope="rowgroup" colspan="4">個人黑卡專屬｜${te.length} 項團隊與資源</th></tr>
   ${te.map(e=>`<tr><th scope="row">${X(e).title}</th>${ae}${ae}${C.replace("is-yes","is-yes is-black")}</tr>`).join("")}
  </tbody>
 </table></div>
 <p class="compare-note">各項權益的完整說明與條件，請見下方「完整 19 項權益」與「服務與訂閱說明」。</p>
</div>`,it=`
<section id="plans" class="plans" aria-labelledby="plans-title">
 <div class="wrap plans-head">
  <p class="kicker" data-reveal>購買方案</p>
  <h2 id="plans-title" class="split h-xl" data-reveal>${w("從把投資做穩，","<em>到把事業做出來。</em>")}</h2>
  <p class="lead" data-reveal>從日常使用到打造產品，找到適合你的方案。</p>
 </div>
 <div class="wrap plan-grid">
  ${se("monthly","01 ・ 起步","月方案","先把方舟用起來。","適合希望按月使用的你",ee)}
  ${se("annual","02 ・ 日常","年方案","讓方舟成為日常工具。","適合持續使用方舟的你",[...ee,"一年完整使用週期"])}
  ${at}
 </div>
 <div class="wrap">${st}</div>
 <div class="wrap rights">
  <p class="rights-equipment">個人黑卡方案不包含 Mac 電腦。</p>
  <details id="black-card-rights"><summary><span>查看完整 19 項權益</span><i aria-hidden="true">＋</i></summary>
   <ol>${ce.map(e=>{const t=X(e);return`<li data-benefit="${t.id}"><h4>${t.title}</h4><p>${t.description}</p></li>`}).join("")}</ol>
  </details>
 </div>
</section>
${Ze}`,ot=`
<footer class="footer"><div class="wrap"><a class="brand" href="#home" aria-label="回到 ARK 方舟運算首頁"><span class="logo"><img src="${g("/assets/ark-logo.png")}" alt="ARK" width="56" height="56" loading="lazy"></span><span class="brand-name">方舟運算</span></a><span class="footer-line">從使用，到打造。</span><a class="footer-top" href="#home">回到頂端 ↑</a></div></footer>`;function ie(e,t){const a=e.dataset.plan;a==="studio"&&(t="once");const o=a==="monthly"?A.monthly.auto:A[a][t],i=a==="monthly"?A.monthly.points:A[a][t==="auto"?"autoPoints":"oncePoints"];n(".price strong",e).textContent=x(o),n(".points b",e).textContent=x(i),n(".points-cycle",e).textContent=a==="monthly"?"每月領":t==="auto"?"每年領":"一次領";const s=e.querySelector("[data-annual-value]");s&&(s.hidden=t!=="auto"),m("[data-billing]",e).forEach(y=>y.setAttribute("aria-pressed",String(y.dataset.billing===t))),n(".billing-note",e).textContent=t==="auto"?"依訂閱週期自動續訂":"一次付款，不自動續訂";const r=a==="monthly"?"monthly":a+(t==="auto"?"Auto":"Once"),c=n(".purchase",e),b=Fe[r];b?(c.href=b,c.target="_blank",c.rel="noopener",c.removeAttribute("aria-disabled"),c.textContent=a==="studio"?"選擇個人黑卡":"選擇方案"):(c.removeAttribute("href"),c.setAttribute("aria-disabled","true"),c.textContent="訂閱連結即將開放")}function nt(){m("[data-plan]").forEach(e=>{ie(e,e.dataset.plan==="monthly"?"auto":"once"),m("[data-billing]",e).forEach(t=>t.addEventListener("click",()=>ie(e,t.dataset.billing)))}),m("[data-open-rights]").forEach(e=>e.addEventListener("click",()=>{n("#black-card-rights").open=!0})),location.hash==="#black-card-rights"&&(n("#black-card-rights").open=!0)}document.documentElement.classList.add("js");document.querySelector("#app").innerHTML=`
${fe}
<main id="main">
${ye}
${Le}
${ze}
${qe}
${Me}
${Ye}
${He}
${Qe}
${it}
</main>
${ot}`;xe();Ee();De();Be();_e();nt();ge();he();ue();me();ve();
