
const { getDb } = require('../../db/ErigraphDB');
let db = getDb();


async function Project_Update(projectObject) {
    return new Promise((acc, rej) => {



        // Insert table name here bacause query builder does not accept variables for table names
        let queryString = `

            UPDATE "Project" 
            SET 
                "Uuid" = ?, 
                "Table" = ?, 
                "Type" = ?, 
                "Title" = ?, 
                "TimeCreated" = ?, 
                "TimeLastChange" = strftime('%s'), 
                "Goal" = ?
            WHERE 
                Uuid = ?
        
        ;`;


        db.all(queryString,
            [projectObject.Uuid, projectObject.Table, projectObject.Type, projectObject.Title, projectObject.TimeCreated, projectObject.Goal, projectObject.Uuid],
            (err, rows) => {
               if (err) return rej(err);

               acc(1);
               
           });

    });
}

module.exports = {
    Project_Update,
}

