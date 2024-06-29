<template>
  <div>
    <nav>
      <router-link to="/" class="nav-link">首页</router-link>
      <router-link to="/sales-query" class="nav-link">查询销售记录和财务报表</router-link>
      <router-link to="/drug-inventory" class="nav-link">药品库存管理</router-link>
      <router-link to="/drug-search" class="nav-link">药品检索</router-link>
    </nav>
    <h1>欢迎来到药品销售管理系统</h1>
    <p>请从上方导航栏选择一个操作。</p>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
};
</script>
