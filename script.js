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
}

function Cell() {
    let value = 0;

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

// function Gameplay() {
    const board = Gameboard();
    // Show current player
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

    // Check for winner
        // consecutive signs:   012     345     678     (but not 234, 456) can't use i+1 and i+2.
        // vertical:            036     147     258
        // cross lines:         048     246             first: +4, second: +2

        //      0 1 2
        //      3 4 5
        //      6 7 8

    function checkWinner() {
        const currentBoard = board.getBoard();
        for (let i=0; i<currentBoard.length; i++) {
            if (currentBoard[i].getValue() && (i === 0 || i === 3 || i === 6 )) {
                for (let k=0; k < 3; k++) {
                    if (currentBoard[i].getValue() === currentBoard[i + 1].getValue() &&
                        currentBoard[i].getValue() === currentBoard[i + 2].getValue()) {
                            console.log(`${i}: ${currentBoard[i + k].getValue()}, horizontal`)
                    }
                }
            }
            if (currentBoard[i].getValue() && (i === 0 || i === 1 || i === 2)) {
                for (let k=0; k < 7; k+=3) {
                    if (currentBoard[i].getValue() === currentBoard[i + 3].getValue() &&
                        currentBoard[i].getValue() === currentBoard[i + 6].getValue()) {
                            console.log(`${i}: ${currentBoard[i + k].getValue()}, vertical`)
                    }
                }
            }
            if (currentBoard[i].getValue() && i === 0) {
                for (let k=0; k < 9; k+=4) {
                    if (currentBoard[i].getValue() === currentBoard[i + 4].getValue() &&
                        currentBoard[i].getValue() === currentBoard[i + 8].getValue()) {
                            console.log(`${i}: ${currentBoard[i + k].getValue()}, cross`)
                    }
                }
            }
            if (currentBoard[i].getValue() && i === 2) {
                for (let k=0; k < 3; k++) {
                    if (currentBoard[i].getValue() === currentBoard[i + 2].getValue() &&
                        currentBoard[i].getValue() === currentBoard[i + 4].getValue()) {
                            console.log(`${i}: ${currentBoard[i].getValue()}, cross`)
                    }
                }
            }
        }
    }

    // Play round
        // Print current player
        // Change value of the cell
        // Print the board
        // Switch player
        // Repeat

    function playRound(cell) {
        if (!board.getBoard()[cell].getValue()) {
            console.log(`${getCurrentPlayer().name}'s turn...`);
            board.changeValue(getCurrentPlayer().symbol, cell);
            console.log(board.printBoard());
            
            checkWinner();
            // switchPlayer();
        } else {
            console.log("That cell is already marked")
        }
    }

    // Announce the winner
// }