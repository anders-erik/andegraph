
const { getDb } = require('../../db/Db.js');
let db = getDb();


async function Event_Update(eventObject) {
    return new Promise((acc, rej) => {



        // Insert table name here bacause query builder does not accept variables for table names
        let queryString = `

            UPDATE "Event" 
            SET 
                "Uuid" = ?, 
                "Table" = ?, 
                "Type" = ?, 
                "Title" = ?, 
                "TimeCreated" = ?, 
                "TimeLastChange" = strftime('%s'), 
                "StartTime" = ?,
                "EndTime" = ?,
                "EventDate" = ?
            WHERE 
                Uuid = ?
        
        ;`;


        db.all(queryString,
            [eventObject.Uuid, eventObject.Table, eventObject.Type, eventObject.Title, eventObject.TimeCreated, eventObject.StartTime, eventObject.EndTime, eventObject.EventDate, eventObject.Uuid],
            (err, rows) => {
                if (err) return rej(err);

                acc(1);

            });

    });
}

module.exports = {
    Event_Update,
}

