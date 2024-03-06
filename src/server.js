
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// https://stackoverflow.com/questions/10434001/static-files-with-express-js
app.use(express.static(__dirname + '/static'));

app.use('/', express.static(__dirname + '/static'));
app.use('/source/*', express.static(__dirname + '/static'));
app.use('/development*', express.static(__dirname + '/static'));




// VERSION 0.2
const { db, initDB, dbTeardown } = require('./db/Db-v0.2.js');
let dbir;



// await initDB();

initDB().then((x) => {
    console.log('Connection to db was successful')

    // start api
    dbir = require('./dbi-receive/Dbir');
    dbir.initDbir(app, express);

    dbTest();

}).catch((error) => {
    console.log(error)
})
// console.log('initDbResponse', initDbResponse) // couldn't add await to the function? or did i accidentally use asuync?? idfk...




async function dbTest() {


    //const {Content_SelectFromNode, Node_InsertNode, Node_SelectChildOfUuid, NodeEdge_SelectChildOfUuid, Code_InsertEmpty} = require('./db-interface/DbInterface');
    const { queries, procedures, tests } = require('./db-interface/DbInterface');

    //Node_InsertNode(node1)
    //Node_InsertNode(node2)

    //console.log(typeof Content_SelectFromNode)
    //console.log( await Content_SelectFromNode(node1));

    // console.log(await queries.NodeEdge_SelectChildOfUuid(372));
    // console.log(await queries.Node_SelectChildOfUuid(372));
    //console.table(await queries.NodeEdge_SelectChildOfUuid(372));
    //console.table(await queries.Node_SelectChildOfUuid(372));



    // await tests.runCodeCrud();
    // await tests.runEdgeCrud();
    // await tests.runEquationCrud();
    // await tests.runEventCrud();
    // await tests.runFileCrud();
    // await tests.runNodeCrud();
    //await tests.runProjectCrud();
    // await tests.runReviewCrud();
    // await tests.runSourceCrud();
    // await tests.runTextCrud();


    //await tests.InsertChild();



    // if(JSON.stringify(codeObject0) === JSON.stringify(codeObject01[0])){
    //     console.log('true')
    // }
    // if(codeObject0 === codeObject01[0]){
    //     console.log('true')
    // }

    // console.table([codeObject0]);
    // console.table(codeObject01);

    // let codeObject2 = await queries.Code_Insert(models.emptyCode());
    // console.table(codeObject1);
    // console.table(codeObject2);


    // Content_SelectByUuid()
}





app.listen(port, () => console.log(`Listening on port ${port}`));



// SHUTDOWN
const gracefulShutdown = () => {
    dbTeardown()
        .catch(() => { })
        .then(() => process.exit());
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon


