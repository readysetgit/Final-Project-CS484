const scripts = {
    GET_USER_BY_USERNAME: "SELECT * from users WHERE username = ?",
    ADD_USER: "INSERT INTO users (username, password, name) VALUES (?,?,?)",
    GET_LOCATION_BY_LAT_LNG: "SELECT * FROM locations WHERE lat = ? AND lng = ?",
    DELETE_ACCOUNT_BY_USERNAME: "DELETE from users WHERE username = ?",
    ADD_NEW_LOCATION: "INSERT INTO locations (lat, lng, location_details, place_id, like_num, dislike_num) VALUES (?,?,?,?,?,?)",
    ADD_LOCATION_BY_LOCATION_ID_USERNAME: "INSERT INTO loc_user_rel (location_id, username) VALUES (?,?)",
    DELETE_LOCATION_BY_USERNAME_LOCATION_ID: "DELETE FROM loc_user_rel WHERE username = ? AND location_id = ?",
    DELETE_LOCATION_BY_LOCATION_ID: "DELETE FROM locations WHERE location_id = ?",
    GET_LOCATIONS_BY_USERNAME: `
      SELECT *
      FROM locations
      INNER JOIN loc_user_rel on loc_user_rel.location_id = locations.location_id 
      WHERE loc_user_rel.username = ?;
    `,
    CREATE_USERS_TABLE:
      `CREATE TABLE if not EXISTS users (
        username TEXT PRIMARY KEY UNIQUE NOT NULL, 
        password VARCHAR CHECK(length(password) > 5), 
        name TEXT,
        CONSTRAINT unique_username UNIQUE(username) 
        )`,
    CREATE_LOCATIONS_TABLE:
    `CREATE TABLE if not EXISTS locations (
      location_id INTEGER PRIMARY KEY,
      lat TEXT,
      lng TEXT,
      place_id TEXT,
      location_details TEXT,
      like_num INTEGER,
      dislike_num INTEGER
      )`,
    CREATE_LOC_USER_REL_TABLE:
    `CREATE TABLE if not EXISTS loc_user_rel (
      id INTEGER PRIMARY KEY,
      location_id INTEGER,
      username TEXT    
    )`,
  };
  
  module.exports = scripts;