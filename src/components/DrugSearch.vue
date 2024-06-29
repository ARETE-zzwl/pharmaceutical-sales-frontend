<template>
  <div class="container">
    <h1>药品搜索</h1>
    <div class="card">
      <h2>搜索药品</h2>
      <form @submit.prevent="searchDrug">
        <label for="name">药品名称:</label>
        <input type="text" id="name" v-model="query.name" />
        <button type="submit">搜索</button>
      </form>
    </div>
    <div class="card" v-if="results.length">
      <h2>搜索结果</h2>
      <ul>
        <li v-for="result in results" :key="result.id">{{ result.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: {
        name: ''
      },
      results: []
    };
  },
  methods: {
    searchDrug() {
      // 模拟搜索结果
      this.results = [
        { id: 1, name: '药品A' },
        { id: 2, name: '药品B' }
      ];
    }
  }
};
</script>
