

export class TextContent {

	shardcardContentElement;
	contentContainer;

	element;

	constructor(shardcardElement, contentContainer) {
		this.contentContainer = contentContainer;

		this.element = document.createElement('div');
		this.element.tabIndex = 0;
		// this.element.contentEditable = true;
		this.element.classList.add('textContent');

		// make sure class methods are available during event
		this.element.addEventListener('focusin', this.focusin.bind(this));
		this.element.addEventListener('focusout', this.focusout.bind(this));

		// this.element.textContent = shardcardElement.contentObject.TextContent;
		this.insertTextContent(this.element, shardcardElement.contentObject.TextContent)

		this.contentContainer.append(this.element);
	}


	focusin(event) {
		console.log('FOCUS IN TEXT')
		// console.log(event.target)
		if (event.target.classList.contains('textContent')) {

			this.element.addEventListener('keydown', this.keydownDuringFocus);
			this.element.addEventListener('paste', this.pasteDuringFocus);
			this.element.addEventListener('click', this.clickDuringFocus);

		}
	}


	focusout(event) {
		console.log('FOCUS OUT TEXT')
		this.element.removeEventListener('keydown', this.keydownDuringFocus);
		this.element.removeEventListener('paste', this.pasteDuringFocus);
		this.element.removeEventListener('click', this.clickDuringFocus);
	}


	/* 
		From old sharding-shardcard
	 */

	keydownDuringFocus(event) {
		console.log('keydownDuringFocus')

		switch (event.key) {
			case 'Enter':
				event.target.contentEditable = "true";
				event.target.classList.add('editing');
				event.preventDefault();
				break;
			case 'Escape':
				event.target.contentEditable = "false";
				event.target.classList.remove('editing');
				let newTextContent = this.extractTextContent(event.target);
				console.log(newTextContent)

				break;

			default:
				break;
		}
	}
	pasteDuringFocus(event) {
		console.log('pasteDuringFocus')
	}
	clickDuringFocus(event) {
		console.log('clickDuringFocus')
	}

	insertTextContent(textElement, textStringInput) {

		// If WHOLE shard-textContent is empty
		if (textStringInput == '') {
			return;
		}

		textElement.innerHTML = '';

		let textStringSpaces = textStringInput.replaceAll('\t', '\xa0\xa0\xa0\xa0');
		//console.log(JSON.stringify(textStringSpaces));


		let textArray = textStringSpaces.split('\n');
		//console.log(textArray);
		//let divString = textArray.join('<br>»');

		for (let i = 0; i < textArray.length; i++) {
			let p = document.createElement('p');
			// p.classList.add('shard-p');
			// p.id = 'shard-p-' + shardcard.shard.id;
			// p.dataset.nodeId = shardcard.shard.id;
			// https://stackoverflow.com/questions/75397803/chrome-skips-over-empty-paragraphs-of-contenteditable-parent-when-moving-cursor/75397804
			if (textArray[i] == '') {
				p.innerHTML = `<br>`;
			}
			else {
				p.textContent = textArray[i];
			}

			textElement.appendChild(p)
		}

		//console.log(divString)

	}

	extractTextContent(shardcard) {
		console.log(shardcard)

		let stringArray = [];

		for (const child of shardcard.children) {
			//console.log(child.textContent);
			stringArray.push(child.textContent);
		}


		let storeString = stringArray.join(`\n`);

		//console.log('raw extracted: ', JSON.stringify(rawExtractedText));
		return storeString;
	}



}