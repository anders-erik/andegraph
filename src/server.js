
const express = require('express'); 
const app = express(); 
//const sqlite = require('./persistence/sqlite');
const sqlite = require('./persistence/Connection'); // import AND init database



app.use(express.json());

// https://stackoverflow.com/questions/10434001/static-files-with-express-js
app.use(express.static(__dirname + '/static'));
app.use('/sourcing/*', express.static(__dirname + '/static'));

// Make sure this is after we add the json-middleware
const routes = require('./routes/Routes');
routes.initRoutes(app, express);




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
const gracefulShutdown = () => {
    sqlite.teardown()
        .catch(() => {})
        .then(() => process.exit());
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon


