  <template>
    <div class="container">
      <h1>药品库存</h1>
      <div class="card">
        <h2>库存详情</h2>
        <table>
          <thead>
          <tr>
            <th>药品名称</th>
            <th>库存量</th>
            <th>单价</th>
            <th>批号</th>
            <th>过期时间</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in inventory" :key="item.inventoryId">
            <td>{{ item.drug.name }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.drug.unitPrice }}</td>
            <td>{{ item.batchNumber }}</td>
            <td>{{ formatDate(item.expirationDate) }}</td>
            <td>
              <button @click="editInventory(item)">编辑</button>
              <button @click="deleteInventory(item.inventoryId)">删除</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <button @click="toggleForm">{{ showForm ? '取消新增库存' : '新增库存' }}</button>

      <!-- 新增库存模态框 -->
      <div v-if="showForm" class="modal">
        <div class="modal-content">
          <h2>{{ editMode ? '编辑库存' : '新增库存' }}</h2>
          <form @submit.prevent="submitInventory">
            <label>
              药品ID:
              <input type="number" v-model.number="form.drug.drugId" required />
            </label>
            <label>
              库存量:
              <input type="number" v-model.number="form.quantity" required />
            </label>
            <label>
              批号:
              <input type="text" v-model="form.batchNumber" required />
            </label>
            <label>
              过期时间:
              <input type="date" v-model="form.expirationDate" required />
            </label>
            <button type="submit">{{ editMode ? '更新' : '创建' }}</button>
            <button type="button" @click="resetForm">取消</button>
          </form>
        </div>
      </div>

      <!-- 编辑库存模态框 -->
      <div v-if="showEditModal" class="modal">
        <div class="modal-content">
          <h2>编辑库存</h2>
          <form @submit.prevent="submitInventory">
            <label>
              药品ID:
              <input type="number" v-model.number="form.drug.drugId" required />
            </label>
            <label>
              库存量:
              <input type="number" v-model.number="form.quantity" required />
            </label>
            <label>
              批号:
              <input type="text" v-model="form.batchNumber" required />
            </label>
            <label>
              过期时间:
              <input type="date" v-model="form.expirationDate" required />
            </label>
            <button type="submit">更新</button>
            <button type="button" @click="closeEditModal">取消</button>
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
        editId: null
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
              this.inventory = response.data;
            })
            .catch(error => {
              console.error('查询库存失败:', error);
              alert('查询库存失败，请重试');
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
        this.showEditModal = true;
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
      closeEditModal() {
        this.showEditModal = false;
      },
      toggleForm() {
        this.showForm = !this.showForm;
        if (!this.showForm) {
          this.resetForm();
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
