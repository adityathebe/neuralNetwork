const synaptic = require('synaptic');
const fs = require('fs');

const Layer = synaptic.Layer;
const Network = synaptic.Network;

// Layers
let inputLayer = new Layer(4);
let hiddenLayer = new Layer(5);
let outputLayer = new Layer(3);

// Connecting the Layers
inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

// Creating a network
var network = new Network({
    input: inputLayer,
    hidden: [hiddenLayer],
    output: outputLayer
});

// Read Training Data
let trainingData = [];
const readData = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('iris.txt', 'utf8', (err, data) => {
            if (err)
                reject(err);

            let rows = data.split("\n");
            rows.forEach((row) => {
                let splitLine = row.trim().split(',');
                let input = splitLine.slice(0, 4);
                let output = splitLine[4]=='Iris-virginica' ? [0,0,1] 
                            : splitLine[4] == 'Iris-versicolor' ? [0,1,0] 
                            : [1,0,0];
                trainingData.push({
                    input: input,
                    output: output
                });
            });
            resolve(trainingData);
        });        
    })
}

// Training the network
const train = (trainingData) => {
    let learningRate = 0.01;
        for(var i = 0; i <= 10000; i++) {
            trainingData.forEach((data) => {
                network.activate(data.input);
                network.propagate(learningRate, data.output);
            });
            if(i % 1000 === 0)
                console.log("Training... "+i/100+"% complete. ");
        }        
}

readData().then((data) => {
    train(data);
    // use the network to classify flowers based on testing data
    fs.readFile('testing_data.txt', 'utf8', (err, data) => {
        if(err) throw err;
        console.log("\n\nResults\n===============================\n");
        var lines = data.split("\n");
        for(var i = 0; i < lines.length; i++){
            var input = lines[i].trim().split(",");
            var result = getFlowerName(network.activate(input));
            console.log(lines[i].trim()+" => "+result);
        }
    });    
}, (err) => {
    console.log(err);
})

// Utility functions
function getLargestIndex(arr){
    var result = 0;
    for(var i = 1; i < arr.length; i++)
        if(arr[i] > arr[result])
            result = i;
    return result;
}

function getFlowerName(arr){
    let flowerClass = {
        0: "Iris-setosa",
        1: "Iris-versicolor",
        2: "Iris-virginica"
    }
    var index = getLargestIndex(arr);
    return flowerClass[index];
}