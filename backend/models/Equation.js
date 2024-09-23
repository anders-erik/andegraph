
const {newUuid} = require('../utils/uuid-v0.2');
const {currentUnixTime} = require('../utils/TimeDate');

function emptyEquation(){
	return {
		Uuid: newUuid(),
		Table: 'Equation',
		Type: '',
		Title: '',
		TimeCreated: currentUnixTime(),
		TimeLastChange: currentUnixTime(),

		Tex: '',
		MathMl: '',
	}
}

module.exports =  {
	emptyEquation,
}
