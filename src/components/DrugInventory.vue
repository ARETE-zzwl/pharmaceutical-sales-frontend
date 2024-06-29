<template>
  <div>
    <h1>药品库存管理</h1>
    <button @click="goToBatchCreate">批量添加药品</button>
    <div v-if="showBatchCreate">
      <DrugBatchCreate @hide-batch-create="hideBatchCreate"/>
    </div>

    <div>
      <h2>所有药品库存</h2>
      <button @click="fetchAllInventories">获取库存</button>
      <button v-if="showInventories" @click="hideInventories">隐藏库存</button>
      <div v-if="showInventories">
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
            <th>库存数量</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="inventory in inventories" :key="inventory.inventoryId">
            <td>{{ inventory.drug.drugId }}</td>
            <td>{{ inventory.drug.name }}</td>
            <td>{{ inventory.drug.specification }}</td>
            <td>{{ inventory.drug.manufacturer }}</td>
            <td>{{ inventory.batchNumber }}</td>
            <td>{{ formatDate(inventory.expirationDate) }}</td>
            <td>{{ inventory.drug.unitPrice }}</td>
            <td>{{ inventory.quantity }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DrugBatchCreate from './DrugBatchCreate.vue';

export default {
  components: {
    DrugBatchCreate
  },
  data() {
    return {
      showBatchCreate: false,
      showInventories: false,
      inventories: []
    };
  },
  methods: {
    goToBatchCreate() {
      this.showBatchCreate = true;
    },
    hideBatchCreate() {
      this.showBatchCreate = false;
    },
    fetchAllInventories() {
      axios
          .get('/api/inventories')
          .then(response => {
            this.inventories = response.data;
            this.showInventories = true;
          })
          .catch(error => {
            console.error('获取库存出错:', error);
          });
    },
    hideInventories() {
      this.showInventories = false;
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
button {
  margin-bottom: 20px;
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
