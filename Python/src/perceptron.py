from random import random

class Perceptron:
    def __init__(self, input_nodes, learning_rate = 0.03):
        self.nodes = input_nodes
        self.bias = random() * 2 - 1
        self.learning_rate = learning_rate
        self.weights = []

        for i in range(input_nodes):
            self.weights.append(random())

    def train(self, inputs, desired_output):
        # Guess the result
        guess = self.predict(inputs)
        error = desired_output - guess

		# Adjust weights and bias
        for i in range(self.nodes):
            self.weights[i] += self.learning_rate * error * inputs[i]
        self.bias += error * self.learning_rate

    def predict(self, input_array):
        if len(input_array) is not self.nodes:
            raise ValueError('Invalid Input!')

        sum = self.bias
        for i in range(len(input_array)):
            sum += self.weights[i] * input_array[i]

        return self.activate(sum)

    def activate(self, num):
        return 0 if num < 0 else 1