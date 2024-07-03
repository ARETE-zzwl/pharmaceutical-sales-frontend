<template>
  <div class="container mx-auto p-5">
    <h1 class="text-6xl font-extrabold mb-10 text-center text-indigo-600 animate-fadeIn">欢迎来到医药销售系统</h1>
    <div class="bg-white rounded-lg shadow-lg p-10 mb-10 hover:shadow-2xl transition-shadow duration-300 animate-fadeIn">
      <h2 class="text-4xl font-bold mb-6 text-gray-800 flex items-center">
        <i class="fas fa-info-circle mr-2"></i>概述
      </h2>
      <p class="text-2xl text-gray-700 mb-6">设计人员：<br>朱仕邦<br>黄滨宏<br>陈磊<br></p>
      <div class="bg-gray-100 p-6 rounded-lg shadow-md">
        <p class="text-xl text-gray-700">医药库存管理系统旨在通过信息化手段提高医药库存管理的效率和准确性，减少人工操作的错误率，优化库存管理流程。系统基于Spring Boot后端和Vue 3前端，结合Deeplearning4j库实现的基于LSTM的时间序列预测模型进行库存AI管理。</p>
      </div>
    </div>
    <div class="bg-white rounded-lg shadow-lg p-10 hover:shadow-2xl transition-shadow duration-300 animate-fadeIn">
      <h2 class="text-4xl font-bold mb-6 text-gray-800 flex items-center">
        <i class="fas fa-list-ul mr-2"></i>功能概览
      </h2>
      <ul class="list-disc pl-5 space-y-4 text-2xl">
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
@import url('https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css');

.container {
  max-width: 1200px;
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
</style>
