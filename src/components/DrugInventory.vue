<template>
  <div class="container">
    <h1>药品库存</h1>
    <div class="card">
      <h2>库存详情</h2>
      <table>
        <thead>
        <tr>
          <th>药品名称</th>
          <th>库存量</th>
          <th>单价</th>
          <th>批号</th>
          <th>过期时间</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in inventory" :key="item.inventoryId">
          <td>{{ item.drug.name }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.drug.unitPrice }}</td>
          <td>{{ item.batchNumber }}</td>
          <td>{{ formatDate(item.expirationDate) }}</td>
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
      inventory: []
    };
  },
  created() {
    this.fetchInventory();
  },
  methods: {
    fetchInventory() {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('未找到登录信息，请重新登录');
        this.$router.push({ name: 'Login' });
        return;
      }

      axios
          .get('/api/inventories', {
            headers: {
              'Authorization': token
            }
          })
          .then(response => {
            this.inventory = response.data;
          })
          .catch(error => {
            console.error('查询库存失败:', error);
            alert('查询库存失败，请重试');
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
