<template>
    <div class="thread">
        <div class="container">
            <div class="topic-container">
                <div class="head-post">
                    <div class="content">Topic: {{ thread.title }}</div>
                </div>
                <div class="body" v-for="post in posts" v-bind:key="post._id">
                    <div class="poster">
                        <div class="username"><a :href="'/users/' + post.poster._id">{{ post.poster.username }}</a></div>
                        <img class="defaultAva" src="https://i.pinimg.com/564x/01/7e/31/017e31fc00e8461ea8ccda4fffa69bf3.jpg" alt="">
                    </div>
                    <div class="content" v-if="!isEditing(post._id)">{{ post.message }}</div>
                    <form class="content" @submit="onSubmitEdit" v-else>
                      <textarea name="editComment" class="comment-area" placeholder="Write your comment..." v-model="editPostText" />
                      <div id="edit_button_container">
                        <b-button type="submit" variant="primary" size="sm">Save</b-button>
                        <b-button id="edit_post_button" variant="secondary" size="sm" @click="onCancelEdit()">Cancel</b-button>
                      </div>
                    </form>
                    <b-button id="edit_post_button" variant="primary" size="sm" @click="onEditPostClick(post)" v-if="canEdit(post.poster) && !isEditing(post._id)">Edit</b-button>
                    <!-- Same conditions for showing here. Maybe add a confirmation dialog later -->
                    <b-button id="edit_post_button" variant="danger" size="sm" @click="onDeletePostClick(post)" v-if="canEdit(post.poster) && !isEditing(post._id)">Delete</b-button>
                </div>
            </div>
            <form class="comment-area" id="comment-area" @submit="onSubmit" v-if="isLoggedIn()">
                <textarea name="comment" placeholder="Write your comment..." v-model="postText"></textarea>
                <input type="submit" value="submit">
            </form>
        </div>
    </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'Thread',
  props: {
    currentUser: Object
  },
  data() {
    return {
      thread: { title: '' },
      posts: [],
      postText: '',
      editPostText: '',
      currentlyEditedPost: null
    }
  },
  mounted() {
    Api.get(`/threads/${this.$route.params.threadId}`)
      .then(resp => { this.thread = resp.data })
      .catch(err => console.log(err)) // TODO: handle?

    this.fetchPosts()
  },
  methods: {
    isLoggedIn() {
      return this.currentUser
    },
    onSubmit(event) {
      event.preventDefault()
      Api.post(`/threads/${this.$route.params.threadId}/posts`, { message: this.postText })
        .then(() => {
          this.postText = ''
          this.fetchPosts()
        })
    },
    fetchPosts() {
      Api.get(`/threads/${this.$route.params.threadId}/posts`)
        .then(resp => { this.posts = resp.data.posts })
        .catch(err => console.log(err))
    },
    onEditPostClick(post) {
      this.currentlyEditedPost = post
      this.editPostText = post.message
    },
    isEditing(postId) {
      return this.currentlyEditedPost?._id === postId
    },
    onCancelEdit() {
      this.currentlyEditedPost = null
      this.editPostText = ''
    },
    onSubmitEdit(event) {
      event.preventDefault()
      Api.patch(`/posts/${this.currentlyEditedPost._id}`, { message: this.editPostText })
        .then(resp => {
          // BUG: When you click on edit, submit a NEW post, then finish editing the post it will not get updated until you refresh.
          // The reason for that being the onSubmit method that calls POST /posts/ will call fetchPosts() which will render the
          // reference to the edited post here obsolete. So we just fetch here :)
          // const updatedPost = resp.data
          // this.currentlyEditedPost.message = updatedPost.message
          this.fetchPosts()
          this.currentlyEditedPost = null
          this.editPostText = ''
        })
        .catch(err => console.log(err))
    },
    canEdit(author) {
      return this.currentUser?.isAdmin || this.currentUser?.id === author._id
    },
    onDeletePostClick(post) {
      Api.delete(`/posts/${post._id}`)
        .then(() => this.fetchPosts())
        .catch(err => console.log(err))
    }
  }
}
</script>

<style>
@import '../styles/styles.css';
.head-post {
    display: flex;
    background-color: #132545;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 10%;
    margin-top: 1%;
    overflow-wrap: break-word;
    width:inherit;
    height:fit-content;
    text-align-last: center;
}

.poster {
    flex: 20%;
    width: 80%;
}

.content {
    flex: 100%;
    color: #fcfcfc;
    overflow-wrap: break-word;
    width: auto;
    overflow: hidden;
    text-align: justify;
    font-size: 15px;
}

.topic-container{
    width: inherit;
    overflow-block: scroll;
    overflow-wrap: break-word;
    margin-bottom: 10%;
}

.body {
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
}

.username {
    font-size: 20px;
}

.comment-area input {
    float: right;
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
}

.body .poster img {
    height: 100px;
    width: 100px;
}

.comment-area {
    margin-bottom: 50px;
    min-width: 80%;
}
.comment{
    width: auto;
}

.comment-area textarea {
    width: 100%;
    margin-block: 10px;
    min-height: 100px;
    padding: 10px;
}

.comment-area input:hover {
    border: solid 1px #916e6e;
}

.thread {
    display: flex;
    background-size: contain;
    background: url(https://as1.ftcdn.net/v2/jpg/05/58/61/32/1000_F_558613274_Z1zbjnHZKjpnTvvsjfZzYXk2TIeUl54a.jpg) repeat;
    background-position: center;
    justify-content: center;
    margin-top: 1px;
    width: auto;
}

#edit_post_button {
  height: fit-content;
}

#edit_button_container * {
  margin: 4px;
}
</style>
