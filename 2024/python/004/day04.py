import re


class Day04:
    def __init__(self) -> None:
        self.filename = "input.txt"
        self.data = open(self.filename).read().split('\n')
        self.grid = {}
        self.needle = "XMAS"
        self.found = 0
        self.directions = [
            (-1, -1),  # up left
            (-1, 0),  # up
            (-1, 1),  # up right
            (0, 1),  # right
            (1, 1),  # down right
            (1, 0),  # down
            (1, -1),  # down left
            (0, -1),  # left
        ]

    def silver(self):
        self.process_file()
        self.count_needles()
        return self.found

    def gold(self):
        self.found = 0
        self.process_file()
        self.count_needles2()
        return self.found

    def process_file(self):
        for row, line in enumerate(self.data):
            for col, ch in enumerate(line):
                self.grid[(row, col)] = ch

    def count_needles(self):
        for row, line in enumerate(self.data):
            for col, _ in enumerate(line):
                if self.grid[(row, col)] != 'X':
                    continue

                for direction in self.directions:
                    count = True
                    xd, yd = row, col
                    for ch in self.needle:
                        key = (xd, yd)
                        if key not in self.grid or self.grid[key] != ch:
                            count = False
                            break

                        xd += direction[0]
                        yd += direction[1]

                    if count:
                        self.found += 1

    def count_needles2(self):
        for row, line in enumerate(self.data):
            for col, _ in enumerate(line):
                if self.grid[(row, col)] != 'A':
                    continue

                self.check_xmas(row, col)

    def check_xmas(self, row, col):
        keys = [
            (row - 1, col - 1), # up left
            (row + 1, col + 1), # down right
            (row - 1, col + 1), # up right
            (row + 1, col - 1) # down left
        ]

        skip = False

        for key in keys:
            if key not in self.grid:
                skip = True
                break

        if skip:
            return

        rule1 = (
            (self.grid[keys[0]] == "M" and self.grid[keys[1]] == "S")
            or (self.grid[keys[0]] == "S" and self.grid[keys[1]] == "M")
        )
        rule2 = (
            (self.grid[keys[2]] == "M" and self.grid[keys[3]] == "S")
            or (self.grid[keys[2]] == "S" and self.grid[keys[3]] == "M")
        )

        if rule1 and rule2:
            self.found += 1


day = Day04()
solution = day.silver()
print("silver: ", solution)

day = Day04()
solution = day.gold()
print("gold  : ", solution)

# 2407 - bad


# data = open("input.txt", "r").read().strip().split("\n")

# grid = {}
# for y, line in enumerate(data):
#     for x, char in enumerate(line):
#         grid[(x,y)] = char

# dirs = [[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]]

# total = 0
# for y in range(len(data)):
#     for x in range(len(data[0])):
#         for xd, yd in dirs:
#             pos = [x,y]
#             for char in "XMAS":
#                 if tuple(pos) not in grid or grid[tuple(pos)] != char:
#                     break
#                 pos[0] += xd
#                 pos[1] += yd
#             else:
#                 total += 1

# print(total)


# data = open("input.txt", "r").read().strip().split("\n")

# grid = {}
# for y, line in enumerate(data):
#     for x, char in enumerate(line):
#         grid[(x,y)] = char

# total = 0
# for y in range(1,len(data)-1,1):
#     for x in range(1,len(data[0])-1,1):
#         if grid[(x,y)] != "A": continue
#         if ((grid[(x-1,y-1)] == "M" and grid[(x+1,y+1)] == "S") or (grid[(x-1,y-1)] == "S" and grid[(x+1,y+1)] == "M")) and ((grid[(x-1,y+1)] == "M" and grid[(x+1,y-1)] == "S") or (grid[(x-1,y+1)] == "S" and grid[(x+1,y-1)] == "M")):
#             total += 1

# print(total)
