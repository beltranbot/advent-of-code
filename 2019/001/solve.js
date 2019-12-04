function calculateFuel(x) {
    x = Math.floor(x / 3)
    return x - 2
}

function solve1 (input) {
    return input.split('\n').map(x => calculateFuel(+x))
        .reduce((a, c) => a + c, 0)
}

function solve2 (input) {

    return input.split('\n').map(x => {
        let arr = [];
        x = +x

        while(true) {
            x = calculateFuel(x)
            if (x > 0) {
                arr.push(x)
            } else {
                break
            }
        }

        return arr.reduce((a, c) => a + c, 0)
    }).reduce((a, c) => a + c, 0)

}

module.exports = {
    solve1,
    solve2
}