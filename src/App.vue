<template>
  <div id="app">
    <nav v-if="showNav">
      <router-link to="/home">首页</router-link>
      <router-link to="/financial-stats">财务记录管理</router-link>
      <router-link to="/drug-inventory">药品库存管理</router-link>
      <router-link to="/drug-manage">药品管理</router-link>
      <router-link to="/drug-predict">药品库存预测</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('token');
    },
    showNav() {
      const noNavRoutes = ['Login', 'Register'];
      return this.isLoggedIn && !noNavRoutes.includes(this.$route.name);
    }
  }
};
</script>

<style>
nav {
  padding: 16px;
}

nav a {
  margin-right: 16px;
  text-decoration: none;
  color: #42b983;
}

nav a.router-link-exact-active {
  font-weight: bold;
}
</style>
