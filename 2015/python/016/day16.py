import re
import functools


class Day16:
    def __init__(self) -> None:
        self.filename = "input.txt"
        self.data = open(self.filename).read().split('\n')
        self.ingredients = []
        self.attributes = []
        self.expected = {
            'children': 3,
            'cats': 7,
            'samoyeds': 2,
            'pomeranians': 3,
            'akitas': 0,
            'vizslas': 0,
            'goldfish': 5,
            'trees': 3,
            'cars': 2,
            'perfumes': 1,
        }
        self.sues = {}

    def silver(self):
        self.process_file(self.check_sue)
        return self.get_max_sue()

    def gold(self):
        return self.process_file2()

    def process_file(self, check: callable):
        for index, line in enumerate(self.data):
            regexp = r'Sue(?:\s\d*: )'
            result = re.split(regexp, line)[1].split(',')
            result = [x.split(':') for x in result]
            check(index + 1, result)

    def process_file2(self):
        regexp = r'Sue (\d*): (\w*): (\d*), (\w*): (\d*), (\w*): (\d*)'
        check1 = False
        check2 = False
        check3 = False
        for line in self.data:
            [index, key1, val1, key2, val2, key3,
                val3] = re.search(regexp, line).groups()
            [val1, val2, val3] = [int(x) for x in [val1, val2, val3]]

            check1 = self.check(key1, val1)
            check2 = self.check(key2, val2)
            check3 = self.check(key3, val3)

            if check1 and check2 and check3:
                return index

    def check(self, types, value):
        value = int(value)
        if types in ['cat', 'trees']:
            return self.expected[types] < value
        elif types in ['pomeranians', 'goldfish']:
            return self.expected[types] > value
        return self.expected[types] == value

    def check_sue(self, index, arr):
        points = 0
        for item in arr:
            key = item[0].strip()
            value = int(item[1])
            if key in self.expected and self.expected[key] == value:
                points += 1

        self.sues[index] = points

    def check_sue2(self, index, arr):
        points = 0
        for item in arr:
            key = item[0].strip()
            value = int(item[1])

            if key in self.expected:
                if key in ['cat', 'trees'] and value > self.expected[key]:
                    points += 1
                elif key in ['pomeranians', 'goldfish'] and value < self.expected[key]:
                    points += 1
                elif value == self.expected[key]:
                    points += 1
        print(points)
        self.sues[index] = points

    def get_max_sue(self):
        points = -1
        index = 0
        i = 1
        for sue in self.sues.values():
            if sue > points:
                points = sue
                index = i

            i += 1

        return index


day = Day16()
solution = day.silver()
print("silver: ", solution)

day = Day16()
solution = day.gold()
print("gold  : ", solution)
