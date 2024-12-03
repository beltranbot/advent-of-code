import re
import math
import itertools


class Day10:

    def __init__(self, input) -> None:
        self.input = input
        self.routes = {}
        self.planets = []
        self.distances = []


    def part1(self):
        return self.process(times=40)
    
    def part2(self):
        return self.process(times=50)

    def process(self, times):
        output = self.input
        for _ in range(times):
            output = self.look_and_say(output)

        return len(output)

    def look_and_say(self, input):
        numbers = []
        arr = []
        i = 0
        while i < len(input):
            number = input[i]

            if not arr:
                arr.append(number)
            elif arr[0] == number:
                arr.append(number)
            else:
                numbers.append(arr)
                arr = [number]

            i += 1
            if i == len(input):
                numbers.append(arr)

        output = ''
        for group in numbers:
            output += str(len(group)) + group[0]
        return output


# test
input = '1113122113'
day = Day10(input)
solution = day.part1()
print("solution1: ", solution)

day = Day10(input)
solution = day.part2()
print("solution2: ", solution)
