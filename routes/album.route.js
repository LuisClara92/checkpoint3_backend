const express = require("express");
const router = express.Router();
const connection = require("../config");
  
// 1. as a user, I want to be able to create a new album.
// http://localhost:5000/albums

//Get all albums available
router.get("/", (req, res) => {
  connection.query("SELECT * FROM album", (err, results) => {
    if (err) res.status(500).json(err);
    res.json(results);
  });
});

//create a new album
router.post("/", (req, res) => {
    const { title, genre, picture, artist } = req.body;
    connection.query(
      "INSERT INTO album (title, genre, picture, artist) VALUES (?, ?, ?, ?);",
      [title, genre, picture, artist],
      (err, results) => {
        err && res.status(500).json(err);
        console.log(results);
        connection.query(
          `SELECT * FROM album WHERE id =${results.insertId}`,
          (err, results) => {
            err ? res.status(500).json(err) : res.json(results);
          }
        );
      }
    );
  });
// 2. as a user, I want to be able to see an album by entering its id in the url.
// http://localhost:5000/albums/:id
//Get :id album
router.get("/:id", (req, res) => {
  const albumId = req.params.id;

  connection.query(
    `SELECT * FROM album WHERE id =${albumId}`,
    (err, results) => {
      if (err) res.status(500).json(err);

      const album = results;
      res.status(200).json(album);
    }
  );
});

// 5. as a user, I want to be able to delete a album.
// http://localhost:5000/albums/1
router.delete('/:id', (req, res) => {
    const albumId = req.params.id;

    connection.query(`DELETE FROM album WHERE id = ${albumId}`, (err, results) => {
        if (err) res.status(500).json(err);

        res.status(200).json({
            message: 'The album was successfully deleted :('
        });
    })
})


// 6. as a user, I want to be able to modify a album.
// http://localhost:5000/albums/1

router.put('/:id', (req, res) => {
    const albumId = req.params.id;
    const { title, genre, picture, artist} = req.body;

    connection.query(`UPDATE album SET title = ?, genre = ?, picture = ?, artist = ? WHERE id =${albumId}`, [title, genre, picture, artist], (err, results) => {
        if (err) res.status(500).json(err)

        connection.query(`SELECT * FROM album WHERE id =${albumId}`, (err, results) => {
            if (err) res.status(500).json(err)

            const updatedAlbum = results
            res.status(200).json(updatedAlbum)

        })
    })
})

module.exports = router;
