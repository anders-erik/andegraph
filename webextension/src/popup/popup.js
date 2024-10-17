
let defaultApiBaseUrl = "http://localhost:3000/api/v02"
let apiBaseUrl = ""



// TOGGLES EXTENSION WHEN OPENNING POPUP
// NOTE:  NO NAME CLASH WITH 'background.js' !
function sendToggleExtensionMessageToTabId() {
  browser.tabs.query({ active: true, currentWindow: true })
    .then((tabs) => {

      let activeTabId = tabs[0].id;

      console.log('Toggle extension for current tab!  id:', activeTabId);

      // sendToggleExtensionMessageToTabId(activeTabId)
      browser.tabs.sendMessage(activeTabId, {
        name: 'toggleExtension'
      });

    })
}





function onLocalStorageError(error){
  console.error(error)
}

async function readApiBaseUrlFromStorage() {
  return new Promise((resolve, reject) => {
    browser.storage.local.get("apiBaseString").then((storageObject) => { resolve(storageObject.apiBaseString) }, onLocalStorageError);
  }) 
}
function writeApiBaseUrlToStorage(_apiBaseString) {
  return new Promise((resolve, reject) => {
    browser.storage.local.set({ apiBaseString: _apiBaseString }, onLocalStorageError)
  })
}


async function popup_init(){

  apiBaseUrl = await readApiBaseUrlFromStorage();
  
  // If key was not found == first time loading the extension and we use the default api path
  if(apiBaseUrl === undefined)
    writeApiBaseUrlToStorage(defaultApiBaseUrl);
  

  // Base url : Label and input
  document.getElementById("api-base-label").textContent = apiBaseUrl;
  document.getElementById("api-base-input").value = apiBaseUrl;


  // Update Base URL -  event listener
  let updateBtn = document.getElementById("update-api-base-btn");
  updateBtn.addEventListener("click", (event) => {
    // NEW API BASE STRING
    apiBaseUrl = document.getElementById("api-base-input").value;
    document.getElementById("api-base-label").textContent = apiBaseUrl;

    // apiBaseUrl = document.getElementById("api-base-input").value;
    writeApiBaseUrlToStorage(apiBaseUrl);

  });


  // Toggle extension - event linstener
  let toggleBtn = document.getElementById("toggle-extension");
  toggleBtn.addEventListener("click", (event) => {
    
    sendToggleExtensionMessageToTabId();  

  });

}

popup_init();


// async function getCurrentApiBase(){
//   return new Promise((resolve, reject) => {


//     browser.tabs.query({ active: true, currentWindow: true })
//       .then((tabs) => {

//         let activeTabId = tabs[0].id;

//         // console.log('Toggle current tab!  id:', activeTabId);
//         // console.log('Getting apiBase from popup! : ', apiBase);

//         // sendToggleExtensionMessageToTabId(activeTabId)
//         browser.tabs.sendMessage(activeTabId, {
//           name: 'getApiBase'
//         })
//         .then((response) => {
//           apiBase = response.apiString;
//           // console.log("SET API BASE")
//           resolve();
//             // console.log("Message from the content script:");
//             // console.log(response.response);
//           // console.log("popup recieved string :", response.apiString)
//           })
//         .catch(error => {
//             console.error(error);
//             reject();
//           });


//       })

//   });
// }

// function sendApiBase() {
//   browser.tabs.query({ active: true, currentWindow: true })
//     .then((tabs) => {

//       let activeTabId = tabs[0].id;

//       // console.log('Toggle current tab!  id:', activeTabId);
//       // console.log('Sending apiBase from popup! : ', apiBase);

//       // sendToggleExtensionMessageToTabId(activeTabId)
//       browser.tabs.sendMessage(activeTabId, {
//         name: 'setApiBase',
//         apiBaseString: apiBase
//         })
//       .then((response) => {
//         // console.log("Message from the content script:");
//         console.log(response.response);
//         // console.log("popup recieved string :", response.newApiString)
//         })
//       .catch(error => {
//         console.error(error);
//       });

//     })

// }








// -----------------------------------------



// Memories from Beastify template! 
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute beastify content script: ${error.message}`);
}

// browser.tabs.executeScript({file: "/content_scripts/beastify.js"})
// .then(listenForClicks)
// .catch(reportExecuteScriptError);
