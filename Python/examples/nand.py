from src.perceptron import Perceptron

def nand():
    p = Perceptron(2)
    for _ in range(1000):
        p.train([0, 0], 1)
        p.train([0, 1], 1)
        p.train([1, 0], 1)
        p.train([1, 1], 0)

    print(p.predict([0, 0]))
    print(p.predict([0, 1]))
    print(p.predict([1, 0]))
    print(p.predict([1, 1]))

if __name__ == "__main__":
    nand()