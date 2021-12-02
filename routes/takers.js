const express = require("express");
const router = express.Router();

module.exports = (db) => {

  router.get("/:id/", (req, res) => {
    const id = req.params.id;
    db.query(`
      SELECT questions.question as questions
      FROM quizzes
      JOIN users on quizzes.owner_id = users.id
      JOIN questions ON quizzes.id = quiz_id
      JOIN answers ON questions.id = question_id
      WHERE quizzes.id = ${id}
      `)
      .then((data) => {
        const templateVars = { questions: data.rows };
        console.log(templateVars);
        res
          .render('../views/quiz', templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/:id/result/", (req, res) => {
    const id = req.params.id;
    db.query(`
       SELECT previous_attempts.quiz_id as quiz_id, quizzes.title as title, users.username as name, count(questions.is_correct = TRUE) as score
       FROM previous_attempts
       JOIN quizzes ON quizzes.id = previous_attempts.quiz_id
       JOIN users ON users.id = user_id
       JOIN questions ON quizzes.id = quiz_id
       WHERE previous_attempts.id = ${id}
       GROUP BY score;
       `)
      .then((data) => {
        const templateVars = { quiz: { ...data.rows[0] } };
        res
          .render('../views/quiz_result', templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });


  router.post("/:id/", (req, res) => {
    const id = req.params.id;
    db.query("SELECT 1")
      .then(() => {
        res.redirect(`/takers/${id}/results`);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
