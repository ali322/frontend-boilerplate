<template>
  <div id="subapp" class="subapp" style="height:500px;"></div>
</template>
<script>
import { registerMicroApps, start } from 'qiankun'
import render from '../lib/render'

const loader = loading => render({ loading })

export default {
  mounted() {
    registerMicroApps([
      {
        name: 'todo',
        entry: '//localhost:5000',
        loader,
        container: '#subapp',
        activeRule: '/todo'
      }
    ], {
      beforeLoad: [
        app => {
          console.log('[LifeCycle] before load %c%s', 'color: green;', app.name)
        }
      ],
      beforeMount: [
        app => {
          console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
        }
      ],
      afterUnmount: [
        app => {
          console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
        }
      ]
    })
    start()
  }
}
</script>
