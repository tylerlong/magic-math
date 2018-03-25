import Vue from 'vue/dist/vue.js'
import { findMatches, validateInput } from './utils'

const app = new Vue({
  el: '#app',
  data: {
    input: '',
    start: 1
  },
  computed: {
    result: function () {
      const { result, data } = validateInput(this.input)
      if (result === false) {
        return data
      }
      let numbers = data

      const start = parseInt(this.start)
      if (start < 1 || start + 3 > numbers.length) {
        return '选择的行超出了数据范围'
      }

      numbers = numbers.slice(start - 1, start + 3)
      console.log(numbers)
      const matches = findMatches(numbers)

      let str = '比较的 4 行数据为：\n'
      str += '1	2	3	4	5	6	7	8	9	10\n'
      str += '==================================================================================\n'
      str += numbers.map(line => line.join('\t')).join('\n')
      str += '\n\n比较结果为：\n'
      str += '==================================================================================\n'
      str += matches.map(match => `第 ${match[0]}、${match[1]}、${match[2]} 列根据第 ${match[3]} 列筛选得出结果：${match[4]}`).join('\n')
      return str
    }
  }
})

// below is for testing purpose

app.input = `
1	6	7	5	3	2	4	10	8	9
8	6	7	3	5	9	1	2	4	10
5	3	4	6	8	2	7	1	10	9
6	5	9	7	4	10	8	2	1	3
1	6	7	5	3	2	4	10	8	9
8	6	7	3	5	9	1	2	4	10
5	3	4	6	8	2	7	1	10	9
6	5	9	7	4	10	8	2	1	3
1	6	7	5	3	2	4	10	8	9
8	6	7	3	5	9	1	2	4	10
5	3	4	6	8	2	7	1	10	9
6	5	9	7	4	10	8	2	1	3
`.trim()

app.$watch('input', () => {
  app.start = 1
})
