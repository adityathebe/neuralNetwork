# Using a single perceptron to predict whether a given point lies above or below a line.

from src.perceptron import Perceptron
from random import random, randrange

P = Perceptron(2, 0.1)

# Generate 10000 random coordinates
max_x = max_y = 1000
min_x = min_y = -1000

def aboveLine(x, y):
    result = x + 4  # y = x + 4
    return 0 if y < result else 1

for _ in range(1000):
    x = randrange(min_x, max_x) * random()
    y = randrange(min_y, max_y) * random()
    input = [x, y]
    output = aboveLine(x, y)
    P.train(input, output)

correct = 0
total = 500
for _ in range(total):
    x = randrange(min_x, max_x) * random()
    y = randrange(min_y, max_y) * random()
    output = P.predict([x, y])
    answer = aboveLine(x, y)

    if output == answer:
        correct += 1

score = (correct / total) * 100
print('Score = {} %'.format(round(score, 2)))

slope = -P.weights[0] / P.weights[1]
intercept = -P.bias / P.weights[1]
print('y = {}x + {}'.format(round(slope, 2), round(intercept, 2)))