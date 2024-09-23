


//	This is a VERY simple DFT implementation based on this wikipedia example
// https://en.wikipedia.org/wiki/Discrete_Fourier_transform#Example


class DFT {


	inputArray = [];
	outputArray = [];
	outputMagArray = [];

	constructor(typedArray) {

		// convert to custom objects representing complex numbers
		typedArray.forEach(element => {
			//console.log(element)
			this.inputArray.push({
				real: element,
				imag: 0,
			})
		});

		//this.inputArray = test3;
		

	}

	// Perform DFT on inputArray and return THE most dominant frequency
	run() {

		for(let k = 0; k < this.inputArray.length; k++){
			//console.log(this.inputArray[k]);
			//console.log()

			let kSum = {
				real: 0,
				imag: 0,
			};
			for(let n = 0; n < this.inputArray.length; n++){

				let argument = -2*Math.PI*n*k/this.inputArray.length;
				let expFact = {
					real: Math.cos(argument),
					imag: Math.sin(argument)
				}
				let term = this.complexMultiply(expFact, this.inputArray[n]);

				//console.log(term.real + '  ' + term.imag + 'i');
				
				kSum.real += term.real;
				kSum.imag += term.imag;



			}
			//console.log(kSum);
			console.log()
			this.outputMagArray.push(Math.sqrt(kSum.real**2 + kSum.imag**2));

			this.outputArray.push(kSum);
		}

		let maxValue = 0;
		let maxIndex = 0;
		for(let m = 0; m < Math.floor(this.outputMagArray.length/2); m++){
			if(this.outputMagArray[m] > maxValue){
				console.log('new max')
				maxIndex = m;
				maxValue = this.outputMagArray[m];
			}
		}

		let frequency = maxIndex * (48000/1000);

		//console.log('max Index: ' + maxIndex)
		// sample rate / samples
		console.log('frequency: ' + maxIndex * (48000/1000))
		console.log(this.outputMagArray);
		//console.log(this.outputArray);

		return frequency;
	}

	// I believe this is from ChatGPT when the obsolete class below was generated??
	complexMultiply(a, b) {

		return {
			real: a.real * b.real - a.imag * b.imag,
			imag: a.real * b.imag + a.imag * b.real,
		};

	}

}


// TEST-DATA
let test1 = [
	{
		real: 1,
		imag: 0,
	},
	{
		real: 2,
		imag: -1,
	},
	{
		real: 0,
		imag: -1,
	},
	{
		real: -1,
		imag: 2,
	}
];

let test2 = [
	{
		real: 0,
		imag: 0,
	},
	{
		real: 0.308865520098932,
		imag: 0,
	},
	{
		real: 0.587527525713892,
		imag: 0,
	},
	{
		real: 0.80873606055313,
		imag: 0,
	},
	{
		real: 0.95085946050647,
		imag: 0,
	},
	{
		real: 0.999999682931835,
		imag: 0,
	},
	{
		real: 0.951351376233829,
		imag: 0,
	},
	{
		real: 0.809671788277164,
		imag: 0,
	},
	{
		real: 0.588815561967795,
		imag: 0,
	},
	{
		real: 0.310379909672042,
		imag: 0,
	},
	{
		real: 0.00159265291648683,
		imag: 0,
	},
	
];


