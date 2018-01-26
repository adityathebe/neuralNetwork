// XOR with 4 perceptrons
// Aditya Thebe

/* 
	We cannot use a single perceptron to predict XOR gate due to its non-linearity.
	However, we can use a combination of NAND gates like this : https://i.stack.imgur.com/Uktsg.png
	to make an XOR predictor. We use NAND (or NOR) specifically because it is a universal gate.
*/

const Perceptron = require('../src/perceptron');
const learning_rate = 0.03

// Creating four perceptrons
let p = new Perceptron(2, learning_rate);

// First train a single NAND Gate
for ( let i = 0; i < 1000; i++ ) {
	p.train([0, 0], 1);
	p.train([0, 1], 1);
	p.train([1, 0], 1);
	p.train([1, 1], 0);
}

// Connect 4 NAND gates to output an XOR gate
let xor = (input) => {
	let p1 = p.predict(input);
	let p2 = p.predict([input[0], p1]);
	let p3 = p.predict([p1, input[1]]);
	let output = p.predict([p2, p3]);
	return output;
}

// Predict output
console.log( xor([0, 0]) )	// 0
console.log( xor([0, 1]) )	// 1
console.log( xor([1, 0]) )	// 1
console.log( xor([1, 1]) )	// 0