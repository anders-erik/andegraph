const express = require('express'); 
const app = express(); 
const db = require('./persistence/sqlite');

// const getItems = require('./routes/getItems');
// const addItem = require('./routes/addItem');
// const updateItem = require('./routes/updateItem');
// const deleteItem = require('./routes/deleteItem');

const addSource = require('./routes/addSource');
const putSource = require('./routes/putSource');
const getSources = require('./routes/getSources');
const getSource = require('./routes/getSource');
const deleteSource = require('./routes/deleteSource');



const devtest_db = require('./sqlite_devtests/sqlite_devtests');
devtest_db.init().catch((err) => {
    console.error(err);
    process.exit(1);
});
//console.log('devtest_dir: ' + devtest_db.location);
const addTable = require('./sqlite_devtests/addTableRoute');
app.post('/addTable', addTable);




app.use(express.json());
app.use(express.static(__dirname + '/static'));

// app.get('/items', getItems);
// app.post('/items', addItem);
// app.put('/items/:id', updateItem);
// app.delete('/items/:id', deleteItem);


app.post('/source', addSource);
app.put('/source', putSource);
app.get('/source', getSource);
app.get('/sources', getSources);
app.delete('/source/:id', deleteSource);

app.get('/download', function(req, res){
    const file = `/data/sources/test.jpg`;
    res.download(file); // Set disposition and send it.
  });


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


