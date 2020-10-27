<template>
  <div class="layout layout--one-screen bg-gray-lightest-5">
    <div :class="['layout-sidebar']">
      <ul class="layout-menu">
        <li class="layout-menu-item">
          <router-link to="subroute">Subroute</router-link>
        </li>
        <li class="layout-menu-item">
          <router-link to="subapp">Subapp</router-link>
        </li>
      </ul>
    </div>
    <div class="layout-content">
      <div class="layout-main">
        <div style="height: 500px;">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
}
</script>
