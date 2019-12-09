function inputInstruction(input, value, store_position) {
    input[store_position] = value
}

function addInstruction(input, value_1, value_2, store_position) {
    input[store_position] = value_1 + value_2
}

function multiplyInstruction(input, value_1, value_2, store_position) {
    input[store_position] = value_1 * value_2
}

function outputInstruction(output, value) {
    output.push(value)
}

function intCodePart1(input, system_id) {
    let i = 0
    let output = []
    while(input[i] !== 99) {
        let item = input[i] + ""
        let a = 0
        let b = 0
        let opcode = item.length === 1 ? item : item.substr(item.length - 2, 2)
        if (opcode.length === 1) {
            a = input[input[i + 1]]
            b = input[input[i + 2]]
        } else {
            let parameterModes =  item.substr(0, item.length - 2)
            if (parameterModes.length === 1) {
                a = +parameterModes[0] === 1 ? input[i + 1] : input[input[i + 1]]
                b = input[input[i + 2]]
            } else {
                a = +parameterModes[1] === 1 ? input[i + 1] : input[input[i + 1]]
                b = +parameterModes[0] === 1 ? input[i + 2] : input[input[i + 2]]
            }
        }

        switch(+opcode) {
            case 1:
                addInstruction(input, a, b, input[i + 3])
                i += 4
                break
            case 2:
                multiplyInstruction(input, a, b, input[i + 3])
                i += 4
                break
            case 3:
                inputInstruction(input, system_id, input[i + 1])
                i += 2
                break
            case 4:
                outputInstruction(output, a)
                i += 2
                break
            case 5:
                if (a !== 0) {
                    i = b
                } else {
                    i += 3
                }
                break
            case 6:
                if (a === 0) {
                    i = b
                } else {
                    i += 3
                }
                break
            case 7:
                input[input[i + 3]] = (a < b) ? 1 : 0
                i += 4
                break
            case 8:
                input[input[i + 3]] = (a === b) ? 1 : 0
                i += 4
                break
            default:
                throw "Unknown opcode [" + instruction + "]"
        }
    }

    return output
}

function solve1 (input, system_id = 1) {
    input = input.split(",").map(x => +x)
    let output = intCodePart1(input, system_id)
    return output[output.length - 1]
}

function solve2 (input, system_id = 5) {
    input = input.split(",").map(x => +x)
    let output = intCodePart1(input, system_id)
    return output[output.length - 1]
}

module.exports = {
    solve1,
    solve2
}
