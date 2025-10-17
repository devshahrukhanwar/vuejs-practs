<script lang="ts" setup>
import { shallowRef, onMounted } from 'vue';
import { useUser } from '@/composables/useUser';

const users = shallowRef([]);
const { getUsers } = useUser();

onMounted(async () => {
  const fetchedUsers = await getUsers();
  if (fetchedUsers) {
    users.value = fetchedUsers;
  }
});

</script>

<template>
  <div>
    <h1>Home</h1>
    <p class="p-4">Welcome to the Home Page!</p>
    <div v-for="user in users">{{ user.email }}</div>
  </div>
</template>

<style scoped>
h1 {
  color: #42b983;
}
</style>