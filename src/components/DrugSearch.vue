<template>
  <div class="container mx-auto p-5">
    <h1 class="text-3xl font-bold mb-5 text-center text-indigo-600">药品搜索</h1>
    <div class="card bg-white p-6 rounded-lg shadow-lg mb-6">
      <h2 class="text-2xl font-bold mb-4">搜索药品</h2>
      <form @submit.prevent="searchDrug" class="space-y-4">
        <label for="name" class="block text-gray-700">
          药品名称:
          <input type="text" id="name" v-model="query.name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </label>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">搜索</button>
      </form>
    </div>
    <div v-if="results.length" class="card bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold mb-4">搜索结果</h2>
      <table class="min-w-full bg-white">
        <thead>
        <tr>
          <th class="py-2 px-4 border-b border-gray-300">药品ID</th>
          <th class="py-2 px-4 border-b border-gray-300">名称</th>
          <th class="py-2 px-4 border-b border-gray-300">规格</th>
          <th class="py-2 px-4 border-b border-gray-300">生产厂家</th>
          <th class="py-2 px-4 border-b border-gray-300">批号</th>
          <th class="py-2 px-4 border-b border-gray-300">有效期</th>
          <th class="py-2 px-4 border-b border-gray-300">单价</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="result in results" :key="result.drugId">
          <td class="py-2 px-4 border-b border-gray-300">{{ result.drugId }}</td>
          <td class="py-2 px-4 border-b border-gray-300">{{ result.name }}</td>
          <td class="py-2 px-4 border-b border-gray-300">{{ result.specification }}</td>
          <td class="py-2 px-4 border-b border-gray-300">{{ result.manufacturer }}</td>
          <td class="py-2 px-4 border-b border-gray-300">{{ result.batchNumber }}</td>
          <td class="py-2 px-4 border-b border-gray-300">{{ formatDate(result.expirationDate) }}</td>
          <td class="py-2 px-4 border-b border-gray-300">{{ result.unitPrice }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      query: {
        name: ''
      },
      results: []
    };
  },
  methods: {
    searchDrug() {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('未找到登录信息，请重新登录');
        this.$router.push({ name: 'Login' });
        return;
      }

      axios
          .get('/api/drugs/search', {
            headers: {
              'Authorization': token
            },
            params: {
              name: this.query.name
            }
          })
          .then(response => {
            this.results = response.data;
          })
          .catch(error => {
            console.error('搜索失败:', error);
            alert('搜索失败，请重试');
          });
    },
    formatDate(dateString) {
      if (!dateString) {
        return 'Invalid Date';
      }
      try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
          return 'Invalid Date';
        }
        return date.toLocaleDateString();
      } catch (error) {
        console.error('日期格式化错误:', error);
        return 'Invalid Date';
      }
    }
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css');

.container {
  max-width: 800px;
}

.card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f4f4f4;
}
</style>
