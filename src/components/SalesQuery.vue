<template>
  <div class="container">
    <h1>销售查询</h1>
    <div class="card">
      <h2>查询条件</h2>
      <form @submit.prevent="searchSales">
        <label for="date">日期:</label>
        <input type="date" id="date" v-model="query.date" />
        <button type="submit">查询</button>
      </form>
      <form @submit.prevent="searchMonthlyStats">
        <label for="monthlyYear">年份:</label>
        <input type="number" id="monthlyYear" v-model="monthlyYear" />
        <button type="submit">查询该年每月财务报表</button>
      </form>
      <form @submit.prevent="searchYearlyStats">
        <label for="yearlyYear">年份:</label>
        <input type="number" id="yearlyYear" v-model="yearlyYear" />
        <button type="submit">查询该年财务报表</button>
      </form>
    </div>
    <div class="card" v-if="results.length">
      <h2>查询结果</h2>
      <button @click="hideResults">隐藏结果</button>
      <table>
        <thead>
        <tr>
          <th>销售ID</th>
          <th>日期</th>
          <th>销售金额</th>
          <th>采购金额</th>
          <th>退货金额</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="result in results" :key="result.statsId">
          <td>{{ result.statsId }}</td>
          <td>{{ formatDate(result.statsDate) }}</td>
          <td>{{ result.salesAmount }}</td>
          <td>{{ result.purchaseAmount }}</td>
          <td>{{ result.returnAmount }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="card" v-if="monthlyStats.length">
      <h2>该年每月财务报表</h2>
      <button @click="hideMonthlyStats">隐藏结果</button>
      <table>
        <thead>
        <tr>
          <th>年份</th>
          <th>月份</th>
          <th>销售金额</th>
          <th>采购金额</th>
          <th>退货金额</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="stat in monthlyStats" :key="stat.month">
          <td>{{ stat.year }}</td>
          <td>{{ stat.month }}</td>
          <td>{{ stat.totalSales }}</td>
          <td>{{ stat.totalPurchases }}</td>
          <td>{{ stat.totalReturns }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="card" v-if="yearlyStats">
      <h2>该年总财务报表</h2>
      <button @click="hideYearlyStats">隐藏结果</button>
      <table>
        <thead>
        <tr>
          <th>年份</th>
          <th>销售金额</th>
          <th>采购金额</th>
          <th>退货金额</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{ yearlyStats.year }}</td>
          <td>{{ yearlyStats.totalSales }}</td>
          <td>{{ yearlyStats.totalPurchases }}</td>
          <td>{{ yearlyStats.totalReturns }}</td>
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
      yearlyStats: null
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
            this.results = response.data;
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
