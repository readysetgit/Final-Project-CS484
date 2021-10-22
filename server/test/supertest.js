const app = require("../server");
const mongoose = require("mongoose");
const supertest = require("supertest");
const env = require("../env.json");
const connection = require("./config/database");
const User = connection.models.User;

beforeEach((done) => {
  mongoose.connect(env.DB_STRING, { useUnifiedTopology: true }, () => done());
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

test("POST /signup", async () => {
  const user = await User.create({
    username: "abcd",
    password: "12345",
    name: "diyin rocks",
  });

  await supertest(app)
    .post("/signup")
    .expect(200)
    .then((response) => {
      // Check response  data
      expect(response.body.username).toBe(user.username);
      expect(response.body.name).toBe(user.name);
    });
});

// test("POST /login", async () => {
//   const user = await User.create({ username: "diyin123", password: "12345" });

//   await supertest(app)
//     .post("/login")
//     .expect(200)
//     .then((response) => {
//       // Check response  data
//       expect(response.body.username).toBe(user.username)
//       expect(response.body.name).toBe(user.name)
//     });
// });
