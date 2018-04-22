export const findMatches = lines => {
  const matches = []
  if (lines.length < 2) {
    return matches
  }
  for (let i = 0; i < 10; i++) {
    for (let j = i + 2; j < 10; j++) {
      for (let k = j + 2; k < 10; k++) {
        for (let index = 0; index < 10; index++) {
          if (index === i || index === j || index === k) {
            continue
          }
          let match = true
          for (let l = 0; l < lines.length - 1; l++) {
            const number = lines[l + 1][index]
            if (!(number === lines[l][i] || number === lines[l][j] || number === lines[l][k])) {
              match = false
            }
          }
          if (match) {
            let according = 0
            if (lines[1][index] === lines[0][i]) {
              according = i
            } else if (lines[1][index] === lines[0][j]) {
              according = j
            } else if (lines[1][index] === lines[0][k]) {
              according = k
            }
            matches.push([i + 1, j + 1, k + 1, according + 1, index + 1, lines[0][index]])
          }
        }
      }
    }
  }
  return matches
}

export const validateInput = input => {
  const lines = input.split(/(?:\s*\n\s*)+/).filter(line => line.length > 0)
  if (lines.length < 2) {
    return { result: false, data: `至少要 2 行数据, 你只输入了 ${lines.length} 行` }
  }
  let numbers = []
  for (const line of lines) {
    let items = line.split(/[ ]*(?:,|\t| )[ ]*/).filter(item => item.length > 0)
    if (items.length < 10) {
      return { result: false, data: `每行至少有 10 条数据，这一行数据不够：${line}` }
    }

    const digits = items.map(digit => parseInt(digit)).filter(digit => !isNaN(digit))
    if (digits.length < items.length) {
      return { result: false, data: `这一行有非法数据：${line}` }
    }

    numbers.push(digits)
  }
  return { result: true, data: numbers }
}
