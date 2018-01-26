class Perceptron {

	constructor(input_nodes, learning_rate) {
		this.nodes = input_nodes;
		this.bias = Math.random() * 2 - 1;
		this.learning_rate = learning_rate;
		this.weights = [];
		
		for (let i = 0; i < input_nodes; i++) {
			this.weights.push(Math.random() * 2 - 1)
		}
	}

	train (inputs, desired_output) {

		// Guess the result
		let guess = this.predict(inputs);
		let error = desired_output - guess;

		// Adjust weights and bias
		for (let i = 0; i < this.weights.length; i++) {
			this.weights[i] += this.learning_rate * error * inputs[i];         
		}
		this.bias += error * this.learning_rate;
	}

	predict (input_array) {

		if ( input_array.length != this.nodes) throw new Error({message: 'Invalid Input!'})

		let sum = this.bias;
		for (let i = 0; i < input_array.length; i++) {
			sum += this.weights[i] * input_array[i];
		}

		return this.activate(sum);
	}

	activate (num) {
		return num < 0 ? 0 : 1;
	}
}

module.exports = Perceptron;

// Using this single perceptron to learn the NAND gate !
if ( require.main === module ) {
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
}

// This single perceptron can be used to predict
// - AND gate
// - OR gate
// - NAND gate
// - NOR gate

// However it cannot be used to predict XOR gate. Why?
// Because XOR is not linearly separable