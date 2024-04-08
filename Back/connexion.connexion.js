const getPerson = (mail) => {
    const pool = require("./connexionBDD");
    return new Promise((resolve, reject) => {
        const sql = "SELECT nom_utilisateur, mdp FROM utilisateur WHERE mail = ?"; // Modifier la requête SQL pour rechercher par e-mail
        pool.query(sql, [mail], function (err, results) {
            if (err) {
                console.error("Erreur lors de la récupération de l'utilisateur :", err);
                return reject(err);
            }
            if (results.length === 0) {
                // Si aucun utilisateur n'est trouvé avec cet e-mail, rejeter la promesse
                return reject({ message: "Aucun utilisateur trouvé avec cet e-mail." });
            }
            // Renvoyer les résultats de la requête
            resolve(results[0]);
        });
    });
};

module.exports = getPerson;









/* Get a person by its id from DB
const getPerson = (id) => {
    const pool = require("./db_connexion");
    return new Promise((resolve, reject) => {
      const sql = "SELECT mdp FROM utilisateur WHERE nom_utilisateur = ?";
      pool.query(sql, [id], function (err, results) {
        if (err) {
          console.log(err.sqlMessage);
          return reject(err);
        }
        console.log("Found: " + results[0]);
        resolve(results[0]);
      });
    });
  };

module.exports = getPerson;

*/