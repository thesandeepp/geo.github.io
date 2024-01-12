const tigerReserves = [
  "Teesta",
  "Sankosh",
  "Manas",
  "Baranadi",
  "kameng",
  "Subansiri",
  "dibang",
  "Lohit",
  "burhi dibang",
  "Diknou",
  "Dhansiri",
  "Kapili",
  "Kolong",
  

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

  if (selectedButtonIndex === correctButtonIndex && correctAttemptsFirstTry === currentQuestionIndex) {
    correctAttemptsFirstTry++;

    // Provide custom messages for each correct button
    const customMessages = [
      "Teesta",
  "Sankosh",
  "Manas",
  "Baranadi",
  "kameng",
  "Subansiri",
  "dibang",
  "Lohit",
  "burhi dibang",
  "Diknou",
  "Dhansiri",
  "Kapili",
  "Kolong",
      // Add more custom messages for each button
    ];

    correctAnswers[currentQuestionIndex] = true; 
    const buttons = document.querySelectorAll(".map-button");
    buttons[currentQuestionIndex].classList.add("correct");
    buttons[currentQuestionIndex].innerText = customMessages[currentQuestionIndex];
     setTimeout(() => {
      buttons[currentQuestionIndex].classList.remove("correct");
      nextQuestion();
    }, 1000);

    totalCorrectFirstTry++; 
  } else {
    const button = document.querySelector(`.map-button.button${selectedButtonIndex}`);
    button.classList.add("wrong"); 
  }

  totalQuestionsAnswered++; 

  const accuracyPercentage = ((totalCorrectFirstTry / totalQuestionsAnswered) * 100).toFixed(2);
  document.getElementById("accuracy-percent").innerText = `${accuracyPercentage}%`;
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
  const resultMessage = `You guessed ${correctAttemptsFirstTry} questions right on the first attempt out of ${tigerReserves.length}. Your score is ${resultPercentage.toFixed(2)}%.`;
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
      { top: "170px", left: "110px"  },
      {top: "150px", left: "140px"  },
      { top: "139px", left: "185px" },
      { top: "140px", left: "207px" },
      { top: "120px", left: "240px" },
      { top: "110px", left: "298px" },
      { top: "80px", left: "350px"  },
      {top: "90px", left: "380px"  },
      { top: "120px", left: "328px" },
      { top: "149px", left: "320px" },
      { top: "170px", left: "280px" },
      { top: "170px", left: "250px" },
      { top: "180px", left: "230px" },
    ];

    const buttons = document.querySelectorAll(".map-button");
    buttons.forEach((button, index) => {
      button.style.top = buttonCoordinatesMobile[index].top;
      button.style.left = buttonCoordinatesMobile[index].left;
    });
  } else {
    const buttonCoordinates = [
      { top: "240px", left: "160px" },
      { top: "230px", left: "205px" },
      { top: "200px", left: "265px" },
      { top: "210px", left: "300px" },
      { top: "180px", left: "350px" },
      { top: "155px", left: "430px" },
      { top: "110px", left: "510px" },
      { top: "133px", left: "540px" },
      { top: "170px", left: "470px" },
      { top: "220px", left: "460px" },
      { top: "230px", left: "405px" },
      { top: "260px", left: "360px" },
      { top: "240px", left: "330px" },
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
