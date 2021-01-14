const express = require('express');
const router = express.Router();
const connection = require('../config');

//Get all tracks available
router.get("/", (req, res) => {
    connection.query("SELECT * FROM track", (err, results) => {
      if (err) res.status(500).json(err);
      res.json(results);
    });
  });


// 3. as a user, I want to create and assign a song to a album.
// http://localhost:5000/tracks
router.post('/', (req, res) => {
    const {id_album, title, youtube_url} = req.body;

    connection.query("INSERT INTO track (id_album, title, youtube_url) VALUES (?, ?, ?);",
    [id_album, title, youtube_url], (err, results) => {
        if (err) res.status(500).json(err)

        const newTrackId = results.insertId

        connection.query(`SELECT * FROM track WHERE id = ${newTrackId}`, (err, results) => {
            if (err) res.status(500).json(err)


            const newTrack = results
            res.status(200).json(newTrack)
        })

    })
})

// 4. as a user, I want to list all the songs from a album.
// http://localhost:5000/tracks?id_album=1

//NOT WORKING WHYYYYYY??????????????? :'(
// router.get('/', (req, res) => {

//     let sql = 'SELECT * FROM track'
//     let sqlValues = []

//     if (req.query.id_album) {
//         sql += ' WHERE id_album = ?'
//         sqlValues.push(req.query.id_album)
//     }

//     connection.query(sql, sqlValues, (err, results) => {
//         if (err) res.status(500).json(err);

//         const tracks = results
//         res.status(200).json(tracks)
//     })
// })


// 7. as a user, I want to delete a song from a album.
// http://localhost:5000/albums/:id
router.delete('/:id', (req, res) => {
    const trackId = req.params.id;

    connection.query(`DELETE FROM track WHERE id = ${trackId}`, (err, results) => {
        if (err) res.status(500).json(err)

        res.status(200).json({
            message: 'Successfully deleted track :('
        })
    })
})


// as a user, I want to edit a song from a album.
// http://localhost:5000/tracks/:id
router.put('/:id', (req, res) => {
    const trackId = req.params.id;
    const { title, youtube_url} = req.body;

    connection.query(`UPDATE track SET title = ?, youtube_url = ? WHERE id =${trackId}`,[ title, youtube_url], (err, results) => {
        if (err) res.status(500).json(err)

        connection.query(`SELECT * FROM track WHERE id = ${trackId}`, (err, results) => {
            if (err) res.status(500).json(err)

            const updatedTrack = results
            res.status(200).json(updatedTrack)

        })
    })
})


module.exports = router;