const getRandomQuiz = () => {
    const pool = require("./connexionBDD");
    return new Promise((resolve, reject) => {
      const sqlGetRandomQuiz = "SELECT * FROM quiz ORDER BY RAND() LIMIT 1";
      pool.query(sqlGetRandomQuiz, [], function (err, results) {
        if (err) {
          console.error("Erreur lors de la récupération d'un quiz aléatoire :", err);
          reject(err);
        } else {
          if (results.length > 0) {
            const quizId = results[0].id_quiz;
            const quizDifficulty = results[0].difficulte;
            const quizTheme = results[0].theme;
  
            const sqlGetQuizQuestions = "SELECT * FROM question_reponse WHERE id_quiz = ?";
            pool.query(sqlGetQuizQuestions, [quizId], function (err, questions) {
              if (err) {
                console.error("Erreur lors de la récupération des questions du quiz :", err);
                reject(err);
              } else {
                resolve({
                  id: quizId,
                  difficulty: quizDifficulty,
                  theme: quizTheme,
                  questions: questions
                });
              }
            });
          } else {
            reject("Aucun quiz trouvé dans la base de données.");
          }
        }
      });
    });
  };
  

  const updateBestScore = (id_utilisateur, meilleur_score, current_score) => {
    const pool = require("./connexionBDD");
    return new Promise((resolve, reject) => {
      const sqlUpdateBestScore =
        "SELECT meilleur_score FROM utilisateur WHERE id_utilisateur = ?";
      pool.query(sqlUpdateBestScore, [id_utilisateur], (err, result) => {
        if (err) {
          console.error("Erreur lors de la vérification du meilleur score :", err);
          reject(err);
        } else {
          const currentBestScore = result[0].meilleur_score;
          if (current_score > currentBestScore) {
            const sqlUpdateBestScore =
              "UPDATE utilisateur SET meilleur_score = ? WHERE id_utilisateur = ?";
            pool.query(
              sqlUpdateBestScore,
              [meilleur_score, id_utilisateur],
              function (err, result) {
                if (err) {
                  console.error("Erreur lors de la mise à jour du meilleur score :", err);
                  reject(err);
                } else {
                  resolve(result);
                }
              }
            );
          } else {
            resolve({ message: "Le score actuel n'est pas supérieur au meilleur score" });
          }
        }
      });
    });
  };
  

module.exports = {
  getRandomQuiz,
  updateBestScore,
};