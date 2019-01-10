const rows = 15;
const columns = 10;
const mineCount = 10;

$(function () {
    const $board = $('#board');
    for (let row = 0; row < rows; row++) {
        const $row = $('<div>')
            .addClass('row');
        for (let column = 0; column < columns; column++) {
            const $cell = $('<span>')
                .addClass('cell')
                .text(`${row},${column}`);
            $row.append($cell);
        }
        $board.append($row);
    }
    // $board.addClass('small');
});