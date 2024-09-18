const queries = require("../Queries");
const models = require('../../models/models')
const enumContentTables = require('../../enums/contentTables');


async function Content_InsertOnTable(tableName) {
    return new Promise(async (acc, rej) => {

        let contentObject;


        try {
            


            if (enumContentTables.includes(tableName)) {

                contentObject = models.getEmptyObject(tableName);

                switch (tableName) {

                    case 'Code':
                        await queries.Code_Insert(contentObject); break;

                    case 'Equation':
                        await queries.Equation_Insert(contentObject); break;

                    case 'Event':
                        await queries.Event_Insert(contentObject); break;

                    case 'File':
                        await queries.File_Insert(contentObject); break;

                    case 'Project':
                        await queries.Project_Insert(contentObject); break;

                    case 'Review':
                        await queries.Review_Insert(contentObject); break;

                    case 'Source':
                        await queries.Source_Insert(contentObject); break;

                    case 'Text':
                        await queries.Text_Insert(contentObject); break;

                    default:
                        rej('error in table matching switch statement.');
                        return;
                        break;
                }

                queries.Node_Insert(contentObject);

                acc(contentObject)


            }
            else {
                console.log("Error in matching table name. File: ", __filename);
                rej('no matching content table.');
            }



        } catch (error) {
            console.log("Error on inserting new object. File: ", __filename);
            rej('Error on inserting new object. ');
        }

        


    });
}

module.exports = {
    Content_InsertOnTable,
}

