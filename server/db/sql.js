const sqlite3 = require('sqlite3').verbose();
const path = require('path')
const db_path = path.join(__dirname, "./database.db");
const scripts = require('./scripts')

let db = new sqlite3.Database(db_path, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('11111111')

      db.run(scripts.CREATE_USERS_TABLE);
      console.log('22222222')

      db.run(scripts.CREATE_LOCATIONS_TABLE);
      console.log('33333333')

      db.run(scripts.CREATE_LOC_USER_REL_TABLE);
      console.log('Connected to the database.');

    };
    }
  );

module.exports = db
