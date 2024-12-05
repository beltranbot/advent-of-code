import re


class Day05:
    def __init__(self) -> None:
        self.filename = 'input.txt'
        self.data = open(self.filename).read().split('\n')
        self.rules = []
        self.updates = []
        self.total = 0

    def process_file(self):
        rules = True
        for line in self.data:
            if line == '':
                rules = False
                continue

            if rules:
                self.rules.append(list(map(lambda x: int(x), line.split('|'))))

            if not rules:
                self.updates.append(
                    list(map(lambda x: int(x), line.split(','))))

    def silver(self):
        self.process_file()

        for update in self.updates:
            if self.check_rules(update):
                self.total += update[len(update) // 2]

        return self.total

    def check_rules(self, numbers):
        for n1, n2 in self.rules:
            index1 = numbers.index(n1) if n1 in numbers else -1
            index2 = numbers.index(n2) if n2 in numbers else -1

            if index1 == -1 or index2 == -1:
                continue

            if index1 > index2:
                return False

        return True

    def gold(self):
        self.process_file()

        for update in self.updates:
            response = self.check_rules2(update)

            if not response:
                continue

            self.total += response[len(response) // 2]

        return self.total

    def check_rules2(self, numbers):
        if self.check_rules(numbers):
            return None

        loop_again = True
        while loop_again:
            loop_again = False
            for n1, n2 in self.rules:
                index1 = numbers.index(n1) if n1 in numbers else -1
                index2 = numbers.index(n2) if n2 in numbers else -1

                if index1 == -1 or index2 == -1:
                    continue

                if index1 > index2:
                    temp = numbers[index1]
                    numbers[index1] = numbers[index2]
                    numbers[index2] = temp
                    loop_again = True
                    break

        return numbers


day = Day05()
solution = day.silver()
print('silver: ', solution)

day = Day05()
solution = day.gold()
print('gold  : ', solution)
