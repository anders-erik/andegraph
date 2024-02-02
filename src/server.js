
const express = require('express'); 
const app = express(); 
//const sqlite = require('./persistence/sqlite');
const connection = require('./sql/Connection'); // import AND init database
const graphDb = require('./sql/GraphDb');


app.use(express.json());

// https://stackoverflow.com/questions/10434001/static-files-with-express-js
app.use(express.static(__dirname + '/static'));
app.use('/sourcing/*', express.static(__dirname + '/static'));

// Make sure this is after we add the json-middleware
const routes = require('./routes/Routes');
routes.initRoutes(app, express);



const { db, dbTeardown} = require('./db/ErigraphDB');



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
    
    uuid.extractUnixTime( uu );
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
        .catch(() => {})
        .then(() => gracefulShutdown());
};

const gracefulShutdown = () => {
    graphDb.teardown()
        .catch(() => {})
        .then(() => process.exit());
};


process.on('SIGINT', gracefulShutdown1);
process.on('SIGTERM', gracefulShutdown1);
process.on('SIGUSR2', gracefulShutdown1); // Sent by nodemon


