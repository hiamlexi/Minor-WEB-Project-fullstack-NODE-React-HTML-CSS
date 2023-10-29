<template>
  <!-- perhaps should not be using a jumbotron but it's already styled so... maybe replace later -->
  <b-jumbotron class="categoryListElement" >
        <button id="x" @click="deleteCategory()" v-if="isAdmin">X</button>
    <div class="categoryListElementLeftContainer" @click="onClick()">
      <h2>{{ category.name }}</h2>
      <p>{{ category.description }}</p>
    </div>
    <!-- This could be a component -->
    <div class="categoryListElementDetails">
      <div>
        <h3>Threads</h3>
        <p>{{ category.numThreads }}</p>
      </div>
      <div class="detail">
        <h3>Posts</h3>
        <p>{{ category.numPosts }}</p>
      </div>
    </div>
    <div class="categoryListElementDetailsMobile">
      <p>{{ category.numThreads }} threads</p>
      <p>{{ category.numPosts }} posts</p>
    </div>
  </b-jumbotron>
</template>

<script>
export default {
  props: {
    category: Object,
    currentUser: Object
  },
  methods: {
    onClick() {
      this.$router.push(`/category/${this.category.id}`)
    },
    deleteCategory() {
      this.$emit('deleteCategory', this.category.id)
    },
    isAdmin() {
      return this.currentUser?.isAdmin
    }
  }
}
</script>

<style scoped>
@import '../styles/styles.css';

.categoryListElement {
  width: 800px;
  margin: 50px auto;
  padding: 20px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  overflow-wrap: break-word;
  font-size: medium;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: auto;
}

.categoryListElementDetailsMobile {
  display: none;
}

.categoryListElement:hover {
  cursor: pointer;
}

/* Perhaps not the prettiest, but I needed a way to indicate that the entire thing is clickable. Feel free to change. */
.categoryListElement:hover h2 {
  text-decoration: underline;
  color: var(--blue);
  flex-wrap: wrap;
  }

.categoryListElementLeftContainer * {
  text-align: left;
  flex-wrap: wrap;
}

.categoryListElementDetails {
  display: flex;
  justify-content: space-between;
  gap: 2em;
}

.categoryListElement h3, p {
  margin: auto;
}
#x{
  max-height:30px;
  max-width: 30px;
}
.categoryListElementDetails h3, p {
  text-align: center;
}
@media screen and (max-width: 1199px) {
  .categoryListElement {
    display: block;
  }

  .categoryListElementDetails {
    margin: 10px auto;
    max-width: fit-content;
  }
}

@media screen and (max-width: 991px) {
  .categoryListElement{
    width: 500px;
  }
}

@media screen and (max-width: 575px) {
  .categoryListElementDetails {
    display: none;
  }

  .categoryListElement{
      width: 300px;
  }

  .categoryListElementDetailsMobile {
    display: block;
  }

  .categoryListElementDetailsMobile p {
    text-align: left;
    font-size: 100%;
    color: var(--secondary);
  }
}

@media screen and (max-width:480px) {
    .categoryListElement{
      width: 200px;
      font-size: small;
    }

    .categoryListElementLeftContainer h2{
      font-size: 20px;
    }
}
</style>
