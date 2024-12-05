import re
from functools import reduce
import json


class Day12:
    def __init__(self) -> None:
        self.filename = "input.txt"
        self.data = open(self.filename).read()
        self.total = 0

    def silver(self):
        regex = r'(-?\d+)'
        results = re.findall(regex, self.data)
        return reduce(lambda a, c: int(c) + int(a), results)

    def gold(self):
        with open(self.filename) as file:
            entries = json.load(file)
            self.evaluate(type(entries), entries)

        return self.total

    def evaluate(self, vtype, val):
        if vtype == str and val.isdigit():
            self.total += int(val)
        elif vtype == list:
            self.dig_list(val)
        elif vtype == int:
            self.total += val
        elif vtype == dict:
            self.dig_dict(val)
        elif vtype == str:
            pass
        else:
            raise Exception(vtype)

    def dig_list(self, entries):
        for entry in entries:
            self.evaluate(type(entry), entry)

    def dig_dict(self, hash):
        for key in hash:
            if hash[key] == 'red':
                return

        for key in hash:
            vtype = type(hash[key])
            val = hash[key]
            self.evaluate(vtype, val)


day = Day12()
solution = day.silver()
print("silver: ", solution)

day = Day12()
solution = day.gold()
print("gold  : ", solution)
