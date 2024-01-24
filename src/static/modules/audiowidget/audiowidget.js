
import { DFT } from "./fft.js";
import { zerocross } from "./zerocross.js";

// https://stackoverflow.com/questions/60957829/navigator-mediadevices-is-undefined
// Enable devices/usermedia for insecure contexts




let frequency = 0;
let frequencyString = '';


function newAudioWidgetElement(){

	let audioWidget = document.createElement('div');
	audioWidget.id = 'audioWidget';
	//audioWidget.textContent = 'audioWidget';
	audioWidget.addEventListener('click', startAudioWidget);
	return audioWidget;

}


function startAudioWidget(){
	nodeCreate();
	viewAudioChunks();
	setInterval(updatefrequencyElement, 300);
}

function stopAudioWidget(){

}

function updatefrequencyElement(){
	let elem = document.getElementById('audioWidget');
	elem.textContent = frequencyString;

	
}


async function nodeCreate(){


	// Check if the browser supports the Web Audio API
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
	// Request access to the microphone
	navigator.mediaDevices.getUserMedia({ audio: true })
	  .then(function (stream) {
		// Create an audio context
		var audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
		// Create a media stream source node
		var source = audioContext.createMediaStreamSource(stream);
  
		// Create a script processor node to process audio data
		//var scriptNode = audioContext.createScriptProcessor(1024, 1, 1);
		var scriptNode = audioContext.createScriptProcessor(4096, 1, 1);
  
		// Connect the nodes
		source.connect(scriptNode);
		scriptNode.connect(audioContext.destination);
  
		// Set up the callback function to process audio data
		scriptNode.onaudioprocess = function (audioProcessingEvent) {
		  var inputBuffer = audioProcessingEvent.inputBuffer;
		  var inputData = inputBuffer.getChannelData(0);
		
		  //let sampledData = new Float32Array(inputData);

		  //console.log(zerocross(inputData));
		  console.log()
		  frequency = zerocross(inputData);
		  frequencyString = Number.parseFloat(frequency).toFixed(2);

		  //console.log(inputData.byteLength);
		  //console.log(inputData)
		  //console.log(frequencyString)
  
		  // Now you can access the audio data in the inputData array
		  // Sample the first 100 bytes (assuming each sample is a 32-bit float)
		  var sampledData = new Float32Array(inputData.subarray(0, 100));
  
		  // Do something with the sampled data
		  //console.log(sampledData);
		};
	  })
	  .catch(function (err) {
		console.error('Error accessing microphone:', err);
	  });
  } else {
	console.error('Web Audio API not supported in this browser');
  }

	/* const audioCtx = new AudioContext();
	if (navigator.mediaDevices) {
		navigator.mediaDevices.getUserMedia({ "audio": true }).then((stream) => {


			console.log(stream)

			const source = audioCtx.createMediaStreamSource(stream);
			
			console.log(source)

			console.log('nodenode')

			

		}).catch((err) => {
			// browser unable to access microphone
			// (check to see if microphone is attached)
		});
	} else {
		// browser unable to access media devices
		// (update your browser)
	}
 */
	/* navigator.mediaDevices.getUserMedia({audio: true},
		function(stream) {
		  // create the MediaStreamAudioSourceNode
		  var context = new AudioContext();
		  var source = context.createMediaStreamSource(stream);
		  var recLength = 0,
			recBuffersL = [],
			recBuffersR = [];
	  
		  // create a ScriptProcessorNode
		  if(!context.createScriptProcessor){
			 node = context.createJavaScriptNode(4096, 2, 2);
		  } else {
			 node = context.createScriptProcessor(4096, 2, 2);
		  }
	  
		  // listen to the audio data, and record into the buffer
		  node.onaudioprocess = function(e){
			recBuffersL.push(e.inputBuffer.getChannelData(0));
			recBuffersR.push(e.inputBuffer.getChannelData(1));
			recLength += e.inputBuffer.getChannelData(0).length;
			console.log('asdf')
		  }
	  
		  // connect the ScriptProcessorNode with the input audio
		  source.connect(node);
		  // if the ScriptProcessorNode is not connected to an output the "onaudioprocess" event is not triggered in chrome
		  node.connect(context.destination);
		},
		function(e) {
		  // do something about errors
	  }); */

}


















