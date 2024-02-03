const boardSize = 8;
const maxIndex = boardSize - 1; // coordinates starts at 0 index
const maxTiles = Math.pow(boardSize, 2);

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

    _checkValidTile (x, y) {
        const isTileXValid = x >= 0 && x <= maxIndex;
        const isTileYValid = y >= 0 && y <= maxIndex;
    
        const result = isTileXValid && isTileYValid ? true : false;
        return result;
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


const knightMoves = function (src, dst) {
    //Check argument first if valid coordinates
    

    const board = new Board(boardSize);
    const origin = board[`${src[0]},${src[1]}`];
    origin.distance = 0;
    origin.path = [origin];

    const dstX = dst[0];
    const dstY = dst[1];

    

    const queue = [origin]
    
    let visited = new Set();
    while (queue.length > 0) {
        const current = queue.pop(); 
        if (current.x === dstX && current.y === dstY) {
            return current.path;
        }

        current.adjTiles.forEach(tile => {
            if (!visited.has(tile)) {
                tile.distance = current.distance + 1;
                tile.path =[...current.path, tile];
                queue.unshift(tile);
                visited.add(tile);
            }
        });

        // Avoid infinite loop, if dst is invalid
        // If current is already visited and all tiles are visited
        // if (visited.has(current) && visited.size >= maxTiles) {
        //     return false;
        // }

    }

}

console.log(knightMoves([3,3], [7,7]));