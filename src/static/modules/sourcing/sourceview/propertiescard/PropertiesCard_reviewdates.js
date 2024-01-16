import { extractCurrentSourceId } from "./PropertiesCard_Extract.js";
import * as api from '../../../Fetches/api/api.js';
import * as models from "../../../models/models.js";


let mostRecentReviewDateId = 0;

function addReviewDatesElement() {
	// let sourceviewReviewDates = Elements.getDateViewer('sourceview-reviewdates');
	let sourceviewReviewDates = document.createElement('div');
	sourceviewReviewDates.id = 'sourceview-reviewdates';
	sourceviewReviewDates.classList.add('sourceview-element');

	let sourceviewDateAdd = document.createElement('div');
	sourceviewDateAdd.id = 'sourceview-dates-add';
	sourceviewDateAdd.classList.add('sourceview-dates-button');
	sourceviewDateAdd.textContent = 'A';
	sourceviewDateAdd.addEventListener('click', addReviewDateClicked);
	sourceviewReviewDates.appendChild(sourceviewDateAdd);

	let sourceviewDateComplete = document.createElement('div');
	sourceviewDateComplete.id = 'sourceview-dates-complete';
	sourceviewDateComplete.classList.add('sourceview-dates-button');
	sourceviewDateComplete.textContent = 'C';
	sourceviewDateComplete.addEventListener('click', completeReviewDateClicked);
	sourceviewReviewDates.appendChild(sourceviewDateComplete);

	let sourceviewDateUncomplete = document.createElement('div');
	sourceviewDateUncomplete.id = 'sourceview-dates-uncomplete';
	sourceviewDateUncomplete.classList.add('sourceview-dates-button');
	sourceviewDateUncomplete.textContent = 'U';
	sourceviewDateUncomplete.addEventListener('click', uncompleteReviewDateClicked);
	sourceviewReviewDates.appendChild(sourceviewDateUncomplete);

	let sourceviewDateGenerate = document.createElement('div');
	sourceviewDateGenerate.id = 'sourceview-dates-generate';
	sourceviewDateGenerate.classList.add('sourceview-dates-button');
	sourceviewDateGenerate.textContent = 'G';
	sourceviewDateGenerate.addEventListener('click', generateReviewDateClicked);
	sourceviewReviewDates.appendChild(sourceviewDateGenerate);

	let sourceviewDatesInput = document.createElement('input');
	sourceviewDatesInput.id = 'sourceview-dates-input';
	sourceviewDatesInput.textContent = 'inputinputinput';
	sourceviewDatesInput.style.backgroundColor = 'lightgray';
	sourceviewReviewDates.appendChild(sourceviewDatesInput);


	let sourceviewDateList = document.createElement('div');
	sourceviewDateList.id = 'sourceview-dates-list';
	sourceviewDateList.textContent = 'listlistlist';
	sourceviewReviewDates.appendChild(sourceviewDateList);
	//sourceviewDateList.classList.add('sourceview-element');


	return sourceviewReviewDates;
}


async function loadReviewDates(sourceId) {
	// console.log(api.getSourceReviewDates(sourceId));
	//let reviewDatesArray = await  api.getSourceReviewDates(sourceId);
	let reviewDatesArray = await api.getReviewDates(sourceId);

	//console.log(reviewDatesArray[0]);

	let sourceviewReviewDates = document.getElementById('sourceview-dates-list');
	sourceviewReviewDates.innerHTML = '';
	reviewDatesArray.forEach(reviewDate => {
		//console.log(reviewDate.date);
		let reviewDateLabel = document.createElement('label');
		if(reviewDate.completed){
			reviewDateLabel.classList.add('sourceview-dates-list-labels-done');

		}else {
			reviewDateLabel.classList.add('sourceview-dates-list-labels');
		}
		reviewDateLabel.addEventListener('click', reviewDateClicked);
		reviewDateLabel.textContent = reviewDate.date;
		reviewDateLabel.dataset.reviewDateId = reviewDate.id;
		sourceviewReviewDates.appendChild(reviewDateLabel);
	});

	//console.log('review dates loaded');
}




async function addReviewDateClicked() {

	let sourceId = extractCurrentSourceId();
	let dateInput = extractDateInput();
	
	//console.log(`Clicked to add ${dateInput} to source no. ${sourceId}`);
	if(validateDateInput(dateInput)){

		// setSchedule == 0 --> do no worry about the last parameters!
		// await api.postSourceReviewDates(sourceId, dateInput, 0, 'default', 0);
		await api.postReviewDate(models.createReviewDate(sourceId, dateInput));

	loadReviewDates(sourceId);
	
	}
	else{
		console.log('invalid date format!')
	}

	
}

