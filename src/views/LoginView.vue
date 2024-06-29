<template>
  <div>
    <div v-if="!isLoggedIn">
      <h2>用户登录</h2>
      <form @submit.prevent="login">
        <label>
          用户名:
          <input v-model="loginData.username" type="text" required />
        </label>
        <label>
          密码:
          <input v-model="loginData.password" type="password" required />
        </label>
        <button type="submit">登录</button>
      </form>

      <button @click="toggleRegister">注册</button>

      <div v-if="showRegister">
        <h2>用户注册</h2>
        <form @submit.prevent="register">
          <label>
            用户名:
            <input v-model="registerData.username" type="text" required />
          </label>
          <label>
            密码:
            <input v-model="registerData.password" type="password" required />
          </label>
          <label>
            角色ID:
            <input v-model.number="registerData.role.roleId" type="number" required />
          </label>
          <button type="submit">注册</button>
          <button type="button" @click="toggleRegister">取消</button>
        </form>
      </div>
    </div>

    <div v-if="isLoggedIn">
      <h1>欢迎, {{ username }}!</h1>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isLoggedIn: false,
      username: '',
      showRegister: false,
      loginData: {
        username: '',
        password: ''
      },
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
    toggleRegister() {
      this.showRegister = !this.showRegister;
    },
    login() {
      axios
          .post('/api/auth/login', this.loginData)
          .then(response => {
            const token = response.data;
            localStorage.setItem('token', token);
            console.log('登录成功:', token)
            console.log(response.data)
            console.log(localStorage.getItem('token'))

            this.username = this.loginData.username;
            this.isLoggedIn = true;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            this.$router.push({ name: 'Home' });
            alert('登录成功');
          })
          .catch(error => {
            console.error('登录失败:', error);
            alert('登录失败，请检查用户名和密码');
          });
    },
    register() {
      axios
          .post('/api/auth/register', this.registerData)
          .then(response => {
            console.log('注册成功:', response.data);
            alert('注册成功，请登录');
            this.toggleRegister();
          })
          .catch(error => {
            console.error('注册失败:', error);
            alert('注册失败，请重试');
          });
    }
  },
  created() {
    localStorage.removeItem('token'); // 每次进入系统时清除 token
  }
};
</script>

<style scoped>
form {
  margin-top: 20px;
}
form label {
  display: block;
  margin-bottom: 10px;
}
form input {
  margin-left: 10px;
}
form button {
  margin-top: 10px;
  margin-right: 10px;
}
</style>
