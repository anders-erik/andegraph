
import { createToast, showToast, showStoastSuccess } from './toast.js';


// Global log functions
window.showToast = showToast;


(function initLog() {
	createToast();
})();

export {
	showToast,
	showStoastSuccess
}
