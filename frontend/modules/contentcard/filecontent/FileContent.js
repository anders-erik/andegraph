import { dbis } from "../../dbi-send/dbi-send.js";
// import { determineClipboardContentType } from "../../filehandling/DetermineClipboardContents.js";


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

		if (this.contentObject.Type === '') {
			console.log('No file-type detected for file', this.contentObject.Uuid)

			this.fileElement = document.createElement('div');
			this.fileElement.classList.add('fileElement', 'noFile');

			this.element.innerHTML = `<p> NO FILE DETECTED </p>`;
			this.element.append(this.fileElement)

			return;
		}

		dbis.Get_File(uuid)
			.then((file) => {

				let fileSrc = URL.createObjectURL(file)

				switch (this.contentObject.Type) {

					case 'audio':
						this.loadAudio(fileSrc);
						break;

					case 'image':
						this.loadImage(fileSrc);
						break;

					case 'video':
						this.loadVideo(fileSrc);
						break;
					
					case 'pdf':
						this.loadPdf(fileSrc, uuid);
						break;

					default:
						this.loadOther(fileSrc);
						break;
				}


			})
	}

	loadAudio(fileSrc) {
		// file.name = this.contentObject.Uuid + "." + this.contentObject.Extension;
		// console.log(file)
		// console.log(this.contentObject);

		this.fileElement = document.createElement('audio');
		this.fileElement.classList.add('fileElement', 'audio');
		this.fileElement.setAttribute('controls', 'controls');

		this.fileElement.src = fileSrc;
		this.element.append(this.fileElement)
	}

	loadImage(fileSrc) {
		// file.name = this.contentObject.Uuid + "." + this.contentObject.Extension;
		// console.log(file)
		// console.log(this.contentObject);

		this.fileElement = document.createElement('img');
		this.fileElement.classList.add('fileElement', 'image');
		this.fileElement.src = fileSrc;
		this.element.append(this.fileElement)
	}

	loadVideo(fileSrc) {
		// file.name = this.contentObject.Uuid + "." + this.contentObject.Extension;
		// console.log(file)
		// console.log(this.contentObject);

		this.fileElement = document.createElement('video');
		this.fileElement.classList.add('fileElement', 'video');
		this.fileElement.setAttribute("controls", "controls");
		this.fileElement.setAttribute("preload", "auto"); // this enabled they playback to work as expected!

		this.fileElement.src = fileSrc;
		this.element.append(this.fileElement)
	}

	loadPdf(fileSrc, _uuid) {
		this.fileElement = document.createElement('div');
		this.fileElement.classList.add('fileElement', 'other');

		this.fileElement.innerHTML = `
			<p>FILE</p>
			<div>
				<p>DOWNLOAD</p>
				<a href="${fileSrc}" download="${this.contentObject.Title}">${this.contentObject.Title + '.' + this.contentObject.Extension} </a>
			</div>
			<div>
				<p>OPEN</p>
				<a href="/pdf/${_uuid}" target="_blank">${this.contentObject.Title + '.' + this.contentObject.Extension} </a>
			</div>
			
		`;
		this.element.append(this.fileElement)
	}


	loadOther(fileSrc) {
		this.fileElement = document.createElement('div');
		this.fileElement.classList.add('fileElement', 'other');

		this.fileElement.innerHTML = `
			<p>FILE</p>
			<div>
				<p>DOWNLOAD</p>
				<a href="${fileSrc}" download="${this.contentObject.Title}">${this.contentObject.Title + '.' + this.contentObject.Extension} </a>
			</div>
			<div>
				<p>OPEN</p>
				<a href="${fileSrc}" target="_blank">${this.contentObject.Title + '.' + this.contentObject.Extension} </a>
			</div>
			
		`;
		this.element.append(this.fileElement)
	}

	// loadPdf(fileSrc) {
	// 	// file.name = this.contentObject.Uuid + "." + this.contentObject.Extension;
	// 	// console.log(file)
	// 	// console.log(this.contentObject);

	// 	this.fileElement = document.createElement('embed');
	// 	this.fileElement.classList.add('fileElement', 'pdf');
	// 	this.fileElement.src = fileSrc;
	// 	this.element.append(this.fileElement)
	// }

	// loadText(textFile) {
	// 	this.fileElement = document.createElement('textarea');
	// 	this.fileElement.classList.add('fileElement', 'text');
	// 	this.fileElement.setAttribute('readonly', 'true');
	// 	this.fileElement.setAttribute('disabled', 'true');

	// 	textFile.text()
	// 		.then((text) => {
	// 			this.fileElement.textContent = text;
	// 		})
	// 	// fileViewer.textContent = await fetchedBlob.text()

	// 	//console.log('text length: ', fetchedBlob.size)
	// 	let textareaRows = 5 + Math.floor(textFile.size / 30);
	// 	if (textareaRows > 20)
	// 		this.fileElement.setAttribute('rows', 20);
	// 	else
	// 		this.fileElement.setAttribute('rows', textareaRows);

	// 	this.element.append(this.fileElement)
	// }


	// keydown(event) {

	// 	if (event.key === 'Space') {
	// 		console.log('GOGO SOURCE')
	// 	}


	// }



}