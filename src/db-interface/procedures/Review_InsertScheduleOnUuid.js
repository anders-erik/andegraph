const queries = require("../Queries");
const models = require('../../models/models')

async function Review_InsertScheduleOnUuid(toBeReviewedUuid, scheduleType) {
    return new Promise(async (acc, rej) => {


        let reviewSchedule = {
            shortTermDayCount: 60,
            shortTermReviewCount: 7,
            longTermDayCount: 3650,
            longTermReviewCount: 8,
        }


        // SHORT TERM LINEAR REVIEW
        let shortTermDates = [];
        shortTermDates.push(Date.now() + 86_400_000);
        for (let shortTermIndex = 1; shortTermIndex < reviewSchedule.shortTermReviewCount - 1; shortTermIndex++) {
            // console.log(shortTermIndex)
            let reviewGapInDays = reviewSchedule.shortTermDayCount / (reviewSchedule.shortTermReviewCount - 1);
            shortTermDates.push(Date.now() + shortTermIndex * reviewGapInDays * 86_400_000)

        }
        shortTermDates.push(Date.now() + reviewSchedule.shortTermDayCount * 86_400_000)

        shortTermDates = shortTermDates.map(timestamp => new Date(timestamp).toISOString().slice(0, 10))
        // console.log(shortTermDates);



        /* 
            LONG TERM DATES
            SUM_n=1-#reviews = n (n + 1) / 2;
        */
        let longTermDates = [];
        let adjustedLongTermDayCount = reviewSchedule.longTermDayCount - reviewSchedule.shortTermDayCount;
        let n = adjustedLongTermDayCount / (reviewSchedule.longTermReviewCount * (reviewSchedule.longTermReviewCount + 1) * 0.5)
        // console.log('n', n)
        let lastDateCount = reviewSchedule.shortTermDayCount;

        // console.log('multiplicativeConstant', multiplicativeConstant)
        for (let longTermIndex = 1; longTermIndex <= reviewSchedule.longTermReviewCount; longTermIndex++) {
            // console.log(longTermIndex)
            longTermDates.push((Date.now() + (lastDateCount + longTermIndex * n) * 86_400_000));
            lastDateCount = lastDateCount + longTermIndex * n;
        }
        // console.log(longTermDates)
        longTermDates = longTermDates.map(timestamp => new Date(timestamp).toISOString().slice(0, 10))
        // console.log(longTermDates);

        let allReviewDateStrings = [shortTermDates, longTermDates].reduce((acc, currentArray) => acc.concat(currentArray), [])
        // console.log(allReviewDateStrings)





        /*
        
            ADD ReviewDate-Objects AND Edges 

        */
        let reviewOrderIndex = 0;
        for (let reviewDateString of allReviewDateStrings) {
            let newReviewObject = models.getEmptyObject('Review')

            newReviewObject.ReviewDate = reviewDateString;
            newReviewObject.NodeToReviewUuid = toBeReviewedUuid;

            // console.log(newReviewObject)

            await queries.Review_Insert(newReviewObject);
            await queries.Node_Insert(newReviewObject);

            let newEdge = models.getEmptyObject('Edge');

            newEdge.Node1Uuid = toBeReviewedUuid;
            newEdge.Node2Uuid = newReviewObject.Uuid;
            newEdge.Directed = 0;
            newEdge.Order = reviewOrderIndex;

            await queries.Edge_Insert(newEdge);

            // console.log(newEdge)
            reviewOrderIndex++;
        }

        // console.log('allReviewDateStrings.length', allReviewDateStrings.length)





        acc(1);

    });
}

module.exports = {
    Review_InsertScheduleOnUuid,
}

