<template>
  <div>
    <h1>药品检索</h1>
    <div>
      <label for="searchName">药品名称：</label>
      <input v-model="searchName" id="searchName" placeholder="输入药品名称" />
      <button @click="searchDrugs">搜索</button>
    </div>

    <div v-if="drugs.length">
      <h3>检索结果：</h3>
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
import { parseISO, format } from 'date-fns';

export default {
  data() {
    return {
      searchName: '',
      drugs: []
    };
  },
  methods: {
    searchDrugs() {
      axios
          .get('/api/drugs/search', {
            params: {
              name: this.searchName
            }
          })
          .then(response => {
            this.drugs = response.data;
          })
          .catch(error => {
            console.error('药品检索出错:', error);
          });
    },
    formatDate(dateString) {
      if (!dateString) {
        return 'Invalid Date';
      }
      try {
        const date = parseISO(dateString);
        return format(date, 'yyyy-MM-dd');
      } catch (error) {
        console.error('日期格式化错误:', error);
        return 'Invalid Date';
      }
    }
  }
};
</script>

<style scoped>
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
