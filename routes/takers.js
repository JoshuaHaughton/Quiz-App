const express = require("express");
const router = express.Router();

module.exports = (db) => {

  router.get("/:id/", (req, res) => {
    const id = req.params.id;
    db.query(`
      SELECT quizzes.id as quiz_id, quizzes.title, users.username as name, questions.question as question,
        (SELECT answers.value
        FROM answers
        JOIN questions on question_id = questions.id
        JOIN quizzes ON quizzes.id = questions.id
        WHERE questions.quiz_id = ${id}
        AND answers.value = 'true') as answer1,
          (SELECT answers.value
          FROM answers
          JOIN questions on question_id = questions.id
          JOIN quizzes ON quizzes.id = questions.id
          WHERE questions.quiz_id = ${id}
          AND answers.value IS NULL) as answer2
      FROM quizzes
      JOIN users on quizzes.owner_id = users.id
      JOIN questions ON quizzes.id = quiz_id
      JOIN answers ON questions.id = question_id
      WHERE quizzes.id = ${id}
      `)
      .then((data) => {
        const templateVars = { quiz: { ...data.rows[0] } };
        res
          .render("quiz", templateVars);
      })
      .catch(() => {
        res.redirect(`../views/error_page`);
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
          .render("quiz_result", templateVars);
      })
      .catch(() => {
        res.redirect(`../views/error_page`);
      });
  });

  router.post("/:id/", (req, res) => {
    const id = req.params.id;
    db.query("SELECT 1")
      .then(() => {
        res.redirect(`/takers/${id}/results`);
      })
      .catch(() => {
        res.redirect(`../views/error_page`);
      });
  });

  return router;
};
