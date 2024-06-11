const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS reservations (id INTEGER PRIMARY KEY, name TEXT, date TEXT, time TEXT, partySize INTEGER, specialRequests TEXT)');
});