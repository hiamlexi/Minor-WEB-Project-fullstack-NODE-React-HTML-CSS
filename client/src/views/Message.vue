<template>
  <div class="container"> <!-- TODO: maybe have common container class and css later on-->
    <div class="wrapp">
      <b-button id="button" variant="primary" href="/messages">Return</b-button>
    </div>
    <div class="titleContainer">
      <h2>{{ message.title }}</h2>
  </div>
    <div class="messageContainer">
      <p>{{ message.message }}</p>
    </div>
    </div>
</template>

<script>

import { Api } from '../Api'

export default {
  name: 'message',
  data() {
    return {
      message: {}
    }
  },
  mounted() {
    Api.get(`/messages/${this.$route.params.messageId}`)
      .then(resp => { this.message = resp.data })
      .catch(() => { this.$router.push('/') })
  },
  back() {
    console.log('back')
    this.$router.push('/messages')
  }
}

</script>

<style>
.container {
  width: 90%;
  margin: auto;
  border: 1px solid var(--gray);
  border-radius: 0.3rem;
  padding: 20px;
}

.buttonContainer {
  width: flex;
  height: flex;
  object-fit: none;
  object-position: 5px 10%;
}
.titleContainer{
   padding: 10px;
    margin-top: 5px;
    background: transparent;
    display: flex;
    border: 2px solid rgba(255, 255, 255, .2);
    backdrop-filter: blur(9px);
    color: #fff;
    border-radius: 12px;
    width: auto;
    overflow-wrap: break-word;
    justify-content: space-between;
    gap: 10px;
    overflow: auto;
}
.messageContainer {
    padding: 10px;
    margin-top: 5px;
    background: transparent;
    display: flex;
    border: 2px solid rgba(255, 255, 255, .2);
    backdrop-filter: blur(9px);
    color: #fff;
    border-radius: 12px;
    width: auto;
    overflow-wrap: break-word;
    justify-content: space-between;
    gap: 10px;
    overflow: auto;
}

</style>
