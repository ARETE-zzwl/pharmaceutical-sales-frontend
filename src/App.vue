<template>
  <div id="app">
    <nav>
      <router-link to="/" class="nav-link">首页</router-link>
      <router-link to="/sales-query" class="nav-link">查询销售记录和财务报表</router-link>
      <router-link to="/drug-inventory" class="nav-link">药品库存管理</router-link>
      <router-link to="/drug-search" class="nav-link">药品检索</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
/* 导航栏样式 */
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #d0e4fe;
  padding: 10px;
}

/* 导航栏链接样式 */
.nav-link {
  text-decoration: none; /* 移除下划线 */
  color: #333; /* 设置链接颜色 */
  padding: 5px 10px; /* 添加内边距，使链接之间有一定的间距 */
  margin: 0 5px; /* 添加外边距，使链接与导航栏边缘有一定的间距 */
  border-radius: 5px; /* 设置链接边框圆角 */
  transition: all 0.3s ease; /* 添加过渡效果，使悬停效果更平滑 */
}

/* 导航栏链接悬停效果 */
.nav-link:hover {
  background-color: #99badd; /* 设置悬停时的背景颜色 */
  color: #fff; /* 设置悬停时的文字颜色 */
}
</style>