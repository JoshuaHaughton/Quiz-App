/* eslint-disable camelcase */
const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.get('/', (req, res) => {
    // req.session.user_id = req.params.user_id;
    db.query(`
    SELECT title, description
    FROM quizzes
    LIMIT 3;
    `)
      .then(data => {
        // const templateVar = {quizzes: data.rows, user_id: req.params.user_id};
        const templateVar = {quizzes: data.rows};
        res.render('../views/index', templateVar);
      });
  });
  return router;
};
