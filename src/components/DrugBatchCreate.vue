<template>
  <div>
    <h2>批量添加药品</h2>
    <form @submit.prevent="createDrugs">
      <div v-for="(drug, index) in drugs" :key="index">
        <label>
          药品名称:
          <input v-model="drug.name" type="text" required />
        </label>
        <label>
          规格:
          <input v-model="drug.specification" type="text" required />
        </label>
        <label>
          生产商:
          <input v-model="drug.manufacturer" type="text" required />
        </label>
        <label>
          批号:
          <input v-model="drug.batchNumber" type="text" required />
        </label>
        <label>
          过期日期:
          <input v-model="drug.expirationDate" type="date" required />
        </label>
        <button type="button" @click="removeDrug(index)">移除药品</button>
      </div>
      <button type="button" @click="addDrug">添加药品</button>
      <button type="submit">提交</button>
    </form>
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
          expirationDate: ''
        }
      ]
    };
  },
  methods: {
    addDrug() {
      this.drugs.push({
        name: '',
        specification: '',
        manufacturer: '',
        batchNumber: '',
        expirationDate: ''
      });
    },
    removeDrug(index) {
      this.drugs.splice(index, 1);
    },
    createDrugs() {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios
          .post('/api/drugs/batch', this.drugs)
          .then(response => {
            console.log('批量添加药品成功:', response.data);
            alert('批量添加药品成功');
          })
          .catch(error => {
            console.error('批量添加药品失败:', error);
            alert('批量添加药品失败，请重试');
          });
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
