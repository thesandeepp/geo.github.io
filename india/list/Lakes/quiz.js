const tigerReserves = [
  "pangong Tso",
  "Vembanad Lake",
  "Sambhar Lake",
  "Cholamu lake",
  "Lonar Lake",
  "Chilka Lake",
  "Bhojtal Lake",
  "bhimtal Lake",
  "pullicat Lake",
  "kanwar Lake",
  "nal Sarovar Lake",
  "wular Lake",
  "Sukhna Lake",
  "Hussain sagar",
  "Deepor Beel Lake",
  "Loktak Lake",
  

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
      "pangong Tso (laddakh)",
      "Vembanad (Kerala)",
      "Sambhar (Rajasthan)",
      "Cholamu (Sikkim)",
      "Lonar (Maharashtra)",
      "Chilka (Odisha)",
      "Bhojtal (Madhya Pradesh)",
      "bhimtal (Uttrakhand)",
      "pullicat (Andhra pradesh)",
      "Kanwar (Bihar)",
      "nal Sarovar (Gujrat)",
      "wular (J&K)",
      "Sukhna Lake(Punjab)",
      "Hussain sagar(Telangana)",
      "Deepor Beel(Assam)",
      "Loktak Lake(Manipur)",
      
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
      { top: "40px", left: "130px" },
      { top: "410px", left: "118px" },
      { top: "170px", left: "80px" },
      { top: "150px", left: "285px" },
      { top: "280px", left: "100px" },
      { top: "260px", left: "230px" },
      { top: "220px", left: "150px" },
      { top: "107px", left: "155px" },
      { top: "340px", left: "150px" },
      { top: "180px", left: "250px" },
      { top: "210px", left: "50px" },
      { top: "50px", left: "90px" },
      { top: "95px", left: "100px" },
      { top: "300px", left: "149px" },
      { top: "170px", left: "350px" },
      { top: "193px", left: "363px" },
    
      
    ];

    const buttons = document.querySelectorAll(".map-button");
    buttons.forEach((button, index) => {
      button.style.top = buttonCoordinatesMobile[index].top;
      button.style.left = buttonCoordinatesMobile[index].left;
    });
  } else {
    const buttonCoordinates = [
      { top: "50px", left: "200px" },
      { top: "600px", left: "170px" },
      { top: "220px", left: "140px" },
      { top: "220px", left: "412px" },
      { top: "390px", left: "150px" },
      { top: "370px", left: "340px" },
      { top: "320px", left: "200px" },
      { top: "160px", left: "225px" },
      { top: "500px", left: "220px" },
      { top: "260px", left: "360px" },
      { top: "310px", left: "80px" },
      { top: "80px", left: "140px" },
      { top: "150px", left: "150px" },
      { top: "430px", left: "230px" },
      { top: "245px", left: "500px" },
      { top: "283px", left: "520px" },

      
      
    
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
