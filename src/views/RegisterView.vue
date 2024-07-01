<template>
  <div class="login-container">
    <h2>用户注册</h2>
    <form @submit.prevent="register">
      <label class="login-label">
        用户名:
        <input v-model="registerData.username" type="text" required />
      </label>
      <label class="login-label">
        密码:
        <input v-model="registerData.password" type="password" required />
      </label>
      <label class="login-label">
        角色:
        <select v-model.number="registerData.role.roleId" required>
          <option v-for="role in roles" :key="role.roleId" :value="role.roleId">
            {{ role.roleName }}
          </option>
        </select>
      </label>
      <div class="login-buttons">
        <button type="submit" class="submit-btn">注册</button>
        <button type="button" @click="goToLogin" class="cancel-btn">取消</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      registerData: {
        username: '',
        password: '',
        role: {
          roleId: 1 // Default role ID
        }
      },
      roles: [] // Array to store roles fetched from the backend
    };
  },
  created() {
    this.fetchRoles(); // Fetch roles when the component is created
  },
  methods: {
    fetchRoles() {
      axios
          .get('/api/roles') // Endpoint to fetch roles
          .then(response => {
            this.roles = response.data; // Store the roles in the component's data
          })
          .catch(error => {
            console.error('获取角色失败:', error);
            alert('获取角色失败，请重试');
          });
    },
    register() {
      axios
          .post('/api/auth/register', this.registerData) // Endpoint to register the user
          .then(response => {
            console.log('注册成功:', response.data);
            alert('注册成功，请登录');
            this.$router.push({ name: 'Login' }); // Navigate to login page on success
          })
          .catch(error => {
            console.error('注册失败:', error);
            alert('注册失败，请重试');
          });
    },
    goToLogin() {
      this.$router.push({ name: 'Login' }); // Navigate to login page
    }
  }
};
</script>

<style src="../css/login.css"></style>
