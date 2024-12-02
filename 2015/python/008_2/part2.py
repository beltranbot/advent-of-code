
def solve(filename):
    characters_counter = 0
    with open(filename, "r") as file:
        for line in file:
            line = line.strip("\n")
            og_len = len(line)
            line = line.replace("\\", "\\\\")
            line = line.replace("\"", "\\\"")
            escaped_len = len(line) + 2 # plus 2 for missing double quotes
            characters_counter += escaped_len - og_len
    return characters_counter


filename = "input.txt"
solution = solve(filename)
print("solution: ", solution)
