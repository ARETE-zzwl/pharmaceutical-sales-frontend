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
        <li><a @click="navigateTo('DrugInventory')">药品库存管理</a></li>
        <li><a @click="navigateTo('DrugSearch')">药品搜索</a></li>
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
