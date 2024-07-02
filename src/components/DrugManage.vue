<template>
  <div class="container mx-auto p-5">
    <h1 class="text-4xl font-bold mb-6 text-center">药品管理</h1>
    <div class="button-container flex justify-between mb-6">
      <button @click="navigateTo('DrugBatchCreate')" class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">批量添加药品</button>
      <button @click="navigateTo('DrugSearch')" class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">检索药品</button>
    </div>
    <div class="card bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-semibold mb-4">药品列表</h2>
      <table class="min-w-full bg-white border">
        <thead>
        <tr>
          <th class="py-2 px-4 border-b">ID</th>
          <th class="py-2 px-4 border-b">名称</th>
          <th class="py-2 px-4 border-b">规格</th>
          <th class="py-2 px-4 border-b">生产商</th>
          <th class="py-2 px-4 border-b">单价</th>
          <th class="py-2 px-4 border-b">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="drug in drugs" :key="drug.drugId" class="hover:bg-gray-100">
          <td class="py-2 px-4 border-b">{{ drug.drugId }}</td>
          <td class="py-2 px-4 border-b">{{ drug.name }}</td>
          <td class="py-2 px-4 border-b">{{ drug.specification }}</td>
          <td class="py-2 px-4 border-b">{{ drug.manufacturer }}</td>
          <td class="py-2 px-4 border-b">{{ drug.unitPrice }}</td>
          <td class="py-2 px-4 border-b flex space-x-2">
            <button @click="editDrug(drug)" class="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-700">
              <i class="fas fa-edit"></i>
            </button>
            <button @click="showInventoryModal(drug)" class="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-700">
              <i class="fas fa-plus"></i>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- 更新药品模态框 -->
    <div v-if="showEditModal" class="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div class="modal-content bg-white p-5 rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold mb-4">更新药品信息</h2>
        <form @submit.prevent="updateDrug">
          <label class="block mb-3">
            名称:
            <input v-model="selectedDrug.name" type="text" required class="mt-1 p-2 w-full border rounded">
          </label>
          <label class="block mb-3">
            规格:
            <input v-model="selectedDrug.specification" type="text" required class="mt-1 p-2 w-full border rounded">
          </label>
          <label class="block mb-3">
            生产商:
            <input v-model="selectedDrug.manufacturer" type="text" required class="mt-1 p-2 w-full border rounded">
          </label>
          <label class="block mb-3">
            单价:
            <input v-model="selectedDrug.unitPrice" type="number" step="0.01" required class="mt-1 p-2 w-full border rounded">
          </label>
          <div class="flex justify-end space-x-3">
            <button type="submit" class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">提交</button>
            <button type="button" @click="closeEditModal" class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700">取消</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 入库模态框 -->
    <div v-if="showInventoryModalFlag" class="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div class="modal-content bg-white p-5 rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold mb-4">入库药品</h2>
        <form @submit.prevent="createInventory">
          <label class="block mb-3">
            批号:
            <input v-model="inventoryData.batchNumber" type="text" required class="mt-1 p-2 w-full border rounded">
          </label>
          <label class="block mb-3">
            数量:
            <input v-model.number="inventoryData.quantity" type="number" required class="mt-1 p-2 w-full border rounded">
          </label>
          <label class="block mb-3">
            过期日期:
            <input v-model="inventoryData.expirationDate" type="date" required class="mt-1 p-2 w-full border rounded">
          </label>
          <div class="flex justify-end space-x-3">
            <button type="submit" class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">提交</button>
            <button type="button" @click="closeInventoryModal" class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700">取消</button>
          </div>
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
            this.drugs = response.data.content;
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
            this.fetchDrugs();
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
