<template>
  <div id="building">
    <div class="login-container">
      <div class="login-box">
        <h1>医药销售系统</h1>
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
            <button type="button" @click="goToLogin" class="register-button">取消</button>
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
  height: 70vh;
  width: 450px;
  background-color: transparent;
}

.login-box {
  background-color: rgba(0, 123, 255, 0.8); /* 蓝色背景，增加透明度 */
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  animation: fadeIn 2s;
  width: 90%; /* 减少宽度 */
  max-width: 350px; /* 更窄的最大宽度 */
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
  margin-bottom: 20px; /* 增加间距 */
  font-size: 1.2em;
  color: #000000; /* 黑色文字 */
}

.login-label input, .login-label select {
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px; /* 增加按钮之间的间距 */
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
