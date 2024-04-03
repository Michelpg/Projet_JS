const addInscription = (inscription) => {
    const pool = require("./connexionBDD");
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO utilisateur (nom_utilisateur, mail, mdp) VALUES (?, ?, ?)";
      pool.query(sql, [inscription.nom, inscription.mail, inscription.mdp], function (err, result) {
        if (err) {
          console.error("Erreur lors de l'insertion :", err);
          reject(err);
        } else {
          console.log(`${result.affectedRows} enregistrement(s) inséré(s)`);
          resolve(result.affectedRows);
        }
      });
    });
};

module.exports = addInscription;
