const tigerReserves = [
    "Bandipur Tiger Reserve",
    "Jim Corbett Tiger Reserve",
    "Nagarjunsagar-Srisailam Tiger Reserve",
    "Bandhavgarh Tiger Reserve",
    "Ranthambore Tiger Reserve",
    "Sunderban Tiger Reserve",
    "Periyar Tiger Reserve",
  ];
  
  const buttonCoordinates = [
    { top: '620px', left: '171px' },
    { top: '193px', left: '250px' },
    { top: '570px', left: '250px' },
    { top: '370px', left: '200px' },
    { top: '330px', left: '129px' },
    { top: '390px', left: '460px' },
    { top: '700px', left: '190px' },
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
    }
  }
  
  // Reset the quiz when the page is loaded or reloaded
  window.onload = () => {
    startQuiz();
    const buttonsOverlay = document.querySelector(".buttons-overlay");
    for (let i = 0; i < tigerReserves.length; i++) {
      const button = document.createElement("button");
      button.classList.add("map-button", `button${i + 1}`);
      button.onclick = () => checkAnswer(i + 1);
      button.style.top = buttonCoordinates[i].top;
      button.style.left = buttonCoordinates[i].left;
      buttonsOverlay.appendChild(button);
    }
  };
 // Function to play the click sound
function playClickSound() {
    const clickSound = document.getElementById('clickSound');
    clickSound.currentTime = 0; // Reset the audio to the beginning
    clickSound.play();
  }
  
  // Add event listeners to all buttons to play the click sound on click
  const buttons = document.querySelectorAll('.map-button');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      playClickSound();
      // Add your logic to handle correct/wrong answers and continue the quiz here
    });
  });
   