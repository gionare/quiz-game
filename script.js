const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const submitBtn = document.getElementById("submitBtn");
const scoreElement = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

fetch("questions.json")
  .then((response) => response.json())
  .then((questions) => startQuiz(questions));

function startQuiz(questions) {
  displayQuestion(questions[currentQuestionIndex]);

  submitBtn.addEventListener("click", () => {
    const selectedOption = document.querySelector(
      'input[name="option"]:checked'
    );

    if (selectedOption) {
      const userAnswer = selectedOption.value;
      const correctAnswer = questions[currentQuestionIndex].correctAnswer;

      if (userAnswer == correctAnswer) {
        score++;
        scoreElement.textContent = score;
      }

      currentQuestionIndex++;

      if (currentQuestionIndex < questions.length) {
        displayQuestion(questions[currentQuestionIndex]);
      } else {
        endQuiz();
      }
    }
  });
}

function displayQuestion(question) {
  console.log(question);
  questionContainer.textContent = question.question;

  optionsContainer.innerHTML = "";
  question.options.forEach((option, index) => {
    const radioBtn = document.createElement("input");
    radioBtn.type = "radio";
    radioBtn.name = "option";
    radioBtn.value = option;
    radioBtn.id = `option${index}`;

    const label = document.createElement("label");
    label.textContent = option;
    label.htmlFor = `option${index}`;

    optionsContainer.appendChild(radioBtn);
    optionsContainer.appendChild(label);
  });
}

function endQuiz() {
  questionContainer.innerHTML = "<h2>Quiz Completed!</h2>";
  optionsContainer.innerHTML = "<p>Thank you</p>";
  submitBtn.disabled = true;
}
