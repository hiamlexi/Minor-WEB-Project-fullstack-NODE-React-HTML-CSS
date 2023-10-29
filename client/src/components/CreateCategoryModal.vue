<template>
  <b-modal :id="modalId" ref="modal" title="Create a new forum category" @show="resetModal" @hidden="resetModal" @ok="handleOk">
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group label="Category title" label-for="titleInput" invalid-feedback="Category title is required" :state="titleState">
        <b-form-input id="titleInput" v-model="title" :state="titleState" required></b-form-input>
      </b-form-group>
      <b-form-group label="Description" label-for="descriptionInput" invalid-feedback="Description is required" :state="categoryDescriptionState">
        <b-form-input id="descriptionInput" v-model="categoryDescription" :state="categoryDescriptionState" required></b-form-input>
      </b-form-group>
    </form>
  </b-modal>
</template>

<script>
import { Api } from '@/Api'

export default {
  props: {
    modalId: String
  },
  data() {
    return {
      title: '',
      titleState: null,
      categoryDescription: '',
      categoryDescriptionState: null
    }
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.titleState = this.title.length > 0
      this.categoryDescriptionState = this.categoryDescription.length > 0
      return valid
    },
    resetModal() {
      this.title = ''
      this.titleState = null
      this.categoryDescription = ''
      this.categoryDescriptionState = null
    },
    handleOk(bvModalEvent) {
      if (!this.checkFormValidity()) {
        // Prevent modal from closing
        bvModalEvent.preventDefault()
      } else {
        Api.post('/categories', { name: this.title, description: this.categoryDescription })
          .then(res => this.$emit('onNewCategoryCreated', { category: res.data }))
          .catch(err => console.log(err)) // TODO: handle, display alert?
      }
    }
  }
}
</script>

<style scoped>
div * {
  margin: 10px auto;
}
</style>
