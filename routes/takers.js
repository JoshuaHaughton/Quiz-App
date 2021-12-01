const express = require("express");
const router = express.Router();

module.exports = (db) => {

  router.get("/:id/", (req, res) => {
    const id = req.params.id;
    db.query(
      `SELECT quizzes.id as quiz_id, quizzes.title, users.username as name, questions.question as question,
      (SELECT answers.value
        FROM answers
        JOIN questions on question_id = questions.id
        JOIN quizzes ON quizzes.id = questions.id
        WHERE questions.quiz_id = ${id} AND answers.value = 'true') as answer1,
      (SELECT answers.value
        FROM answers
        JOIN questions on question_id = questions.id
        JOIN quizzes ON quizzes.id = questions.id
        WHERE questions.quiz_id = ${id} AND answers.value IS NULL) as answer2
      FROM quizzes
      JOIN users on quizzes.owner_id = users.id
      JOIN questions ON quizzes.id = quiz_id
      JOIN answers ON questions.id = question_id
      WHERE quizzes.id = ${id}
      `)
      .then((data) => {
        const templateVars = { quiz: { ...data.rows[0] } };
        res
          .render("take-quiz", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  return router;
};
