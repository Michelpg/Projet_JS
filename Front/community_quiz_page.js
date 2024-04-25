document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("menu-button").addEventListener("click", redirigerVersIndex);

  let currentQuestionIndex = 0;
  let quizData = null;
  let score = 0;
  let userId = null;

  // Vérifiez si l'utilisateur est connecté et stockez son ID
  const storedUserId = localStorage.getItem("id_utilisateur");
  if (storedUserId) {
    userId = parseInt(storedUserId);
    console.log("User ID:", userId);
  }



// Function to fetch quiz data from the server
async function fetchQuizData() {
  try {
    const response = await axios.get("http://localhost:3000/get_random_quiz", {
      params: {
        difficulty: window.difficulty,
        theme: window.themeCode
      }
    });
    quizData = response.data;
    renderQuestion();
  } catch (error) {
    console.error("Error fetching quiz data:", error);
  }
}





// Function to render question
function renderQuestion() {
  if (!quizData || currentQuestionIndex >= quizData.questions.length) {
    displayEndPage();
    return;
  }

  const question = quizData.questions[currentQuestionIndex];
  const container = document.getElementById("quiz-container");

  const questionDiv = document.createElement("div");
  questionDiv.classList.add("question");
  questionDiv.innerHTML = `<p>${question.question}</p>`;
  container.innerHTML = ""; // Clear previous question
  container.appendChild(questionDiv);

  const answersDiv = document.createElement("div");
  answersDiv.classList.add("answers");

  // Shuffle answers (correct and incorrect)
  const allAnswers = [
    question.reponse_correct,
    question.reponse_fausse1,
    question.reponse_fausse2,
    question.reponse_fausse3,
  ];
  allAnswers.sort(() => Math.random() - 0.5);

  allAnswers.forEach((answer) => {
    const answerButton = document.createElement("button");
    answerButton.classList.add("btn", "btn-answer");
    answerButton.textContent = answer;
    answerButton.addEventListener("click", () =>
      checkAnswer(answer, question.reponse_correct)
    );
    answersDiv.appendChild(answerButton);
  });

  container.appendChild(answersDiv);
}

// Function to display end page
function displayEndPage() {
  console.log("User ID in displayEndPage:", userId)
  const container = document.getElementById("quiz-container");
  container.innerHTML = `
    <div class="end-page">
      <p>Partie terminée</p>
      <div class="score-info">
        <p>Votre score est de :</p>
        <p>${score}</p>
      </div>
    </div>
  `;

  // Vérifiez si l'utilisateur est connecté avant d'envoyer le score au serveur
  if (userId !== null) {
    updateBestScore(userId, score);
  }
}

// Function to update the best score on the server
function updateBestScore(userId, score) {
  if (userId !== null) {
    axios
      .post("http://localhost:3000/update_best_score", {
        id_utilisateur: userId,
        meilleur_score: score,
        current_score: score, // Ajouter le score actuel
      })
      .then((response) => {
        console.log("Best score updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating best score:", error);
      });
  }
}



// Function to check answer
function checkAnswer(userAnswer, correctAnswer) {
  const container = document.getElementById("quiz-container");

  // Change button colors
  const buttons = document.querySelectorAll(".btn-answer");
  buttons.forEach((button) => {
    if (button.textContent === correctAnswer) {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
    button.disabled = true; // Disable buttons after answering
  });

  // Increment score if the answer is correct
  if (userAnswer === correctAnswer) {
    score++;
    document.getElementById("score").textContent = `Score : ${score}`;
  }

  currentQuestionIndex++; // Move to the next question
  if (currentQuestionIndex < quizData.questions.length) {
    setTimeout(renderQuestion, 2000); // Render next question after 2 seconds
  } else {
    wait(2000).then(() => {
      displayEndPage();
    });
  }
}

// Fetch quiz data when the page loads
fetchQuizData();

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

});