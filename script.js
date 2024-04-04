function Gameboard() {
    const gameboard = [];

    for (let i=0; i < 9; i++) {
        gameboard.push(Cell());
    }

    console.log(gameboard);
}

function Cell() {
    const value = 0;

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

    function playRound() {
        console.log(`${getCurrentPlayer().name}'s turn...`)

        switchPlayer();
    }

    // Announce the winner
// }