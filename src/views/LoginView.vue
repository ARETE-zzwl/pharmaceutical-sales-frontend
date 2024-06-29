<template>
  <div class="login-container">
    <h2>用户登录</h2>
    <form @submit.prevent="login">
      <label class="login-label">
        用户名:
        <input v-model="loginData.username" type="text" required />
      </label>
      <label class="login-label">
        密码:
        <input v-model="loginData.password" type="password" required />
      </label>
      <div class="login-buttons">
        <button type="submit" class="submit-btn">登录</button>
        <button type="button" @click="goToRegister" class="register-button">注册</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loginData: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    login() {
      axios
          .post('/api/auth/login', this.loginData)
          .then(response => {
            const token = response.data.token;
            localStorage.setItem('token', token);
            this.$router.push({ name: 'Home' });
          })
          .catch(error => {
            console.error('登录失败:', error);
            alert('登录失败，请检查用户名和密码');
          });
    },
    goToRegister() {
      this.$router.push({ name: 'Register' });
    }
  }
};
</script>

<style src="../css/login.css"></style>
