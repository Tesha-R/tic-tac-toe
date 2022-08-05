const app = document.getElementById("app");

let gameData = {
  gameBoard: ["", "", "", "", "", "", "", "", ""],
  player1: {
    name: "Player 1",
    gamePiece: "X",
    turn: true,
    player1Game: "",
    score: 0
  },
  player2: {
    name: "Player 2",
    gamePiece: "O",
    turn: false,
    player2Game: "",
    score: 0
  },
  winning: ["012", "345", "678", "036", "147", "258", "048", "246"],
  messages: {
    player1wins: "Player 1 wins!",
    player2wins: "Player 2 wins!",
    gameIsATie: "Game is a tie!"
  }
};
// X X X  > 012
// X X X  > 345
// X X X  > 678

// Select opponent player or computer 
// Start game
// Show message for which opponent wins or a tie

function gameMessage(message) {
    let html = `
  <div class="game-message">
  <h1 class="game-message-title">${message}</h1>
    <button class="new-game-btn">New game</button>
  </div>
  `;
  app.innerHTML += html;
}

// Check for winners
function checkForWinner() {
    const player1Winner = gameData.player1.player1Game.split("").sort().join("");
    const player2Winner = gameData.player2.player2Game.split("").sort().join("");
  if (gameData.winning.includes(player1Winner)) {
    gameMessage(gameData.messages.player1wins)
    console.log("Player 1 wins");
  } else if (gameData.winning.includes(player2Winner)) {
    console.log("Player 2 wins");
    gameMessage(gameData.messages.player2wins)
   }
//    else {
//     gameMessage(gameData.messages.gameIsATie)
//   }
}

// new game
function startGame() {
  gameData.gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameData.player1.player1Game = "";
  gameData.player2.player2Game = "";
  gameData.player1.score = 0;
  gameData.player2.score = 0;
  renderGame(gameData.gameBoard);
}

// render the contents of the gameboard array
function renderGame(dataArr) {
  let html = "";
  dataArr.forEach((item, index) => {
    html += `<div class="game-square" data-id="${index}">${item}</div>`;
    return (app.innerHTML = `<div class="game-board"><h1 class="game-title">Tic Tac Toe</h1>${html} </div>`);
  });
}

// event listeners

app.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.matches(".new-game-btn")) {
    console.log("new game button clicked");
    startGame();
  }
});

app.addEventListener("click", (e) => {
  // get the current square clicked
  let currSquare = e.target.dataset.id;
  if (e.target.matches(".game-square") && gameData.player1.turn === true) {
    // add game piece to corresponding array index
    gameData.gameBoard.splice(currSquare, 1, gameData.player1.gamePiece);
    gameData.player1.player1Game += currSquare;
    //console.log("player1Game", gameData.player1.player1Game);
    renderGame(gameData.gameBoard);
    gameData.player1.turn = false;
    gameData.player2.turn = true;
    checkForWinner();
  } else if (
    e.target.matches(".game-square") &&
    gameData.player2.turn === true
  ) {
    gameData.gameBoard.splice(currSquare, 1, gameData.player2.gamePiece);
    renderGame(gameData.gameBoard);
    gameData.player2.player2Game += currSquare;
    //console.log("playerGame2", gameData.player2.player2Game);
    gameData.player2.turn = false;
    gameData.player1.turn = true;
    checkForWinner();
  }
});
function render() {
  renderGame(gameData.gameBoard);
}

render();

// function computerPlay() {
//   let random = Math.floor(Math.random() * gameData.gameBoard.length);
//   console.log(random);
//   gameData.gameBoard.splice(random, 1, gameData.player2.gamePiece);
//   gameData.player2.player1Game += random;
//   console.log("Computer", gameData.player2.player2Game);
//   renderGame(gameData.gameBoard);
// }

// function gameScore(score){
//     gameData.player1.score = 10;
//     gameData.player2.score = -10;
// }