let test3 = [
	{
		real: 0,
		imag: 0
	},
	{
		real: 0.308865520098932,
		imag: 0
	},
	{
		real: 0.587527525713892,
		imag: 0
	},
	{
		real: 0.80873606055313,
		imag: 0
	},
	{
		real: 0.95085946050647,
		imag: 0
	},
	{
		real: 0.999999682931835,
		imag: 0
	},
	{
		real: 0.951351376233829,
		imag: 0
	},
	{
		real: 0.809671788277164,
		imag: 0
	},
	{
		real: 0.588815561967795,
		imag: 0
	},
	{
		real: 0.310379909672042,
		imag: 0
	},
	{
		real: 0.00159265291648683,
		imag: 0
	},
	{
		real: -0.307350347074557,
		imag: 0
	},
	{
		real: -0.586237999170028,
		imag: 0
	},
	{
		real: -0.80779828143375,
		imag: 0
	},
	{
		real: -0.950365132881377,
		imag: 0
	},
	{
		real: -0.999997146387718,
		imag: 0
	},
	{
		real: -0.951840878815686,
		imag: 0
	},
	{
		real: -0.810605462232336,
		imag: 0
	},
	{
		real: -0.590102104664576,
		imag: 0
	},
	{
		real: -0.311893511952567,
		imag: 0
	},
	{
		real: -0.00318530179313799,
		imag: 0
	},
	{
		real: 0.305834394442219,
		imag: 0
	},
	{
		real: 0.584946985607144,
		imag: 0
	},
	{
		real: 0.806858453297741,
		imag: 0
	},
	{
		real: 0.949868394612432,
		imag: 0
	},
	{
		real: 0.999992073305919,
		imag: 0
	},
	{
		real: 0.952327967010396,
		imag: 0
	},
	{
		real: 0.811537080050339,
		imag: 0
	},
	{
		real: 0.591387150540858,
		imag: 0
	},
	{
		real: 0.313406323101189,
		imag: 0
	},
	{
		real: 0.00477794259012851,
		imag: 0
	},
	{
		real: -0.304317666047201,
		imag: 0
	},
	{
		real: -0.583654488299956,
		imag: 0
	},
	{
		real: -0.805916578529021,
		imag: 0
	},
	{
		real: -0.949369246959636,
		imag: 0
	},
	{
		real: -0.999984463699305,
		imag: 0
	},
	{
		real: -0.952812639582439,
		imag: 0
	},
	{
		real: -0.812466639368085,
		imag: 0
	},
	{
		real: -0.592670696337069,
		imag: 0
	},
	{
		real: -0.314918339280594,
		imag: 0
	},
	{
		real: -0.00637057126765214,
		imag: 0
	},
	{
		real: 0.302800165736756,
		imag: 0
	},
	{
		real: 0.582360510526938,
		imag: 0
	},
	{
		real: 0.804972659516697,
		imag: 0
	},
	{
		real: 0.948867691189098,
		imag: 0
	},
	{
		real: 0.999974317587179,
		imag: 0
	},
	{
		real: 0.95329489530242,
		imag: 0
	},
	{
		real: 0.813394137827703,
		imag: 0
	},
	{
		real: 0.593952738797435,
		imag: 0
	},
	{
		real: 0.316429556655486,
		imag: 0
	},
	{
		real: 0.00796318378593557,
		imag: 0
	},
	{
		real: -0.301281897360086,
		imag: 0
	},
	{
		real: -0.581065055570327,
		imag: 0
	},
	{
		real: -0.804026698655063,
		imag: 0
	},
	{
		real: -0.948363728573038,
		imag: 0
	},
	{
		real: -0.999961634995277,
		imag: 0
	},
	{
		real: -0.953774732947076,
		imag: 0
	},
	{
		real: -0.814319573076552,
		imag: 0
	},
	{
		real: -0.595233274669998,
		imag: 0
	},
	{
		real: -0.317939971392591,
		imag: 0
	},
	{
		real: -0.00955577610524739,
		imag: 0
	},
	{
		real: 0.29976286476835,
		imag: 0
	},
	{
		real: 0.579768126716097,
		imag: 0
	},
	{
		real: 0.803078698343589,
		imag: 0
	},
	{
		real: 0.947857360389779,
		imag: 0
	},
	{
		real: 0.999946415955768,
		imag: 0
	},
	{
		real: 0.954252151299278,
		imag: 0
	},
	{
		real: 0.815242942767223,
		imag: 0
	},
	{
		real: 0.596512300706621,
		imag: 0
	},
	{
		real: 0.319449579660681,
		imag: 0
	},
	{
		real: 0.0111483441859021,
		imag: 0
	},
	{
		real: -0.298243071814642,
		imag: 0
	},
	{
		real: -0.578469727253973,
		imag: 0
	},
	{
		real: -0.802128660986922,
		imag: 0
	},
	{
		real: -0.947348587923745,
		imag: 0
	},
	{
		real: -0.999928660507256,
		imag: 0
	},
	{
		real: -0.954727149148032,
		imag: 0
	},
	{
		real: -0.816164244557549,
		imag: 0
	},
	{
		real: -0.597789813662998,
		imag: 0
	},
	{
		real: -0.320958377630559,
		imag: 0
	},
	{
		real: -0.012740883988281,
		imag: 0
	},
	{
		real: 0.296722522353981,
		imag: 0
	}
]











// I believe this class is GPT-generated and not working..
class FFT {

	complexArray = [];

	constructor(typedArray) {

		typedArray.forEach(element => {
			//console.log(element)
			this.complexArray.push({
				real: element,
				imag: 0,
			})
		});

		console.log(this.complexArray);


	}


	calcFFT(input) {

		//let input = this.complexArray;

		const N = input.length;
	  
		if (N <= 1) {
		  return input;
		}
	  
		// Split the array into even and odd parts
		const even = [];
		const odd = [];
		for (let i = 0; i < N; i += 2) {
		  even.push(input[i]);
		  odd.push(input[i + 1]);
		}
	  
		// Recursively calculate FFT for even and odd parts
		const evenFFT = this.calcFFT(even);
		const oddFFT = this.calcFFT(odd);
	  
		// Combine the results
		const combinedFFT = [];
		for (let k = 0; k < N / 2; k++) {
		  const t = this.complexMultiply(
			{ real: Math.cos((2 * Math.PI * k) / N), imag: -Math.sin((2 * Math.PI * k) / N) },
			oddFFT[k]
		  );
	  
		  combinedFFT[k] = {
			real: evenFFT[k].real + t.real,
			imag: evenFFT[k].imag + t.imag,
		  };
	  
		  combinedFFT[k + N / 2] = {
			real: evenFFT[k].real - t.real,
			imag: evenFFT[k].imag - t.imag,
		  };
		}
	  
		return combinedFFT;
	  }


	complexMultiply(a, b) {
		console.log(typeof b)
		console.log(' ' + a.real + ' ' + a.imag + ' ' + ' ' + b.real + ' ' + b.imag + ' ');
		return {
			real: a.real * b.real - a.imag * b.imag,
			imag: a.real * b.imag + a.imag * b.real,
		};
	}
}



export {
	FFT,
	DFT,
}