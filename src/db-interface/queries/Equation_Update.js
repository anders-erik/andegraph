
const { getDb } = require('../../db/ErigraphDB');
let db = getDb();


async function Equation_Update(equationObject) {
    return new Promise((acc, rej) => {



        // Insert table name here bacause query builder does not accept variables for table names
        let queryString = `

            UPDATE "Equation" 
            SET 
                "Uuid" = ?, 
                "Table" = ?, 
                "Type" = ?, 
                "Title" = ?, 
                "TimeCreated" = ?, 
                "TimeLastChange" = strftime('%s'), 
                "Tex" = ?,
                "MathMl" = ?
            WHERE 
                Uuid = ?
        
        ;`;


        db.all(queryString,
            [equationObject.Uuid, equationObject.Table, equationObject.Type, equationObject.Title, equationObject.TimeCreated, equationObject.Tex, equationObject.MathMl, equationObject.Uuid],
            (err, rows) => {
               if (err) return rej(err);

               acc(1);
               
           });

    });
}

module.exports = {
    Equation_Update,
}

