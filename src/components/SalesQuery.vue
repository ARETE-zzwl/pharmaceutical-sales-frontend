<template>
  <div class="container mx-auto p-5">
    <h1 class="text-4xl font-bold mb-6 text-center">销售记录管理</h1>
    <div class="flex justify-center mb-4">
      <button @click="toggleCreateForm" class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 mr-2">
        新增销售记录
      </button>
    </div>
    <div class="card bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-semibold mb-4">销售记录</h2>
      <table class="min-w-full bg-white border">
        <thead>
        <tr>
          <th class="py-2 px-4 border-b">药品ID</th>
          <th class="py-2 px-4 border-b">数量</th>
          <th class="py-2 px-4 border-b">单价</th>
          <th class="py-2 px-4 border-b">客户ID</th>
          <th class="py-2 px-4 border-b">销售日期</th>
          <th class="py-2 px-4 border-b">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in sales" :key="item.salesId" class="hover:bg-gray-100">
          <td class="py-2 px-4 border-b">{{ item.drug.drugId }}</td>
          <td class="py-2 px-4 border-b">{{ item.quantity }}</td>
          <td class="py-2 px-4 border-b">{{ item.unitPrice }}</td>
          <td class="py-2 px-4 border-b">{{ item.customer.customerId }}</td>
          <td class="py-2 px-4 border-b">{{ formatDate(item.salesDate) }}</td>
          <td class="py-2 px-4 border-b flex space-x-2">
            <button @click="editSales(item)" class="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-700">
              <i class="fas fa-edit"></i>
            </button>
            <button @click="deleteSales(item.salesId)" class="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700">
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="flex justify-between items-center mt-4">
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 0" class="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700">
          上一页
        </button>
        <span>第 {{ currentPage + 1 }} 页 / 共 {{ totalPages }} 页</span>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage + 1 >= totalPages" class="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700">
          下一页
        </button>
        <input v-model.number="pageInput" type="number" min="1" :max="totalPages" placeholder="页码" class="w-16 text-center border rounded mx-2 py-1 px-2">
        <button @click="goToPage" class="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700">跳转</button>
      </div>
    </div>

    <!-- 新增/编辑销售记录模态框 -->
    <div v-if="showForm || showEditModal" class="modal">
      <div class="modal-content bg-white p-5 rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold mb-4">{{ editMode ? '编辑销售记录' : '新增销售记录' }}</h2>
        <form @submit.prevent="submitSales">
          <label class="block mb-3">
            药品ID:
            <input type="number" v-model.number="form.drug.drugId" required class="mt-1 p-2 w-full border rounded">
          </label>
          <label class="block mb-3">
            数量:
            <input type="number" v-model.number="form.quantity" required class="mt-1 p-2 w-full border rounded">
          </label>
          <label class="block mb-3">
            单价:
            <input type="number" v-model.number="form.unitPrice" step="0.01" required class="mt-1 p-2 w-full border rounded">
          </label>
          <label class="block mb-3">
            客户ID:
            <input type="number" v-model.number="form.customer.customerId" required class="mt-1 p-2 w-full border rounded">
          </label>
          <label class="block mb-3">
            销售日期:
            <input type="date" v-model="form.salesDate" required class="mt-1 p-2 w-full border rounded">
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
      sales: [],
      form: {
        drug: {
          drugId: null
        },
        quantity: null,
        unitPrice: null,
        customer: {
          customerId: null
        },
        salesDate: ''
      },
      showForm: false,
      showEditModal: false,
      editMode: false,
      editId: null,
      currentPage: 0,
      totalPages: 1,
      pageInput: 1
    };
  },
  created() {
    this.fetchSales();
  },
  methods: {
    fetchSales(page = 0) {
      const token = localStorage.getItem('token');
      axios
          .get('/api/sales', {
            headers: {
              'Authorization': token
            },
            params: {
              page: page,
              size: 10
            }
          })
          .then(response => {
            this.sales = response.data.content;
            this.currentPage = response.data.number;
            this.totalPages = response.data.totalPages;
          })
          .catch(error => {
            console.error('获取销售记录失败:', error);
            alert('获取销售记录失败，请重试');
          });
    },
    changePage(page) {
      if (page >= 0 && page < this.totalPages) {
        this.fetchSales(page);
      }
    },
    goToPage() {
      if (this.pageInput > 0 && this.pageInput <= this.totalPages) {
        this.fetchSales(this.pageInput - 1);
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
    },
    toggleCreateForm() {
      this.showForm = !this.showForm;
      if (!this.showForm) {
        this.resetForm();
      }
    },
    submitSales() {
      const token = localStorage.getItem('token');
      const url = this.editMode ? `/api/sales/${this.editId}` : '/api/sales';
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
            this.fetchSales();
            this.resetForm();
          })
          .catch(error => {
            console.error(this.editMode ? '更新销售记录失败:' : '创建销售记录失败:', error);
            alert(this.editMode ? '更新销售记录失败，请重试' : '创建销售记录失败，请重试');
          });
    },
    editSales(item) {
      this.form = { ...item, salesDate: item.salesDate.split('T')[0] };
      this.editMode = true;
      this.editId = item.salesId;
      this.showForm = true;
    },
    deleteSales(id) {
      const token = localStorage.getItem('token');
      axios
          .delete(`/api/sales/${id}`, {
            headers: {
              'Authorization': token
            }
          })
          .then(() => {
            this.fetchSales();
          })
          .catch(error => {
            console.error('删除销售记录失败:', error);
            alert('删除销售记录失败，请重试');
          });
    },
    resetForm() {
      this.form = {
        drug: {
          drugId: null
        },
        quantity: null,
        unitPrice: null,
        customer: {
          customerId: null
        },
        salesDate: ''
      };
      this.editMode = false;
      this.editId = null;
      this.showForm = false;
      this.showEditModal = false;
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

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.pagination input {
  width: 50px;
  margin-left: 10px;
}

.pagination button {
  padding: 10px;
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
