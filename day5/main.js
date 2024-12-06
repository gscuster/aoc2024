const fs = require('node:fs');

const data = fs
  .readFileSync('input.txt', 'utf8');

[rawRules, rawOrders] = data.split('\n\n')

const ruleArr = []
rawRules
  .split('\n')
  .forEach((s) => {
    const [s1, s2] = s.split('|')
    const v1 = parseInt(s1)
    const v2 = parseInt(s2)
    if (!ruleArr[v1]) ruleArr[v1] = []
    if (!ruleArr[v2]) ruleArr[v2] = []
    ruleArr[v2][v1] = true
  })

const orders = rawOrders
  .split('\n')
  .filter(n => n)
  .map(s => s.split(',').map(v => parseInt(v)))

function validOrder (ruleArr, order) {
  for (let i = 0; i < order.length - 1; i++) {
    for (let j = i + 1; j < order.length; j++) {
      if (ruleArr[order[i]][order[j]]) {
        return false
      }
    }
  }
  return true
}

function fixOrder (ruleArr, order) {
  result = [...order]
  for (let i = 0; i < result.length - 1; i++) {
    for (let j = result.length -1; j > i; j--) {
      if (ruleArr[result[i]][result[j]]) {
        result.splice(j+1, 0, result[i]) // Copy the ith element after j
        result.splice(i, 1) // Delete the ith element
        i-- // Adjust i since we removed it (don't skip the next element)
        break
      }
    }
  }
  return result
}

let sum = 0
let sum2 = 0
for (let i = 0; i < orders.length; i++) {
  const middleIdx = Math.floor(orders[i].length / 2)
  if (validOrder(ruleArr, orders[i])) {
    sum += orders[i][middleIdx]
  } else {
    let fixedOrder = fixOrder(ruleArr, orders[i])
    sum2 += fixedOrder[middleIdx]
  }
}
console.log(sum)
console.log(sum2)
