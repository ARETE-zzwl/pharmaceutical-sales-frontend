<template>
  <div class="container">
    <h1>药品管理</h1>
    <div class="button-container">
      <button @click="navigateTo('DrugBatchCreate')">批量添加药品</button>
      <button @click="navigateTo('DrugSearch')">检索药品</button>
    </div>
    <div class="card">
      <h2>药品列表</h2>
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>规格</th>
          <th>生产商</th>
          <th>单价</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="drug in drugs" :key="drug.drugId">
          <td>{{ drug.drugId }}</td>
          <td>{{ drug.name }}</td>
          <td>{{ drug.specification }}</td>
          <td>{{ drug.manufacturer }}</td>
          <td>{{ drug.unitPrice }}</td>
          <td>
            <button @click="editDrug(drug)">更新</button>
            <button @click="showInventoryModal(drug)">入库</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- 更新药品模态框 -->
    <div v-if="showEditModal" class="modal">
      <div class="modal-content">
        <h2>更新药品信息</h2>
        <form @submit.prevent="updateDrug">
          <label>
            名称:
            <input v-model="selectedDrug.name" type="text" required />
          </label>
          <label>
            规格:
            <input v-model="selectedDrug.specification" type="text" required />
          </label>
          <label>
            生产商:
            <input v-model="selectedDrug.manufacturer" type="text" required />
          </label>
          <label>
            单价:
            <input v-model="selectedDrug.unitPrice" type="number" step="0.01" required />
          </label>
          <button type="submit">提交</button>
          <button type="button" @click="closeEditModal">取消</button>
        </form>
      </div>
    </div>

    <!-- 入库模态框 -->
    <div v-if="showInventoryModalFlag" class="modal">
      <div class="modal-content">
        <h2>入库药品</h2>
        <form @submit.prevent="createInventory">
          <label>
            批号:
            <input v-model="inventoryData.batchNumber" type="text" required />
          </label>
          <label>
            数量:
            <input v-model.number="inventoryData.quantity" type="number" required />
          </label>
          <label>
            过期日期:
            <input v-model="inventoryData.expirationDate" type="date" required />
          </label>
          <button type="submit">提交</button>
          <button type="button" @click="closeInventoryModal">取消</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      drugs: [],
      selectedDrug: null,
      showEditModal: false,
      showInventoryModalFlag: false,
      inventoryData: {
        batchNumber: '',
        quantity: 0,
        expirationDate: '',
        drug: null
      }
    };
  },
  created() {
    this.fetchDrugs();
  },
  methods: {
    fetchDrugs() {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = token;
      axios
          .get('/api/drugs')
          .then(response => {
            this.drugs = response.data.content; // 更新为适应返回结构体
          })
          .catch(error => {
            console.error('获取药品信息失败:', error);
            alert('获取药品信息失败，请重试');
          });
    },
    editDrug(drug) {
      this.selectedDrug = { ...drug };
      this.showEditModal = true;
    },
    updateDrug() {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = token;
      axios
          .put(`/api/drugs/${this.selectedDrug.drugId}`, this.selectedDrug)
          .then(response => {
            console.log('更新药品信息成功:', response.data);
            alert('更新药品信息成功');
            this.showEditModal = false;
            this.fetchDrugs(); // 刷新药品列表
          })
          .catch(error => {
            console.error('更新药品信息失败:', error);
            alert('更新药品信息失败，请重试');
          });
    },
    showInventoryModal(drug) {
      this.inventoryData.drug = { drugId: drug.drugId };
      this.showInventoryModalFlag = true;
    },
    createInventory() {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = token;
      axios
          .post('/api/inventories', this.inventoryData)
          .then(response => {
            console.log('药品入库成功:', response.data);
            alert('药品入库成功');
            this.showInventoryModalFlag = false;
            this.inventoryData = {
              batchNumber: '',
              quantity: 0,
              expirationDate: '',
              drug: null
            };
          })
          .catch(error => {
            console.error('药品入库失败:', error);
            alert('药品入库失败，请重试');
          });
    },
    closeEditModal() {
      this.showEditModal = false;
    },
    closeInventoryModal() {
      this.showInventoryModalFlag = false;
    },
    navigateTo(page) {
      this.$router.push({ name: page });
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

.button-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
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

input {
  width: 100%;
  box-sizing: border-box;
}

button {
  margin-top: 10px;
  margin-right: 10px;
}

/* Modal 样式 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.modal-content h2 {
  margin-top: 0;
}
</style>
