
const express = require('express'); 
const app = express(); 
const db = require('./persistence/sqlite');

app.use(express.json());
app.use(express.static(__dirname + '/static'));



// ROUTES
const deleteSource = require('./routes/deleteSource');
const getSource = require('./routes/getSource');
const getSourcefile = require('./routes/getSourcefile');
const addSource = require('./routes/addSource');
const postSourcefile = require('./routes/postSourcefile');
const putSource = require('./routes/putSource');

const getSources = require('./routes/getSources');

const postShard = require('./routes/postShard');



// HTTP METHODS

// SOURCE
app.delete('/source/:id', deleteSource);
app.get('/source', getSource);
app.get('/sourcefile/:id', getSourcefile);
app.post('/source', addSource);
app.post('/sourcefile/:id', express.raw({limit: "10000kb",type: "*/*"}), postSourcefile);
app.put('/source', putSource);


// SOURCES
app.get('/sources', getSources);


// SHARD
app.post('/shard', postShard);





// INIT
db.init().then(() => {
    app.listen(3000, () => console.log('Listening on port 3000'));
}).catch((err) => {
    console.error(err);
    process.exit(1);
});




// SHUTDOWN
const gracefulShutdown = () => {
    db.teardown()
        .catch(() => {})
        .then(() => process.exit());
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon


