<template>
  <div class="container">
    <head>
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    </head>
    <div class="wrapper">
      <form @submit="onSubmit">
        <h1>Login</h1>
        <div class="inpux">
          <input type="text" placeholder="Enter Your Username" v-model="username" required>
          <i class='user'></i>
        </div>
        <div class="inpux">
          <input type="password" placeholder="Enter Your Password" v-model="password" required>
          <i class='lock'></i>
        </div>
        <button type="submit" class="btn">Login</button>
        <div class="register-link">
          <p>Visitor?
            <router-link to="/register">Sign up To Be A User</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api.js'

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()

      Api.post('/login/password', { username: this.username, password: this.password })
        .then(resp => this.$emit('onLoggedIn', resp.data))
        .catch(err => {
          switch (err.response?.status) {
            case 401:
              alert('Incorrect credentials!') // TODO: replace these alerts with something better? I.e. modal, highlights, or error message between button and fields
              break
            default:
              alert('Could not log in')
              break
          }
        })
    }
  }
}
</script>

<style>
@import '../styles/styles.css';

.register-link p a:hover {
  text-decoration: underline;
}

.container {
  display: flex;
  background: url(https://as1.ftcdn.net/v2/jpg/05/58/61/32/1000_F_558613274_Z1zbjnHZKjpnTvvsjfZzYXk2TIeUl54a.jpg) repeat;
  background-position: center;
  min-height: 100vh;
  min-width: 100%;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;

}

.wrapper {
  width: 50%;
  height: 50%;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, .2);
  backdrop-filter: blur(9px);
  color: #fff;
  border-radius: 12px;
  padding: 30px 40px;
}

.wrapper h1 {
  text-align: center;
  font-size: 36px;
}

.wrapper .inpux {
  height: 50px;
  position: center;
  width: 100%;
  margin: 30px 0;
}

.inpux input {
  width: 100%;
  height: 100%;
  outline: none;
  border: 2px solid rgba(255, 255, 255, .2);
  border-radius: 40px;
  font-size: 16px;
  color: #fff;
  padding: 20px 45px 20px 20px;
  background: transparent;
  border: none;
}

.inpux input::placeholder {
  color: #fff;
}

.inpux i {
  position: absolute;
  transform: translate(-50%);
  font-size: 20px;
  right: 20px;
  top: 30%;
}

.wrapper .register-link {
  font-size: 14.5px;
  margin: 20px 0 15px;
  text-align: center;
}

.wrapper .bottom {
  display: flex;
  margin: -15px 0 15px;
  justify-content: space-between;
  font-size: 14.5px;
}

.bottom a {
  color: #fff;
  text-decoration: none;
}

.bottom a:hover {
  text-decoration: underline;
}

.wrapper .btn {
  width: 100%;
  background: #fff;
  border-radius: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  cursor: pointer;
  border: none;
  outline: none;
  font-size: 16px;
  color: #333;
  height: 45px;
  font-weight: 600;
}

.bottom label input {
  accent-color: #fff;
  margin-right: 3px;
}

.register-link p a {
  color: #fff;
  font-weight: 600;
  text-decoration: none;
}

</style>
