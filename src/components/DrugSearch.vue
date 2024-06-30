<template>
  <div class="container">
    <h1>药品搜索</h1>
    <div class="card">
      <h2>搜索药品</h2>
      <form @submit.prevent="searchDrug">
        <label for="name">药品名称:</label>
        <input type="text" id="name" v-model="query.name" />
        <button type="submit">搜索</button>
      </form>
    </div>
    <div class="card" v-if="results.length">
      <h2>搜索结果</h2>
      <table>
        <thead>
        <tr>
          <th>药品ID</th>
          <th>名称</th>
          <th>规格</th>
          <th>生产厂家</th>
          <th>批号</th>
          <th>有效期</th>
          <th>单价</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="result in results" :key="result.drugId">
          <td>{{ result.drugId }}</td>
          <td>{{ result.name }}</td>
          <td>{{ result.specification }}</td>
          <td>{{ result.manufacturer }}</td>
          <td>{{ result.batchNumber }}</td>
          <td>{{ formatDate(result.expirationDate) }}</td>
          <td>{{ result.unitPrice }}</td>
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
