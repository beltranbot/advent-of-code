import re


class Day02:
    def __init__(self) -> None:
        self.filename = "input.txt"
        self.solution = 0

    def part1(self):
        self.process_file()
        return self.solution

    def process_file(self):
        with open(self.filename) as file:
            for line in file:
                line = line.strip()
                numbers = list(map(lambda x: int(x), line.split()))
                if self.process_line(numbers):
                    self.solution += 1

    def process_line(self, numbers):
        increate_flag = False
        decrease_flag = False
        i = 0
        while i < len(numbers) - 1:
            value = abs(numbers[i] - numbers[i + 1])
            if value > 3 or value == 0:
                return False
            if numbers[i] < numbers[i + 1]:
                if decrease_flag:
                    return False
                increate_flag = True
            elif numbers[i] > numbers[i + 1]:
                if increate_flag:
                    return False
                decrease_flag = True
            i += 1

        return True

    def part2(self):
        self.process_file2()
        return self.solution

    def process_file2(self):
        with open(self.filename) as file:
            for line in file:
                line = line.strip()
                numbers = list(map(lambda x: int(x), line.split()))
                if self.process_line2(numbers):
                    self.solution += 1

    def process_line2(self, numbers):
        if self.process_line(numbers):
            return True

        i = 0
        while i < len(numbers):
            copy = numbers[:]
            del copy[i]
            if self.process_line(copy):
                return True
            i += 1

        return False


day = Day02()
solution = day.part1()
print("solution part1: ", solution)

day = Day02()
solution = day.part2()
print("solution part2: ", solution)
