// const express = require('express');
// const router = express.Router();

// module.exports = (db) => {
//   //displays all the publicly available quizzes
//   router.get("/", (req, res) => {
//     //const user_id = req.session.user_id;
//     db.getQuizzes(10)
//       .then(data => {
//         const templateVars = {
//           //user_id,
//           quizzes: data
//         };
//         res.render("view_quizzes", templateVars);
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });
//   return router;
// };
