import re
import hashlib


class Day04:

    def __init__(self) -> None:
        self.input = "iwrupvqb"
        self.counter = 0

    def part1(self):
        return self.search("00000")

    def part2(self):
        return self.search("000000")

    def search(self, goal):
        while True:
            secret = self.input + str(self.counter)
            result = hashlib.md5(secret.encode("utf-8"))
            if result.hexdigest().startswith(goal):
                return self.counter
            self.counter += 1


day = Day04()
solution = day.part1()
solution1 = day.part1()
print("solution part1: ", solution1)

day = Day04()
solution2 = day.part2()
print("solution part2: ", solution2)
