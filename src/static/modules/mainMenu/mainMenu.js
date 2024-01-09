

import * as Sourcing from '../sourcing/sourcing.js';

import * as Homedash from '../homedash/homedash.js';

import * as App from '../App.js';


let createMainMenu = function(){

	let mainMenu = document.createElement('div');
	mainMenu.id = 'mainMenu';

	addMainMenuButtons(mainMenu);

	return mainMenu;

}


let addMainMenuButtons = function(mainMenu){

	let mainMenuHome = document.createElement('div');
	mainMenuHome.id = 'mainMenuHome';
	mainMenuHome.classList.add('mainMenuButton');
	mainMenuHome.textContent = 'H';
	mainMenuHome.addEventListener('click', homeButtonClicked);
	mainMenu.appendChild(mainMenuHome);


	let mainMenuSourcing = document.createElement('div');
	mainMenuSourcing.id = 'mainMenuSourcing';
	mainMenuSourcing.classList.add('mainMenuButton');
	mainMenuSourcing.textContent = 'S';
	mainMenuSourcing.addEventListener('click', sourcingButtonClicked);
	mainMenu.appendChild(mainMenuSourcing);

}


let homeButtonClicked = function(event){
	//console.log(event.target.id);

	// https://developer.mozilla.org/en-US/docs/Web/API/History/pushState
	history.pushState({}, '', '/');
	Homedash.loadHomedash();
}

let sourcingButtonClicked = function(event){
	//console.log(event.target.id);

	// https://developer.mozilla.org/en-US/docs/Web/API/History/pushState
	history.pushState({}, '', '/sourcing/');
	Sourcing.loadSourcing();

}


// https://gomakethings.com/how-to-detect-when-the-browser-url-changes-with-vanilla-js/
window.addEventListener('popstate', function (event) {
	console.log('pop');
	App.loadMainFromUrlPath(window.location.pathname);
});




export {
	createMainMenu
}