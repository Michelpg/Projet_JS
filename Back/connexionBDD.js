const mysql = require("mysql");

/*
const pool = mysql.createPool({
  connectionLimit: 10,
  server: "dbserver-quiz.database.windows.net", // Serveur de BD
  user: "admin_login_AzureSQL", // Utilisateur de BD
  password: '7+[4r?L7Z9K"',
  database: "db_quiz", // Nom de la BD
  port: 1433,
});
*/



const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost", // Serveur de BD
  user: "root", // Utilisateur de BD
  password: "", // Mot de passe
  database: "projetjs", // Nom de la BD
});



pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("Connection successfull");
  connection.release();
});

module.exports = pool;
