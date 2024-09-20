
let apiBase = "http://localhost:3000/api/v02"

// extension environment
console.log('choose_beast this: ', this)



// TOGGLES EXTENSION WHEN OPENNING POPUP
// ALSO NO NAME CLASH WITH 'background.js'
function sendToggleExtensionMessageToTabId() {
  browser.tabs.query({ active: true, currentWindow: true })
    .then((tabs) => {

      let activeTabId = tabs[0].id;

      console.log('Toggle current tab!  id:', activeTabId);

      // sendToggleExtensionMessageToTabId(activeTabId)
      browser.tabs.sendMessage(activeTabId, {
        name: 'toggleExtension'
      });

    })


}
// sendToggleExtensionMessageToTabId();


async function popup_init(){

  // Get api base from front
  try {
    await getCurrentApiBase();
  } catch (error) {
    console.error("Unable to get api base string from content string.");
    return;
  }
  // console.log("SET API BASE 2")
  // console.log('POPUP INIT!');

  // make sure intial api is setup
  document.getElementById("api-base-label").textContent = apiBase;
  document.getElementById("api-base-input").value = apiBase;


  let updateBtn = document.getElementById("update-api-base-btn");

  updateBtn.addEventListener("click", (event) => {
    // NEW API BASE STRING
    apiBase = document.getElementById("api-base-input").value;
    document.getElementById("api-base-label").textContent = apiBase;

    sendApiBase();

  });

  

  let toggleBtn = document.getElementById("toggle-extension");

  toggleBtn.addEventListener("click", (event) => {
    
    sendToggleExtensionMessageToTabId();  

  });
}


async function getCurrentApiBase(){
  return new Promise((resolve, reject) => {

 

    browser.tabs.query({ active: true, currentWindow: true })
      .then((tabs) => {

        let activeTabId = tabs[0].id;

        // console.log('Toggle current tab!  id:', activeTabId);
        // console.log('Getting apiBase from popup! : ', apiBase);

        // sendToggleExtensionMessageToTabId(activeTabId)
        browser.tabs.sendMessage(activeTabId, {
          name: 'getApiBase'
        })
        .then((response) => {
          apiBase = response.apiString;
          // console.log("SET API BASE")
          resolve();
            // console.log("Message from the content script:");
            // console.log(response.response);
          // console.log("popup recieved string :", response.apiString)
          })
        .catch(error => {
            console.error(error);
            reject();
          });


      })

  });
}

function sendApiBase() {
  browser.tabs.query({ active: true, currentWindow: true })
    .then((tabs) => {

      let activeTabId = tabs[0].id;

      // console.log('Toggle current tab!  id:', activeTabId);
      // console.log('Sending apiBase from popup! : ', apiBase);

      // sendToggleExtensionMessageToTabId(activeTabId)
      browser.tabs.sendMessage(activeTabId, {
        name: 'setApiBase',
        apiBaseString: apiBase
        })
      .then((response) => {
        // console.log("Message from the content script:");
        console.log(response.response);
        // console.log("popup recieved string :", response.newApiString)
        })
      .catch(error => {
        console.error(error);
      });

    })

}

popup_init();







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
