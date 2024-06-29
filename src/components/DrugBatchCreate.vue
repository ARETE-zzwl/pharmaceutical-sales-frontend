<template>
  <div>
    <h1>批量创建药品</h1>

    <form @submit.prevent="submitDrugs">
      <div v-for="(drug, index) in drugs" :key="index">
        <h3>药品 {{ index + 1 }}</h3>
        <label>
          名称:
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
        <label>
          单价:
          <input v-model.number="drug.unitPrice" type="number" required />
        </label>
        <button type="button" @click="removeDrug(index)">移除药品</button>
      </div>

      <button type="button" @click="addDrug">添加药品</button>
      <button type="submit">提交</button>
    </form>

    <div v-if="response">
      <h2>创建结果</h2>
      <ul>
        <li v-for="drug in response" :key="drug.drugId">
          {{ drug.name }} - {{ drug.specification }} - {{ drug.manufacturer }}
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
      drugs: [
        {
          name: '',
          specification: '',
          manufacturer: '',
          batchNumber: '',
          expirationDate: '',
          unitPrice: null
        }
      ],
      response: null
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
        unitPrice: null
      });
    },
    removeDrug(index) {
      this.drugs.splice(index, 1);
    },
    submitDrugs() {
      axios
          .post('/api/drugs/batch', this.drugs)
          .then(response => {
            this.response = response.data;
            this.resetForm();
          })
          .catch(error => {
            console.error('创建药品出错:', error);
          });
    },
    resetForm() {
      this.drugs = [
        {
          name: '',
          specification: '',
          manufacturer: '',
          batchNumber: '',
          expirationDate: '',
          unitPrice: null
        }
      ];
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
label {
  display: block;
  margin-top: 10px;
}
button {
  margin-top: 10px;
}
</style>
