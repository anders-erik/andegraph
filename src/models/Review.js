
const {newUuid} = require('../utils/uuid-v0.2');
const {currentUnixTime} = require('../utils/TimeDate');

function emptyReview(){
	return {
		Uuid: newUuid(),
		Table: 'Review',
		Type: '',
		Title: '',
		TimeCreated: currentUnixTime(),
		TimeLastChange: currentUnixTime(),

		ReviewDate: '',
		ReviewCompleted: 0,
		ReviewCompletedOnDate: '',
		NodeToReviewUuid: 0,
	}
}

module.exports =  {
	emptyReview,
}
