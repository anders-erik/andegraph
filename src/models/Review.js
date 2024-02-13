
const { newUuid } = require('../utils/uuid-v0.2');
const { currentUnixTime } = require('../utils/TimeDate');

function emptyReview() {
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


let basicReviewSchedule = {
	shortTermDayCount: 60,
	shortTermReviewCount: 7,
	longTermDayCount: 3650,
	longTermReviewCount: 8,
}

module.exports = {
	emptyReview,
	basicReviewSchedule,
}
