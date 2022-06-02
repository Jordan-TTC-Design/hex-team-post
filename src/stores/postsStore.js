import { defineStore } from 'pinia';
import axios from 'axios';

const postsStore = defineStore({
  id: 'postsStore',
  state: () => ({
    posts: [],
    userPosts: [],
    targetPost: {
      contentType: 'article',
      content: '123',
      image: '',
      tag: ['貼文'],
    },
  }),
  getters: {},
  actions: {
    async getPosts(page = 1, timeSort = 'asc', query = '') {
      const apiUrl = `https://hex-post-team-api-server.herokuapp.com/api/posts/normal?page=${page}&q=${query}&sort=${timeSort}`;
      try {
        const res = await axios.get(apiUrl);
        console.log(res);
        this.posts = res.data.data;
        return res.data;
      } catch (err) {
        console.dir(err);
        return err;
      }
    },
    async addPost(data, userToken) {
      try {
        const res = await axios({
          method: 'POST',
          url: 'https://hex-post-team-api-server.herokuapp.com/api/posts/',
          data,
          headers: {
            authorization: `${userToken}`,
          },
        });
        console.log(res.data);
        return res.data;
      } catch (err) {
        console.dir(err);
        return err;
      }
    },
    async getUserPost(userToken) {
      try {
        const res = await axios({
          method: 'GET',
          url: 'https://hex-post-team-api-server.herokuapp.com/api/posts/UserAll',
          headers: {
            authorization: `${userToken}`,
          },
        });
        console.log(res.data);
        return res.data;
      } catch (err) {
        console.dir(err);
        return err;
      }
    },
    async deletePost(postId, userToken) {
      try {
        const res = await axios({
          method: 'DELETE',
          url: `https://hex-post-team-api-server.herokuapp.com/api/posts/${postId}`,
          headers: {
            authorization: `${userToken}`,
          },
        });
        console.log(res.data);
        return res.data;
      } catch (err) {
        console.dir(err);
        return err;
      }
    },
    async getOtherUserPost(userId) {
      try {
        const res = await axios({
          method: 'GET',
          url: `https://hex-post-team-api-server.herokuapp.com/api/posts/${userId}`,
        });
        console.log(res.data);
        return res.data;
      } catch (err) {
        console.dir(err);
        return err;
      }
    },
    async addComment(data, postId, userToken) {
      const commentData = {
        comment: data,
      };
      console.log(commentData);
      try {
        const res = await axios({
          method: 'POST',
          url: `https://hex-post-team-api-server.herokuapp.com/api/comment/${postId}/comment`,
          data: commentData,
          headers: {
            authorization: `${userToken}`,
          },
        });
        console.log(res.data);
        return res.data;
      } catch (err) {
        console.dir(err);
        return err;
      }
    },
    async deleteComment(commentId, userToken) {
      console.log(commentId, userToken);
      try {
        const res = await axios({
          method: 'DELETE',
          url: `https://hex-post-team-api-server.herokuapp.com/api/comment/${commentId}`,
          headers: {
            authorization: `${userToken}`,
          },
        });
        console.log(res);
        return res.data;
      } catch (err) {
        console.dir(err);
        return err;
      }
    },
    async upLoadImage(data, userToken) {
      let resultData = null;
      const formdata = new FormData();
      formdata.append('image', data);
      const config = {
        method: 'POST',
        url: 'https://hex-post-team-api-server.herokuapp.com/api/upload/image',
        data: formdata,
        headers: {
          authorization: `${userToken}`,
        },
      };
      try {
        const res = await axios(config);
        resultData = res.data;
      } catch (err) {
        console.dir(err);
        return err;
      }
      return resultData;
    },
  },
});
export default postsStore;
