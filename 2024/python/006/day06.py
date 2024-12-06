import re


class Day06:
    def __init__(self) -> None:
        self.filename = 'input.txt'
        self.data = open(self.filename).read().split('\n')
        self.grid = []
        self.guard = None
        self.directions = [
            (-1, 0),
            (0, 1),
            (1, 0),
            (0, -1)
        ]
        self.current_dir = 0
        self.direction = self.directions[self.current_dir]
        self.total = 0
        self.original_guard = None

    def silver(self):
        self.process_file()
        self.move()
        self.count_visited()
        return self.total

    def gold(self):
        self.process_file()
        return self.move2()

    def process_file(self):
        for row, line in enumerate(self.data):
            columns = []
            for col, val in enumerate(line):
                cell = Cell(row, col, val)
                columns.append(cell)
                if cell.value == '^':
                    self.guard = cell
                    self.original_guard = cell
                    cell.mark_as_visited()
            self.grid.append(columns)

    def move(self):
        while True:
            x = self.guard.x + self.direction[0]
            y = self.guard.y + self.direction[1]
            out_of_bounds = (
                x >= len(self.grid) or y >= len(self.grid[0])
                or x < 0 or y < 0
            )
            if out_of_bounds:
                break

            if self.grid[x][y].value == '.' or self.grid[x][y].value == 'X':
                self.guard = self.grid[x][y]
                self.guard.mark_as_visited()
            elif self.grid[x][y].value == '#':
                self.rotate()

    def rotate(self):
        self.current_dir += 1
        if self.current_dir >= 4:
            self.current_dir = 0
        self.direction = self.directions[self.current_dir]

    def count_visited(self):
        for row, _ in enumerate(self.grid):
            for col, _ in enumerate(self.grid[row]):
                self.total += 1 if self.grid[row][col].value == 'X' else 0

    def move2(self):
        blocks = 0

        for row, _ in enumerate(self.grid):
            for col, _ in enumerate(self.grid[row]):
                self.reset()
                if self.grid[row][col].value != '.':
                    continue

                self.grid[row][col].value = '@'

                i = 0
                while True:
                    i += 1
                    x = self.guard.x + self.direction[0]
                    y = self.guard.y + self.direction[1]
                    out_of_bounds = (
                        x >= len(self.grid) or y >= len(self.grid[0])
                        or x < 0 or y < 0
                    )
                    if out_of_bounds:
                        break

                    if self.grid[x][y].value == '.' or self.grid[x][y].value == 'X':
                        self.guard = self.grid[x][y]
                        self.guard.mark_as_visited()
                    elif self.grid[x][y].value == '#' or self.grid[x][y].value == '@':
                        self.rotate()

                    if i >= 10000:
                        blocks += 1
                        break

        return blocks

    def reset(self):
        for row, _ in enumerate(self.grid):
            for col, _ in enumerate(self.grid[row]):
                self.grid[row][col].reset()

        self.current_dir = 0
        self.direction = self.directions[self.current_dir]
        self.guard = self.original_guard
        self.guard.mark_as_visited()

    def print(self):
        for row, _ in enumerate(self.grid):
            output = []
            for col, _ in enumerate(self.grid[row]):
                output.append(self.grid[row][col].value)

            print(''.join(output))


class Cell:
    def __init__(self, x, y, value) -> None:
        self.x = x
        self.y = y
        self.value = value
        self.original_value = value

    def mark_as_visited(self):
        self.value = 'X'

    def reset(self):
        self.value = self.original_value


day = Day06()
solution = day.silver()
print('silver: ', solution)

day = Day06()
solution = day.gold()
print('gold  : ', solution)
