const boardSize = 8;
const maxIndex = boardSize - 1; // coordinates starts at 0 index


class Tile {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.adjPoints = [];
    }

    makeAdjPoints () {
        const a = this.x;
        const b = this.y;
        // Log all possible L moves of the knight
        const moves = {
            m1: [a + 2, b + 1],
            m2: [a - 2, b + 1],
            m3: [a + 1, b + 2],
            m4: [a - 1, b + 2],
            m5: [a + 2, b - 1],
            m6: [a - 2, b - 1],
            m7: [a + 1, b - 2],
            m8: [a - 1, b - 2]
        }

        // Reiterate over all possible moves
        Object.keys(moves).forEach(move => {
            // If a move is within 0 and maxIndex save adjacency of tile
            // Note: Moves that are not within conditional is out of bounds
            const moveX = moves[move][0];
            const moveY = moves[move][1];

            const isMoveXValid = moveX >= 0 && moveX <= maxIndex;
            const isMoveYValid = moveY >= 0 && moveY <= maxIndex;

            if (isMoveXValid && isMoveYValid) {
                this.adjPoints.push(moves[move]);
            }
        });
    }

    // makeAdjTiles() {

    // }

}

const createBoard = function () { 
    const adjList = {};
    let nodeName = 0
    let xCoor = 0;
    let yCoor = 0;

    while (xCoor <= maxIndex && yCoor <= maxIndex) {

        adjList[`${nodeName}`] = new Tile(xCoor, yCoor);
        
        nodeName ++;

        // if yCoor reached maxIndex, increment xCoor by 1 and reset yCoor to 0, else increment yCoor by 1
        if (yCoor === maxIndex) {
            xCoor ++;
            yCoor = 0;
            console.log('waw');

        } else if (yCoor <= maxIndex) {
            yCoor ++;
        }   

    }

    Object.keys(adjList).forEach(tile => {
        adjList[tile].makeAdjPoints();
    })

    return adjList;
}


console.log(createBoard());