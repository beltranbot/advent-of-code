import re
from itertools import permutations
import math


class Day13:
    def __init__(self) -> None:
        self.filename = "input.txt"
        self.data = open(self.filename).read().split('\n')
        self.total = 0
        self.vectors = {}
        self.people = []
        self.happiness = 0

    def silver(self):
        self.process_file()
        self.maximize_happiness()
        return self.happiness

    def gold(self):
        self.process_file()
        self.maximize_happiness(count_yourself=True)
        return self.happiness

    def process_file(self):
        regexp = r'^(\w*) would (gain|lose) (\d*) happiness units by sitting next to (\w*)\.'

        for line in self.data:
            line = line.strip()
            result = re.search(regexp, line)
            [p1, op, val, p2] = result.groups()
            val = int(val)
            if op == 'lose':
                val *= -1
            self.vectors[(p1, p2)] = val
            self.add_person(p1)
            self.add_person(p2)

    def add_person(self, person):
        if person not in self.people:
            self.people.append(person)

    def maximize_happiness(self, count_yourself=False):
        happiness = []
        for permutation in permutations(self.people):
            i = 0
            local = 0
            while i < len(permutation) - 1:
                local += self.vectors[(permutation[i], permutation[i + 1])]
                local += self.vectors[(permutation[i + 1], permutation[i])]
                if i == 0 and not count_yourself:
                    local += self.vectors[(permutation[i], permutation[-1])]
                    local += self.vectors[(permutation[-1], permutation[i])]

                i += 1
            happiness.append(local)

        self.happiness = max(happiness)


day = Day13()
solution = day.silver()
print("silver: ", solution)

day = Day13()
solution = day.gold()
print("gold  : ", solution)
