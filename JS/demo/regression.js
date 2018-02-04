// Regression using a single sigmoid neuron
// Aditya Thebe

const fs = require('fs');

// Importing data and organizing it
let dataset = fs.readFileSync('prestige_dataset.csv', 'utf8');
	dataset = dataset.split('\r\n');
	dataset = dataset.map((data) => {
		data = data.split(',');
		data = data.map(el => el.replace(new RegExp('"', 'g'), ''));
		return data;
	})
	dataset = dataset.filter(data => data.length === 7);
	console.log(dataset.length)