const scripts = {
    GET_USER_BY_USERNAME: "SELECT * from users WHERE username = ?",
    ADD_USER: "INSERT INTO users (username, password, name) VALUES (?,?,?)",
    DELETE_ACCOUNT_BY_USERNAME: "DELETE from users WHERE username = ?",
    CREATE_USERS_TABLE:
      `CREATE TABLE if not EXISTS users (
        username TEXT PRIMARY KEY UNIQUE NOT NULL, 
        password VARCHAR CHECK(length(password) > 5), 
        name TEXT,
        CONSTRAINT unique_username UNIQUE(username) 
        )`,
  };
  
  module.exports = scripts;