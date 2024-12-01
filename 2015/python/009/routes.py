import re
import pprint


class Routes():

    def __init__(self) -> None:
        self.routes = {}
        self.visited_planets = []
        self.planets = None
        self.shortest_route = []

    def get_routes(self):
        return self.routes

    def add(self, planet1, planet2, distance):
        if planet1 not in self.routes:
            self.routes[planet1] = {}
        if planet2 not in self.routes:
            self.routes[planet2] = {}
        self.routes[planet1][planet2] = distance
        self.routes[planet2][planet1] = distance

    def generate_routes(self, line):
        regexp = r"(\w+) to (\w+) = (\d+)"
        result = re.search(regexp, line)
        [planet1, planet2, distance] = result.groups()
        self.add(planet1, planet2, int(distance))

    def print(self):
        pprint.pprint(self.routes)

    def get_planets(self):
        if self.planets:
            return self.planets
        self.planets = list(self.routes.keys())
        return self.planets
    
    def calculate_routes(self, shortest: True):
        routes = []
        planets = self.get_planets().copy()
        for planet in planets:
            self.visited_planets = []
            self.shortest_route = []
            if shortest:
                route = self.calculate_shortest_route(planet)
            else:
                print("here")
                route = self.calculate_farthest_route(planet)
            distance = self.calculate_distance(route)
            routes.append((route, distance))
        return routes

    def calculate_shortest_route(self, planet):
        planets = self.get_planets().copy()
        self.visited_planets.append(planet)
        self.shortest_route.append(planet)
        while len(planets) > 0:
            if planet in planets:
                planets.remove(planet)
            closest_planet = self.find_closest_planet(planet)
            if closest_planet is None:
                break
            self.visited_planets.append(closest_planet)
            if closest_planet not in self.shortest_route:
                self.shortest_route.append(closest_planet)
            if closest_planet in planets:
                planets.remove(closest_planet)
            planet = closest_planet
        return self.shortest_route
    
    def calculate_farthest_route(self, planet):
        planets = self.get_planets().copy()
        self.visited_planets.append(planet)
        self.shortest_route.append(planet)
        while len(planets) > 0:
            if planet in planets:
                planets.remove(planet)
            closest_planet = self.find_farthest_planet(planet)
            if closest_planet is None:
                break
            self.visited_planets.append(closest_planet)
            if closest_planet not in self.shortest_route:
                self.shortest_route.append(closest_planet)
            if closest_planet in planets:
                planets.remove(closest_planet)
            planet = closest_planet
        return self.shortest_route

    def calculate_distance(self, planets):
        distance = 0
        for index in range(len(planets) - 1):
            distance += self.routes[planets[index]][planets[index + 1]]
        return distance


    # private

    def find_closest_planet(self, origin):
        closest = None
        for destiny in self.routes[origin]:
            if destiny in self.visited_planets:
                continue
            if closest is None:
                closest = destiny
            if self.routes[origin][destiny] < self.routes[origin][closest]:
                closest = destiny
        return closest
    
    def find_farthest_planet(self, origin):
        farthest = None
        for destiny in self.routes[origin]:
            if destiny in self.visited_planets:
                continue
            if farthest is None:
                farthest = destiny
            if self.routes[origin][destiny] > self.routes[origin][farthest]:
                farthest = destiny
        return farthest


if __name__ == "__main__":
    routes = Routes()
    routes.routes = {
        "Tristram": {
            "AlphaCentauri": 118,
            "Arbre": 122,
            "Faerun": 58,
            "Norrath": 142,
            "Snowdin": 103,
            "Straylight": 97,
            "Tambi": 49
        },
        "AlphaCentauri": {},
        "Arbre": {},
        "Faerun": {},
        "Norrath": {},
        "Snowdin": {},
        "Straylight": {},
        "Tambi": {},
    }
    closest_planet = routes.find_closest_planet("Tristram")
    assert closest_planet == "Tambi", "failed to find closest planet"

    shortest_route = routes.calculate_shortest_route()
    for index, planet in enumerate(['Tristram', 'Tambi']):
        assert shortest_route[index] == planet, "shortest route failed"

    distance = routes.calculate_distance(["Tristram", "Norrath"])
    assert 142 == distance, "distance is wrong"

    print("All tests passed!")
