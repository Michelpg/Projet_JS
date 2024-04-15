function getPerson() {
    // Récupérer les valeurs des champs email et mdp
    const mail = document.getElementById("mail").value;
    const mdp = document.getElementById("password").value;


    console.log(JSON.stringify(mail));
    console.log(JSON.stringify(mdp));

    // Effectuer une requête POST vers le serveur pour vérifier les informations de connexion
    axios.post("Server=tcp:dbserver-quiz.database.windows.net,1433;Initial Catalog=db_quiz;Persist Security Info=False;User ID=admin_login_AzureSQL;Password=7+[4r?L7Z9K"/";MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;", { mail, mdp }) 
        .then(response => {
            console.log(response.data);
            // Si la connexion réussit, créer un cookie
            createCookie("loggedInUser", JSON.stringify({ mail, mdp }));
            // Rediriger vers la page index2.html
            redirigerVersIndex2();
        })
        .catch(error => {
            console.error(error);
            alert("Échec de la connexion. Veuillez vérifier vos informations.");
        });
}

function redirigerVersIndex2() {
    window.location.href = "index2.html"; 
}

// Fonction pour créer un cookie
function createCookie(name, value) {
    // Définir la date d'expiration du cookie (ici, dans 1 heure)
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (1 * 60 * 60 * 1000));
    // Formatage de la date d'expiration pour le cookie
    const expires = "expires=" + expirationDate.toUTCString();
    // Définition du cookie avec le nom, la valeur et la date d'expiration
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}



