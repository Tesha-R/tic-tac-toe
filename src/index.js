const app = document.getElementById("app");

let gameData = {
    gameBoard: ["", "", "", "", "", "", "", "", ""],
    player1: {
        name: "Player 1",
        gamePiece: "X",
        score: 0
    },
    computer: {
        name: "Player 2",
        gamePiece: "O",
        score: 0
    },
    winningCombos: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ],
    messages: {
        player1wins: "Player 1 wins!",
        computerwins: "Computer wins!",
        gameIsATie: "Game is a tie!"
    },
    gameOver: false
};
// 0 1 2
// 3 4 5
// 6 7 8

// event listeners
app.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.matches(".new-game-btn")) {
        console.log("new game button clicked");
        startGame();
    }
});

app.addEventListener("click", (e) => {
    let currentPlayer = true;
    // get the current square clicked
    let currSquare = e.target.dataset.id
    if (e.target.matches(".game-square") && currentPlayer && !gameData.gameBoard[currSquare]) {
        console.log(currSquare + " clicked")
        gameData.gameBoard.splice(currSquare, 1, gameData.player1.gamePiece);
        console.log("gameData.gameBoard[currSquare]", gameData.gameBoard[currSquare])
        renderGame(gameData.gameBoard);
        checkForWinner();
        currentPlayer = false
    }
    //  Stop playing if game is over
    if (!currentPlayer && !gameData.gameOver) {
        setTimeout(() => {
            computerPlay()
        }, 1000)
        currentPlayer = true
    }
})


// Functions

// Render game messages
function gameMessage(message) {
    let html = `
  <div class="game-message">
  <h1 class="game-message-title">${message}</h1>
    <button class="new-game-btn">New game</button>
  </div>
  `;
    app.innerHTML += html;
}

// Check if players won the game
function checkForWinner() {
    const {
        winningCombos,
        gameBoard
    } = gameData
    // iterate through array 7 indexes
    for (let i = 0; i < winningCombos.length; i++) {
        //console.log(winningCombos[i]);
        const winningCombo = winningCombos[i];
        // save each column of numbers to a variable, indexes 0,1,2
        let a = gameBoard[winningCombo[0]]
        let b = gameBoard[winningCombo[1]]
        let c = gameBoard[winningCombo[2]]
        // If the board is full of X and O and no winner, game is a tie
        if (emptyBoardSpaces()) {
            return gameMessage(gameData.messages.gameIsATie)
        }
        if (a === 'X' && b === 'X' && c === 'X') {
            gameData.gameOver = true
            return gameMessage(gameData.messages.player1wins)
        }
        if (a === 'O' && b === 'O' && c === 'O') {
            gameData.gameOver = true
            return gameMessage(gameData.messages.computerwins)
        }
    }
}
// Is every space filled with 'X' and 'O' / true
function emptyBoardSpaces() {
    return gameData.gameBoard.every((space) => {
        return space === 'X' || space === 'O';
    })
}

// Start a new game
function startGame() {
    gameData.gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameData.player1.player1Game = "";
    gameData.computer.computerGame = "";
    gameData.player1.score = 0;
    gameData.computer.score = 0;
    renderGame(gameData.gameBoard);
    gameData.gameOver = false
}

// Render gameboard
function renderGame(dataArr) {
    let html = "";
    dataArr.forEach((item, index) => {
        html += `<div class="game-square" data-id="${index}">${item}</div>`;
        return (app.innerHTML = `<div class="game-board"><h1 class="game-title">Tic Tac Toe</h1>${html} </div>`);
    });
}

function computerPlay() {
    let random = Math.floor(Math.random() * gameData.gameBoard.length);
    //console.log(random);
    // replaces 1 element at current index
    //  if (!gameData.gameBoard[random]) {
    // replaces 1 element at current index
    gameData.gameBoard.splice(random, 1, gameData.computer.gamePiece);
    console.log("gameData.gameBoard[random]", gameData.gameBoard[random])
    console.log("Computer", gameData.gameBoard);
    renderGame(gameData.gameBoard);
    checkForWinner()
    //   }
}

function render() {
    renderGame(gameData.gameBoard);
}

render();


// Computer AI
// function gameScore(score){
//     gameData.player1.score = 10;
//     gameData.computer.score = -10;
// }