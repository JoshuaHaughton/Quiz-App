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

  router.get("/:quizid/quiz/:questionid", (req, res) => {
    db.query(`
       SELECT question, owner_id
       FROM questions
       JOIN quizzes ON quiz_id = quizzes.id
       WHERE questions.id = $1;`, [req.params.questionid])
      .then(data => {
        let question = data.rows[0];
        let templateVars = { quiz_id: req.params.quizid, question_id: req.params.questionid, question };
        res.render('../views/answers', templateVars);
      });
  });

  router.post("/:quizid/quiz", (req, res) => {
    req.session.quiz_id = req.params.quizid;
    db.query(`
       INSERT INTO questions (quiz_id, question)
       VALUES ($1, $2)
       RETURNING *;`, [req.params.quizid, req.body.question])
      .then(data => {
        res.redirect(`/quiz/${req.session.quiz_id}/quiz/${data.rows[0].id}`);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
