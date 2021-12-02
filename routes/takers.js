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



  return router;
};
