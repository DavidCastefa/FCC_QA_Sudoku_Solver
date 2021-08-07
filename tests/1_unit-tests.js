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
      let badInput = ".g.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6"; 
      assert.equal(solver.solve(badInput), false);
      done();
    });

    test('Logic handles a puzzle string that is not 81 characters in length', (done) => {
      let badInput = "7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6"; 
      assert.equal(solver.solve(badInput), false);
      done();
    });

    test('Logic handles a valid row placement', (done) => {
      let goodInput = ".7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6"; 
      assert.equal(solver.checkRowPlacement(goodInput, "I", "8", "4"), true);
      done();
    });

    test('Logic handles an invalid row placement', (done) => {
      let goodInput = ".7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6"; 
      assert.equal(solver.checkRowPlacement(goodInput, "D", "5", "5"), false);
      done();
    });

    test('Logic handles a valid column placement', (done) => {
      let goodInput = ".7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6"; 
      assert.equal(solver.checkColPlacement(goodInput, "E", "8", "5"), true);
      done();
    });

    test('Logic handles an invalid column placement', (done) => {
      let goodInput = ".7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6"; 
      assert.equal(solver.checkColPlacement(goodInput, "E", "8", "1"), false);
      done();
    });

    test('Logic handles a valid region (3x3 grid) placement', (done) => {
      let goodInput = ".7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6"; 
      assert.equal(solver.checkRegionPlacement(goodInput, "E", "8", "1"), true);
      done();
    });

    test('Logic handles an invalid region (3x3 grid) placement', (done) => {
      let goodInput = ".7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6"; 
      assert.equal(solver.checkRegionPlacement(goodInput, "E", "8", "2"), false);
      done();
    });
    
  });


  suite('3 puzzle string handling tests', () => {
      
    test('Valid puzzle strings pass the solver', (done) => {
      let goodInput = ".7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6"; 
      let goodOutput = "473891265851726394926345817568913472342687951197254638734162589685479123219538746";
      assert.equal(solver.solve(goodInput), goodOutput);
      done();
    });

    test('Invalid puzzle strings fail the solver', (done) => {
      let badInput = ".7.89..9995....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6"; 
            assert.equal(solver.solve(badInput), false);
      done();
    });

    test('Solver returns the expected solution for an incomplete puzzle', (done) => {
      let otherGoodInput = "82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51"; 
      let otherGoodOutput = "827549163531672894649831527496157382218396475753284916962415738185763249374928651";
      assert.equal(solver.solve(otherGoodInput), otherGoodOutput);
      done();
    });

  });

});
