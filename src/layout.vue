<style type="text/css">
.layout {
  position: relative;
}

.layout-sidebar {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1031;
  width: 240px;
  visibility: visible;
  opacity: 1;
  transition: all 0.15s;
}

.layout-content {
  position: relative;
  height: 100%;
  transition: all 0.15s;
}

.layout--one-screen {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.layout--one-screen .layout-sidebar {
  position: fixed;
}

.layout--one-screen .layout-main {
  position: absolute;
  right: 0;
  left: 0;
  overflow: auto;
}
</style>
<template>
  <div class="layout layout--one-screen bg-gray-lightest-5">
    <div :class="['layout-sidebar']">
      <ul>
        <li>
          <router-link to="index">Index</router-link>
        </li>
        <li>
          <router-link to="subapp">Subapp</router-link>
        </li>
      </ul>
    </div>
    <div class="layout-content">
      <div class="layout-main" style="top: 10px; bottom: 50px;">
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
