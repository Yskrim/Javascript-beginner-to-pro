let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};
  
  updateScoreElement();
  
  /*
  if (!score) {
    score = {
      wins: 0,
      losses: 0,
      ties: 0
    };
  }
  */
  
  function playGame(playerMove) {
    const computerMove = pickComputerMove();
  
    let result = '';
  
    if (playerMove === 'scissors') {
      if (computerMove === 'rock') {
        result = 'You lose.';
      } else if (computerMove === 'paper') {
        result = 'You win.';
      } else if (computerMove === 'scissors') {
        result = 'Tie.';
      }
  
    } else if (playerMove === 'paper') {
      if (computerMove === 'rock') {
        result = 'You win.';
      } else if (computerMove === 'paper') {
        result = 'Tie.';
      } else if (computerMove === 'scissors') {
        result = 'You lose.';
      }
      
    } else if (playerMove === 'rock') {
      if (computerMove === 'rock') {
        result = 'Tie.';
      } else if (computerMove === 'paper') {
        result = 'You lose.';
      } else if (computerMove === 'scissors') {
        result = 'You win.';
      }
    }
  
    if (result === 'You win.') {
      score.wins += 1;
    } else if (result === 'You lose.') {
      score.losses += 1;
    } else if (result === 'Tie.') {
      score.ties += 1;
    }
  
    localStorage.setItem('score', JSON.stringify(score));
  
    updateScoreElement();
  
    document.querySelector('.js-result').innerHTML = result;
  
    document.querySelector('.js-moves').innerHTML = `You
  <img src="/Lessons/l12/images/${playerMove}.png" class="move-icon">
  <img src="/Lessons/l12/images/${computerMove}.png" class="move-icon">
  Computer`;
  }
  
  function updateScoreElement() {
    document.querySelector('.js-score')
      .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  }
  
  function pickComputerMove() {
    const randomNumber = Math.random();
  
    let computerMove = '';
  
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
      computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
      computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
      computerMove = 'scissors';
    }
  
    return computerMove;
  }


  let isAutoPlaying = false;
  let intervalId;

  function autoPlay(button){
    if(!isAutoPlaying){
        intervalId = setInterval(() => {
            playGame(pickComputerMove());
        }, 1000)
        isAutoPlaying = true
        button.innerHTML= 'Stop playing'
      } else {
        clearInterval(intervalId)
        isAutoPlaying = false
        button.innerHTML= 'Autoplay'
    }

    // const AutoPlay= ()=>{}
  }

  const playButtons= document.querySelectorAll(".move-button");
  playButtons.forEach(button =>{
    button.addEventListener("click", ()=>{
        playGame(button.id)
    });
  });


    
  function resetScore(){
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
  }

  
  const confirm = document.querySelector('.js-confirm');
  function showConfirmation(){
    confirm.innerHTML = `
        <div class="confirmation">
          <p>Are you sure you want to reset the score?</p>
          <button class='confirm-btn' id='yes'>Yes</button>
          <button class='confirm-btn' id='no'>No</button>
        </div>`
  }
    

  document.body.addEventListener('keydown', (event)=>{
    if(event.key === 'r') playGame('rock');
    else if(event.key === 'p') playGame('paper');
    else if(event.key === 's')playGame('scissors');
    else if(event.key === 'a')autoPlay(autobtn);
    else if(event.key === 'Backspace'){
      showConfirmation()

      document.getElementById('yes')
        .addEventListener('click', ()=>{
        resetScore()
        confirm.innerHTML = ''
      });
      document.getElementById('no')
        .addEventListener('click', ()=>{
        confirm.innerHTML = ''
      });
        
    }
  });

  document.getElementById('reset')
    .addEventListener('click', ()=>{
      resetScore()
  });

  const autobtn = document.getElementById('autoplay')
  autobtn.addEventListener('click', ()=>{
    autoPlay(autobtn);
  });