


### Tabs
- at first I couldn't access certain tab-info, such as URL
	- Need to put permissions for "tabs" in the permissions array in manifest.json


### Two environments
- extension environment
- sandboxed page environment

- Any communication between them has to use the browser.runtime API
	- sendMessage, onMessage
- It doesn't appear to send messages within the same environment, only between them...

### Prevent CORS errors
- Set permissions entry as "<all_urls>" to enable API calls
	- I changed 2 things in the request:
		- Removed "Origin: moz-extension://b83cf8d7-f62c-4c91-b569-23bb7197864a"
		- Sec-Fetch-Site: cross-site  ==>  Sec-Fetch-Site: same-origin 
- This could otherwise be a solution?
	- https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/onBeforeSendHeaders
	- Not sure if this applies to Content_scripts. (dont think so...)

