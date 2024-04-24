const pool = require("./connexionBDD");

const getCommunityQuiz = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM quiz";

    pool.query(sql, (error, results) => {
      if (error) {
        console.error("Erreur lors de la récupération des quiz de la communauté :", error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = getCommunityQuiz;
