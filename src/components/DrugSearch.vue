<template>
  <div>
    <h1>药品检索</h1>
    <form @submit.prevent="searchDrug">
      <label>
        药品名称:
        <input v-model="drugName" type="text" required />
      </label>
      <button type="submit">搜索</button>
    </form>

    <div v-if="drugs.length">
      <h2>搜索结果:</h2>
      <table>
        <thead>
        <tr>
          <th>药品ID</th>
          <th>药品名称</th>
          <th>规格</th>
          <th>生产商</th>
          <th>批号</th>
          <th>过期日期</th>
          <th>单价</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="drug in drugs" :key="drug.drugId">
          <td>{{ drug.drugId }}</td>
          <td>{{ drug.name }}</td>
          <td>{{ drug.specification }}</td>
          <td>{{ drug.manufacturer }}</td>
          <td>{{ drug.batchNumber }}</td>
          <td>{{ formatDate(drug.expirationDate) }}</td>
          <td>{{ drug.unitPrice }}</td>
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
      drugName: '',
      drugs: []
    };
  },
  methods: {
    searchDrug() {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios
          .get('/api/drugs/search', {
            params: {
              name: this.drugName
            }
          })
          .then(response => {
            this.drugs = response.data;
          })
          .catch(error => {
            console.error('药品检索出错:', error);
            alert('药品检索出错，请重试');
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
form {
  margin-top: 20px;
}
form label {
  display: block;
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
table, th, td {
  border: 1px solid black;
}
th, td {
  padding: 10px;
  text-align: left;
}
</style>
