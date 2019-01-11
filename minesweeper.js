$(function () {

    const numberOfRows = 15;
    const numberOfColumns = 10;
    const numberOfMines = 10;
    let board = [];

    function start() {
        board = initBoard(board);
        board = plantMines(board, numberOfMines);
        board = addNeighborCounts(board);
        drawBoard(board, $('#board'));
        return board;
    }

    function didWin(board) {
        let closedCells = 0;
        _.each(board, function (row) {
            _.each(row, function (cell) {
                if (!cell.open) {
                    closedCells++;
                }
            });
        });
        return (closedCells === numberOfMines);
    }

    function didLose(board) {
        let openMines = 0;
        _.each(board, function (row) {
            _.each(row, function (cell) {
                if (cell.open && cell.mine) {
                    openMines++;
                }
            });
        });
        return openMines > 0;
    }

    function open(board, cell) {
        cell.open = true;
        if (cell.neighboringMineCount === 0) {
            console.log('bubble');
            const neighbors = getNeighbors(board, cell);
            console.log(neighbors);
            _.each(neighbors, function (neighbor) {
                if (!neighbor.open) {
                    board = open(board, neighbor);
                }
            });
        }
        return board;
    }

    function initBoard(board) {
        for (let i = 0; i < numberOfRows; i++) {
            board[i] = [];
            for (let j = 0; j < numberOfColumns; j++) {
                board[i][j] = { row: i, column: j };

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
                if (cell.open) {
                    $cell.addClass('open');
                    if (cell.mine === true) {
                        $cell.addClass('mine');
                    } else if (cell.neighboringMineCount > 0) {
                        $cell.text(cell.neighboringMineCount);
                    }
                } else {
                    $cell.click(function () {
                        board = open(board, cell);
                        drawBoard(board, $container);
                    });
                }
            });
            $container.append($row);
        });
        setTimeout(function () {
            if (didWin(board)) {
                alert('Congratulations, you have saved yourself from all the mines!');
                board = start();
            } else if (didLose(board)) {
                alert('Oops, you stepped on a mine! All the best next time.');
                board = start();
            }
        }, 100);
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
                cell.mine = true;                // cell.open = true;
                mineCount++;
            }

        } while (mineCount < numberOfMines);
        return board;
    };

    function getNeighbors(board, cell) {
        const rowStart = cell.row === 0 ? 0 : cell.row - 1;
        const rowEnd = cell.row === numberOfRows - 1 ? numberOfRows - 1 : cell.row + 1;
        const columnStart = cell.column === 0 ? 0 : cell.column - 1;
        const columnEnd = cell.column === numberOfColumns - 1 ? numberOfColumns - 1 : cell.column + 1;
        const neighbors = [];

        for (let row = rowStart; row <= rowEnd; row++) {
            for (let column = columnStart; column <= columnEnd; column++) {
                if (!(row === cell.row && column === cell.column)) {
                    neighbors.push(board[row][column]);
                }
            }
        }
        return neighbors;
    }
    function addNeighborCounts(board) {
        for (let row = 0; row < numberOfRows; row++) {
            for (let column = 0; column < numberOfColumns; column++) {
                cell = board[row][column];
                if (!mineExists(cell)) {
                    let neighboringMineCount = 0;
                    const neighbors = getNeighbors(board, cell);
                    _.each(neighbors, function (neighbor) {
                        if (mineExists(neighbor)) {
                            neighboringMineCount++;
                        }
                    });

                    cell.neighboringMineCount = neighboringMineCount;
                }
            }
        }
        return board;
    }


    start();
    $('#restart').click(function () {
        board = start();
    })
});