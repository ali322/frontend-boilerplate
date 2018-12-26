<template>
  <main>
    <transition :name="transition">
      <router-view></router-view>
    </transition>
  </main>
</template>

<script>
export default {
  data() {
    return {
      transition: 'slide-right'
    }
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transition = toDepth > fromDepth ? 'slide-right' : 'slide-left'
    }
  }
}
</script>

<style>
.slide-left-enter-active{
  position: absolute;
  transition: transform .5s;
  opacity: 1;
}
.slide-left-enter{
  transform: translateX(-100%)
}
.slide-left-leave-to{
  opacity: 1;
}
</style>
