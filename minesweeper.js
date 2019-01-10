$(function () {

    const numberOfRows = 15;
    const numberOfColumns = 10;
    const numberOfMines = 10;


    function plantMines(numberOfMines) {
        const mines = [];
        do {
            const randomRow = Math.floor(Math.random() * numberOfRows);
            const randomColumn = Math.floor(Math.random() * numberOfColumns);
            let mineAlreadyExists = false;
            _.each(mines, function (mine) {
                if (mine.row === randomRow && mine.column === randomColumn) {
                    mineAlreadyExists = true;
                    console.log('exists', mine, randomRow,randomColumn);
                }
            });
            if (!mineAlreadyExists) {
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

    function revealMines($board, mines) {
        const $rows = $board.find('.row');
        _.each(mines, function (mine) {
            const $row = $($rows[mine.row]);
            const $cells = $row.find('.cell');
            const $mine = $($cells[mine.column]);
            $mine.addClass('mine');
        });
    }

    drawEmptyBoard($('#board'));
    const mines = plantMines(numberOfMines);
    revealMines($('#board'), mines);
    console.log(mines);
    // $board.addClass('small');
});



