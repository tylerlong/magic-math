import Vue from 'vue/dist/vue.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import moment from 'moment'

import { findMatches, validateInput } from './utils'

Vue.use(ElementUI)

const app = new Vue({
  el: '#app',
  data: {
    input: '',
    start: 1,
    count: 4
  },
  computed: {
    result: function () {
      const { result, data } = validateInput(this.input)
      if (result === false) {
        return data
      }
      let lines = data

      const start = parseInt(this.start)
      const count = parseInt(this.count)
      if (count < 2) {
        return '至少要比较2行'
      }
      if (start < 1 || start + count - 1 > lines.length) {
        return '选择的行超出了数据范围'
      }

      lines = lines.slice(start - 1, start + count - 1)
      console.log(lines)
      const matches = findMatches(lines)

      let str = `比较的 ${count} 行数据为：\n`
      str += '1	2	3	4	5	6	7	8	9	10\n'
      str += '==================================================================================\n'
      str += lines.map(line => line.join('\t')).join('\n')
      str += '\n\n比较结果为：\n'
      str += '==================================================================================\n'
      str += matches.map(match => `第 ${match[0]}、${match[1]}、${match[2]} 列根据第 ${match[3]} 列筛选得出第 ${match[4]} 列符合要求，结果是 ${match[5]}`).join('\n')
      return str
    }
  },
  methods: {
    promptForPassword () {
      this.$prompt('请输入你的密码', '安全验证', {
        showCancelButton: false,
        showClose: false,
        confirmButtonText: '确定',
        inputPattern: /password\d{8}/,
        inputValidator: (input) => {
          if (input.substring(8) === moment().format('YYYYMMDD')) {
            return true
          }
          return false
        },
        inputErrorMessage: '密码不正确',
        lockScroll: true,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        closeOnHashChange: false,
        inputType: 'password'
      }).then(value => {
        // this.$message({
        //   type: 'success',
        //   message: 'Your email is:' + value
        // })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: 'Input canceled'
        // })
      })
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

app.promptForPassword()
setInterval(() => {
  app.promptForPassword()
}, 43200000)
