const fs = require('node:fs');

const data = fs
  .readFileSync('input.txt', 'utf8');

const matchRegex = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/g
const matches = data.matchAll(matchRegex)

let sum = 0
for (const [_instruction, x, y] of matches) {
    sum += x * y
}

console.log(sum) // part 1 answer

const instrRegex = /mul\(([0-9]{1,3}),([0-9]{1,3})\)|don't\(\)|do\(\)/g
const instrMatches = data.matchAll(instrRegex)

let sum2 = 0
let enable = true
for (const [instruction, x, y] of instrMatches) {
    console.log(instruction)
    if (instruction === 'do()') {
        enable = true
    } else if (instruction === "don't()") {
        enable = false
    } else if (enable) {
        sum2 += x * y
    }
}

console.log(sum2)