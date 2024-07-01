<template>
  <div class="container">
    <h1>欢迎来到主页</h1>
    <div class="card">
      <h2>概述</h2>
      <p>这里是主页的概述内容。</p>
      <button @click="navigateTo('SalesQuery')">查看销售查询</button>
    </div>
    <div class="card">
      <h2>功能概览</h2>
      <ul>
        <li><a @click="navigateTo('DrugManage')">药品管理</a></li>
        <li><a @click="navigateTo('FinancialStats')">财务记录管理</a></li> <!-- 添加这个 -->
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
