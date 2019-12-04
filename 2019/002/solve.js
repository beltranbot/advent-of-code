function intCode(memory, noun, verb) {
    memory[1] = noun
    memory[2] = verb

    outer_for:
    for (let i = 0; i < memory.length; i += 4) {
        let opcode = memory[i]
        let a = memory[memory[i + 1]]
        let b = memory[memory[i + 2]]
        let result = 0

        switch(opcode) {
            case 1:
                result = a + b
                break
            case 2:
                result = a * b
                break
            case 99:
                break outer_for
        }

        memory[memory[i + 3]] = result
    }

    return memory[0]
}

function solve1 (input, noun = 12, verb = 2) {
    input = input.split(",").map(x => +x)
    return intCode(input, noun, verb)
}

function solve2 (input) {
    const GOAL = 19690720
    input = input.split(",").map(x => +x)

    for (let noun = 0; noun <= 99; noun++) {
        for (let verb = 0; verb <= 99; verb++) {
            let memory = [...input]
            let output = intCode(memory, noun, verb)
            if (output === GOAL) {
                return ((100 * noun) + verb)
            }
        }
    }

    return "Not found"
}

module.exports = {
    solve1,
    solve2
}