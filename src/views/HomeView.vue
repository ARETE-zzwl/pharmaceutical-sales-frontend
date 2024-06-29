<template>
  <div>
    <nav>
      <router-link to="/">首页</router-link>
      <router-link to="/sales-query">查询销售记录和财务报表</router-link>
      <router-link to="/drug-inventory">药品库存管理</router-link>
      <router-link to="/drug-search">药品检索</router-link>
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

<style scoped>
nav {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

nav a {
  text-decoration: none;
  color: #42b983;
}

nav a.router-link-exact-active {
  font-weight: bold;
  color: #42b983;
}

h1 {
  color: #42b983;
}
</style>
