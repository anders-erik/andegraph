
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
		
		this.updateDeviceObject();
		
		window.addEventListener("resize", this.onWindowResize.bind(this));
		
	}

	/**
	 * @type {Event} - windowResizeEvent
	 */
	onWindowResize(windowResizeEvent){
		// console.log('RESIZE!!!!', windowResizeEvent);
		this.updateDeviceObject();
		console.log("Updated Device Object: ", this);
	}


	/** Stores the available page dimensions. */
	updateDeviceObject(){

		this.windowInnerWidth  = window.innerWidth;
		this.windowInnerHeight = window.innerHeight;

		this.windowScreenWidth =  window.screen.width;
		this.windowScreenHeight =  window.screen.height;

		this.documentDocumentElementClientWidth = document.documentElement.clientWidth;
		this.documentDocumentElementClientHeight = document.documentElement.clientHeight;

		this.documentBodyClientWidth = document.body.clientWidth;
		this.documentBodyClientHeight = document.body.clientHeight;

		
		let vw = Math.max(this.documentDocumentElementClientWidth || 0, this.windowInnerWidth || 0)
		let vh = Math.max(this.documentDocumentElementClientHeight || 0, this.windowInnerHeight || 0)
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

