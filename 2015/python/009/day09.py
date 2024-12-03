import re
import math
import itertools

class Day09:

    def __init__(self) -> None:
        self.filename = 'input.txt'
        self.routes = {}
        self.planets = []
        self.distances = []

    def process_file(self):
        with open(self.filename) as file:
            for line in file:
                line = line.strip()
                self.process_line(line)

    def process_line(self, line):
        result = re.search(r'(\w*) to (\w*) = (\d*)', line)
        [planet1, planet2, distance] = result.groups()
        distance = int(distance)
        self.add_planet(planet1)
        self.add_planet(planet2)
        self.build_routes(planet1, planet2, distance)

    def add_planet(self, planet):
        if planet not in self.planets:
            self.planets.append(planet)

    def build_routes(self, planet1, planet2, distance):
        if (planet1, planet2) not in self.routes:
            self.routes[(planet1, planet2)] = distance
        if (planet2, planet1) not in self.routes:
            self.routes[(planet2, planet1)] = distance

    def solve(self):
        self.process_file()
        permutations = itertools.permutations(self.planets)
        distances = []

        for permutation in permutations:
            i = 0
            distance = 0

            while i < len(permutation) - 1:
                distance += self.routes[(permutation[i], permutation[i + 1])]
                i += 1

            distances.append(distance)

        print("min:", min(distances))
        print("max:", max(distances))

# test
day = Day09()
day.solve()
