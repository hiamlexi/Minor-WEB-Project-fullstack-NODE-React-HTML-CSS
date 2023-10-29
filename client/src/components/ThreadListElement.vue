<template>
  <div class="threadListElement" @click="onClick()">
    <div class="threadContent">
      <h3 class="threadTitle">{{ thread.title }}</h3>
      <div class="posterAndDate">
        <p>{{ thread.originalPoster }}</p>
        <p>{{ thread.creationDate }}</p>
      </div>
    </div>
    <div class="postInfo">
      <p>{{ thread.numPosts }} Posts</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    thread: Object
  },
  methods: {
    onClick() {
      this.$router.push(`/threads/${this.thread.id}`)
    }
  }
}
</script>

<style scoped>
@import '../styles/styles.css';

.threadListElement {
  width: 100%;
  margin: 5px auto;
  padding: 20px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  border: 1px solid var(--gray);
  border-radius: 4.8px;
  background-color: #e9ecef; /* TODO define var */
  text-overflow: ellipsis;
}

.threadListElement:hover {
  cursor: pointer;
}

.threadListElement:hover .threadTitle {
  text-decoration: underline;
  color: var(--blue);
}

.threadContent {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-overflow: ellipsis;
  overflow: hidden;
}

.threadTitle {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  text-overflow: ellipsis;
}

.posterAndDate {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.posterAndDate p {
  margin: auto 10px auto auto;
  color: var(--gray);
  font-size: 12px;
}

.postInfo {
  margin-top: 5px;
}
</style>
