
const express = require('express'); 
const app = express(); 
const db = require('./persistence/sqlite');

app.use(express.json());
app.use(express.static(__dirname + '/static'));



// ROUTES
const addSource = require('./routes/addSource');
const putSource = require('./routes/putSource');
const getSources = require('./routes/getSources');
const getSource = require('./routes/getSource');
const getSourcefile = require('./routes/getSourcefile');
const postSourcefile = require('./routes/postSourcefile');
const deleteSource = require('./routes/deleteSource');

const postShard = require('./routes/postShard');



// HTTP METHODS
app.post('/source', addSource);
app.put('/source', putSource);
app.get('/source', getSource);
app.get('/sources', getSources);
app.get('/sourcefile/:id', getSourcefile);
app.post('/sourcefile/:id', express.raw({limit: "10000kb",type: "*/*"}), postSourcefile);
app.delete('/source/:id', deleteSource);

app.post('/shard', postShard);





db.init().then(() => {
    app.listen(3000, () => console.log('Listening on port 3000'));
}).catch((err) => {
    console.error(err);
    process.exit(1);
});


const gracefulShutdown = () => {
    db.teardown()
        .catch(() => {})
        .then(() => process.exit());
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon


