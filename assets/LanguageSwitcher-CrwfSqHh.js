import{c as i}from"./_plugin-vue_export-helper-BaQyeMYJ.js";import{u as p,M as m,N as v,o as c,c as d,b as r,d as _,t as y,e as l,F as g,r as k,n as x,h as b,A as C,B as $,O as M,p as S,S as w}from"./index-BYTcmrfl.js";/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=i("CheckIcon",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=i("ChevronDownIcon",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=i("LaptopIcon",[["path",{d:"M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16",key:"tarvll"}]]);/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=i("MoonIcon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=i("PaletteIcon",[["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]]);/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=i("SunIcon",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]),P={class:"flex flex-col space-y-2"},E={class:"text-sm font-medium text-gray-600 dark:text-gray-300"},D={class:"font-semibold text-gray-900 dark:text-white"},B={class:"flex space-x-1"},N=["onClick","aria-label"],U={__name:"ThemeSwitcher",setup(f){const{t:o}=p(),h=[{icon:z,value:m.LIGHT,label:"settings.theme.light"},{icon:L,value:m.DARK,label:"settings.theme.dark"},{icon:I,value:m.SYSTEM,label:"settings.theme.system"}],{theme:u,setTheme:s}=v(),t=e=>{const n=h.find(a=>a.value===e);if(!n)return e;if(n.value===m.SYSTEM){const a=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";return o(n.label,{theme:o(`settings.theme.${a}`)})}return o(n.label)};return(e,n)=>(c(),d("div",P,[r("span",E,[_(y(e.$t("settings.theme.label"))+": ",1),r("span",D,y(t(l(u))),1)]),r("div",B,[(c(),d(g,null,k(h,a=>r("button",{key:a.value,onClick:A=>l(s)(a.value),class:x(["p-1.5 rounded-md transition-all duration-200 ease-in-out",l(u)===a.value?"bg-white dark:bg-gray-600 text-primary-500 shadow-sm":"text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"]),"aria-label":e.$t("aria.selectTheme",{theme:t(a.value)})},[(c(),b(C(a.icon),{size:"1.2em"}))],10,N)),64))])]))}},H={class:"flex items-center justify-between w-full"},O={class:"text-sm font-medium text-gray-600 dark:text-gray-300"},R={class:"relative"},V=["value"],j=["value"],q={class:"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400"},W={__name:"LanguageSwitcher",setup(f){const o=$(),{locale:h}=p(),u=async s=>{const t=o.currentRoute.value.fullPath;let e=t;s==="en"?e=t.replace(/^\/[a-z]{2}\//,"/"):e=w.some(a=>t.startsWith(`/${a}/`))?t.replace(/^\/[a-z]{2}\//,`/${s}/`):`/${s}${t}`,o.push(e),h.value=s,localStorage.setItem("preferredLocale",s)};return(s,t)=>(c(),d("div",H,[r("span",O,y(s.$t("settings.language.label"))+": ",1),r("div",R,[r("select",{value:l(h),onChange:t[0]||(t[0]=e=>u(e.target.value)),class:"appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-md pl-3 pr-8 py-1.5 text-sm font-medium transition-colors duration-200 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"},[(c(!0),d(g,null,k(l(M),e=>(c(),d("option",{key:e.code,value:e.code},y(e.name),9,j))),128))],40,V),r("div",q,[S(l(T),{class:"w-4 h-4"})])])]))}};export{G as C,K as P,U as _,W as a};
