<template>
  <div class="max-w-4xl mx-auto p-5">
    <h1 class="text-4xl font-bold mb-6 text-center text-indigo-600 animate-fadeIn">财务记录管理</h1>
    <div class="flex justify-between mb-6">
      <button @click="toggleCreateForm" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
        <i class="fas fa-plus mr-2"></i>新增财务记录
      </button>
      <button @click="navigateToStatsQuery" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
        <i class="fas fa-search mr-2"></i>查询财务记录
      </button>
    </div>

    <div v-if="showCreateForm" class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">新增财务记录</h2>
      <form @submit.prevent="createStats" class="space-y-4">
        <div class="flex items-center">
          <label class="w-32">日期:</label>
          <input v-model="newStats.statsDate" type="date" required class="flex-1 px-4 py-2 border rounded"/>
        </div>
        <div class="flex items-center">
          <label class="w-32">销售金额:</label>
          <input v-model.number="newStats.salesAmount" type="number" required class="flex-1 px-4 py-2 border rounded"/>
        </div>
        <div class="flex items-center">
          <label class="w-32">采购金额:</label>
          <input v-model.number="newStats.purchaseAmount" type="number" required class="flex-1 px-4 py-2 border rounded"/>
        </div>
        <div class="flex items-center">
          <label class="w-32">退货金额:</label>
          <input v-model.number="newStats.returnAmount" type="number" required class="flex-1 px-4 py-2 border rounded"/>
        </div>
        <button type="submit" class="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition duration-300">提交</button>
      </form>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">财务记录</h2>
      <table class="min-w-full bg-white">
        <thead>
        <tr>
          <th class="py-2 px-4 border-b">ID</th>
          <th class="py-2 px-4 border-b">日期</th>
          <th class="py-2 px-4 border-b">销售金额</th>
          <th class="py-2 px-4 border-b">采购金额</th>
          <th class="py-2 px-4 border-b">退货金额</th>
          <th class="py-2 px-4 border-b">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in stats" :key="item.statsId">
          <td class="py-2 px-4 border-b">{{ item.statsId }}</td>
          <td class="py-2 px-4 border-b">{{ formatDate(item.statsDate) }}</td>
          <td class="py-2 px-4 border-b">{{ item.salesAmount }}</td>
          <td class="py-2 px-4 border-b">{{ item.purchaseAmount }}</td>
          <td class="py-2 px-4 border-b">{{ item.returnAmount }}</td>
          <td class="py-2 px-4 border-b">
            <button @click="editStats(item)" class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition duration-300">
              <i class="fas fa-edit"></i>
            </button>
            <button @click="deleteStats(item.statsId)" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="flex justify-between items-center mt-4">
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 0" class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-300">
          上一页
        </button>
        <span class="text-gray-700">第 {{ currentPage + 1 }} 页 / 共 {{ totalPages }} 页</span>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage + 1 >= totalPages" class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-300">
          下一页
        </button>
      </div>
    </div>

    <div v-if="showEditModal" class="modal">
      <div class="modal-content">
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">编辑财务记录</h2>
        <form @submit.prevent="updateStats" class="space-y-4">
          <div class="flex items-center">
            <label class="w-32">日期:</label>
            <input v-model="editingStats.statsDate" type="date" required class="flex-1 px-4 py-2 border rounded"/>
          </div>
          <div class="flex items-center">
            <label class="w-32">销售金额:</label>
            <input v-model.number="editingStats.salesAmount" type="number" required class="flex-1 px-4 py-2 border rounded"/>
          </div>
          <div class="flex items-center">
            <label class="w-32">采购金额:</label>
            <input v-model.number="editingStats.purchaseAmount" type="number" required class="flex-1 px-4 py-2 border rounded"/>
          </div>
          <div class="flex items-center">
            <label class="w-32">退货金额:</label>
            <input v-model.number="editingStats.returnAmount" type="number" required class="flex-1 px-4 py-2 border rounded"/>
          </div>
          <div class="flex justify-end space-x-4">
            <button type="submit" class="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition duration-300">保存</button>
            <button type="button" @click="cancelEdit" class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-300">取消</button>
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
      stats: [],
      newStats: {
        statsDate: '',
        salesAmount: 0,
        purchaseAmount: 0,
        returnAmount: 0
      },
      editingStats: null,
      showCreateForm: false,
      showEditModal: false,
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
      this.showEditModal = true;
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
            this.showEditModal = false;
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
      this.showEditModal = false;
    },
    changePage(page) {
      if (page >= 0 && page < this.totalPages) {
        this.fetchStats(page);
      }
    },
    navigateToStatsQuery() {
      this.$router.push({ name: 'StatsQuery' });
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

.bg-white {
  background-color: white;
}

.rounded-lg {
  border-radius: 1rem;
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.shadow-2xl {
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
}

.p-5 {
  padding: 1.25rem;
}

.p-6 {
  padding: 1.5rem;
}

.p-8 {
  padding: 2rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.hover\:shadow-2xl:hover {
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
}

.transition-shadow {
  transition: box-shadow 0.3s ease-in-out;
}

.duration-300 {
  transition-duration: 300ms;
}

.animate-fadeIn {
  animation: fadeIn 2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

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
  z-index: 1000;
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
</style>
