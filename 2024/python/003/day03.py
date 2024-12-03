import re


class Day03:
    def __init__(self) -> None:
        self.filename = "input.txt"
        self.solution = 0

    def part1(self):
        return self.process_file()

    def process_file(self):
        total = 0
        with open(self.filename) as file:
            for line in file:
                line = line.strip()
                regexp = r'mul\(\d{1,3},\d{1,3}\)'
                results = re.findall(regexp, line)
                for op in results:
                    regexp = r'mul\((\d{1,3}),(\d{1,3})\)'
                    [n1, n2] = list(
                        map(lambda x: int(x), re.search(regexp, op).groups()))
                    total += n1 * n2

        return total

    def part2(self):
        return self.process_file2()

    def process_file2(self):
        total = 0
        enable = True
        with open(self.filename) as file:
            for line in file:
                line = line.strip()
                regexp = r'don\'t\(\)|do\(\)|mul\(\d{1,3},\d{1,3}\)'
                results = re.findall(regexp, line)

                for op in results:
                    if "don't()" in op:
                        enable = False
                        continue
                    elif 'do()' in op:
                        enable = True
                        continue

                    if not enable:
                        continue

                    regexp = r'mul\((\d{1,3}),(\d{1,3})\)'
                    [n1, n2] = list(
                        map(lambda x: int(x), re.search(regexp, op).groups()))
                    total += n1 * n2

        return total


day = Day03()
solution = day.part1()
print("solution part1: ", solution)

day = Day03()
solution = day.part2()
print("solution part2: ", solution)
