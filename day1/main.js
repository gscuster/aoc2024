const fs = require('node:fs');
const l1 = []
const l2 = []

fs
  .readFileSync('input.txt', 'utf8')
  .split(/\r?\n/)
  .forEach((s) => {
    const [v1, v2] = s.split('   ')
    if (v1) {
      l1.push(parseInt(v1))
      l2.push(parseInt(v2))
    }
  });

l1.sort()
l2.sort()

rmap = {}
let sum = 0
for (i = 0; i < l1.length; i++) {
  sum += Math.abs(l1[i] - l2[i])
  if (rmap[l2[i]]) {
    rmap[l2[i]]++
  } else {
    rmap[l2[i]] = 1
  }
}

console.log(sum) // Part 1 answer

let similarity = 0
l1.forEach((val) => {
  if (rmap[val]) {
    similarity += val * rmap[val]
  }
})

console.log(similarity) // Part 2 answer