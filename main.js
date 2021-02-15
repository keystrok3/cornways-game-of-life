/** Conway's Game of Life **/

const grid = document.querySelector('.grid');   //Grid of cells

/** Return Neighbours to cells passed as parameter */
function top_neighbour(cell) {
    try {
        return grid.rows[cell.parentNode.rowIndex - 1].cells[cell.cellIndex];
    } catch(error) {
        console.log(error);
    }
}

function bottom_neighbour(cell) {
    try {
        return grid.rows[cell.parentNode.rowIndex + 1].cells[cell.cellIndex];
    } catch(error) {
        console.log(error);
    }
}

function left_neighbour(cell) {
    try {
        return grid.rows[cell.parentNode.rowIndex].cells[cell.cellIndex - 1];
    } catch(error) {
        console.log(error);
    }
}

function right_neighbour(cell) {
    try {
        return grid.rows[cell.parentNode.rowIndex].cells[cell.cellIndex + 1];
    } catch(error) {
        console.log(error);
    }
}

function bottom_left_neighbour(cell) {
    try {
        return grid.rows[cell.parentNode.rowIndex + 1].cells[cell.cellIndex - 1];
    } catch(error) {
        console.log(error);
    }
}

function bottom_right_neighbour(cell) {
    try {
        return grid.rows[cell.parentNode.rowIndex + 1].cells[cell.cellIndex + 1];
    } catch(error) {
        console.log(error);
    }
}

function top_left_neighbour(cell) {
    try {
        return grid.rows[cell.parentNode.rowIndex - 1].cells[cell.cellIndex - 1];
    } catch(error) {
        console.log(error);
    }
}

function top_right_neighbour(cell) {
    try {
        return grid.rows[cell.parentNode.rowIndex - 1].cells[cell.cellIndex + 1];
    } catch(error) {
        console.log(error);
    }
}

// randoms sets the initial table cells that are to be 'alive' - with data-state attribute of 'true'
function initialState(grid) {
    let initPatterns = [];
    for(let i = 1; i < 30; i++) {
        initPatterns.push([Math.floor(Math.random()*(30-0) + 0), Math.floor(Math.random()*(30-0) + 0)]);
    }
    // initPatterns = [[15, 15], [14, 15], [13, 15], [12, 15], [15, 14], [15, 13], [15, 12], [14, 11], [12, 11]];
    initPatterns.forEach(pattern => {
        grid.rows[pattern[0]].cells[pattern[1]].dataset.state = 'true';
    });
}

// Returns the number of neighbours of a cell that are dead - have a data-state value of true
function count_neighbours_alive(cell) {
    let count = 0;
    if(top_neighbour(cell) !== undefined && top_neighbour(cell).dataset.state === 'true') {
        count = count + 1;
    }
    if(bottom_neighbour(cell) !== undefined && bottom_neighbour(cell).dataset.state === 'true') {
        count = count + 1;
    }
    if(left_neighbour(cell) !== undefined && left_neighbour(cell).dataset.state === 'true') {
        count = count + 1;
    }
    if(right_neighbour(cell) !== undefined && right_neighbour(cell).dataset.state === 'true') {
        count = count + 1;
    }
    if(top_left_neighbour(cell) !== undefined && top_left_neighbour(cell).dataset.state === 'true') {
        count = count + 1;
    }
    if(top_right_neighbour(cell) !== undefined && top_right_neighbour(cell).dataset.state === 'true') {
        count = count + 1;
    }
    if(bottom_left_neighbour(cell) !== undefined && bottom_left_neighbour(cell).dataset.state === 'true') {
        count = count + 1;
    }
    if(bottom_right_neighbour(cell) !== undefined && bottom_right_neighbour(cell).dataset.state === 'true') {
        count = count + 1;
    }
    return count;
}

// Returns the number of neighbours of a cell that are dead - have a data-state value of false
function count_neighbours_dead(cell) {
    let count = 0;
    if(top_neighbour(cell) !== undefined && top_neighbour(cell).dataset.state === 'false') {
        count = count + 1;
    }
    if(bottom_neighbour(cell) !== undefined && bottom_neighbour(cell).dataset.state === 'false') {
        count = count + 1;
    }
    if(left_neighbour(cell) !== undefined && left_neighbour(cell).dataset.state === 'false') {
        count = count + 1;
    }
    if(right_neighbour(cell) !== undefined && right_neighbour(cell).dataset.state === 'false') {
        count = count + 1;
    }
    if(top_left_neighbour(cell) !== undefined && top_left_neighbour(cell).dataset.state === 'false') {
        count = count + 1;
    }
    if(top_right_neighbour(cell) !== undefined && top_right_neighbour(cell).dataset.state === 'false') {
        count = count + 1;
    }
    if(bottom_left_neighbour(cell) !== undefined && bottom_left_neighbour(cell).dataset.state === 'false') {
        count = count + 1;
    }
    if(bottom_right_neighbour(cell) !== undefined && bottom_right_neighbour(cell).dataset.state === 'false') {
        count = count + 1;
    }
    return count;
}

// Any live cell with less than 2 live neighbours or more than 3 live neighbours dies
function cell_death(cell) {
    if(cell.dataset.state === 'true' && (count_neighbours_alive(cell) < 2 || count_neighbours_alive(cell) > 3)) {
        cell.dataset.state = 'false';
    }
}

// Any dead cell with exactly 3 live neighbours comes alive
function cell_birth(cell) {
    if(cell.dataset.state === 'false' && count_neighbours_alive(cell) === 3) {
        cell.dataset.state = 'true';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initialState(grid); //initial values of cells which are alive
    
    // Kills and resurrect cells according to rules in the  cell_birth and cell_death function
    setInterval(() => {
        document.querySelectorAll('.grid td').forEach(cell => {
            cell_birth(cell);
            cell_death(cell);
        });
    }, 1000);
});