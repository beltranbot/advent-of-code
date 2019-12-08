function twoAdjacentDigitsAreTheSame (n) {
    n += ""
    for (let i = 1; i < n.length; i++) {
        let a = n[i - 1]
        let b = n[i]
        if (a === b) {
            return true
        }
    }
    return false
}

function digitsNeverDecrease (n) {
    n += ""
    for (let i = 0; i < n.length - 1; i++) {
        let a = +n[i]
        let b = +n[i + 1]
        if (!(a <= b)) {
            return false
        }
    }
    return true
}

function matchesCriteriaPart1 (n) {
    let criteria_1 = twoAdjacentDigitsAreTheSame(n)
    if (!criteria_1) {
        return false
    }
    let criteria_2 = digitsNeverDecrease(n)
    return criteria_2
}

function areNotPartOfALargerGroup(n) {
    n += ""
    let [a, b, c, d, e, f] = n.split("")
    if (a === b && b !== c) {
        return true
    }
    if (a !== b && b === c && c !== d) {
        return true
    }

    if (b !== c && c === d && d !== e) {
        return true
    }

    if (c !== d && d === e && e !== f) {
        return true
    }

    if (d !== e && e === f) {
        return true
    }

    return false
}

function matchesCriteriaPart2(n) {
    let criteriaPart1 = matchesCriteriaPart1(n)
    if (!criteriaPart1) {
        return false
    }
    let criteria_3 = areNotPartOfALargerGroup(n)
    return criteria_3
}

function getPasswordsPart1(lower_bound, upper_bound) {
    let passwords = []
    for (let i = lower_bound; i <= upper_bound; i++) {
        if (matchesCriteriaPart1(i)) {
            passwords.push(i)
        }
    }
    return passwords
}

function getPasswordsPart2(lower_bound, upper_bound) {
    let passwords = []
    for (let i = lower_bound; i <= upper_bound; i++) {
        if (matchesCriteriaPart2(i)) {
            passwords.push(i)
        }
    }
    return passwords
}

function solve1 (input) {
    let [lower_bound, upper_bound] = input = input.split("-").map(n => +n)
    let passwords = getPasswordsPart1(lower_bound, upper_bound)
    return passwords.length
}

function solve2 (input) {
    let [lower_bound, upper_bound] = input = input.split("-").map(n => +n)
    let passwords = getPasswordsPart2(lower_bound, upper_bound)
    return passwords.length
}

module.exports = {
    solve1,
    solve2
}
