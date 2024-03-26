function comparerReponse() {
    // Récupérer la valeur saisie par l'utilisateur
    var userInput = document.getElementById('userInput').value;

    // Réponse prédéfinie à comparer
    var reponseAttendue = "paris";
    var userInputNormalized = userInput.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    var reponseAttendueNormalized = reponseAttendue.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");


    // Comparer la réponse de l'utilisateur avec la réponse prédéfinie
    if (userInputNormalized === reponseAttendueNormalized) {
        alert("Félicitations ! Vous avez donné la bonne réponse.");
        checkAnswer()
    } else {
        alert("Désolé, la réponse est incorrecte. Veuillez réessayer.");
        checkAnswer()
    }
}
function checkAnswer() {
    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        alert("Quiz terminé !");
        window.location.href = "page_accueil.html";
    }
}