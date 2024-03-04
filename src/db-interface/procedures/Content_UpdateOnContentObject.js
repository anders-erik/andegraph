const queries = require("../Queries");



async function Content_UpdateOnContentObject(contentObject) {
    return new Promise(async (acc, rej) => {

        switch (contentObject.Table) {

            case 'Code':
                await queries.Code_Update(contentObject); break;

            case 'Equation':
                await queries.Equation_Update(contentObject); break;

            case 'Event':
                await queries.Event_Update(contentObject); break;

            case 'File':
                await queries.File_Update(contentObject); break;

            case 'Project':
                await queries.Project_Update(contentObject); break;

            case 'Review':
                await queries.Review_Update(contentObject); break;

            case 'Source':
                await queries.Source_Update(contentObject); break;

            case 'Text':
                await queries.Text_Update(contentObject); break;

            default:
                rej('no matching table.');
                return;
                break;
        }

        queries.Node_Update(contentObject);

        acc(1)


    });
}

module.exports = {
    Content_UpdateOnContentObject,
}

