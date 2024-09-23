

	if(document.getElementById('ae-contextOverlay') != undefined){
		// document.remove(document.getElementById('contextOverlay'))
		// document.getElementById('contextOverlay').remove()
		window.location.reload();
	}

	



function appendOverlay() {

let ae_container = document.createElement('div');
ae_container.id = 'ae-container';

ae_container.innerHTML += `




	<div id="ae-contextOverlay" class="ae-element">
		<div id="ae-overlayRightPanel" class="ae-element">



			<div id="ae-projectContainer" class="ae-panelContainer ae-element">

				<div id="ae-projectOuter" class="ae-element">
					<div id="ae-projectInner" class="ae-element">

						<div id="aa-projectTitle" class="ae-element">Placeholder Project Title</div>

						<div id="ae-projectButtonContainer" class="ae-element">
							<div id="ae-projectSearchButton"
								class="ae-projectButton ae-projectButtonOn ae-centerWithFlex ae-element">
								Search</div>
							<div id="ae-projectChildrenButton" class="ae-projectButton ae-centerWithFlex ae-element">
								Children</div>
							<div id="ae-projectPropertiesButton" class="ae-projectButton  ae-centerWithFlex ae-element">
								Properties
							</div>
							<div id="ae-projectNewButton" class="ae-projectButton ae-centerWithFlex ae-element">
								+
							</div>
						</div>

						<div id="ae-projectTableContainer" class="ae-element">



							<div id="ae-projectSearchInput" class="ae-centerWithFlex ae-element" contenteditable="true"
								tabindex="0">
								<div><br></div>
							</div>

							<table id="ae-projectSearchTable" class="ae-element">
								<thead id="ae-projectSearchTable-thead" class="ae-element">
									<tr id="ae-projectSearchTable-thead-tr" class="ae-element">
										<th class="ae-element">Table</th>
										<th class="ae-element">Title</th>
									</tr>
								</thead>
								<tbody id="ae-projectSearchTable-tbody" class="ae-element">
									<tr>
										<th class="ae-element">Data 1</th>
										<td class="ae-element">Data 2</td>
									</tr>
								</tbody>
							</table>



							<table id="ae-projectChildrenTable" class="ae-displayNone ae-element">
								<thead id="ae-projectChildrenTable-thead" class="ae-element">
									<tr id="ae-projectChildrenTable-thead-tr" class="ae-element">
										<th class="ae-element">Table</th>
										<th class="ae-element">Title</th>
									</tr>
								</thead>
								<tbody id="ae-projectChildrenTable-tbody" class="ae-element">

								</tbody>
							</table>



							<table id="ae-projectPropertiesTable" class="ae-displayNone ae-element">
								<thead id="ae-projectPropertiesTable-thead" class="ae-element">
									<tr id="ae-projectPropertiesTable-thead-tr" class="ae-element">
										<th class="ae-element">Key</th>
										<th class="ae-element">Value</th>
									</tr>
								</thead>
								<tbody id="ae-projectPropertiesTable-tbody" class="ae-element">
									<!-- <tr>
										<th>Uuid</th>
										<td>121404555264</td>
									</tr>
									<tr>
										<th>Table</th>
										<td>Project</td>
									</tr>
									<tr>
										<th>Type</th>
										<td></td>
									</tr>
									<tr>
										<th>Title</th>
										<td>projproj titletitle aaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaa</td>
									</tr>
									<tr>
										<th>TimeCreated</th>
										<td>1707415749</td>
									</tr>
									<tr>
										<th>TimeLastChange</th>
										<td>1707415749</td>
									</tr>
									<tr>
										<th>Goal</th>
										<td></td>
									</tr> -->
								</tbody>
							</table>

						</div>

					</div>
				</div>
			</div>





			<div id="ae-sourceContainer" class="ae-panelContainer ae-element">
				<div id="ae-sourceOuter" class="ae-element">
					<div id="ae-sourceInner" class="ae-element">

						<div id="aa-sourceTitle" class="ae-element"></div>

						<div id="ae-sourceButtonContainer" class="ae-element">
							<div id="ae-sourceSearchButton"
								class="ae-sourceButton ae-sourceButtonOn ae-centerWithFlex ae-element">
								Children</div>
							<div id="ae-sourcePropertiesButton"
								class="ae-sourceButton ae-sourceButtonOff ae-centerWithFlex ae-element">
								Properties
							</div>
							<div id="ae-sourceNewButton" class="ae-sourceButton ae-centerWithFlex ae-element">
								N
							</div>
						</div>

						<div id="ae-sourceTableContainer" class="ae-element">


							<table id="ae-sourceChildTable" class="ae-element">
								<thead id="ae-sourceChildTable-thead" class="ae-element">
									<tr id="ae-sourceChildTable-thead-tr" class="ae-element">
										<th class="ae-element">Table</th>
										<th class="ae-element">Type</th>
										<th class="ae-element">Title</th>
									</tr>
								</thead>
								<tbody id="ae-sourceChildTable-tbody" class="ae-element">
									<tr>
									</tr>
								</tbody>
							</table>


							<table id="ae-sourcePropertiesTable" class="ae-displayNone ae-element">
								<thead id="ae-sourcePropertiesTable-thead" class="ae-element">
									<tr id="ae-sourcePropertiesTable-thead-tr" class="ae-element">
										<th class="ae-element">Key</th>
										<th class="ae-element">Value</th>
									</tr>
								</thead>
								<tbody id="ae-sourcePropertiesTable-tbody" class="ae-element">
									<!-- <tr>
														<th>Uuid</th>
														<td>121404555264</td>
													</tr>
													<tr>
														<th>Table</th>
														<td>Source</td>
													</tr>
													<tr>
														<th>Type</th>
														<td></td>
													</tr>
													<tr>
														<th>Title</th>
														<td>projproj titletitle aaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaa</td>
													</tr>
													<tr>
														<th>TimeCreated</th>
														<td>1707415749</td>
													</tr>
													<tr>
														<th>TimeLastChange</th>
														<td>1707415749</td>
													</tr>
													<tr>
														<th>Goal</th>
														<td></td>
													</tr> -->
								</tbody>
							</table>

						</div>

					</div>
				</div>
			</div>








			<div id="ae-clipboardContainer" class="ae-panelContainer ae-element">

				<div id="ae-clipboardInner">
					<div id="ae-clipboardTitleContainer">
						<h4 id="ae-clipboardTitle" class="ae-centerWithFlex">
							Text Clipboard
						</h4>

						<div>
							<input type="checkbox" id="ae-clipboardCodeCheckbox" name="codebox" />
							<label for="ae-clipboardCodeCheckbox">Code</label>
						</div>

						<div>
							<input id="ae-clipboardTextTypeInput" type="text" list="ae-textTypeList" />
							<datalist id="ae-textTypeList">
								<option></option>
								<option>js</option>
								<option>css</option>
								<option>html</option>
								<option>bash</option>
								<option>cpp</option>
								<option>x86</option>
								<option>py</option>
								<option>cs</option>
								<option>comment</option>
								<option>joke</option>
								<option>chain</option>
							</datalist>
							<label for="ae-clipboardTextTypeInput">Type</label>
						</div>

					</div>

					<div id="ae-clipboardConcatContent">

					</div>

				</div>

			</div>

		</div>
	</div>





		`

document.body.append(ae_container);

}




