import re


class Day01:
    def __init__(self) -> None:
        self.filename = "input.txt"
        self.solution = 0
        self.list1 = []
        self.list2 = []

    def part1(self):
        self.parse_file()
        self.sort_lists()
        self.compare_lists()
        return self.solution

    def part2(self):
        self.parse_file()
        self.compare_lists_part2()
        return self.solution

    def parse_file(self):
        with open(self.filename) as file:
            for line in file:
                self.parse_line(line)

    def parse_line(self, line):
        result = re.findall(r"(\d*)\s*(\d*)", line)
        self.list1.append(int(result[0][0]))
        self.list2.append(int(result[0][1]))

    def sort_lists(self):
        self.list1.sort()
        self.list2.sort()

    def compare_lists(self):
        for index in range(len(self.list1)):
            self.solution += abs(self.list1[index] - self.list2[index])

    def compare_lists_part2(self):
        for item in self.list1:
            coincidences = len(list(filter(lambda x: x == item, self.list2)))
            self.solution += item * coincidences


day = Day01()
solution = day.part1()
print("solution part1: ", solution)

day = Day01()
solution = day.part2()
print("solution part2: ", solution)
