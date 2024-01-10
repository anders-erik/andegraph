
// input a  typed array representing raw audio data and the 'average' frequency is returned as a number
let zerocross = function(typedArray){

	let sampFreq = 48000; // Hz
	//let noSamples = 5000;

	let crossingIndices = getCrossingIndices(typedArray);
	let crossingGaps = getCrossingGaps(crossingIndices);
	
	//console.log(crossingGaps)

	let crossingAvg = crossingGaps.reduce((a, b) => (a + b)) / crossingGaps.length;
	//console.log(crossingAvg)
	

	let samplesSum = 0;
	for(let i = 1; i < crossingIndices.length; i++){
		let samplesSinceLastCrossing = crossingIndices[i] - crossingIndices[i-1];
		samplesSum += samplesSinceLastCrossing;
		//console.log(samplesSinceLastCrossing)
	}
	let averageSamplesPerCrossing = samplesSum / (crossingIndices.length-1);


	let fractionOfSecondForEachCrossing = crossingAvg / sampFreq;
	let fractionOfSecondForFullWave = 2 * fractionOfSecondForEachCrossing;

	let averageFreq = 1 / fractionOfSecondForFullWave;

	return averageFreq;
}

function isPositive(num){
	if(num > 0)
		return true;
	else
		return false;
}

function getCrossingIndices(typedArray){

	let crossingIndices = [];

	let prevNumIsPos = false;
	

	for(let i = 0; i < typedArray.length; i++){
		//console.log(test3[i].real)
		let currNumIsPos = isPositive(typedArray[i]);

		if((currNumIsPos && prevNumIsPos) || (!currNumIsPos && !prevNumIsPos)){
			//console.log('same');
		}
		else{
			//console.log('diff');
			crossingIndices.push(i);
		}
		prevNumIsPos = currNumIsPos;
	}

	return crossingIndices;
}

function getCrossingGaps(crossingIndices){
	let crossingGaps = [];

	// skip the first sample
	for(let i = 2; i < crossingIndices.length; i++){
		crossingGaps.push(crossingIndices[i] - crossingIndices[i-1])
	}

	
	crossingGaps = crossingGaps.sort((a, b) => (a - b))

	// remove data outliers - we're looking for a single tone, not all frequencies
	
	// let nodataPoints = 10; // even number!
	// let middlePoint = Math.floor(crossingGaps.length/2);
	// crossingGaps = crossingGaps.slice(middlePoint-nodataPoints/2, middlePoint+nodataPoints/2)


	crossingGaps.pop();
	crossingGaps.pop();
	crossingGaps.pop();
	crossingGaps.shift();
	crossingGaps.shift();
	crossingGaps.shift();

	

	//console.log(crossingGaps)


	return crossingGaps;
}






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



export {
	zerocross,
}