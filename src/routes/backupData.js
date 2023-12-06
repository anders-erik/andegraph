const db = require('../persistence/sqlite');

module.exports = async (req, res) => {
    console.log('backing up');
    await db.backupDatabase();
    res.send();
};
