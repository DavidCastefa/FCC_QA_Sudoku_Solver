// Based loosely on walkthrough with Landon Schlangen:
// https://www.youtube.com/watch?v=6XDcvG2ZCRc

class SudokuSolver {

  validate(puzzleString) { } // not used

  checkRowPlacement(puzzleString, row, col, value) {
    let grid = this.transform(puzzleString);
    row = row.charCodeAt(0) - 64;  // A = Unicode 65; thus -> 1
    if (grid[row-1][col-1] == value) return true;  //if new value already there, OK
    if (grid[row-1][col-1] != 0) return false;  // if another value already there, NOK
    for (let i = 0; i < 9; i++) {
      if (grid[row-1][i] == value) return false  
    };
    return true;
  }

  checkColPlacement(puzzleString, row, col, value) {
    let grid = this.transform(puzzleString);
    row = row.charCodeAt(0) - 64;  // A = Unicode 65; thus -> 1
    if (grid[row-1][col-1] == value) return true;  //if new value already there, OK
    if (grid[row-1][col-1] != 0) return false;  // if another value already there, NOK
    for (let i = 0; i < 9; i++) {
      if (grid[i][col-1] == value) return false  
    };
    return true;
  }

  checkRegionPlacement(puzzleString, row, col, value) {
    let grid = this.transform(puzzleString);
    row = row.charCodeAt(0) - 64;  // A = Unicode 65; thus -> 1
    if (grid[row-1][col-1] == value) return true;  //if new number already there, OK
    if (grid[row-1][col-1] != 0) return false;  // if another number already there, NOK
    let startRow = row - ((row-1) % 3) -1;
    let startCol = col - ((col-1) % 3) -1;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i + startRow][j + startCol] == value) return false  
      };
    };
    return true;
  }

  // Algorithm from https://www.geeksforgeeks.org/sudoku-backtracking-7/

  /* Takes a partially filled-in grid and attempts to
  assign values to all unassigned locations in such a
  way to meet the requirements for Sudoku solution
  (non-duplication across rows, columns, and boxes) ;
  row and col indicate the starting point, usually 0, 0. */
  solveSuduko(grid, row, col) {
    
    // N is the size of the 2D matrix N*N
    let N = 9;
    
    /* If we have reached the 8th row and 9th column
    (0 indexed matrix), we are returning true to
    avoid further backtracking */
    if (row == N - 1 && col == N) return grid;

    // Check if column value becomes 9 ,
    // we move to next row and column start from 0
    if (col == N) {
      row++;
      col = 0;
    }

    // Check if the current position of the grid
    // already contains value >0, we iterate
    // for next column

    if (grid[row][col] != 0)
      return this.solveSuduko(grid, row, col + 1);

    for(let num = 1; num < 10; num++) {
      
      // Check if it is safe to place the num (1-9)
      // in the given row , col 
      // -> we move to next column
      if (this.isSafe(grid, row, col, num)) {
        
        /* assigning the num in the current (row,col)
        position of the grid and assuming our assigned
        num in the position is correct */
        grid[row][col] = num;

        // Checking for next possibility with next column
        if (this.solveSuduko(grid, row, col + 1))
          return grid;
      }
      
      /* removing the assigned num , since our assumption
      was wrong , and we go for next assumption with
      diff num value */
      grid[row][col] = 0;
    }
    return false;
  }

  /* Check whether it will be legal to assign num to
  the given row, col */
  isSafe(grid, row, col, num) {
    
    /* Check if we find the same num in the same row ,
    we return false */
    for(let x = 0; x <= 8; x++)
      if (grid[row][x] == num)
        return false;

    /* Check if we find the same num in the similar column ,
    we return false */
    for(let x = 0; x <= 8; x++)
      if (grid[x][col] == num)
        return false;

    /* Check if we find the same num in the particular 3*3
    matrix, we return false */
    let startRow = row - row % 3,
      startCol = col - col % 3;
      
    for(let i = 0; i < 3; i++)
      for(let j = 0; j < 3; j++)
        if (grid[i + startRow][j + startCol] == num)
          return false;

    return true;
  }

  transform(puzzleString) {
    /* transform '..57.23...61.' into 
    [[0,0,5,7,0,2,3,0,0],
     [0,6,1,0,         ]] and so on */
    let grid = [
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0]
    ];
    let row = -1;
    let col = 0;
    for (let i=0; i< puzzleString.length; i++) {
      if ( i % 9 == 0 ) row++;
      if ( col % 9 == 0 ) col =0;
      grid[row][col] = puzzleString[i] === "." ? 0 : +puzzleString[i];
      col++;
    }
    return grid;
  }

  transformBack(grid) {
    return grid.flat().join("");
  }


  solve(puzzleString) {
    if (/[^1-9.]/g.test(puzzleString)) return false; // for unit test #2
    if (puzzleString.length != 81) return false; // for unit test #3

    let grid = this.transform(puzzleString);
    let solved = this.solveSuduko(grid, 0, 0);
    if (!solved) return false;
    let solvedString = this.transformBack(solved);
    return solvedString;
  }
}

module.exports = SudokuSolver;

