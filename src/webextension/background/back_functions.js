


async function writeCurrentTabToState() {
	// console.log(onActivatedObject)
	// let tabs = await browser.tabs.get(onActivatedObject.tabId); // get tab info from change-event
	let tabs = await browser.tabs.query({ active: true, currentWindow: true });

	// console.log(tabs)
	extensionState.current_tabId = tabs[0].id;
	extensionState.current_tabUrl = tabs[0].url;
	extensionState.current_tabTitle = tabs[0].title;

	console.log('Current tab written to state. : ', "id:", extensionState.current_tabId, ",   title: ", extensionState.current_tabTitle.substring(0, 20))

}




// NO LONGER USED
function updateStateOnTabChange(onActivatedObject) {
	return new Promise(async (acc, rej) => {

		await browser.tabs.get(onActivatedObject.tabId)

		setStateTabInfo();

		acc()

	})
}











