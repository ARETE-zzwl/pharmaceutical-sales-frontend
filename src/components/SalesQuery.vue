<template>
  <div>
    <h1>查询销售记录和财务报表</h1>

    <!-- 通过ID查询销售记录 -->
    <div>
      <h2>按ID查询销售记录</h2>
      <input type="text" v-model="queryId" placeholder="输入销售记录ID" />
      <button @click="fetchSalesRecordById">搜索</button>
    </div>

    <!-- 显示销售记录结果 -->
    <div v-if="salesRecord">
      <h3>销售记录：</h3>
      <table>
        <thead>
        <tr>
          <th>销售ID</th>
          <th>药品名称</th>
          <th>规格</th>
          <th>生产商</th>
          <th>批号</th>
          <th>过期日期</th>
          <th>数量</th>
          <th>单价</th>
          <th>总价</th>
          <th>客户名称</th>
          <th>联系方式</th>
          <th>购买历史</th>
          <th>销售日期</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{ salesRecord.salesId }}</td>
          <td>{{ salesRecord.drug.name }}</td>
          <td>{{ salesRecord.drug.specification }}</td>
          <td>{{ salesRecord.drug.manufacturer }}</td>
          <td>{{ salesRecord.drug.batchNumber }}</td>
          <td>{{ formatDate(salesRecord.drug.expirationDate) }}</td>
          <td>{{ salesRecord.quantity }}</td>
          <td>{{ salesRecord.unitPrice }}</td>
          <td>{{ salesRecord.quantity * salesRecord.unitPrice }}</td>
          <td>{{ salesRecord.customer.name }}</td>
          <td>{{ salesRecord.customer.contactInfo }}</td>
          <td>{{ salesRecord.customer.purchaseHistory }}</td>
          <td>{{ formatDate(salesRecord.salesDate) }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- 通过日期查询财务报表 -->
    <div>
      <h2>按日期查询财务报表</h2>
      <input type="date" v-model="queryDate" />
      <button @click="fetchFinancialStatsByDate">搜索</button>
    </div>

    <!-- 显示财务报表结果 -->
    <div v-if="financialStats.length">
      <h3>财务报表：</h3>
      <table>
        <thead>
        <tr>
          <th>统计ID</th>
          <th>日期</th>
          <th>销售金额</th>
          <th>采购金额</th>
          <th>退货金额</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="stat in financialStats" :key="stat.statsId">
          <td>{{ stat.statsId }}</td>
          <td>{{ formatDate(stat.statsDate) }}</td>
          <td>{{ stat.salesAmount }}</td>
          <td>{{ stat.purchaseAmount }}</td>
          <td>{{ stat.returnAmount }}</td>
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
      queryId: '',
      queryDate: '',
      salesRecord: null,
      financialStats: []
    };
  },
  methods: {
    fetchSalesRecordById() {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios
          .get(`/api/sales/${this.queryId}`)
          .then(response => {
            this.salesRecord = response.data;
          })
          .catch(error => {
            console.error('获取销售记录出错:', error);
          });
    },
    fetchFinancialStatsByDate() {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios
          .get('/api/financialstats/byDate', {
            params: {
              statsDate: this.queryDate
            }
          })
          .then(response => {
            this.financialStats = [response.data];
          })
          .catch(error => {
            console.error('获取财务报表出错:', error);
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
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
table, th, td {
  border: 1px solid black;
}
th, td {
  padding: 10px;
  text-align: left;
}
form {
  margin-top: 20px;
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
  margin-right: 10px;
}
</style>
