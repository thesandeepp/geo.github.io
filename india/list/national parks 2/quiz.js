const tigerReserves = [
"Galathea Bay National Park",
"Rajiv Gandhi (Rameswaram) National Park",
"Namdapha National Park",
"Kaziranga National Park",
"Indravati (Kutru) National Park",
"Blackbuck (Velavadar) National Park",
"Sultanpur National Park",
"Inderkilla National Park",
"Dachigam National Park",
"Bandipur National Park",
"Eravikulam National Park",
"Dinosaur Fossils National Park",
"Gugamal National Park",
"Nokrek Ridge National Park",
"Phawngpui Blue Mountain National Park",
"Simlipal National Park",
"Keoladeo Ghana National Park",
"Gulf of Mannar Marine National Park",
"Mahaveer Harina Vanasthali National Park",
"Bison (Rajbari) National Park",
"Gangotri National Park",
"Gorumara National Park",

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
      "Galathea Bay, A&N Islands",
      "Rajiv Gandhi (Rameswaram), Andhra Pradesh",
      "Namdapha, Arunachal Pradesh",
      "Kaziranga, Assam",
      "Indravati (Kutru), Chhattisgarh",
      "Blackbuck (Velavadar), Gujarat",
      "Sultanpur, Haryana",
      "Inderkilla, Himachal Pradesh",
      "Dachigam, Jammu & Kashmir",
      "Bandipur, Karnataka",
      "Eravikulam, Kerala",
      "Dinosaur Fossils, Madhya Pradesh",
      "Gugamal, Maharashtra",
      "Nokrek Ridge, Meghalaya",
      "Phawngpui Blue Mountain, Mizoram",
      "Simlipal, Odisha",
      "Keoladeo Ghana, Rajasthan",
      "Gulf of Mannar Marine, Tamil Nadu",
      "Mahaveer Harina Vanasthali, Telangana",
      "Bison (Rajbari), Tripura",
      "Gangotri, Uttarakhand",
      "Gorumara, West Bengal",
      
      
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
      { top: "370px", left: "350px" },
      { top: "340px", left: "150px" },
      { top: "135px", left: "370px" },
      { top: "170px", left: "350px" },
      { top: "240px", left: "200px" },
      { top: "210px", left: "50px" },
      { top: "125px", left: "115px" },
      { top: "80px", left: "129px" },
      { top: "50px", left: "90px" },
      { top: "360px", left: "110px" },
      { top: "410px", left: "118px" },
      { top: "220px", left: "150px" },
      { top: "280px", left: "100px" },
      { top: "185px", left: "320px" },
      { top: "220px", left: "348px" },
      { top: "260px", left: "230px" },
      { top: "170px", left: "80px" },
      { top: "399px", left: "145px" },
      { top: "300px", left: "149px" },
      { top: "210px", left: "330px" },
      { top: "107px", left: "155px" },
      { top: "220px", left: "280px" }
      
      
      

      
    ];

    const buttons = document.querySelectorAll(".map-button");
    buttons.forEach((button, index) => {
      button.style.top = buttonCoordinatesMobile[index].top;
      button.style.left = buttonCoordinatesMobile[index].left;
    });
  } else {
    const buttonCoordinates = [
      { top: "540px", left: "507px" },
{ top: "500px", left: "220px" },
{ top: "205px", left: "525px" },
{ top: "245px", left: "500px" },
{ top: "340px", left: "290px" },
{ top: "310px", left: "80px" },
{ top: "190px", left: "170px" },
{ top: "120px", left: "185px" },
{ top: "90px", left: "140px" },
{ top: "525px", left: "160px" },
{ top: "600px", left: "170px" },
{ top: "320px", left: "200px" },
{ top: "390px", left: "150px" },
{ top: "265px", left: "470px" },
{ top: "310px", left: "500px" },
{ top: "370px", left: "340px" },
{ top: "220px", left: "140px" },
{ top: "580px", left: "205px" },
{ top: "430px", left: "230px" },
{ top: "300px", left: "475px" },
{ top: "160px", left: "225px" },
{ top: "320px", left: "400px" },

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
