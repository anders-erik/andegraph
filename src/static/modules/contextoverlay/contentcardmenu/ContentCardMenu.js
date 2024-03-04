import { ContentCard } from "../../contentcard/ContentCard.js";
import { dbis } from "../../dbi-send/dbi-send.js";
import { showToast } from "../../log/toast.js";


export class ContentCardMenu {

	parentElement;

	element;

	contentCard;

	active = false;

	constructor(parentElement) {
		this.parentElement = parentElement;
		// this.place = place;

		this.element = document.createElement('div');
		this.element.id = 'contentCardMenu';

		// this.element.tabIndex = 0;
		parentElement.append(this.element);

		// this.element.addEventListener('focusout', this.focusOutOnEditableContentCell)




		// this.element.innerHTML = this.elementInnerHtml;
	}





	populate(contentObjectElement) {
		// console.log('POPULATE')
		this.parentElement.append(this.element)

		let contentObject = contentObjectElement.contentObject;

		this.element.innerHTML = ``;

		this.contentCard = new ContentCard(contentObject);
		this.contentCard.classList.add('contextElement');

		// NOTE: Applied a more general solution during activeElement change
		//
		// add contextmenu to all descendants
		// but does NOT work on audio/video player
		// for (const element of this.contentCard.querySelectorAll('*')) {
		// 	// console.log('contentCardMenu', element)
		// 	element.classList.add('contextElement')
		// }

		this.element.append(this.contentCard);

	}





	elementInnerHtml = `
	<table id="contextOverlay_contentTable" class="contextOverlay_displayNone contextOverlay_element">
		<thead id="contextOverlay_contentThead" class="contextOverlay_element">
			<tr class="contextOverlay_element">
				<th class="contextOverlay_element">Key</th>
				<th class="contextOverlay_element">Value</th>
			</tr>
		</thead>
		<tbody id="contextOverlay_contentTableBody" class="contextOverlay_element">

		</tbody>
	</table>
	`;

}