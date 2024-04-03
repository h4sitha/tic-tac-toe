function Gameboard() {
    const gameboard = []

    for (let i=0; i < 3; i++) {
        const row = [];
        for (let k=0; k < 3; k++) {
            row.push("0");
        }
        gameboard.push(row);
    }

    console.log(gameboard)
    
}