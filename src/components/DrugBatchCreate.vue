<template>
  <div class="container mx-auto p-5">
    <h2 class="text-3xl font-bold mb-5 text-center text-indigo-600">批量添加药品</h2>
    <form @submit.prevent="createDrugs" class="space-y-6">
      <div v-for="(drug, index) in drugs" :key="index" class="bg-white p-6 rounded-lg shadow-lg space-y-4">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <label class="block">
            <span class="text-gray-700">药品名称:</span>
            <input v-model="drug.name" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </label>
          <label class="block">
            <span class="text-gray-700">规格:</span>
            <input v-model="drug.specification" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </label>
          <label class="block">
            <span class="text-gray-700">生产商:</span>
            <input v-model="drug.manufacturer" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </label>
          <label class="block">
            <span class="text-gray-700">批号:</span>
            <input v-model="drug.batchNumber" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </label>
          <label class="block">
            <span class="text-gray-700">过期日期:</span>
            <input v-model="drug.expirationDate" type="date" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </label>
          <label class="block">
            <span class="text-gray-700">单价:</span>
            <input v-model="drug.unitPrice" type="number" step="0.01" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </label>
        </div>
        <button type="button" @click="removeDrug(index)" class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">移除药品</button>
      </div>
      <div class="flex justify-between">
        <button type="button" @click="addDrug" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">添加药品</button>
        <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">提交</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      drugs: [
        {
          name: '',
          specification: '',
          manufacturer: '',
          batchNumber: '',
          expirationDate: '',
          unitPrice: 0
        }
      ]
    };
  },
  methods: {
    addDrug() {
      this.drugs.push({
        name: '',
        specification: '',
        manufacturer: '',
        batchNumber: '',
        expirationDate: '',
        unitPrice: 0
      });
    },
    removeDrug(index) {
      this.drugs.splice(index, 1);
    },
    createDrugs() {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = token;
      axios
          .post('/api/drugs/batch', this.drugs)
          .then(response => {
            console.log('批量添加药品成功:', response.data);
            alert('批量添加药品成功');
          })
          .catch(error => {
            console.error('批量添加药品失败:', error);
            alert('批量添加药品失败，请重试');
          });
    }
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css');

.container {
  max-width: 800px;
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
}
</style>
