import re

class Day01:

    def __init__(self) -> None:
        self.filename = "input.txt"
        self.input = ""
        self.floors = 0
        self.process_input()

    def process_input(self):
        with open(self.filename) as file:
            for line in file:
                self.input = line

    def part1(self):
        for item in self.input:
            if item == "(":
                self.floors += 1
            elif item == ")":
                self.floors -= 1
        return self.floors

    def part2(self):
        for index, item in enumerate(self.input):
            if item == "(":
                self.floors += 1
            elif item == ")":
                self.floors -= 1
            if self.floors < 0:
                return index + 1
        return 0


day = Day01()
solution1 = day.part1()
print("solution part1: ", solution1)

day = Day01()
solution2 = day.part2()
print("solution part2: ", solution2)


