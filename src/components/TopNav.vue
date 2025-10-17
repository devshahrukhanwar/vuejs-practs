<template>
  <nav class="top-nav">
    <ul>
      <li v-for="item in navItems" :key="item.name">
        <a @click="$router.push(item.link)">{{ item.name }}</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface NavItem {
  name: string
  link: string
}

const navItems = ref<NavItem[]>([
  { name: 'Home', link: '/' },
  { name: 'About', link: '/about' },
  { name: 'Contact', link: '/contact' },
  { name: 'Customers', link: '/customers' },
])
</script>

<style scoped>
.top-nav {
  cursor: pointer;
  background: #333;
  padding: 1rem;
}
.top-nav ul {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
}
.top-nav a {
  color: #fff;
  text-decoration: none;
}
</style>