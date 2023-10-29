<template>
  <div class="container"> <!-- TODO: maybe have common container class and css later on-->
    <div id="title">
      <h2>{{ this.currentUser.username + '\'s Messages' }}</h2>
    </div>
    <div id="buttonsContainer">
      <b-button id="button" variant="primary" v-b-modal.sendMessageModal>New Message</b-button>
    </div>
      <b-tabs>
        <b-tab title="Inbox" active>
          <div id="receivedContainer">
            <MessageListElement class="items" v-for="message in receivedMessages" v-bind:key="message.id" :message="message" :currentUser="currentUser" parentTitle='Inbox' />
          </div>
        </b-tab>
        <b-tab title="Sent">
          <div id="sentContainer">
            <MessageListElement class="items" v-for="message in sentMessages" v-bind:key="message.id" :message="message" :currentUser="currentUser"/>
          </div>
        </b-tab>
      </b-tabs>
    <b-modal id="sendMessageModal" title="Send Message" @ok="callSendMessage">
      <b-form-input style="margin: 10px auto" v-model="receiverContent" placeholder="Enter username of the receiver here..."></b-form-input>
      <b-form-input style="margin: 10px auto" v-model="titleContent" placeholder="Enter title here..."></b-form-input>
      <b-form-textarea style="margin: 10px auto" v-model="messageContent" placeholder="text here..."></b-form-textarea>
    </b-modal>
  </div>
</template>

<script>

import MessageListElement from '@/components/MessageListElement.vue'
import { Api } from '../Api'

export default {
  name: 'messages',
  components: {
    MessageListElement
  },
  props: {
    currentUser: Object
  },
  data() {
    return {
      messages: [],
      receivedMessages: [],
      sentMessages: [],
      receiver: '',
      messageContent: '',
      titleContent: '',
      receiverContent: ''
    }
  },
  mounted() {
    this.fetchMessages()
  },
  methods: {
    isLoggedIn() {
      return this.currentUser
    },
    callSendMessage() {
      Api.post('/messages', { title: this.titleContent, message: this.messageContent, receiver: this.receiverContent })
        .then(resp => {
          this.titleContent = ''
          this.receiverContent = ''
          this.messageContent = ''
          // Call this to update the inbox and outbox
          this.fetchMessages()
        })
        .catch(err => console.log(err)) // TODO: handle? this would happen when cookie expires
    },
    fetchMessages() {
      Api.get('/messages')
        .then(resp => {
          this.receivedMessages = resp.data.messages
            .filter(e => e.receiver._id === this.currentUser.id)

          this.sentMessages = resp.data.messages
            .filter(e => e.sender._id === this.currentUser.id)
        })
        .catch(() => { this.$router.push('/') })
    }
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
    display: flex;
  flex-direction: column;
}

h2 {
  text-align: left;
}

#receivedContainer, #sentContainer{
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
  flex-direction: column;
}

#title {
height: fit-content;
  min-width:200px ;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, .2);
  backdrop-filter: blur(9px);
  color: #fff;
  border-radius: 12px;
  padding: 30px 40px;
  text-align: center;
  overflow-wrap: break-word;
  width: auto;
  justify-content: center;
}

#messageContainer {
  margin: 40px auto 10px auto;
}

#buttonsContainer {
  margin: 40px auto 10px auto;
}

#messagePaginationNav {
  margin-top: 20px;
}

@media screen and (max-width: 768px) {
  .container {
 font-family: sans-serif;
    background-color: #f2f2f2;
    margin: 0;
  }

  #receivedContainer, #sentContainer{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    grid-gap: 1px;
    grid-auto-rows: minmax(180px, auto);
    grid-auto-flow: dense;
    padding: 1px;
  }
  .items{
     padding: 1rem;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    color: #000;
    background-color: #ccc;
    border-radius: 10px;
  }

}
</style>
