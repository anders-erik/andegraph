
import { fetchSourcesClicked } from "./Searchcard.js";


// Search bar Variables
let searchbar;
let searchbarInterval;
let searchbarIntervalDelay = 500; // ms
let intervalSearchLastString = '';


function newSourcefindSearchbar(){


	// searchbar label
	// let sourcefindSearchbarLabel = document.createElement('label');
	// sourcefindSearchbarLabel.id = 'sourcefind-searchbar-label';
	// sourcefindSearchbarLabel.htmlFor = 'sourcefind-searchbar-box';
	// sourcefindSearchbarLabel.textContent = 'searchbar';
	// sourcefindSearchbar.appendChild(sourcefindSearchbarLabel);


	let sourcefindSearchbar = document.createElement('input');
	sourcefindSearchbar.type = 'text';
	sourcefindSearchbar.id = 'sourcefind-searchbar';
	sourcefindSearchbar.placeholder = 'Source Search ...';

	sourcefindSearchbar.addEventListener('focusout', searchBarFocusout);
	sourcefindSearchbar.addEventListener('focus', searchBarFocus);
	
	searchbar = sourcefindSearchbar;

	//sourcefindSearchbar.appendChild(sourcefindSearchbarInput);
	

	return sourcefindSearchbar;

}



function newSourcefindReview(){

	let sourcefindReviewContainer = document.createElement('div');
	sourcefindReviewContainer.id = 'sourcefind-review';

	let sourcefindReview = document.createElement('input');
	sourcefindReview.id = 'sourcefind-review-box';
	sourcefindReview.type = 'checkbox';
	sourcefindReview.addEventListener('change', reviewBoxChange);
	if(localStorage.getItem("reviewBoxChecked") == 1){
		sourcefindReview.checked = true;
	}
	sourcefindReviewContainer.appendChild(sourcefindReview);



	// Today label
	let sourcefindReviewLabel = document.createElement('label');
	sourcefindReviewLabel.id = 'sourcefind-review-label';
	sourcefindReviewLabel.htmlFor = 'sourcefind-review-box';
	sourcefindReviewLabel.textContent = 'Review';
	sourcefindReviewContainer.appendChild(sourcefindReviewLabel);


	return sourcefindReviewContainer;

}





function newSourcefindDaterangeContainer(){
	let sourcefindDaterangeContainer = document.createElement('div');
	sourcefindDaterangeContainer.id = 'sourcefind-daterange-container';


	let sourcefindDaterange = newSourcefindDaterange();
	sourcefindDaterangeContainer.appendChild(sourcefindDaterange);

	let sourcefindStartdate = document.createElement('input');
	sourcefindStartdate.id = 'sourcefind-startdate';
	sourcefindStartdate.value = (new Date(Date.now() - 7*86.4e6)).toISOString().substring(0, 10); // 7 dayys ago
	sourcefindStartdate.addEventListener('change', daterangeInputChange);
	sourcefindDaterangeContainer.appendChild(sourcefindStartdate);

	let sourcefindEnddate = document.createElement('input');
	sourcefindEnddate.id = 'sourcefind-enddate';
	sourcefindEnddate.value = (new Date(Date.now())).toISOString().substring(0, 10); // Today
	sourcefindEnddate.addEventListener('change', daterangeInputChange);
	sourcefindDaterangeContainer.appendChild(sourcefindEnddate);

	return sourcefindDaterangeContainer;
}

function daterangeInputChange(){
	fetchSourcesClicked();
}

function newSourcefindDaterange(){

	let sourcefindRange = document.createElement('div');
	sourcefindRange.id = 'sourcefind-daterange';

	let sourcefindDaterange = document.createElement('input');
	sourcefindDaterange.id = 'sourcefind-daterange-box';
	sourcefindDaterange.type = 'checkbox';
	sourcefindDaterange.addEventListener('change', daterangeBoxChanged);
	sourcefindRange.appendChild(sourcefindDaterange);
	if(localStorage.getItem("daterangeBoxChecked") == 1){
		sourcefindDaterange.checked = true;
	}
		

	// Daterange label
	let sourcefindDaterangeLabel = document.createElement('label');
	sourcefindDaterangeLabel.id = 'sourcefind-daterange-label';
	sourcefindDaterangeLabel.htmlFor = 'sourcefind-daterange-box';
	sourcefindDaterangeLabel.textContent = 'Range';
	sourcefindRange.appendChild(sourcefindDaterangeLabel);


	return sourcefindRange;

}






