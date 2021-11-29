const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM quizzes`;
    console.log(query);
    db.query(query)
      .then(data => {
        const quizzes = data.rows;
        res.json({ quizzes });
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });
  return router;
};

