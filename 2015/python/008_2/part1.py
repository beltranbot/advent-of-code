def solve(filename):
    characters_counter = 0
    with open(filename, "r") as file:
        for line in file:
            line = line.strip("\n")
            decoded_line = bytes(line, "utf-8").decode("unicode_escape")
            characters_counter += len(line) - (len(decoded_line) - 2)
    return characters_counter


filename = "input.txt"
solution = solve(filename)
print("solution: ", solution)
