import Vue from 'vue'

function vueRender({ loading }) {
  return new Vue({
    el: '#subapp',
    data() {
      return {
        loading
      }
    },
    template: `
      <div id="subapp" class="subapp-loader">
        <h4 v-if="loading" class="subapp-loading">Loading...</h4>
        <div id="subapp-viewport"></div>
      </div>
    `
  })
}

let app = null

export default function render({ loading }) {
  if (!app) {
    app = vueRender({ loading })
  } else {
    app.loading = loading
  }
}
