/* eslint-disable camelcase */
const express = require('express');
const router  = express.Router();


module.exports = (db) => {

  router.get('/', (req, res) => {
    db.query(`
    SELECT title, description, user.username as name
    FROM quizzes
    JOIN users ON users.id = owner_id
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
