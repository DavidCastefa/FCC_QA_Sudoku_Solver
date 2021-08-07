'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value} = req.body;  // see comment in next section
      if (!puzzle || !coordinate || !value) return res.json({ error: "Required field(s) missing" });
      let row = coordinate.split("")[0].toUpperCase();
      let col = coordinate.split("")[1];
      if ( coordinate.length !== 2 || !/[A-I]/.test(row) || !/[1-9]/.test(col) ) {
        return res.json({ error: "Invalid coordinate" });
      }
      if ( !/[1-9]/.test(value) || value.length != 1 ) return res.json({ error: "Invalid value" });
      if (puzzle.length != 81) return res.json({ error: "Expected puzzle to be 81 characters long" });
      if (/[^0-9.]/g.test(puzzle)) return res.json({ error: "Invalid characters in puzzle" });

      let validRow = solver.checkRowPlacement(puzzle, row, col, value);
      let validCol = solver.checkColPlacement(puzzle, row, col, value);
      let validReg = solver.checkRegionPlacement(puzzle, row, col, value);
      let conflicts = [];
      if (validRow && validCol && validReg) return res.json({ valid: true });
      if (!validRow) conflicts.push("row");
      if (!validCol) conflicts.push("column");
      if (!validReg) conflicts.push("region");
      return res.json({ valid: false, conflict: conflicts});
      
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let puzzle = req.body.puzzle;  // Or, let { puzzle } = req.body
      if (!puzzle) return res.json({ error: "Required field missing" });
      if (puzzle.length != 81) return res.json({ error: "Expected puzzle to be 81 characters long" });
      if (/[^1-9.]/g.test(puzzle)) return res.json({ error: "Invalid characters in puzzle" });

      /*let checkResult = {};
      let puzzle;
      checkPuzzle(req.body.puzzle, checkResult);
      console.log ("checkResult: ", checkResult)
      if (checkResult != {}) return res.json(checkResult); */
      
      let solvedString = solver.solve(puzzle);
      if (!solvedString) return res.json({ error: "Puzzle cannot be solved" });
      return res.json({ solution: solvedString });
    });

 /* const checkPuzzle = (puzzle, checkResult) => {
    if (!puzzle) {
      checkResult = { error: "Required field missing" };
      console.log ("checkResult: ", checkResult)
      return checkResult;
    }
    if (puzzle.length != 81) {
      checkResult = { error: "Expected puzzle to be 81 characters long" };
      console.log ("checkResult: ", checkResult)
      return checkResult;
    }
    if (/[^1-9.]/g.test(puzzle)) {
      checkResult = { error: "Invalid characters in puzzle" };
      console.log ("checkResult: ", checkResult)
      return checkResult;
    }  
    return puzzle;
  } */
};
