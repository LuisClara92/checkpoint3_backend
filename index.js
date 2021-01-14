const express = require('express');
const morgan = require("morgan");
const connection = require('./config');
const albumsRouter = require('./routes/album.route');
const tracksRouter = require('./routes/track.route');
const app = express();

require('dotenv').config()
const port = process.env.DB_PORT; 

connection.connect(err => {
    if (err) console.log(err);
    console.log('Successfully connected to the database')
})

app.use(express.json());
app.use(morgan(""));

app.use('/albums', albumsRouter)
app.use('/tracks', tracksRouter)

app.get("/", (req, res) => {
  res.json({ "App is connected":"OK!!" });
});

app.listen(port, (err) => {
    if (err) console.log(err);;
    console.log(`App is listening at port ${port}`)
})
