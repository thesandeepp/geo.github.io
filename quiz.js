const tigerReserves = [
  "Bandipur Tiger Reserve",
  "Jim Corbett Tiger Reserve",
  "Nagarjunsagar-Srisailam Tiger Reserve",
  "Bandhavgarh Tiger Reserve",
  "Ranthambore Tiger Reserve",
  "Sunderban Tiger Reserve",
  "Periyar Tiger Reserve",
];

let currentQuestionIndex = 0;
let correctAttemptsFirstTry = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  correctAttemptsFirstTry = 0;
  showQuestion();
  document.getElementById("result-message").innerText = "";
  document.querySelector(".result-section").classList.add("hidden");
}

function showQuestion() {
  document.getElementById("question").innerText = "Select on map:";
  document.getElementById("reserve-name").innerText = tigerReserves[currentQuestionIndex];
}

function checkAnswer(selectedButtonIndex) {
  const correctButtonIndex = currentQuestionIndex + 1;

  if (selectedButtonIndex === correctButtonIndex && correctAttemptsFirstTry === currentQuestionIndex) {
    correctAttemptsFirstTry++;
    const buttons = document.querySelectorAll(".map-button");
    buttons[currentQuestionIndex].classList.add("correct");
    buttons[currentQuestionIndex].innerText = tigerReserves[currentQuestionIndex];
    setTimeout(() => {
      buttons[currentQuestionIndex].classList.remove("correct");
      nextQuestion();
    }, 1000);
  } else {
    const button = document.querySelector(`.map-button.button${selectedButtonIndex}`);
    button.classList.add("wrong");
  }
}

function nextQuestion() {
  const buttons = document.querySelectorAll(".map-button");
  buttons.forEach((button) => {
    button.classList.remove("wrong");
    button.innerText = "";
  });

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
  document.querySelector(".result-section").classList.remove("hidden");
}


// Rest of the code remains unchanged

// Reset the quiz when the page is loaded or reloaded
window.onload = () => {
  startQuiz();
  createButtons();
  setButtonCoordinates();

  window.addEventListener("resize", setButtonCoordinates);
};

// Function to create buttons for the quiz
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

// Function to set new coordinates for the buttons
function setButtonCoordinates() {
  if (window.innerWidth <= 1000) {
    const buttonCoordinatesMobile = [
      { top: "350px", left: "100px" }, // Button 1
      { top: "105px", left: "155px" }, // Button 2
      { top: "330px", left: "150px" }, // Button 3
      { top: "210px", left: "130px" }, // Button 4
      { top: "190px", left: "80px" }, // Button 5
      { top: "210px", left: "270px" }, // Button 6
      { top: "400px", left: "110px" }, // Button 7
    ];

    const buttons = document.querySelectorAll(".map-button");
    buttons.forEach((button, index) => {
      button.style.top = buttonCoordinatesMobile[index].top;
      button.style.left = buttonCoordinatesMobile[index].left;
    });
    } else {
      const buttonCoordinates = [
        { top: "620px", left: "191px" }, // Button 1
        { top: "189px", left: "270px" }, // Button 2
        { top: "590px", left: "250px" }, // Button 3
        { top: "370px", left: "200px" }, // Button 4
        { top: "330px", left: "129px" }, // Button 5
        { top: "390px", left: "460px" }, // Button 6
        { top: "700px", left: "204px" }, // Button 7
      ];
  
      const buttons = document.querySelectorAll(".map-button");
      buttons.forEach((button, index) => {
        button.style.top = buttonCoordinates[index].top;
        button.style.left = buttonCoordinates[index].left;
      });
    }
  }
  
  // Function to play the click sound whenever a button is clicked
  function playClickSound() {
    const clickSound = new Audio('click.mp3');
    clickSound.play();
  }
  