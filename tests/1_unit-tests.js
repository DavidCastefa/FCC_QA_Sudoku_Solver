const chai = require('chai');
const assert = chai.assert;

const SudokuSolver = require('../controllers/sudoku-solver.js');
let solver = new SudokuSolver();

suite('UnitTests', () => {

  suite('9 logic handling tests', () => {
      
    test('Logic handles a valid puzzle string of 81 characters', (done) => {
      let goodInput = ".7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6"; 
      let goodOutput = "473891265851726394926345817568913472342687951197254638734162589685479123219538746";
      assert.equal(solver.solve(goodInput), goodOutput);
      done();
    });

    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', (done) => {
      let badInput = ".g.g9.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6"; 
      assert.equal(solver.solve(badInput), false);
      done();
    });
    
  });

});
