import Vue from 'vue/dist/vue.js'

const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    numbers: `
1,6,7,5,3,2,4,10,8,9
8,6,7,3,5,9,1,2,4,10
5,3,4,6,8,2,7,1,10,9
6,5,9,7,4,10,8,2,1,3
    `.trim()
  }
})

console.log(app)
