<script lang="ts" setup>
import { shallowRef, onMounted, ref } from 'vue';
import { useCustomer } from '@/composables';
import { Customer } from '@/composables/useCustomer/schema';

const customers = shallowRef<Customer[]>([]);
const { getCustomers } = useCustomer();

onMounted(async () => {
  customers.value = await getCustomers();
});

const search = ref<string>('');
const searchCustomers = async () => {
  customers.value = await getCustomers(search.value);
};
</script>

<template>
  <div>
    <div class="font-bold text-lg my-4">Customer Page</div>
    <div class="search-bar">
      <input
        v-model="search"
        type="text"
        placeholder="Search customers..."
        class="border border-gray-300 rounded px-2 py-1 mb-4 w-full"
        @keyup.passive="searchCustomers"
      />
    </div>
    <table class="border-collapse border border-gray-400 w-full">
      <thead class="items-end">
        <tr>
          <th class="border border-gray-300">Name</th>
          <th class="border border-gray-300">Email</th>
          <th class="border border-gray-300">Machines</th>
          <th class="border border-gray-300">Phone</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.id">
          <td class="border border-gray-300 px-2">{{ customer.name }}</td>
          <td class="border border-gray-300 px-2">{{ customer.email }}</td>
          <td class="border border-gray-300 px-2">{{ customer?.machines?.map(machine => machine.name).join(', ') }}</td>
          <td class="border border-gray-300 px-2">{{ customer.phone }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
h1 {
  color: #42b983;
}
</style>