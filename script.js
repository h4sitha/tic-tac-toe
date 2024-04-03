function Gameboard() {
    const gameboard = [];

    for (let i=0; i < 9; i++) {
        gameboard.push(Cell());
    }

    console.log(gameboard);
}

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