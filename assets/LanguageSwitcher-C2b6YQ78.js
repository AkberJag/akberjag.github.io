import{M as k,u as v,N as p,O as b,o as h,c as m,b as i,d as w,t as y,e as u,F as x,r as _,n as C,h as $,A as M,B as S,P as I,p as L,S as T}from"./index-BRTq7Inv.js";/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=o=>o.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var g={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=({size:o,strokeWidth:s=2,absoluteStrokeWidth:n,color:c,iconNode:r,name:a,class:e,...l},{slots:t})=>k("svg",{...g,width:o||g.width,height:o||g.height,stroke:c||g.stroke,"stroke-width":n?Number(s)*24/Number(o):s,class:["lucide",`lucide-${P(a??"icon")}`],...l},[...r.map(f=>k(...f)),...t.default?[t.default()]:[]]);/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=(o,s)=>(n,{slots:c})=>k(z,{...n,iconNode:s,name:o},c);/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=d("CheckIcon",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=d("ChevronDownIcon",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=d("LaptopIcon",[["path",{d:"M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16",key:"tarvll"}]]);/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=d("MoonIcon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=d("PaletteIcon",[["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]]);/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=d("SunIcon",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]),A={class:"flex flex-col space-y-2"},j={class:"text-sm font-medium text-gray-600 dark:text-gray-300"},H={class:"font-semibold text-gray-900 dark:text-white"},O={class:"flex space-x-1"},R=["onClick","aria-label"],Q={__name:"ThemeSwitcher",setup(o){const{t:s}=v(),n=[{icon:D,value:p.LIGHT,label:"settings.theme.light"},{icon:B,value:p.DARK,label:"settings.theme.dark"},{icon:N,value:p.SYSTEM,label:"settings.theme.system"}],{theme:c,setTheme:r}=b(),a=e=>{const l=n.find(t=>t.value===e);if(!l)return e;if(l.value===p.SYSTEM){const t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";return s(l.label,{theme:s(`settings.theme.${t}`)})}return s(l.label)};return(e,l)=>(h(),m("div",A,[i("span",j,[w(y(e.$t("settings.theme.label"))+": ",1),i("span",H,y(a(u(c))),1)]),i("div",O,[(h(),m(x,null,_(n,t=>i("button",{key:t.value,onClick:f=>u(r)(t.value),class:C(["p-1.5 rounded-md transition-all duration-200 ease-in-out",u(c)===t.value?"bg-white dark:bg-gray-600 text-primary-500 shadow-sm":"text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"]),"aria-label":e.$t("aria.selectTheme",{theme:a(t.value)})},[(h(),$(M(t.icon),{size:"1.2em"}))],10,R)),64))])]))}},V={class:"flex items-center justify-between w-full"},q={class:"text-sm font-medium text-gray-600 dark:text-gray-300"},F={class:"relative"},K=["value"],Y=["value"],Z={class:"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400"},W={__name:"LanguageSwitcher",setup(o){const s=S(),{locale:n}=v(),c=async r=>{const a=s.currentRoute.value.fullPath;let e=a;r==="en"?e=a.replace(/^\/[a-z]{2}\//,"/"):e=T.some(t=>a.startsWith(`/${t}/`))?a.replace(/^\/[a-z]{2}\//,`/${r}/`):`/${r}${a}`,s.push(e),n.value=r,localStorage.setItem("preferredLocale",r)};return(r,a)=>(h(),m("div",V,[i("span",q,y(r.$t("settings.language.label"))+": ",1),i("div",F,[i("select",{value:u(n),onChange:a[0]||(a[0]=e=>c(e.target.value)),class:"appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-md pl-3 pr-8 py-1.5 text-sm font-medium transition-colors duration-200 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"},[(h(!0),m(x,null,_(u(I),e=>(h(),m("option",{key:e.code,value:e.code},y(e.name),9,Y))),128))],40,K),i("div",Z,[L(u(E),{class:"w-4 h-4"})])])]))}};export{U as C,J as P,Q as _,W as a,d as c};
