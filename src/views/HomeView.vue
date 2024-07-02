<template>
  <div class="container">
    <h1>欢迎来到医药销售系统</h1>
    <div class="card">
      <h2>概述</h2>
      <p>设计人员：<br>朱仕邦<br>黄滨宏<br>陈磊<br></p>
    </div>
    <div class="card">
      <h2>功能概览</h2>
      <ul>
        <li><a @click="navigateTo('DrugManage')">药品管理</a></li>
        <li><a @click="navigateTo('FinancialStats')">财务记录管理</a></li>
        <li><a @click="navigateTo('SalesQuery')">销售记录查询</a></li>
        <li><a @click="navigateTo('DrugInventory')">药品库存管理</a></li>
        <li><a @click="navigateTo('DrugPredict')">药品库存AI预测</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    navigateTo(page) {
      this.$router.push({ name: page });
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
</style>
