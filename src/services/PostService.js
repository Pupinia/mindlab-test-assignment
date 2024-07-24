import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_HTTP_ENDPOINT}`,
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
  }
});

export default {
  getPosts() {
    return apiClient.get('/posts');
  },
  changeTitle(postId, title) {
    return apiClient.patch(`/posts/${postId}`, { title });
  },
  addPost(post) {
    return apiClient.post(`/posts`, post);
  },
  deletePost(postId) {
    return apiClient.delete(`/posts/${postId}`);
  }
};
