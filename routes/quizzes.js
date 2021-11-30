/* eslint-disable camelcase */
const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/:quizid/quiz", (req, res) => {
    req.session.quiz_id = req.params.quizid;
    db.query(`
       SELECT id, owner_id
       FROM quizzes
       WHERE id = $1`, [req.params.quizid])
      .then(data => {
        let templateVar = { quizId: req.params.quizid, user: data.rows[0] };
        res.render('../views/quiz', templateVar);
      });
  });



  return router;
};
