<template>
  <div class="container">
    <head>
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    </head>
    <div class="wrapper">
      <form @submit="onSubmit">
        <h1>Register</h1>
        <div class="inpux">
          <input type="text" placeholder="Enter Your Username" v-model="username" required>
          <i class='user'></i>
        </div>
        <div class="inpux">
          <input type="password" placeholder="Enter Your Password" v-model="password" minlength="6" required>
          <i class='lock'></i>
        </div>
        <div class="inpux">
          <input type="password" placeholder="Repeat Your Password" v-model="passwordRepeated" minlength="6" required>
          <i class='lock'></i>
        </div>
        <div class="bottom">
          <a class="check" href="/policy"> Read policy </a>
        </div>
        <button type="submit" class="btn">Register</button>
        <div class="login-link">
          <p>Already have an account?
            <router-link to="/login">Login</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api.js'

export default {
  name: 'container',
  data() {
    return {
      username: '',
      password: '',
      passwordRepeated: ''
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()

      if (this.password !== this.passwordRepeated) {
        alert('Passwords do not match!') // TODO: replace this alert just as for the login page
        return
      }

      Api.post('/users', { username: this.username, password: this.password })
        .then(resp => {
          alert('Account created!')
          this.$router.push('/login')
        }) // TODO: replace this alert just as for the login page. Could also verify statusCode === 200
        .catch(err => console.log(err)) // TODO: need to handle cases in the backend, when username already taken for instance
    }
  }
}
</script>
<style>
@import '../styles/styles.css';

.login-link p a:hover {
  text-decoration: underline;
}

.container {
  display: flex;
  background-size: contain;
  background: url(https://as1.ftcdn.net/v2/jpg/05/58/61/32/1000_F_558613274_Z1zbjnHZKjpnTvvsjfZzYXk2TIeUl54a.jpg) repeat;
  background-position: center;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.wrapper {
  width: 420px;
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

.wrapper .login-link {
  font-size: 14.5px;
  margin: 20px 0 15px;
  text-align: center;
}

.wrapper .loginbottom {
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

.login-link p a {
  color: #fff;
  font-weight: 600;
  text-decoration: none;
}</style>
