
const express = require('express');
const app = express();
//const sqlite = require('./persistence/sqlite');
const connection = require('./sql/Connection'); // import AND init database
const graphDb = require('./sql/GraphDb');


app.use(express.json());

// https://stackoverflow.com/questions/10434001/static-files-with-express-js
app.use(express.static(__dirname + '/static'));

app.use('/sourcing/*', express.static(__dirname + '/static'));
app.use('/source/*', express.static(__dirname + '/static'));

// Make sure this is AFTER we add the json-middleware
const routes = require('./routes/Routes');
routes.initRoutes(app, express);




const { db, initDB, dbTeardown } = require('./db/ErigraphDB');
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



// UUID TESTS
const uuid = require('./utils/uuid')

uuid.generate('file');
uuid.generate('file');
uuid.generate('file');
uuid.generate('file');
uuid.generate('file');
uuid.generate('edges');
uuid.generate('edges');
setTimeout(() => {
    uuid.generate('file');

    let uu = uuid.generate('edges');
    console.log(uu)

    uuid.extractUnixTime(uu);
    uuid.extractObjectType(uu);
}, 1000);





//  TESTS
const sourceQueries = require('./sql/graphQueries/SourceQueries');

app.get('/api/test', (req, res) => {

    sourceQueries.selectSource(196).then((rows) => {
        console.log('rows: ', rows)
    });

    sourceQueries.selectAllLikeString('apa', 10, 'ASC').then((rows) => {
        console.log('search: ', rows)
    });


    res.send('OKOK');
});




// ROUTES

// SOURCE
// const deleteSource = require('./routes/deleteSource');
// const getSource = require('./routes/getSource');
// const getSourcefile = require('./routes/getSourcefile');
// const addSource = require('./routes/addSource');
// const postSourcefile = require('./routes/postSourcefile');
// const putSource = require('./routes/putSource');

// SOURCES
//const getSources = require('./routes/getSources');

//const postShard = require('./routes/shard/postShard');



// HTTP METHODS

// SOURCE
// app.delete('/source/:id', deleteSource);
// app.get('/source', getSource);
// app.get('/sourcefile/:id', getSourcefile);
// app.post('/source', addSource);
// app.post('/sourcefile/:id', express.raw({limit: "10000kb",type: "*/*"}), postSourcefile);
// app.put('/source', putSource);


// SOURCES
//app.get('/sources', getSources);


// SHARD
//app.post('/shard', postShard);





// INIT
// sqlite.init().then(() => {


//     console.log(sqlite.db);

// }).catch((err) => {
//     console.error(err);
//     process.exit(1);
// });

app.listen(3000, () => console.log('Listening on port 3000'));



// SHUTDOWN
const gracefulShutdown1 = () => {
    connection.teardown()
        .catch(() => { })
        .then(() => gracefulShutdown());
};

const gracefulShutdown = () => {
    graphDb.teardown()
        .catch(() => { })
        .then(() => process.exit());
};

const gracefulShutdow2 = () => {
    dbTeardown()
        .catch(() => { })
        .then(() => process.exit());
};

process.on('SIGINT', gracefulShutdown1);
process.on('SIGTERM', gracefulShutdown1);
process.on('SIGUSR2', gracefulShutdown1); // Sent by nodemon


