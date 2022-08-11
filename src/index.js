const app = document.getElementById("app");

let gameData = {
    gameBoard: ["", "", "", "", "", "", "", "", ""],
    player1: {
        name: "Player 1",
        gamePiece: "X",
        turn: true,
        score: 0
    },
    player2: {
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
        player2wins: "Player 2 wins!",
        gameIsATie: "Game is a tie!"
    }
};
// 0 1 2
// 3 4 5
// 6 7 8

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
        // console.log(a);
        let b = gameBoard[winningCombo[1]]
        // console.log(b);
        let c = gameBoard[winningCombo[2]]
        // console.log(c);
        if (a === '' || b === '' || c === '') {
            continue
        }
        if (a === b && b === c) {
            console.log("winner", "abc", a, b, c, )
            if (a === 'X' && b === 'X' && c === 'X') {
                return gameMessage(gameData.messages.player1wins)
            } else if (a === 'O' && b === 'O' && c === 'O') {
                return gameMessage(gameData.messages.player2wins)
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
        renderGame(gameData.gameBoard);
        console.log(gameData.gameBoard)
        gameData.player1.turn = false;
        gameData.player2.turn = true;
        checkForWinner();
    } else if (
        e.target.matches(".game-square") &&
        gameData.player2.turn === true
    ) {
        gameData.gameBoard.splice(currSquare, 1, gameData.player2.gamePiece);
        renderGame(gameData.gameBoard);
        console.log(gameData.gameBoard)
        //  gameData.player2.player2Game += currSquare;
        console.log("playerGame2", gameData.player2.player2Game);
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