let mediaRecorder;
let audioChunks = [];
let rawAudio;



let audioSetup = function() {

	//console.log('recrec');

	//console.log(navigator.mediaDevices);

	if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
		console.log("getUserMedia supported.");
		navigator.mediaDevices
		  .getUserMedia(
			// constraints - only audio needed for this app
			{
			  audio: true,
			},
		  )
	  
		  // Success callback
		  .then((stream) => {

			let chunks = [];

			mediaRecorder = new MediaRecorder(stream);
			
			mediaRecorder.ondataavailable = captureAudio;

			mediaRecorder.start(500);

			//startAudioCapture();

			//setTimeout(stopAudioCapture, 500);
			//setTimeout(startAudioNav, 50);

		  })
	  
		  // Error callback
		  .catch((err) => {
			console.error(`The following getUserMedia error occurred: ${err}`);
		  });
	  } else {
		console.log("getUserMedia not supported on your browser!");
	  }
	  

}



let startAudioNav = function(){
	//setInterval(startAudioCapture, 1000);
	setTimeout(startAudioCapture, 50);
	setTimeout(stopAudioCapture, 550);
	
}

function startAudioCapture(){
	audioChunks = [];
	mediaRecorder.start();
	console.log('start');
}

function stopAudioCapture(){
	mediaRecorder.stop();
	console.log('stop');
	//viewAudioChunks();
	setTimeout(viewAudioChunks, 50);
}




let captureIndex = -1;
let buff;
let separateBufferArray = [];
let audioContext = new AudioContext();
async function captureAudio(event){
	//audioChunks.shift();
	//audioChunks = [];

	mediaRecorder.stop();

	console.log('fuckyou');

	
	captureIndex++;

	//mediaRecorder.stop();

	audioChunks.push(event.data);
	console.log()
	//console.clear();

	console.log(audioChunks)

	let blob = new Blob(audioChunks, {'type' : 'audio/ogg; codecs=opus'});
	console.log(blob)

	buff = await blob.arrayBuffer();
	console.log(buff)
	console.log(buff.byteLength)

	if(captureIndex == 2){
		//viewAudioChunks(buff)
	}

	let view = new DataView(buff);
	for(let i = 0; i < 10; i++){
		console.log(view.getFloat32(i))
	}
	//viewAudioChunks(buff);
	
	//await viewAudioChunks();
	//viewAudioChunks();
	
	//mediaRecorder.start(1000);
	audioChunks = [];
}

async function viewAudioChunks(buff){
	//console.log(audioChunks);
	//audioChunks.push(mediaRecorder.requestData());
	//await mediaRecorder.requestData();

	
	let audioBuffer = await audioContext.decodeAudioData(buff);
	let arr = audioBuffer.getChannelData(0);

	rawAudio = arr;
	console.log(arr.length)
	

	//print sample values
	rawAudio = [];

	for(let i = 10000; i < 15000; i++){
		//console.log(arr[i])
		rawAudio.push(arr[i]);
	}
	console.log(rawAudio)

	//console.log(Math.max(...arr))
	//console.log(Math.min(...arr))
	
	//console.log(audioChunks.size);


	//let dft = new DFT(rawAudio);
	//frequency = dft.run();

	frequency = Math.floor( zerocross(rawAudio) );

	//console.log('zerocrossing freq. : ', zerocross(rawAudio));

	//audioSetup();



	// START HERE !!!
	//startAudioNav();

	//audioChunks = [];

	//setTimeout(viewAudioChunks, 500);
}






export {
	newAudioWidgetElement,
	startAudioWidget,
	nodeCreate,

	audioSetup,
	startAudioNav,
	viewAudioChunks,

	frequencyString,
}

