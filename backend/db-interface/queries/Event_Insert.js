const { newUuid } = require('../../utils/uuid-v0.2');
const { getDb } = require('../../db/Db.js');
let db = getDb();


async function Event_Insert(eventObject) {
    return new Promise((acc, rej) => {


        //codeObject.Uuid = newUuid();

        // Insert table name here bacause query builder does not accept variables for table names
        let queryString = `

            INSERT INTO "Event" ("Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange", "StartTime", "EndTime", "EventDate")
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                        
        ;`;

        db.all(queryString,
            [eventObject.Uuid, eventObject.Table, eventObject.Type, eventObject.Title, eventObject.TimeCreated, eventObject.TimeLastChange, eventObject.StartTime, eventObject.EndTime, eventObject.EventDate],
            (err, rows) => {
                if (err) return rej(err);

                // RETURN NEWLY CREATED OBJECT!
                acc(1);
            });

    });
}

module.exports = {
    Event_Insert,
}

