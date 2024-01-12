const tigerReserves = [
  "Keoladeo/Bharatpur Bird Sanctuary",
  "Pulicat Lake Bird Sanctuary",
  "Vedanthangal Bird Sanctuary",
  "Nal Sarovar Bird Sanctuary",
  "Kaundinya Bird Sanctuary",
  "Ranganathittu Bird Sanctuary",
  "Harike Lake Bird Sanctuary",
  "Salim Ali Bird Sanctuary",
  "Thattekad Bird Sanctuary",
  "Soor Sarovar Bird Sanctuary",
  "Chilka Lake Bird Sanctuary",
  "Mayani Bird Sanctuary",
  "Kanwar Lake Bird Sanctuary",
  

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
      "Keoladeo/Bharatpur, Rajasthan ",
      "Pulicat Lake B.S, Andhra Pradesh ",
      "Vedanthangal B.S, Tamilnadu",
      "Nal Sarovar B.S Gujrat, ",
      "Kaundinya B.S, Andhra Pradesh",
      "Ranganathittu B.S, Karnataka",
      "Harike Lake B.S, Punjab",
      "Salim Ali B.S, Goa",
      "Thattekad B.S, Kerala ",
      "Soor Sarovar B.S, Uttar Pradesh",
      "Chilka Lake B.S, Odisha",
      "Mayani B.S, Maharashtra",
      "Kanwar Lake B.S, Bihar"
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
      {top: "365px", left: "168px"  },
      { top: "399px", left: "145px" },
      { top: "210px", left: "50px" },
      { top: "340px", left: "150px" },
      { top: "370px", left: "110px" },
      { top: "95px", left: "100px"  },
      {top: "338px", left: "80px"  },
      { top: "410px", left: "118px" },
      { top: "159px", left: "179px" },
      { top: "270px", left: "240px" },
      { top: "280px", left: "100px" },
      { top: "180px", left: "250px" },
    ];

    const buttons = document.querySelectorAll(".map-button");
    buttons.forEach((button, index) => {
      button.style.top = buttonCoordinatesMobile[index].top;
      button.style.left = buttonCoordinatesMobile[index].left;
    });
  } else {
    const buttonCoordinates = [
      { top: "240px", left: "150px" },
      { top: "520px", left: "240px" },
      { top: "580px", left: "205px" },
      { top: "310px", left: "80px" },
      { top: "500px", left: "220px" },
      { top: "535px", left: "160px" },
      { top: "150px", left: "150px" },
      { top: "484px", left: "120px" },
      { top: "600px", left: "170px" },
      { top: "230px", left: "250px" },
      { top: "390px", left: "340px" },
      { top: "390px", left: "150px" },
      { top: "260px", left: "360px" },
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
