import pprint
from routes import Routes

visited_planets = []
planets = []
final_route = []


def solve(filename):
    routes = Routes()
    with open(filename, "r") as file:
        for line in file:
            routes.generate_routes(line.strip("\n"))

    routes = routes.calculate_routes(shortest=False)
    pprint.pprint(routes)
    distance = float("-inf")
    for route in routes:
        if route[1] > distance:
            distance = route[1]
    return distance


filename = "input.txt"
solution = solve(filename)
print("solution: ")
pprint.pprint(solution)

planets = {
    "planet1": {
        "planet2": 0,
        "planet3": 1,
        "planet4": 2,
        "planet5": 3,
        "planet6": 4,
    }
}
