import re


class Day08:
    def __init__(self) -> None:
        self.filename = 'input.txt'
        self.data = open(self.filename).read().split('\n')
        self.grid = {}
        self.frequencies = {}
        self.antinodes = 0

    def silver(self):
        self.process_file()
        self.process_frequencies()
        return self.antinodes

    def gold(self):
        self.process_file()
        self.process_frequencies2()
        self.count_antinodes()
        return self.antinodes

    def process_file(self):
        for row, line in enumerate(self.data):
            for col, val in enumerate(list(line)):
                [row, col] = [int(x) for x in [row, col]]
                self.grid[(row, col)] = {
                    'value': val,
                    'antinodes': 0
                }
                if val != '.':
                    if val not in self.frequencies:
                        self.frequencies[val] = [(row, col)]
                    else:
                        self.frequencies[val].append((row, col))

    def process_frequencies(self):
        for frequency in self.frequencies:
            i = 0
            while i < len(self.frequencies[frequency]):
                signal1 = self.frequencies[frequency][i]
                j = 0
                while j < len(self.frequencies[frequency]):
                    signal2 = self.frequencies[frequency][j]
                    if signal1 == signal2:
                        j += 1
                        continue

                    antinode = (
                        -1 * (signal2[0] - signal1[0]),
                        -1 * (signal2[1] - signal1[1])
                    )
                    key = (
                        signal1[0] + antinode[0],
                        signal1[1] + antinode[1]
                    )

                    if key in self.grid:
                        if self.grid[key]['value'] == '.':
                            self.grid[key]['value'] = '#'
                        if self.grid[key]['antinodes'] == 0:
                            self.antinodes += 1
                        self.grid[key]['antinodes'] = 1

                    j += 1

                i += 1

    def process_frequencies2(self):
        for frequency in self.frequencies:
            i = 0
            while i < len(self.frequencies[frequency]):
                signal1 = self.frequencies[frequency][i]
                j = 0
                while j < len(self.frequencies[frequency]):
                    signal2 = self.frequencies[frequency][j]
                    if signal1 == signal2:
                        j += 1
                        continue

                    antinode = (
                        -1 * (signal2[0] - signal1[0]),
                        -1 * (signal2[1] - signal1[1])
                    )

                    key = (signal1[0], signal1[1])
                    while True:
                        key = (
                            key[0] + antinode[0],
                            key[1] + antinode[1]
                        )

                        if key not in self.grid:
                            break

                        if self.grid[key]['value'] == '.':
                            self.grid[key]['value'] = '#'
                        if self.grid[key]['antinodes'] == 0:
                            self.antinodes += 1
                        self.grid[key]['antinodes'] = 1

                    j += 1

                i += 1

    def print(self):
        for row, line in enumerate(self.data):
            output = ''
            for col, val in enumerate(list(line)):
                output += self.grid[(row, col)]['value']
            print(output)

    def count_antinodes(self):
        self.antinodes = 0
        for key in self.grid:
            if self.grid[key]['value'] != '.':
                self.antinodes += 1


day = Day08()
solution = day.silver()
print('silver: ', solution)

day = Day08()
solution = day.gold()
print('gold  : ', solution)
