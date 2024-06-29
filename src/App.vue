<template>
  <div id="app">
    <nav v-if="isLoggedIn">
      <router-link to="/">首页</router-link>
      <router-link to="/sales-query">查询销售记录和财务报表</router-link>
      <router-link to="/drug-inventory">药品库存管理</router-link>
      <router-link to="/drug-search">药品检索</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false
    };
  },
  created() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
    }
  }
};
</script>