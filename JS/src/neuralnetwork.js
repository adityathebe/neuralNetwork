const Matrix = require('./matrix');

class NeuralNetwork {

	constructor(input_nodes, hidden_nodes, output_nodes) {
		this.input_nodes = input_nodes;
		this.hidden_nodes = hidden_nodes;
		this.output_nodes = output_nodes;

		this.weight_ih = new Matrix ( this.hidden_nodes, this.input_nodes );
		this.weight_ho = new Matrix ( this.output_nodes, this.hidden_nodes );
		this.bias_h = new Matrix ( this.hidden_nodes, 1 );
		this.bias_o = new Matrix ( this.output_nodes, 1 );

		this.weight_ih.randomize();
		this.weight_ho.randomize();
		this.bias_h.randomize();
		this.bias_o.randomize();
	}

	feedForward(input_array) {
		// Preparing the input layer
		let input_layer = Matrix.fromArray(input_array);
		
		// Generating the hidden layer
		let hidden_layer = Matrix.multiply( this.weight_ih, input_layer);
		hidden_layer = Matrix.add(hidden_layer, this.bias_h);
		hidden_layer.map(NeuralNetwork.sigmoid);


		// Generating the output
		let output_layer = Matrix.multiply( this.weight_ho, hidden_layer);
		output_layer = Matrix.add(output_layer, this.bias_o);
		output_layer.map(NeuralNetwork.sigmoid);

		return output_layer.toArray();
	}

	static sigmoid(val) {
		let sigmoid_fn = 1 / ( 1 + Math.exp( -val ) )
		return sigmoid_fn;
	}

	train (inputs, answers) {
		let outputs = this.feedForward(inputs);

		let outputMatrix = Matrix.fromArray(outputs);
		let answerMatrix = Matrix.fromArray(answers);
		let output_errors = Matrix.subtract(answerMatrix, outputMatrix);
	}
	
}

module.exports = NeuralNetwork