const tigerReserves = [
  "Malwa plateau",
  "Shillong plateau",
  "Bundelkhand Plateau",
  "Maharashtra Plateau",
  "Baghelkhand",
  "Karnataka Plateau",
  "Dandakaranya Plateau",
  "Chotta nagpur Plateau",
  "Telangana plateau",

  

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

let consecutiveWrongAttempts = 0;

function checkAnswer(selectedButtonIndex) {
  const correctButtonIndex = currentQuestionIndex + 1;

  if (selectedButtonIndex === correctButtonIndex && correctAttemptsFirstTry === currentQuestionIndex) {
    correctAttemptsFirstTry++;

    // Provide custom messages for each correct button
    const customMessages = [
      "Malwa plateau",
      "Shillong plateau",
      "Bundelkhand Plateau",
      "Maharashtra Plateau",
      "Baghelkhand",
      "Karnataka Plateau",
      "Dandakaranya Plateau",
      "Chotta nagpur Plateau",
      "Telangana plateau",
      
      // Add more custom messages for each button
    ];

    correctAnswers[currentQuestionIndex] = true; 
    const buttons = document.querySelectorAll(".map-button");
    buttons[currentQuestionIndex].classList.add("correct");
    buttons[currentQuestionIndex].innerText = customMessages[currentQuestionIndex];
     setTimeout(() => {
      buttons[currentQuestionIndex].classList.remove("correct");
      nextQuestion();
    }, 100);

    totalCorrectFirstTry++; 
  } else {
    const button = document.querySelector(`.map-button.button${selectedButtonIndex}`);
    button.classList.add("wrong"); 

    if (selectedButtonIndex !== correctButtonIndex) {
      // Increment the consecutive wrong attempts for the current question
      consecutiveWrongAttempts++;

      // Check if consecutive wrong attempts reach 3
      if (consecutiveWrongAttempts === 3) {
        const correctButton = document.querySelector(`.map-button.button${correctButtonIndex}`);
        correctButton.classList.add("flicker-glow-correct");
      }
    }
  }

  totalQuestionsAnswered++; 

  const accuracyPercentage = ((totalCorrectFirstTry / totalQuestionsAnswered) * 100).toFixed(2);
  document.getElementById("accuracy-percent").innerText = `${accuracyPercentage}%`;
}

// Add a function to reset consecutive wrong attempts and remove highlighting
function resetConsecutiveWrongAttempts() {
  consecutiveWrongAttempts = 0;
  const correctButtons = document.querySelectorAll('.map-button');
  correctButtons.forEach((button) => {
    button.classList.remove("flicker-glow-correct");
    button.classList.remove("wrong");
  });
}

function nextQuestion() {
  resetConsecutiveWrongAttempts();

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
      { top: "210px", left: "130px" },
      { top: "185px", left: "320px" },
      { top: "190px", left: "150px" },
      { top: "280px", left: "100px" },
      { top: "205px", left: "190px" },
      { top: "340px", left: "110px" },
      { top: "280px", left: "205px" },
      { top: "210px", left: "237px" },
      { top: "300px", left: "149px" },
 
    ];

    const buttons = document.querySelectorAll(".map-button");
    buttons.forEach((button, index) => {
      button.style.top = buttonCoordinatesMobile[index].top;
      button.style.left = buttonCoordinatesMobile[index].left;
    });
  } else {
    const buttonCoordinates = [
   
      { top: "300px", left: "180px" },   
      { top: "265px", left: "470px" },
      { top: "280px", left: "220px" },
      { top: "390px", left: "150px" },
      { top: "290px", left: "270px" },
      { top: "525px", left: "160px" },
      { top: "390px", left: "300px" },
      { top: "310px", left: "345px" },
      { top: "430px", left: "230px" },

 

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
