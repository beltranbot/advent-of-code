import re
import hashlib


class Day05:

    def __init__(self) -> None:
        self.filename = "input.txt"
        self.nice_words = 0
        self.class_name = ""

    def part1(self):
        self.class_name = Word
        self.process_file()
        return self.nice_words

    def part2(self):
        self.class_name = Word2
        self.process_file()
        return self.nice_words

    def process_file(self):
        with open(self.filename) as file:
            for line in file:
                word = self.class_name(line)
                self.nice_words += 1 if word.is_nice_word() else 0


class Word:

    def __init__(self, word) -> None:
        self.word = word

    def is_nice_word(self) -> bool:
        return self.has_at_least_3_vowels() \
            and self.has_letter_in_a_row() \
            and self.doesnt_contain_banned_substring()

    def has_at_least_3_vowels(self):
        vowels = ['a', 'e', 'i', 'o', 'u']
        return len(list(filter(lambda c: c in vowels, self.word))) >= 3

    def has_letter_in_a_row(self):
        result = re.search(r"(\w{1})\1", self.word)
        return result is not None

    def doesnt_contain_banned_substring(self):
        banned = ["ab", "cd", "pq", "xy"]
        return len(list(filter(lambda x: x in self.word, banned))) == 0


class Word2:
    def __init__(self, word) -> None:
        self.word = word

    def is_nice_word(self):
        return self.has_pair_of_two() \
            and self.has_sandwich()

    def has_pair_of_two(self):
        result = re.search(r"(\w\w).*\1", self.word)
        return result is not None

    def has_sandwich(self):
        result = re.search(r"(\w{1})\w{1}\1", self.word)
        return result is not None


day = Day05()
solution = day.part1()
print("solution part1: ", solution)

day = Day05()
solution = day.part2()
print("solution part2: ", solution)
