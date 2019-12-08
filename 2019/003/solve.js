const DIRS = {
    U: [-1, 0],
    R: [0, 1],
    D: [1, 0],
    L: [0, -1]
}

function manhattanDistance([x1, y1], [x2, y2]) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}

function getCrosses(wires) {
    let nodes = {}
    let x = 0
    let y = 0
    nodes[`${y},${x}`] = {
        x,
        y,
        origin: true
    }

    let wire_id = 0
    let crosses = []
    for (const wire of wires) {
        let steps = 1
        for (const item of wire) {
            let regex = /(\w)(\d*)/
            let [, dir, value,] = regex.exec(item)
            value = +value
            for(let i = value; i > 0; i--) {
                let [local_y, local_x] = DIRS[dir]
                y += local_y
                x += local_x
                let id = `${y},${x}`
                if (nodes[id] && !nodes[id].origin && !nodes[id].cross && nodes[id].wire_id != wire_id) {
                    nodes[id].cross = true
                    nodes[id].steps += steps
                    crosses.push(nodes[id])
                } else {
                    nodes[id] = {
                        x,
                        y,
                        wire_id,
                        steps: steps
                    }
                }
                steps++
            }
        }
        wire_id++
        x = 0
        y = 0
    }

    return crosses
}

function solve1 (input) {
    input = input.split("\r\n")
    let wires = input.map(x => x.split(","))
    let crosses = getCrosses(wires)

    let min_distance = Infinity;
    for(const cross of crosses) {
        let local_manhattan_distance = manhattanDistance([0, 0], [cross.x, cross.y])
        min_distance = local_manhattan_distance < min_distance ? local_manhattan_distance : min_distance
    }

    return min_distance
}

function solve2 (input) {
    input = input.split("\r\n")
    let wires = input.map(x => x.split(","))
    let crosses = getCrosses(wires)

    crosses = crosses.sort((a, b) => {
        if (a.steps < b.steps) {
            return -1
        } else if (b.steps < a.steps) {
            return 1
        }
        return 0
    })

    return crosses[0].steps
}

module.exports = {
    solve1,
    solve2
}
