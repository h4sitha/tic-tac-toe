function Gameboard() {
    const gameboard = [];

    for (let i=0; i < 9; i++) {
        gameboard.push("0");
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