import { dbis } from "../../dbi-send/dbi-send.js";
import { determineClipboardContentType } from "../../filehandling/DetermineClipboardContents.js";


export class FileContent {

	contentcardElement;
	contentContainer;

	contentObject;

	element;
	fileElement;

	constructor(contentcardElement, contentContainer) {
		this.contentcardElement = contentcardElement;
		this.contentObject = this.contentcardElement.contentObject;
		this.contentContainer = contentContainer;
		this.contentContainer.innerHTML = ``;

		this.element = document.createElement('div');
		// this.element.tabIndex = 0;
		// this.element.contentEditable = true;
		this.element.classList.add('fileContent');


		// this.element.addEventListener('keydown', this.keydown.bind(this));

		// this.element.textContent = "FILE";

		this.loadFileIntoDom();

		this.contentContainer.append(this.element);
	}

	loadFileIntoDom() {
		let uuid = this.contentObject.Uuid;

		dbis.Get_File(uuid)
			.then((file) => {

				let fileSrc = URL.createObjectURL(file)

				switch (this.contentObject.Type) {

					case 'image':
						this.loadImage(fileSrc)
						break;

					case 'video':
						this.loadVideo(fileSrc)
						break;

					default:
						break;
				}


			})
	}


	loadImage(fileSrc) {
		// file.name = this.contentObject.Uuid + "." + this.contentObject.Extension;
		// console.log(file)
		// console.log(this.contentObject);

		this.fileElement = document.createElement('img');
		this.fileElement.classList.add('fileElement');
		this.fileElement.src = fileSrc;
		this.element.append(this.fileElement)
	}

	loadVideo(fileSrc) {
		// file.name = this.contentObject.Uuid + "." + this.contentObject.Extension;
		// console.log(file)
		// console.log(this.contentObject);

		this.fileElement = document.createElement('video');
		this.fileElement.classList.add('fileElement');
		this.fileElement.setAttribute("controls", "controls");
		this.fileElement.setAttribute("preload", "auto"); // this enabled they playback to work as expected!

		this.fileElement.src = fileSrc;
		this.element.append(this.fileElement)
	}

	// keydown(event) {

	// 	if (event.key === 'Space') {
	// 		console.log('GOGO SOURCE')
	// 	}


	// }



}