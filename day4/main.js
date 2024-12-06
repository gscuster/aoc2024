const fs = require('node:fs');

const data = fs
  .readFileSync('input.txt', 'utf8')
  .split(/\r?\n/)
  .filter(n => n)
  .map(s => s.split(''));

// X, Y modifier for finding other letter positions
const searchIdx = [
  [1,0],   // Regular
  [-1,0],  // Backwards
  [0,1],   // Down
  [0,-1],  // Up
  [1,-1],  // Diagonal up right
  [-1,-1], // Diagonal up left
  [1,1],   // Diagonal down right
  [-1,1],  // Diagonal down left
]

const expected = 'XMAS'
function checkXmas (data, position, modifier) {
  let val = 'X'
  for (let i = 1; i < 4; i++) {
    const ypos = position[0] + modifier[1] * i
    const xpos = position[1] + modifier[0] * i
    if (!data[ypos] || data[ypos][xpos] !== expected[i]) {
      return false
    }
    val += data[ypos][xpos]
  }
  console.log(val, position, modifier)
  return true
}

let count = 0
for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    if (data[i][j] === 'X') {
      // Check every direction, be lazy and ignore bounds
      searchIdx.forEach((modifier) => {
        if (checkXmas(data, [i, j], modifier)) {
            count++
        }
      })
    }
  }
}

console.log(count) // part 1 answer

function checkMas (data, position) {
  y0 = position[0] - 1
  y1 = position[0]
  y2 = position[0] + 1
  x0 = position[1] - 1
  x1 = position[1]
  x2 = position[1] + 1

  s1 = data[y0][x0] + data[y1][x1] + data[y2][x2]
  s2 = data[y2][x0] + data[y1][x1] + data[y0][x2] 
  
  if ((s1 === 'MAS' || s1 === 'SAM') && (s2 === 'MAS' || s2 === 'SAM')) {
    return true
  }
  return false
}

let count2 = 0
for (let i = 1; i < data.length - 1; i++) {
  for (let j = 1; j < data[i].length - 1; j++) {
    if (data[i][j] === 'A') {
      if (checkMas(data, [i, j])) {
          count2++
      }
    }
  }
}

console.log(count2) // part 2 answer
