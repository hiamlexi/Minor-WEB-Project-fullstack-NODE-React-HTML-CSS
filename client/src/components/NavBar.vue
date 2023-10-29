<template>
    <b-navbar class="menubar" id="navbar" toggleable="lg" type="light" variant="info">
        <b-navbar-brand class="title" href="/">ForumNamePlaceholder</b-navbar-brand>

        <b-navbar-toggle class="nav" target="nav-collapse"></b-navbar-toggle>

        <b-collapse class="nav-collapse" id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item href="/">Home</b-nav-item>
                <b-nav-item href="/">Recent Posts</b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <b-nav-form id="searchForm">
                    <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form>

                <div id="accountContentContainer" v-if="isLoggedIn()">
                  <div class="d-flex align-items-center envelopeContainer" @click="sendToMessagePage()">
                      <i class="bi bi-envelope"></i>
                      <span class="envelopeCounter">{{Unread}}</span> <!-- TODO: conditional visibility -->
                  </div>

                  <b-nav-item-dropdown id="navBarUserDropdown" right>
                      <!-- Using 'button-content' slot -->
                      <template #button-content>
                          <b-avatar class="mr-1" size="30px"></b-avatar>
                          <em>{{currentUser.username}}</em>
                      </template>
                      <b-dropdown-item @click="logOut()">Sign Out</b-dropdown-item>
                  </b-nav-item-dropdown>
                </div>
                <b-button id="loginButton" variant="primary" size="sm" class="my-2" href="/login" v-else>Login</b-button>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
import { Api } from '@/Api.js'

export default {
  props: {
    currentUser: Object
  },
  data() {
    return {
      Unread: 0
    }
  },
  methods: {
    sendToMessagePage() {
      this.$router.push('/messages')
    },
    logOut() {
      this.$emit('onLoggedOut')
    },
    isLoggedIn() {
      return this.currentUser != null
    },
    numberOfUnreadMessages() {
      Api.get('/messages')
        .then(resp => {
          this.Unread = resp.data.messages.filter(message => !message.read).length
        })
        .catch(() => {
          this.$router.push('/')
        })
      return this.Unread
    }
  },
  mounted() {
    if (this.isLoggedIn()) {
      this.numberOfUnreadMessages()
    }
  }
}
</script>

<style scoped>
@import '../styles/styles.css';

#navbar {
    margin: 0 0 20px 0;
}

#loginButton {
  margin: 8px;
}

#accountContentContainer {
  display: flex;
  margin: auto;
}

.envelopeContainer {
    position: relative;
    /* 5 px in the container and 5 in the icon is intentional */
    margin: 2px 5px;
    width: fit-content;
    height: 46px;
}

.envelopeContainer:hover {
    cursor: pointer;
}

.bi-envelope {
    font-size: 28px;
    color: var(--grey-dark);
    margin: 0 5px;
}

.envelopeCounter {
    background-color: var(--red);
    color: var(--white);
    border-radius: 2px;
    padding: 1px 3px;
    user-select: none;
    font-size: 10px;
    font-weight: bold;
    position: absolute;
    top: 0;
    right: 0;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5)
}
@media screen and (max-width: 991px) {
  #searchForm {
    gap: 8px;
    flex-flow: row;
    margin: auto;
  }
}
@media screen and (max-width: 320px ) {
  .title{
    display: none;
  }
}
  #loginButton {
    margin: 20px auto;
  }

  #navBarUserDropdown {
    width: 160px;
  }

  #accountContentContainer {
    margin: 8px auto;
  }

  .envelopeContainer {
    margin: 2px auto;
  }
</style>
