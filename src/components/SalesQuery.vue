<template>
  <div class="container">
    <h1>销售查询</h1>
    <div class="card">
      <h2>查询条件</h2>
      <form @submit.prevent="searchSales">
        <label for="date">日期:</label>
        <input type="date" id="date" v-model="query.date" />
        <button type="submit">查询</button>
      </form>
    </div>
    <div class="card" v-if="results.length">
      <h2>查询结果</h2>
      <ul>
        <li v-for="result in results" :key="result.id">{{ result.name }} - {{ result.amount }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: {
        date: ''
      },
      results: []
    };
  },
  methods: {
    searchSales() {
      // 模拟查询结果
      this.results = [
        { id: 1, name: '产品A', amount: 100 },
        { id: 2, name: '产品B', amount: 200 }
      ];
    }
  }
};
</script>
