$(function () {

    const numberOfRows = 15;
    const numberOfColumns = 10;
    const numberOfMines = 10;
    let board = [];

    function initBoard(board) {
        for (let i = 0; i < numberOfRows; i++) {
            board[i] = [];
            for (let j = 0; j < numberOfColumns; j++) {
                board[i][j] = {};
            }
        }
        return board;
    }

    function drawBoard(board, $container) {
        $container.empty();
        _.each(board, function (row) {
            const $row = $('<div>')
                .addClass('row');
            _.each(row, function (cell) {
                const $cell = $('<span>')
                    .addClass('cell');
                $row.append($cell);
                if (cell.mine === true) {
                    $cell.addClass('mine');
                } else if (cell.neighboringMineCount > 0) {
                    $cell.text(cell.neighboringMineCount);
                } else {
                    $cell.addClass('empty');
                }
            });
            $container.append($row);
        });
    }
 
    function mineExists(cell) {
        return cell.mine;
    }

    function plantMines(board, numberOfMines) {
        let mineCount = 0;
        do {
            const randomRow = Math.floor(Math.random() * numberOfRows);
            const randomColumn = Math.floor(Math.random() * numberOfColumns);
            const cell = board[randomRow][randomColumn];
            if (!cell.mine) {
                cell.mine = true;
                mineCount++;
            }

        } while (mineCount < numberOfMines);        
        return board;
    };

    function addNeighborCounts(board) {
        function getNeighbors(cell) {
            const rowStart = cell.row === 0 ? 0 : cell.row - 1;
            const rowEnd = cell.row === numberOfRows - 1 ? numberOfRows - 1 : cell.row + 1;
            const columnStart = cell.column === 0 ? 0 : cell.column - 1;
            const columnEnd = cell.column === numberOfColumns - 1 ? numberOfColumns - 1 : cell.column + 1;
            const neighbors = [];

            for (let row = rowStart; row <= rowEnd; row++) {
                for (let column = columnStart; column <= columnEnd; column++) {
                    if (!(row === cell.row && column === cell.column)) {
                        neighbors.push({ row: row, column: column });
                    }
                }
            }
            return neighbors;
        }
        for (let row = 0; row < numberOfRows; row++) {
            for (let column = 0; column < numberOfColumns; column++) {
                cell = board[row][column];
                if (!mineExists(cell)) {
                    let neighboringMineCount = 0;
                    const neighbors = getNeighbors({ row: row, column: column });                    
                    _.each(neighbors, function (neighbor) {
                        if (mineExists(board[neighbor.row][neighbor.column])) {
                            neighboringMineCount++;
                        }
                    });

                    cell.neighboringMineCount = neighboringMineCount;
                }
            }
        }
        return board;
    }
    
    board = initBoard(board);
    board = plantMines(board, numberOfMines);    
    board = addNeighborCounts(board);
    drawBoard(board, $('#board'));
});