<template>
  <b-card :bg-variant=color text-variant="black" :header=message.title class="MessageListElement" @click="onClick()">
    <div class="infoContainer">
      <p>{{ info }}</p>
    </div>
    <div class="messagePreview">
      <p>{{ message.message.length > 30 ? message.message.substring(0, 30) + "..." : message.message }}</p>
    </div>
  </b-card>
</template>

<script>
import { Api } from '../Api'
export default {
  props: {
    message: Object,
    currentUser: Object,
    parentTitle: String
  },
  computed: {
    color() {
      if (this.currentUser.id === this.message.sender) {
        return 'light'
      }
      return this.message.readStatus ? 'light' : 'primary'
    },
    info() {
      if (this.parentTitle === 'Inbox') {
        return `From: ${this.message.sender.username}`
      }
      return `To: ${this.message.receiver.username}`
    }
  },
  methods: {
    onClick() {
      if (this.currentUser.id === this.message.receiver && !this.message.readStatus) {
        Api.put(`/messages/${this.message._id}`)
      }
      this.$router.push(`/messages/${this.message._id}`)
    },
    isLoggedIn() {
      return this.currentUser != null
    }
  }
}

</script>

<style scoped>
.MessageListElement {
  width: 75%;
  margin: 5px auto;
  padding: 20px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--gray);
  border-radius: 4.8px;
  background-color: #ffffff; /* TODO define var */
}/* TODO I dont think this styling shows up in the view */

.messageListElement:hover {
  cursor: pointer;
}

.messageListElement:hover .messageTitle {
  text-decoration: underline;
  color: var(--blue);
}

.messageContent {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.messageTitle {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}

.messagePreview {
  font-size: 16px;
  margin: 0;
}
.senderAndDate {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.senderAndDate p {
  margin: auto 10px auto auto;
  color: var(--gray);
  font-size: 12px;
}

.messageInfo {
  margin-top: 5px;
}
.infoContainer .messagePreview{
  background-color: #ffffff;
}
</style>
