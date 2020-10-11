<template>
  <div>
    <AppBar />
    <router-view />
  </div>
</template>

<script>
import AppBar from '@/components/AppBar';

export default {
  components: {
    AppBar
  }
}
</script>