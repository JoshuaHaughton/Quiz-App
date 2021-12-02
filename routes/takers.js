const express = require("express");
const router = express.Router();

module.exports = (db) => {

  router.get("/:id/", (req, res) => {
    const id = req.params.id;
    db.query(`
      SELECT quizzes.id as quiz_id, quizzes.title, users.username as name, questions.question as question
      FROM quizzes
      JOIN users on quizzes.owner_id = users.id
      JOIN questions ON quizzes.id = quiz_id
      JOIN answers ON questions.id = question_id
      WHERE quizzes.id = ${id}
      `)
      .then((data) => {
        const templateVars = { quiz: { ...data.rows[0] } };
        res
          .render('../views/quiz', templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });



  return router;
};
