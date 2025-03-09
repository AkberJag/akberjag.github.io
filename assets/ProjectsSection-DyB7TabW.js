import{u as h,D as g,k as _,o as i,c as l,b as e,t as s,e as r,h as m,w as p,F as c,r as d,i as b}from"./index-DHiwvfJ6.js";import{_ as x}from"./TheCarousel-BodRhXWH.js";import"./LanguageSwitcher-B3nhswim.js";const k={class:"flex items-center justify-center min-h-screen"},f={class:"min-w-0 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"},v={class:"text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center"},y={class:"p-1 h-full"},w={class:"bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 h-full flex flex-col"},S={class:"text-base font-semibold mb-2 text-gray-900 dark:text-white"},j={class:"text-gray-600 dark:text-gray-300 text-xs mb-3 flex-grow"},B={class:"mt-auto"},V={class:"flex flex-wrap gap-1 mb-2"},z=["href"],A={class:"p-2 h-full"},O={class:"bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-full flex flex-col"},C={class:"text-lg font-semibold mb-2 text-gray-900 dark:text-white"},D={class:"text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow"},F={class:"mt-auto"},J={class:"flex flex-wrap gap-1 mb-3"},L=["href"],T={class:"p-2 h-full"},E={class:"bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-full flex flex-col"},G={class:"text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white"},I={class:"text-gray-600 dark:text-gray-300 text-sm md:text-base mb-4 flex-grow"},N={class:"mt-auto"},W={class:"flex flex-wrap gap-1 mb-3"},Q=["href"],$={key:3,class:"grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"},q={class:"text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-white"},H={class:"text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow"},K={class:"mt-auto"},M={class:"flex flex-wrap gap-1 mb-3"},P=["href"],te={__name:"ProjectsSection",setup(R){const{t:o}=h(),a=g(()=>[{title:o("sections.projects.items.blockBuster.title"),description:o("sections.projects.items.blockBuster.description"),link:"https://play.google.com/store/apps/details?id=com.weegames.blockbuster",technologies:["Godot","GDScript","Android"]},{title:o("sections.projects.items.portfolioTemplate.title"),description:o("sections.projects.items.portfolioTemplate.description"),link:"https://github.com/AkberJag/portfolio-template",technologies:["Vue.js","Tailwind CSS","PrimeVue 4"]},{title:o("sections.projects.items.openPizza.title"),description:o("sections.projects.items.openPizza.description"),link:"https://github.com/AkberJag/openPizza",technologies:["FastAPI","Vue.js","PrimeVue 4"]},{title:o("sections.projects.items.milkyBot.title"),description:o("sections.projects.items.milkyBot.description"),link:"https://github.com/AkberJag/openPizza",technologies:["Python","SQLite","AWS-EC2","AWS-Lambda"]}]),u=_([{breakpoint:"1024px",numVisible:3,numScroll:1},{breakpoint:"768px",numVisible:2,numScroll:1},{breakpoint:"560px",numVisible:1,numScroll:1}]);return(U,X)=>(i(),l("div",k,[e("div",f,[e("h2",v,s(r(o)("sections.projects.name")),1),a.value.length>2?(i(),m(x,{key:0,items:a.value,numVisible:1,numScroll:1,circular:"",responsiveOptions:u.value,class:"pb-6 sm:hidden"},{item:p(t=>[e("div",y,[e("div",w,[e("h3",S,s(t.data.title),1),e("p",j,s(t.data.description),1),e("div",B,[e("div",V,[(i(!0),l(c,null,d(t.data.technologies.slice(0,4),n=>(i(),l("span",{key:n,class:"bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"},s(n),1))),128))]),e("a",{href:t.data.link,target:"_blank",rel:"noopener noreferrer",class:"text-blue-500 hover:underline text-xs inline-block"},s(r(o)("sections.projects.viewButton")),9,z)])])])]),_:1},8,["items","responsiveOptions"])):b("",!0),a.value.length>2?(i(),m(x,{key:1,items:a.value,numVisible:2,numScroll:1,circular:"",responsiveOptions:u.value,class:"pb-6 hidden sm:block lg:hidden"},{item:p(t=>[e("div",A,[e("div",O,[e("h3",C,s(t.data.title),1),e("p",D,s(t.data.description),1),e("div",F,[e("div",J,[(i(!0),l(c,null,d(t.data.technologies.slice(0,4),n=>(i(),l("span",{key:n,class:"bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"},s(n),1))),128))]),e("a",{href:t.data.link,target:"_blank",rel:"noopener noreferrer",class:"text-blue-500 hover:underline text-sm inline-block"},s(r(o)("sections.projects.viewButton")),9,L)])])])]),_:1},8,["items","responsiveOptions"])):b("",!0),a.value.length>2?(i(),m(x,{key:2,items:a.value,numVisible:3,numScroll:1,circular:"",responsiveOptions:u.value,class:"pb-6 hidden lg:block"},{item:p(t=>[e("div",T,[e("div",E,[e("h3",G,s(t.data.title),1),e("p",I,s(t.data.description),1),e("div",N,[e("div",W,[(i(!0),l(c,null,d(t.data.technologies.slice(0,4),n=>(i(),l("span",{key:n,class:"bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"},s(n),1))),128))]),e("a",{href:t.data.link,target:"_blank",rel:"noopener noreferrer",class:"text-blue-500 hover:underline text-sm md:text-base inline-block"},s(r(o)("sections.projects.viewButton")),9,Q)])])])]),_:1},8,["items","responsiveOptions"])):(i(),l("div",$,[(i(!0),l(c,null,d(a.value,t=>(i(),l("div",{key:t.title,class:"bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col h-full"},[e("h3",q,s(t.title),1),e("p",H,s(t.description),1),e("div",K,[e("div",M,[(i(!0),l(c,null,d(t.technologies.slice(0,4),n=>(i(),l("span",{key:n,class:"bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"},s(n),1))),128))]),e("a",{href:t.link,target:"_blank",rel:"noopener noreferrer",class:"text-blue-500 hover:underline text-xs sm:text-sm"},s(r(o)("sections.projects.viewButton")),9,P)])]))),128))]))])]))}};export{te as default};
