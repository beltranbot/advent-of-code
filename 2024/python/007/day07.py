import re
from itertools import product


class Day07:
    def __init__(self) -> None:
        self.filename = 'input.txt'
        self.data = open(self.filename).read().split('\n')
        self.operators = ['+', '*']
        self.operators_ternary = ['+', '*', '||']
        self.memo = {}

    def silver(self):
        return self.process_file(self.operators)

    def gold(self):
        return self.process_file(self.operators_ternary)

    def process_file(self, operators):
        total = 0
        for line in self.data:
            [left, right] = line.split(':')
            left = int(left)
            numbers = right.strip().split(' ')
            if self.process_line(operators, left, numbers):
                total += left

        return total

    def process_line(self, operators, expected, numbers):
        key = (expected, ''.join(numbers))
        if key in self.memo:
            return self.memo[key]

        for iteration in product(operators, repeat=len(numbers) - 1):
            arr = numbers[:]
            operation = []

            i = 0
            while len(arr) > 0:
                operation.append(arr.pop(0))

                if len(arr) > 0:
                    operation.append(iteration[i])
                i += 1

            result = 0
            next_operator = ''
            for n in operation:
                if n.isdigit() and result == 0:
                    result = int(n)
                elif n.isdigit():
                    if next_operator == '+':
                        result += int(n)
                    elif next_operator == '*':
                        result *= int(n)
                    elif next_operator == '||':
                        result = int(str(result) + n)
                else:
                    next_operator = n

            if expected == int(result):
                self.memo[key] = expected
                return True

        return False



day = Day07()
solution = day.silver()
print('silver: ', solution)

# day = Day07()
solution = day.gold()
print('gold  : ', solution)

# silver:  1298300076754
# gold  :  248427118972289
