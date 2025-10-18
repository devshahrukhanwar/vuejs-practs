<script lang="ts" setup>
import { shallowRef, onMounted } from 'vue';
import * as yup from 'yup';
import { ErrorMessage, Field, Form } from 'vee-validate';
import { useMachine, useCustomer } from '@/composables';
import type { Customer, Machine } from '@/composables';

const { getMachines, createMachine, toggleProducingStatus } = useMachine();
const { getCustomers } = useCustomer();

const toggling = shallowRef<boolean>(false);
const machines = shallowRef<Machine[]>([]);
const customers = shallowRef<Customer[]>([]);

const schema = yup.object({
  name: yup.string().required('*Name is required'),
  description: yup.string().required('*Description is required'),
  location: yup.string().required('*Location is required'),
  producing: yup.boolean().optional().default(false),
  customerId: yup.string().optional().default(''),
});

onMounted(async () => {
  machines.value = (await getMachines()) || [];
  customers.value = await getCustomers();
});

const handleAddMachine = async (
  values: Machine | Record<string, unknown>,
  { resetForm }: { resetForm: () => void }
) => {
  try {
    await createMachine(values as Machine);
    getMachines().then((data) => {
      machines.value = data || [];
    });
    resetForm();
  } catch (error) {
    console.error('Error adding machine:', error);
  }
};

const handleToggleStatus = async (id: string) => {
  try {
    toggling.value = true;
    await toggleProducingStatus(id);

    getMachines().then((data) => {
      machines.value = data || [];
    });
  } catch (error) {
    console.error('Error toggling machine status:', error);
  } finally {
    toggling.value = false;
  }
};
</script>

<template>
  <div>
    <div class="font-bold text-lg my-4">Machine Page</div>
    <section class="form grid grid-cols-2 gap-4 mb-6">
      <Form :validation-schema="schema" @submit="handleAddMachine" class="grid grid-cols-2 gap-4">
        <div class="col-span-1">
          <label for="name" class="block text-gray-700 font-bold mb-1">Name:</label>
          <Field name="name" type="text" id="name" class="border border-gray-300 rounded px-2 py-1 w-full" />
          <ErrorMessage name="name" class="text-red-500 text-sm mt-1" />
        </div>
        <div class="col-span-1">
          <label for="location" class="block text-gray-700 font-bold mb-1">Location:</label>
          <Field name="location" type="text" id="location" class="border border-gray-300 rounded px-2 py-1 w-full" />
          <ErrorMessage name="location" class="text-red-500 text-sm mt-1" />
        </div>
        <div class="col-span-2">
          <label for="description" class="block text-gray-700 font-bold mb-1">Description:</label>
          <Field name="description" type="text" id="description" class="border border-gray-300 rounded px-2 py-1 w-full" />
          <ErrorMessage name="description" class="text-red-500 text-sm mt-1" />
        </div>
        <div class="col-span-2 flex items-center mt-6">
          <Field name="producing" type="checkbox" id="producing" class="mr-2 leading-tight" :value="true" :unchecked-value="false" />
          <label for="producing" class="text-gray-700 font-bold">Producing</label>
        </div>
        <div class="col-span-2">
          <label for="customer" class="block text-gray-700 font-bold mb-1">Customer:</label>
          <Field as="select" name="customerId" id="customer" class="border border-gray-300 rounded px-2 py-1 w-full">
            <option value="">Select a customer</option>
            <option v-for="customer in customers" :key="customer.id" :value="customer.id">
              {{ customer.name }}
            </option>
          </Field>
          <ErrorMessage name="customerId" class="text-red-500 text-sm mt-1" />
        </div>
        <div class="col-span-2">
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
          >
            Add Machine
          </button>
        </div>
      </Form>
    </section>
    <table class="border-collapse border border-gray-400 w-full">
      <thead class="items-end">
        <tr>
          <th class="border border-gray-300">Name</th>
          <th class="border border-gray-300">Customer</th>
          <th class="border border-gray-300">Description</th>
          <th class="border border-gray-300">Location</th>
          <th class="border border-gray-300">Producing</th>
          <th class="border border-gray-300">Update Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="machine in machines" :key="machine.name">
          <td class="border border-gray-300 px-2">{{ machine.name }}</td>
          <td class="border border-gray-300 px-2">{{ machine.customer?.name || 'N/A' }}</td>
          <td class="border border-gray-300 px-2">{{ machine.description }}</td>
          <td class="border border-gray-300 px-2">{{ machine.location }}</td>
          <td class="border border-gray-300 px-2">{{ machine.producing ? 'Yes' : 'No' }}</td>
          <td class="border border-gray-300 px-2">
            <button
              class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 cursor-pointer"
              :disabled="toggling"
              @click="handleToggleStatus(machine.id)"
            >
              Toggle Status
            </button>
          </td>
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