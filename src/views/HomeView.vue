<template>
  <div class="max-w-4xl mx-auto p-5">
    <h1 class="text-5xl font-extrabold mb-10 text-center text-indigo-600 animate-fadeIn">欢迎来到医药销售系统</h1>
    <div class="bg-white rounded-lg shadow-lg p-8 mb-10 hover:shadow-2xl transition-shadow duration-300 animate-fadeIn">
      <h2 class="text-3xl font-bold mb-6 text-gray-800 flex items-center">
        <i class="fas fa-info-circle mr-2"></i>概述
      </h2>
      <p class="text-lg text-gray-700">设计人员：<br>朱仕邦<br>黄滨宏<br>陈磊<br></p>
    </div>
    <div class="bg-white rounded-lg shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300 animate-fadeIn">
      <h2 class="text-3xl font-bold mb-6 text-gray-800 flex items-center">
        <i class="fas fa-list-ul mr-2"></i>功能概览
      </h2>
      <ul class="list-disc pl-5 space-y-2">
        <li><a @click="navigateTo('DrugManage')" class="text-blue-500 hover:underline flex items-center">
          <i class="fas fa-pills mr-2"></i>药品管理
        </a></li>
        <li><a @click="navigateTo('FinancialStats')" class="text-blue-500 hover:underline flex items-center">
          <i class="fas fa-file-invoice-dollar mr-2"></i>财务记录管理
        </a></li>
        <li><a @click="navigateTo('SalesQuery')" class="text-blue-500 hover:underline flex items-center">
          <i class="fas fa-search-dollar mr-2"></i>销售记录查询
        </a></li>
        <li><a @click="navigateTo('DrugInventory')" class="text-blue-500 hover:underline flex items-center">
          <i class="fas fa-warehouse mr-2"></i>药品库存管理
        </a></li>
        <li><a @click="navigateTo('DrugPredict')" class="text-blue-500 hover:underline flex items-center">
          <i class="fas fa-chart-line mr-2"></i>药品库存AI预测
        </a></li>
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
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.animate-fadeIn {
  animation: fadeIn 2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.custom-link {
  @apply text-blue-500 hover:text-blue-700 transition-colors duration-300;
}
</style>
