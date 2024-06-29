<template>
  <div>
    <h1 class="add-drug-btn">批量创建药品</h1>

    <form @submit.prevent="submitDrugs">
      <div v-for="(drug, index) in drugs" :key="index" class="drug-form-item">
        <h3>药品 {{ index + 1 }}</h3>
        <label>
          名称:
          <input v-model="drug.name" type="text" required/>
        </label>
        <label>
          规格:
          <input v-model="drug.specification" type="text" required/>
        </label>
        <label>
          生产商:
          <input v-model="drug.manufacturer" type="text" required/>
        </label>
        <label>
          批号:
          <input v-model="drug.batchNumber" type="text" required/>
        </label>
        <label>
          过期日期:
          <input v-model="drug.expirationDate" type="date" required/>
        </label>
        <label>
          单价:
          <input v-model.number="drug.unitPrice" type="number" required/>
        </label>
        <button type="button" @click="removeDrug(index)" class="remove-drug-btn">移除药品</button>
      </div>

      <button type="button" @click="addDrug" class="add-drug-btn">添加药品</button>
      <button type="submit" class="submit-btn">提交</button>
      <button type="button" @click="hideBatchCreate" class="hide-btn">隐藏</button> <!-- 新增隐藏按钮 -->
    </form>

    <div v-if="response">
      <h2>创建结果</h2>
      <ul>
        <li v-for="drug in response" :key="drug.drugId" class="li a">
          {{ drug.name }} - {{ drug.specification }} - {{ drug.manufacturer }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      drugs: [
        {
          name: '',
          specification: '',
          manufacturer: '',
          batchNumber: '',
          expirationDate: '',
          unitPrice: null
        }
      ],
      response: null
    };
  },
  methods: {
    addDrug() {
      this.drugs.push({
        name: '',
        specification: '',
        manufacturer: '',
        batchNumber: '',
        expirationDate: '',
        unitPrice: null
      });
    },
    removeDrug(index) {
      this.drugs.splice(index, 1);
    },
    submitDrugs() {
      axios
          .post('/api/drugs/batch', this.drugs)
          .then(response => {
            this.response = response.data;
            this.resetForm();
          })
          .catch(error => {
            console.error('创建药品出错:', error);
          });
    },
    resetForm() {
      this.drugs = [
        {
          name: '',
          specification: '',
          manufacturer: '',
          batchNumber: '',
          expirationDate: '',
          unitPrice: null
        }
      ];
    },
    hideBatchCreate() {
      this.$emit('hide-batch-create'); // 触发隐藏事件
    }
  }
};
</script>

<style>
form {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: none; /* 适用于textarea */
}
input{
  padding: 10px;
  border: 1px solid #ccc; /* 边框颜色 */
  border-radius: 4px; /* 边框圆角 */
  width: 100%; /* 根据需要设置宽度 */
  box-sizing: border-box; /* 确保padding和border不会增加元素的总宽度 */
  font-size: 16px; /* 字体大小 */
  color: #333; /* 字体颜色 */
  transition: border-color 0.3s ease; /* 过渡效果，使边框颜色变化更平滑 */
}
/* 标签样式 */
label {
  width: 60%;
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

/* 输入字段样式 */
.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: none; /* 适用于textarea */
}

button {
  margin-top: 10px;
}

/* 药品表单项的容器样式 */
.drug-form-item {
  margin-bottom: 15px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 15px;
}

/* 隐藏/显示结果的容器样式 */
.result-container {
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 5px;
}

/* 药品列表项的样式 */
.result-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  padding: 5px 10px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* 添加药品按钮样式 */
.add-drug-btn {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
}

/* 隐藏按钮样式 */
.hide-btn {
  background-color: #f44336; /* Red */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
}

/* 提交按钮样式 */
.submit-btn {
  background-color: #007BFF; /* Blue */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
}

/* 移除药品按钮样式 */
.remove-drug-btn {
  background-color: #f86c6b; /* Pink */
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 3px;
}

/* 列表样式 */
ul {
  list-style-type: none; /* 移除默认的列表样式 */
  padding: 0; /* 移除默认的列表内边距 */
  margin: 0; /* 移除默认的列表外边距 */
}

/* 列表项样式 */
li {
  padding: 10px; /* 列表项内边距 */
  border-bottom: 1px solid #ddd; /* 底部边框 */
  position: relative; /* 为了在子元素中使用绝对定位 */
}

/* 列表项内容样式（如果需要的话） */
li a {
  text-decoration: none; /* 移除下划线 */
  color: #333; /* 文本颜色 */
  display: block; /* 使得整个列表项区域可点击 */
  transition: all 0.3s ease; /* 过渡效果，用于鼠标悬停时 */
}

/* 鼠标悬停效果 */
li:hover {
  background-color: #f5f5f5; /* 悬停时背景色变浅 */
}

li:hover a {
  color: #007BFF; /* 悬停时文本颜色变化 */
}

/* 如果有子列表（嵌套列表） */
ul ul {
  padding-left: 20px; /* 嵌套列表的缩进 */
}

/* 响应式布局，确保在小屏幕上也能良好显示 */
@media (max-width: 600px) {
  .drug-form-container {
    padding: 10px;
  }

  .result-container {
    padding: 10px;
  }

  .result-list li {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
