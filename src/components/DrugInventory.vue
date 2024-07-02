<template>
  <div class="container mx-auto p-5">
    <h1 class="text-4xl font-bold mb-6 text-center">药品库存</h1>
    <div class="card bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 class="text-2xl font-semibold mb-4">库存详情</h2>
      <div class="button-container flex justify-between mb-4">
        <button @click="toggleView('expiringSoon')" class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 mr-2">
          {{ showExpiringSoon ? '显示所有库存' : '查询即将过期的药品' }}
        </button>
        <button @click="toggleView('expired')" class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 mr-2">
          {{ showExpired ? '显示所有库存' : '查询已过期的药品' }}
        </button>
        <button v-if="showExpiringSoon || showExpired" @click="toggleView('all')" class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          显示所有库存
        </button>
      </div>

      <table v-if="showExpiringSoon" class="min-w-full bg-white border">
        <thead>
        <tr>
          <th class="py-2 px-4 border-b">药品ID</th>
          <th class="py-2 px-4 border-b">药品名称</th>
          <th class="py-2 px-4 border-b">库存量</th>
          <th class="py-2 px-4 border-b">批号</th>
          <th class="py-2 px-4 border-b">过期时间</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in expiringSoon" :key="item.drugId" class="hover:bg-gray-100">
          <td class="py-2 px-4 border-b">{{ item.drugId }}</td>
          <td class="py-2 px-4 border-b">{{ item.name }}</td>
          <td class="py-2 px-4 border-b">{{ item.quantity }}</td>
          <td class="py-2 px-4 border-b">{{ item.batchNumber }}</td>
          <td :class="{ highlight: true }" class="py-2 px-4 border-b">{{ formatDate(item.expirationDate) }}</td>
        </tr>
        </tbody>
      </table>

      <table v-else-if="showExpired" class="min-w-full bg-white border">
        <thead>
        <tr>
          <th class="py-2 px-4 border-b">药品ID</th>
          <th class="py-2 px-4 border-b">药品名称</th>
          <th class="py-2 px-4 border-b">库存量</th>
          <th class="py-2 px-4 border-b">批号</th>
          <th class="py-2 px-4 border-b">过期时间</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in expired" :key="item.drugId" class="hover:bg-gray-100">
          <td class="py-2 px-4 border-b">{{ item.drugId }}</td>
          <td class="py-2 px-4 border-b">{{ item.name }}</td>
          <td class="py-2 px-4 border-b">{{ item.quantity }}</td>
          <td class="py-2 px-4 border-b">{{ item.batchNumber }}</td>
          <td :class="{ highlight: true }" class="py-2 px-4 border-b">{{ formatDate(item.expirationDate) }}</td>
        </tr>
        </tbody>
      </table>

      <table v-else class="min-w-full bg-white border">
        <thead>
        <tr>
          <th class="py-2 px-4 border-b">药品名称</th>
          <th class="py-2 px-4 border-b">库存量</th>
          <th class="py-2 px-4 border-b">单价</th>
          <th class="py-2 px-4 border-b">批号</th>
          <th class="py-2 px-4 border-b">过期时间</th>
          <th class="py-2 px-4 border-b">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in inventory" :key="item.inventoryId" class="hover:bg-gray-100">
          <td class="py-2 px-4 border-b">{{ item.drug ? item.drug.name : '未知药品' }}</td>
          <td class="py-2 px-4 border-b">{{ item.quantity }}</td>
          <td class="py-2 px-4 border-b">{{ item.drug ? item.drug.unitPrice : '未知价格' }}</td>
          <td class="py-2 px-4 border-b">{{ item.batchNumber }}</td>
          <td class="py-2 px-4 border-b">{{ formatDate(item.expirationDate) }}</td>
          <td class="py-2 px-4 border-b flex space-x-2">
            <button @click="editInventory(item)" class="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-700">
              <i class="fas fa-edit"></i>
            </button>
            <button @click="deleteInventory(item.inventoryId)" class="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700">
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-center">
      <button @click="toggleForm" class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
        {{ showForm ? '取消新增库存' : '新增库存' }}
      </button>
    </div>

    <!-- 库存模态框 -->
    <div v-if="showForm || showEditModal" class="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div class="modal-content bg-white p-5 rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold mb-4">{{ editMode ? '编辑库存' : '新增库存' }}</h2>
        <form @submit.prevent="submitInventory">
          <label class="block mb-3">
            药品ID:
            <input type="number" v-model.number="form.drug.drugId" required class="mt-1 p-2 w-full border rounded">
          </label>
          <label class="block mb-3">
            库存量:
            <input type="number" v-model.number="form.quantity" required class="mt-1 p-2 w-full border rounded">
          </label>
          <label class="block mb-3">
            批号:
            <input type="text" v-model="form.batchNumber" required class="mt-1 p-2 w-full border rounded">
          </label>
          <label class="block mb-3">
            过期时间:
            <input type="date" v-model="form.expirationDate" required class="mt-1 p-2 w-full border rounded">
          </label>
          <div class="flex justify-end space-x-3">
            <button type="submit" class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
              {{ editMode ? '更新' : '创建' }}
            </button>
            <button type="button" @click="resetForm" class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700">
              取消
            </button>
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
      inventory: [],
      expiringSoon: [],
      expired: [],
      form: {
        drug: {
          drugId: null
        },
        quantity: null,
        batchNumber: '',
        expirationDate: ''
      },
      showForm: false,
      showEditModal: false,
      editMode: false,
      editId: null,
      showExpiringSoon: false,
      showExpired: false
    };
  },
  created() {
    this.fetchInventory();
  },
  methods: {
    fetchInventory() {
      const token = localStorage.getItem('token');
      if (!token || token.split('.').length !== 3) {
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
            this.inventory = response.data.content;
          })
          .catch(error => {
            console.error('查询库存失败:', error);
            alert('查询库存失败，请重试');
          });
    },
    fetchExpiringSoon() {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('未找到登录信息，请重新登录');
        this.$router.push({ name: 'Login' });
        return;
      }

      axios
          .get('/api/drugs/expiring-soon', {
            headers: {
              'Authorization': token
            }
          })
          .then(response => {
            this.expiringSoon = response.data;
            this.expiringSoon.forEach(item => {
              this.fetchInventoryQuantity(item);
            });
          })
          .catch(error => {
            console.error('查询即将过期药品失败:', error);
            alert('查询即将过期药品失败，请重试');
          });
    },
    fetchExpired() {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('未找到登录信息，请重新登录');
        this.$router.push({ name: 'Login' });
        return;
      }

      axios
          .get('/api/drugs/expired', {
            headers: {
              'Authorization': token
            }
          })
          .then(response => {
            this.expired = response.data.content;
            this.expired.forEach(item => {
              this.fetchInventoryQuantity(item);
            });
          })
          .catch(error => {
            console.error('查询已过期药品失败:', error);
            alert('查询已过期药品失败，请重试');
          });
    },
    fetchInventoryQuantity(drug) {
      const token = localStorage.getItem('token');
      axios
          .get(`/api/inventories/${drug.drugId}`, {
            headers: {
              'Authorization': token
            }
          })
          .then(response => {
            drug.quantity = response.data.quantity;
          })
          .catch(error => {
            console.error(`查询药品 ${drug.name} 库存量失败:`, error);
            drug.quantity = '未知';
          });
    },
    submitInventory() {
      const token = localStorage.getItem('token');
      const url = this.editMode ? `/api/inventories/${this.editId}` : '/api/inventories';
      const method = this.editMode ? 'put' : 'post';

      axios({
        method,
        url,
        headers: {
          'Authorization': token
        },
        data: this.form
      })
          .then(() => {
            this.fetchInventory();
            this.resetForm();
          })
          .catch(error => {
            console.error(this.editMode ? '更新库存失败:' : '创建库存失败:', error);
            alert(this.editMode ? '更新库存失败，请重试' : '创建库存失败，请重试');
          });
    },
    editInventory(item) {
      this.form = { ...item, drug: { drugId: item.drug.drugId } };
      this.editMode = true;
      this.editId = item.inventoryId;
      this.showForm = true;
    },
    deleteInventory(id) {
      const token = localStorage.getItem('token');
      axios
          .delete(`/api/inventories/${id}`, {
            headers: {
              'Authorization': token
            }
          })
          .then(() => {
            this.fetchInventory();
          })
          .catch(error => {
            console.error('删除库存失败:', error);
            alert('删除库存失败，请重试');
          });
    },
    resetForm() {
      this.form = {
        drug: {
          drugId: null
        },
        quantity: null,
        batchNumber: '',
        expirationDate: ''
      };
      this.editMode = false;
      this.editId = null;
      this.showForm = false;
      this.showEditModal = false;
    },
    toggleForm() {
      this.showForm = !this.showForm;
      if (!this.showForm) {
        this.resetForm();
      }
    },
    toggleView(view) {
      this.showExpiringSoon = false;
      this.showExpired = false;

      if (view === 'expiringSoon') {
        this.showExpiringSoon = !this.showExpiringSoon;
        if (this.showExpiringSoon) {
          this.fetchExpiringSoon();
        }
      } else if (view === 'expired') {
        this.showExpired = !this.showExpired;
        if (this.showExpired) {
          this.fetchExpired();
        }
      }
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

.button-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
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

form label {
  display: block;
  margin-bottom: 10px;
}

form input {
  margin-left: 10px;
}

form button {
  margin-right: 10px;
}

.highlight {
  color: red;
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
