<template>
  <div id="building">
    <div class="login-container">
      <div class="login-box">
        <h1>医药销售系统</h1>
        <h2>用户登录</h2>
        <form @submit.prevent="login">
          <label class="login-label">
            用户名:
            <input v-model="loginData.username" type="text" required />
          </label>
          <label class="login-label">
            密码:
            <input v-model="loginData.password" type="password" required/>
          </label>
          <div class="login-buttons">
            <button type="submit" class="submit-btn">登录</button>
            <button type="button" @click="goToRegister" class="register-button">注册</button>
          </div>
        </form>
      </div>
    </div>
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
            const token = response.data;
            console.log(token);
            // 检查 token 是否包含两个点字符
            if (token.split('.').length === 3) {
              localStorage.setItem('token', `Bearer ${token}`);
              this.$router.push({name: 'Home'});
            } else {
              alert('登录失败，获取的令牌格式不正确');
              console.error('登录失败，获取的令牌格式不正确:', token);
            }
          })
          .catch(error => {
            console.error('登录失败:', error);
            alert('登录失败，请检查用户名和密码');
          });
    },
    goToRegister() {
      this.$router.push({name: 'Register'});
    }
  }
};
</script>

<style scoped>
#building {
  background: url("../assets/background.jpg") no-repeat center center fixed;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: fixed;
  margin: 0;
  padding: 0;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: transparent;
}

.login-box {
  background-color: rgba(0, 123, 255, 0.8);
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  animation: fadeIn 2s;
  width: 100%;
  max-width: 400px;
}

h1 {
  font-size: 2.5em;
  color: #000000; /* 黑色文字 */
  margin-bottom: 20px;
}

h2 {
  font-size: 1.5em;
  color: #000000; /* 黑色文字 */
  margin-bottom: 20px;
}

.login-label {
  display: block;
  margin-bottom: 15px;
  font-size: 1.2em;
  color: #000000; /* 黑色文字 */
}

.login-label input {
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-buttons {
  display: flex;
  justify-content: space-between;
}

.login-buttons button {
  width: 48%;
  padding: 10px;
  font-size: 1em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn {
  background-color: #42b983;
  color: #fff;
}

.submit-btn:hover {
  background-color: #369f6e;
}

.register-button {
  background-color: #3498db;
  color: #fff;
}

.register-button:hover {
  background-color: #2980b9;
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
