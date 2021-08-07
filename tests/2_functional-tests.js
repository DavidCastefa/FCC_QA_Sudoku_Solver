const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

  suite('5 tests: POST request to /api/solve', () => {
      
    test('Solve a puzzle with valid puzzle string: POST request to /api/solve', (done) => {
      let goodInput = ".7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6"; 
      let goodOutput = "473891265851726394926345817568913472342687951197254638734162589685479123219538746";
      chai.request(server)
        .post('/api/solve')
        .send({ puzzle: goodInput })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.solution, goodOutput);
        });
      done();
    });
    
    test('Solve a puzzle with missing puzzle string: POST request to /api/solve', (done) => {
      let badInput = ""; 
      chai.request(server)
        .post('/api/solve')
        .send({ puzzle: badInput })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Required field missing");
        });
      done();
    });

    test('Solve a puzzle with invalid characters: POST request to /api/solve', (done) => {
      let badInput = ".7.89..0..5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6"; 
       chai.request(server)
        .post('/api/solve')
        .send({ puzzle: badInput })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Invalid characters in puzzle");
        });
      done();
    });

    test('Solve a puzzle with incorrect length: POST request to /api/solve', (done) => {
      let badInput = "..89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6"; 
       chai.request(server)
        .post('/api/solve')
        .send({ puzzle: badInput })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
        });
      done();
    });

    test('Solve a puzzle that cannot be solved: POST request to /api/solve', (done) => {
      let badInput = "..89..999.5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6"; 
       chai.request(server)
        .post('/api/solve')
        .send({ puzzle: badInput })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Puzzle cannot be solved");
        });
      done();
    });
    
  });

  suite('9 tests: POST request to /api/check', () => {
      
    test('Check a puzzle placement with all fields: POST request to /api/check', (done) => {
      let goodPuzzle = ".7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6"; 
      chai.request(server)
        .post('/api/check')
        .send({ 
          puzzle: goodPuzzle,
          coordinate: "E8",
          value: "5"            // this is part of final solution
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.valid, true);
        });
      done();
    });

    test('Check a puzzle placement with single placement conflict: POST request to /api/check', (done) => {
      let goodPuzzle = ".7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6"; 
      chai.request(server)
        .post('/api/check')
        .send({ 
          puzzle: goodPuzzle,
          coordinate: "G9",
          value: "4"            // single conflict: column
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.valid, false);
          assert.equal(res.body.conflict, "column");
        });
      done();
    });
    
    test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', (done) => {
      let goodPuzzle = ".7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6"; 
      chai.request(server)
        .post('/api/check')
        .send({ 
          puzzle: goodPuzzle,
          coordinate: "E9",
          value: "4"            // double conflict: column + region
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.valid, false);
          assert.equal(res.body.conflict, ["column", "region"]);
        });
      done();
    });
     
  });


});

