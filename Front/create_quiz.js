function creerQuiz() {
    const question = document.getElementById("question").value;
    const reponse_correcte = document.getElementById("reponse_correcte").value;
    const reponse_fausse1 = document.getElementById("reponse_fausse1").value;
    const reponse_fausse2 = document.getElementById("reponse_fausse2").value;
    const reponse_fausse3 = document.getElementById("reponse_fausse3").value;
    const difficulte = document.getElementById("difficulte").value;
    const theme = document.getElementById("theme").value;
    const id_utilisateur = localStorage.getItem('id_utilisateur');
    document.getElementById('id_utilisateur').value = id_utilisateur;

    // Envoi des données au serveur
    axios.post("http://localhost:3000/create_quiz/add", {
        question,
        reponse_correcte,
        reponse_fausse1,
        reponse_fausse2,
        reponse_fausse3,
        difficulte,
        theme,
        id_utilisateur
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

  