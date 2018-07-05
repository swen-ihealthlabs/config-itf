<template>
  <div>
    <!-- <router-link  to="/abpm"> -->
    <!-- <Button type="ghost"></Button> -->
    <!-- </router-link> -->
    <Button type="ghost" @click="goto('/abpm')">ABPM</Button>
  </div>
</template>

<script>
export default {
  methods: {
    goto(path) {
      this.$router.push(path);
    }
  }
};
</script>
