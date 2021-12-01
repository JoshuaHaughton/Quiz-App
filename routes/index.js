/* eslint-disable camelcase */
const express = require('express');
const router  = express.Router();


module.exports = (db) => {

  router.get('/', (req, res) => {
    db.query(`
    SELECT title, description
    FROM quizzes
    WHERE public = true
    LIMIT 10;
    `)
      .then(data => {
        const templateVar = {quizzes: data.rows};
        res.render('../views/index', templateVar);
      });
  });

  return router;
};
