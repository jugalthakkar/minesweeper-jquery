$(function () {

    const numberOfRows = 15;
    const numberOfColumns = 10;
    const numberOfMines = 10;

    function mineExists(mines, row, column) {
        let mineAlreadyExists = false;
        _.each(mines, function (mine) {
            if (mine.row === row && mine.column === column) {
                mineAlreadyExists = true;
            }
        });
        return mineAlreadyExists;
    }

    function plantMines(numberOfMines) {
        const mines = [];
        do {
            const randomRow = Math.floor(Math.random() * numberOfRows);
            const randomColumn = Math.floor(Math.random() * numberOfColumns);
            if (!mineExists(mines, randomRow, randomColumn)) {
                mines.push({ row: randomRow, column: randomColumn });
            }

        } while (mines.length < numberOfMines);
        return mines;
    };

    function drawEmptyBoard($board) {
        for (let row = 0; row < numberOfRows; row++) {
            const $row = $('<div>')
                .addClass('row');
            for (let column = 0; column < numberOfColumns; column++) {
                const $cell = $('<span>')
                    .addClass('cell');
                // .text(`${row},${column}`);
                $row.append($cell);
            }
            $board.append($row);
        }
    }

    function getCell$($board, row, column) {
        const $rows = $board.find('.row');
        const $row = $($rows[row]);
        const $cells = $row.find('.cell');
        return $($cells[column]);
    }

    function revealMines($board, mines) {
        _.each(mines, function (mine) {
            const $mine = getCell$($board, mine.row, mine.column);
            $mine.addClass('mine');
        });
    }

    function addNeighborCounts($board, mines) {
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
                if (!mineExists(mines, row, column)) {
                    let neighboringMineCount = 0;
                    const neighbors = getNeighbors({ row: row, column: column });
                    console.log(neighbors);
                    _.each(neighbors, function (neighbor) {
                        if (mineExists(mines, neighbor.row, neighbor.column)) {
                            neighboringMineCount++;
                        }
                    });
                    const $cell = getCell$($board, row, column);
                    $cell.text(neighboringMineCount);
                }
            }
        }

    }
    const $board = $('#board');
    drawEmptyBoard($('#board'));
    const mines = plantMines(numberOfMines);
    revealMines($board, mines);
    addNeighborCounts($board, mines);
    console.log(mines);
    // $board.addClass('small');
});