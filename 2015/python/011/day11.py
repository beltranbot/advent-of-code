import re
import math
import itertools


class Day11:

    def __init__(self, input) -> None:
        self.input = input
        self.a_ord = 97
        self.z_ord = 122

    def silver(self):
        # a- 97 z-122
        # ord('a') chr(97)
        password = [ch for ch in self.input]
        while True:
            password = self.increase(password, index=0)

            if self.check(password):
                return ''.join(password)

    def increase(self, password, index=0):
        password.reverse()
        value = ord(password[index]) + 1

        if value <= self.z_ord:
            password[index] = chr(value)
            password.reverse()
            return password

        value = self.a_ord
        password[index] = chr(value)
        password.reverse()
        return self.increase(password, index=index + 1)

    def check(self, password=list):
        return self.check_consecutive_letters(password) \
            and self.check_banned_letters(password) \
            and self.check_pairs(password)

    def check_consecutive_letters(self, password):
        i = 0
        while i < len(password) - 2:
            c1 = ord(password[i])
            c2 = ord(password[i + 1])
            c3 = ord(password[i + 2])
            if (c2 - c1 == 1) and (c3 - c2 == 1):
                return True
            i += 1

        return False

    def check_banned_letters(self, password):
        banned = ['i', 'o', 'l']
        for ch in password:
            if ch in banned:
                return False

        return True

    def check_pairs(self, password):
        password = ''.join(password)
        result = re.findall(r"(\w{1})\1", password)
        if not result:
            return False

        letters = {}
        for ch in result:
            letters[ch] = True

        return len(letters.keys()) > 1


# test
input = 'hepxcrrq'
day = Day11(input)
solution = day.silver()
print("silver: ", solution)

day = Day11(solution)
solution = day.silver()
print("gold  : ", solution)
