
import * as Elements from '../../../../Elements.js';
//import * as Fetches from '../../../../Fetches/BaseFetches.js'
//import * as UpdateDOM from '../../UpdateDOM.js';

import * as PropertiesCard from '../../../sourceview/propertiescard/PropertiesCard.js';


function createSourcefindSourcecard(fetchedSource){
	let sourcefindListcard = document.getElementById('sourcefind-listcard');

	let sourcefindSourcecard = document.createElement('div');
	sourcefindSourcecard.id = 'sourcefind-sourcecard-' + fetchedSource.id;
	sourcefindSourcecard.classList.add('sourcefind-sourcecard');
	sourcefindSourcecard.tabIndex = 0;
	sourcefindSourcecard.addEventListener('click', sourceCardClicked);
	

	//sourcefindSourcecard.textContent = 'sourcefind-sourcecard-' + fetchedSource.id;
	
	//let sourcefindName = createReadElement('sourcefind-name-' + fetchedSource.id, 'source name:', fetchedSource.name);
	let sourcefindName = Elements.getSosLabel('sourcefind-title-' + fetchedSource.id, fetchedSource.title);
	sourcefindName.classList.add('sourcefind-title', 'sourcefind-label');
	sourcefindSourcecard.appendChild(sourcefindName);

	let sourcefindId = Elements.getSosLabel('sourcefind-id-' + fetchedSource.id, fetchedSource.id);
	sourcefindId.classList.add('sourcefind-id', 'sourcefind-label');
	sourcefindSourcecard.appendChild(sourcefindId);

	let sourcefindDate = Elements.getSosLabel('sourcefind-datecreated-' + fetchedSource.id, fetchedSource.dateCreated);
	sourcefindDate.classList.add('sourcefind-datecreated', 'sourcefind-label');
	sourcefindSourcecard.appendChild(sourcefindDate);


	sourcefindListcard.appendChild(sourcefindSourcecard);

	return sourcefindSourcecard;
}


let sourceCardClicked = async function(e){
	let clickedElementId = e.target.id;
	let sourceId = clickedElementId.match(/\d+$/g)
	//console.log('source clicked: ' + sourceId );

	history.pushState({}, '', '/sourcing/' + sourceId);

	// let fetchedSource = await Fetches.getSource(sourceId);
	// console.log(fetchedSource);

	//PropertiesCard.loadSource(fetchedSource);
	PropertiesCard.loadSource(sourceId);

	unhighlightAllSourceCards();
	highlightSourceCard(clickedElementId);
}

function highlightSourceCard(elementId){
	// https://getcssscan.com/css-box-shadow-examples
	document.getElementById(elementId).style.boxShadow = 'var(--shadow-0)';
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

/* 
UPDATE DOM
*/

function removeSourcefindCard(id){
	document.getElementById('sourcefind-sourcecard-' + id).remove();
	//console.log(`Source Card with id = ${id} has been removed`);
}

function updateSourcefindCard(id){
	//let currentSourcefindCard = document.getElementById('sourcefind-sourcecard-' + id);
	//console.log(document.getElementById('sourcefind-title-' + id).textContent);
	
	//console.log(id)

	document.getElementById('sourcefind-title-' + id).textContent = document.getElementById('sourceview-title-field').value;
	document.getElementById('sourcefind-id-' + id).textContent = document.getElementById('sourceview-id-field').value;
	document.getElementById('sourcefind-datecreated-' + id).textContent = document.getElementById('sourceview-datecreated-field').value;

	//console.log('updated curent Sourcefind card');
}




export {
	createSourcefindSourcecard,
	highlightSourceCard,
	unhighlightAllSourceCards,
	
	removeSourcefindCard,
	updateSourcefindCard
}