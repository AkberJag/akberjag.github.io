const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AboutSection-DUL5m0sh.js","assets/_plugin-vue_export-helper-DlAUqK2U.js","assets/index-BXF3np4k.js","assets/index-BTI23JKY.css","assets/ContactSection-D7SbNU8a.js","assets/mail-yMY1fcMY.js","assets/createLucideIcon-QM0rs0EG.js","assets/HomeSection-C6sDLOZj.js","assets/chevron-right-Be_Js_fb.js","assets/x-CXOe2gB-.js","assets/LicensesCertifications-qG6SxWRe.js","assets/TheCarousel-B5GflgxN.js","assets/ProjectsSection-C3vsbVEN.js"])))=>i.map(i=>d[i]);
import{u as P,a as O,o as c,c as v,b as l,d as R,t as S,e as g,F as A,r as L,n as C,f as j,g as q,h as z,i as N,v as U,j as H,k as b,l as I,m as F,p as y,w as D,T as V,q as G,s as B,x as K,y as J,z as Q,A as W,B as X,C as M,_ as T}from"./index-BXF3np4k.js";import{C as Y,P as Z,_ as ee,a as te}from"./LanguageSwitcher-B4HuvbnW.js";import"./createLucideIcon-QM0rs0EG.js";const oe=(p,n,u)=>{const s=p[n];return s?typeof s=="function"?s():Promise.resolve(s):new Promise((d,t)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(t.bind(null,new Error("Unknown variable dynamic import: "+n+(n.split("/").length!==u?". Note that variables only represent file names one level deep.":""))))})},ne={class:"w-full space-y-3"},ae={class:"flex items-center justify-between"},se={class:"text-sm font-medium text-gray-600 dark:text-gray-300"},re={class:"font-semibold text-primary capitalize"},ie={class:"grid grid-cols-8 gap-2"},le=["aria-label","onClick"],ce={__name:"AccentColorPicker",setup(p){const{t:n}=P(),{selectedColor:u,displayColor:s,setAccentColor:d}=O(),t=r=>({"ring-2 ring-offset-2 ring-white dark:ring-gray-900":r===u.value}),m=r=>n(`settings.accentColor.${r.toLowerCase()}`);return(r,i)=>(c(),v("div",ne,[l("div",ae,[l("span",se,[R(S(r.$t("settings.accentColor.label"))+": ",1),l("span",re,S(m(g(s))),1)])]),l("div",ie,[(c(!0),v(A,null,L(g(U),f=>(c(),v("button",{key:f,class:C(["w-6 h-6 rounded-full transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-gray-900",t(f)]),style:j({backgroundColor:g(q)[f][500]}),"aria-label":r.$t("aria.selectColor",{color:m(f)}),onClick:k=>g(d)(f)},[f===g(u)?(c(),z(g(Y),{key:0,class:"w-3 h-3 text-white mx-auto"})):N("",!0)],14,le))),128))])]))}},ue={class:"flex items-center justify-between"},de={class:"text-sm font-medium text-gray-900 dark:text-gray-100"},ve={__name:"ScrollBarToggle",setup(p){const n=H("showScrollbar"),u=()=>{n.value=!n.value};return(s,d)=>(c(),v("div",ue,[l("span",de,S(s.$t("settings.showScrollbar.label"))+":",1),l("button",{onClick:u,class:C(["relative inline-flex h-6 w-11 items-center rounded-full",g(n)?"bg-primary-500 dark:bg-primary-600":"bg-gray-200 dark:bg-gray-700"])},[l("span",{class:C(["inline-block h-4 w-4 transform rounded-full bg-white transition",g(n)?"translate-x-6":"translate-x-1"])},null,2)],2)]))}},me={class:"relative"},pe=["aria-expanded"],fe={key:0,class:"theme-customizer-popover fixed bottom-20 right-4 w-72 rounded-2xl shadow-xl bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden",role:"menu","aria-orientation":"vertical","aria-labelledby":"theme-menu"},he={class:"p-4 space-y-6",role:"none"},ge={class:"px-4 py-3 bg-gray-50 dark:bg-gray-700/50 text-xs text-gray-500 dark:text-gray-400"},_e={__name:"SettingsButton",setup(p){const n=b(!1),u=()=>{n.value=!n.value},s=d=>{n.value&&!d.target.closest(".theme-customizer-button")&&!d.target.closest(".theme-customizer-popover")&&(n.value=!1)};return I(()=>{document.addEventListener("click",s)}),F(()=>{document.removeEventListener("click",s)}),(d,t)=>(c(),v("div",me,[l("button",{class:"theme-customizer-button fixed bottom-4 right-4 z-50 p-3 rounded-full shadow-lg bg-white dark:bg-gray-800 text-primary-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900",onClick:u,"aria-haspopup":"true","aria-expanded":n.value},[y(g(Z),{class:"w-6 h-6"})],8,pe),(c(),z(G,{to:"body"},[y(V,{"enter-active-class":"transition duration-200 ease-out","enter-from-class":"transform scale-95 opacity-0","enter-to-class":"transform scale-100 opacity-100","leave-active-class":"transition duration-150 ease-in","leave-from-class":"transform scale-100 opacity-100","leave-to-class":"transform scale-95 opacity-0"},{default:D(()=>[n.value?(c(),v("div",fe,[l("div",he,[l("div",null,[y(ee)]),l("div",null,[y(ce)]),l("div",null,[y(ve)]),l("div",null,[y(te)])]),l("div",ge,S(d.$t("settings.customize.label")),1)])):N("",!0)]),_:1})]))]))}},ye={class:"absolute inset-0 overflow-hidden opacity-50 pointer-events-none"},be={__name:"StarryBackground",props:{starCount:{type:Number,default:100}},setup(p){const n=p,u=["text-yellow-300 dark:text-yellow-200","text-orange-300 dark:text-orange-200","text-pink-300 dark:text-pink-200","text-purple-300 dark:text-purple-200"],s=["•","✦","✧","+","×","★","✸"],d=b([]),t=()=>{d.value=Array.from({length:n.starCount},(m,r)=>({id:r,color:u[Math.floor(Math.random()*u.length)],shape:s[Math.floor(Math.random()*s.length)],left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,duration:2+Math.random()*3}))};return I(()=>{t()}),(m,r)=>(c(),v("div",ye,[(c(!0),v(A,null,L(d.value,i=>(c(),v("div",{key:i.id,class:C(["absolute text-xs md:text-sm",i.color]),style:j({left:i.left,top:i.top,animation:`twinkle ${i.duration}s infinite`})},S(i.shape),7))),128))]))}},we=[{key:"home",path:"home",component:"HomeSection",translationKey:"sections.home"},{key:"about",path:"about",component:"AboutSection",translationKey:"sections.about"},{key:"licensesAndCerts",path:"licenses-and-certs",component:"LicensesCertifications",translationKey:"sections.licensesAndCerts"},{key:"projects",path:"projects",component:"ProjectsSection",translationKey:"sections.projects"},{key:"contact",path:"contacts",component:"ContactSection",translationKey:"sections.contact"}],ke={sections:we},xe={id:"section-nav",class:"fixed right-6 top-1/2 -translate-y-1/2 z-50","aria-label":"Section navigation"},Se={class:"flex flex-col items-center space-y-4"},Ce={class:"w-4 h-4 flex items-center justify-center"},$e=["onClick","onMouseenter","aria-label","aria-current"],Te={key:0,class:"absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap"},Ee={class:"px-2 py-1 text-sm font-medium bg-primary rounded-md shadow-md text-white"},Ae={__name:"NavigationDots",props:{sections:{type:Array,required:!0,validator:p=>p.every(n=>"translationKey"in n||"name"in n)},activeSection:{type:Number,required:!0}},emits:["navigate"],setup(p,{emit:n}){const{t:u}=P(),s=p,d=n,t=b(null),m=b(!1),r=b(null),i=b(!1);I(()=>{i.value="ontouchstart"in window||navigator.maxTouchPoints>0,i.value&&(window.addEventListener("scroll",f,{passive:!0}),window.addEventListener("touchstart",k,{passive:!0}))}),B(()=>{i.value&&(window.removeEventListener("scroll",f),window.removeEventListener("touchstart",k)),clearTimeout(r.value)});const f=()=>t.value=null,k=e=>{const o=document.getElementById("section-nav");o&&!o.contains(e.target)&&(t.value=null)},$=e=>({"rounded-full transition-all duration-300 ease-in-out":!0,"bg-primary w-4 h-4":s.activeSection===e||t.value===e,"bg-primary-200 w-2 h-2":s.activeSection!==e&&t.value!==e,"hover:bg-primary-400 hover:w-3 hover:h-3":!i.value&&s.activeSection!==e&&t.value!==e}),x=e=>{e!==s.activeSection&&(d("navigate",e),i.value&&(t.value=e,setTimeout(()=>t.value=null,1500)))},E=e=>e.translationKey?u(e.translationKey+".name"):e.name,a=e=>{const o=E(e);return u("aria.navigateToSection",{section:o})};return K(()=>s.activeSection,(e,o)=>{e!==o&&(m.value=!0,clearTimeout(r.value),r.value=setTimeout(()=>{m.value=!1,t.value=null},1e3))}),(e,o)=>(c(),v("nav",xe,[l("ul",Se,[(c(!0),v(A,null,L(p.sections,(h,_)=>(c(),v("li",{key:_,class:"relative group"},[l("div",Ce,[l("button",{onClick:w=>x(_),onMouseenter:w=>!i.value&&(t.value=_),onMouseleave:o[0]||(o[0]=w=>!i.value&&(t.value=null)),class:C($(_)),"aria-label":a(h),"aria-current":p.activeSection===_?"page":void 0},null,42,$e)]),y(V,{"enter-active-class":"transition ease-out duration-300","enter-from-class":"opacity-0 -translate-x-2","leave-active-class":"transition ease-in duration-300","leave-to-class":"opacity-0 -translate-x-2"},{default:D(()=>[t.value===_||p.activeSection===_&&m.value?(c(),v("div",Te,[l("span",Ee,S(E(h)),1)])):N("",!0)]),_:2},1024)]))),128))])]))}},Le=["id"],Ie={class:"flex-grow overflow-y-auto"},Me={__name:"PortfolioView",setup(p){const{t:n}=P(),u=X(),s=Q(),d=b(!1);M("showScrollbar",d);const t=ke.sections;M("sections",t);const m=b(0),r=b(null),i=b(!1);let f=null;const k=a=>{const e=t[a];if(e){const o=s.params.lang||"en";u.replace({path:`/${o}/${e.path}`})}},$=a=>{const e=t[a];if(e&&e.translationKey){const o=`${e.translationKey}.pageTitle`;document.title=n(o)}},x=(a,e=!0)=>{if(!r.value){console.warn("Container not available for navigation");return}const o=r.value.querySelectorAll(".snap-start");if(!o||o.length===0){console.warn("No section elements found for navigation");return}o[a]?(o[a].scrollIntoView({behavior:e?"smooth":"auto"}),k(a),m.value=a,t[a]&&$(a)):console.warn(`Section at index ${a} not found`)};K(()=>s.params.section,a=>{if(i.value&&a){const e=t.findIndex(o=>o.path===a);e!==-1&&e!==m.value&&x(e)}});const E=Object.fromEntries(t.map(a=>[a.component,J(()=>oe(Object.assign({"../components/sections/AboutSection.vue":()=>T(()=>import("./AboutSection-DUL5m0sh.js"),__vite__mapDeps([0,1,2,3])),"../components/sections/ContactSection.vue":()=>T(()=>import("./ContactSection-D7SbNU8a.js"),__vite__mapDeps([4,2,3,5,6])),"../components/sections/HomeSection.vue":()=>T(()=>import("./HomeSection-C6sDLOZj.js"),__vite__mapDeps([7,2,3,8,6,9])),"../components/sections/LicensesCertifications.vue":()=>T(()=>import("./LicensesCertifications-qG6SxWRe.js"),__vite__mapDeps([10,2,3,11,6,8])),"../components/sections/ProjectsSection.vue":()=>T(()=>import("./ProjectsSection-C3vsbVEN.js"),__vite__mapDeps([12,2,3,11,6,8]))}),`../components/sections/${a.component}.vue`,4))]));return I(()=>{setTimeout(()=>{const a=r.value.querySelectorAll(".snap-start");if(!a||a.length===0){console.warn("No section elements found. Components may not be fully rendered yet.");return}const e=s.params.section,o=e?t.findIndex(h=>h.path===e):0;if(o!==-1){const h=a[o];h?(m.value=o,t[o]&&$(o),h.scrollIntoView({behavior:"auto"})):x(0)}else x(0);setTimeout(()=>{i.value=!0},200),f=new IntersectionObserver(h=>{h.forEach(_=>{if(_.isIntersecting&&i.value){const w=Array.from(a).indexOf(_.target);m.value!==w&&(m.value=w,k(w),t[w]&&$(w))}})},{threshold:.5,root:r.value}),a.forEach(h=>f.observe(h))})}),B(()=>{f&&f.disconnect()}),(a,e)=>(c(),v("div",{ref_key:"container",ref:r,class:C(["w-full h-screen overflow-y-scroll snap-y snap-mandatory bg-slate-100 dark:bg-gray-900 transition-colors duration-700",d.value?"scrollbar-visible":"scrollbar-hidden"])},[y(be),(c(!0),v(A,null,L(g(t),(o,h)=>(c(),v("div",{key:h,class:"w-full h-screen flex flex-col snap-start",id:o.path},[l("div",Ie,[(c(),z(W(g(E)[o.component]),{section:o},null,8,["section"]))])],8,Le))),128)),y(Ae,{sections:g(t),activeSection:m.value,onNavigate:x,class:"fixed right-4 top-1/2 -translate-y-1/2 z-20"},null,8,["sections","activeSection"]),y(_e,{class:"z-20"})],2))}};export{Me as default};
