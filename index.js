const boardSize = 8;
const maxIndex = boardSize - 1; // coordinates starts at 0 index


class Tile {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.adjTiles = [];
    }
}

class Board {
    constructor (size) {
        this._createBoard(size);
        this._makeAdjTiles();
    }

    _createBoard (size) {
        let xCoor = 0;
        let yCoor = 0;

        while (xCoor <= size && yCoor <= size) {
            const nodeName = `${xCoor},${yCoor}`;

            this[`${nodeName}`] = new Tile(xCoor, yCoor);
        
        // Assign Coordinates to the created tile
        // if yCoor reached size, increment xCoor by 1 and reset yCoor to 0, else increment yCoor by 1
            if (yCoor === size) {
                xCoor ++;
                yCoor = 0;

            } else if (yCoor <= size) {
                yCoor ++;
            }   
        }
    }

    _makeAdjTiles () {
        class Moves {
            constructor (x, y) {
                this.m1 = [x + 2, y + 1],
                this.m2 = [x - 2, y + 1],
                this.m3 = [x + 1, y + 2],
                this.m4 = [x - 1, y + 2],
                this.m5 = [x + 2, y - 1],
                this.m6 = [x - 2, y - 1],
                this.m7 = [x + 1, y - 2],
                this.m8 = [x - 1, y - 2]
            }

            _validMove (board) {
                const validTileMoves = [];

                Object.keys(this).forEach(move => {
                    // If a move is within 0 and maxIndex save adjacency of tile
                    // Note: Moves that are not within conditional is out of bounds
                    const moveX = this[move][0];
                    const moveY = this[move][1];
        
                    const isMoveXValid = moveX >= 0 && moveX <= maxIndex;
                    const isMoveYValid = moveY >= 0 && moveY <= maxIndex;
        
                    if (isMoveXValid && isMoveYValid) {
                        validTileMoves.push(board[`${moveX},${moveY}`]);
                    }
                });

                return validTileMoves;
            }
        }
    
        Object.keys(this).forEach(key => {
            const tile = this[key];
            const a = tile.x;
            const b = tile.y;

            const moves = new Moves(a, b);
            const validMoves = moves._validMove(this);
            
            this[key].adjTiles = validMoves;
        })
    }
}



const testBoard = new Board(boardSize);
console.log(testBoard);


// const knightMoves = function (origin, dest) {
//     const originX = origin[0];
//     const originY = origin[1];

//     const destX = dest[0];
//     const destY = dest[1];

//     const queue = [origin]

//     for (let moves of origin) {

//     }


//     const travese = function () {
        
//     }


// }


const testSet = new Set();
testSet.add(1)
console.log(testSet )