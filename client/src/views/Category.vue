<template>
  <div class="container"> <!-- TODO: maybe have common container class and css later on-->
    <div id="titleContainer">
      <div class="title">
        <h2>{{ category.name }}</h2>
        <p>{{ category.description }}</p>
      </div>
      <b-button id="button" variant="primary" v-b-modal.editCategoryModal v-if="isAdmin()">Update category</b-button>
      <b-button id="button" variant="primary" v-b-modal.createPostModal v-if="isLoggedIn()">New Post</b-button>
    </div>
    <div class="postContainer" id="postContainer">
      <ThreadListElement v-for="thread in threads" v-bind:key="thread.id" :thread="thread" />
      <b-pagination-nav id="postPaginationNav" :link-gen="generatePaginationLink" :number-of-pages="numPages" align="center" use-router/>
    </div>
    <b-modal id="createPostModal" title="Create a new post" @ok="createPost"> <!-- TODO: custom buttons -->
      <div id="createPostContainer">
        <b-form-input style="margin: 10px auto" v-model="postTitle" placeholder="Enter post title here..."></b-form-input>
        <b-form-textarea style="margin: 10px auto" id="postContent" v-model="postContent" placeholder="Enter post content here..." rows="3" max-rows="6" />
      </div>
    </b-modal>
    <b-modal id="editCategoryModal" title="Edit the category" @ok="updateCategory">
      <b-form-input style="margin: 10px auto" v-model="updateCategoryModalTitle" placeholder="Enter category title here..."></b-form-input>
      <b-form-input style="margin: 10px auto" v-model="updateCategoryModalDescription" placeholder="Enter category description here..."></b-form-input>
    </b-modal>
  </div>
</template>

<script>

import ThreadListElement from '@/components/ThreadListElement.vue'
import { Api } from '../Api'

const POSTS_PER_PAGE = 10

export default {
  name: 'category',
  components: {
    ThreadListElement
  },
  props: {
    currentUser: Object
  },
  data() {
    return {
      category: { name: '', description: '' },
      threads: [],
      numPages: 1,
      postTitle: '',
      postContent: '',
      updateCategoryModalTitle: '',
      updateCategoryModalDescription: ''
    }
  },
  mounted() {
    Api.get(`/categories/${this.$route.params.categoryId}`)
      .then(resp => { this.category = resp.data })
      .catch(() => { this.$router.push('/') })

    this.fetchThreads()
  },
  watch: {
    $route() {
      this.fetchThreads()
    }
  },
  methods: {
    generatePaginationLink(pageNum) {
      const offset = (pageNum - 1) * POSTS_PER_PAGE
      return `${this.$route.path}?offset=${offset}&limit=${POSTS_PER_PAGE}`
    },
    isLoggedIn() {
      return this.currentUser
    },
    isAdmin() {
      return this.currentUser?.isAdmin
    },
    createPost() {
      Api.post('/threads', { title: this.postTitle, message: this.postContent, categoryId: this.$route.params.categoryId })
        .then(resp => {
          this.postTitle = ''
          this.postContent = ''
          this.fetchThreads()
        })
        .catch(err => console.log(err)) // TODO: handle? this would happen when cookie expires
    },
    fetchThreads() {
      Api.get(`/categories/${this.$route.params.categoryId}/threads?offset=${(this.$route.query.offset | 0)}&limit=${POSTS_PER_PAGE}`)
        .then(resp => {
          this.threads = resp.data.threads
          this.numPages = Math.max(1, Math.ceil(resp.data.totalPosts / POSTS_PER_PAGE))
        })
        .catch(err => {
          // handled in the other call
          console.log(err)
        })
    },
    updateCategory() {
      Api.put(`/categories/${this.$route.params.categoryId}`, { name: this.updateCategoryModalTitle, description: this.updateCategoryModalDescription })
        .then(resp => { this.category = resp.data })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style>
@import '../styles/styles.css';

.container {
  min-height: max-content;
  margin: auto;
  border: 1px solid var(--gray);
  border-radius: 0.3rem;
  display: flex;
  orientation: row;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: auto;
  overflow: auto;
}

h2 {
  text-align: left;
}

#titleContainer {
  display: flex;
  orientation: row;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.title{
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

#button {
  height: fit-content;
  margin-top: 10px;
}

#postContainer {
  margin: auto;
  text-overflow: ellipsis;
  position: center;
  max-width: 100%;
}

#postPaginationNav {
  margin-top: 20px;
}

.vstack {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-self: stretch;
}

</style>
