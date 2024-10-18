import { WebSocketServer } from 'ws';
import chokidar, { watch } from 'chokidar';

/* 
	WS
*/
const wss = new WebSocketServer({ port: 3001 });
let ws = null; // single socket returned from a connection. Gets overwritten on each new connection

/* 
	CHOKIDAR
*/
let watcher = null;


/** On a new connection-request from the frontend */
wss.on('connection', function connection(_ws) {
	ws = null; // Remove reference to old socket
	ws = _ws;

	if (watcher === null) {
		startWatching();
	}

	ws.on('error', console.error);

	// ws.on('message', function message(data) {
	// 	console.log('received: %s', data);
	// });


	ws.send('{"status":"connected"}');
	console.log(`New client connection. \t ${new Date(Date.now())}`);
	
});


function startWatching() {
	watcher = null;


	// Watch Frontend
	watcher = chokidar.watch('frontend/').on('all', (event, path) => {
		// console.log(event, path);

		// Delay to wait for potential build
		setTimeout(() => {
			ws.send(`{"status":"reload"}`);
		}, 20);

	});


}







/* 
	PROCESS EXIT
*/
async function cleanupAndExit(){
	// WS
	if(ws !== null){
		ws.send("Watcher shutdown. Server is closing connection.");
		ws.close();
	}
	console.log('Websocket closed')

	// chokidar
	if(watcher !== null){
		await watcher.close();
	}
	console.log('Watcher closed');

	console.log("Exiting.");
	process.exit(0);
}


process.on('SIGTERM', () => {
	console.log('\nSIGTERM : ');
	
	cleanupAndExit();
});

process.on('SIGINT', () => {
	console.log('\nSIGINT :');
	
	cleanupAndExit();
});






