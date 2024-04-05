function Gameboard() {
    const gameboard = [];

    for (let i=0; i < 9; i++) {
        gameboard.push(Cell());
    }

    function getBoard() {
        return gameboard;
    }

    function printBoard() {
        let tempBoard = [];
        for (let i=0; i < gameboard.length; i++) {
            tempBoard.push(gameboard[i].getValue());
        }
        console.log(tempBoard);
    }

    function changeValue(player, cell) {
        gameboard[cell].updateValue(player)
    }

    return {
        getBoard,
        changeValue,
        printBoard
    }
};

function Cell() {
    let value = "";

    function updateValue(playerSymbol) {
        value = playerSymbol;
    }

    function getValue() {
        return value;
    }

    return {
        getValue,
        updateValue
    }
}

function Gameplay(firstPlayerName, secondPlayerName) {

    const board = Gameboard();

    const players = [
        {
            name: firstPlayerName,
            symbol: "X"
        },
        {
            name: secondPlayerName,
            symbol: "O"
        }
    ]

    let currentPlayer = players[0];
    let firstPlayer = currentPlayer;

    function getCurrentPlayer() {
        return currentPlayer;
    }

    function switchPlayer() {
        currentPlayer = (currentPlayer === players[0]) ? players[1] : players [0];
    }

    function switchFirstPlayer() {
        currentPlayer = (firstPlayer === players[0]) ? players[1] : players [0];
        firstPlayer = currentPlayer;
    }

    let winnerSymbol;

    function checkWinner() {
        const currentBoard = board.getBoard();
        for (let i=0; i<currentBoard.length; i++) {
            if (currentBoard[i].getValue() && (i === 0 || i === 3 || i === 6 )) {
                for (let k=0; k < 3; k++) {
                    if (currentBoard[i].getValue() === currentBoard[i + 1].getValue() &&
                        currentBoard[i].getValue() === currentBoard[i + 2].getValue()) {
                            winnerSymbol = currentBoard[i].getValue();
                            return true;
                    }
                }
            }
            if (currentBoard[i].getValue() && (i === 0 || i === 1 || i === 2)) {
                for (let k=0; k < 7; k+=3) {
                    if (currentBoard[i].getValue() === currentBoard[i + 3].getValue() &&
                        currentBoard[i].getValue() === currentBoard[i + 6].getValue()) {
                            winnerSymbol = currentBoard[i].getValue();
                            return true;
                    }
                }
            }
            if (currentBoard[i].getValue() && i === 0) {
                for (let k=0; k < 9; k+=4) {
                    if (currentBoard[i].getValue() === currentBoard[i + 4].getValue() &&
                        currentBoard[i].getValue() === currentBoard[i + 8].getValue()) {
                            winnerSymbol = currentBoard[i].getValue();
                            return true;
                    }
                }
            }
            if (currentBoard[i].getValue() && i === 2) {
                for (let k=0; k < 3; k++) {
                    if (currentBoard[i].getValue() === currentBoard[i + 2].getValue() &&
                        currentBoard[i].getValue() === currentBoard[i + 4].getValue()) {
                            winnerSymbol = currentBoard[i].getValue();
                            return true;
                    }
                }
            }
        }
    }

    function checkTies() {
        if (!isGameOver) {
            const currentBoard = board.getBoard();
            let isTied = true;
            for (let i=0; i < currentBoard.length; i++) {
                if (!currentBoard[i].getValue()) {
                    isTied = false;
                    break;
                }
            }
            return isTied;
        }
    }

    let isGameOver = false;
    let isGameTied = false;
    let gameStatusPara = `Pick a cell to start the game. ${getCurrentPlayer().name}'s turn...`;

    function playGame(cell) {
        if (!isGameOver) {
            playRound(cell);
        }
    }

    function playRound(cell) {
        if (cell < board.getBoard().length && cell >= 0 && !board.getBoard()[cell].getValue()) {
            board.changeValue(getCurrentPlayer().symbol, cell);
            console.log(board.printBoard());
            isGameOver = checkWinner();
            if (isGameOver) {
                gameStatusPara = "Game Over";
                announceWinner(winnerSymbol);
            }
            isGameTied = checkTies();
            if (isGameTied) {
                gameTied();
            }
            if (!isGameOver && !isGameTied) {
                switchPlayer();
                gameStatusPara = `${getCurrentPlayer().name}'s turn...`;
            }
        } else if (cell >= board.getBoard().length || cell < 0) {
            gameStatusPara = "Enter a valid cell number!"
        } else {
            gameStatusPara = "That cell is already marked"
        }
    }

    function announceWinner(winner) {
        const player = (winner === players[0].symbol) ? players[0] : players[1];
        gameStatusPara = `Game over! ${player.name} wins!`
    }

    function gameTied() {
        gameStatusPara = `It's a draw.`
    }

    function showGameStatus() {
        if (isGameOver || isGameTied) {
            return "GameOver";
        }
    }

    function showGameStatusPara() {
        return gameStatusPara;
    }

    function restartGame() {
        const currentBoard = board.getBoard();
        for (let i=0; i < currentBoard.length; i++) {
            board.changeValue("", i);
        }
        board.printBoard();
        isGameOver = false;
        isGameTied = false;
        switchFirstPlayer();
        gameStatusPara = `${getCurrentPlayer().name}'s turn...`
    }

    return {
        playGame,
        getCurrentPlayer,
        showGameStatus,
        showGameStatusPara,
        restartGame,
        getBoard: board.getBoard
    }
    
};


function gameDisplay() {

    const boardDiv = document.querySelector('#gameboard');
    const statusPara = document.querySelector('#status');

    const { firstPlayer, secondPlayer } = introScreen.getPlayerNames();

    const game = Gameplay(firstPlayer, secondPlayer);

    statusPara.textContent = game.showGameStatusPara();

    boardDiv.addEventListener('click', (e) => {
        if (e.target.dataset.index) {
            const selectedCell = e.target.dataset.index;
            console.log(selectedCell);
            game.playGame(selectedCell);
            updateDisplay();
        }
    })

    const restartBtn = document.createElement('button');
    restartBtn.textContent = "Restart"
    restartBtn.classList.add('restart');
    restartBtn.addEventListener('click', () => {
        game.restartGame();
        updateDisplay();
    })
    
    function updateDisplay() {
        boardDiv.textContent = "";
        const currentBoard = game.getBoard();
        for (let i=0; i < currentBoard.length; i++) {
            const btn = document.createElement('button');
            btn.classList.add('cell');
            btn.dataset.index = i;
            btn.textContent = currentBoard[i].getValue();
            boardDiv.appendChild(btn);
        }
        statusPara.textContent = game.showGameStatusPara();

        if (game.showGameStatus() === "GameOver") {
            statusPara.appendChild(restartBtn);
        }
    }

    updateDisplay();
}


const introScreen = (function startGame() {

    const firstPlayerName = document.querySelector('#first-player');
    const secondPlayerName = document.querySelector('#second-player');

    let firstPlayer;
    let secondPlayer;

    const submitBtn = document.querySelector('form button');
    submitBtn.addEventListener('click', () => {
        firstPlayer = (firstPlayerName.value) ? firstPlayerName.value : "PlayerOne";
        secondPlayer = (secondPlayerName.value) ? secondPlayerName.value : "PlayerTwo";
        gameDisplay();
    })

    function getPlayerNames() {
        return {
            firstPlayer,
            secondPlayer
        }
    }

    return {
        getPlayerNames
    }

})();

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#intro').showModal();
})