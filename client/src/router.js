import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Category from './views/Category.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Thread from './views/Thread.vue'
import Message from './views/Message.vue'
import Messages from './views/Messages.vue'
import Policy from './views/Policy.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/category/:categoryId',
      name: 'category',
      component: Category
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/threads/:threadId',
      name: 'thread',
      component: Thread
    },
    {
      path: '/messages',
      name: 'messages',
      component: Messages
    },
    {
      path: '/messages/:messageId',
      name: 'message',
      component: Message
    },
    {
      path: '/policy',
      name: 'policy',
      component: Policy
    }
  ]
})
