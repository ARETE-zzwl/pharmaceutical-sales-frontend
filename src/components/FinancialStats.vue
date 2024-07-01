<template>
  <div class="container">
    <h1>财务记录管理</h1>
    <button @click="toggleCreateForm">新增财务记录</button>
    <button @click="navigateToSalesQuery">查询销售记录</button> <!-- 添加这个按钮 -->
    <div v-if="showCreateForm" class="card">
      <h2>新增财务记录</h2>
      <form @submit.prevent="createStats">
        <label>
          日期:
          <input v-model="newStats.statsDate" type="date" required />
        </label>
        <label>
          销售金额:
          <input v-model.number="newStats.salesAmount" type="number" required />
        </label>
        <label>
          采购金额:
          <input v-model.number="newStats.purchaseAmount" type="number" required />
        </label>
        <label>
          退货金额:
          <input v-model.number="newStats.returnAmount" type="number" required />
        </label>
        <button type="submit">提交</button>
      </form>
    </div>
    <div class="card">
      <h2>财务记录</h2>
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>日期</th>
          <th>销售金额</th>
          <th>采购金额</th>
          <th>退货金额</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in stats" :key="item.statsId">
          <td>{{ item.statsId }}</td>
          <td>{{ formatDate(item.statsDate) }}</td>
          <td>{{ item.salesAmount }}</td>
          <td>{{ item.purchaseAmount }}</td>
          <td>{{ item.returnAmount }}</td>
          <td>
            <button @click="editStats(item)">编辑</button>
            <button @click="deleteStats(item.statsId)">删除</button>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 0">上一页</button>
        <span>第 {{ currentPage + 1 }} 页 / 共 {{ totalPages }} 页</span>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage + 1 >= totalPages">下一页</button>
      </div>
    </div>
    <div v-if="editingStats" class="card">
      <h2>编辑财务记录</h2>
      <form @submit.prevent="updateStats">
        <label>
          日期:
          <input v-model="editingStats.statsDate" type="date" required />
        </label>
        <label>
          销售金额:
          <input v-model.number="editingStats.salesAmount" type="number" required />
        </label>
        <label>
          采购金额:
          <input v-model.number="editingStats.purchaseAmount" type="number" required />
        </label>
        <label>
          退货金额:
          <input v-model.number="editingStats.returnAmount" type="number" required />
        </label>
        <button type="submit">保存</button>
        <button type="button" @click="cancelEdit">取消</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      stats: [],
      newStats: {
        statsDate: '',
        salesAmount: 0,
        purchaseAmount: 0,
        returnAmount: 0
      },
      editingStats: null,
      showCreateForm: false,
      currentPage: 0,
      totalPages: 1
    };
  },
  created() {
    this.fetchStats();
  },
  methods: {
    fetchStats(page = 0) {
      const token = localStorage.getItem('token');
      axios
          .get('/api/financialstats', {
            headers: {
              'Authorization': token
            },
            params: {
              page: page,
              size: 10
            }
          })
          .then(response => {
            this.stats = response.data.content;
            this.currentPage = response.data.number;
            this.totalPages = response.data.totalPages;
          })
          .catch(error => {
            console.error('获取财务记录失败:', error);
          });
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
      this.showCreateForm = !this.showCreateForm;
    },
    createStats() {
      const token = localStorage.getItem('token');
      axios
          .post('/api/financialstats', this.newStats, {
            headers: {
              'Authorization': token
            }
          })
          .then(() => {
            this.fetchStats();
            this.showCreateForm = false;
            this.newStats = {
              statsDate: '',
              salesAmount: 0,
              purchaseAmount: 0,
              returnAmount: 0
            };
          })
          .catch(error => {
            console.error('创建财务记录失败:', error);
          });
    },
    editStats(stats) {
      this.editingStats = { ...stats, statsDate: stats.statsDate.split('T')[0] };
    },
    updateStats() {
      const token = localStorage.getItem('token');
      axios
          .put(`/api/financialstats/${this.editingStats.statsId}`, this.editingStats, {
            headers: {
              'Authorization': token
            }
          })
          .then(() => {
            this.fetchStats();
            this.editingStats = null;
          })
          .catch(error => {
            console.error('更新财务记录失败:', error);
          });
    },
    deleteStats(id) {
      const token = localStorage.getItem('token');
      axios
          .delete(`/api/financialstats/${id}`, {
            headers: {
              'Authorization': token
            }
          })
          .then(() => {
            this.fetchStats();
          })
          .catch(error => {
            console.error('删除财务记录失败:', error);
          });
    },
    cancelEdit() {
      this.editingStats = null;
    },
    changePage(page) {
      if (page >= 0 && page < this.totalPages) {
        this.fetchStats(page);
      }
    },
    navigateToSalesQuery() {
      this.$router.push({ name: 'SalesQuery' });
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

.pagination {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.pagination button {
  padding: 10px;
}
</style>
