const getQuizzes = function() {
  return db.query(`
    SELECT * FROM quizzes
    WHERE public = true
    LIMIT 3;
  `)
    .then(res => res.rows);
};

module.exports = { getQuizzes };
