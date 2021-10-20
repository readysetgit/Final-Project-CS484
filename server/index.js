const express = require("express");
const path = require("path")
const PORT = process.env.PORT || 3001;
const app = express();

//---------ROUTES--------------------------------//
const user = require('./routes/user')
const auth = require('./routes/auth')


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve the static files of the built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));


app.use('/auth', auth)
app.use('/users', user)

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});