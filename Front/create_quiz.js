let questionIndex = 0;

function addQuestion() {
    const questionsContainer = document.getElementById("questionsContainer");

    const questionDiv = document.createElement("div");
    questionDiv.innerHTML = `
        <h3>Question ${questionIndex + 1}</h3>
        <label for="question${questionIndex}">Question :</label>
        <input type="text" id="question${questionIndex}" name="question${questionIndex}" required><br>

        <label for="reponse_correcte${questionIndex}">Réponse Correcte :</label>
        <input type="text" id="reponse_correcte${questionIndex}" name="reponse_correcte${questionIndex}" required><br>

        <label for="reponse_fausse1${questionIndex}">Réponse Fausse 1 :</label>
        <input type="text" id="reponse_fausse1${questionIndex}" name="reponse_fausse1${questionIndex}" required><br>

        <label for="reponse_fausse2${questionIndex}">Réponse Fausse 2 :</label>
        <input type="text" id="reponse_fausse2${questionIndex}" name="reponse_fausse2${questionIndex}" required><br>

        <label for="reponse_fausse3${questionIndex}">Réponse Fausse 3 :</label>
        <input type="text" id="reponse_fausse3${questionIndex}" name="reponse_fausse3${questionIndex}" required><br>
    `;

    questionsContainer.appendChild(questionDiv);
    questionIndex++;
}

function creerQuiz() {
    const difficulte = document.getElementById("difficulte").value;
    const theme = document.getElementById("theme").value;
    const id_utilisateur = localStorage.getItem('id_utilisateur');
    document.getElementById('id_utilisateur').value = id_utilisateur;

    const questions = [];
    for (let i = 0; i < questionIndex; i++) {
        const question = document.getElementById(`question${i}`).value;
        const reponse_correcte = document.getElementById(`reponse_correcte${i}`).value;
        const reponse_fausse1 = document.getElementById(`reponse_fausse1${i}`).value;
        const reponse_fausse2 = document.getElementById(`reponse_fausse2${i}`).value;
        const reponse_fausse3 = document.getElementById(`reponse_fausse3${i}`).value;

        questions.push({
            question,
            reponse_correcte,
            reponse_fausse1,
            reponse_fausse2,
            reponse_fausse3
        });
    }

    // Envoi des données au serveur
    axios.post("http://localhost:3000/create_quiz/add", {
        difficulte,
        theme,
        id_utilisateur,
        questions
    })
    .then(response => {
        alert(response.data.message); // Affiche un message de succès
        // Réinitialise le formulaire
        document.getElementById("quizForm").reset();
        questionIndex = 0;
        document.getElementById("questionsContainer").innerHTML = "";
    })
    .catch(error => {
        console.error(error);
        alert("Une erreur s'est produite. Veuillez réessayer."); // Affiche un message d'erreur
    });
}