let styleSheet = document.createElement("style");
styleSheet.innerText = `

.ae-displayNone {
	display: none;
}

.ae-centerWithFlex {
	display: flex;
	justify-content: center;
	align-items: center;
}

/* .ae-projectButtonOn {
	background-color: rgb(26, 114, 192);
	box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.638);
}

.ae-projectButtonOff {
	background-color: rgb(89, 148, 206);
} */

/* .ae-sourceButtonOn {
	background-color: rgb(26, 114, 192);
	box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.638);
}

.ae-sourceButtonOff {
	background-color: rgb(89, 148, 206);
} */

.ae-element {
	font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
	color: rgb(0, 0, 0);
	font-weight: 400;
	font-size: x-small;
	
}





/* 
	CONTEXT OVERLAY
*/

#ae-container {
	width: calc(100%);
	height: calc(100%);
	/* background-color: rgba(0, 0, 0, 0.4); */
	/* border: solid green 3px; */
	box-shadow: inset 0 0 0 4px rgb(20, 194, 20);
	/* margin: 1px; */
	/* padding-right: 5px; */

	/* otherwise clicks won't register on page */
	pointer-events: none;

	display: flex;
	flex-direction: row;
	justify-content: end;
	align-items: center;

	top: 0px;
	left: 0px;
	position: fixed;
	z-index: 100000000;
}

#ae-contextOverlay {
	width: calc(100%);
	height: calc(100%);
	/* background-color: rgba(0, 0, 0, 0.4); */
	/* border: solid green 3px; */
	box-shadow: inset 0 0 0 4px rgb(20, 194, 20);
	/* margin: 1px; */
	/* padding-right: 5px; */

	/* otherwise clicks won't register on page */
	pointer-events: none;

	display: flex;
	flex-direction: row;
	justify-content: end;
	align-items: center;

	top: 0px;
	left: 0px;
	position: fixed;
	z-index: 100000000;
}

#ae-overlayRightPanel {
	background-color: rgba(77, 44, 44, 0.618);
	height: 98%;
	margin-right: 8px;
	width: 320px;
	overflow-x: hidden;
	box-shadow: 0 0 0 2px rgb(0, 0, 0);

	pointer-events: all;

	display: flex;
	flex-direction: column;
	justify-content: start;
	gap: 10px;
}

.ae-panelContainer {
	width: 100%;
	min-width: 250px;

	overflow-x: hidden;
	/*  */

	border-radius: 3px;
	background-color: rgb(109, 129, 146);
}


#ae-projectContainer {
	height: 35%;
}
#ae-projectContainer.collapsed {
	height: 38px;
}

#ae-sourceContainer {
	height: 35%;
}
#ae-sourceContainer.expanded {
	height: calc(35% + (35% - 38px));
}

#ae-clipboardContainer {
	height: 26%;
}
#ae-projectOuter {
	height: 100%;
	width: 100%;
}


#ae-projectInner {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
}

#aa-projectTitle {
	width: 90%;
	height: 30px;
	min-height: 30px;
	max-height: 30px;


	margin: 3px;
	border-radius: 5px;

	border: solid rgba(67, 53, 53, 0.599) 1px;
	background-color: rgb(128, 191, 246);

	display: flex;
	justify-content: center;
	align-items: center;

	letter-spacing: 1px;
	text-align: center;
	font-weight: 600;

}

#ae-projectButtonContainer {
	width: 100%;
	height: 30px;

	margin: 5px 0px 5px 0px;

	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
}

#ae-projectSearchButton {
	/* background-color: rgba(26, 133, 180, 0.568); */
	width: 24%;
	height: 20px;
}

#ae-projectChildrenButton {
	/* background-color: rgba(26, 133, 180, 0.568); */
	width: 24%;
	height: 20px;
}

#ae-projectPropertiesButton {
	/* background-color: rgba(26, 133, 180, 0.568); */
	width: 24%;
	height: 20px;
}

#ae-projectNewButton {
	background-color: rgba(12, 139, 0, 0.434);
	color: aliceblue;
	width: 20px;
	margin-left: 10px;
	font-size: large;
}

#ae-projectNewButton:hover {
	background-color: rgba(12, 139, 0, 0.702);
	box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.638);
}

.ae-projectButton {
	margin: 3px;
	padding: 3px;
	border-radius: 5px;
	background-color: rgb(89, 148, 206);

}

.ae-projectButton.ae-projectButtonOn {
	background-color: rgb(26, 114, 192);
	box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.638);

}


.ae-projectButton:hover {
	cursor: pointer;
}

.ae-projectButton.selected {}



#ae-projectTableContainer {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	flex-grow: 1;
	box-shadow: inset 0 0 0 2px rgb(0, 0, 0);
	overflow-y: scroll;

}






/* SEARCH TABLE */


#ae-projectSearchInput {

	width: 90%;
	height: 1.5rem;
	min-height: 1.5rem;

	pointer-events: all;

	margin: 5px;
	padding: 3px;
	border-radius: 5px;

	background-color: rgb(180, 189, 198);

	/* display: none; */
	/* display: flex;
	justify-content: center;
	align-items: center; */
}


#ae-projectSearchTable {
	width: 100%;
	/* display: none; */
	/* display: inline; */
	/* flex-direction: column;
	justify-content: start; */
	border-collapse: collapse;
	background-color: rgb(61, 178, 228);
	margin: 5px 5px 5px 5px;
}

#ae-projectSearchTable thead {
	/* background-color: rgb(85, 123, 177); */
}

#ae-projectSearchTable thead th {
	padding: 3px;
	background-color: rgb(85, 123, 177);
	box-shadow: inset 0 0 0 1px rgb(0, 0, 0);
}


#ae-projectSearchTable tbody {
	background-color: rgb(109, 58, 58);
	/* padding: 30px; */
}


#ae-projectSearchTable tbody tr {
	font-size: 0.9rem;

	/* border: solid black 1px;
	background-color: rgb(106, 168, 80);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408); */

}

/* #searchTable tbody tr :active {
	border: solid black 3px;
} */

#ae-projectSearchTable tbody tr :hover {
	cursor: pointer;
}

#ae-projectSearchTable tbody th {
	/* border: solid black 1px; */
	padding: 3px;
	background-color: rgb(83, 133, 203);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408);

	width: 100px;

}

#ae-projectSearchTable tbody td {
	/* border: solid black 1px; */
	padding: 3px;
	background-color: rgb(129, 151, 183);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408);

}






/* CHILDREN TABLE */



#ae-projectChildrenTable {
	/* display: none; */
	/* display: block; */

	border-collapse: collapse;
	width: 100%;
	background-color: rgb(61, 178, 228);

	margin: 5px 0px 5px 0px;
	/* 
	display: flex;
	flex-direction: column;
	justify-content: start; */
}

#ae-projectChildrenTable thead {
	/* background-color: rgb(85, 123, 177); */
}

#ae-projectChildrenTable thead th {
	padding: 3px;
	background-color: rgb(85, 123, 177);
	box-shadow: inset 0 0 0 1px rgb(0, 0, 0);
}

/* #ae-projectPropertiesTable-thead {

	background-color: rgb(109, 58, 58);
} */

#ae-projectChildrenTable tbody {
	background-color: rgb(109, 58, 58);
	/* padding: 30px; */
}

#ae-projectChildrenTable tbody tr {
	font-size: 0.9rem;

	/* border: solid black 1px;
	background-color: rgb(106, 168, 80);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408); */

}

#ae-projectChildrenTable tbody tr:hover {
	cursor: pointer;
}


#ae-projectChildrenTable tbody th {
	/* border: solid black 1px; */
	padding: 3px;
	background-color: rgb(83, 133, 203);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408);

	width: 100px;

}

#ae-projectChildrenTable tbody td {
	/* border: solid black 1px; */
	padding: 3px;
	background-color: rgb(129, 151, 183);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408);

}












/* PROPERTIES TABLE */



#ae-projectPropertiesTable {
	/* display: none; */
	/* display: block; */

	border-collapse: collapse;
	width: 100%;
	background-color: rgb(61, 178, 228);

	margin: 5px 0px 5px 0px;
	/* 
	display: flex;
	flex-direction: column;
	justify-content: start; */
}

#ae-projectPropertiesTable thead {
	/* background-color: rgb(85, 123, 177); */
}

#ae-projectPropertiesTable thead th {
	padding: 3px;
	background-color: rgb(85, 123, 177);
	box-shadow: inset 0 0 0 1px rgb(0, 0, 0);
	width: 100px;
}

/* #ae-projectPropertiesTable-thead {

	background-color: rgb(109, 58, 58);
} */

#ae-projectPropertiesTable tbody {
	background-color: rgb(109, 58, 58);
	/* padding: 30px; */
}

#ae-projectPropertiesTable tbody tr {
	font-size: 0.9rem;

	/* border: solid black 1px;
	background-color: rgb(106, 168, 80);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408); */

}

#ae-projectPropertiesTable tbody th {
	/* border: solid black 1px; */
	padding: 3px;
	background-color: rgb(83, 133, 203);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408);

	width: 100px;

}

#ae-projectPropertiesTable tbody td {
	/* border: solid black 1px; */
	padding: 3px;
	background-color: rgb(129, 151, 183);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408);

}

#ae-projectPropertiesTable tbody td.ae-editableProjectProperty {
	background-color: rgb(140, 166, 205);
	box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.408);
}
#ae-sourceOuter {
	height: 100%;
	width: 100%;
}


#ae-sourceInner {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
}

#aa-sourceTitle {
	width: 90%;
	height: 30px;
	min-height: 30px;


	margin: 3px;
	border-radius: 5px;

	border: solid rgba(67, 53, 53, 0.599) 1px;
	background-color: rgb(51, 116, 229);

	display: flex;
	justify-content: center;
	align-items: center;

	letter-spacing: 1px;
	text-align: center;
	font-weight: 600;

}

#ae-sourceButtonContainer {
	width: 100%;
	height: 30px;

	margin: 5px 0px 5px 0px;

	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
}

#ae-sourceSearchButton {
	/* background-color: rgba(26, 133, 180, 0.568); */
	width: 35%;
	height: 20px;
}

#ae-sourcePropertiesButton {
	/* background-color: rgba(26, 133, 180, 0.568); */
	width: 35%;
	height: 20px;
}

#ae-sourceNewButton {
	background-color: darkblue;
	color: aliceblue;
	width: 20px;
}

.ae-sourceButton {
	margin: 3px;
	padding: 3px;
	border-radius: 5px;
	background-color: rgb(89, 148, 206);

}

.ae-sourceButton.ae-sourceButtonOn {
	background-color: rgb(26, 114, 192);
	box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.638);
}

.ae-sourceButton:hover {
	cursor: pointer;
}

.ae-sourceButton.selected {}



#ae-sourceTableContainer {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	flex-grow: 1;
	box-shadow: inset 0 0 0 2px rgb(0, 0, 0);
	overflow-y: scroll;

}






/* SEARCH TABLE */


#ae-sourceSearchInput {

	width: 90%;
	height: 1.5rem;
	min-height: 1.5rem;

	pointer-events: all;

	margin: 5px;
	padding: 3px;
	border-radius: 5px;

	background-color: rgb(180, 189, 198);

	/* display: none; */
	/* display: flex;
	justify-content: center;
	align-items: center; */
}


#ae-sourceChildTable {
	width: 100%;
	/* display: none; */
	/* display: inline; */
	/* flex-direction: column;
	justify-content: start; */
	border-collapse: collapse;
	background-color: rgb(61, 178, 228);
	margin: 5px 5px 5px 5px;
}

#ae-sourceChildTable thead {
	/* background-color: rgb(85, 123, 177); */
}

#ae-sourceChildTable thead th {
	padding: 3px;
	background-color: rgb(85, 123, 177);
	box-shadow: inset 0 0 0 1px rgb(0, 0, 0);
}


#ae-sourceChildTable tbody {
	background-color: rgb(109, 58, 58);
	/* padding: 30px; */
}


#ae-sourceChildTable tbody tr {
	font-size: 0.9rem;

	/* border: solid black 1px;
	background-color: rgb(106, 168, 80);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408); */

}

#ae-sourceChildTable tbody tr>.ae-sourceChildTable-Table {
	width: 60px;
	max-width: 60px;

}

#ae-sourceChildTable tbody tr>.ae-sourceChildTable-Type {
	width: 40px;
	max-width: 40px;

}

#ae-sourceChildTable tbody tr>.ae-sourceChildTable-Title {}

/* #searchTable tbody tr :active {
	border: solid black 3px;
} */

#ae-sourceChildTable tbody tr :hover {
	cursor: pointer;
}

#ae-sourceChildTable tbody th {
	/* border: solid black 1px; */
	padding: 3px;
	background-color: rgb(83, 133, 203);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408);

	width: 100px;

}

#ae-sourceChildTable tbody td {
	/* border: solid black 1px; */
	padding: 3px;
	background-color: rgb(129, 151, 183);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408);

}









/* PROPERTIES TABLE */



#ae-sourcePropertiesTable {
	/* display: none; */
	/* display: block; */

	border-collapse: collapse;
	width: 100%;
	background-color: rgb(61, 178, 228);

	margin: 5px 0px 5px 0px;
	/* 
	display: flex;
	flex-direction: column;
	justify-content: start; */
}

#ae-sourcePropertiesTable thead {
	/* background-color: rgb(85, 123, 177); */
}

#ae-sourcePropertiesTable thead th {
	padding: 3px;
	background-color: rgb(85, 123, 177);
	box-shadow: inset 0 0 0 1px rgb(0, 0, 0);
}

/* #ae-sourcePropertiesTable-thead {

	background-color: rgb(109, 58, 58);
} */

#ae-sourcePropertiesTable tbody {
	background-color: rgb(109, 58, 58);
	/* padding: 30px; */
}

#ae-sourcePropertiesTable tbody tr {
	font-size: 0.9rem;

	/* border: solid black 1px;
	background-color: rgb(106, 168, 80);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408); */

}

#ae-sourcePropertiesTable tbody th {
	/* border: solid black 1px; */
	padding: 3px;
	background-color: rgb(83, 133, 203);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408);

	width: 100px;

}

#ae-sourcePropertiesTable tbody td {
	/* border: solid black 1px; */
	padding: 3px;
	background-color: rgb(129, 151, 183);
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.408);

}

#ae-sourcePropertiesTable tbody td.ae-editablesourceProperty {
	background-color: rgb(140, 166, 205);
	box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.408);
}
#ae-clipboardInner {
	width: 100%;
	height: 100%;

	box-shadow: inset 0 0 0 2px black;

	display: flex;
	flex-direction: column;
	justify-content: start;
}

#ae-clipboardInner.ae-activeClipboard {
	box-shadow: inset 0 0 100px 5px rgb(255, 0, 0);
}

#ae-clipboardTitleContainer {
	height: 30px;
	/* width: 90%; */
	max-width: 300px;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 0px;

	margin: 5px 5px 5px 5px;
	padding: 2px;

	border-bottom: solid rgba(0, 0, 0, 0.358) 2px;
}

#ae-clipboardTitle {
	/* background-color: aliceblue; */


}

#ae-clipboardCodeCheckbox {
	box-shadow: inset 0 0 0 2px black;
}

#ae-clipboardCodeCheckbox:hover {
	cursor: pointer;
}


#ae-clipboardTextTypeInput {
	background-color: rgb(204, 215, 225);
	color: rgb(13, 2, 2);
	border-radius: 3px;
	width: 70px;
	padding: 5px 10px 5px 10px;
	/* margin: 3px; */

	border: none;
	box-shadow: inset 0 0 0 1px black;
}



#ae-clipboardConcatContent {
	background-color: rgb(131, 170, 204);

	white-space: pre-wrap;

	margin: 10px;
	padding: 10px;

	border-radius: 5px;

	flex-grow: 1;

};
`
document.head.appendChild(styleSheet);

	


