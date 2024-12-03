const fs = require('node:fs');

const safe = []

// version 1 of safeArr
function safeArr (arr) {
  let result = true
  let val = arr[0]
  let expectedDirection = null
  for (let i = 1; i < arr.length; i++) {
    const diff = val - arr[i]
    const direction = diff > 0 ? 'descreasing' : 'increasing'
    console.log(diff, expectedDirection)
    if (diff === 0 || Math.abs(diff) > 3 || (expectedDirection && expectedDirection != direction)) {
      result = false
      break
    }
    expectedDirection = direction
    val = arr[i]
  }
  return result
}

function unsafeCount (arr) {
  let unsafe = 0
  let val = arr[0]
  let expectedDirection = null
  for (let i = 1; i < arr.length; i++) {
    const diff = val - arr[i]
    const direction = diff > 0 ? 'descreasing' : 'increasing'
    if (diff === 0 || Math.abs(diff) > 3 || (expectedDirection && expectedDirection != direction)) {
      unsafe += 1
    } else {
      expectedDirection = direction
      val = arr[i]
    }
  }
  return unsafe
}

fs
  .readFileSync('input.txt', 'utf8')
  .split(/\r?\n/)
  .filter(n => n)
  .forEach((s) => {
    lst = s.split(' ').map((val) => parseInt(val))
    if (safeArr(lst)) {
      safe.push(lst)
    } else {
      for (let i = 0; i < lst.length; i++) {
        lstModified = lst.slice(0, i).concat(lst.slice(i+1))
        if (safeArr(lstModified)) {
          safe.push(lst)
          break
        }
      }
    }
  });

console.log(safe.length)