<template>
  <div id="app">
    <NavBar :currentUser="currentUser" @onLoggedOut="onLoggedOut"/>
    <!-- Render the content of the current page view -->
    <router-view :currentUser="currentUser" @onLoggedIn="onLoggedIn"/>
  </div>
</template>

<script>
import { Api } from '@/Api.js'
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      currentUser: null
    }
  },
  methods: {
    onLoggedIn(user) {
      this.currentUser = user
      this.$router.push('/')
    },
    onLoggedOut() {
      Api.post('/logout', {})
      this.currentUser = null
    }
  },
  mounted() {
    Api.get('/login/refresh')
      .then(resp => {
        this.currentUser = resp.data
      })
      // eslint-disable-next-line
      .catch(err => { this.currentUser = null })
  }
}
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css");

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
