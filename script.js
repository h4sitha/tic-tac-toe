function Gameboard() {
    const gameboard = [];

    for (let i=0; i < 9; i++) {
        gameboard.push(Cell());
    }

    function getBoard() {
        // return gameboard;
        for (let i=0; i < gameboard.length; i++) {
            console.log(gameboard[i].getValue());
        }
    }

    function changeValue(player, cell) {
        gameboard[cell].updateValue(player)
    }

    return {
        getBoard,
        changeValue
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

    // Play round
        // Print current player
        // Change value of the cell
        // Print the board
        // Switch player
        // Repeat

    function playRound(cell) {
        console.log(`${getCurrentPlayer().name}'s turn...`);
        // Use the parameter cell to change value of the cell
        // for this I need a function in the Gameboard
        // also send currentPlayer() value with that.
        board.changeValue(getCurrentPlayer().symbol, cell);
        console.log(board.getBoard());

        switchPlayer();
    }

    // Announce the winner
// }