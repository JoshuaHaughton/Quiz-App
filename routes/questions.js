// /* eslint-disable camelcase */
// const express = require('express');
// const router = express.Router();

// module.exports = (db) => {

//   router.get('/:questionid', (req, res) => {
//     db.query(`
//       SELECT question
//       FROM questions
//       WHERE id = $1;`, [req.params.questionid])
//       .then(data => {
//         let question = data.rows[0].question;
//         let templateVars = { question_id: req.params.questionid, question };
//         res.render('../views/questions', templateVars);
//       });
//   });

//   router.post('/:questionId', (req, res) => {
//     db.query(`
//       INSERT INTO answers (question_id, value)
//       VALUES
//         ($1, $2),
//          ($1, $2),
//           ($1, $2),
//            ($1, $2),
//             ($1, $2),
//              ($1, $2),
//               ($1, $2)
//       RETURNING *;
//     `, [
//       req.params.questionId,
//       req.body.answer1,
//       req.body.answer2,
//       req.body.answer3,
//       req.body.answer4,
//       req.body.answer5,
//       req.body.answer6,
//       req.body.answer7
//     ])
//       .then(async(data) => {
//         const questionID = await(data.rows[0].question_id);
//         db.query(`
//           SELECT quiz_id
//           FROM questions
//           WHERE questions.id = $1;
//         `, [questionID])
//           .then(async(response) => {
//             let quizid = await(response.rows[0].quiz_id);
//             res.redirect(`/quiz/${quizid}`);
//           });
//       })
//       .catch(err => {
//         res.send(`Please complete all fields.`);
//       });
//   });
//   return router;
// };
