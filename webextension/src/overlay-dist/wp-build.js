(()=>{"use strict";let e,t,n,o,r,i,c,s,l="http://localhost:3000/api/v02";browser.runtime.onMessage.addListener((e=>(console.log("Message recieved in dbi-send.ts!"),"setApiBase"===e.name?(l=e.apiBaseString,Promise.resolve({response:"Api updated in content script. [dbi-send.js]",newApiString:l})):"getApiBase"===e.name?Promise.resolve({apiString:l}):void 0)));class a{static Content_SelectOnTitleLikeString(e,t,n,o,r){return i=this,c=void 0,a=function*(){let i=l+`/content/Content-SelectOnTitleLikeString?searchString=${e}&tableLimit=${t}&includeTable=${n}&orderColumn=${o}&desc=${r}`;const c={method:"GET"};try{let e=yield fetch(i,c);if(!e.ok)return console.warn("Fetch returned "+e.status+" from "+l),[];const t=yield e.json();return console.log(e.status,i),t}catch(e){console.error(e)}},new((s=void 0)||(s=Promise))((function(e,t){function n(e){try{r(a.next(e))}catch(e){t(e)}}function o(e){try{r(a.throw(e))}catch(e){t(e)}}function r(t){var r;t.done?e(t.value):(r=t.value,r instanceof s?r:new s((function(e){e(r)}))).then(n,o)}r((a=a.apply(i,c||[])).next())}));var i,c,s,a}}function d(e){let t=browser.runtime.getURL("html/"+e);return fetch(t).then((e=>e.text())).then((e=>e)).catch((e=>"Error in 'fetchHtml'. File:  fetcher.ts "))}function h(e){let t=browser.runtime.getURL("css/"+e);return fetch(t).then((e=>e.text())).then((e=>e)).catch((e=>"Error in 'fetchCss'. File: fetcher.ts"))}console.log("Loaded dbi-send.ts");let g={active:!1};console.log("OVERLAY TS INIT"),r=document.createElement("div"),r.id="age_overlayContainer",d("overlay.html").then((i=>{var l;r.innerHTML=i,c=r.querySelector("#age_contextOverlay"),s=r.querySelector("#age_overlayRightPanel"),l=s,console.log("OVERLAY TS INIT"),e=l,t=document.createElement("div"),t.id="age_projectContainer",d("projects.html").then((e=>{t.innerHTML=e})),n=document.createElement("style"),n.id="age_projectStyle",h("projects.css").then((e=>{n.innerText=e})),console.log("sidePanel.id = ",e.id),e.append(t),a.Content_SelectOnTitleLikeString("","50","","","").then((e=>(o=e,Promise.resolve(e)))).catch((e=>Promise.reject())).then((e=>{console.log(e)}))})),i=document.createElement("style"),i.id="age_overlayStyle",h("overlay.css").then((e=>{i.innerText=e})),browser.runtime.onMessage.addListener((e=>{console.log("ToggleExitension Message recieved!"),"toggleExtension"===e.name&&(g.active?(console.log("STOP"),g.active=!1,r.remove(),i.remove(),n.remove()):(console.log("START"),g.active=!0,document.body.lastElementChild.after(r),document.head.append(i),document.head.append(n)))}))})();