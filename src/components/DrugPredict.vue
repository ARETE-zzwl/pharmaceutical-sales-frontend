<template>
  <div class="container mx-auto p-5">
    <h1 class="text-3xl font-bold mb-5 text-center text-indigo-600">药品库存AI预测</h1>
    <form @submit.prevent="predictAllInventories" class="space-y-4">
      <label class="block">
        <span class="text-gray-700">预测天数:</span>
        <input type="number" v-model="days" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </label>
      <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">预测</button>
    </form>

    <div v-if="loading" class="loading-overlay flex justify-center items-center">
      <div class="spinner"></div>
    </div>

    <div v-if="predictionResults.length && !loading" class="card mt-6">
      <h2 class="text-2xl font-bold mb-4">预测结果</h2>
      <table class="min-w-full bg-white">
        <thead>
        <tr>
          <th class="py-2 px-4 border-b border-gray-300">药品ID</th>
          <th class="py-2 px-4 border-b border-gray-300">药品名称</th>
          <th class="py-2 px-4 border-b border-gray-300">{{ days }} 天后的预测库存量</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="result in predictionResults" :key="result.drugId">
          <td class="py-2 px-4 border-b border-gray-300">{{ result.drugId }}</td>
          <td class="py-2 px-4 border-b border-gray-300">{{ result.drugName }}</td>
          <td :class="{ 'text-red-500': result.predictedQuantity < 200 && !isNaN(result.predictedQuantity) }" class="py-2 px-4 border-b border-gray-300">
            {{ result.predictedQuantity }}
          </td>
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
      drugs: [],
      days: null,
      predictionResults: [],
      loading: false
    };
  },
  created() {
    this.fetchDrugs();
  },
  methods: {
    fetchDrugs() {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('未找到登录信息，请重新登录');
        this.$router.push({ name: 'Login' });
        return;
      }

      axios
          .get('/api/drugs', {
            headers: {
              'Authorization': token
            }
          })
          .then(response => {
            this.drugs = response.data.content || [];
          })
          .catch(error => {
            console.error('获取药品信息失败:', error);
            alert('获取药品信息失败，请重试');
          });
    },
    predictAllInventories() {
      this.loading = true;
      const token = localStorage.getItem('token');
      if (!token) {
        alert('未找到登录信息，请重新登录');
        this.$router.push({ name: 'Login' });
        return;
      }

      const promises = this.drugs.map(drug => {
        return axios.get(`/api/inventories/${drug.drugId}/predict`, {
          headers: {
            'Authorization': token
          },
          params: {
            days: this.days
          }
        }).then(response => {
          return {
            drugId: drug.drugId,
            drugName: drug.name,
            predictedQuantity: response.data
          };
        }).catch(error => {
          console.error(`预测药品 ${drug.name} 失败:`, error);
          return {
            drugId: drug.drugId,
            drugName: drug.name,
            predictedQuantity: '预测失败'
          };
        });
      });

      Promise.all(promises).then(results => {
        this.predictionResults = results;
        this.loading = false;
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

.card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  z-index: 1000;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
