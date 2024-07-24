<script setup>
import { ref, defineProps } from 'vue';

import { usePostsStore } from '@/stores/posts';

const { post } = defineProps(['post']);
const postsStore = usePostsStore();
const { changeTitle, getPosts, deletePost } = postsStore;

const postTitle = ref('');
const isEditTitle = ref(false);

const onChangeTitle = async () => {
  if (postTitle.value === post.title) {
    onCancel();
    return;
  }

  try {
    await changeTitle(post.id, postTitle.value);
    await getPosts();

    isEditTitle.value = false;
  } catch (error) {
    console.log(error.response.data.error);
  }
};

const onDeletePost = async () => {
  try {
    await deletePost(post.id);
    await getPosts();
  } catch (error) {
    console.log(error.response.data.error);
  }
};

const onEdit = () => {
  postTitle.value = post.title;
  isEditTitle.value = true;
};

const onCancel = () => {
  isEditTitle.value = false;
};
</script>

<template>
  <v-card class="mb-10">
    <div class="d-flex align-center mt-3">
      <v-card-title v-if="!isEditTitle">{{ post.title }}</v-card-title>
      <v-text-field
        max-width="600"
        v-else
        v-model="postTitle"
        type="text"
        @keyup.enter="onChangeTitle"
        class="ml-4 mr-4"
      />

      <v-btn v-if="!isEditTitle" @click="onEdit" icon="mdi-pencil" />
      <div class="mb-5" v-else>
        <v-btn @click="onCancel" icon="mdi-close" class="mr-3" />
        <v-btn @click="onChangeTitle" icon="mdi-content-save" />
      </div>
    </div>

    <v-card-text>{{ post.body }}</v-card-text>
    <v-card-actions>
      <v-btn @click="onDeletePost"> Удалить </v-btn>
    </v-card-actions>
  </v-card>
</template>
