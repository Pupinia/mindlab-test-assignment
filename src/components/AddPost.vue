<script setup>
import { reactive, computed } from 'vue';
import { usePostsStore } from '@/stores/posts';

const defaultPost = { title: '', body: '', userId: Date.now() };

const post = reactive({ ...defaultPost });

const postsStore = usePostsStore();
const { addPost, getPosts } = postsStore;

const onAddPost = async () => {
  try {
    await addPost(post);
    await getPosts();
  } catch (error) {
    console.log(error.response.data.error);
  }

  Object.assign(post, { ...defaultPost });
};

const isValid = computed(() => {
  return post.title && post.body;
});
</script>

<template>
  <v-form @submit.prevent="onAddPost" class="mb-10">
    <div>
      <v-text-field type="text" v-model="post.title" label="Название" />
    </div>
    <div>
      <v-textarea v-model="post.body" label="Текст" />
    </div>
    <v-btn type="submit" color="primary" :disabled="!isValid">Отправить</v-btn>
  </v-form>
</template>
