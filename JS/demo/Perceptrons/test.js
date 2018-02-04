// Using a single perceptron to predict whether a given point is
// above or below a line.

const fs = require('fs');
const Perceptron = require('../../src/perceptron');

// Generating the Training Data
let max_x = 1000;
let min_x = -1000;
let max_y = 1000;
let min_y = -1000;

function createData (count) {
	let data = [];

	function aboveLine (x, y) {
		let result = 5*x + 97;
		return y < result ? 0 : 1;
	}

	for (var i = 0; i < count; i++) {
		let x = Math.random() * max_x + Math.random() * min_x;
		let y = Math.random() * max_y + Math.random() * min_y;
		let input = [x, y];
		let output = aboveLine(x, y);
		data.push({input, output});
	}

	fs.writeFileSync('data.json', JSON.stringify(data, null, 4), 'utf8');
}

function test() {

	const n = new Perceptron(2, 0.1);
	n.weights = [0.5, 0.5];
	n.bias = 1;

	let dataset = fs.readFileSync('data.json', 'utf8');
		dataset = JSON.parse(dataset);

	for (var i = 0; i < 10000; i++) {
		dataset.forEach((data) => {
			let input = data.input;
			let output = data.output;
			n.train(input, output, false);
		});
	}

	// We can also get the equation developed by the perceptron
	console.log(`Bias: ${n.bias}`)
	let m = -n.weights[0] / n.weights[1];
	let c = -n.bias / n.weights[1];
	console.log(`y = ${m.toFixed(2)}x + ${c.toFixed(2)}`);
}

// createData(10000)
test();