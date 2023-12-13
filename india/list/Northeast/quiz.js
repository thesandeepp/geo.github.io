const tigerReserves = [
  "Arunachal Pradesh",
  "Assam",
  "Manipur",
  "Mizoram",
  "Meghalaya",
  "Nagaland",
  "Tripura",
  "sikkim",
];

let correctAnswers = new Array(tigerReserves.length).fill(false);
let currentQuestionIndex = 0;
let correctAttemptsFirstTry = 0;
let totalCorrectFirstTry = 0;
let totalQuestionsAnswered = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  correctAttemptsFirstTry = 0;
  showQuestion();
  document.getElementById("result-message").innerText = "";
  document.querySelector(".result-section").classList.add("hidden");
}

function showQuestion() {
  const previousImage = document.querySelector(".content img");
  if (previousImage) {
    previousImage.remove();
  }

  document.getElementById("question").innerText = "Tap on Map:";
  document.getElementById("reserve-name").innerText = tigerReserves[currentQuestionIndex];

  const buttons = document.querySelectorAll(".map-button");
  buttons.forEach((button) => {
    button.classList.remove("wrong", "correct");
    button.disabled = false; // Enable all buttons
  });

  if (correctAnswers[currentQuestionIndex]) {
    buttons[currentQuestionIndex].classList.add("correct");
    buttons[currentQuestionIndex].innerText = tigerReserves[currentQuestionIndex];
  }
}

function checkAnswer(selectedButtonIndex) {
  const correctButtonIndex = currentQuestionIndex + 1;
  const buttons = document.querySelectorAll(".map-button");

  if (selectedButtonIndex === correctButtonIndex && correctAttemptsFirstTry === currentQuestionIndex) {
    correctAttemptsFirstTry++;

    // Provide custom messages for each correct button
    const customMessages = [
      "Arunachal (itanagar)",
      "Assam (Kohima)",
      "Manipur (Imphal)",
      "Mizoram (Aizwal)",
      "Meghalaya (Shillong)",
      "Nagaland (Kohima)",
      "Tripura (Agartala)",
      "Sikkim (gangtok)",
      // Add more custom messages for each button
    ];

    // Update the inner text of the #reserve-name element with the custom message
    document.getElementById("reserve-name").innerText = customMessages[currentQuestionIndex];

    buttons[currentQuestionIndex].classList.add("correct");
    buttons[currentQuestionIndex].innerText = customMessages[currentQuestionIndex];

    totalCorrectFirstTry++;
    totalQuestionsAnswered++;

    const accuracyPercentage = ((totalCorrectFirstTry / totalQuestionsAnswered) * 100).toFixed(2);
    document.getElementById("accuracy-percent").innerText = `${accuracyPercentage}%`;

    // Disable all buttons temporarily to prevent multiple clicks
    buttons.forEach((button) => {
      button.disabled = true;
    });

    // Wait for 1 second before moving to the next question
    setTimeout(() => {
      buttons.forEach((button) => {
        button.classList.remove("correct", "wrong");
        button.disabled = false;
      });

      nextQuestion();
    }, 10);
  } else {
    const button = document.querySelector(`.map-button.button${selectedButtonIndex}`);
    button.classList.add("wrong");
  }
}


function nextQuestion() {
  if (currentQuestionIndex < tigerReserves.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  } else {
    document.getElementById("question").innerText = "Congratulations! You have completed the quiz.";
    document.getElementById("reserve-name").innerText = "";
    displayResult();
  }
}

function displayResult() {
  const resultMessage = `You guessed ${correctAttemptsFirstTry} questions right on the first attempt out of ${tigerReserves.length}. Your score is ${((totalCorrectFirstTry / tigerReserves.length) * 100).toFixed(2)}%.`;
  document.getElementById("result-message").innerText = resultMessage;

  // Display correct answers
  let correctAnswersMessage = "Correct answers:\n";
  tigerReserves.forEach((reserve, index) => {
    if (correctAnswers[index]) {
      correctAnswersMessage += `${index + 1}. ${reserve}\n`;
    }
  });
  document.getElementById("correct-answers").innerText = correctAnswersMessage;

  document.querySelector(".result-section").classList.remove("hidden");
}

window.onload = () => {
  startQuiz();
  createButtons();
  setButtonCoordinates();

  window.addEventListener("resize", setButtonCoordinates);
};

function createButtons() {
  const buttonsOverlay = document.querySelector(".buttons-overlay");
  for (let i = 0; i < tigerReserves.length; i++) {
    const button = document.createElement("button");
    button.classList.add("map-button", `button${i + 1}`);
    button.onclick = () => checkAnswer(i + 1);
    buttonsOverlay.appendChild(button);

    button.addEventListener("click", playClickSound);
  }
}

function setButtonCoordinates() {
  if (window.innerWidth <= 700) {
    const buttonCoordinatesMobile = [
      { top: "70px", left: "300px" },
      { top: "165px", left: "155px" },
      { top: "240px", left: "260px" },
      { top: "320px", left: "210px" },
      { top: "210px", left: "150px" },
      { top: "190px", left: "290px" },
      { top: "310px", left: "160px" },
      { top: "110px", left: "30px" },
    ];

    const buttons = document.querySelectorAll(".map-button");
    buttons.forEach((button, index) => {
      button.style.top = buttonCoordinatesMobile[index].top;
      button.style.left = buttonCoordinatesMobile[index].left;
    });
  } else {
    const buttonCoordinates = [
      { top: "150px", left: "351px" },
      { top: "239px", left: "230px" },
      { top: "350px", left: "380px" },
      { top: "450px", left: "320px" },
      { top: "305px", left: "219px" },
      { top: "270px", left: "420px" },
      { top: "440px", left: "234px" },
      { top: "160px", left: "44px" },
    ];

    const buttons = document.querySelectorAll(".map-button");
    buttons.forEach((button, index) => {
      button.style.top = buttonCoordinates[index].top;
      button.style.left = buttonCoordinates[index].left;
    });
  }
}

function playClickSound() {
  const clickSound = new Audio('click.mp3');
  clickSound.play();
}
