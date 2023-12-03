

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
	sourceviewId.textContent = sourceObject.id;
	/*
	for (const child of sourceviewId.children) {
		if(child.tagName !== 'DIV'){
			child.textContent = sourceObject.id;
		}
	}
*/
	let sourceviewDate = document.getElementById('sourceview-date-field');
	sourceviewDate.textContent = sourceObject.date;
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

function clearSourceviewPropertiescard(){
	console.log('clear');
	document.getElementById('sourceview-name-field').value = '';
	document.getElementById('sourceview-url-field').value = '';
	document.getElementById('sourceview-id-field').textContent = '';
	document.getElementById('sourceview-date-field').textContent = '';
}



export {
	loadSource,
	removeSourcefindCard,
	clearSourceviewPropertiescard
}
