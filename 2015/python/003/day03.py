import re


class Day03:

    def __init__(self) -> None:
        self.filename = "input.txt"
        self.houses = {(0, 0): 1}
        self.process_file()

    def process_file(self):
        with open(self.filename) as file:
            for line in file:
                self.input = line

    def part1(self):
        santa = Deliverer()
        for direction in self.input:
            santa.process_direction(direction, self.houses)
        self.count_houses()
        return self.keys

    def part2(self):
        santa = Deliverer()
        robot = Deliverer()
        self.houses[(0, 0)] += 1

        for index, direction in enumerate(self.input):
            if index % 2 == 0:
                santa.process_direction(direction, self.houses)
            else:
                robot.process_direction(direction, self.houses)

        self.count_houses()
        return self.keys

    def count_houses(self):
        self.keys = len(list(self.houses.keys()))


class Deliverer:
    def __init__(self) -> None:
        self.x = 0
        self.y = 0
        self.total = 0
        self.keys = 0
        self.set_directions()

    def set_directions(self):
        self.directions = {
            "^": {"x": 0, "y": +1},
            ">": {"x": +1, "y": 0},
            "v": {"x": 0, "y": -1},
            "<": {"x": -1, "y": 0},
        }

    def process_direction(self, direction, houses):
        self.x += self.directions[direction]["x"]
        self.y += self.directions[direction]["y"]
        key = (self.x, self.y)
        if key in houses:
            houses[key] += 1
        else:
            houses[key] = 1


day = Day03()
solution1 = day.part1()
print("solution part1: ", solution1)

day = Day03()
solution2 = day.part2()
print("solution part2: ", solution2)
