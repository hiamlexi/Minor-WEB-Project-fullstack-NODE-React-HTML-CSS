<template>
  <div class="container">
    <b-row class ="element" align-v="center">
      <b-button class="button" variant="primary" v-b-modal.createCategoryModal v-if="isAdmin()">New Category</b-button>
      <b-button class="button" variant="danger" v-b-modal.deleteCategoriesModal v-if="isAdmin()">Delete all categories</b-button>
      <b-col class ="singleThread" cols="12" sm="12" md="12">
        <CategoryListElement v-for="cat in forumCategories" v-bind:key="cat.id" :category="cat" @deleteCategory="deleteCategory" />
      </b-col>
    </b-row>
    <!-- NOTE: since onNewCategoryCreated event emits the created category from the API, we don't actually need to fetch everything again. It's simpler though -->
    <CreateCategoryModal modalId="createCategoryModal" @onNewCategoryCreated="fetchCategories" />
    <b-modal id="deleteCategoriesModal" title="Delete all categories" header-bg-variant="danger" header-text-variant="light" @ok="deleteAllCategories">
      <p>Are you sure you want to delete all categories?</p>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import CategoryListElement from '@/components/CategoryListElement.vue'
import CreateCategoryModal from '@/components/CreateCategoryModal.vue'

export default {
  name: 'home',
  components: {
    CategoryListElement,
    CreateCategoryModal
  },
  props: {
    currentUser: Object
  },
  data() {
    return {
      forumCategories: []
    }
  },
  mounted() {
    this.fetchCategories()
  },
  methods: {
    fetchCategories() {
      Api.get('/categories')
        .then(response => { this.forumCategories = response.data.categories })
        .catch(error => console.log(error))
    },
    isAdmin() {
      return this.currentUser?.isAdmin
    },
    deleteCategory(id) {
      Api.delete(`/categories/${id}`)
        .then(response => {
          const index = this.forumCategories.findIndex(category => category._id === id)
          this.forumCategories.splice(index, 1)
          alert('The category was removed successfully!')
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteAllCategories() {
      Api.delete('/categories')
        .then(() => { this.forumCategories = [] })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style>
@import '../styles/styles.css';

.element {
  margin: auto;
  border-radius: 0.3rem;
  display: flex;
  orientation: row;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin: auto;
  border-radius: 0.3rem;
  padding: 20px;
  background: transparent;
}

.btn_message {
  margin-bottom: 1em;
}

.singleThread{
  margin-bottom: auto;
  overflow-wrap: break-word;
  word-wrap: break-word;
}

.button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-left: 5px;
  margin-top: 5px;
}
</style>
