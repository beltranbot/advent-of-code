import re

class Day02:

    def __init__(self) -> None:
        self.filename = "input.txt"
        self.input = []
        self.total = 0

    def part1(self):
        with open(self.filename) as file:
            for line in file:
                self.process_part1(line)
        return self.total

    def process_part1(self, line):
        [l, w, h] = list(map(lambda x: int(x), line.split("x")))
        smallest_side = min([l * w, w * h, h * l])
        self.total += ((2 * l * w) + (2 * w * h) + (2 * h * l)) + smallest_side

    def part2(self):
        with open(self.filename) as file:
            for line in file:
                self.process_part2(line)
        return self.total
    
    def process_part2(self, line):
        [l, w, h] = list(map(lambda x: int(x), line.split("x")))
        smallest_perimeter = min([
            2 * l + 2 * w,
            2 * w + 2 * h,
            2 * h + 2 * l
        ])
        self.total += smallest_perimeter + (l * w *h)


day = Day02()
solution1 = day.part1()
print("solution part1: ", solution1)

day = Day02()
solution2 = day.part2()
print("solution part2: ", solution2)


