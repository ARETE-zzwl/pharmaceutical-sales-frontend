<template>
  <div>
    <h1>药品库存管理</h1>
    <button @click="goToBatchCreate" class="add-drug-btn">批量添加药品</button>
    <div v-if="showBatchCreate">
      <DrugBatchCreate @hide-batch-create="hideBatchCreate"/>
    </div>

    <div>
      <h1>所有药品库存</h1>
      <button @click="fetchAllInventories" class="add-drug-btn">获取库存</button>
      <button v-if="showInventories" @click="hideInventories" class="hide-btn">隐藏库存</button>
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
h1 {
  color: #42b983;
}
.hide-btn {
  background-color: #f44336; /* Red */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
}
/* 表格基本样式 */
table {
  width: 80%;
  border-collapse: collapse; /* 合并相邻边框 */
  margin-bottom: 20px; /* 与下方元素之间的间距 */
}

/* 表格头部样式 */
thead {
  background-color: #f2f2f2; /* 浅灰色背景 */
}

th, td {
  padding: 10px; /* 单元格内边距 */
  text-align: left; /* 文本左对齐 */
  border-bottom: 1px solid #ddd; /* 底部边框 */
}

/* 表格头部单元格样式 */
th {
  font-weight: bold; /* 加粗字体 */
  color: #333; /* 字体颜色 */
}

/* 表格行悬停效果 */
tr:hover {
  background-color: #f5f5f5; /* 鼠标悬停时背景色变浅 */
}

/* 表格条纹效果（可选） */
tr:nth-child(even) {
  background-color: #f9f9f9; /* 偶数行背景色稍浅 */
}

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
.add-drug-btn {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
}
</style>
