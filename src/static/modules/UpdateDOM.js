

function loadSource(sourceObject) {
	console.log('loading source');
	console.log(sourceObject);
	let sourceviewPropertiescardInner = document.getElementById('sourceview-propertiescard-outer');
	
	let sourceviewName = document.getElementById('sourceview-name-field');
	sourceviewName.value = sourceObject.name;
	
	// for (const child of sourceviewName.children) {
	// 	if(child.tagName !== 'DIV'){
	// 		child.value = sourceObject.name;
	// 	}
	// }

	let sourceviewUrl = document.getElementById('sourceview-url-field');
	sourceviewUrl.value = sourceObject.url;

	// for (const child of sourceviewUrl.children) {
	// 	if(child.tagName !== 'DIV'){
	// 		child.value = sourceObject.url;
	// 	}
	// }
	
	let sourceviewId = document.getElementById('sourceview-id-field');
	sourceviewId.value = sourceObject.id;
	/*
	for (const child of sourceviewId.children) {
		if(child.tagName !== 'DIV'){
			child.textContent = sourceObject.id;
		}
	}
*/
	let sourceviewDate = document.getElementById('sourceview-date-field');
	sourceviewDate.value = sourceObject.date;
	/*
	for (const child of sourceviewDate.children) {
		if(child.tagName !== 'DIV'){
			child.textContent = sourceObject.date;
		}
	}
	*/

}


function removeSourcefindCard(id){
	document.getElementById('sourcefind-sourcecard-' + id).remove();
	console.log('remove card');
}

function updateSourcefindCard(id){
	//let currentSourcefindCard = document.getElementById('sourcefind-sourcecard-' + id);
	document.getElementById('sourcefind-name-' + id).textContent = document.getElementById('sourceview-name-field').value;
	document.getElementById('sourcefind-id-' + id).textContent = document.getElementById('sourceview-id-field').value;
	document.getElementById('sourcefind-date-' + id).textContent = document.getElementById('sourceview-date-field').value;

	console.log('updated curent Sourcefind card');
}

function clearSourceviewPropertiescard(){
	console.log('clear');
	document.getElementById('sourceview-name-field').value = '';
	document.getElementById('sourceview-url-field').value = '';
	document.getElementById('sourceview-id-field').textContent = '';
	document.getElementById('sourceview-date-field').textContent = '';
}

function highlightSourceCard(elementId){
	// https://getcssscan.com/css-box-shadow-examples
	document.getElementById(elementId).style.boxShadow = 'rgb(51, 51, 51) 0px 0px 0px 2px';
	//document.getElementById(elementId).style.boxShadow = 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset';
}

function unhighlightAllSourceCards(){
	let sourcecardArray = document.getElementsByClassName('sourcefind-sourcecard');
	//console.log(sourcecardArray.toString());

	for (let card of sourcecardArray){
		//card.style.border = 'solid black 0px';
		card.style.boxShadow = '';
	}
	
}

export {
	loadSource,
	removeSourcefindCard,
	updateSourcefindCard,
	clearSourceviewPropertiescard,
	highlightSourceCard,
	unhighlightAllSourceCards
}
