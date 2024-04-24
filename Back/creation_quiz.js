const createQuiz = (quizData) => {
  const pool = require("./connexionBDD");
  return new Promise((resolve, reject) => {
      // Insérer d'abord un enregistrement dans la table `quiz` pour obtenir l'ID du quiz
      const sqlInsertQuiz = "INSERT INTO quiz (id_utilisateur) VALUES (?)";
      pool.query(sqlInsertQuiz, [quizData.id_utilisateur], function (err, result) {
          if (err) {
              console.error("Erreur lors de la création du quiz :", err);
              reject(err);
          } else {
              // Récupérer l'ID du quiz nouvellement créé
              const id_quiz = result.insertId;
              console.log(`ID du nouveau quiz : ${id_quiz}`);
              // Insérer la question et les réponses associées dans la table `question_reponse`
              const sqlInsertQuestionReponse = "INSERT INTO question_reponse (question, reponse_correcte, reponse_fausse1, reponse_fausse2, reponse_fausse3, id_quiz) VALUES (?, ?, ?, ?, ?, ?)";
              pool.query(sqlInsertQuestionReponse, [quizData.question, quizData.reponse_correcte, quizData.reponse_fausse1, quizData.reponse_fausse2, quizData.reponse_fausse3, id_quiz], function (err, result) {
                  if (err) {
                      console.error("Erreur lors de la création de la question et des réponses :", err);
                      reject(err);
                  } else {
                      console.log(`${result.affectedRows} enregistrement(s) inséré(s)`);
                      resolve(result.affectedRows);
                  }
              });
          }
      });
  });
};

module.exports = createQuiz;


/*const creerQuiz = (quizData) => {
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
*/