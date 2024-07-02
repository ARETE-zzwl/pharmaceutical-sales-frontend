<template>
  <div class="container">
    <h1>销售记录管理</h1>
    <button @click="toggleCreateForm">新增销售记录</button>
    <div class="card">
      <h2>销售记录</h2>
      <table>
        <thead>
        <tr>
          <th>药品ID</th>
          <th>数量</th>
          <th>单价</th>
          <th>客户ID</th>
          <th>销售日期</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in sales" :key="item.salesId">
          <td>{{ item.drug.drugId }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.unitPrice }}</td>
          <td>{{ item.customer.customerId }}</td>
          <td>{{ formatDate(item.salesDate) }}</td>
          <td>
            <button @click="editSales(item)">编辑</button>
            <button @click="deleteSales(item.salesId)">删除</button>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 0">上一页</button>
        <span>第 {{ currentPage + 1 }} 页 / 共 {{ totalPages }} 页</span>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage + 1 >= totalPages">下一页</button>
        <input v-model.number="pageInput" type="number" min="1" :max="totalPages" placeholder="页码" />
        <button @click="goToPage">跳转</button>
      </div>
    </div>

    <!-- 新增/编辑销售记录模态框 -->
    <div v-if="showForm || showEditModal" class="modal">
      <div class="modal-content">
        <h2>{{ editMode ? '编辑销售记录' : '新增销售记录' }}</h2>
        <form @submit.prevent="submitSales">
          <label>
            药品ID:
            <input type="number" v-model.number="form.drug.drugId" required />
          </label>
          <label>
            数量:
            <input type="number" v-model.number="form.quantity" required />
          </label>
          <label>
            单价:
            <input type="number" v-model.number="form.unitPrice" step="0.01" required />
          </label>
          <label>
            客户ID:
            <input type="number" v-model.number="form.customer.customerId" required />
          </label>
          <label>
            销售日期:
            <input type="date" v-model="form.salesDate" required />
          </label>
          <button type="submit">{{ editMode ? '更新' : '创建' }}</button>
          <button type="button" @click="resetForm">取消</button>
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
