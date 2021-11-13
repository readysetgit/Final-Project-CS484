const sqlite3 = require('sqlite3').verbose();

// open database in memory
let db = new sqlite3.Database('./data.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the data database.');
  });

//   CREATE TABLE location (
//     location_id INTEGER PRIMARY KEY AUTOINCREMENT,
//     latitude DOUBLE NOT NULL,
//     longtitude DOUBLE NOT NULL,
//     name TEXT NOT NULL,
//     description TEXT,
//     avg_ratings DOUBLE check(avg_ratings >= 0)
//   );

db.serialize(() => {
    db.run(`CREATE TABLE if not EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        email TEXT UNIQUE NOT NULL, 
        password VARCHAR CHECK(length(password) > 5), 
        firstName TEXT NOT NULL, 
        lastName TEXT NOT NULL);`);
    db.run(`INSERT INTO users (email, password, firstName, lastName) 
        VALUES('email1@test.com', '123456ABC', 'TestFirst', 'TestLast');`);
    db.each(`SELECT *
             FROM users`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(JSON.stringify(row) + "\t");
    });
  });

// close the database connection
// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });

module.exports = db
