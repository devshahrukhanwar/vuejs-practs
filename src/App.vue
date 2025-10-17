<script setup lang="ts">
import { TopNav } from '@/components';
</script>

<template>
  <div class="m-4">
    <TopNav />
    <div class="container mx-auto px-4 py-6">
      <section class="container">
        <router-view />
      </section>
    </div>
  </div>
</template>

<style scoped></style>
