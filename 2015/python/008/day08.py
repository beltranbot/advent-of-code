import re


class Day08:

    def __init__(self) -> None:
        self.filename = "input.txt"
        self.total = 0

    def part1(self):
        self.process_file_part1()
        return self.total
    
    def part2(self):
        self.process_file_part2()
        return self.total

    def process_file_part1(self):
        with open(self.filename, "r") as file:
            for line in file:
                line = line.strip()
                escaped = bytes(line, "utf-8").decode("unicode_escape")
                escaped = escaped[1:]
                escaped = escaped[:-1]
                self.total += len(line) - len(escaped)
    
    def process_file_part2(self):
        with open(self.filename, "r") as file:
            for line in file:
                line = line.strip("\n")
                og_len = len(line)
                line = line.replace("\\", "\\\\")
                line = line.replace("\"", "\\\"")
                escaped_len = len(line) + 2 # plus 2 for missing double quotes
                self.total += escaped_len - og_len


day = Day08()
solution = day.part1()
print("solution part1: ", solution)

day = Day08()
solution = day.part2()
print("solution part2: ", solution)