let clipboardInner;

let clipboardCodeCheckbox;
let clipboardTextTypeInput;

let clipboardConcatContents;


function initClipboard() {
	clipboardConcatContents = document.getElementById('ae-clipboardConcatContent');
	clipboardInner = document.getElementById('ae-clipboardInner');
	clipboardCodeCheckbox = document.getElementById('ae-clipboardCodeCheckbox');
	clipboardTextTypeInput = document.getElementById('ae-clipboardTextTypeInput');

	// clipboardCodeCheckbox.addEventListener('change', toggleSelectCode);

	writeTextConcatenationContentToDom();

	if (extensionStateFront.textConcatenationCapturing) {
		clipboardInner.classList.add('ae-activeClipboard');
	}
	else {
		clipboardInner.classList.remove('ae-activeClipboard');
	}

}




/* 

	CLIPBOARD FUNCTIONS

*/


function writeTextConcatenationContentToDom() {

	let clipboardString = extensionStateFront.textConcatenationContent;
	let clipboardInnerHtml = '<div>' + clipboardString.replace(/\n/g, '<br>') + '</div>';
	document.getElementById('ae-clipboardConcatContent').innerHTML = clipboardInnerHtml;

}



function startClipboardTextConcatenation() {

	extensionStateFront.textConcatenationCapturing = true;
	// extensionStateFront.textConcatenationContent = '';
	// writeTextConcatenationContentToDom();
	//writeStateFromFront();
	// document.getElementById('ae-clipboardContainer').classList.remove('ae-displayNone');
	clipboardInner.classList.add('ae-activeClipboard');
	console.log('start text concatentation capture');

}

function addSpaceCharacterToCaptureConcatenationContents() {
	console.log('added new space')
	if (extensionStateFront.textConcatenationCapturing) {
		extensionStateFront.textConcatenationContent += ' ';
		//writeStateFromFront();
	}

}

function addNewLineToCaptureConcatenationContents() {
	console.log('added new line')
	if (extensionStateFront.textConcatenationCapturing) {
		extensionStateFront.textConcatenationContent += '\n';
		//writeStateFromFront();
	}

}

function stopClipboardTextConcatenation() {



	extensionStateFront.textConcatenationCapturing = false;
	extensionStateFront.textConcatenationContent = '';
	writeTextConcatenationContentToDom();
	clipboardInner.classList.remove('ae-activeClipboard');
	//writeStateFromFront();

}






/* 

	CLIPBOARD EVENTS

*/

// function toggleSelectCode() {
// 	if (clipboardCodeCheckbox.checked) {
// 		clipboardTextTypeInput.disabled = false;
// 	}
// 	else {
// 		clipboardTextTypeInput.disabled = true;
// 	}

// }

async function pasteEvent(event) {
	// console.log('pastepaste')
	console.log('PASTE EVENT')
	// console.log(event.clipboardData.files[0])



	let clipboardContentType = determineClipboardContentType(event.clipboardData);


	if (clipboardContentType === 'text') {
		console.log('deal with text');

		let clipboardText = (event.clipboardData || window.clipboardData).getData("text");

		if (extensionStateFront.textConcatenationCapturing) {

			extensionStateFront.textConcatenationContent += clipboardText;

			writeTextConcatenationContentToDom()

			//writeStateFromFront();
			// console.log(extensionStateFront.textConcatenationContent);

		}
		else {
			console.log('PASTE TO NEW SHARD')

			// console.log(clipboardCodeCheckbox.checked)

			if (clipboardCodeCheckbox.checked) {
				postNewCodeObjectToCurrentSourceAndFullReloadOfSourceChildren(clipboardTextTypeInput.value, clipboardText)
			}
			else {
				postNewTextNodeToCurrentSourceAndFullReloadOfSourceChildren(clipboardTextTypeInput.value, clipboardText);
			}

		}

		// if (shardcard.contentEditable === 'true') {
		// 	document.execCommand("insertHTML", false, clipboardText);
		// 	event.preventDefault();
		// }
		// else if (shardObject.textContent == '' && shardObject.fileName == '') {
		// 	insertShardcardTextContent(shardcard, clipboardText);
		// 	//shardcard.shard.elementType = 'text';
		// 	updateShardcardTextContent(shardcard);
		// }
		// else {
		// 	console.log('This source already has content. Returning.');

		// }



	}
	else if (clipboardContentType === 'file') {
		console.log('deal with file')

		let newFile = event.clipboardData.files[0];

		let fileCategoryObject = determineFileCategories(newFile);
		console.log('fileCategoryObject: ', fileCategoryObject)

		if (fileCategoryObject.fileType === 'typetype') {
			console.error('FILE EXTENSION HAD NO MATCHING CONTENT TYPE')
			return;
		}

		let postFileQueryParameters = {
			Type: fileCategoryObject.fileType,
			Title: "",
			Extension: fileCategoryObject.fileExtension,
			IAmAuthor: 0,
		}

		postNewFileToCurrentSourceAndFullReloadOfSourceChildren(newFile, postFileQueryParameters, fileCategoryObject.mimeType);

		// console.log(newFile)

		// console.log(await dbisWe.fileGet(121627279360));

		// let sourceid = extractCurrentSourceId();

		// if (shardObject.fileName == '' && shardObject.textContent == '') {
		// 	postFile(event.clipboardData.files[0], sourceid, shardid);
		// 	console.log('nonono')
		// }
		// else {
		// 	console.log('This source already has content. Returning.');
		// }



	}



}
// const paspas = new ClipboardEvent('paste');
// document.dispatchEvent(paspas);





function copyEvent(event) {

	// console.log('copcop')
	// console.log(event.clipboardData )
	// let cbd = event.clipboardData || window.clipboardData
	// let copiedData = cbd.getData('Text');
	// console.log('copiedData', copiedData)

	// browser.runtime.sendMessage( {
	// 	command: "copycopy"
	// });

	console.log('COPYEVENT')


	// navigator.clipboard
	// 	.read()
	// 	.then(
	// 		(clipText) => (console.log(clipText)),
	// 	);

}




function cutEvent(event) {
	console.log('CUT EVENT')
}



/* 

	HELPER FUNCTIONS

*/




