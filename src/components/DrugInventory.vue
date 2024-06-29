<template>
  <div class="container">
    <h1>药品库存</h1>
    <div class="card">
      <h2>库存详情</h2>
      <table>
        <thead>
        <tr>
          <th>药品名称</th>
          <th>库存量</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in inventory" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.quantity }}</td>
          <td><button @click="viewDetails(item)">查看详情</button></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inventory: [
        { id: 1, name: '药品A', quantity: 100 },
        { id: 2, name: '药品B', quantity: 200 }
      ]
    };
  },
  methods: {
    viewDetails(item) {
      alert(`药品: ${item.name}, 库存量: ${item.quantity}`);
    }
  }
};
</script>
