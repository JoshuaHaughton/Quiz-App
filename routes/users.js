/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
*/
const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  // router.get("/", (req, res) => {
  //   db.query(`SELECT * FROM users;`)
  //     .then(data => {
  //       const users = data.rows;
  //       res.json({ users });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });

  router.get("/new", (req, res) => {
    const id = req.params.user_id;
    db.query(`
    SELECT id
    FROM users
    WHERE public = true
    LIMIT 3;
    `)
      .then(data => {
        console.log(req.body);
    const templateVar = {id: id};
    res.render("../views/new_quiz", templateVar);
      });
  });


  router.post("/new/", (req, res) => {
    console.log(req.body);
    const id = 1; // generate id for quiz
    //Stretch: check database to see if generated id matches an existing id in database, and regenerate ids until original id is generated
    // db.query("
    // INSERT INTO users (id, title, description) values (7, 'Pertusaria floridana Dibben', 'Spermophilus parryii');

    // 1")
      // Replace with Query to send new quiz data to database using id
      // Stretch: if identical quiz already exists in database, give user error message
      // .then(() => {
      //   res.redirect(`/m/${id}/`); // redirect to maker quiz page using the id generated as a redirect url
      // })
      // .catch((err) => {
      //   res.status(500).json({ error: err.message });
      // });
  });



  return router;
};

// app.get("/", (req, res) => {
//   res.render("index");
// });

// app.get("/register", (req, res) => {
//   res.render("register");
// });

// app.get("/login", (req, res) => {
//   res.render("login");
// });

// app.get("/quiz", (req, res) => {
//   res.render("quiz");
// });

// app.get("/new", (req, res) => {
//   res.render("new_quiz");
// });

// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`);
// });