let determineClipboardContentType = function (eventClipboardData) {

	if (typeof eventClipboardData.files[0] !== 'undefined') {
		// postFile(dataClipboardEvent.files[0], sourceid, shardid);
		return 'file';
	}
	else if ((eventClipboardData || window.clipboardData).getData("text") !== '') {
		//console.log((event.clipboardData || window.clipboardData).getData("text"));

		let clipboardText = (eventClipboardData || window.clipboardData).getData("text");
		let blob = new Blob([clipboardText], { type: 'text/plain' });
		let file = new File([blob], "clipboard.txt", { type: "text/plain" });

		//postFile(file, sourceid, shardid);
		return 'text';
	}
	else {
		console.log('No file nor text detected.');
		return 'empty';
	}

	//return 'clipboardContentType';
}





let extensionObject = {
	// https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
	image: ['apng', 'avif', 'gif', 'bmp', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp'],
	// https://www.canto.com/blog/audio-file-types/
	audio: ['m4a', 'flac', 'mp3', 'wav', 'wma', 'aac'],
	// https://www.adobe.com/creativecloud/video/discover/best-video-format.html
	video: ['mp4', 'mov', 'wmv', 'avi', 'AVCHD', 'flv', 'f4v', 'swf', 'mkv', 'webm', 'mpg'],
	pdf: ['pdf'],
	data: ['json', 'csv', 'tsv', 'db', 'xlsx', 'ods', 'odb'],
	// Textarea extension
	text: ['txt', 'md'],
	code: ['js', 'ts', 'css', 'html', 'cs'],
}



function determineFileCategories(selectedFile) {

	let fileCategories = {
		mimeType: selectedFile.type,
		baseFileName: 'basename',
		fileExtension: 'extext',
		fileType: 'typetype'
	}



	fileCategories.fileExtension = determineFileExtension(selectedFile);
	fileCategories.baseFileName = determineBaseFileName(selectedFile);

	// fileCategories.fileType = determineFileType(fileCategories.mimeType, fileCategories.fileEnding);

	// fileCategories.fileType = Object.entries(extensionObject).forEach(typeArray => typeArray.filter(extension => extension === fileCategories.fileExtension))
	fileCategories.fileType = Object.keys(extensionObject).find(type => extensionObject[type].includes(fileCategories.fileExtension));
	// console.log(fileCategories.fileType)
	//console.log('file type determined here!');
	// if (fileCategories.fileExtension === 'db') {
	// 	// http://fileformats.archiveteam.org/wiki/DB_(SQLite)
	// 	fileCategories.mimeType = 'application/vnd.sqlite3';
	// }
	console.log(fileCategories.mimeType)
	if (fileCategories.mimeType == '') {
		// fileCategories.mimeType == 'application/stream';
		fileCategories.mimeType = 'application/octet-stream';
	}

	return fileCategories;
}




function determineFileExtension(selectedFile) {

	return selectedFile.name.match(/\w+$/g)[0];

}

function determineBaseFileName(selectedFile) {

	return selectedFile.name.match(/^.*(?=\.[^.]+$)/)[0];

}













/* 

	CLIPBOARD FETCH

*/


async function postNewTextNodeToCurrentSourceAndFullReloadOfSourceChildren(textType, TextContent) {

	console.log(extensionStateFront.current_sourceObject.Uuid)

	// Content_InsertChildUuidTable(Uuid, childTable)
	if (extensionStateFront.current_sourceObject.Uuid !== undefined) {

		// let newTextObject = (await dbisWe.Content_InsertChildUuidTable(extensionStateFront.current_sourceObject.Uuid, 'Text')).Content;
		let newTextContentObject = (await dbis.ContentEdge_InsertAdjacentToUuidIntoTable(extensionStateFront.current_sourceObject.Uuid, 1, 'Text', '', '', '/')).content;

		// console.log(newTextObject)

		newTextContentObject.Title = TextContent.substring(0, 25);
		newTextContentObject.TextContent = TextContent;
		newTextContentObject.Type = textType;


		// await dbisWe.Content_UpdateOnContentObject(newTextContentObject);
		await dbis.Content_UpdateWithContentObject(newTextContentObject);

		await fetchCurrentSourceChildrenThenWriteToStates();

		populateSourceChildTableFromState();

	}

}

async function postNewCodeObjectToCurrentSourceAndFullReloadOfSourceChildren(Type, CodeContent) {

	console.log(extensionStateFront.current_sourceObject.Uuid)

	// Content_InsertChildUuidTable(Uuid, childTable)
	if (extensionStateFront.current_sourceObject.Uuid !== undefined) {

		// let newCodeObject = (await dbisWe.Content_InsertChildUuidTable(extensionStateFront.current_sourceObject.Uuid, 'Code')).Content;
		let newCodeContentObject = (await dbis.ContentEdge_InsertAdjacentToUuidIntoTable(extensionStateFront.current_sourceObject.Uuid, 1, 'Code', '', '', '/')).content;

		// console.log(newTextObject)

		newCodeContentObject.Title = CodeContent.substring(0, 25);
		newCodeContentObject.Type = Type;
		newCodeContentObject.CodeContent = CodeContent;


		// await dbisWe.Content_UpdateOnContentObject(newCodeContentObject);
		await dbis.Content_UpdateWithContentObject(newCodeContentObject);

		await fetchCurrentSourceChildrenThenWriteToStates();

		populateSourceChildTableFromState();

	}

}

async function postNewFileToCurrentSourceAndFullReloadOfSourceChildren(file, queryParams, mimeType) {

	let sourceUuid = extensionStateFront.current_sourceObject.Uuid;

	console.log(sourceUuid)

	// Content_InsertChildUuidTable(Uuid, childTable)
	if (sourceUuid !== undefined) {

		// let newFileObject = (await dbisWe.Content_InsertChildUuidTable(sourceUuid, 'File')).Content;
		let newFileContentObject = (await dbis.ContentEdge_InsertAdjacentToUuidIntoTable(sourceUuid, 1, 'File', '', '', '/')).content;

		// console.log(newTextObject)

		// newFileObject.Title = CodeContent.substring(0, 25);
		// newFileObject.Type = Type;
		// newFileObject.CodeContent = CodeContent;


		// await dbisWe.Content_UpdateOnContentObject(newFileObject);
		// await dbisWe.filePost(newFileContentObject.Uuid, file, queryParams, mimeType);
		await dbis.Post_File(newFileContentObject.Uuid, file, queryParams, mimeType);



		await fetchCurrentSourceChildrenThenWriteToStates();

		populateSourceChildTableFromState();

		// Focus last row title for easy editing!
		let _tbody = document.getElementById('ae-sourceChildTable-tbody');
		_tbody.lastElementChild.lastElementChild.focus();

	}
	else {
		console.log('No slected source. Couldn"t POST file.')
	}

}


// The Annunciation is an oil painting by the Early Netherlandish painter Hans Memling.It depicts the Annunciation, the archangel Gabriel's announcement to the Virgin Mary that she would conceive and become the mother of Jesus, described in the Gospel of Luke. 



// VARS
let waitingSecondShift = 0;
let waitingSecondCtrlShift = 0;






async function keydownActiveExtension(keyEvent) {



	if (document.activeElement.isContentEditable) {
		// console.log('EDITABLE')
		return;
	}

	if (keyEvent.key === 'Escape') {
		stopClipboardTextConcatenation();
	}



	if (keyEvent.altKey) {

		switch (keyEvent.key) {
			case 'p':
				// console.log('Alt + p')
				console.log(extensionStateFront);
				break;

			case 'x':
				// console.log('Alt + x')
				let checked = clipboardCodeCheckbox.checked;
				if (checked) {
					clipboardCodeCheckbox.checked = false;
				}
				else {
					clipboardCodeCheckbox.checked = true;
				}
				toggleSelectCode();
				break;

			case '[':
				// console.log('Alt + [')
				startClipboardTextConcatenation();

				break;

			case 'Enter':
				// console.log('Alt + Enter')
				addNewLineToCaptureConcatenationContents()
				break;

			case '-':
				// console.log('Alt + Enter')
				addSpaceCharacterToCaptureConcatenationContents();
				break;

			case ']':
				// console.log('Alt + ]')
				if (clipboardCodeCheckbox.checked) {
					await postNewCodeObjectToCurrentSourceAndFullReloadOfSourceChildren(clipboardTextTypeInput.value, extensionStateFront.textConcatenationContent)
				}
				else {
					await postNewTextNodeToCurrentSourceAndFullReloadOfSourceChildren(clipboardTextTypeInput.value, extensionStateFront.textConcatenationContent);
				}

				stopClipboardTextConcatenation();
				break;

			default:
				break;
		}
	}






	if (keyEvent.ctrlKey) {

		switch (keyEvent.key) {
			case '`':
				console.log('Ctrl + `')
				break;
			case '/':
				console.log('Ctrl + /')
				break;
			case '.':
				console.log('Ctrl + .')
				break;
			case ',':
				console.log('Ctrl + ,')
				break;
			case '\\':
				console.log('Ctrl + \\')
				break;
			case '\'':
				console.log('Ctrl + \'')
				break;

			case ';':
				console.log('Ctrl + ;')
				break;

			case '[':
				console.log('Ctrl + [')

				break;

			case ']':
				console.log('Ctrl + ]')
				break;

			default:
				break;
		}
	}



}














// const apiBaseUrl = 'http://localhost:3000';
// const basePath = '/api/v02'
let apiUrl = 'http://localhost:3000/api/v02';


browser.runtime.onMessage.addListener((request) => {
	// console.log("Message from the background script:");

	if (request.name === "setApiBase") {

		apiUrl = request.apiBaseString;
		return Promise.resolve({ response: "Api updated in content script. [dbi-send.js]", newApiString: apiUrl });

	}


	if (request.name === "getApiBase") {

		// apiUrl = request.apiBaseString;
		return Promise.resolve({ apiString: apiUrl });

	}
	

	// console.log(request.greeting);
	
});



class dbis {





	/* 
			CONTENT
	 */

	static async Content_InsertOnTable(TableName) {
		const url = apiUrl + `/content/Content-InsertOnTable?Table=${TableName}`;
		const options = {
			method: 'POST'
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async Content_SelectOnUuid(Uuid) {
		let url = apiUrl + `/content/Content-SelectOnUuid?Uuid=${Uuid}`;
		const options = {
			method: 'GET',
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async Content_UpdateWithContentObject(contentObject) {
		let url = apiUrl + `/content/Content-UpdateWithContentObject`;
		const options = {
			method: 'PUT',
			headers: { "Content-Type": "application/json", },
			body: JSON.stringify(contentObject),
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async Content_DropFullOnUuid(Uuid) {
		let url = apiUrl + `/content/Content-DropFullOnUuid?Uuid=${Uuid}`;
		const options = {
			method: 'DELETE',
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async Content_SelectOnTitleLikeString(searchString, tableLimit, includeTable, orderColumn, desc) {
		let url = apiUrl + `/content/Content-SelectOnTitleLikeString?searchString=${searchString}&tableLimit=${tableLimit}&includeTable=${includeTable}&orderColumn=${orderColumn}&desc=${desc}`;
		const options = {
			method: 'GET',
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async Review_InsertScheduleOnUuid(Uuid, scheduleType) {
		const url = apiUrl + `/content/Review-InsertScheduleOnUuid?Uuid=${Uuid}&scheduleType=${scheduleType}`;
		const options = {
			method: 'POST'
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async Review_SelectCurrentReview() {
		let url = apiUrl + `/content/Review-SelectCurrentReview`;
		const options = {
			method: 'GET',
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}











	// EDGE
	static async Edge_InsertUuidUuid(Node1Uuid, Node2Uuid, Directed, Type, Order, Path) {
		let url = apiUrl + `/edge/Edge-InsertUuidUuid?Node1Uuid=${Node1Uuid}&Node2Uuid=${Node2Uuid}&Directed=${Directed}&Type=${Type}&Order=${Order}&Path=${Path}`;
		const options = {
			method: 'POST',
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async Edge_UpdateWithEdgeObject(edgeObject) {
		let url = apiUrl + `/edge/Edge-UpdateWithEdgeObject`;
		const options = {
			method: 'PUT',
			headers: { "Content-Type": "application/json", },
			body: JSON.stringify(edgeObject),
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async Edge_DeleteOnEdgeUuid(edgeUuid) {
		let url = apiUrl + `/edge/Edge-DeleteOnEdgeUuid?edgeUuid=${edgeUuid}`;
		const options = {
			method: 'DELETE',
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async Edge_DeleteOnNodeUuids(Uuid1, Uuid2) {
		let url = apiUrl + `/edge/Edge-DeleteOnNodeUuids?Uuid1=${Uuid1}&Uuid2=${Uuid2}`;
		const options = {
			method: 'DELETE',
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}





	// CONTENT-EDGE
	static async ContentEdge_InsertAdjacentToUuidIntoTable(Uuid, Directed, Table, Type, Order, Path) {
		let url = apiUrl + `/contentedge/ContentEdge-InsertAdjacentToUuidIntoTable?Uuid=${Uuid}&Directed=${Directed}&Table=${Table}&Type=${Type}&Order=${Order}&Path=${Path}`;
		const options = {
			method: 'POST',
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async ContentEdge_SelectChildOfUuid(Uuid) {
		let url = apiUrl + `/contentedge/ContentEdge-SelectChildOfUuid?Uuid=${Uuid}`;
		const options = {
			method: 'GET',
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async ContentEdge_SelectParentOfUuid(Uuid) {
		let url = apiUrl + `/contentedge/ContentEdge-SelectParentOfUuid?Uuid=${Uuid}`;
		const options = {
			method: 'GET',
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async ContentEdge_SelectUndirectedOfUuid(Uuid) {
		let url = apiUrl + `/contentedge/ContentEdge-SelectUndirectedOfUuid?Uuid=${Uuid}`;
		const options = {
			method: 'GET',
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}
	static async ContentEdge_SelectAdjacentOfUuid(Uuid) {
		let url = apiUrl + `/contentedge/ContentEdge-SelectAdjacentOfUuid?Uuid=${Uuid}`;
		const options = {
			method: 'GET',
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}











	// FILE (From dbis-we)
	static async Post_File(Uuid, file, queryParams, mimeType) {

		let url = apiUrl + `/file/${Uuid}?`;
		// console.log(url)


		for (const [key, value] of Object.entries(queryParams)) {
			// console.log(`${key}: ${value}`);
			url += `${key}=${value}&`;
			// bodyArray.push(value);
		}
		url = url.slice(0, -1);

		const options = {
			method: 'POST',
			headers: {
				"Content-Type": mimeType,
			},
			body: file,
		};
		// console.log(options)
		// console.log(url)

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			if (response.status == 200) {
				return data;
			}
			else {
				throw new Error('FAILED POST FROM: Post_File in dbis')
			}
			// console.table(data);
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}



	static async Get_File(Uuid) {

		const url = apiUrl + `/file/` + Uuid;
		const options = { method: 'GET' };

		try {
			const response = await fetch(url, options);
			// const data = await response.json();
			console.log(response.status, url)

			// console.log(response.body)
			let blob = await response.blob()
			let contentType = response.headers.get('content-type');
			let extension = contentType.split('/')[1];
			// console.log('FILEFILE:', response.headers.get('content-type'))
			let file = await new File([blob], `${Uuid}.${extension}`)
			return file;
			// .then(blob => new File([blob], 'testfilename.file'))
			// .then(file => file)
			// .catch(error => console.error(error))
			// .then(file => URL.createObjectURL(file))
			// .then(file => URL.createObjectURL(file))
			// .then(fileUrl => window.open(fileUrl, '_blank'))
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}




	static async Put_File(Uuid, file, queryParams, mimeType) {

		let url = apiUrl + `/file/${Uuid}?`;
		// console.log(url)


		for (const [key, value] of Object.entries(queryParams)) {
			// console.log(`${key}: ${value}`);
			url += `${key}=${value}&`;
			// bodyArray.push(value);
		}
		url = url.slice(0, -1);

		const options = {
			method: 'POST',
			headers: {
				"Content-Type": mimeType,
			},
			body: file,
		};
		// console.log(options)
		// console.log(url)

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			if (response.status == 200) {
				return data;
			}
			else {
				throw new Error('FAILED PUT FROM: Put_File in dbis')
			}
			// console.table(data);
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}



	static async Delete_File(Uuid) {
		let url = apiUrl + `/file/${Uuid}`;
		const options = {
			method: 'DELETE',
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			console.log(response.status, url)
			return data;
		} catch (error) {
			console.log(response.status, url)
			console.error(error);
		}
	}














	static async Content_SelectChildOfUuid(Uuid) { return contentGet('Content-SelectChildOfUuid', { 'Uuid': Uuid }) };

	static async Node_SelectChildOfUuid(Uuid) { return contentGet('Node-SelectChildOfUuid', { 'Uuid': Uuid }) };
	static async NodeEdge_SelectChildOfUuid(Uuid) { return contentGet('NodeEdge-SelectChildOfUuid', { 'Uuid': Uuid }) };

}
















// async function contentGet(functionstring, paramObject) {
// 	let url = basePath + `content//${functionstring}?`;

// 	for (const [key, value] of Object.entries(paramObject)) {
// 		console.log(`${key}: ${value}`);
// 		url += `${key}=${value}`;
// 	}

// 	// console.log(url)

// 	const options = { method: 'GET', body: undefined };

// 	try {
// 		const response = await fetch(url, options);
// 		const data = await response.json();
// 		return data;
// 		// console.table(data);
// 	} catch (error) {
// 		console.error(error);
// 	}


// }



let projectTitle;
let projectSearchButton;
let projectChildrenButton;
let projectPropertiesButton;
let projectNewButton;

let projectSearchInput;
let projectSearchTable;
let projectChildrenTable;
let projectPropertiesTable;

let focusProjectSearch = false;

// let lastProjectSearchString = '';




function initProject() {

	// console.log('project init')


	projectTitle = document.getElementById("aa-projectTitle");
	// Hide project
	projectTitle.addEventListener('click', toggleProjectSearchVisibility);


	projectSearchButton = document.getElementById('ae-projectSearchButton');
	projectChildrenButton = document.getElementById('ae-projectChildrenButton');
	projectPropertiesButton = document.getElementById('ae-projectPropertiesButton');
	projectNewButton = document.getElementById('ae-projectNewButton');

	projectSearchInput = document.getElementById('ae-projectSearchInput');
	projectSearchTable = document.getElementById('ae-projectSearchTable');
	projectChildrenTable = document.getElementById('ae-projectChildrenTable');
	projectPropertiesTable = document.getElementById('ae-projectPropertiesTable');

	projectSearchButton.addEventListener('click', projectToggleClicked);
	projectChildrenButton.addEventListener('click', projectToggleClicked);
	projectPropertiesButton.addEventListener('click', projectToggleClicked);
	projectNewButton.addEventListener('click', newProjectButtonClicked);

	projectSearchInput.addEventListener('focus', searchProjectIn);
	projectSearchInput.addEventListener('focusout', searchProjectOut);



	writeProjectFromStateToDom();



	projectSearchInput.innerHTML = `<div>${extensionStateFront.projectSearchString}<br></div>`;

	// make sure an empty search is loaded into search table on load
	keyDownDuringSearch();


}




/* 

	DOM EVENTS

*/

/**
 *  Toggles the project visibility and expands the size of the source container.
 * 
 * */ 
function toggleProjectSearchVisibility(){
	// console.log("TOGGLING PROJECT SEARCH. ", this.id);
	let projectsContainer = document.getElementById("ae-projectContainer");
	let sourceContainer = document.getElementById("ae-sourceContainer");


	if (projectsContainer.classList.contains("collapsed")){
		projectsContainer.classList.remove("collapsed");
		sourceContainer.classList.remove("expanded");
	}
	else{
		projectsContainer.classList.add("collapsed");
		sourceContainer.classList.add("expanded");
	}
		
	// projectsContainer.style.height = 50px;
}



async function newProjectButtonClicked() {


	let newProject = await postNewProject();

	extensionStateFront.current_projectObject = newProject;

	writeProjectFromStateToDom();

	//writeStateFromFront();

}



async function editableProjectPropertyFocusOut() {

	copyProjectPropertiesFromDomToState();

	// update title, etc.
	writeProjectFromStateToDom();

	//writeStateFromFront();

	await putCurrentProjectObject();

	// Re-perform search to get rid of old node-values in search table
	keyDownDuringSearch();
}


function searchProjectIn() {
	// focusProjectSearch = true;
	extensionStateFront.projectSearchActive = true;
	//writeStateFromFront();

	if (projectSearchInput.textContent == '') {
		projectSearchInput.innerHTML = '<div><br></div>'; // default content on 'contenteditable' elements 
		// setInterval(() => { searchInput.innerHTML += '<br>' }, 50);
	}
	// console.log('focus search ')
	// projectSearchInput.addEventListener('keypress', keyPressDuringSearch)
	projectSearchInput.addEventListener('keydown', keyDownDuringSearch)
	keyDownDuringSearch();
}


function searchProjectOut() {
	extensionStateFront.projectSearchActive = false;
	//writeStateFromFront();
	// focusProjectSearch = false;
	// console.log('focusout search ')
	// projectSearchInput.removeEventListener('keypress', keyPressDuringSearch)
	projectSearchInput.removeEventListener('keydown', keyDownDuringSearch)
}


// Perform search with slight delay to make sure new input is written to contentEditanle input
async function keyDownDuringSearch(keyEvent) {
	// keyEvent.preventDefault();


	setTimeout(async () => {

		await fetchProjectSearchThenWriteToStates();

		populateProjectSearchTableFromState();

	}, 100);


}



async function projectSearchRowClicked(event) {

	/* 
		WRITE THE PROJECT PROPERTIES TO STATE, THEN DOM
	*/

	// Can't get projectObject directly because click will register the row-child: either th, or td
	let uuidOfNodeClicked = event.target.dataset.uuid;

	if (uuidOfNodeClicked === undefined) {
		console.log('No Uuid of project detected on projectSearchTable-click. No project selected.')
		return;
	}

	let nodeTableRow = document.getElementById('ae-projectSearchNode-' + event.target.dataset.uuid)

	extensionStateFront.current_projectObject = nodeTableRow.nodeObject;

	writeProjectFromStateToDom();

	


	/* 
		FETCH PROJECT CHILDREN AND POPULATE DOM
	*/

	await fetchCurrentProjectChildrenThenWriteToStates();

	// console.log(extensionStateFront.current_projectChildContentEdges)

	writeProjectChildrenFromStateToDom();

	// focus the child-menu
	document.getElementById("ae-projectChildrenButton").click();


	//writeStateFromFront();

}


async function projectChildRowClicked(event) {
	// console.log('projectChildRowClicked called')

	// console.log(event.target.dataset.uuid)
	let projectChildUuid = event.target.dataset.uuid;

	let projectChildContentEdge = extensionStateFront.current_projectChildContentEdges.find(obj => obj.content.Uuid == projectChildUuid);

	if (projectChildContentEdge.content.Table === 'Source') {
		// console.log('Source clicked')

		await fetchSourceOnUuidThenWriteToStates(projectChildUuid);

		// loadCurrentSourceIntoDom();
		writeCurrentSourceObjectToDom();

		await fetchCurrentSourceChildrenThenWriteToStates();

		populateSourceChildTableFromState();

	}
	else {
		console.log('Only Sources can be selected');
	}


}


function projectToggleClicked(event) {


	projectPropertiesButton.classList.remove('ae-projectButtonOn');
	projectChildrenButton.classList.remove('ae-projectButtonOn');
	projectSearchButton.classList.remove('ae-projectButtonOn');


	projectSearchInput.classList.add('ae-displayNone');
	projectSearchInput.classList.remove('ae-centerWithFlex');
	projectSearchTable.classList.add('ae-displayNone');

	projectChildrenTable.classList.add('ae-displayNone');

	projectPropertiesTable.classList.add('ae-displayNone');



	if (event.target.id === 'ae-projectSearchButton') {

		projectSearchButton.classList.add('ae-projectButtonOn');

		projectSearchInput.classList.remove('ae-displayNone');
		projectSearchInput.classList.add('ae-centerWithFlex');
		projectSearchTable.classList.remove('ae-displayNone');

	}
	else if (event.target.id === 'ae-projectChildrenButton') {

		projectChildrenButton.classList.add('ae-projectButtonOn');
		projectChildrenTable.classList.remove('ae-displayNone');

	}
	else if (event.target.id === 'ae-projectPropertiesButton') {

		projectPropertiesButton.classList.add('ae-projectButtonOn');
		projectPropertiesTable.classList.remove('ae-displayNone');
	}

}













/* 

	READ WRITE DOM

*/



function populateProjectSearchTableFromState() {
	// console.log('populate with children dones', childObjects)

	childObjects = extensionStateFront.current_projectSearchObjects;

	let tbody = document.getElementById('ae-projectSearchTable-tbody');
	tbody.innerHTML = '';

	for (let childObject of childObjects) {
		let tableRowHtml = `
                
                <th data-Uuid="${childObject.Uuid}" class="ae-element">${childObject.Table}</th>
                <td data-Uuid="${childObject.Uuid}" class="ae-element">${childObject.Title}</td>

            `;
		let tr = document.createElement('tr');
		tr.id = 'ae-projectSearchNode-' + childObject.Uuid;
		tr.nodeObject = childObject;
		// tr.dataset.Node = 1;
		// tr.dataset.Uuid = childObject.Uuid;
		tr.setAttribute('data-Node', '1');
		tr.setAttribute('data-Uuid', childObject.Uuid);
		tr.tabIndex = 0;
		tr.innerHTML = tableRowHtml;
		tr.addEventListener('click', projectSearchRowClicked);
		// tr.contentEditable = 'True';

		tbody.append(tr);
		// console.log(tr)
	}
	// console.table(childObjects)

}





function copyProjectPropertiesFromDomToState() {

	let tempProjectObjectFromDom = {};

	if (document.getElementById('ae-projPropTable-Uuid-value') == null) {
		console.log('Project properties not loaded into DOM')
		return;
	}

	tempProjectObjectFromDom.Uuid = document.getElementById('ae-projPropTable-Uuid-value').textContent
	tempProjectObjectFromDom.Table = document.getElementById('ae-projPropTable-Table-value').textContent
	tempProjectObjectFromDom.Type = document.getElementById('ae-projPropTable-Type-value').textContent
	tempProjectObjectFromDom.Title = document.getElementById('ae-projPropTable-Title-value').textContent
	tempProjectObjectFromDom.TimeCreated = document.getElementById('ae-projPropTable-TimeCreated-value').textContent
	tempProjectObjectFromDom.TimeLastChange = document.getElementById('ae-projPropTable-TimeLastChange-value').textContent
	tempProjectObjectFromDom.Goal = document.getElementById('ae-projPropTable-Goal-value').textContent

	// console.log('copyProjectPropertiesFromDomToState() : ', tempProjectObject)
	// console.table(tempProjectObjectFromDom)

	extensionStateFront.current_projectObject = tempProjectObjectFromDom;

	//writeStateFromFront();

}



function writeProjectChildrenFromStateToDom() {

	let projectChildContentEdges = extensionStateFront.current_projectChildContentEdges;

	// extensionStateFront.current_projectUuid = projectObject.Uuid;

	// document.getElementById('aa-projectTitle').textContent = projectObject.Title;

	let tbody = document.getElementById('ae-projectChildrenTable-tbody');

	tbody.innerHTML = '';

	for (const contentEdge of projectChildContentEdges) {

		let newProjectChildRow = document.createElement('tr');

		newProjectChildRow.id = `ae-projchildTableRow-${contentEdge.Uuid}`;
		newProjectChildRow.ContentEdgeObject = contentEdge;

		newProjectChildRow.innerHTML += `
		
				<th id=ae-projchildTable-Table-${contentEdge.content.Uuid} class="ae-element" data-Uuid=${contentEdge.content.Uuid}>${contentEdge.content.Table}</th>
				<td id=ae-projchildTable-Title-${contentEdge.content.Uuid} class="ae-element" data-Uuid=${contentEdge.content.Uuid}>${contentEdge.content.Title}</td>
			
		`;

		// document.getElementById(`id=ae-projchildTableRow-${nodeEdge.Uuid}`);

		// console.log(document.getElementById(`id=ae-projchildTableRow-${nodeEdge.Uuid}`))


		newProjectChildRow.addEventListener('click', projectChildRowClicked)

		tbody.appendChild(newProjectChildRow)

	}


}



function writeProjectFromStateToDom() {

	let projectObject = extensionStateFront.current_projectObject;
	// extensionStateFront.current_projectUuid = projectObject.Uuid;

	document.getElementById('aa-projectTitle').textContent = projectObject.Title;

	let tbody = document.getElementById('ae-projectPropertiesTable-tbody');
	tbody.innerHTML = '';

	for (const key in projectObject) {
		// console.log(`${key}: ${projectObject[key]}`);
		if (key === 'Type' || key === 'Title' || key === 'Goal') {

			tbody.innerHTML += `
		
			<tr>
				<th id=ae-projPropTable-${key}-key class="ae-element" >${key}</th>
				<td id=ae-projPropTable-${key}-value class="ae-editableProjectProperty ae-element" contenteditable="true" >${projectObject[key]}</td>
			</tr>
		
		`;

		}
		else {
			tbody.innerHTML += `
		
			<tr>
				<th id=ae-projPropTable-${key}-key class="ae-element" >${key}</th>
				<td id=ae-projPropTable-${key}-value class="ae-element">${projectObject[key]}</td>
			</tr>
		
		`;
		}

	}

	// console.log(document.querySelectorAll('#ae-projectPropertiesTable tbody tr'))
	let editableProjectPropertyTds = document.querySelectorAll('.ae-editableProjectProperty');
	// console.log(editableProjectPropertyTd)
	for (let editableProjectPropertyTd of editableProjectPropertyTds) {
		// console.log(editableProjectPropertyTd.textContent);
		// console.log(propertyRow.textContent.length)

		// editableProjectPropertyTd.addEventListener('focusout', readProjectPropertiesFromDomAndWritePut)
		editableProjectPropertyTd.addEventListener('focusout', editableProjectPropertyFocusOut)
		// editableProjectPropertyTd.addEventListener('focusout', postProjectProperties)
	}

}










/* 

	FETCH FUNCTIONS

*/


async function fetchProjectSearchThenWriteToStates() {


	extensionStateFront.projectSearchString = projectSearchInput.textContent.trim();


	// extensionStateFront.current_projectSearchObjects = await dbisWe.Project_SelectLikeString(extensionStateFront.projectSearchString);
	extensionStateFront.current_projectSearchObjects = await dbis.Content_SelectOnTitleLikeString(extensionStateFront.projectSearchString, 50, 'Project', 'Title', 0)


	//writeStateFromFront();


	// populateProjectSearchTableFromState();


}


async function fetchCurrentProjectChildrenThenWriteToStates() {


	// extensionStateFront.current_projectChildContentEdges = await dbisWe.NodeEdge_SelectChildOfUuid(extensionStateFront.current_projectObject.Uuid);
	extensionStateFront.current_projectChildContentEdges = await dbis.ContentEdge_SelectChildOfUuid(extensionStateFront.current_projectObject.Uuid);


	//writeStateFromFront();


}

async function fetchSourceOnUuidThenWriteToStates(sourceUuid) {

	// let selectedSourceObject = (await dbisWe.Content_SelectOnUuid(sourceUuid))[0];
	let selectedSourceObject = await dbis.Content_SelectOnUuid(sourceUuid);

	// console.table(selectedSourceObject)

	extensionStateFront.current_sourceObject = selectedSourceObject;

	console.log('New current source object: ', extensionStateFront.current_sourceObject)


	//writeStateFromFront();

}



async function postNewProject() {

	// return await dbisWe.Content_InsertOnTable('Project');
	return await dbis.Content_InsertOnTable('Project');

}




function addSourceToCurrentProject() {

	// current_projectUuid
	let noProjectSelected = Object.keys(extensionStateFront.current_projectObject).length === 0 ? 1 : 0;

	if (noProjectSelected) {
		console.log('NO PROJECT SELECTED')
	}
	else {
		// dbisWe.Content_InsertChildUuidTable(extensionStateFront.current_projectObject.Uuid, 'Source')
		dbis.ContentEdge_InsertAdjacentToUuidIntoTable(extensionStateFront.current_projectObject.Uuid, 1, 'Source', '', '', '/');
	}

}






async function putCurrentProjectObject() {
	// console.log('Posting current project properties', readProjectPropertiesFromDom())
	// console.log('PUT ProjectObject: ', extensionStateFront.current_projectObject)

	// await dbisWe.Content_UpdateOnContentObject(extensionStateFront.current_projectObject);
	await dbis.Content_UpdateWithContentObject(extensionStateFront.current_projectObject);
}











let sourceSearchButton;
let sourcePropertiesButton;
let sourceNewButton;

let sourceSearchInput;
let sourceChildTable;
let sourcePropertiesTable;

let focusSourceSearch = false;


function initSource() {

	// if (!extensionStateFront.active) {
	// 	console.log('STATE INACTIVE')

	// 	document.getElementById('contextOverlay').style.display = 'none';
	// }

	// writeCurrentSourceObjectToDom();


	sourceSearchButton = document.getElementById('ae-sourceSearchButton');
	sourcePropertiesButton = document.getElementById('ae-sourcePropertiesButton');
	sourceNewButton = document.getElementById('ae-sourceNewButton');

	// sourceSearchInput = document.getElementById('ae-sourceSearchInput');
	sourceChildTable = document.getElementById('ae-sourceChildTable');
	sourcePropertiesTable = document.getElementById('ae-sourcePropertiesTable');

	sourceSearchButton.addEventListener('click', sourceToggleClicked);
	sourcePropertiesButton.addEventListener('click', sourceToggleClicked);
	sourceNewButton.addEventListener('click', addNewSourceToCurrentProject);




	// console.log(JSON.stringify(extensionStateFront.current_sourceObject) == '{}')
	// console.log(Object.keys(extensionStateFront.current_sourceObject).length === 0)

	let sourceExistsInState = !(Object.keys(extensionStateFront.current_sourceObject).length === 0);

	if (sourceExistsInState) {
		// console.log('SOURCE DETECTED ON INIT, BUT NO LOAD IMPLEMENTED')
		writeCurrentSourceObjectToDom();
		populateSourceChildTableFromState();
	}

}






/* 

	DOM EVENTS

*/



async function editableSourcePropertyFocusOut() {

	copySourcePropertiesFromDomToState()

	await putCurrentSourceObject();

	// console.log('editableSourcePRoperty - fcous out')

}


// function clickSourceChildRow(event) {

// 	// console.log(event.target.dataset.Uuid)
// 	if (event.target.dataset.node != '1') {
// 		console.log('NOT ELEMENT WITH NODE OBJECT')

// 		let nodeRow = document.getElementById('ae-sourceSearchNode-' + event.target.dataset.uuid)

// 		// console.log(nodeRow.nodeObject)

// 		// extensionStateFront.current_sourceUuid = nodeRow.dataset.Uuid;
// 		extensionStateFront.current_sourceUuid = nodeRow.nodeObject.Uuid;
// 		extensionStateFront.current_sourceObject = nodeRow.nodeObject;
// 		document.getElementById('aa-sourceTitle').textContent = nodeRow.nodeObject.Title;
// 		// extensionStateFront.current_sourceUuid = event.target.dataset.uuid;
// 		console.log(extensionStateFront)
// 		//writeStateFromFront();

// 		writeCurrentSourceObjectToDom();


// 	}
// 	else {
// 		console.log('ELMENET CONTAINS NODEOBJECTSS')
// 	}

// }




function sourceToggleClicked(event) {


	sourcePropertiesButton.classList.remove('ae-sourceButtonOn');
	sourceSearchButton.classList.remove('ae-sourceButtonOn');


	sourceChildTable.classList.add('ae-displayNone');
	sourcePropertiesTable.classList.add('ae-displayNone');


	if (event.target.id === 'ae-sourceSearchButton') {

		sourceSearchButton.classList.add('ae-sourceButtonOn');
		sourceChildTable.classList.remove('ae-displayNone');

	}
	else {

		sourcePropertiesButton.classList.add('ae-sourceButtonOn');
		sourcePropertiesTable.classList.remove('ae-displayNone');

	}

}












/* 

	READ WRITE DOM

*/

// function copySourceChildTableFromDom() {
// 	// console.log('populate with children dones', childObjects)

// 	// console.log('childObjects', childObjects)

// 	let childContentEdgeObjects = extensionStateFront.current_sourceChildContentEdges;


// 	let tbody = document.getElementById('ae-sourceChildTable-tbody');

	

// 	// let rows = tbody.children();
// 	let rowCount = 0;
// 	for (let sourceRow of Array.from(tbody.children)) {
		
// 		// console.log(sourceRow)
// 		let kids = sourceRow.children;

// 		// console.log(sourceRow.aaa)
// 		// console.log();
// 		// console.log(sourceRow.dataset.uuid);
// 		// console.log(kids[0].textContent, kids[1].textContent, kids[2].textContent)

// 		for (let _childContentEdgeObject of childContentEdgeObjects){
// 			if (sourceRow.dataset.uuid == _childContentEdgeObject.content.Uuid){
// 				// console.log("MATCH ", sourceRow.dataset.uuid)
// 				_childContentEdgeObject.content.Title = kids[2].textContent;
// 			}
// 		}
		
// 	}

// 	return;


// 	tbody.innerHTML = '';

// 	for (let childContentEdgeObject of childContentEdgeObjects) {
// 		let tableRowHtml = `
                
//                 <th class="ae-element ae-sourceChildTable-Table" data-Uuid="${childContentEdgeObject.content.Uuid}">${childContentEdgeObject.content.Table}</th>
// 				<td class="ae-element ae-sourceChildTable-Type" data-Uuid="${childContentEdgeObject.content.Uuid}">${childContentEdgeObject.content.Type}</td>
//                 <td class="ae-element ae-sourceChildTable-Title" data-Uuid="${childContentEdgeObject.content.Uuid}" contenteditable="true">${childContentEdgeObject.content.Title}</td>

//             `;
// 		let tr = document.createElement('tr');
// 		tr.id = 'ae-sourceSearchNode-' + childContentEdgeObject.content.Uuid;
// 		tr.nodeObject = childContentEdgeObject;
// 		// tr.dataset.Node = 1;
// 		// tr.dataset.Uuid = childObject.Uuid;
// 		tr.setAttribute('data-Node', '1');
// 		tr.setAttribute('data-Uuid', childContentEdgeObject.content.Uuid);
// 		tr.tabIndex = 0;
// 		tr.innerHTML = tableRowHtml;
// 		// tr.addEventListener('click', clickSourceChildRow);
// 		tr.addEventListener('click', (event) => { console.log(event.target.parentNode.nodeObject) });
// 		tr.addEventListener("focusout", (event) => {

// 			putCurrentSourceObject();
// 		});
// 		// tr.contentEditable = 'True';

// 		tbody.append(tr);
// 		// console.log(tr)
// 	}
// 	// console.table(childObjects)

// }



function populateSourceChildTableFromState() {
	// console.log('populate with children dones', childObjects)

	// console.log('childObjects', childObjects)

	let childContentEdgeObjects = extensionStateFront.current_sourceChildContentEdges;


	let tbody = document.getElementById('ae-sourceChildTable-tbody');
	tbody.innerHTML = '';

	for (let childContentEdgeObject of childContentEdgeObjects) {
		let tableRowHtml = `
                
                <th class="ae-element ae-sourceChildTable-Table" data-Uuid="${childContentEdgeObject.content.Uuid}">${childContentEdgeObject.content.Table}</th>
				<td class="ae-element ae-sourceChildTable-Type" data-Uuid="${childContentEdgeObject.content.Uuid}">${childContentEdgeObject.content.Type}</td>
                <td class="ae-element ae-sourceChildTable-Title" data-Uuid="${childContentEdgeObject.content.Uuid}" contenteditable="true">${childContentEdgeObject.content.Title}</td>

            `;
		let tr = document.createElement('tr');
		tr.id = 'ae-sourceSearchNode-' + childContentEdgeObject.content.Uuid;
		tr.nodeObject = childContentEdgeObject;
		// tr.aaa = "asd";
		tr.setAttribute('data-fuck', 'f*ck');
		// tr.dataset.Node = 1;
		// tr.dataset.Uuid = childObject.Uuid;
		tr.setAttribute('data-Node', '1');
		tr.setAttribute('data-Uuid', childContentEdgeObject.content.Uuid);
		tr.tabIndex = 0;
		tr.innerHTML = tableRowHtml; 
		// tr.addEventListener('click', clickSourceChildRow);
		tr.addEventListener('click', (event) => { console.log(event.target.parentNode.nodeObject) });
		// Targets only the last (i.e. Title) column
		tr.lastElementChild.addEventListener("focusout", async (event) => {
			
			let uuid = event.target.parentElement.nodeObject.content.Uuid;
			let contentObject = event.target.parentElement.nodeObject.content;
			contentObject.Title = event.target.textContent;
			// console.log("CCCCCCCCCC", contentObject)
			let putContentObject = await dbis.Content_UpdateWithContentObject(contentObject);

			let fetchedContentObject = await dbis.Content_SelectOnUuid(uuid);
			
			await fetchCurrentSourceChildrenThenWriteToStates();
			populateSourceChildTableFromState();

			// console.log("DDDDDDDDDD", fetchedContentObject)
			// copySourceChildTableFromDom();
			
			// putCurrentSourceObject();
			// fetchCurrentSourceChildrenThenWriteToStates();
			// populateSourceChildTableFromState();
		});
		// tr.contentEditable = 'True';

		tbody.append(tr);
		// console.log(tr)
	}
	// console.table(childObjects)

}




function writeCurrentSourceObjectToDom() {

	let sourceObject = extensionStateFront.current_sourceObject;
	// extensionStateFront.current_sourceUuid = sourceObject.Uuid;

	document.getElementById('aa-sourceTitle').textContent = sourceObject.Title;

	let tbody = document.getElementById('ae-sourcePropertiesTable-tbody');
	tbody.innerHTML = '';

	for (const key in sourceObject) {
		// console.log(`${key}: ${sourceObject[key]}`);
		if (key === 'Type' || key === 'Title' || key === 'Url' || key === 'IAmSource') {

			tbody.innerHTML += `
		
			<tr>
				<th id=ae-sourcePropTable-${key}-key class="ae-element" >${key}</th>
				<td id=ae-sourcePropTable-${key}-value class="ae-editableSourceProperty ae-element" contenteditable="true" >${sourceObject[key]}</td>
			</tr>
		
		`;

		}
		else {
			tbody.innerHTML += `
		
			<tr>
				<th id=ae-sourcePropTable-${key}-key class="ae-element" >${key}</th>
				<td id=ae-sourcePropTable-${key}-value class="ae-element">${sourceObject[key]}</td>
			</tr>
		
		`;
		}

	}

	// console.log(document.querySelectorAll('#ae-sourcePropertiesTable tbody tr'))
	let editableSourcePropertyTds = document.querySelectorAll('.ae-editableSourceProperty');
	// console.log(editableSourcePropertyTd)
	for (let editableSourcePropertyTd of editableSourcePropertyTds) {
		// console.log(editableSourcePropertyTd.textContent);
		// console.log(propertyRow.textContent.length)
		// editableSourcePropertyTd.addEventListener('focusout', readSourcePropertiesFromDomAndWritePut)
		editableSourcePropertyTd.addEventListener('focusout', editableSourcePropertyFocusOut)

	}

}


function copySourcePropertiesFromDomToState() {



	extensionStateFront.current_sourceObject.Uuid = document.getElementById('ae-sourcePropTable-Uuid-value').textContent;
	extensionStateFront.current_sourceObject.Table = document.getElementById('ae-sourcePropTable-Table-value').textContent;
	extensionStateFront.current_sourceObject.Type = document.getElementById('ae-sourcePropTable-Type-value').textContent;
	extensionStateFront.current_sourceObject.Title = document.getElementById('ae-sourcePropTable-Title-value').textContent;
	extensionStateFront.current_sourceObject.TimeCreated = document.getElementById('ae-sourcePropTable-TimeCreated-value').textContent;
	extensionStateFront.current_sourceObject.TimeLastChange = document.getElementById('ae-sourcePropTable-TimeLastChange-value').textContent;
	extensionStateFront.current_sourceObject.Url = document.getElementById('ae-sourcePropTable-Url-value').textContent;
	extensionStateFront.current_sourceObject.IAmSource = document.getElementById('ae-sourcePropTable-IAmSource-value').textContent;

	//writeStateFromFront();


	// console.log(extensionStateFront.current_sourceObject)
}








/* 

	ADD FUNCTIONS

*/



async function addNewSourceToCurrentProject() {

	// if (extensionStateFront.current_projectObject.Uuid == 0 || extensionStateFront.current_projectObject.Uuid === undefined) {
	if (extensionStateFront.current_projectObject.Uuid === undefined) {
		console.log('NO PROJECT SELECTED')
	}
	else {
		console.log()
		console.log('NEW SOURCE')
		// console.log('Url:', window.location.href)
		// console.log('Title:', document.title)
		// let newSourceContentEdge = await dbisWe.Content_InsertChildUuidTable(extensionStateFront.current_projectObject.Uuid, 'Source')
		let newSourceContentEdge = await dbis.ContentEdge_InsertAdjacentToUuidIntoTable(extensionStateFront.current_projectObject.Uuid, 1, 'Source', '', '', '/');

		let newSourceObject = newSourceContentEdge.content;
		newSourceObject.Url = window.location.href;
		newSourceObject.Title = document.title;
		// console.log('new source object: ', newSourceObject)

		// console.log(newSourceObject)

		extensionStateFront.current_sourceObject = newSourceObject;

		// extensionStateFront.current_sourceObject = newSourceObject.Content;

		await putCurrentSourceObject();

		writeCurrentSourceObjectToDom();

		// dbisWe.Review_InsertScheduleOnUuid(newSourceObject.Uuid, '')
		dbis.Review_InsertScheduleOnUuid(newSourceObject.Uuid, '');

		await fetchCurrentProjectChildrenThenWriteToStates();


		writeProjectChildrenFromStateToDom()


		//writeStateFromFront();

		// Review_InsertScheduleOnUuid(Uuid, scheduleType)

		// writeCurrentSourceObjectToDom();

		// no chilren to fetch yet!

	}

}











/* 

	FETCH FUNCTIONS

*/

async function fetchCurrentSourceChildrenThenWriteToStates() {


	// extensionStateFront.current_sourceChildContentEdges = await dbisWe.NodeEdge_SelectChildOfUuid(extensionStateFront.current_sourceObject.Uuid);
	extensionStateFront.current_sourceChildContentEdges = await dbis.ContentEdge_SelectChildOfUuid(extensionStateFront.current_sourceObject.Uuid);


	//writeStateFromFront();


}

async function putCurrentSourceObject() {
	// console.log('Posting current source properties', readSourcePropertiesFromDom())
	// console.log('PUT SourceObject: ', extensionStateFront.current_sourceObject)

	console.log(extensionStateFront.current_sourceObject)
	// await dbisWe.Content_UpdateOnContentObject(extensionStateFront.current_sourceObject);
	await dbis.Content_UpdateWithContentObject(extensionStateFront.current_sourceObject);

}













// ELEMENTS

let overlayContainer;
let overlayElement;
let overlayRightPanel;
let projectContainer;
let sourceContainer;
let clipboardContainer;





let extensionStateFront = {

	active: false,

	current_projectObject: {},
	current_projectSearchObjects: [],
	current_projectChildContentEdges: [],

	current_sourceObject: {},
	current_sourceChildContentEdges: [],

	projectSearchActive: false,
	projectSearchString: '',

	textConcatenationCapturing: false,
	textConcatenationContent: '',

}



function initExtension() {

	console.log("initExtension()")


	initProject();
	initSource();
	initClipboard();



}







function addExtensionActiveEventListener() {

	document.addEventListener('copy', copyEvent)
	document.addEventListener('cut', cutEvent)
	document.addEventListener('paste', pasteEvent)
	document.addEventListener('keydown', keydownActiveExtension)

	console.log('event listerners for active extension added')

}




function removeExtensionActiveEventListener() {

	document.removeEventListener('copy', copyEvent)
	document.removeEventListener('cut', cutEvent)
	document.removeEventListener('paste', pasteEvent)
	document.removeEventListener('keydown', keydownActiveExtension)

	console.log('event listerners for active extension removed')

}