function newSourcefindAsc(){

	let sourcefindAscContainer = document.createElement('div');
	sourcefindAscContainer.id = 'sourcefind-asc';

	let sourcefindAsc = document.createElement('input');
	sourcefindAsc.id = 'sourcefind-asc-box';
	sourcefindAsc.type = 'checkbox';
	sourcefindAsc.addEventListener('change', ascBoxChanged);
	if(localStorage.getItem("ascBoxChecked") == 1){
		sourcefindAsc.checked = true;
	}
	sourcefindAscContainer.appendChild(sourcefindAsc);


	// Asc label
	let sourcefindAscLabel = document.createElement('label');
	sourcefindAscLabel.id = 'sourcefind-asc-label';
	sourcefindAscLabel.htmlFor = 'sourcefind-asc-box';
	sourcefindAscLabel.textContent = 'ASC';
	sourcefindAscContainer.appendChild(sourcefindAscLabel);


	return sourcefindAscContainer;

}




function newSourcefindToday(){

	let sourcefindTodayContainer = document.createElement('div');
	sourcefindTodayContainer.id = 'sourcefind-today';

	let sourcefindToday = document.createElement('input');
	sourcefindToday.id = 'sourcefind-today-box';
	sourcefindToday.type = 'checkbox';
	sourcefindToday.addEventListener('change', todayBoxChanged);
	if(localStorage.getItem("todayBoxChecked") == 1){
		sourcefindToday.checked = true;
	}
	
	sourcefindTodayContainer.appendChild(sourcefindToday);

	// Today label
	let sourcefindTodayLabel = document.createElement('label');
	sourcefindTodayLabel.id = 'sourcefind-today-label';
	sourcefindTodayLabel.htmlFor = 'sourcefind-today-box';
	sourcefindTodayLabel.textContent = 'Today';
	sourcefindTodayContainer.appendChild(sourcefindTodayLabel);


	return sourcefindTodayContainer;

}






/* 

BOX CHANGES

*/

function reviewBoxChange(event){
	document.getElementById('sourcefind-daterange-box').checked = false;
	document.getElementById('sourcefind-today-box').checked = false;
	document.getElementById('sourcefind-asc-box').checked = false;

	localStorage.setItem("daterangeBoxChecked", 0);
	localStorage.setItem("todayBoxChecked", 0);
	localStorage.setItem("ascBoxChecked", 0);


	
	if(event.target.checked){
		localStorage.setItem("reviewBoxChecked", 1);
	}
	else {
		localStorage.setItem("reviewBoxChecked", 0);
	}

	fetchSourcesClicked();
}


function ascBoxChanged(event){
	document.getElementById('sourcefind-review-box').checked = false;
	localStorage.setItem("reviewBoxChecked", 0);

	if(event.target.checked){
		localStorage.setItem("ascBoxChecked", 1);

	}
	else {
		localStorage.setItem("ascBoxChecked", 0);
	}

	fetchSourcesClicked();
}

function todayBoxChanged(event){
	document.getElementById('sourcefind-review-box').checked = false;
	localStorage.setItem("reviewBoxChecked", 0);

	if(event.target.checked){
		localStorage.setItem("todayBoxChecked", 1);
		localStorage.setItem("daterangeBoxChecked", 0);

		let rangeBox = document.getElementById('sourcefind-daterange-box');

		if(rangeBox.checked){

			rangeBox.checked = false;

		}
		
	}
	else {
		localStorage.setItem("todayBoxChecked", 0);
	}

	fetchSourcesClicked();
}

function daterangeBoxChanged(event){
	document.getElementById('sourcefind-review-box').checked = false;
	localStorage.setItem("reviewBoxChecked", 0);
	
	if(event.target.checked){
		localStorage.setItem("daterangeBoxChecked", 1);
		localStorage.setItem("todayBoxChecked", 0);

		let todayBox = document.getElementById('sourcefind-today-box');

		if(todayBox.checked){

			todayBox.checked = false;

		}

	}
	else {
		localStorage.setItem("daterangeBoxChecked", 0);
	}

	fetchSourcesClicked();
}





/* 

AUTOSEARCH

*/

function searchBarFocusout(event){

	clearInterval(searchbarInterval);

}

function searchBarFocus(event){
	
	searchbarInterval = setInterval(autosearchFunction, searchbarIntervalDelay);

}

function autosearchFunction() {

	if(searchbar.value !== intervalSearchLastString) {
		//console.log('Search: ', searchbar.value);
		fetchSourcesClicked();
	}
	
	intervalSearchLastString = searchbar.value;
}




export {
	newSourcefindSearchbar,
	newSourcefindAsc,
	newSourcefindReview,
	newSourcefindToday,
	newSourcefindDaterangeContainer,
	newSourcefindDaterange,
}


