const app = document.getElementById("app");

let gameData = {
    gameBoard: ["", "", "", "", "", "", "", "", ""],
    player1: {
        name: "Player 1",
        gamePiece: "X",
        turn: true,
        score: 0
    },
    computer: {
        name: "Player 2",
        gamePiece: "O",
        turn: false,
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
        computerwins: "Player 2 wins!",
        gameIsATie: "Game is a tie!"
    }
};
// 0 1 2
// 3 4 5
// 6 7 8

// Select opponent player or computer 
// Start game
// Show message for which opponent wins or a tie
// Can't select game square thats been played
// Evaluate a tie

function gameMessage(message) {
    let html = `
  <div class="game-message">
  <h1 class="game-message-title">${message}</h1>
    <button class="new-game-btn">New game</button>
  </div>
  `;
    app.innerHTML += html;
}

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
        if (a === '' || b === '' || c === '') {
            continue
        }
        if (a === b && b === c) {
            console.log("winner", "abc", a, b, c, )
            if (a === 'X' && b === 'X' && c === 'X') {
                return gameMessage(gameData.messages.player1wins)
            } else if (a === 'O' && b === 'O' && c === 'O') {
                return gameMessage(gameData.messages.computerwins)
            }
            // determine a tie

        } else {
            console.log("not winner", a, b, c)
        }
    }
}

// new game
function startGame() {
    gameData.gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameData.player1.player1Game = "";
    gameData.computer.computerGame = "";
    gameData.player1.score = 0;
    gameData.computer.score = 0;
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




// function gamePlay(currSquare) {
//     let currentPlayer;
//     let player1;
//     if (currentPlayer === player1) {
//         gameData.gameBoard.splice(currSquare, 1, gameData.player1.gamePiece);
//         currentPlayer = false
//     } else {
//         currentPlayer = player1
//     }
// }
app.addEventListener("click", (e) => {
    let currentPlayer;
    let player1;
    // get the current square clicked
    let currSquare = e.target.dataset.id;
    if (e.target.matches(".game-square") && currentPlayer === player1) {
        gameData.gameBoard.splice(currSquare, 1, gameData.player1.gamePiece);
        renderGame(gameData.gameBoard);
        checkForWinner();
        currentPlayer = false
    }
    if (!currentPlayer) {
        setTimeout(() => {
            computerPlay()
        }, 1000)
        currentPlayer = player1
    }
})


function computerPlay() {
    let random = Math.floor(Math.random() * gameData.gameBoard.length);
    //console.log(random);
    // replaces 1 element at current index
    gameData.gameBoard.splice(random, 1, gameData.computer.gamePiece);
    console.log("Computer", gameData.gameBoard);
    renderGame(gameData.gameBoard);
    checkForWinner()
}

function render() {
    renderGame(gameData.gameBoard);
}

render();



// function gameScore(score){
//     gameData.player1.score = 10;
//     gameData.computer.score = -10;
// }