async function completeReviewDateClicked() {

	let sourceId = extractCurrentSourceId();
	let dateInput = extractDateInput();

	//let reviewDateId = 
	
	//console.log(`Clicked to complete ${dateInput} belonging to source no. ${sourceId}`);
	if(validateDateInput(dateInput)){

		// Final parameter '1' : indicated that the date is to be marked as completed
		//await api.patchSourceReviewDate(sourceId, dateInput, 1);

		let reviewDateId = extractReviewDateIdFromTextInput();

		console.log(reviewDateId);

		if(reviewDateId == 0){
			console.log('No matching review date was found to complete.')
		}
		else{
			await api.patchReviewDate(reviewDateId, 1);
		}
		//await api.patchReviewDate(mostRecentReviewDateId, )

		//extractReviewDateIdFromTextInput()

		loadReviewDates(sourceId);

	}
	else{
		console.log('invalid date format!')
	}

	

	
}

async function uncompleteReviewDateClicked() {

	let sourceId = extractCurrentSourceId();
	let dateInput = extractDateInput();
	
	//console.log(`Clicked to uncomplete ${dateInput} belonging to source no. ${sourceId}`);

	if(validateDateInput(dateInput)){

		// Final parameter '0' : indicating that the date is to be marked as NOT completed
		//await api.patchSourceReviewDate(sourceId, dateInput, 0);

		let reviewDateId = extractReviewDateIdFromTextInput();
		
		console.log(reviewDateId);

		if(reviewDateId == 0){
			console.log('No matching review date was found to uncomplete.')
		}
		else{
			await api.patchReviewDate(reviewDateId, 0);
		}

		loadReviewDates(sourceId);

	}
	else{
		console.log('invalid date format!')
	}


	
}


/* 
NOTE
This function does not currently have a UI element!
If you need to delete just map temporarily map one of the other buttons to this function on click
*/
async function deleteReviewDateClicked() {

	let sourceId = extractCurrentSourceId();
	let dateInput = extractDateInput();
	
	//console.log(`Clicked to uncomplete ${dateInput} belonging to source no. ${sourceId}`);

	if(validateDateInput(dateInput)){

		// Final parameter '0' : indicating that the date is to be deleted
		await api.deleteSourceReviewDate(sourceId, dateInput, 0);

		loadReviewDates(sourceId);

	}
	else{
		console.log('invalid date format!')
	}


	
}


// Currently does nothing!
async function generateReviewDateClicked() {

	let sourceId = extractCurrentSourceId();
	
	console.log(`Clicked to generate a new schedule for source no. ${sourceId}`);
	
	loadReviewDates(sourceId);
}

function validateDateInput(inputString){

	let lengthCheck = (inputString.length == 10);
	let regexCheck = false;
	let dateParseCheck = !isNaN( Date.parse(inputString) );

	let regex = new RegExp(/^\d{4}-\d{2}-\d{2}/);
	regexCheck = regex.test(inputString);

	// console.log()
	// console.log(lengthCheck + ' ( length == 10 )');
	// console.log(regexCheck + ' ( regex match )');
	// console.log(dateParseCheck + ' ( Date.parse is a number )');
	// console.log()

	if(lengthCheck && regexCheck && dateParseCheck)
		return true;
	else
		return false;
}


async function reviewDateClicked(e){
	//console.log(e.target.innerHTML);
	//console.log(typeof(e.target.innerHTML));
	mostRecentReviewDateId = e.target.dataset.reviewDateId;
	console.log('ididid: ', mostRecentReviewDateId);
	writeDateInput(e.target.innerHTML);
}



function extractDateInput(){
	return document.getElementById('sourceview-dates-input').value;
}
function writeDateInput(DateInputString){
	document.getElementById('sourceview-dates-input').value = DateInputString;
}

function extractReviewDateIdFromTextInput(){
	let reviewDateId = 0;


	let reviewDateList = document.getElementsByClassName('sourceview-dates-list-labels-done');
	for(let reviewDateLabel of reviewDateList){
		if(extractDateInput() == reviewDateLabel.textContent){
			//console.log(reviewDateLabel.dataset.reviewDateId);
			reviewDateId = reviewDateLabel.dataset.reviewDateId;
		}
	}

	reviewDateList = document.getElementsByClassName('sourceview-dates-list-labels');
	for(let reviewDateLabel of reviewDateList){
		if(extractDateInput() == reviewDateLabel.textContent){
			//console.log(reviewDateLabel.dataset.reviewDateId);
			reviewDateId = reviewDateLabel.dataset.reviewDateId;
		}
	}

	return reviewDateId;
}

export {
	addReviewDatesElement,
	loadReviewDates,
	reviewDateClicked
}