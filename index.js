const Matrix = require('./matrix');
const NeuralNetwork = require('./neuralnetwork');

let nn = new NeuralNetwork(2, 3, 2);
let input = [ 5, 1 ];
let answer = [ 2, 6 ];
let res = nn.train(input, answer);
































// let a = new Matrix(2, 3)
// let b = new Matrix(3, 2)

// a.randomize()
// b.randomize()

// let c = Matrix.multiply(a, b);

// a.display();
// b.display();
// c.display();
