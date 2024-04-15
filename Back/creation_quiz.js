const creerQuiz = (quizData) => {
    const pool = require("./connexionBDD"); 
    return new Promise((resolve, reject) => {

      const sql = "INSERT INTO question_reponse (question, reponse_correct, reponse_fausse1, reponse_fausse2, reponse_fausse3,id_quiz ) VALUES (?,?,?,?,?,1)";
      pool.query(sql, [quizData.question,quizData.reponse_correcte, quizData.reponse_fausse1, quizData.reponse_fausse2, quizData.reponse_fausse3], function (err, result) {
        if (err) {
          console.error("Erreur lors de la création du quiz :", err);
          reject(err);
        } else {
          console.log(`${result.affectedRows} enregistrement(s) inséré(s)`);
          resolve(result.affectedRows);
        }
      });
    });
  };

module.exports = creerQuiz;