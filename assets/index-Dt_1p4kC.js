(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const d of n)if(d.type==="childList")for(const p of d.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&s(p)}).observe(document,{childList:!0,subtree:!0});function a(n){const d={};return n.integrity&&(d.integrity=n.integrity),n.referrerPolicy&&(d.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?d.credentials="include":n.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function s(n){if(n.ep)return;n.ep=!0;const d=a(n);fetch(n.href,d)}})();const l=(e,t=document)=>t.querySelector(e),g=(e,t=document)=>Array.from(t.querySelectorAll(e)),$=e=>"./"+e.replace(/^\//,""),k=matchMedia("(prefers-reduced-motion: reduce)"),H=matchMedia("(min-width: 961px)"),L=(...e)=>e.map((t,a)=>`<span class="ln" style="--i:${a}"><span>${t}</span></span>`).join(""),I=e=>e.toLocaleString("en-US"),q=window.gsap,_=window.ScrollTrigger;q&&_&&q.registerPlugin(_);function S(e,t,a,s,n="top bottom",d="bottom top",p="(prefers-reduced-motion: no-preference)"){!q||!_||q.matchMedia().add(p,()=>{q.fromTo(e,a,{...s,ease:"none",scrollTrigger:{trigger:t,start:n,end:d,scrub:.6}})})}function Ae(){const e=g("[data-reveal]");if(k.matches||!("IntersectionObserver"in window)){e.forEach(a=>a.classList.add("is-in"));return}const t=new IntersectionObserver(a=>a.forEach(s=>{s.isIntersecting&&(s.target.classList.add("is-in"),t.unobserve(s.target))}),{threshold:.12,rootMargin:"0px 0px -7% 0px"});e.forEach(a=>t.observe(a)),k.addEventListener("change",()=>{k.matches&&e.forEach(a=>a.classList.add("is-in"))})}const N=e=>e.querySelectorAll("image[data-href]").forEach(t=>{t.setAttribute("href",t.dataset.href),t.removeAttribute("data-href")});function Le(){const e=new Set(g("image[data-href]").map(a=>a.ownerSVGElement).filter(a=>!!a));if(!("IntersectionObserver"in window)){e.forEach(N);return}const t=new IntersectionObserver(a=>a.forEach(s=>{s.isIntersecting&&(N(s.target),t.unobserve(s.target))}),{rootMargin:"1600px 0px"});e.forEach(a=>t.observe(a)),g("details").forEach(a=>a.addEventListener("toggle",()=>{a.open&&a.querySelectorAll("svg").forEach(N)}))}function Ee(){if(!!navigator.connection?.saveData)return;const t=o=>o.getClientRects().length>0,a=(o,v,i)=>new Promise(b=>{const u=()=>b();o.addEventListener(v,u,{once:!0}),o.addEventListener("error",u,{once:!0}),setTimeout(u,i)}),s=g('main svg, main img[loading="lazy"], main video[data-film]').filter(o=>!o.closest("details:not([open])")).map(o=>async()=>{if(t(o)){if(o instanceof SVGSVGElement){const v=o.querySelector("image[data-href]");if(!v)return;N(o),await a(v,"load",15e3)}else if(o instanceof HTMLImageElement){if(o.complete)return;o.loading="eager",await a(o,"load",15e3)}else if(o instanceof HTMLVideoElement){if(o.readyState>=4)return;o.preload="auto",(o.networkState===HTMLMediaElement.NETWORK_EMPTY||o.readyState===0)&&o.load(),await a(o,"canplaythrough",12e3)}}});let n=0;const d=async()=>{for(;n<s.length;){const o=s[n++];try{await o()}catch{}}},p=()=>{d(),d()};document.readyState==="complete"?setTimeout(p,400):addEventListener("load",()=>setTimeout(p,400),{once:!0})}const Ie=(e,t)=>{for(let a=0;a<e.buffered.length;a++)if(e.buffered.start(a)<=t+.15&&e.buffered.end(a)>t)return e.buffered.end(a)-t;return 0};function Q(e,t=e.currentTime,a=!1){if(e.readyState<3||!isFinite(e.duration))return!1;const s=e.duration-t,n=Ie(e,t);return n>=s-.3?!0:!a&&e.readyState>=4&&n>=Math.min(s,8)}const he=e=>!e.seeking&&!e.paused&&e.readyState<3&&!Q(e,e.currentTime,!0);function Pe(){const e=g("video[data-film]"),t=new Map,a=new WeakSet,s=i=>i.dataset.film==="once",n=i=>i.classList.contains("is-playing"),d=i=>{n(i)||!t.get(i)||i.paused||Q(i,s(i)?0:i.currentTime,a.has(i))&&(s(i)&&(i.currentTime=0),i.classList.add("is-playing"))},p=i=>{if(!(t.get(i)&&!document.hidden&&!k.matches&&i.dataset.hold!=="true")){i.pause();return}s(i)&&i.ended&&n(i)||(i.ended&&(i.currentTime=0),i.preload="auto",i.play().then(()=>d(i)).catch(()=>{}))},o=new IntersectionObserver(i=>i.forEach(b=>{const u=b.target;t.set(u,b.isIntersecting&&b.intersectionRatio>=.2),p(u)}),{threshold:[0,.2,.5]});e.forEach(i=>{i.muted=!0,i.playsInline=!0,["progress","canplaythrough","playing"].forEach(b=>i.addEventListener(b,()=>d(i))),i.addEventListener("waiting",()=>setTimeout(()=>{!n(i)||!he(i)||(a.add(i),i.classList.remove("is-playing"))},300)),i.addEventListener("ended",()=>{(!s(i)||!n(i))&&(i.currentTime=0,p(i))}),i.addEventListener("error",()=>{i.hidden=!0}),o.observe(i)});const v=()=>e.forEach(p);document.addEventListener("visibilitychange",v),k.addEventListener("change",v),document.addEventListener("films:sync",v)}function ze(){const e=new IntersectionObserver(t=>t.forEach(a=>{if(!a.isIntersecting)return;e.unobserve(a.target);const s=a.target,n=Number(s.dataset.count);if(k.matches)return;const d=performance.now(),p=o=>{const v=Math.min((o-d)/1400,1);s.textContent=String(Math.round(n*(1-Math.pow(1-v,3)))),v<1&&requestAnimationFrame(p)};requestAnimationFrame(p)}),{threshold:.6});g("[data-count]").forEach(t=>e.observe(t))}function je(){const e=new IntersectionObserver(a=>a.forEach(s=>s.target.classList.toggle("motion-away",!s.isIntersecting)),{rootMargin:"120px 0px"});g("main > section, main > .ticker").forEach(a=>e.observe(a));const t=()=>document.documentElement.classList.toggle("page-away",document.hidden);document.addEventListener("visibilitychange",t),t()}function Y(e,{auto:t=0,onSelect:a}={}){const s=e.querySelector('[role="tablist"]'),n=Array.from(s.querySelectorAll('[role="tab"]')),d=n.map(r=>document.getElementById(r.getAttribute("aria-controls")||"")).filter(r=>!!r),p=new Set(d).size===1;let o=0,v=!1,i=!1,b=!1,u=0;const c=()=>t>0&&v&&!i&&!b&&!document.hidden&&!k.matches,h=()=>{clearTimeout(u),e.classList.toggle("is-auto",c()),c()&&(u=window.setTimeout(()=>y((o+1)%n.length),t))};function y(r,f=!1){o=r,f&&(b=!0),n.forEach((m,w)=>{const x=w===r;m.setAttribute("aria-selected",String(x)),m.tabIndex=x?0:-1,m.classList.remove("is-timing"),x&&(m.offsetWidth,m.classList.add("is-timing"))}),p?d[0]?.setAttribute("aria-labelledby",n[r].id):d.forEach((m,w)=>{const x=w===r;m.classList.toggle("is-active",x),m.inert=!x,m.setAttribute("aria-hidden",String(!x))}),e.style.setProperty("--tab-index",String(r)),e.dataset.tab=String(r),a?.(r,f),h()}return n.forEach((r,f)=>r.addEventListener("click",()=>y(f,!0))),s.addEventListener("keydown",r=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(r.key))return;r.preventDefault();const f=r.key==="Home"?0:r.key==="End"?n.length-1:(o+(["ArrowRight","ArrowDown"].includes(r.key)?1:-1)+n.length)%n.length;y(f,!0),n[f].focus({preventScroll:!0})}),e.style.setProperty("--tab-time",`${t}ms`),t&&(new IntersectionObserver(r=>{v=r[0].isIntersecting,h()},{threshold:.35}).observe(e),e.addEventListener("pointerenter",()=>{i=!0,h()}),e.addEventListener("pointerleave",()=>{i=!1,h()}),e.addEventListener("focusin",()=>{b=!0,h()}),document.addEventListener("visibilitychange",h),k.addEventListener("change",h)),y(0),{select:y}}function Se(){g("dialog").forEach(e=>{e.addEventListener("click",t=>{t.target===e&&e.close()}),g("[data-close]",e).forEach(t=>t.addEventListener("click",()=>e.close()))})}const te=[["#workflow","功能介紹"],["#quant-proof","量化實戰"],["#stories","用戶回饋"],["#companionship","擺渡人陪伴"],["#evolution","持續進化"],["#creator-journey","個人黑卡"]],Te=`
<a class="skip" href="#main">跳至主要內容</a>
<header class="nav" id="nav">
 <a class="brand" href="#home" aria-label="ARK 方舟運算首頁"><span class="logo"><img src="${$("/assets/ark-logo.png")}" alt="ARK" width="56" height="56"></span><span class="brand-name">方舟運算</span></a>
 <nav class="nav-links" aria-label="主要導覽">${te.map(([e,t])=>`<a href="${e}">${t}</a>`).join("")}</nav>
 <a class="btn btn-light nav-cta" href="#plans">購買方案</a>
 <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-menu" aria-label="開啟選單"><span></span><span></span></button>
 <div class="nav-progress" aria-hidden="true"><i></i></div>
</header>
<div class="nav-menu" id="nav-menu" hidden><nav aria-label="行動版導覽">${te.map(([e,t],a)=>`<a href="${e}"><small>0${a+1}</small>${t}</a>`).join("")}<a class="btn btn-light" href="#plans">購買方案</a></nav></div>`,U=(e,t,a,s,n)=>`
 <figure class="device device-${e}"><div class="device-rise"><div class="device-float"><div class="device-body"><svg viewBox="0 ${s} 1264 2560" preserveAspectRatio="xMidYMin slice" role="img" aria-label="${a}"><image href="${$(t)}" y="${s}" width="1264" height="2560"/></svg><span class="device-glare" aria-hidden="true"></span></div></div></div><figcaption>${n}</figcaption></figure>`,Me=["買了就下跌。","賣了又起漲。","不知道下一步怎麼做？"],qe=`
<section id="home" class="hero">
 <div class="hero-bg" aria-hidden="true">
  <picture><source media="(max-width: 900px)" srcset="${$("/assets/homepage/hero-bay-mobile-poster.jpg")}"><img src="${$("/assets/homepage/hero-bay-poster.jpg")}" alt="" fetchpriority="high" width="1280" height="720"></picture>
  <video class="hero-film" muted playsinline loop preload="none"></video>
  <div class="hero-shade"></div>
 </div>
 <div class="hero-inner wrap">
  <div class="hero-copy">
   <p class="kicker hero-kicker" data-reveal>ARK 方舟運算・台美股量化系統</p>
   <h1 class="split" data-reveal>${L("你常為投資","擔心嗎？")}</h1>
   <p class="sr-only">每次買了就下跌、賣了又起漲，完全不知道下一步怎麼做？</p>
   <p class="hero-pain" data-reveal aria-hidden="true"><span class="rotor">${Me.map((e,t)=>`<span class="${t===0?"is-on":""}">${e}</span>`).join("")}</span></p>
   <div class="hero-cta" data-reveal><a class="btn btn-light" href="#workflow">看看方舟怎麼幫你<i aria-hidden="true">↓</i></a><a class="btn btn-ghost" href="#plans">直接看方案</a></div>
  </div>
  <div class="hero-phones" aria-label="方舟 APP 實際畫面：入選策略績效、風控運算與主動式 ETF">
   <div class="hero-halo" aria-hidden="true"></div>
   ${U("left","/assets/display/hero-strategy.webp","美光科技入選策略績效，包含報價與完整圖表",55,"入選策略績效")}
   ${U("right","/assets/display/hero-etf.webp","主動式 ETF 持股異動",100,"主動式 ETF")}
   ${U("center","/assets/display/hero-risk.webp","風控運算與資金配置",30,"風控運算")}
  </div>
 </div>
</section>`;function Ce(){const e=l("#nav"),t=l("#nav-menu"),a=l(".nav-toggle"),s=l(".nav-progress i"),n=c=>{t.hidden=!c,a.setAttribute("aria-expanded",String(c)),a.setAttribute("aria-label",c?"關閉選單":"開啟選單"),document.documentElement.classList.toggle("menu-open",c)};a.addEventListener("click",()=>n(t.hidden)),g("a",t).forEach(c=>c.addEventListener("click",()=>n(!1))),addEventListener("keydown",c=>{c.key==="Escape"&&!t.hidden&&(n(!1),a.focus())}),H.addEventListener("change",()=>{H.matches&&n(!1)});let d=!1;const p=()=>{d=!1;const c=document.documentElement.scrollHeight-innerHeight;e.classList.toggle("is-scrolled",scrollY>24),s.style.transform=`scaleX(${c>0?Math.min(1,scrollY/c):0})`};addEventListener("scroll",()=>{d||(d=!0,requestAnimationFrame(p))},{passive:!0}),addEventListener("resize",p),p();const o=g(".nav-links a"),v=[["#workflow",["workflow"]],["#quant-proof",["quant-proof"]],["#stories",["stories"]],["#companionship",["companionship"]],["#evolution",["evolution","awakening"]],["#creator-journey",["creator-journey","create","ecosystem","program"]]],i=new Set,b=()=>{const c=v.find(([,h])=>h.some(y=>i.has(y)))?.[0];o.forEach(h=>h.getAttribute("href")===c?h.setAttribute("aria-current","true"):h.removeAttribute("aria-current"))},u=new IntersectionObserver(c=>{c.forEach(h=>h.isIntersecting?i.add(h.target.id):i.delete(h.target.id)),b()},{rootMargin:"-45% 0px -50% 0px"});v.flatMap(([,c])=>c).forEach(c=>{const h=document.getElementById(c);h&&u.observe(h)})}function De(){const e=l("#home"),t=l(".hero-film",e),a=matchMedia("(max-width: 900px)"),s=()=>!!navigator.connection?.saveData,n=()=>$(a.matches?"/assets/homepage/hero-bay-mobile-loop.mp4":"/assets/homepage/hero-bay-loop.mp4");let d=!1;const p=()=>{if(k.matches||s()||!d||document.hidden){t.pause();return}t.getAttribute("src")!==n()&&(t.classList.remove("is-playing"),t.preload="auto",t.src=n()),t.play().catch(()=>{})};let o=!1;const v=()=>{!t.paused&&Q(t,t.currentTime,o)&&t.classList.add("is-playing")};["playing","canplaythrough","progress"].forEach(i=>t.addEventListener(i,v)),t.addEventListener("waiting",()=>setTimeout(()=>{he(t)&&(o=!0,t.classList.remove("is-playing"))},300)),t.addEventListener("error",()=>t.classList.remove("is-playing")),new IntersectionObserver(i=>{d=i[0].isIntersecting,p()},{threshold:.1}).observe(e),document.addEventListener("visibilitychange",p),k.addEventListener("change",p),a.addEventListener("change",p)}function Fe(){const e=g(".rotor span");let t=0;k.matches||setInterval(()=>{if(document.hidden||l("#home").classList.contains("motion-away"))return;e[t].classList.remove("is-on"),e[t].classList.add("is-out");const a=e[t];setTimeout(()=>a.classList.remove("is-out"),700),t=(t+1)%e.length,e[t].classList.add("is-on")},2600)}function Oe(){const e=l("#home"),t=l(".hero-phones",e);requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.add("is-entered")));const a=matchMedia("(hover: hover) and (pointer: fine)");let s=!1,n=0,d=0;e.addEventListener("pointermove",p=>{if(!a.matches||!H.matches||k.matches)return;const o=e.getBoundingClientRect();n=(p.clientX-o.left)/o.width-.5,d=(p.clientY-o.top)/o.height-.5,s||(s=!0,requestAnimationFrame(()=>{s=!1,t.style.setProperty("--mx",n.toFixed(3)),t.style.setProperty("--my",d.toFixed(3))}))}),e.addEventListener("pointerleave",()=>{t.style.setProperty("--mx","0"),t.style.setProperty("--my","0")}),S(l(".hero-copy",e),e,{yPercent:0,opacity:1},{yPercent:-12,opacity:.15},"top top","bottom 35%"),S(g(".device-left,.device-right",e),e,{yPercent:0},{yPercent:-16},"top top","bottom top","(prefers-reduced-motion: no-preference) and (min-width: 961px)"),S(l(".device-center",e),e,{yPercent:0},{yPercent:-7},"top top","bottom top","(prefers-reduced-motion: no-preference) and (min-width: 961px)"),S(l(".hero-bg picture",e),e,{scale:1},{scale:1.12},"top top","bottom top")}function Re(){Ce(),De(),Fe(),Oe()}const ae=["我該賣哪一檔？","今天該買多少？","現在適合再加碼嗎？","現在買會不會太貴？","跌了要不要先賣掉？","漲了還要繼續買嗎？","閒錢要留多少在身上？"],W=[{name:"調節",screen:"調節庫存",question:["想調節持股，","先看哪一檔？"],value:"調節之前，先看位階。",description:"先看每一檔的位階，再看建議調節的金額與股數。生活要用的錢，也能一起算進去。",quote:"",file:"step-adjust.webp",y:925,h:830,alt:"調節庫存中美光、蘋果與群益台灣精選高息的位階、建議調節金額與股數"},{name:"風控",screen:"風控運算",question:["下一筆資金，","該怎麼投入？"],value:"先看建議配置，再決定投入多少。",description:"先看市場指標與持股配置建議，再對照目前持股與可用資金，得到建議布局金額。",quote:"",file:"",y:0,h:640,alt:"方舟風控運算錄影：持股配置建議與五項市場指標"},{name:"布局自選",screen:"布局自選",question:["選好標的，","要買多少？"],value:"買多少，不用再靠感覺。",description:"先從台美股自選清單看位階、即時淨值與折溢價，再看位階股數與風控股數。",quote:"讓我在進場時更有信心，也比較不會有『買貴、追高或被套牢』的焦慮",file:"step-layout.webp",y:440,h:830,alt:"布局自選中永豐台灣ESG、群益半導體收益與主動統一台股增長的位階與股數"},{name:"復盤・交流",screen:"主題看板",question:["操作之後，","有問題找誰討論？"],value:"先更新紀錄，想不通的再拿出來問。",description:"把操作心得和遇到的問題帶到主題看板，看看夥伴怎麼想，也分享自己的做法。",quote:"",file:"step-community.webp",y:570,h:895,alt:"方舟主題看板中投資心法與產業討論的真實介面"}],me=e=>`<image data-href="${$("/assets/display/"+e.file)}" y="${e.y}" width="1264" height="${e.h}"/>`,K=(e,t="")=>`<svg class="shot" viewBox="0 ${e.y} 1264 ${e.h}" role="img" aria-label="${e.alt}">${me(e)}${t}</svg>`;function se(e){const t=W[e];let a="";return e===0&&(a=`<div class="shot-box" style="width:100%;aspect-ratio:1264/830">${K(t)}<span class="shot-dim" aria-hidden="true"></span><div class="lift" aria-hidden="true"><div class="lift-float"><svg viewBox="440 933 552 814">${me(t)}</svg></div></div></div>`),e===1&&(a=`<div class="shot-box" style="width:92.9%;aspect-ratio:874/640"><video class="risk-film" data-film="loop" muted playsinline loop preload="none" poster="${$("/assets/v37/risk-demo-poster.jpg")}" aria-label="${t.alt}"><source src="${$("/assets/v37/risk-demo.mp4")}" type="video/mp4"></video></div>`),e===2&&(a=`<div class="shot-box" style="width:100%;aspect-ratio:1264/830">${K(t,'<path class="focus-dim" fill-rule="evenodd" d="M0 440H1264V1270H0Z M973 448h265a18 18 0 0 1 18 18v778a18 18 0 0 1-18 18h-265a18 18 0 0 1-18-18v-778a18 18 0 0 1 18-18Z"/><rect class="focus-rect" x="955" y="448" width="301" height="814" rx="18"/>')}<svg class="guide-arrow" viewBox="0 0 64 64" aria-hidden="true"><path d="M8 20 L30 20 L30 6 L58 32 L30 58 L30 44 L8 44 Z"/></svg></div>`),e===3&&(a=`<div class="shot-box" style="width:96.1%;aspect-ratio:1264/895">${K(t,'<g class="marks" aria-hidden="true"><path pathLength="1" d="M 537 1175 Q 745 1182 977 1175"/><path pathLength="1" d="M 206 1238 Q 445 1244 700 1237"/></g>')}</div>`),`<figure class="frame frame-${e}"><div class="frame-bar"><span>方舟運算</span><b>${t.screen}</b></div><div class="frame-view">${a}</div></figure>`}const Ne=`
<section id="workflow" class="flow" aria-labelledby="workflow-title">
 <div class="asks">
  <p class="sr-only">投資人常問自己：${ae.join("")}</p>
  <div class="asks-row" aria-hidden="true"><div class="asks-track">${[0,1].map(()=>ae.map(e=>`<span class="ask">${e}</span>`).join("")).join("")}</div></div>
 </div>
 <div class="wrap flow-head">
  <p class="chapter-card" data-reveal><span>第一章</span><b>使用</b></p>
  <h2 id="workflow-title" class="split h-xl" data-reveal>${L("<em>買賣之前，</em>",'<span class="gold">先有依據。</span>')}</h2>
  <p class="lead" data-reveal>投資最讓人焦慮的，是四個得自己決定的步驟。<br>方舟在每一個步驟，讓你看得見下一步。</p>
 </div>
 <nav class="flow-nav" aria-label="四個決策步驟"><div class="wrap">${W.map((e,t)=>`<a href="#step-${t}" data-step-link="${t}"><span>0${t+1}</span>${e.name}</a>`).join("")}<i class="flow-nav-bar" aria-hidden="true"></i></div></nav>
 <div class="wrap flow-body">
  <div class="flow-steps">${W.map((e,t)=>`
   <article id="step-${t}" class="step" data-step="${t}" aria-labelledby="step-q-${t}">
    <p class="step-no"><span>步驟 0${t+1}</span>${e.name}</p>
    <h3 id="step-q-${t}">${e.question.join("<br>")}</h3>
    <p class="step-copy"><b>${e.value}</b>${e.description}</p>
    ${e.quote?`<figure class="step-quote"><blockquote>「${e.quote}」</blockquote><figcaption>用戶 Shqnn 使用回饋</figcaption></figure>`:""}
    <div class="step-figure">${se(t)}</div>
   </article>`).join("")}
  </div>
  <aside class="flow-stage" aria-label="隨閱讀進度切換的方舟運算畫面"><div class="flow-stage-inner">${W.map((e,t)=>`<div class="stage-panel ${t===0?"is-active":""}" data-panel="${t}" ${t?'inert aria-hidden="true"':""}>${se(t)}</div>`).join("")}</div></aside>
 </div>
 <div class="bridge">
  <div class="wrap">
   <p class="bridge-line">當四個步驟，都有依據了</p>
  </div>
 </div>
</section>`;function We(){const e=l(".asks"),t=g(".ask",e);if(k.matches){t[2].classList.add("is-on");return}let a=!1,s=null;const n=()=>{if(!a||document.hidden)return;const d=innerWidth/2;let p=null,o=1/0;t.forEach(v=>{const i=v.getBoundingClientRect(),b=Math.abs(i.left+i.width/2-d);b<o&&(o=b,p=v)}),p!==s&&(s?.classList.remove("is-on"),p?.classList.add("is-on"),s=p)};new IntersectionObserver(d=>{a=d[0].isIntersecting,n()}).observe(e),setInterval(n,140)}function Be(){We();const e=l(".bridge");if(k.matches)e.classList.add("is-live");else{const u=new IntersectionObserver(c=>{c[0].isIntersecting&&(e.classList.add("is-live"),u.disconnect())},{rootMargin:"-34% 0px -34% 0px"});u.observe(e)}const t=l("#workflow"),a=g("[data-step]",t),s=g("[data-step-link]",t),n=g("[data-panel]",t),d=l(".flow-nav-bar",t);let p=-1;function o(u){u!==p&&(p=u,s.forEach((c,h)=>h===u?c.setAttribute("aria-current","step"):c.removeAttribute("aria-current")),a.forEach((c,h)=>c.classList.toggle("is-current",h===u)),n.forEach((c,h)=>{const y=h===u;c.classList.toggle("is-active",y),c.inert=!y,c.setAttribute("aria-hidden",String(!y))}),d.style.transform=`translateX(${u*100}%)`,g(".risk-film",t).forEach(c=>{c.dataset.hold=String(!!c.closest(".flow-stage")&&u!==1)}),document.dispatchEvent(new Event("films:sync")))}const v=new Map,i=new IntersectionObserver(u=>{u.forEach(y=>v.set(y.target,y.isIntersecting?y.intersectionRatio:0));let c=-1,h=0;a.forEach((y,r)=>{const f=v.get(y)||0;f>h&&(h=f,c=r)}),c>=0&&o(c)},{rootMargin:"-38% 0px -38% 0px",threshold:[0,.2,.5,.8,1]});a.forEach(u=>i.observe(u)),s.forEach((u,c)=>u.addEventListener("click",h=>{h.preventDefault(),a[c].scrollIntoView({block:H.matches?"center":"start",behavior:k.matches?"auto":"smooth"}),history.replaceState(null,"",u.hash)}));const b=new IntersectionObserver(u=>u.forEach(c=>{c.isIntersecting&&c.intersectionRatio>=.72?c.target.classList.add("is-seen"):(!c.isIntersecting||c.intersectionRatio<=.05)&&c.target.classList.remove("is-seen")}),{threshold:[0,.05,.72]});g(".frame",t).forEach(u=>b.observe(u)),o(0)}const P=[{id:"new-47",file:"new-220147.jpg",market:"美股",state:"realized",label:"已實現損益",date:"",currency:"USD",size:[1178,871],view:"0 0 1178 871",post:"",person:""},{id:"new-03",file:"new-220103.jpg",market:"美股",state:"realized",label:"已實現損益",date:"",currency:"USD",size:[1179,1215],view:"0 300 1179 915",post:"",person:""},{id:"new-00",file:"new-220100.jpg",market:"台股",state:"realized",label:"已實現損益",date:"",currency:"TWD",size:[1179,1375],view:"0 300 1179 1075",post:"",person:""},{id:"new-24",file:"new-220124.jpg",market:"美股",state:"unspecified",label:"交易損益紀錄",date:"",currency:"USD",size:[1206,1523],view:"0 0 1206 1523",post:"",person:""},{id:"record-2",file:"v31-statement-002.jpg",market:"台股",state:"realized",label:"已實現損益",date:"",currency:"TWD",size:[1179,1901],view:"0 0 1179 1901",post:"",person:""},{id:"record-70",file:"v31-statement-070.jpg",market:"美股",state:"realized",label:"已實現損益",date:"",currency:"USD",size:[1264,881],view:"0 0 1264 881",post:"",person:""},{id:"record-23",file:"v31-statement-023.jpg",market:"美股",state:"inventory",label:"庫存預估損益",date:"",currency:"USD",size:[1206,816],view:"0 0 1206 816",post:"",person:""},{id:"record-48",file:"v31-statement-048.jpg",market:"美股",state:"inventory",label:"庫存預估損益",date:"",currency:"TWD",size:[1100,1488],view:"0 0 1100 1488",post:"",person:""},{id:"record-5",file:"v31-statement-005.jpg",market:"台股",state:"realized",label:"已實現損益",date:"",currency:"TWD",size:[1206,1997],view:"0 0 1206 1997",post:"",person:""},{id:"record-4",file:"v31-statement-004.jpg",market:"台股",state:"realized",label:"已實現損益",date:"",currency:"TWD",size:[1284,2196],view:"0 0 1284 2196",post:"",person:""},{id:"record-8",file:"v31-statement-008.jpg",market:"台股",state:"realized",label:"已實現損益",date:"",currency:"TWD",size:[1284,2196],view:"0 0 1284 2196",post:"",person:""},{id:"record-12",file:"v31-statement-012.jpg",market:"台股",state:"inventory",label:"庫存參考損益",date:"",currency:"TWD",size:[1206,596],view:"0 0 1206 596",post:"",person:""},{id:"record-24",file:"v31-statement-024.jpg",market:"美股",state:"inventory",label:"庫存預估損益",date:"",currency:"USD",size:[1080,697],view:"0 0 1080 697",post:"",person:""},{id:"record-72",file:"v31-statement-072.jpg",market:"美股",state:"inventory",label:"庫存預估損益",date:"",currency:"TWD",size:[1263,880],view:"0 0 1263 880",post:"",person:""}],He=[{id:"mailey-inventory",file:"08-mailey-inventory.jpg",market:"未標示",state:"inventory",label:"庫存累積損益",date:"",currency:"TWD",size:[1197,300],view:"0 0 1197 300",post:"mailey-post.jpg",person:"麥莉"},{id:"tcl-realized",file:"09-tcl-realized.jpg",market:"台股",state:"realized",label:"已實現損益",date:"",currency:"TWD",size:[1246,1225],view:"0 625 1246 600",post:"tcl-post.jpg",person:"TCL"}],Ye=`我是今年一月份開始使用「方舟運算」這個 APP 的。一開始是因為收到用戶邀請，參加了一場免費講座，在講座中初步了解這套系統的運作邏輯後，就決定開始訂閱使用。


實際使用之後，對我在投資上的改變其實滿大的。以前我買 ETF 比較偏向分散、長期領股息，但沒有一個明確的比較依據，也不太會去調整配置或選股。透過方舟運算，我可以清楚比較不同 ETF 之間的報酬表現，並且做出相對客觀的判斷。因此在年初的時候，我透過 APP 比較報酬功能，依照績效做了一次性的定期定額 ETF 調整。

另外一個很大的收穫，是學會「調節」。過去我其實是買了股票或 ETF 之後就長期放著，不太知道什麼時候該調整，導致資金沒有流動性。使用這個 APP 之後，它會提供一些位階與趨勢的判斷，讓我知道哪些標的已經在相對高點或升溫，可以適時調節，釋放資金去做更好的配置。原本我的庫存水位偏高，但經過幾次調整之後，現在已經維持在一個比較可控的水位，保留部分資金可以再參與市場。

除了 APP 本身，我也參加了一次方舟的免費實體講座。講座結束後，還有提供一對一指導諮詢，教練花了大約半小時，很細心地針對我的狀況給建議，真的很用心！在那場課程中，大概有十位學員，只有兩位沒有投資美股，而我剛好就是其中之一，也因為這樣，讓我開始學習了美股。

過年之後，我正式開始複委託投入美股，並採用「100 元美股戰法」慢慢建立部位。雖然近期市場波動比較大，但透過價值區的概念去選股，還是有獲利，例如上週調節了 PL，就是從美股價值區選出來的。

現在我幾乎每天早上通勤時，都會先用 APP 看台股 ETF 的淨值，然後依照合理價格去掛單，讓我在進場時更有信心，也比較不會有「買貴、追高或被套牢」的焦慮，也因此在上週終止了所有定期定額的投資，因為定期定額可能會買到溢價的股票，決定在習慣依照 APP 淨值的操作後，在三個月不到的時間內做了這個重大的改變。

整體來說，方舟運算對我最大的幫助，不只是提供數據參考，而是幫助我建立了一套更有紀律、有邏輯的投資方式～`,M="/assets/v6/",Ue=["new-00","new-03","new-47","record-2","record-70","record-23"],Ke=e=>`${e.market} · ${e.label}`,ie=(e,t)=>`<button type="button" class="tile" data-proof="${e.id}" style="--i:${t%6};--col:${t%3-1}" aria-label="查看${e.market}${e.label}原始截圖"><span class="tile-shot"><svg viewBox="${e.view}" preserveAspectRatio="xMidYMin slice" role="img" aria-label="${e.market}${e.label}原始截圖"><image data-href="${$(M+e.file)}" width="${e.size[0]}" height="${e.size[1]}"/></svg></span><span class="tile-cap"><span><b>${e.market}</b>${e.label}<small>${e.currency}</small></span><i aria-hidden="true">↗</i></span></button>`,Ve=`
<section id="quant-proof" class="proof" aria-labelledby="quant-title">
 <div class="band">
  <div class="band-media"><img src="${$("/assets/v42/quant-code.jpg")}" alt="" width="1280" height="720" loading="lazy"><video data-film="loop" muted playsinline loop preload="none" poster="${$("/assets/v42/quant-code.jpg")}" aria-label="量化運算概念影片"><source src="${$("/assets/v42/quant-code.mp4")}" type="video/mp4"></video><div class="band-shade" aria-hidden="true"></div></div>
  <div class="band-copy wrap">
   <h2 id="quant-title" class="band-title">你的量化運算，<wbr>今天就能開始。</h2>
  </div>
 </div>
 <div id="statement-wall" class="wrap wall-head">
  <h3 class="split h-lg" data-reveal>${L("<em>方舟量化，</em>","實戰對帳單。")}</h3>
 </div>
 <div class="wall wrap" data-reveal aria-label="精選實戰對帳單牆">${Ue.map((e,t)=>ie(P.find(a=>a.id===e),t)).join("")}</div>
 <details class="catalog wrap"><summary><span>瀏覽更多對帳單</span><i aria-hidden="true">＋</i></summary>
  <div class="catalog-filters" role="group" aria-label="篩選實戰紀錄">${[["all","全部"],["台股","台股"],["美股","美股"],["realized","已實現"],["inventory","庫存損益"]].map(([e,t],a)=>`<button type="button" data-proof-filter="${e}" aria-pressed="${a===0}">${t}</button>`).join("")}</div>
  <p class="sr-only" role="status" data-proof-status></p>
  <div class="catalog-grid">${P.map((e,t)=>ie(e,t)).join("")}</div>
 </details>
</section>
<dialog id="proof-dialog" class="viewer" aria-labelledby="proof-title">
 <header><div><h3 id="proof-title"></h3><p id="proof-context"></p></div><button type="button" class="viewer-close" data-close>關閉</button></header>
 <div class="viewer-controls"><button type="button" data-proof-prev>← 上一張</button><span id="proof-position"></span><button type="button" data-proof-next>下一張 →</button><button type="button" data-proof-zoom aria-pressed="false">放大閱讀</button></div>
 <div class="viewer-original"><img alt=""></div>
</dialog>`,fe=[{id:"retirement",name:"退休倒數365天",quote:"敢賣之後，<br>發現自己更快樂了。",summary:"從只敢存股，到開始調節持股。",file:"retirement-post.jpg",size:[1179,792],avatar:"20 380 140 140",view:"185 480 770 285",pair:"retirement"},{id:"shqnn",name:"Shqnn",quote:"更有紀律、<br>有邏輯的投資方式。",summary:"比較 ETF、學會調節；通勤時查淨值、安排掛單，也透過實體交流學習。",file:"",size:[0,0],avatar:"",view:"",pair:""},{id:"mailey",name:"麥莉",quote:"總是在更好的<br>方向前進。",summary:"第一次實體交流後，開始精簡持股。接下來，希望跟前輩學習如何解放雙手。",file:"mailey-post.jpg",size:[1264,623],avatar:"35 36 100 100",view:"190 105 1074 518",pair:"mailey-inventory"},{id:"tcl",name:"TCL",quote:"朝著自己人生規劃<br>目標前進。",summary:"調節持股，把資金安排連回房屋整修、搬遷與裝潢的生活目標。",file:"tcl-post.jpg",size:[1264,626],avatar:"35 35 100 100",view:"190 105 1074 521",pair:"tcl-realized"}],ge=(e,t=!1)=>`<svg ${t?'class="story-avatar"':""} viewBox="${t?e.avatar:e.view}" role="img" aria-label="${e.name}${t?"的原頭像":"分享原文"}"><image ${t?"data-href":"href"}="${$(M+e.file)}" width="${e.size[0]}" height="${e.size[1]}"/></svg>`,Ge=e=>e.pair?`<button type="button" data-story="${e.id}" data-story-result>方舟用戶成績</button>`:`<button type="button" data-story="${e.id}">App Store 分享</button>`,_e=`
<section id="stories" class="stories" aria-labelledby="stories-title">
 <div class="wrap stories-head">
  <p class="kicker" data-reveal>用戶回饋</p>
  <h2 id="stories-title" class="split h-xl" data-reveal>${L("<em>看看大家</em>","怎麼說。")}</h2>
 </div>
 <div class="wrap story-grid">${fe.map((e,t)=>`
  <article class="story" data-reveal style="--i:${t%2}">
   <span class="story-mark" aria-hidden="true">「</span>
   <blockquote>${e.quote}</blockquote>
   <p class="story-summary">${e.summary}</p>
   <footer><div class="story-person">${e.file?ge(e,!0):'<span class="story-letter" aria-label="Shqnn 字母頭像">S</span>'}<h3>${e.name}</h3></div><div class="story-actions">${Ge(e)}</div></footer>
  </article>`).join("")}</div>
 <div class="wrap"><div class="cta-row" data-reveal><p>想自己用用看？</p><div><a class="btn btn-light" href="#plans">看看方案</a></div></div></div>
</section>
<dialog id="story-dialog" class="viewer" aria-labelledby="story-title">
 <header><div><h3 id="story-title"></h3></div><button type="button" data-story-zoom aria-pressed="false">放大原文</button><button type="button" class="viewer-close" data-close>關閉</button></header>
 <div class="story-source"></div>
</dialog>`,V=(e,t,a,s,n,d,p)=>`<figure class="${e}" data-reveal><button type="button" data-photo="${t}" data-photo-title="${a}" aria-label="查看完整照片：${a}"><img src="${$(M+t)}" alt="${s}" loading="lazy" width="${d}" height="${p}"></button><figcaption>${n}</figcaption></figure>`,Xe=`
<section id="companionship" class="companion" aria-labelledby="companion-title">
 <div class="wrap companion-head">
  <p class="kicker" data-reveal>擺渡人陪伴 · 實體交流</p>
  <h2 id="companion-title" class="split h-xl" data-reveal>${L("<em>從第一次使用，</em>","有人陪著你。")}</h2>
  <p class="lead" data-reveal>帶著問題來，和擺渡人、團隊一起找下一步。</p>
 </div>
 <div class="wrap companion-scene">
  ${V("photo photo-room","live-day-room.jpg","方舟實體課堂","方舟實體課堂全景，學員分桌使用筆電，講師在大螢幕旁示範","方舟實體課堂",1400,1050)}
  ${V("photo photo-help","live-help.jpg","桌邊交流與指導","擺渡人在桌邊與學員討論筆電操作","依每個人的進度，一起處理問題。",825,1100)}
  ${V("photo photo-table","live-day-table.jpg","夥伴實體交流","夥伴圍桌交流與實作","一起討論，把卡住的地方說出來。",1400,1050)}
 </div>
</section>
<dialog id="photo-dialog" class="viewer" aria-labelledby="photo-title"><header><div><h3 id="photo-title"></h3></div><button type="button" class="viewer-close" data-close>關閉</button></header><div class="viewer-original"><img alt=""></div></dialog>`,Qe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");function Ze(){const e=l(".band"),t=l(".band-copy",e);if(k.matches)t.classList.add("is-live");else{const r=new IntersectionObserver(f=>{f[0].isIntersecting&&(t.classList.add("is-live"),r.disconnect())},{rootMargin:"-32% 0px -32% 0px"});r.observe(t)}const a=l("#proof-dialog"),s=l(".viewer-original",a),n=l("[data-proof-zoom]",a);let d=0;const p=()=>{const r=P[d];l("#proof-title",a).textContent=Ke(r),l("#proof-context",a).textContent=`${r.currency} · ${r.label}`,l("#proof-position",a).textContent=`${d+1} / ${P.length}`;const f=l("img",s);f.src=$(M+r.file),f.alt=`${r.market}${r.label}完整原始截圖`,s.classList.remove("is-zoomed"),n.setAttribute("aria-pressed","false"),n.textContent="放大閱讀",s.scrollTop=0,s.scrollLeft=0},o=r=>{d=(d+r+P.length)%P.length,p()};g("[data-proof]").forEach(r=>r.addEventListener("click",()=>{d=P.findIndex(f=>f.id===r.dataset.proof),p(),a.showModal()})),l("[data-proof-prev]",a).addEventListener("click",()=>o(-1)),l("[data-proof-next]",a).addEventListener("click",()=>o(1)),n.addEventListener("click",()=>{const r=s.classList.toggle("is-zoomed");n.setAttribute("aria-pressed",String(r)),n.textContent=r?"恢復大小":"放大閱讀"}),a.addEventListener("keydown",r=>{r.key==="ArrowRight"&&(r.preventDefault(),o(1)),r.key==="ArrowLeft"&&(r.preventDefault(),o(-1))});const v=g("[data-proof-filter]"),i=g(".catalog-grid [data-proof]");v.forEach(r=>r.addEventListener("click",()=>{const f=r.dataset.proofFilter;v.forEach(w=>w.setAttribute("aria-pressed",String(w===r)));let m=0;i.forEach(w=>{const x=P.find(E=>E.id===w.dataset.proof);w.hidden=!(f==="all"||x.market===f||x.state===f),w.hidden||m++}),l("[data-proof-status]").textContent=`顯示 ${m} 份紀錄`}));const b=l("#story-dialog"),u=l(".story-source",b),c=l("[data-story-zoom]",b);c.addEventListener("click",()=>{const r=u.classList.toggle("is-zoomed");c.setAttribute("aria-pressed",String(r)),c.textContent=r?"恢復大小":"放大原文"}),g("[data-story]").forEach(r=>r.addEventListener("click",()=>{const f=fe.find(E=>E.id===r.dataset.story),m=f.pair==="retirement"?{file:"retirement-detail.JPG",label:"已實現損益"}:He.find(E=>E.id===f.pair);l("#story-title",b).textContent=`${f.name} · ${m?"方舟用戶成績":"App Store 分享"}`,u.classList.remove("is-zoomed"),c.hidden=!f.file,c.textContent="放大原文",c.setAttribute("aria-pressed","false");const w=m?`<div class="story-result"><h4>${m.label}</h4><img src="${$(M+m.file)}" alt="${f.name}分享的原始對帳單"></div>`:"",x=`<div class="story-post"><h4>使用心得</h4>${f.file?ge(f):Ye.split(/\n\s*\n/).filter(Boolean).map(E=>`<p>${Qe(E.trim())}</p>`).join("")}</div>`;u.innerHTML=x+w,u.classList.toggle("has-result",!!m),b.showModal()}));const h=l("#photo-dialog");g("[data-photo]").forEach(r=>r.addEventListener("click",()=>{l("h3",h).textContent=r.dataset.photoTitle;const f=l("img",h);f.src=$(M+r.dataset.photo),f.alt=r.dataset.photoTitle,h.showModal()}));const y=l(".companion-scene");S(l(".photo-help",y),y,{y:60},{y:-60},"top bottom","bottom top","(prefers-reduced-motion: no-preference) and (min-width: 961px)"),S(l(".photo-table",y),y,{y:110},{y:-30},"top bottom","bottom top","(prefers-reduced-motion: no-preference) and (min-width: 961px)")}const Je={monthly:"https://glx.tw/iyNK4Y",annualAuto:"https://glx.tw/qwQRJD",annualOnce:"https://glx.tw/pbYMaM",studioOnce:"https://glx.tw/CjNdv3"},A={monthly:{auto:988,points:200},annual:{auto:6388,once:7388,autoPoints:1200,oncePoints:1100},studio:{auto:98e3,once:98e3,autoPoints:36e3,oncePoints:36e3}},j=[{v:"1.8.2",type:"新功能",text:"主動式 ETF，新增減碼排行榜。",source:6},{v:"1.8.1",type:"修正",text:"修正擺渡人關懷顯示邏輯。",source:6},{v:"1.8.0",type:"新功能",text:"新增擺渡成員關懷系統，整合客服窗口。",source:6},{v:"1.7.6",type:"修正",text:"個股基本資料加回說明，修正每日可用金額資料。",source:6},{v:"1.7.5",type:"新功能",text:"台美產業個股新增現金流指標。",source:6},{v:"1.7.1",type:"修正",text:"改善 iOS 26 播放進度條操作。",source:5},{v:"1.7.0",type:"新功能",text:"更新方舟擺渡人更換流程，整理通知與介面體驗。",source:5},{v:"1.6.8",type:"修正",text:"修正個人關注看板文章放大後的返回列表顯示。",source:4},{v:"1.6.7",type:"優化",text:"活動行事曆以不同熱點顏色區隔報名狀態。",source:4},{v:"1.6.6",type:"優化",text:"看板貼文支援圖片多選。",source:4},{v:"1.6.5",type:"新功能",text:"點擊看板頭像，可跳轉擺渡人清單。",source:4},{v:"1.6.4",type:"修正",text:"修正看板列表與個股討論頁為空時的閃退。",source:3},{v:"1.6.3",type:"優化",text:"台幣與美金閒錢數值可跨設備同步。",source:3},{v:"1.6.2",type:"修正",text:"修正權限、閃退與連線狀態問題。",source:3},{v:"1.6.1",type:"優化",text:"活動中心新增 Line 群資訊，改善看板與功能入口。",source:3},{v:"1.6.0",type:"新功能",text:"活動中心新增主題看板與個人看板。",source:2},{v:"1.5.0",type:"新功能",text:"方舟電台與直播收聽入口。",source:2},{v:"1.4.2",type:"新功能",text:"策略頁新增盤中折溢價排行。",source:1},{v:"1.4.1",type:"優化",text:"改善自選資訊與 ETF 共同持股體驗。",source:0},{v:"1.4.0",type:"新功能",text:"指數貢獻排行、方舟啟航及 ETF 共同持股策略。",source:0},{v:"1.3.7",type:"優化",text:"改善錯誤回應的提示訊息。",source:0},{v:"1.3.6",type:"修正",text:"修正庫存編輯表頭後未更新，策略績效預設顯示 120 天。",source:0}],X=[{n:"25",name:"從安裝到實作，讓想法開始成形。",label:"方舟運算・教學與共創基地",text:"由方舟運算團隊整合教學、實作與共創基地服務，從工具安裝到應用展示，提供交流與實作的場域，讓你的需求有地方展開。",tags:["方舟運算團隊","教學與實作","創業基地","交流與展示"],note:"教學、交流與空間使用依方案及預約安排。"},{n:"18",name:"你的產品，有技術底氣。",label:"百商數位・星系數位",text:"整合研發、資料庫、資安、後端與 API 資源，搭配開發工具、資料串接與技術支援，協助建立產品運作的技術基礎。",tags:["研發與開發工具","資料庫與資料串接","資安","後端與 API","技術支援"],note:"依產品需求與方案範圍，安排對應服務。"},{n:"17",name:"把內容，做出影響力。",label:"影音・專業協作・內容製作",text:"結合影音設備、專業協作與內容製作資源，從內容規劃到影音呈現，讓作品有清楚的表達。有計劃的參加者，可獲得 YouTube 經營與營利準備輔導。",tags:["影音製作","專業協作","內容製作","YouTube 經營"],note:"營利資格由平台審核，輔導不保證收益。"},{n:"15",name:"讓產品與專業，被更多人看見。",label:"數碼投顧・媒體與出版資源",text:"連結媒體、出版與雜誌相關資源，拓展品牌內容、採訪與出版合作的機會。另提供法務及投顧相關資源連結，依需求洽詢。",tags:["法務／投顧資源","媒體與雜誌","品牌內容","採訪與出版合作"],note:"各項專業服務依實際需求與約定範圍提供。"}],be=[{name:"我的工具",title:"把需要的資料，串成自己的工具。",desc:"透過 API 教學、策略程式規劃與設計協助，討論你需要的資料與應用；工程改版提案享優先受理與評估。",layers:["資料串接","API 應用","功能組合","我的工具"],screen:"資料 × 應用",foot:"資料串接與應用實作協助"},{name:"我的 App",title:"從產品想法，到 App 實作。",desc:"方舟運算團隊帶你理解製作方式與 App Store 上架流程。App 準備就緒即可安排上架協助，無須等滿一年。",layers:["產品需求","功能開發","介面整合","我的 App"],screen:"想法 → App",foot:"App 製作與上架指導"},{name:"我的營運",title:"把金流與客服，接進營運流程。",desc:"與方舟運算團隊討論金流串接、客服系統與營運流程，透過指導與實作，補上產品運作需要的環節。",layers:["服務流程","金流串接","客服系統","我的營運"],screen:"服務 × 營運",foot:"金流串接與客服系統輔導"},{name:"AI Agent",title:"離開現場，也能繼續實作。",desc:"針對 AI Agent 建置與相關應用需求，提供優先協助。從工作流程出發，運用 AI 與雪鴞 API，逐步延續現場的實作。",layers:["需求整理","建立工具","AI Agent 協作"],screen:"AI Agent",foot:"AI Agent 建置與應用優先協助"}],et=[{version:"1.3.6",added:0,improved:1,fixed:1,source:0},{version:"1.3.7",added:0,improved:1,fixed:0,source:0},{version:"1.4.0",added:3,improved:3,fixed:1,source:0},{version:"1.4.1",added:0,improved:2,fixed:0,source:0},{version:"1.4.2",added:1,improved:6,fixed:1,source:1},{version:"1.5.0",added:1,improved:5,fixed:1,source:2},{version:"1.6.0",added:2,improved:0,fixed:6,source:2},{version:"1.6.1",added:0,improved:4,fixed:3,source:3},{version:"1.6.2",added:0,improved:0,fixed:4,source:3},{version:"1.6.3",added:0,improved:1,fixed:3,source:3},{version:"1.6.4",added:0,improved:0,fixed:1,source:3},{version:"1.6.5",added:1,improved:1,fixed:1,source:4},{version:"1.6.6",added:0,improved:2,fixed:2,source:4},{version:"1.6.7",added:0,improved:3,fixed:2,source:4},{version:"1.6.8",added:0,improved:0,fixed:1,source:4},{version:"1.7.0",added:1,improved:11,fixed:2,source:5},{version:"1.7.1",added:0,improved:1,fixed:1,source:5},{version:"1.7.5",added:3,improved:0,fixed:0,source:6},{version:"1.7.6",added:0,improved:0,fixed:2,source:6},{version:"1.8.0",added:1,improved:1,fixed:1,source:6},{version:"1.8.1",added:0,improved:0,fixed:1,source:6},{version:"1.8.2",added:1,improved:0,fixed:0,source:6}],T=et.reduce((e,t)=>({added:e.added+t.added,improved:e.improved+t.improved,fixed:e.fixed+t.fixed}),{added:0,improved:0,fixed:0}),tt=[{top:300,bottom:2390},{top:320,bottom:2520},{top:330,bottom:1960},{top:330,bottom:2460},{top:395,bottom:2460},{top:335,bottom:1990},{top:520,bottom:2430}],at=e=>{const t=tt[e],a=t.bottom-t.top;return`<div class="record-crop" style="aspect-ratio:1230 / ${a}"><img src="${$(`/assets/releases/image${e}.png`)}" alt="方舟版本更新紀錄，已裁除手機狀態欄與商店導覽" width="1290" height="2796" draggable="false" style="width:${1290/1230*100}%;left:${-30/1230*100}%;top:${-t.top/a*100}%"></div>`},st=e=>e==="修正"?"體驗提升":e,ne=e=>e==="新功能"?"new":e==="優化"?"tune":"fix",C=[...j].reverse(),D=C.length-1,oe=e=>C.findIndex(t=>t.v===e),B=[{tag:"看得更完整",head:"資料，持續擴充。",text:"從 ETF 共同持股、指數貢獻排行，到現金流指標與主動式 ETF 減碼排行。",from:"1.3.6",to:"1.6.5"},{tag:"連結更多內容",head:"功能，持續擴展。",text:"方舟電台、直播入口、主題看板與個人看板，讓資訊與交流更集中。",from:"1.5.0",to:"1.7.0"},{tag:"用起來更順",head:"細節，持續打磨。",text:"圖片多選、活動報名狀態、播放操作與穩定性，逐次改善你每天的使用體驗。",from:"1.6.4",to:"1.8.2"}],it=`
<section id="evolution" class="evolution" aria-labelledby="evolution-title">
 <div class="wrap evolution-head">
  <div>
   <p class="kicker" data-reveal>持續進化</p>
   <h2 id="evolution-title" class="split h-xl" data-reveal>${L("<em>今天的方舟，</em>","明天還會更好。")}</h2>
  </div>
  <p class="lead" data-reveal>每一次更新，都讓你感受更強大。</p>
 </div>
 <div class="wrap stats" data-reveal>
  <div class="stat"><strong data-count="${j.length}">${j.length}</strong><span>重要改版</span></div>
  <div class="stat"><strong data-count="${T.added}">${T.added}</strong><span>功能新增</span></div>
  <div class="stat"><strong data-count="${T.improved+T.fixed}">${T.improved+T.fixed}</strong><span>優化與修正</span></div>
 </div>
 <p class="wrap stats-note">統計自已收錄的 ${j.length} 個版本改版紀錄，並非完整年度統計。</p>
 <div class="wrap versions">
  <div class="themes" data-reveal>${B.map((e,t)=>`<button type="button" class="theme" data-theme="${t}" aria-pressed="${t===0}"><span>0${t+1}</span><h3>${e.head}</h3><p>${e.text}</p><small>${e.tag}・v${e.from} → v${e.to}</small></button>`).join("")}</div>
  <div class="vmap" data-reveal aria-hidden="true">
   <i class="vmap-line"></i><i class="vmap-span"></i>
   ${C.map((e,t)=>`<button type="button" class="vdot type-${ne(e.type)}" tabindex="-1" data-dot="${D-t}" data-at="${t}" style="--x:${(t/D*100).toFixed(3)}%;--i:${t}"><span>v${e.v}</span></button>`).join("")}
   <span class="vmap-end is-start">v${C[0].v}</span><span class="vmap-end">v${C[D].v}</span>
  </div>
  <details class="versions-all"><summary><span>查看 ${j.length} 個版本的原始紀錄</span><i aria-hidden="true">＋</i></summary>
   <ol class="versions-list" aria-label="${j.length} 個版本的進化紀錄">${j.map((e,t)=>`<li><button type="button" class="version" data-version="${t}" data-source="${e.source}"><b>v${e.v}</b><span class="version-type type-${ne(e.type)}">${st(e.type)}</span><span class="version-text">${e.text}</span><i aria-hidden="true">↗</i></button></li>`).join("")}</ol>
  </details>
 </div>
</section>
<dialog id="record-dialog" class="viewer viewer-narrow" aria-labelledby="record-title"><header><div><h3 id="record-title">方舟運算原始版本紀錄</h3></div><button type="button" class="viewer-close" data-close>關閉</button></header><div class="viewer-original record-original"></div></dialog>`,nt=`
<section id="awakening" class="awakening" aria-labelledby="awakening-title">
 <div class="awakening-film"><img src="${$("/assets/v6/ark-awakening-v3-poster.jpg")}" alt="ARK 品牌能量畫面" loading="lazy" width="1280" height="720"><video data-film="once" muted playsinline preload="none" poster="${$("/assets/v6/ark-awakening-v3-poster.jpg")}" aria-label="ARK 品牌影片"><source src="${$("/assets/v6/ark-awakening-v3.mp4")}" type="video/mp4"></video><div class="awakening-shade" aria-hidden="true"></div></div>
 <h2 id="awakening-title" class="subtitle" aria-label="開始喚醒你的方舟。">${[..."開始喚醒你的方舟。"].map((e,t)=>`<span aria-hidden="true" style="--i:${t}">${e}</span>`).join("")}</h2>
</section>`;function ot(){const e=g("[data-version]"),t=g("[data-dot]"),a=l("#record-dialog"),s=m=>{l(".record-original",a).innerHTML=at(Number(e[m].dataset.source)),a.showModal()};e.forEach((m,w)=>m.addEventListener("click",()=>s(w))),t.forEach(m=>m.addEventListener("click",()=>s(Number(m.dataset.dot))));const n=l(".versions"),d=l(".vmap",n),p=g(".theme",n);let o=0,v=!1,i=!1,b=!1,u=0;const c=()=>v&&!i&&!b&&!document.hidden&&!k.matches,h=()=>{clearTimeout(u),n.classList.toggle("is-auto",c()),c()&&(u=window.setTimeout(()=>y((o+1)%B.length),4200))};function y(m,w=!1){o=m,w&&(b=!0);const x=oe(B[m].from),E=oe(B[m].to);p.forEach((z,F)=>{const ee=F===m;z.setAttribute("aria-pressed",String(ee)),z.classList.remove("is-timing"),ee&&(z.offsetWidth,z.classList.add("is-timing"))}),d.style.setProperty("--from",`${(x/D*100).toFixed(3)}%`),d.style.setProperty("--to",`${(E/D*100).toFixed(3)}%`),t.forEach(z=>{const F=Number(z.dataset.at);z.classList.toggle("in-range",F>=x&&F<=E)}),h()}p.forEach((m,w)=>{m.addEventListener("click",()=>y(w,!0)),m.addEventListener("pointerenter",()=>{matchMedia("(hover: hover)").matches&&y(w)})}),n.addEventListener("pointerenter",()=>{i=!0,h()}),n.addEventListener("pointerleave",()=>{i=!1,h()}),new IntersectionObserver(m=>{v=m[0].isIntersecting,h()},{threshold:.3}).observe(n),document.addEventListener("visibilitychange",h),y(0);const r=l("#awakening"),f=l(".subtitle",r);if(k.matches)f.classList.add("is-in");else{const m=new IntersectionObserver(w=>{w[0].isIntersecting&&(f.classList.add("is-in"),m.disconnect())},{threshold:.6,rootMargin:"0px 0px -8% 0px"});m.observe(f)}}const re=[{day:"週一",english:"MONDAY",topic:"寫作與出版",short:"寫作",title:`從社群文章，
展開你的出書計畫。`,description:"從社群貼文、觀點整理到出書計畫，與團隊討論你的個人內容方向，逐步把專業與經驗整理成作品。",details:[["社群經營","文章主題、內容寫作與經營討論"],["出書計畫","書稿架構、出版提案與洽談方向"]],image:"/assets/ark-mon-writing-r34.webp",alt:"講師以白板上的書稿帶領寫作討論，學員在桌邊記錄與交流",position:"50% 50%"},{day:"週二",english:"TUESDAY",topic:"API、研發與產品",short:"工程",title:`把你的需求，
整理成開發方向。`,description:"從想服務的使用者出發，與團隊討論網站、App、API 與 AI Agent，把想法整理成可實作的產品需求。工程提案依可行性與排程評估。",details:[["產品需求","目標使用者、功能需求與實作方向"],["第一版實作","討論可用工具與模組，逐步做出可展示的第一版；依需求安排 API、資料串接與回測實作示範。"]],image:"/assets/ark-tue-api-r34.webp",alt:"研發人員透過大螢幕檢視程式碼、API 測試與應用介面",position:"50% 50%"},{day:"週三",english:"WEDNESDAY",topic:"產業研究與趨勢",short:"產業",title:`一起研究產業，
看見下一步的方向。`,description:"每週三 15:00–16:00，與產業團隊深入研究產業變化與市場趨勢，帶著你的觀察一起交流。",details:[["朋友同行","請事先告知人數，以利確認座位。"],["無法到場","可詢問當日精華逐字稿。"]],image:"/assets/ark-wed-tea-r34.webp",alt:"三位參與者在下午茶桌邊，搭配產業資料與筆記交流",position:"50% 50%"},{day:"週四",english:"THURSDAY",topic:"影音與形象製作",short:"影音",title:`長短影音到直播，
找到你的呈現方式。`,description:"從長短影音、直播到形象內容，與團隊討論拍攝與製作方式，讓你的作品、產品與品牌有更清楚的呈現。",details:[["長短影音","內容企劃、拍攝與錄製討論"],["直播與形象","直播呈現、形象內容與製作討論"]],image:"/assets/ark-thu-video-r34.webp",alt:"攝影師使用腳架上的相機與麥克風，拍攝桌邊受訪者",position:"50% 50%"},{day:"週五",english:"FRIDAY",topic:"媒體曝光與採訪",short:"媒體",title:`把你的故事，
帶到媒體面前。`,description:"從媒體、Podcast、記者採訪到刊物，整理適合對外溝通的主題，與團隊討論曝光需求與合作方式。",details:[["媒體與 Podcast","採訪題材、節目主題與品牌故事"],["刊物合作","雜誌、週刊內容與出刊規劃"]],image:"/assets/ark-fri-publications-r34.webp",alt:"兩本以 ARK 為刊名的人物封面雜誌，呈現品牌內容與刊物合作方向",position:"50% 50%"}],G=[{name:"資料串接",title:"需要的資料，成為你的工具。",description:"從雪鴞包與雪鴞 API 出發，提供 API 教學、策略程式規劃與設計協助；工程改版需求享優先受理與評估。"},{name:"APP 上架",title:"從一個想法，到一支 APP。",description:"方舟運算團隊帶你製作 APP、理解上架流程。準備就緒即可安排上架協助，無須等滿一年；實際上架依平台審核結果辦理。"},{name:"金流與客服",title:"讓產品接得上營運。",description:"討論金流串接、客服系統與營運流程，透過指導和實作協助，釐清產品運作需要的環節。"}],ye=[{name:"需求整理",title:"先選定，一件想完成的事。",description:"從你的素材、目標與工作方式出發，和團隊整理適合交給 AI 協助的任務。",items:["盤點手上的素材","拆解工作步驟","確認需要的協助"]},{name:"建立工具",title:"把需要的資料，接進流程。",description:"運用 AI 與雪鴞 API，討論資料如何串接、工具如何組合，再透過實作調整。",items:["選擇資料來源","規劃串接方式","測試與調整流程"]},{name:"AI Agent 協作",title:"離開現場，繼續你的計畫。",description:"把建立的工作流程帶回日常使用，檢視 AI 的輸出、補充素材，再帶著進度與團隊討論。",items:["延續日常實作","檢視與調整輸出","帶著進度再交流"]}],O=e=>e.replaceAll("App","APP").replaceAll("APP Store","App Store"),rt=`<div class="viz viz-tool" aria-hidden="true">
 <div class="viz-src"><span>雪鴞包</span><span>API 串接</span></div>
 <div class="viz-wire"><svg viewBox="0 0 72 120"><path d="M0 30 C36 30 36 60 72 60"/><path d="M0 90 C36 90 36 60 72 60"/></svg><i class="pulse p1"></i><i class="pulse p2"></i></div>
 <div class="viz-window"><div class="viz-bar"><i></i><i></i><i></i><b>你的工具介面</b></div><div class="viz-thead"><span>整合用途</span><span>資料來源</span></div>${[["選擇需要的資料","雪鴞包"],["整理內容與呈現方式","資料整合"],["接進自己的工具","應用介面"]].map(([e,t],a)=>`<div class="viz-row" style="--i:${a}"><span>${e}</span><span>${t}</span></div>`).join("")}</div>
</div>`,le=[{name:"規劃你的功能",label:"功能規劃：內容首頁、資料查詢、功能入口",screen:'<span class="app-title">功能規劃</span><span class="wire"><i></i>內容首頁</span><span class="wire"><i></i>資料查詢</span><span class="wire tall"><i></i>功能入口</span><span class="app-note">需求整理中</span>'},{name:"開發與介面整合",label:"介面整合：資料來源、功能組合、操作流程",screen:`<span class="app-bar"><svg class="app-mark" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19A14 14 0 0 0 19 5"/><path class="soft" d="M11.5 19A7.5 7.5 0 0 0 19 11.5"/><circle cx="6.4" cy="6.4" r="2.4"/></svg>Workspace</span><span class="app-chart">${[38,62,48,80,100].map(e=>`<u style="--h:${e}%"></u>`).join("")}</span><span class="app-row"><i></i>資料來源<s></s></span><span class="app-row"><i></i>功能組合<s></s></span><span class="app-tabs"><b>首頁</b><span>資料</span><span>我的</span></span>`},{name:"App Store 上架指導",label:"上架準備：應用內容、呈現素材、上架準備",screen:`<span class="app-store"><span class="app-icon"><svg class="app-mark" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19A14 14 0 0 0 19 5"/><path class="soft" d="M11.5 19A7.5 7.5 0 0 0 19 11.5"/><circle cx="6.4" cy="6.4" r="2.4"/></svg></span><span><b>Workspace</b>你的應用</span></span><span class="app-shots"><i class="shot-a"><u></u><u></u><u></u><u></u></i><i class="shot-b"><u></u><u></u><u></u></i><i class="shot-c"><u></u><u></u><u></u><u></u></i></span>${["應用內容","呈現素材","上架準備"].map((e,t)=>`<span class="app-check" style="--i:${t}"><svg viewBox="0 0 14 14" aria-hidden="true"><path d="m2.5 7.4 3 3 6-6.6" pathLength="1"/></svg>${e}</span>`).join("")}<span class="app-done">上架準備完成</span>`}],lt=`<div class="viz viz-app">
 <div class="viz-stages" role="tablist" aria-label="APP 從規劃到上架">${le.map((e,t)=>`<button type="button" role="tab" id="app-tab-${t}" aria-controls="app-screen-${t}" aria-selected="${t===0}" tabindex="${t===0?0:-1}"><b>0${t+1}</b>${e.name}<svg class="stage-tick" viewBox="0 0 14 14" aria-hidden="true"><path d="m2.5 7.4 3 3 6-6.6" pathLength="1"/></svg></button>`).join("")}</div>
 <div class="viz-phone"><span class="viz-notch" aria-hidden="true"></span>${le.map((e,t)=>`<div class="app-screen ${t===0?"is-active":""}" role="tabpanel" id="app-screen-${t}" aria-labelledby="app-tab-${t}" aria-label="${e.label}" ${t?'inert aria-hidden="true"':""}>${e.screen}</div>`).join("")}</div>
</div>`,dt=`<div class="viz viz-ops" aria-hidden="true">
 <div class="viz-pay"><b>金流串接</b><i class="bar w70"></i><i class="bar w45"></i><div class="viz-paid"><svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="9"/><path d="m5.5 10.3 3 3 6-6.6" pathLength="1"/></svg>付款完成</div></div>
 <span class="viz-link"><i class="pulse"></i></span>
 <div class="viz-core"><b>你的產品</b><small>Workspace</small></div>
 <span class="viz-link is-back"><i class="pulse"></i></span>
 <div class="viz-chat"><b>客服系統</b><i class="bubble in"></i><i class="bubble out"></i><i class="bubble in typing"><u></u><u></u><u></u></i></div>
</div>`,ct=`<div class="viz viz-agent" aria-hidden="true"><div class="viz-ring">
 <svg class="viz-orbit" viewBox="0 0 200 200"><circle cx="100" cy="100" r="74"/></svg>
 <i class="viz-runner"></i>
 ${ye.map((e,t)=>`<span class="viz-stop s${t}" style="--i:${t}"><b>0${t+1}</b>${e.name}</span>`).join("")}
 <span class="viz-hub">AI Agent</span>
</div></div>`,pt=[rt,lt,dt,ct],vt=e=>{const t=be[e],a=e<3?`<p class="need-support"><b>實作支援｜${G[e].name}</b>${G[e].title}${G[e].description}</p>`:`<details class="need-steps"><summary>看三個步驟怎麼做<i aria-hidden="true">＋</i></summary><ol>${ye.map((s,n)=>`<li><b>0${n+1} ${s.name}｜${s.title}</b><p>${s.description}</p><small>${s.items.join("・")}</small></li>`).join("")}</ol></details>`;return`<article class="need need-${e}" data-reveal style="--i:${e%2}">
  ${pt[e]}
  <div class="need-copy">
   <p class="need-no"><span>0${e+1}</span>${O(t.name)}</p>
   <h3>${O(t.title)}</h3>
   <p>${O(t.desc)}</p>
   ${a}
   <small class="need-foot">${O(t.foot)}</small>
  </div>
 </article>`},ut=e=>e.replace("，","，<br>"),ht=`
<section id="creator-journey" class="opener" aria-labelledby="opener-title">
 <div class="opener-bg" aria-hidden="true"><img src="${$("/assets/display/scene-horizon.webp")}" alt="" loading="lazy" width="1672" height="941"><div class="opener-shade"></div></div>
 <div class="wrap opener-copy">
  <p class="chapter-card is-gold" data-reveal><span>第二章</span><b>打造</b></p>
  <h2 id="opener-title" class="split h-xl" data-reveal>${L("啟動你的創業計畫，",'<span class="gold">方舟陪你一起落實。</span>')}</h2>
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
   <h2 id="create-title" class="split h-xl" data-reveal>${L("<em>從想法，</em>","開始動手實作。")}</h2>
  </div>
  <div class="create-intro" data-reveal>
   <p>方舟運算團隊陪你釐清需求、安排適合的資源，透過主題交流與實作協助，逐步推進自己的作品、產品與事業。</p>
   <p><b>帶著書稿、影音企劃、應用構想或經營問題來，先選定一個最想完成的計畫。</b></p>
  </div>
 </div>
 <p class="wrap create-for" data-reveal><span>適合</span>專業創作者、產品構想者、企業經營者，以及正在探索創業方向的夥伴。</p>
 <div class="wrap needs">${be.map((e,t)=>vt(t)).join("")}</div>
 <div id="delivery" class="wrap base">
  <figure class="base-photo" data-reveal><img src="${$("/assets/ark-creator-base-r34.webp")}" alt="創作者在基地內使用平板與筆電實作，並分組交流" loading="lazy" width="1536" height="1024"><figcaption>共享座位 · 創作者基地</figcaption></figure>
  <div class="base-copy">
   <p class="kicker" data-reveal>個人黑卡｜實作支援</p>
   <h3 class="split h-lg" data-reveal>${L("<em>你想要的，</em>","都有了完整的資源。")}</h3>
   <p data-reveal>從資料串接、APP 製作到營運工具，與團隊整理使用需求、盤點可用工具與模組，逐步做出可展示的第一版。</p>
   <div class="base-note" data-reveal><h4>讓產品，也有開始的地方。</h4><p>方舟運算團隊整合教學、實作與交流。帶著問題和進度來，在依預約安排的基地空間中，一起推進自己的計畫。</p></div>
  </div>
 </div>
</section>

<section id="ecosystem" class="ecosystem" aria-labelledby="ecosystem-title">
 <div class="wrap ecosystem-head">
  <p class="kicker" data-reveal>個人黑卡｜團隊與空間</p>
  <h2 id="ecosystem-title" class="split h-xl" data-reveal>${L("<em>四個樓層的專業，</em>","接上你的計畫。")}</h2>
  <p class="lead" data-reveal>連結內容、技術、產業研究與媒體上的專業；各樓層資源依方案範圍與實際需求安排。</p>
 </div>
 <div class="wrap floors" data-reveal>
  <div class="floor-tabs" role="tablist" aria-label="樓層資源" aria-orientation="vertical">${X.map((e,t)=>`<button type="button" role="tab" id="floor-tab-${t}" aria-controls="floor-panel" aria-selected="${t===0}" tabindex="${t===0?0:-1}"><b>${e.n}<small>F</small></b><span>${["創作者基地","研發與技術支援","影音與內容製作","媒體與出版"][t]}</span></button>`).join("")}</div>
  <div class="floor-visual"><img src="${$("/assets/display/scene-floors.webp")}" alt="創作者基地、工程、影音與媒體公關的四層資源概念" loading="lazy" width="1672" height="941">${X.map((e,t)=>`<button type="button" class="floor-band" data-band="${t}" tabindex="-1" aria-hidden="true"></button>`).join("")}<small>方舟資源概念視覺</small></div>
  <div class="floor-info" id="floor-panel" role="tabpanel" aria-labelledby="floor-tab-0" aria-live="polite" tabindex="0"><div><span data-floor="label"></span><h3 data-floor="name"></h3></div><div><p data-floor="text"></p><div class="floor-tags" data-floor="tags"></div><small data-floor="note"></small></div></div>
 </div>
</section>

<section id="program" class="program" aria-labelledby="program-title">
 <div class="wrap program-head">
  <div>
   <p class="kicker" data-reveal>個人黑卡｜每週計畫</p>
   <h2 id="program-title" class="split h-xl" data-reveal>${L("<em>從內容創作到 APP 開發，</em>","週一到週五，陪你實作。")}</h2>
  </div>
  <p class="lead" data-reveal>依需求參與，不需每天到場。<br>帶著問題與進度來就好。</p>
 </div>
 <div class="wrap week" data-reveal>
  <div class="week-tabs" role="tablist" aria-label="每週創業計畫">${re.map((e,t)=>`<button type="button" role="tab" id="week-tab-${t}" aria-controls="week-panel-${t}" aria-selected="${t===0}" tabindex="${t===0?0:-1}" aria-label="${e.day} ${e.topic}"><span>${e.day}</span><b>${e.topic}</b><em aria-hidden="true">${e.short}</em></button>`).join("")}</div>
  <div class="week-panels">${re.map((e,t)=>`<div class="week-panel ${t===0?"is-active":""}" role="tabpanel" id="week-panel-${t}" aria-labelledby="week-tab-${t}" tabindex="0" ${t?'inert aria-hidden="true"':""}>
   <div class="week-visual"><img src="${$(e.image)}" alt="${e.alt}" width="1536" height="1024" loading="lazy" decoding="async" style="object-position:${e.position}"></div>
   <div class="week-copy"><p class="week-day"><span>${e.day}</span><span lang="en">${e.english}</span></p><h3>${e.title.split(`
`).join("<br>")}</h3><p>${e.description}</p><dl>${e.details.map(([a,s])=>`<div><dt>${a}</dt><dd>${s}</dd></div>`).join("")}</dl></div>
  </div>`).join("")}</div>
 </div>
 <p class="wrap program-note">平日主題培育於 15:00 開始，週三產業交流為 15:00–16:00，其餘主題結束時間依活動安排。實際場次請至股東活動中心確認及報名。</p>
</section>`;function mt(){const e=l("#creator-journey");S(l(".opener-bg img",e),e,{scale:1.02,yPercent:-4},{scale:1.16,yPercent:4});const t=g('.viz-stages [role="tab"]');Y(l(".viz-app"),{auto:4200,onSelect:o=>t.forEach((v,i)=>v.classList.toggle("is-done",i<o))});const a=l(".floor-visual"),s=l("#floor-panel"),n=Y(l(".floors"),{auto:6e3,onSelect:(o,v)=>{const i=X[o];l('[data-floor="label"]',s).textContent=i.label,l('[data-floor="name"]',s).innerHTML=ut(i.name),l('[data-floor="text"]',s).textContent=i.text,l('[data-floor="note"]',s).textContent=i.note,l('[data-floor="tags"]',s).innerHTML=i.tags.map(b=>`<span>${b}</span>`).join(""),a.dataset.floor=String(o),s.classList.remove("is-swapped"),(v||s.dataset.ready)&&(s.offsetWidth,s.classList.add("is-swapped")),s.dataset.ready="1"}});g(".floor-band").forEach(o=>o.addEventListener("click",()=>n.select(Number(o.dataset.band),!0)));const d=l(".week");Y(d,{auto:6500});const p=new IntersectionObserver(o=>{o.some(v=>v.isIntersecting)&&(g(".week-visual img",d).forEach(v=>{v.loading="eager"}),p.disconnect())},{rootMargin:"900px 0px"});p.observe(d)}const $e=[{id:"team-line",title:"核心團隊專線｜提問優先處理",description:"透過 LINE 官方帳號提問，設定黑卡專屬標籤，由方舟運算核心團隊優先處理，盡力即時回應。"},{id:"installation",title:"方舟啟航｜申裝優先安排",description:"優先安排方舟啟航申裝服務。"},{id:"custom",title:"客製化服務｜依需求安排資源",description:"依你的目標，討論內容、技術或產品需求，確認服務範圍後安排資源。"},{id:"engineering",title:"工程改版提案優先評估",description:"釐清使用者需求，討論網站、App、API、UI／UX 與後台規格，盤點可用工具與模組，逐步推進可展示的第一版。工程提案享優先受理與評估，實際開發依可行性與排程確認。"},{id:"agent",title:"AI Agent 建置優先協助",description:"針對 AI Agent 建置及相關應用需求，提供優先協助。"},{id:"technical",title:"技術與策略教學｜協助建置與設定",description:"提供 API 教學、策略程式規劃與設計協助，討論如何運用財經資料打造自己的工具，並依需求安排 API、資料串接與回測實作示範；有需要時，也可協助 AI 工具安裝與設定。"},{id:"industry",title:"每週產業分析｜深度交流",description:"每週三 15:00–16:00，與產業團隊深度分析與交流。朋友同行請事先告知人數，以利確認座位；無法出席可詢問當日精華逐字稿。"},{id:"company",title:"公司創立與勞健保流程協助",description:"協助了解公司創立流程及勞健保相關事項；尚未投保者，可協助了解適用資格與辦理方式。"},{id:"events",title:"大型活動座位與餐敘優先安排",description:"每月各縣市大型活動，享優先保留座位與安排餐敘，並優先安排於方舟團隊鄰近座位。場次依活動公告。",note:"大型活動的保留座位與餐敘安排，依活動規則扣除點數。"},{id:"points",title:"點數兌換商品｜第一優先保留",description:"可使用點數兌換的商品，黑卡會員享第一優先保留。"}],we=[{id:"ferry",title:"優先成為方舟團隊擺渡子",description:"相關參與安排與方舟運算團隊確認。"},{id:"app-review",title:"自動化複盤",description:"包含方舟 App 的自動化複盤功能。"},{id:"app-trading",title:"AI 量化交易",description:"包含方舟 App 的 AI 量化交易功能。"},{id:"integration",title:"資料串接實作協助（雪鴞包與 API）",description:"透過雪鴞包與 API，協助資料串接實作。"},{id:"app",title:"App 製作與上架指導",description:"依專案確認的範圍，協助 App 製作、部署、上架操作及過程中的問題處理。App 準備就緒即可安排上架協助，無須等滿一年；實際上架依平台審核結果辦理。"},{id:"operations",title:"金流串接與客服系統輔導",description:"透過需求討論、指導與實作協助，釐清產品的付款、客服與營運流程。"},{id:"weekly",title:"每週主題聚會與專業指導",description:"週一寫作與出版、週二 API、研發與產品、週三產業研究、週四影音與形象製作、週五媒體與採訪。平日主題培育於 15:00 開始，週三產業交流為 15:00–16:00，其餘主題結束時間依活動安排。依需求參與，不需每天到場；實際場次請至股東活動中心確認。另有公司基金運作教學，了解公司資金與團隊福利規劃。"},{id:"room",title:"「Infinity 會議室」使用權",description:"使用方式依預約與服務安排確認。"},{id:"base",title:"方舟創業者基地空間",description:"提供交流與實作空間，依預約安排使用。"}],ft=e=>[...$e,...we].find(t=>t.id===e),ke=["team-line","installation","ferry","app-review","app-trading","custom","engineering","agent","technical","industry","app","integration","operations","company","weekly","events","points","room","base"],gt=ft("events").note,bt="以主題聚會、專業指導、需求討論與實作協助為核心；超出方案範圍的委託開發、製作及第三方費用另行報價。",yt=`
  <section class="service-information section" id="enterprise-service-notes" aria-labelledby="service-notes-title">
    <h2 id="service-notes-title">服務與訂閱說明</h2>
    <div class="service-information-grid">
    <div class="enterprise-service-notes">
    <h3>個人黑卡</h3>
    <p>${bt} 執行前會說明服務範圍、時程與費用，經你確認後安排。</p>
    <p>功能需求享有優先評估，實際開發依可行性與排程確認。出版、媒體刊登與 App 上架，依合作單位或平台審核結果辦理。</p>
    <p id="black-card-activity-note">${gt}</p>
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
  </section>`,Z=e=>[...$e,...we].find(t=>t.id===e),de=["自動化複盤","AI 量化交易","雪鴞 API 存取","持續提供的功能更新"],$t=[["team-line","透過 LINE 官方帳號，由核心團隊優先處理。"],["installation","方舟啟航申裝服務，享優先安排。"],["agent","AI Agent 建置與相關應用，提供優先協助。"]],xe=["app-review","app-trading","integration"],wt={"app-review":"自動化複盤","app-trading":"AI 量化交易",integration:"雪鴞 API 存取"},ce=ke.filter(e=>!xe.includes(e)),J='<span class="tick" aria-hidden="true">✓</span>',R=`<td class="is-yes">${J}<span class="sr-only">包含</span></td>`,pe='<td class="is-no"><span aria-hidden="true">—</span><span class="sr-only">不包含</span></td>';function ve(e,t,a,s,n,d){return`<article class="plan" data-plan="${e}" data-reveal aria-label="${a}">
  <p class="plan-step">${t}</p>
  ${e==="annual"?'<span class="plan-badge" data-annual-value hidden>最划算</span>':""}
  <span class="plan-name">${a}</span><h3>${s}</h3><p class="plan-audience">${n}</p>
  ${e==="annual"?`<div class="billing" role="group" aria-label="${a}付款方式"><button type="button" aria-pressed="false" data-billing="auto">自動續訂</button><button type="button" aria-pressed="true" data-billing="once">一次付款</button></div>`:'<div class="billing-fixed">每月自動續訂</div>'}
  <div class="price"><small>NT$</small><strong></strong><span>／${e==="monthly"?"月":"年"}</span></div>
  <p class="points"><span class="points-cycle"></span><b></b><span>點會員點數</span></p>
  <ul>${d.map(p=>`<li>${J}${p}</li>`).join("")}</ul>
  <a class="purchase" aria-disabled="true">訂閱連結即將開放</a><small class="billing-note"></small>
 </article>`}const kt=`<article class="plan plan-black" data-plan="studio" data-reveal aria-label="個人黑卡">
 <div class="plan-black-glow" aria-hidden="true"></div>
 <p class="plan-step">03 ・ 共創</p>
 <span class="plan-name">個人黑卡</span><h3>你的計畫，有團隊陪你一起推進。</h3>
 <p class="plan-audience">帶著產品構想、內容作品或經營問題來，與方舟運算團隊討論需求，安排適合的資源。</p>
 <ul class="black-priorities">${$t.map(([e,t])=>`<li>${J}<div><h4>${Z(e).title}</h4><p>${t}</p></div></li>`).join("")}</ul>
 <p class="black-more">另含資料串接、產品實作與基地交流等支援。<a href="#black-card-rights" data-open-rights>查看完整 19 項權益 ↗</a></p>
 <div class="black-checkout"><div class="billing-fixed">年方案</div><div class="price"><small>NT$</small><strong></strong><span>／年</span></div><p class="points"><span class="points-cycle"></span><b></b><span>點會員點數</span></p><a class="purchase purchase-gold" aria-disabled="true">訂閱連結即將開放</a><small class="billing-note"></small></div>
</article>`,xt=`
<div class="compare" data-reveal>
 <div class="compare-head"><h3>三個方案，差在哪裡？</h3><p>月方案與年方案是投資工具；個人黑卡在這之上，多了一整個團隊。</p></div>
 <div class="compare-scroll"><table>
  <thead><tr><th scope="col"><span class="sr-only">項目</span></th><th scope="col">月方案</th><th scope="col">年方案</th><th scope="col" class="is-black">個人黑卡</th></tr></thead>
  <tbody>
   <tr class="compare-group"><th scope="rowgroup" colspan="4">費用與點數</th></tr>
   <tr><th scope="row">方案費用</th><td>NT$${I(A.monthly.auto)}<small>／月</small></td><td>NT$${I(A.annual.auto)}<small>／年・自動續訂</small><br>NT$${I(A.annual.once)}<small>／年・一次付款</small></td><td class="is-black">NT$${I(A.studio.once)}<small>／年</small></td></tr>
   <tr><th scope="row">會員點數</th><td>每月領 ${I(A.monthly.points)} 點</td><td>每年領 ${I(A.annual.autoPoints)} 點<small>（自動續訂）</small><br>一次領 ${I(A.annual.oncePoints)} 點<small>（一次付款）</small></td><td class="is-black">一次領 ${I(A.studio.oncePoints)} 點</td></tr>
   <tr><th scope="row">付款方式</th><td>每月自動續訂</td><td>自動續訂，或一次付款不續訂</td><td class="is-black">一次付款，不自動續訂</td></tr>
   <tr class="compare-group"><th scope="rowgroup" colspan="4">投資工具</th></tr>
   ${xe.map(e=>`<tr><th scope="row">${wt[e]}</th>${R}${R}${R.replace("is-yes","is-yes is-black")}</tr>`).join("")}
   <tr class="compare-group is-black-group"><th scope="rowgroup" colspan="4">個人黑卡專屬｜${ce.length} 項團隊與資源</th></tr>
   ${ce.map(e=>`<tr><th scope="row">${Z(e).title}</th>${pe}${pe}${R.replace("is-yes","is-yes is-black")}</tr>`).join("")}
  </tbody>
 </table></div>
 <p class="compare-note">各項權益的完整說明與條件，請見下方「完整 19 項權益」與「服務與訂閱說明」。</p>
</div>`,At=`
<section id="plans" class="plans" aria-labelledby="plans-title">
 <div class="wrap plans-head">
  <p class="kicker" data-reveal>購買方案</p>
  <h2 id="plans-title" class="split h-xl" data-reveal>${L("<em>結合方舟，</em>","打造你的事業。")}</h2>
  <p class="lead" data-reveal>月方案、年方案、個人黑卡，差別都列在下面。</p>
 </div>
 <div class="wrap plan-grid">
  ${ve("monthly","01 ・ 起步","月方案","先把方舟用起來。","適合希望按月使用的你",de)}
  ${ve("annual","02 ・ 日常","年方案","讓方舟成為日常工具。","適合持續使用方舟的你",[...de,"一年完整使用週期"])}
  ${kt}
 </div>
 <p class="wrap plans-assure" data-reveal>付款開通後享 7 日確認期，適用條件見<a href="#refund-policy-title">7 日確認期與退費原則</a>。</p>
 <div class="wrap">${xt}</div>
 <div class="wrap rights">
  <p class="rights-equipment">個人黑卡方案不包含 Mac 電腦。</p>
  <details id="black-card-rights"><summary><span>查看完整 19 項權益</span><i aria-hidden="true">＋</i></summary>
   <ol>${ke.map(e=>{const t=Z(e);return`<li data-benefit="${t.id}"><h4>${t.title}</h4><p>${t.description}</p></li>`}).join("")}</ol>
  </details>
 </div>
</section>
${yt}`,Lt=`
<footer class="footer"><div class="wrap"><a class="brand" href="#home" aria-label="回到 ARK 方舟運算首頁"><span class="logo"><img src="${$("/assets/ark-logo.png")}" alt="ARK" width="56" height="56" loading="lazy"></span><span class="brand-name">方舟運算</span></a><span class="footer-line">從使用，到打造。</span><a class="footer-top" href="#home">回到頂端 ↑</a></div></footer>`;function ue(e,t){const a=e.dataset.plan;a==="studio"&&(t="once");const s=a==="monthly"?A.monthly.auto:A[a][t],n=a==="monthly"?A.monthly.points:A[a][t==="auto"?"autoPoints":"oncePoints"];l(".price strong",e).textContent=I(s),l(".points b",e).textContent=I(n),l(".points-cycle",e).textContent=a==="monthly"?"每月領":t==="auto"?"每年領":"一次領";const d=e.querySelector("[data-annual-value]");d&&(d.hidden=t!=="auto"),g("[data-billing]",e).forEach(i=>i.setAttribute("aria-pressed",String(i.dataset.billing===t))),l(".billing-note",e).textContent=t==="auto"?"依訂閱週期自動續訂":"一次付款，不自動續訂";const p=a==="monthly"?"monthly":a+(t==="auto"?"Auto":"Once"),o=l(".purchase",e),v=Je[p];v?(o.href=v,o.target="_blank",o.rel="noopener",o.removeAttribute("aria-disabled"),o.textContent=a==="studio"?"選擇個人黑卡":"選擇方案"):(o.removeAttribute("href"),o.setAttribute("aria-disabled","true"),o.textContent="訂閱連結即將開放")}function Et(){g("[data-plan]").forEach(e=>{ue(e,e.dataset.plan==="monthly"?"auto":"once"),g("[data-billing]",e).forEach(t=>t.addEventListener("click",()=>ue(e,t.dataset.billing)))}),g("[data-open-rights]").forEach(e=>e.addEventListener("click",()=>{l("#black-card-rights").open=!0})),location.hash==="#black-card-rights"&&(l("#black-card-rights").open=!0)}document.documentElement.classList.add("js");document.querySelector("#app").innerHTML=`
${Te}
<main id="main">
${qe}
${Ne}
${Ve}
${_e}
${Xe}
${it}
${nt}
${ht}
${At}
</main>
${Lt}`;Re();Be();Ze();ot();mt();Et();Se();Le();Pe();ze();je();Ae();Ee();
