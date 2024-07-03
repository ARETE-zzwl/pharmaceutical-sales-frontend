<template>
  <div class="max-w-4xl mx-auto p-5">
    <h1 class="text-4xl font-bold mb-6 text-center">财务报表查询</h1>
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 class="text-2xl font-semibold mb-4">查询条件</h2>
      <form @submit.prevent="searchSales" class="mb-4">
        <div class="mb-4">
          <label for="date" class="block text-lg font-medium mb-2">日期:</label>
          <input type="date" id="date" v-model="query.date" class="form-input mt-1 block w-full" />
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">查询</button>
      </form>
      <form @submit.prevent="searchMonthlyStats" class="mb-4">
        <div class="mb-4">
          <label for="monthlyYear" class="block text-lg font-medium mb-2">年份:</label>
          <input type="number" id="monthlyYear" v-model="monthlyYear" class="form-input mt-1 block w-full" />
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">查询该年每月财务报表</button>
      </form>
      <form @submit.prevent="searchYearlyStats">
        <div class="mb-4">
          <label for="yearlyYear" class="block text-lg font-medium mb-2">年份:</label>
          <input type="number" id="yearlyYear" v-model="yearlyYear" class="form-input mt-1 block w-full" />
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">查询该年财务报表</button>
      </form>
    </div>
    <div v-if="results.length" class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 class="text-2xl font-semibold mb-4">查询结果</h2>
      <button @click="hideResults" class="bg-red-500 text-white px-4 py-2 rounded mb-4">隐藏结果</button>
      <table class="min-w-full bg-white">
        <thead>
        <tr>
          <th class="py-2">销售ID</th>
          <th class="py-2">日期</th>
          <th class="py-2">销售金额</th>
          <th class="py-2">采购金额</th>
          <th class="py-2">退货金额</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="result in results" :key="result.statsId">
          <td class="border px-4 py-2">{{ result.statsId }}</td>
          <td class="border px-4 py-2">{{ formatDate(result.statsDate) }}</td>
          <td class="border px-4 py-2">{{ result.salesAmount }}</td>
          <td class="border px-4 py-2">{{ result.purchaseAmount }}</td>
          <td class="border px-4 py-2">{{ result.returnAmount }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="searched" class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 class="text-2xl font-semibold mb-4">查询结果</h2>
      <p class="text-center text-gray-500">没有找到相关记录</p>
    </div>
    <div v-if="monthlyStats.length" class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 class="text-2xl font-semibold mb-4">该年每月财务报表</h2>
      <button @click="hideMonthlyStats" class="bg-red-500 text-white px-4 py-2 rounded mb-4">隐藏结果</button>
      <table class="min-w-full bg-white">
        <thead>
        <tr>
          <th class="py-2">年份</th>
          <th class="py-2">月份</th>
          <th class="py-2">销售金额</th>
          <th class="py-2">采购金额</th>
          <th class="py-2">退货金额</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="stat in monthlyStats" :key="stat.month">
          <td class="border px-4 py-2">{{ stat.year }}</td>
          <td class="border px-4 py-2">{{ stat.month }}</td>
          <td class="border px-4 py-2">{{ stat.totalSales }}</td>
          <td class="border px-4 py-2">{{ stat.totalPurchases }}</td>
          <td class="border px-4 py-2">{{ stat.totalReturns }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-if="yearlyStats" class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 class="text-2xl font-semibold mb-4">该年总财务报表</h2>
      <button @click="hideYearlyStats" class="bg-red-500 text-white px-4 py-2 rounded mb-4">隐藏结果</button>
      <table class="min-w-full bg-white">
        <thead>
        <tr>
          <th class="py-2">年份</th>
          <th class="py-2">销售金额</th>
          <th class="py-2">采购金额</th>
          <th class="py-2">退货金额</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="border px-4 py-2">{{ yearlyStats.year }}</td>
          <td class="border px-4 py-2">{{ yearlyStats.totalSales }}</td>
          <td class="border px-4 py-2">{{ yearlyStats.totalPurchases }}</td>
          <td class="border px-4 py-2">{{ yearlyStats.totalReturns }}</td>
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
        date: ''
      },
      monthlyYear: '',
      yearlyYear: '',
      results: [],
      monthlyStats: [],
      yearlyStats: null,
      searched: false
    };
  },
  methods: {
    searchSales() {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('未找到登录信息，请重新登录');
        this.$router.push({ name: 'Login' });
        return;
      }

      axios
          .get('/api/financialstats/byDate', {
            headers: {
              'Authorization': token
            },
            params: {
              statsDate: this.query.date
            }
          })
          .then(response => {
            this.results = response.data.content;
            this.searched = true;
          })
          .catch(error => {
            console.error('查询失败:', error);
            alert('查询失败，请重试');
          });
    },
    searchMonthlyStats() {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('未找到登录信息，请重新登录');
        this.$router.push({ name: 'Login' });
        return;
      }

      axios
          .get('/api/financialstats/monthlyStats', {
            headers: {
              'Authorization': token
            },
            params: {
              year: this.monthlyYear
            }
          })
          .then(response => {
            this.monthlyStats = response.data;
          })
          .catch(error => {
            console.error('查询失败:', error);
            alert('查询失败，请重试');
          });
    },
    searchYearlyStats() {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('未找到登录信息，请重新登录');
        this.$router.push({ name: 'Login' });
        return;
      }

      axios
          .get('/api/financialstats/yearlyStats', {
            headers: {
              'Authorization': token
            },
            params: {
              year: this.yearlyYear
            }
          })
          .then(response => {
            this.yearlyStats = response.data[0];
          })
          .catch(error => {
            console.error('查询失败:', error);
            alert('查询失败，请重试');
          });
    },
    hideResults() {
      this.results = [];
      this.searched = false;
    },
    hideMonthlyStats() {
      this.monthlyStats = [];
    },
    hideYearlyStats() {
      this.yearlyStats = null;
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
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;
}

h2 {
  margin-top: 0;
}

form {
  display: flex;
  flex-direction: column;
}

form label {
  margin-bottom: 10px;
}

form input {
  margin-left: 10px;
}

form button {
  margin-top: 10px;
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
