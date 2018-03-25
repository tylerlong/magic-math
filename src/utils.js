const findMatches = lines => {
  const matches = []
  if (lines.length < 2) {
    return matches
  }
  for (let i = 0; i < 10; i++) {
    for (let j = i + 2; j < 10; j++) {
      for (let k = j + 2; k < 10; k++) {
        for (let index = 0; index < 10; index++) {
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
            matches.push([i + 1, j + 1, k + 1, according + 1, lines[0][index]])
          }
        }
      }
    }
  }
  return matches
}

module.exports = { findMatches }
