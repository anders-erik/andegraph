const queries = require("../Queries");



async function Content_InsertObject(contentObject) {
    return new Promise(async (acc, rej) => {

        switch (contentObject.Table) {

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
                rej('no matching table.');
                return;
                break;
        }

        queries.Node_Insert(contentObject);

        acc(1)


    });
}

module.exports = {
    Content_InsertObject,
}

