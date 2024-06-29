<template>
  <div>
    <h1>药品检索</h1>
    <div>
      <label for="searchName">药品名称：</label>
      <input v-model="searchName" id="searchName" placeholder="输入药品名称" />
      <button @click="searchDrugs" class="search-button">搜索</button>
    </div>

    <div v-if="drugs.length">
      <h3>检索结果：</h3>
      <table>
        <thead>
        <tr>
          <th>药品ID</th>
          <th>药品名称</th>
          <th>规格</th>
          <th>生产商</th>
          <th>批号</th>
          <th>过期日期</th>
          <th>单价</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="drug in drugs" :key="drug.drugId">
          <td>{{ drug.drugId }}</td>
          <td>{{ drug.name }}</td>
          <td>{{ drug.specification }}</td>
          <td>{{ drug.manufacturer }}</td>
          <td>{{ drug.batchNumber }}</td>
          <td>{{ formatDate(drug.expirationDate) }}</td>
          <td>{{ drug.unitPrice }}</td>
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
      searchName: '',
      drugs: []
    };
  },
  methods: {
    searchDrugs() {
      axios
          .get('/api/drugs/search', {
            params: {
              name: this.searchName
            }
          })
          .then(response => {
            this.drugs = response.data;
          })
          .catch(error => {
            console.error('药品检索出错:', error);
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
  padding: 10px;
  border: 1px solid #ccc; /* 边框颜色 */
  border-radius: 4px; /* 边框圆角 */
  width: 80%; /* 根据需要设置宽度 */
  box-sizing: border-box; /* 确保padding和border不会增加元素的总宽度 */
  font-size: 16px; /* 字体大小 */
  color: #333; /* 字体颜色 */
  transition: border-color 0.3s ease; /* 过渡效果，使边框颜色变化更平滑 */
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
