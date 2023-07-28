// quiz.js
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

function startQuiz() {
  currentQuestionIndex = 0;
  showQuestion();
  document.getElementById("result").innerText = "";
}

function showQuestion() {
  document.getElementById("question").innerText = "Guess the Tiger Reserve:";
  document.getElementById("reserve-name").innerText = tigerReserves[currentQuestionIndex];
}

function checkAnswer(selectedButtonIndex) {
  const correctButtonIndex = currentQuestionIndex + 1;

  if (selectedButtonIndex === correctButtonIndex) {
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
    const resultPercentage = (correctAttempts / totalAttempts) * 100;
    const resultMessage = `You guessed the right button ${correctAttempts} times out of ${totalAttempts}. Your success rate is ${resultPercentage.toFixed(2)}%.`;
    document.getElementById("result").innerText = resultMessage;
}
// Reset the quiz when the page is loaded or reloaded
window.onload = () => {
  startQuiz();
  createButtons();
  setButtonCoordinates(); // Set initial button coordinates

  // Add a window resize event listener to update button coordinates on window resize
  window.addEventListener('resize', setButtonCoordinates);
};

// Function to create buttons for the quiz
function createButtons() {
  const buttonsOverlay = document.querySelector(".buttons-overlay");
  for (let i = 0; i < tigerReserves.length; i++) {
    const button = document.createElement("button");
    button.classList.add("map-button", `button${i + 1}`);
    button.onclick = () => checkAnswer(i + 1);
    buttonsOverlay.appendChild(button);

    // Add event listener to play click sound on click
    button.addEventListener('click', playClickSound);
  }
}

// Function to set new coordinates for the buttons
function setButtonCoordinates() {
  // Adjust the button coordinates in pixels here as needed for different screen sizes
  if (window.innerWidth <= 1000) {
    // Coordinates for mobile devices
    const buttonCoordinatesMobile = [
      { top: '300px', left: '90px' }, // Button 1
      { top: '85px', left: '135px' }, // Button 2
      { top: '300px', left: '130px' }, // Button 3
      { top: '180px', left: '120px' }, // Button 4
      { top: '150px', left: '70px' }, // Button 5
      { top: '190px', left: '220px' }, // Button 6
      { top: '340px', left: '95px' }, // Button 7
    ];

    const buttons = document.querySelectorAll('.map-button');
    buttons.forEach((button, index) => {
      button.style.top = buttonCoordinatesMobile[index].top;
      button.style.left = buttonCoordinatesMobile[index].left;
    });
  } else {
    // Coordinates for larger screens
    const buttonCoordinates = [
      { top: '620px', left: '171px' }, // Button 1
      { top: '193px', left: '250px' }, // Button 2
      { top: '570px', left: '250px' }, // Button 3
      { top: '370px', left: '200px' }, // Button 4
      { top: '330px', left: '129px' }, // Button 5
      { top: '390px', left: '460px' }, // Button 6
      { top: '700px', left: '190px' }, // Button 7
    ];

    const buttons = document.querySelectorAll('.map-button');
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
