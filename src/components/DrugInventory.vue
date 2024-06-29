<template>
  <div>
    <h1>药品库存管理</h1>

    <button @click="fetchInventories">获取药品库存</button>
    <button @click="toggleBatchCreateForm">批量添加药品</button>

    <div v-if="showBatchCreateForm">
      <h2>批量创建药品</h2>
      <div v-for="(drug, index) in drugs" :key="index">
        <h3>药品 {{ index + 1 }}</h3>
        <label>
          名称:
          <input v-model="drug.name" type="text" />
        </label>
        <label>
          规格:
          <input v-model="drug.specification" type="text" />
        </label>
        <label>
          生产商:
          <input v-model="drug.manufacturer" type="text" />
        </label>
        <label>
          批号:
          <input v-model="drug.batchNumber" type="text" />
        </label>
        <label>
          过期日期:
          <input v-model="drug.expirationDate" type="date" />
        </label>
        <label>
          单价:
          <input v-model="drug.unitPrice" type="number" />
        </label>
        <button @click="removeDrug(index)">移除药品</button>
      </div>
      <button @click="addDrug">添加药品</button>
      <button @click="submitDrugs">提交</button>
      <button @click="toggleBatchCreateForm">隐藏</button>
    </div>

    <div v-if="showInventory">
      <h2>药品库存</h2>
      <table>
        <thead>
        <tr>
          <th>库存ID</th>
          <th>药品名称</th>
          <th>规格</th>
          <th>生产商</th>
          <th>批号</th>
          <th>过期日期</th>
          <th>数量</th>
          <th>单价</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in inventories" :key="item.inventoryId">
          <td>{{ item.inventoryId }}</td>
          <td>{{ item.drug.name }}</td>
          <td>{{ item.drug.specification }}</td>
          <td>{{ item.drug.manufacturer }}</td>
          <td>{{ item.batchNumber }}</td>
          <td>{{ formatDate(item.expirationDate) }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.drug.unitPrice }}</td>
          <td>
            <button @click="editInventory(item)">更新</button>
            <button @click="deleteInventory(item.inventoryId)">删除</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showUpdateForm">
      <h2>更新药品库存</h2>
      <form @submit.prevent="updateInventory">
        <label>
          库存ID:
          <input v-model="updateForm.inventoryId" type="text" readonly />
        </label>
        <label>
          药品名称:
          <input v-model="updateForm.drug.name" type="text" readonly />
        </label>
        <label>
          规格:
          <input v-model="updateForm.drug.specification" type="text" readonly />
        </label>
        <label>
          生产商:
          <input v-model="updateForm.drug.manufacturer" type="text" readonly />
        </label>
        <label>
          批号:
          <input v-model="updateForm.batchNumber" type="text" />
        </label>
        <label>
          过期日期:
          <input v-model="updateForm.expirationDate" type="date" />
        </label>
        <label>
          数量:
          <input v-model="updateForm.quantity" type="number" />
        </label>
        <label>
          单价:
          <input v-model="updateForm.drug.unitPrice" type="number" />
        </label>
        <button type="submit">提交</button>
        <button @click="cancelUpdate">取消</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      drugs: [
        {
          name: '',
          specification: '',
          manufacturer: '',
          batchNumber: '',
          expirationDate: '',
          unitPrice: ''
        }
      ],
      inventories: [],
      updateForm: {
        inventoryId: '',
        drug: {
          name: '',
          specification: '',
          manufacturer: '',
          unitPrice: ''
        },
        batchNumber: '',
        expirationDate: '',
        quantity: ''
      },
      showBatchCreateForm: false,
      showInventory: false,
      showUpdateForm: false
    };
  },
  methods: {
    addDrug() {
      this.drugs.push({
        name: '',
        specification: '',
        manufacturer: '',
        batchNumber: '',
        expirationDate: '',
        unitPrice: ''
      });
    },
    removeDrug(index) {
      this.drugs.splice(index, 1);
    },
    submitDrugs() {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios
          .post('/api/drugs/batch', this.drugs)
          .then(() => {
            alert('批量创建药品成功');
            this.toggleBatchCreateForm();
            this.fetchInventories();
          })
          .catch(error => {
            console.error('批量创建药品出错:', error);
            alert('批量创建药品失败，请重试');
          });
    },
    fetchInventories() {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios
          .get('/api/inventories')
          .then(response => {
            this.inventories = response.data;
            this.showInventory = true;
          })
          .catch(error => {
            console.error('获取药品库存出错:', error);
            alert('获取药品库存失败，请重试');
          });
    },
    editInventory(item) {
      this.updateForm = JSON.parse(JSON.stringify(item)); // deep copy
      this.showUpdateForm = true;
    },
    updateInventory() {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios
          .put(`/api/inventories/${this.updateForm.inventoryId}`, this.updateForm)
          .then(() => {
            this.fetchInventories();
            alert('更新成功');
            this.showUpdateForm = false;
          })
          .catch(error => {
            console.error('更新库存出错:', error);
            alert('更新失败，请重试');
          });
    },
    deleteInventory(inventoryId) {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios
          .delete(`/api/inventories/${inventoryId}`)
          .then(() => {
            this.fetchInventories();
            alert('删除成功');
          })
          .catch(error => {
            console.error('删除库存出错:', error);
            alert('删除失败，请重试');
          });
    },
    toggleBatchCreateForm() {
      this.showBatchCreateForm = !this.showBatchCreateForm;
    },
    cancelUpdate() {
      this.showUpdateForm = false;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
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
  margin-right: 10px;
}
</style>
