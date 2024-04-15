const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const PORT = 3000;


const addInscription = require("./inscription.inscription");

const getPerson = require("./connexion.connexion");

const creerQuiz = require("./creation_quiz");


app.use(cors({ origin: "*", methods: "GET,HEAD,PUT,PATCH,POST,DELETE" }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.post("/inscription/add", (req, res) => {
  const { nom, mail, mdp } = req.body;
  console.log({ nom, mail, mdp });
  addInscription({ nom, mail, mdp })
    .then((affectedRows) => {
      res.status(200).json({ "Affected rows":  affectedRows });
    })
    .catch((error) => {
      res.status(500).json({ "error": "Failed to insert data" });
    });
});


app.post("/create_quiz/add", (req, res) => {
  const { question, reponse_correcte, reponse_fausse1, reponse_fausse2, reponse_fausse3 } = req.body;
  console.log({ question, reponse_correcte, reponse_fausse1, reponse_fausse2, reponse_fausse3 });

  creerQuiz({ question, reponse_correcte, reponse_fausse1, reponse_fausse2, reponse_fausse3 })
    .then((affectedRows) => {
      res.status(200).json({ message: "Quiz créé avec succès !"  });
    })
    .catch((error) => {
      console.error("Erreur lors de la création du quiz :", error);
      res.status(500).json({ error : "Erreur lors de la création du quiz." });
    });
});


app.post("/connexion/person", (req, res) => {
  const { mail, mdp } = req.body;
  console.log("Requête de connexion reçue :", { mail, mdp });

  // Utiliser la fonction getPerson pour récupérer les informations de l'utilisateur
  getPerson(mail)
    .then((user) => {
      // Vérifier si les mots de passe correspondent
      console.log("Utilisateur trouvé dans la base de données :", user);
      if (user.mdp === mdp) {
        console.log("Mot de passe correct.");

        // Renvoyer les informations de l'utilisateur connecté en réponse
        res.status(200).json({ message: "Connexion réussie !", user });
      } else {
        console.log("Mot de passe incorrect.");
        res.status(401).json({ error: "Mot de passe incorrect." });
      }
    })
    .catch((error) => {
      // Gérer les erreurs lors de la récupération de l'utilisateur ou si aucun utilisateur n'est trouvé avec cet e-mail
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
      res.status(404).json({ error: "Aucun utilisateur trouvé avec cet e-mail." });
    });
});






app.listen(PORT, function (err) {
    if (err) console.log("Error in server setup");
    console.log("Server listening on Port", PORT);
  });
  








