<template>
  <div>
    <h1>查询销售记录和财务报表</h1>

    <!-- 通过ID查询销售记录 -->
    <div>
      <h2>按ID查询销售记录</h2>
      <label for="salesIdInput">销售记录ID：</label>
      <input type="text" v-model="queryId" id="salesIdInput" placeholder="输入销售记录ID" />
      <button @click="fetchSalesRecordById" class="search-button">搜索</button>
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
      <label for="queryDateInput">查询日期：</label>
      <input type="date" v-model="queryDate" id="queryDateInput" />
      <button @click="fetchFinancialStatsByDate" class="search-button">搜索</button>
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

    <!-- 通过年份查询每月财务报表 -->
    <div>
      <h2>按年份查询每月财务报表</h2>
      <label for="queryYearInput">查询年份：</label>
      <input type="number" v-model="queryYear" id="queryYearInput" placeholder="输入年份" />
      <button @click="fetchMonthlyStatsByYear" class="search-button">搜索</button>
    </div>

    <!-- 显示每月财务报表结果 -->
    <div v-if="monthlyStats.length">
      <h3>每月财务报表：</h3>
      <table>
        <thead>
        <tr>
          <th>年份</th>
          <th>月份</th>
          <th>销售金额</th>
          <th>采购金额</th>
          <th>退货金额</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="stat in monthlyStats" :key="`${stat.year}-${stat.month}`">
          <td>{{ stat.year }}</td>
          <td>{{ stat.month }}</td>
          <td>{{ stat.totalSales }}</td>
          <td>{{ stat.totalPurchases }}</td>
          <td>{{ stat.totalReturns }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- 通过年份查询当年总财务报表 -->
    <div>
      <h2>按年份查询当年总财务报表</h2>
      <label for="queryYearInputYearly">查询年份：</label>
      <input type="number" v-model="queryYearly" id="queryYearInputYearly" placeholder="输入年份" />
      <button @click="fetchYearlyStatsByYear" class="search-button">搜索</button>
    </div>

    <!-- 显示当年总财务报表结果 -->
    <div v-if="yearlyStats && yearlyStats.length">
      <h3>当年总财务报表：</h3>
      <table>
        <thead>
        <tr>
          <th>年份</th>
          <th>销售金额</th>
          <th>采购金额</th>
          <th>退货金额</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="stat in yearlyStats" :key="stat.year">
          <td>{{ stat.year }}</td>
          <td>{{ stat.totalSales }}</td>
          <td>{{ stat.totalPurchases }}</td>
          <td>{{ stat.totalReturns }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { parseISO, format } from 'date-fns';

export default {
  data() {
    return {
      queryId: '',
      queryDate: '',
      queryYear: '',
      queryYearly: '',
      salesRecord: null,
      financialStats: [],
      monthlyStats: [],
      yearlyStats: null
    };
  },
  methods: {
    fetchSalesRecordById() {
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
      axios
          .get('/api/financialstats/byDate', {
            params: {
              statsDate: this.queryDate
            }
          })
          .then(response => {
            this.financialStats = response.data;
          })
          .catch(error => {
            console.error('获取财务报表出错:', error);
          });
    },
    fetchMonthlyStatsByYear() {
      axios
          .get('/api/financialstats/monthlyStats', {
            params: {
              year: this.queryYear
            }
          })
          .then(response => {
            this.monthlyStats = response.data;
          })
          .catch(error => {
            console.error('获取每月财务报表出错:', error);
          });
    },
    fetchYearlyStatsByYear() {
      axios
          .get('/api/financialstats/yearlyStats', {
            params: {
              year: this.queryYearly
            }
          })
          .then(response => {
            this.yearlyStats = response.data;
          })
          .catch(error => {
            console.error('获取当年总财务报表出错:', error);
          });
    },
    formatDate(dateString) {
      if (!dateString) {
        return 'Invalid Date';
      }
      try {
        const date = parseISO(dateString);
        return format(date, 'yyyy-MM-dd');
      } catch (error) {
        console.error('日期格式化错误:', error);
        return 'Invalid Date';
      }
    }
  }
};
</script>

<style scoped>
input{
  width: 80%;
  background-color: #f2f2f2; /* 禁用时背景颜色 */
  color: #999; /* 禁用时字体颜色 */
  cursor: not-allowed; /* 禁用时鼠标指针样式 */
}
/* 表格基本样式 */
table {
  width: 80%;
  border-collapse: collapse; /* 合并相邻边框 */
  margin-bottom: 20px; /* 与下方元素之间的间距 */
}

/* 表格头部样式 */
thead {
  background-color: #f2f2f2; /* 浅灰色背景 */
}

th, td {
  padding: 10px; /* 单元格内边距 */
  text-align: left; /* 文本左对齐 */
  border-bottom: 1px solid #ddd; /* 底部边框 */
}

/* 表格头部单元格样式 */
th {
  font-weight: bold; /* 加粗字体 */
  color: #333; /* 字体颜色 */
}

/* 表格行悬停效果 */
tr:hover {
  background-color: #f5f5f5; /* 鼠标悬停时背景色变浅 */
}

/* 表格条纹效果（可选） */
tr:nth-child(even) {
  background-color: #f9f9f9; /* 偶数行背景色稍浅 */
}

.search-button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007BFF; /* 蓝色背景 */
  border: none;
  border-radius: 5px; /* 圆角 */
  cursor: pointer;
  transition: all 0.3s ease; /* 平滑的过渡效果 */
}

/* 悬停效果 */
.search-button:hover {
  background-color: #0056b3; /* 悬停时颜色变深 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* 悬停时添加阴影 */
}

/* 活动状态样式（例如，当按钮被点击时） */
.search-button:active {
  transform: scale(0.98); /* 轻微缩小 */
  box-shadow: none; /* 移除阴影 */
}

/* 如果需要禁用按钮的样式 */
.search-button.disabled,
.search-button[disabled] {
  background-color: #ccc; /* 禁用时颜色变浅 */
  color: #999; /* 禁用时文字颜色变浅 */
  cursor: not-allowed; /* 禁用时鼠标样式变为禁止 */
}
</style>
