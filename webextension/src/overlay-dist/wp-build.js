(()=>{"use strict";var e,t,n,r,o,c;function i(e){var t=browser.runtime.getURL("html/"+e);return fetch(t).then((function(e){return e.text()})).then((function(e){return e})).catch((function(e){return"Error in 'fetchHtml'. File:  fetcher.ts"}))}function a(e){var t=browser.runtime.getURL("css/"+e);return fetch(t).then((function(e){return e.text()})).then((function(e){return e})).catch((function(e){return"Error in 'fetchCss'. File: fetcher.ts"}))}var l={active:!1};console.log("OVERLAY TS INIT"),(r=document.createElement("div")).id="age_overlayContainer",i("overlay.html").then((function(o){r.innerHTML=o,r.querySelector("#age_contextOverlay"),c=r.querySelector("#age_overlayRightPanel"),e=c,console.log("OVERLAY TS INIT"),(t=document.createElement("div")).id="age_projectContainer",i("projects.html").then((function(e){t.innerHTML=e})),(n=document.createElement("style")).id="age_projectStyle",a("projects.css").then((function(e){n.innerText=e})),console.log("sidePanel.id = ",e.id),e.append(t)})),(o=document.createElement("style")).id="age_overlayStyle",a("overlay.css").then((function(e){o.innerText=e})),browser.runtime.onMessage.addListener((function(e){console.log("ToggleExitension Message recieved!"),"toggleExtension"===e.name&&(l.active?(console.log("STOP"),l.active=!1,r.remove(),o.remove(),n.remove()):(console.log("START"),l.active=!0,document.body.lastElementChild.after(r),document.head.append(o),document.head.append(n)))}))})();