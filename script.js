const board = (function() {
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
})();

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

const game = (function Gameplay() {
    // const board = Gameboard();

    const players = [
        {
            name: "PlayerOne",
            symbol: "X"
        },
        {
            name: "PlayerTwo",
            symbol: "O"
        }
    ]

    let currentPlayer = players[0];

    function getCurrentPlayer() {
        return currentPlayer;
    }

    function switchPlayer() {
        currentPlayer = (currentPlayer === players[0]) ? players[1] : players [0];
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
            gameStatusPara += " Enter a valid cell number!"
        } else {
            gameStatusPara += " That cell is already marked"
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

    return {
        playGame,
        getCurrentPlayer,
        showGameStatus,
        showGameStatusPara
    }
    
})();


function gameDisplay() {
    const boardDiv = document.querySelector('#gameboard');
    const statusPara = document.querySelector('#status');
    
    // const board = Gameboard();

    // for(let i=0; i < board.getBoard().length; i++) {
    //     const cell = document.createElement('button');
    //     cell.classList.add('cell');
    //     cell.dataset.index = i;
    //     boardDiv.appendChild(cell);
    // }

    statusPara.textContent = game.showGameStatusPara();

    boardDiv.addEventListener('click', (e) => {
        const selectedCell = e.target.dataset.index;
        console.log(selectedCell);
        game.playGame(selectedCell);
        updateDisplay();
    })

    
    function updateDisplay() {
        boardDiv.textContent = "";
        const currentBoard = board.getBoard();
        for (let i=0; i < currentBoard.length; i++) {
            console.log(i);
            const btn = document.createElement('button');
            btn.classList.add('cell');
            btn.dataset.index = i;
            btn.textContent = currentBoard[i].getValue();
            boardDiv.appendChild(btn);
        }
        statusPara.textContent = game.showGameStatusPara();
    }

    updateDisplay();
}

gameDisplay();