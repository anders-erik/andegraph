
/**
 * Auxillary panel content types
 * @readonly
 * @enum {number}
 */
const Devices = {
	Desktop: 0,
	Tablet_V: 1,
	Tablet_H: 2,
	Phone_V: 3,
	Phone_H: 4,
}


class Device {

	vw;
	vh;

	windowInnerWidth;
	windowInnerHeight;

	windowScreenWidth;
	windowScreenHeight;

	documentDocumentElementClientWidth; 
	documentDocumentElementClientHeight;

	documentBodyClientWidth;
	documentBodyClientHeight;

	/**
	 * The currently used device
	 * @type {Device}
	 */
	device;

	constructor() {
		this.setPageDimensions();

		// let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
		// let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
	}


	/** Stores the available page dimensions. */
	setPageDimensions(){
		this.windowInnerWidth  = window.innerWidth;
		this.windowInnerHeight = window.innerHeight;

		this.windowScreenWidth =  window.screen.width;
		this.windowScreenHeight =  window.screen.height;

		this.documentDocumentElementClientWidth = document.documentElement.clientWidth;
		this.documentDocumentElementClientHeight = document.documentElement.clientHeight;

		this.documentBodyClientWidth = document.body.clientWidth;
		this.documentBodyClientHeight = document.body.clientHeight;
	}


	printDimenesions(){
		console.log("window.innerWidth = ", this.windowInnerWidth)
		console.log("window.innerHeight = ", this.windowInnerHeight)
		console.log("window.screen.width = ", this.windowScreenWidth)
		console.log("window.screen.height = ", this.windowScreenHeight)
		console.log("document.documentBody.clientWidth = ", this.documentDocumentElementClientWidth)
		console.log("document.documentBody.clientHeight = ", this.documentDocumentElementClientHeight)
		console.log("document.body.clientWidth = ", this.documentBodyClientWidth)
		console.log("document.body.clientHeight = ", this.documentBodyClientHeight)
	}

	setDevice(){
		
	}

	
}

export const device = new Device();

