const createQuiz = (id_utilisateur, difficulte, theme, questions) => {
  const pool = require("./connexionBDD");
  return new Promise((resolve, reject) => {
    // Insérer d'abord un enregistrement dans la table `quiz` pour obtenir l'ID du quiz
    const sqlInsertQuiz = "INSERT INTO quiz (id_utilisateur, difficulte, theme) VALUES (?, ?, ?)";
    pool.query(sqlInsertQuiz, [id_utilisateur, difficulte, theme], function (err, result) {
      if (err) {
        console.error("Erreur lors de la création du quiz :", err);
        reject(err);
      } else {
        // Récupérer l'ID du quiz nouvellement créé
        const id_quiz = result.insertId;
        console.log(`ID du nouveau quiz : ${id_quiz}`);

        // Insérer les questions et les réponses associées dans la table `question_reponse`
        questions.forEach((question) => {
          const sqlInsertQuestionReponse = "INSERT INTO question_reponse (id_quiz, question, reponse_correct, reponse_fausse1, reponse_fausse2, reponse_fausse3) VALUES (?, ?, ?, ?, ?, ?)";
          pool.query(sqlInsertQuestionReponse, [id_quiz, question.question, question.reponse_correcte, question.reponse_fausse1, question.reponse_fausse2, question.reponse_fausse3], function (err, result) {
            if (err) {
              console.error("Erreur lors de la création de la question et des réponses :", err);
              reject(err);
            } else {
              console.log(`${result.affectedRows} enregistrement(s) inséré(s)`);
            }
          });
        });

        resolve(result.insertId);
      }
    });
  });
};

module.exports = createQuiz;
