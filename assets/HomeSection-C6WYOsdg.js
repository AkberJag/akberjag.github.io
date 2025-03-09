import{u as te,D as H,j as oe,k as i,x as re,l as ae,m as se,Q as ne,o as c,c as h,b as t,n as _,t as d,e as l,d as V,h as O,w as g,i as E,E as le,p as v,F as Y,r as F,T as I,q as ie}from"./index-UalFd06b.js";import{C as ce}from"./chevron-right-CwuDxjoF.js";import{c as de}from"./LanguageSwitcher-CKovmuLi.js";import{X as ue}from"./x-B3R5Y_2h.js";/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=de("ExternalLinkIcon",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]),me={class:"flex flex-col items-center justify-center min-h-screen text-gray-800 dark:text-white p-4 relative"},fe={class:"text-center z-10 space-y-6"},ve={class:"text-4xl md:text-5xl font-bold"},ye={class:"text-3xl md:text-4xl font-bold"},he={class:"text-teal-500 dark:text-teal-400"},pe={class:"text-xl md:text-2xl"},be={class:"text-lg text-gray-600 dark:text-gray-400"},xe={class:"flex flex-wrap justify-center gap-4"},we={class:"relative"},ke={class:"py-2 space-y-4",role:"menu","aria-orientation":"vertical","aria-labelledby":"products-menu"},_e={class:"space-y-3 max-h-60 overflow-y-auto"},ge=["href"],Ee={class:"flex items-start justify-between"},Ce={class:"font-medium text-gray-900 dark:text-white"},Te={key:0,class:"products-action-sheet fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-2xl shadow-xl z-50 overflow-hidden max-h-[85vh] flex flex-col"},Le={class:"px-4 py-2 flex items-center justify-between border-b border-gray-200 dark:border-gray-700"},Re={class:"text-lg font-bold text-gray-900 dark:text-white"},Se={class:"py-2 overflow-y-auto flex-grow"},Ie={class:"space-y-1"},Me=["href"],Pe={class:"flex items-start justify-between"},Ne={class:"font-medium text-gray-900 dark:text-white text-lg"},w=100,M=50,Ae=5e3,ze=3e3,Ve={__name:"HomeSection",setup(Be){const{t:s,locale:G}=te(),u=H(()=>({greeting:s("sections.home.greeting"),name:s("sections.home.personName"),secondaryName:s("sections.home.secondaryName"),title:s("sections.home.title"),subtitle:s("sections.home.subtitle")})),C=[{name:"sections.home.products.items[0]",url:"products/telebot"},{name:"sections.home.products.items[1]",url:"products/weeGames"}],Q=oe("sections"),P=H(()=>Q.find(e=>e.key==="contact")),N=i(null),m=i(null),T=i(!0),L=i(!1),n=i(!1),p=i(null),U=i(null),f=i(!1),A=i(!1);let b=null,y=null;const X=()=>(y&&y.abort(),new AbortController),k=async(e,o,r=w,a)=>{if(e){e.textContent="";for(let S=0;S<o.length&&!(a!=null&&a.aborted);S++)e.textContent+=o.charAt(S),await new Promise(ee=>setTimeout(ee,r))}},z=async(e,o=M,r)=>{if(e)for(;e.textContent.length>0&&!(r!=null&&r.aborted);)e.textContent=e.textContent.slice(0,-1),await new Promise(a=>setTimeout(a,o))},J=()=>{b&&clearInterval(b),b=setInterval(()=>{T.value=!T.value},500)},K=async e=>{if(m.value){if(!u.value.secondaryName){await k(m.value,u.value.name,w,e);return}for(;!(e!=null&&e.aborted)&&(await k(m.value,u.value.name,w,e),!(e!=null&&e.aborted||(await new Promise(o=>{const r=setTimeout(o,Ae);e==null||e.addEventListener("abort",()=>clearTimeout(r))}),e!=null&&e.aborted)||(await z(m.value,M,e),e!=null&&e.aborted)||(await k(m.value,u.value.secondaryName,w,e),e!=null&&e.aborted)||(await new Promise(o=>{const r=setTimeout(o,ze);e==null||e.addEventListener("abort",()=>clearTimeout(r))}),e!=null&&e.aborted)));)await z(m.value,M,e)}},B=async()=>{y=X();const e=y.signal;J(),await k(N.value,u.value.greeting,w,e),!e.aborted&&(L.value=!0,await new Promise(o=>{const r=setTimeout(o,1e3);e==null||e.addEventListener("abort",()=>clearTimeout(r))}),!e.aborted&&K(e))},R=()=>{f.value=window.innerWidth<768},Z=()=>{if(!p.value)return!1;const e=p.value.getBoundingClientRect(),r=window.innerHeight-e.bottom,a=Math.min(C.length*50+40,200);return r<a+20},$=()=>{R(),A.value=Z(),n.value=!n.value,document.body.style.overflow=f.value&&n.value?"hidden":""},x=()=>{n.value=!1,document.body.style.overflow=""},j=e=>{if(!n.value||!p.value)return;const o=document.querySelector(".products-popover"),r=document.querySelector(".products-backdrop");!p.value.contains(e.target)&&(o&&!o.contains(e.target)||r&&r.contains(e.target))&&x()},D=()=>{R(),n.value&&!f.value&&x()},q=()=>{n.value&&!f.value&&x()};return re(G,B),ae(()=>{B(),R(),document.addEventListener("click",j),window.addEventListener("resize",D),window.addEventListener("scroll",q)}),se(()=>{b&&clearInterval(b),y&&y.abort(),document.body.style.overflow="",document.removeEventListener("click",j),window.removeEventListener("resize",D),window.removeEventListener("scroll",q)}),(e,o)=>{const r=ne("router-link");return c(),h("div",null,[t("div",me,[t("div",fe,[t("h1",ve,[t("span",{ref_key:"greetingRef",ref:N,class:"inline-block"},null,512),t("span",{class:_(["inline-block w-0.5 h-8 bg-gray-800 dark:bg-white ml-1",{"opacity-0":!T.value}])},null,2)]),t("div",{class:_(["space-y-6 transition-opacity duration-1000",{"opacity-0":!L.value,"opacity-100":L.value}])},[t("h2",ye,[t("span",he,d(l(s)("sections.home.itsMe")),1),o[0]||(o[0]=V("  ")),t("span",{ref_key:"alternatingTextRef",ref:m,class:"text-yellow-500 dark:text-yellow-400"},null,512)]),t("p",pe,d(u.value.title),1),t("p",be,d(u.value.subtitle),1),t("div",xe,[P.value?(c(),O(r,{key:0,to:"/"+P.value.path,class:"inline-block px-8 py-3 font-bold text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-gradient-to-bl from-primary-400 to-primary-600 hover:from-primary-500 hover:to-primary-700 dark:from-primary-500 dark:to-primary-700 dark:hover:from-primary-600 dark:hover:to-primary-800"},{default:g(()=>[V(d(l(s)("sections.home.getInTouch")),1)]),_:1},8,["to"])):E("",!0),t("div",we,[t("button",{ref_key:"productsButtonRef",ref:p,class:"inline-flex items-center px-8 py-3 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border-2 border-primary-500 text-primary-600 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/20",onClick:le($,["stop"])},[t("span",null,d(l(s)("sections.home.products.title")),1),v(l(ce),{class:_([{"rotate-90":n.value},"size-5 ml-2 transition-transform duration-300"])},null,8,["class"])],512),v(I,{"enter-active-class":"transition duration-300 ease-out","enter-from-class":"transform -translate-y-4 opacity-0","enter-to-class":"transform translate-y-0 opacity-100","leave-active-class":"transition duration-200 ease-in","leave-from-class":"transform translate-y-0 opacity-100","leave-to-class":"transform -translate-y-4 opacity-0"},{default:g(()=>[n.value&&!f.value?(c(),h("div",{key:0,ref_key:"popoverRef",ref:U,class:_(["products-popover absolute right-0 rounded-2xl shadow-xl bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50 overflow-hidden min-w-64 w-full",A.value?"bottom-full mb-2":"top-full mt-2"])},[t("div",ke,[t("div",_e,[(c(),h(Y,null,F(C,a=>t("a",{key:a.name,href:a.url,target:"_blank",rel:"noopener noreferrer",class:"block p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"},[t("div",Ee,[t("h4",Ce,d(l(s)(a.name)),1),v(l(W),{class:"h-4 w-4 text-gray-400 mt-1 flex-shrink-0"})])],8,ge)),64))])])],2)):E("",!0)]),_:1})])])],2)])]),(c(),O(ie,{to:"body"},[v(I,{"enter-active-class":"transition-opacity duration-300 ease-out","enter-from-class":"opacity-0","enter-to-class":"opacity-100","leave-active-class":"transition-opacity duration-200 ease-in","leave-from-class":"opacity-100","leave-to-class":"opacity-0"},{default:g(()=>[n.value&&f.value?(c(),h("div",{key:0,class:"products-backdrop fixed inset-0 bg-black bg-opacity-50 z-40",onClick:x})):E("",!0)]),_:1}),v(I,{"enter-active-class":"transition-transform duration-300 ease-out","enter-from-class":"transform translate-y-full","enter-to-class":"transform translate-y-0","leave-active-class":"transition-transform duration-200 ease-in","leave-from-class":"transform translate-y-0","leave-to-class":"transform translate-y-full"},{default:g(()=>[n.value&&f.value?(c(),h("div",Te,[o[1]||(o[1]=t("div",{class:"pt-2 pb-1 flex justify-center"},[t("div",{class:"w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"})],-1)),t("div",Le,[t("h3",Re,d(l(s)("sections.home.products.title")),1),t("button",{class:"p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700",onClick:x},[v(l(ue),{class:"text-gray-600 dark:text-gray-400"})])]),t("div",Se,[t("div",Ie,[(c(),h(Y,null,F(C,a=>t("a",{key:a.name,href:a.url,target:"_blank",rel:"noopener noreferrer",class:"block p-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"},[t("div",Pe,[t("h4",Ne,d(l(s)(a.name)),1),v(l(W),{class:"h-5 w-5 text-gray-500 dark:text-gray-400 mt-1 flex-shrink-0"})])],8,Me)),64))])]),o[2]||(o[2]=t("div",{class:"h-6"},null,-1))])):E("",!0)]),_:1})]))])}}};export{Ve as default};
