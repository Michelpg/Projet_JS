function creerQuiz() {
    const question = document.getElementById("question").value;
    const reponse_correcte = document.getElementById("reponse_correcte").value;
    const reponse_fausse1 = document.getElementById("reponse_fausse1").value;
    const reponse_fausse2 = document.getElementById("reponse_fausse2").value;
    const reponse_fausse3 = document.getElementById("reponse_fausse3").value;


    console.log(JSON.stringify(question));
    console.log(JSON.stringify(reponse_correcte));
    console.log(JSON.stringify(reponse_fausse1));
    console.log(JSON.stringify(reponse_fausse2));
    console.log(JSON.stringify(reponse_fausse3));
    // Envoi des données au serveur
    axios.post("http://10.4.255.119:3000/create_quiz/add", {
        question,
        reponse_correcte,
        reponse_fausse1,
        reponse_fausse2,
        reponse_fausse3
    })
    .then(response => {
        alert(response.data.message); // Affiche un message de succès
        // Réinitialise le formulaire
        document.getElementById("quizForm").reset();
    })
    .catch(error => {
        console.error(error);
        alert("Une erreur s'est produite. Veuillez réessayer."); // Affiche un message d'erreur
    });
}

  