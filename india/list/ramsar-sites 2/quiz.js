const tigerReserves = [
  "Nalsarovar BS",
  "Sultanpur NP",
  "Pong Dam Lake",
  "Vembanad-Kol Wetland (Longest Lake in India)",
  "Sakhya Sagar",
  "Nandur Madhameshwar",
  "Chilika Lake (Oldest Ramsar Site in India)",
  "Harike Wetland",
  "Kanjirankulam BS",
  "Hygam Wetland CnR",
  "Tso Kar",
  "Haiderpur Wetland",
  "Thane Creek",
  "Gulf of mannar",
  "Sasthamkotta Lake", 
  "Renuka lake",
  

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
      "Nalsarovar BS, GJ",
      "Sultanpur NP, HR",
      "Pong Dam Lake, HP",
      "Vembanad-Kol , KL",
      "Sakhya Sagar, MP",
      "Nandur Madhameshwar, MH",
      "Chilika Lake , OD",
      "Harike Wetland, PB",
      "Kanjirankulam BS, TN",
      "Hygam Wetland CnR, JK",
      "Tso Kar, LD",
      "Haiderpur Wetland, UP",
      "Thane Creek, MH",
      "Gulf of mannar,TN",
      "Sasthamkotta Lake,KL", 
      "Renuka lake,HP",
      
      
      
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
      if (consecutiveWrongAttempts === 2) {
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
      { top: "210px", left: "50px" },
      { top: "125px", left: "115px" },
      { top: "85px", left: "125px" },
      { top: "405px", left: "115px" },
      { top: "220px", left: "150px" },
      { top: "270px", left: "100px" },
      { top: "270px", left: "243px" },
      { top: "95px", left: "100px" },
      { top: "399px", left: "145px" },
      { top: "50px", left: "90px" },
      { top: "40px", left: "130px" },
      { top: "159px", left: "179px" },
      { top: "290px", left: "70px" },
      { top: "429px", left: "160px" },
      { top: "425px", left: "118px" },
      { top: "75px", left: "139px" },

    ];

    const buttons = document.querySelectorAll(".map-button");
    buttons.forEach((button, index) => {
      button.style.top = buttonCoordinatesMobile[index].top;
      button.style.left = buttonCoordinatesMobile[index].left;
    });
  } else {
    const buttonCoordinates = [
      { top: "310px", left: "80px" },
      { top: "180px", left: "170px" },
      { top: "129px", left: "180px" },
      { top: "595px", left: "170px" },
      { top: "320px", left: "200px" },
      { top: "390px", left: "150px" },
      { top: "390px", left: "350px" },
      { top: "150px", left: "150px" },
      { top: "580px", left: "205px" },
      { top: "80px", left: "140px" },
      { top: "50px", left: "200px" },
      { top: "230px", left: "250px" },
      { top: "420px", left: "106px" },
      { top: "610px", left: "230px" },
      { top: "620px", left: "170px" },
      { top: "110px", left: "190px" },
 

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
