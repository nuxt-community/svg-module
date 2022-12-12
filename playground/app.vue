<template>
  <div class="list">
    <div class="item">
      <Logo />
    </div>
  </div>
</template>

<script setup>
import Logo from '~/assets/nuxt.svg?inline'
</script>

<style>
.list {
  display: flex;
}

.item {
  width: 25%;
  border: 1px solid #ccc;
}
</style>

