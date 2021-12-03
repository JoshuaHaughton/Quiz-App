const express = require("express");
const router = express.Router();

module.exports = (db) => {

  router.get("/:id/", (req, res) => {
    const id = req.params.id;
    db.query(`
      SELECT questions.question as questions, answer, question
      FROM quizzes
      JOIN users on quizzes.owner_id = users.id
      JOIN questions ON quizzes.id = quiz_id
      JOIN answers ON questions.id = question_id
      WHERE quizzes.id = ${id}
      `)
      .then((data) => {
        const templateVars = { questions: data.rows };
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
       SELECT previous_attempts.quiz_id as quiz_id, quizzes.title as title, users.username as name,  is_correct, answer, question,
       FROM previous_attempts
       JOIN quizzes ON quizzes.id = previous_attempts.quiz_id
       JOIN users ON users.id = user_id
       JOIN answers ON questions.id = question_id
       JOIN questions ON quizzes.id = quiz_id
       WHERE previous_attempts.id = ${id}
       GROUP BY score;
       `, [id])
      .then((data) => {
        const templateVars = { quiz: data.rows};
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



/*
router.post("/:quiz_id/attempts", (req, res) => {

    db.getCorrectAnswer(req.params.quiz_id)
      .then(results => {
        console.log(results);
        let score = 0;
        const numOfQuestions = results.length;

        for (const question of results) {
          if (req.body[question.question_id] == question.answer_id) {
            score++;
          }
        }
        //add attempt to the attempts table
        const attempt = {
          quizId: req.params.quiz_id,
          score
        };

*/
