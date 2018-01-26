class Neuron {

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

		return this.sigmoid(sum);
	}

	sigmoid (num) {
		return 1 / ( 1 + Math.exp(-num) );
	}
}

module.exports = Neuron;