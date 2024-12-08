import re
from itertools import chain, combinations
import functools
import math


class Day17:
    def __init__(self) -> None:
        self.filename = "input.txt"
        self.data = open(self.filename).read().split('\n')
        self.numbers = []
        self.goal = 150
        self.matches = 0
        self.results = []

    def silver(self):
        self.process_file()
        self.find_combinations()
        return len(self.results)

    def gold(self):
        self.process_file()
        return self.find_min_combinations()

    def process_file(self):
        for line in self.data:
            self.numbers.append(int(line))

    def find_combinations(self):
        for permutation in chain.from_iterable(combinations(self.numbers, r) for r in range(len(self.numbers)+1)):
            total = 0
            for number in permutation:
                total += number
            if total == self.goal:
                self.results.append(permutation)

    def find_min_combinations(self):
        for permutation in chain.from_iterable(combinations(self.numbers, r) for r in range(len(self.numbers)+1)):
            total = 0
            for number in permutation:
                total += number
            if total == self.goal:
                self.results.append(permutation)
        min_size = len(functools.reduce(lambda a, c: c if len(c) < len(a) else a, self.results))
        min_combos = len(list(filter(lambda x: len(x) == min_size, self.results)))
        return min_combos


day = Day17()
solution = day.silver()
print("silver: ", solution)

day = Day17()
solution = day.gold()
print("gold  : ", solution)
