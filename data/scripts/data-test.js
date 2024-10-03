// Can't find this module using the modules installed in docker container...
const sqlite3 = require('sqlite3').verbose();

// // Open the database connection
// let db = new sqlite3.Database('./your-database.db', sqlite3.OPEN_READWRITE, (err) => {
//     if (err) {
//         console.error('Error opening database: ' + err.message);
//         return;
//     }
//     console.log('Connected to the database.');
// });

// // Run a few queries
// db.serialize(() => {
//     // Create a table (if it doesn't exist)
//     db.run(`CREATE TABLE IF NOT EXISTS test_table (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT,
//         value INTEGER
//     )`);

//     // Insert data
//     db.run(`INSERT INTO test_table (name, value) VALUES (?, ?)`, ['Item1', 100]);

//     // Query data
//     db.all(`SELECT * FROM test_table`, [], (err, rows) => {
//         if (err) {
//             console.error(err.message);
//         }
//         console.log('Rows:', rows);
//     });
// });

// // Close the connection
// db.close((err) => {
//     if (err) {
//         console.error('Error closing database: ' + err.message);
//     }
//     console.log('Database connection closed.');
// });
