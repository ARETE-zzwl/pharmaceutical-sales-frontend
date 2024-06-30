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
    </div>
    <div class="card" v-if="results.length">
      <h2>查询结果</h2>
      <ul>
        <li v-for="result in results" :key="result.statsId">
          销售ID: {{ result.statsId }} - 日期: {{ formatDate(result.statsDate) }} - 销售金额: {{ result.salesAmount }} - 采购金额: {{ result.purchaseAmount }} - 退货金额: {{ result.returnAmount }}
        </li>
      </ul>
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
      results: []
    };
  },
  methods: {
    searchSales() {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('未找到登录信息，请重新登录');
        this.$router.push({name: 'Login'});
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
</style>