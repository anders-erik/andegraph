
const { getDb } = require('../../db/ErigraphDB');
let db = getDb();


async function Equation_Insert(equationObject) {
    return new Promise((acc, rej) => {



        // Insert table name here bacause query builder does not accept variables for table names
        let queryString = `

            INSERT INTO "Equation" ("Uuid", "Table", "Type", "Title", "TimeCreated", "TimeLastChange", "Tex", "MathMl")
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                        
        ;`;

        db.all(queryString,
            [equationObject.Uuid, equationObject.Table, equationObject.Type, equationObject.Title, equationObject.TimeCreated, equationObject.TimeLastChange, equationObject.Tex, equationObject.MathMl],
            (err, rows) => {
               if (err) return rej(err);

               // RETURN NEWLY CREATED OBJECT!
               acc(1);
           });

    });
}

module.exports = {
    Equation_Insert,
}

