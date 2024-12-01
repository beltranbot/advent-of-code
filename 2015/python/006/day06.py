import re
import hashlib


class Day06:

    def __init__(self) -> None:
        self.filename = "input.txt"
        self.grid = None

    def part1(self):
        self.grid = Grid(Light)
        return self.process()

    def part2(self):
        self.grid = Grid(Light2)
        return self.process()

    def process(self):
        with open(self.filename) as file:
            for line in file:
                regexp = r"(toggle|turn off|turn on)\s(\d*),(\d*)\sthrough\s(\d*),(\d*)"
                [instruction, x1, y1, x2, y2] = re.findall(regexp, line)[0]
                x1 = int(x1)
                y1 = int(y1)
                x2 = int(x2)
                y2 = int(y2)

                for x in range(x1, x2 + 1):
                    for y in range(y1, y2 + 1):
                        key = (x, y)
                        match instruction:
                            case "toggle":
                                self.grid.toggle(key)
                            case "turn off":
                                self.grid.turn_off(key)
                            case "turn on":
                                self.grid.turn_on(key)
                            case _:
                                raise Exception("help")

        return self.grid.count_lights()


class Grid:
    def __init__(self, light_class) -> None:
        self.light_class = light_class
        self.grid = {}
        self.lights = 0

    def toggle(self, key):
        if key not in self.grid:
            self.grid[key] = self.light_class()
        self.grid[key].toggle()

    def turn_on(self, key):
        if key not in self.grid:
            self.grid[key] = self.light_class()
        self.grid[key].turn_on()

    def turn_off(self, key):
        if key not in self.grid:
            self.grid[key] = self.light_class()
        self.grid[key].turn_off()

    def count_lights(self):
        self.lights = 0
        for key in self.grid.keys():
            self.lights += self.grid[key].value
        return self.lights


class Light:

    def __init__(self) -> None:
        self.value = 0

    def toggle(self):
        self.value = 1 if self.value == 0 else 0

    def turn_off(self):
        self.value = 0

    def turn_on(self):
        self.value = 1

class Light2:

    def __init__(self) -> None:
        self.value = 0

    def toggle(self):
        self.value += 2

    def turn_off(self):
        self.value = max(0, self.value -1)

    def turn_on(self):
        self.value += 1


day = Day06()
solution = day.part1()
print("solution part1: ", solution)

day = Day06()
solution = day.part2()
print("solution part2: ", solution)
