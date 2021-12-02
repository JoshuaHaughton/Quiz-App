const express = require("express");
const maker = express.Router();
const bodyParser = require("body-parser");

// Home page Routes
module.exports = (db) => {
  // Render the maker new quiz page
  maker.get("/:id/new", (req, res) => {
    db.query(`
    INSERT INTO quizzes (owner_id, title, description) values (11, 'Tripterocalyx micranthus (Torr.) Hook.', 'Laniaurius atrococcineus');
    SELECT id
    FROM quizzes
    WHERE title = $1;`, [title])
    res.render("new_quiz");
  });

  // Submit the quiz to database
  maker.post("/new", (req, res) => {
    const id = 1; // generate id for quiz
    const title = req.body.title

    db.query(`
    INSERT INTO quizzes (owner_id, title, description) values (11, 'Tripterocalyx micranthus (Torr.) Hook.', 'Laniaurius atrococcineus');
    SELECT id
    FROM quizzes
    WHERE title = $1;`, [title])

      .then((data) => {
        res.redirect(`/${data}/`);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });


  return maker;
};
