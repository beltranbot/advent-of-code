import re
import functools


class Day14:
    def __init__(self) -> None:
        self.filename = "input.txt"
        self.race_duration = 2503
        self.data = open(self.filename).read().split('\n')
        self.reindeers = []

    def silver(self):
        self.process_file()
        self.race(self.race_duration)
        return self.get_winners_distance()

    def gold(self):
        self.process_file()
        self.race(self.race_duration)
        return self.get_max_points()

    def process_file(self):
        for line in self.data:
            regexp = r'(\w*) can fly (\d*) km/s for (\d*) seconds, but then must rest for (\d*) seconds.'
            results = re.search(regexp, line)
            [name, speed, duration, rest] = results.groups()
            reindeer = Reindeer(name, int(speed), int(duration), int(rest))
            self.reindeers.append(reindeer)

    def race(self, seconds):
        for _ in range(seconds):
            [reindeer.step() for reindeer in self.reindeers]
            winners = self.get_winners()
            self.grant_points(winners)

    def get_winners_distance(self):
        f = lambda a, c: a if a > c.distance else c.distance
        return functools.reduce(f, self.reindeers, 0)

    def get_max_points(self):
        f = lambda a, c: a if a > c.points else c.points
        return functools.reduce(f, self.reindeers, 0)

    def get_winners(self):
        distance = self.get_winners_distance()
        return list(filter(lambda r: r.distance == distance, self.reindeers))

    def grant_points(self, winners):
        for winner in winners:
            winner.grant_point()


class Reindeer:
    def __init__(self, name, speed, duration, rest) -> None:
        self.name = name
        self.speed = speed
        self.duration = duration
        self.rest = rest
        self.is_resting = False
        self.duration_counter = 0
        self.rest_counter = 0
        self.distance = 0
        self.points = 0

    def step(self):
        self.resting() if self.is_resting else self.fly()

    def fly(self):
        self.duration_counter += 1
        self.distance += self.speed
        if self.duration_counter >= self.duration:
            self.is_resting = True
            self.duration_counter = 0

    def resting(self):
        self.rest_counter += 1
        if self.rest_counter >= self.rest:
            self.is_resting = False
            self.rest_counter = 0

    def grant_point(self):
        self.points += 1


day = Day14()
solution = day.silver()
print("silver: ", solution)

day = Day14()
solution = day.gold()
print("gold  : ", solution)
