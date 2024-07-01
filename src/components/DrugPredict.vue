<template>
  <div class="container">
    <h1>药品库存预测</h1>
    <form @submit.prevent="predictAllInventories">
      <label>
        预测天数:
        <input type="number" v-model="days" required />
      </label>
      <button type="submit">预测</button>
    </form>

    <div v-if="loading" class="loading-overlay">
      <div class="spinner"></div>
    </div>

    <div class="card" v-if="predictionResults.length && !loading">
      <h2>预测结果</h2>
      <table>
        <thead>
        <tr>
          <th>药品ID</th>
          <th>药品名称</th>
          <th>{{ days }} 天后的预测库存量</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="result in predictionResults" :key="result.drugId">
          <td>{{ result.drugId }}</td>
          <td>{{ result.drugName }}</td>
          <td>{{ result.predictedQuantity }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      drugs: [],
      days: null,
      predictionResults: [],
      loading: false
    };
  },
  created() {
    this.fetchDrugs();
  },
  methods: {
    fetchDrugs() {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('未找到登录信息，请重新登录');
        this.$router.push({ name: 'Login' });
        return;
      }

      axios
          .get('/api/drugs', {
            headers: {
              'Authorization': token
            }
          })
          .then(response => {
            this.drugs = response.data.content;
          })
          .catch(error => {
            console.error('获取药品信息失败:', error);
            alert('获取药品信息失败，请重试');
          });
    },
    predictAllInventories() {
      this.loading = true;
      const token = localStorage.getItem('token');
      if (!token) {
        alert('未找到登录信息，请重新登录');
        this.$router.push({ name: 'Login' });
        return;
      }

      const promises = this.drugs.map(drug => {
        return axios.get(`/api/inventories/${drug.drugId}/predict`, {
          headers: {
            'Authorization': token
          },
          params: {
            days: this.days
          }
        }).then(response => {
          return {
            drugId: drug.drugId,
            drugName: drug.name,
            predictedQuantity: response.data
          };
        }).catch(error => {
          console.error(`预测药品 ${drug.name} 失败:`, error);
          return {
            drugId: drug.drugId,
            drugName: drug.name,
            predictedQuantity: '预测失败'
          };
        });
      });

      Promise.all(promises).then(results => {
        this.predictionResults = results;
        this.loading = false;
      });
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
  margin-top: 20px;
  padding: 20px;
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

/* 加载动画样式 */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
