<template>
  <div id="app">
    <nav v-if="showNav" class="navbar">
      <router-link to="/home">首页</router-link>
      <router-link to="/financial-stats">财务记录管理</router-link>
      <router-link to="/sales-query">销售记录</router-link>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navbar {
  background-color: #2c3e50;
  padding: 16px;
  display: flex;
  justify-content: space-around;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar a {
  color: #fff;
  margin-right: 16px;
  text-decoration: none;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.navbar a:hover {
  background-color: #1a252f;
}
body{
  margin:0;
  padding:0;
  border:0
}
.navbar a.router-link-exact-active {
  background-color: #42b983;
}
</style>
