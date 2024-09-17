function createToast() {
	// Get the toast element
	//var toast = document.getElementById('toast');
	if (document.getElementById('toast')) {
		return;
	}
	let toast = document.createElement('div');
	toast.id = 'toast';
	toast.innerHTML = 'toastytoastytoastytoastytoastytoastytoastytoasty';

	let toastStyle = document.createElement('style');
	toastStyle.innerHTML = `
  	:root {
    	--toasth: 50px;
  		--toastw: 200px;
		}

		#toast {
			background-color: red;
      		display: none;
      		position: absolute;
      		height: var(--toasth);
      		width: var(--toastw);
			top: calc( 100vh - var(--toasth) - 10px );
      		left: calc( 100vw - var(--toastw) - 10px );
      		white-space: nowrap;
      		overflow-x: hidden;

			
			justify-content: center;
			align-items: center;

			border: solid black 5px;
			
		}

	`;

	document.body.appendChild(toast);
	document.body.appendChild(toastStyle);


}


function showToast(toastString) {

	let toast = document.getElementById('toast');
	toast.textContent = toastString;
	toast.style.display = 'flex';

	// Hide the toast after 1 second
	setTimeout(function () {
		toast.style.display = 'none';
	}, 3000);

}

function showStoastSuccess(successString) {
	let toast = document.getElementById('toast');
	toast.textContent = successString;
	toast.style.backgroundColor = 'green';
	toast.style.display = 'flex';

	// Hide the toast after 1 second
	setTimeout(function () {
		toast.style.display = 'none';
	}, 3000);
}


export {
	createToast,
	showToast,
	showStoastSuccess
}