const boardSize = 8; // 8 x 8  board, 64 tiles

class Tile {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.adjTiles = [];
    }
}

class Board {
    constructor (size) {
        this.boardSize = size;
        this.maxIndex = this.boardSize - 1;
        this.maxTiles = Math.pow(this.boardSize, 2);
        this.board = this._createBoard(size);

        // Assign valid moves/ adjacent nodes to created board
        this._makeAdjTiles();
    }

    _createBoard (size) {
        let xCoor = 0;
        let yCoor = 0;

        const board = {};

        while (xCoor <= size && yCoor <= size) {
            const nodeName = `${xCoor},${yCoor}`;

            board[`${nodeName}`] = new Tile(xCoor, yCoor);
        
        // Assign Coordinates to the created tile
        // if yCoor reached size, increment xCoor by 1 and reset yCoor to 0, else increment yCoor by 1
            if (yCoor === size) {
                xCoor ++;
                yCoor = 0;

            } else if (yCoor <= size) {
                yCoor ++;
            }   
        }

        return board;
        // Assign valid tile moves/ adjacent graph nodes
    }

    _checkValidTile (x, y) {
        const isTileXValid = x >= 0 && x <= this.maxIndex;
        const isTileYValid = y >= 0 && y <= this.maxIndex;
    
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

            _validMove (boardData) {
                const validTileMoves = [];

                Object.keys(this).forEach(move => {
                    // If a move is within 0 and maxIndex save adjacency of tile
                    // Note: Moves that are not within conditional is out of bounds
                    const moveX = this[move][0];
                    const moveY = this[move][1];

                    const checkValid = boardData._checkValidTile(moveX, moveY);
                    if (checkValid) {
                        validTileMoves.push(boardData.board[`${moveX},${moveY}`]);
                    }
                });

                return validTileMoves;
            }
        }
        
        Object.keys(this.board).forEach(key => {
            const tile = this.board[key];
            const a = tile.x;
            const b = tile.y;

            const moves = new Moves(a, b);
            const validMoves = moves._validMove(this);
            
            this.board[key].adjTiles = validMoves;
        })
    }
}

const knightMoves = function (src, dst) {
    const boardData = new Board(boardSize); // Note: boardSize argument in line one, can be edited to adjust board size

    // Check argument first if valid coordinates
    const isSrcValid = boardData._checkValidTile(src[0], src[1]);
    const isDstValid = boardData._checkValidTile(dst[0], dst[1]);

    if (!isSrcValid && !isDstValid) {
        return 'Invalid origin and destination tile.';
    } else if (!isSrcValid) {
        return 'Invalid origin tile.';
    } else if (!isDstValid) {
        return 'Invalid destination tile.';
    } 

    const origin = boardData.board[`${src[0]},${src[1]}`];
    
    let visited = new Set(); // Stores visited tiles

    // Queue has object component, 
    // node -> origin tile
    // move -> logs how many moves was made from origin to current
    // path -> logs the nodes taken to arrive at current
    const queue = [{node: origin, moves: 0, path: [origin]}]

    while (queue.length > 0) {

        const current = queue.pop(); 
        if (current.node.x === dst[0] && current.node.y === dst[1]) {
            const path = current.path;
            
            // Prints result
            console.log( `=> You made it in ${current.moves}! Here's your path:`);
            path.forEach(path => {
                console.log(`[${path.x},${path.y}]`);
            });

            // 
            return current;
        }
       
        current.node.adjTiles.forEach(tile => {
            if (!visited.has(tile)) {
                const nextTile = {
                    node: tile, 
                    moves: current.moves + 1,
                    path: [...current.path, tile]
                }

                queue.unshift(nextTile);
                visited.add(tile);
            }
        });
    }
}

// Test
console.log(knightMoves([3,3], [0, 0]));