<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import { usePostsStore } from '@/stores/posts';

const postsStore = usePostsStore();
const { getPosts } = postsStore;
const { posts, isLoading } = storeToRefs(postsStore);

import PostItem from '@/components/PostItem.vue';

onMounted(async () => {
  try {
    await getPosts();
  } catch (error) {
    console.log(error.response.data.error);
  }
});
</script>

<template>
  <div v-if="isLoading">
    <v-skeleton-loader type="card"></v-skeleton-loader>
    <v-skeleton-loader type="card"></v-skeleton-loader>
    <v-skeleton-loader type="card"></v-skeleton-loader>
  </div>
  <post-item v-else v-for="post in posts" :key="post.id" :post="post" />
</template>
