import re
import functools


class Day15:
    def __init__(self) -> None:
        self.filename = "input.txt"
        self.data = open(self.filename).read().split('\n')
        self.ingredients = []
        self.attributes = []

    def silver(self):
        self.process_file()
        return self.calculate_maximum()

    def gold(self):
        self.process_file()
        return self.calculate_maximum2()

    def process_file(self):
        for line in self.data:
            regexp = r'(?:\w*): capacity (-?\d*), durability (-?\d*), flavor (-?\d*), texture (-?\d*), calories (-?\d*)'
            [
                capacity,
                durability,
                flavor,
                texture,
                calories
            ] = [int(x) for x in re.search(regexp, line).groups()]
            self.ingredients.append({
                'capacity': capacity,
                'durability': durability,
                'flavor': flavor,
                'texture': texture,
                'calories': calories
            })
        self.attributes = ['capacity', 'durability', 'flavor', 'texture']

    def calculate_maximum(self):
        limit = 98
        values = []
        for one in range(1, limit):
            for two in range(1, limit):
                for three in range(1, limit):
                    for four in range(1, limit):
                        if (one + two + three + four) != 100:
                            continue

                        table = {}
                        for attribute in self.attributes:
                            table[attribute] = one * self.ingredients[0][attribute] \
                                + two * self.ingredients[1][attribute] \
                                + three * self.ingredients[2][attribute] \
                                + four * self.ingredients[3][attribute]

                            if table[attribute] <= 0:
                                break

                        product = 1
                        for key in table:
                            product *= table[key]

                        values.append(product)

        return max(values)

    def calculate_maximum2(self):
        limit = 98
        values = []
        for one in range(1, limit):
            for two in range(1, limit):
                for three in range(1, limit):
                    for four in range(1, limit):
                        if (one + two + three + four) != 100:
                            continue

                        calories = one * self.ingredients[0]['calories'] \
                            + two * self.ingredients[1]['calories'] \
                            + three * self.ingredients[2]['calories'] \
                            + four * self.ingredients[3]['calories']

                        if calories != 500:
                            continue

                        table = {}
                        for attribute in self.attributes:
                            table[attribute] = one * self.ingredients[0][attribute] \
                                + two * self.ingredients[1][attribute] \
                                + three * self.ingredients[2][attribute] \
                                + four * self.ingredients[3][attribute]

                            if table[attribute] <= 0:
                                break

                        product = 1
                        for key in table:
                            product *= table[key]

                        values.append(product)

        return max(values)


day = Day15()
solution = day.silver()
print("silver: ", solution)

day = Day15()
solution = day.gold()
print("gold  : ", solution)
