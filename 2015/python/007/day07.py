import re


class Day07:

    def __init__(self) -> None:
        self.filename = "input.txt"
        self.instructions = Instructions()
        self.line = ""
        self.inputs = []
        self.process_file()

    def process_file(self):
        self.inputs = []
        with open(self.filename) as file:
            for line in file:
                self.inputs.append(line)

    def part1(self):
        self.process_instructions()
        return self.instructions.get_value("a")

    def part2(self):
        for index, item in enumerate(self.inputs):
            if item.strip() == "19138 -> b":
                self.inputs[index] = "16076 -> b"
                break

        self.process_instructions()
        return self.instructions.get_value("a")

    def process_instructions(self):
        while len(self.inputs) > 0:
            for index, line in enumerate(self.inputs):
                self.line = line.strip()
                break_loop = self.assign() \
                    or self.bitwise_not() \
                    or self.bitwise_and() \
                    or self.bitwise_or() \
                    or self.lshift() \
                    or self.rshift()
                if break_loop:
                    self.inputs.pop(index)
                    break

    def assign(self):
        regex = r"^(\d*|\w*) -> (\w*)$"
        result = re.findall(regex, self.line)
        if result:
            [left_side, right_side] = result[0]
            return self.instructions.assign(left_side, right_side)
        return False

    def bitwise_not(self):
        regex = r"^NOT (\d*|\w*) -> (\w*)$"
        result = re.findall(regex, self.line)
        if result:
            [left_side, right_side] = result[0]
            return self.instructions.bitwise_not(left_side, right_side)
        return False

    def bitwise_and(self):
        regex = r"^(\d*|\w*) AND (\d*|\w*) -> (\w*)$"
        result = re.findall(regex, self.line)
        if result:
            [arg1, arg2, right_side] = result[0]
            return self.instructions.bitwise_and(arg1, arg2, right_side)
        return False

    def bitwise_or(self):
        regex = r"^(\d*|\w*) OR (\d*|\w*) -> (\w*)$"
        result = re.findall(regex, self.line)
        if result:
            [arg1, arg2, right_side] = result[0]
            return self.instructions.bitwise_or(arg1, arg2, right_side)
        return False

    def lshift(self):
        regex = r"^(\d*|\w*) LSHIFT (\d*|\w*) -> (\w*)$"
        result = re.findall(regex, self.line)
        if result:
            [arg1, arg2, right_side] = result[0]
            return self.instructions.lshift(arg1, arg2, right_side)
        return False

    def rshift(self):
        regex = r"^(\d*|\w*) RSHIFT (\d*|\w*) -> (\w*)$"
        result = re.findall(regex, self.line)
        if result:
            [arg1, arg2, right_side] = result[0]
            return self.instructions.rshift(arg1, arg2, right_side)
        return False


class Instructions:
    def __init__(self) -> None:
        self.values = {}

    def get_value(self, key):
        if key.isdigit():
            return int(key)
        if key in self.values:
            return self.values[key]
        raise Exception

    def set_value(self, key, value):
        self.values[key] = value

    def assign(self, left_side: str | int, right_side: str):
        try:
            value = self.get_value(left_side)
            self.set_value(right_side, value)
            return True
        except:
            return False

    def bitwise_not(self, left_side: str, right_side: str):
        try:
            value = self.get_value(left_side)
            self.set_value(right_side, ~value)
            return True
        except:
            return False

    def bitwise_and(self, arg1: str | int, arg2: str, right_side: str):
        try:
            value1 = self.get_value(arg1)
            value2 = self.get_value(arg2)
            self.set_value(right_side, value1 & value2)
            return True
        except:
            return False

    def bitwise_or(self, arg1: str | int, arg2: str, right_side: str):
        try:
            value1 = self.get_value(arg1)
            value2 = self.get_value(arg2)
            self.set_value(right_side, value1 | value2)
            return True
        except:
            return False

    def lshift(self, arg1: str, arg2: str, right_side: str):
        try:
            value1 = self.get_value(arg1)
            value2 = self.get_value(arg2)
            self.set_value(right_side, value1 << value2)
            return True
        except:
            return False

    def rshift(self, arg1: str, arg2: str, right_side: str):
        try:
            value1 = self.get_value(arg1)
            value2 = self.get_value(arg2)
            self.set_value(right_side, value1 >> value2)
            return True
        except:
            return False


day = Day07()
solution = day.part1()
print("solution part1: ", solution)

day = Day07()
solution = day.part2()
print("solution part2: ", solution)
