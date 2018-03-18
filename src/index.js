import Vue from 'vue/dist/vue.js'

const app = new Vue({
  el: '#app',
  data: {
    input: ''
  },
  computed: {
    result: function () {
      const lines = this.input.split(/(?:\s*\n\s*)+/).filter(line => line.length > 0)
      if (lines.length < 4) {
        return `至少要 4 行数据, 你只输入了 ${lines.length} 行`
      }
      const numbers = []
      for (const line of lines) {
        let items = line.split(/[ ]*(?:,|\t| )[ ]*/).filter(item => item.length > 0)
        if (items.length < 10) {
          return `每行至少有 10 条数据，这一行数据不够：${line}`
        }

        const digits = items.map(digit => parseInt(digit)).filter(digit => !isNaN(digit))
        if (digits.length < items.length) {
          return `这一行有非法数据：${line}`
        }

        numbers.push(digits)
        if (numbers.length >= 4) {
          break
        }
      }

      const matches = []
      for (let i = 0; i < 10; i++) {
        for (let j = i + 2; j < 10; j++) {
          for (let k = j + 2; k < 10; k++) {
            const col = i
            const i1 = numbers[0][col]
            const idx = numbers[1].indexOf(i1)
            const i3 = numbers[2][idx]
            const i4 = numbers[3][idx]
            if (i3 === numbers[1][i] || i3 === numbers[1][j] || i3 === numbers[1][k]) {
              if (i4 === numbers[2][i] || i4 === numbers[2][j] || i4 === numbers[2][k]) {
                matches.push([i + 1, j + 1, k + 1, col + 1, numbers[0][idx]])
              }
            }
          }
        }
      }

      return matches.map(match => `第 ${match[0]}、${match[1]}、${match[2]} 列根据第 ${match[3]} 列筛选得出结果：${match[4]}`).join('\n')
    }
  }
})

// below is for testing purpose

app.input = `
1,6,7,5,3,2,4,10,8,9
8,6,7,3,5,9,1,2,4,10
5,3,4,6,8,2,7,1,10,9
6,5,9,7,4,10,8,2,1,3
`.trim()
