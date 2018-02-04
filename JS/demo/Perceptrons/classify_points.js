// Using a single perceptron to predict whether a given point is
// above or below a line.

const fs = require('fs');
const Perceptron = require('../../src/perceptron');
const n = new Perceptron(2, 0.1);

// Generating the Training Data
let max_x = 1000;
let min_x = -1000;
let max_y = 1000;
let min_y = -1000;

// Generate 10000 random coordinates and train the perceptron
for ( let i = 0; i < 1000; i++ ) {
	let x = Math.random() * max_x + Math.random() * min_x;
	let y = Math.random() * max_y + Math.random() * min_y;
	let input = [x, y];
	let output = aboveLine(x, y);
	n.train(input, output);
}

// A function to check if the given point lies above or below a line
// Let line be y = x + 4;
function aboveLine (x, y) {
	let result = x + 4;
	return y < result ? 0 : 1;
}

// Verify predictions
let correct = 0;
let total = 500;
for ( let i = 0; i < total; i++ ) {
	let x = Math.random() * max_x + Math.random() * min_x;
	let y = Math.random() * max_y + Math.random() * min_y;
	let output = n.predict([x, y]);
	let answer = aboveLine(x, y);

	if ( output === answer ) {
		correct += 1;
	}
}

let score = (correct / total) * 100;
console.log(`Score = ${score.toFixed(2)} %`);

// We can also get the equation developed by the perceptron
let m = -n.weights[0] / n.weights[1];
let c = -n.bias / n.weights[1];
console.log(`y = ${m.toFixed(2)}x + ${c.toFixed(2)}`);