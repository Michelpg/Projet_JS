const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const PORT = 3000;



const addInscription = require("./inscription.inscription");
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





app.listen(PORT, function (err) {
    if (err) console.log("Error in server setup");
    console.log("Server listening on Port", PORT);
  });
  