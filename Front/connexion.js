function getPerson() {
    // Récupérer les valeurs des champs email et mdp
    const mail = document.getElementById("mail").value;
    const mdp = document.getElementById("password").value;


    console.log(JSON.stringify(mail));
    console.log(JSON.stringify(mdp));

    // Effectuer une requête POST vers le serveur pour vérifier les informations de connexion
    axios.post("http://10.4.254.164:3000/connexion/person", { mail, mdp }) 
        .then(response => {
            console.log(response.data);
            alert("Connexion réussie !");
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
