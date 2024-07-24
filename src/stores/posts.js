import { defineStore } from 'pinia';

import PostService from '@/services/PostService';

export const usePostsStore = defineStore('posts', {
  state: () => {
    return {
      posts: [],
      isLoading: false
    };
  },
  actions: {
    async getPosts() {
      this.isLoading = true;
      const { data } = await PostService.getPosts();
      this.posts = data;
      this.isLoading = false;
    },
    async addPost(post) {
      await PostService.addPost(post);
    },
    async changeTitle(postId, postTitle) {
      await PostService.changeTitle(postId, postTitle);
    },
    async deletePost(postId) {
      await PostService.deletePost(postId);
    }
  }
});
