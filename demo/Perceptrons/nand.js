// NAND gate with a single perceptron
// Aditya Thebe

const Perceptron = require('../../src/perceptron');

let p = new Perceptron(2, 0.003);

for ( let i = 0; i < 1000; i++ ) {
	p.train([0, 0], 1);
	p.train([0, 1], 1);
	p.train([1, 0], 1);
	p.train([1, 1], 0);
}

console.log( p.predict([0, 0]) )
console.log( p.predict([0, 1]) )
console.log( p.predict([1, 0]) )
console.log( p.predict([1, 1]) )

// This single perceptron can be used to predict
// - AND gate
// - OR gate
// - NAND gate
// - NOR gate

// However it cannot be used to predict XOR gate. Why?
// Because XOR is not linearly separable