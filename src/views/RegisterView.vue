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
        角色ID:
        <input v-model.number="registerData.role.roleId" type="number" required />
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
          roleId: 1
        }
      }
    };
  },
  methods: {
    register() {
      axios
          .post('/api/auth/register', this.registerData)
          .then(response => {
            console.log('注册成功:', response.data);
            alert('注册成功，请登录');
            this.$router.push({ name: 'Login' });
          })
          .catch(error => {
            console.error('注册失败:', error);
            alert('注册失败，请重试');
          });
    },
    goToLogin() {
      this.$router.push({ name: 'Login' });
    }
  }
};
</script>

<style src="../css/login.css"></style>
