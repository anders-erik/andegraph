


function newSourcefindSearchbar(){

	let sourcefindSearchbar = document.createElement('div');
	sourcefindSearchbar.id = 'sourcefind-searchbar';


	// searchbar label
	// let sourcefindSearchbarLabel = document.createElement('label');
	// sourcefindSearchbarLabel.id = 'sourcefind-searchbar-label';
	// sourcefindSearchbarLabel.htmlFor = 'sourcefind-searchbar-box';
	// sourcefindSearchbarLabel.textContent = 'searchbar';
	// sourcefindSearchbar.appendChild(sourcefindSearchbarLabel);


	let sourcefindSearchbarInput = document.createElement('input');
	sourcefindSearchbarInput.type = 'text';
	sourcefindSearchbarInput.id = 'sourcefind-searchbar-input';
	sourcefindSearchbarInput.placeholder = 'Source Search ...';

	sourcefindSearchbar.appendChild(sourcefindSearchbarInput);
	


	return sourcefindSearchbar;

}









function newSourcefindToday(){

	let sourcefindTodayContainer = document.createElement('div');
	sourcefindTodayContainer.id = 'sourcefind-today';

	let sourcefindToday = document.createElement('input');
	sourcefindToday.id = 'sourcefind-today-box';
	sourcefindToday.type = 'checkbox';
	sourcefindToday.addEventListener('change', todayBoxChanged);
	sourcefindTodayContainer.appendChild(sourcefindToday);
	// Today label
	let sourcefindTodayLabel = document.createElement('label');
	sourcefindTodayLabel.id = 'sourcefind-today-label';
	sourcefindTodayLabel.htmlFor = 'sourcefind-today-box';
	sourcefindTodayLabel.textContent = 'today';
	sourcefindTodayContainer.appendChild(sourcefindTodayLabel);


	return sourcefindTodayContainer;

}


function newSourcefindDaterangeContainer(){
	let sourcefindDaterangeContainer = document.createElement('div');
	sourcefindDaterangeContainer.id = 'sourcefind-daterange-container';


	let sourcefindDaterange = newSourcefindDaterange();
	sourcefindDaterangeContainer.appendChild(sourcefindDaterange);

	let sourcefindStartdate = document.createElement('input');
	sourcefindStartdate.id = 'sourcefind-startdate';
	sourcefindStartdate.value = (new Date(Date.now() - 7*86.4e6)).toISOString().substring(0, 10); // 7 dayys ago
	sourcefindDaterangeContainer.appendChild(sourcefindStartdate);

	let sourcefindEnddate = document.createElement('input');
	sourcefindEnddate.id = 'sourcefind-enddate';
	sourcefindEnddate.value = (new Date(Date.now())).toISOString().substring(0, 10); // Today
	sourcefindDaterangeContainer.appendChild(sourcefindEnddate);

	return sourcefindDaterangeContainer;
}




function newSourcefindDaterange(){

	let sourcefindRange = document.createElement('div');
	sourcefindRange.id = 'sourcefind-daterange';

	let sourcefindDaterange = document.createElement('input');
	sourcefindDaterange.id = 'sourcefind-daterange-box';
	sourcefindDaterange.type = 'checkbox';
	sourcefindDaterange.addEventListener('change', daterangeBoxChanged);
	sourcefindRange.appendChild(sourcefindDaterange);
	// Today label
	let sourcefindTodayLabel = document.createElement('label');
	sourcefindTodayLabel.id = 'sourcefind-daterange-label';
	sourcefindTodayLabel.htmlFor = 'sourcefind-daterange-box';
	sourcefindTodayLabel.textContent = 'Range';
	sourcefindRange.appendChild(sourcefindTodayLabel);


	return sourcefindRange;

}



function todayBoxChanged(event){

	if(event.target.checked){

		let rangeBox = document.getElementById('sourcefind-daterange-box');

		if(rangeBox.checked){

			rangeBox.checked = false;

		}

	}

}

function daterangeBoxChanged(event){
	
	if(event.target.checked){

		let todayBox = document.getElementById('sourcefind-today-box');

		if(todayBox.checked){

			todayBox.checked = false;

		}

	}

}


export {
	newSourcefindSearchbar,
	newSourcefindToday,
	newSourcefindDaterangeContainer,
	newSourcefindDaterange,
}


