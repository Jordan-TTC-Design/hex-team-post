import { defineStore } from 'pinia';
import axios from 'axios';

const postsStore = defineStore({
  id: 'postsStore',
  state: () => ({
    posts: [],
    diaries: [],
    getPostsData: {
      page: 1,
      total: 1,
      sort: 'asc',
      query: '',
    },
    userPosts: [],
    targetPost: {
      id: '',
      contentType: 'article',
      content: '',
      image: '',
      tag: [],
      pay: 0,
      type: 'group',
    },
    newPostModel: {
      open: false,
      action: 'new',
      id: '',
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
      if (data.type === 'group') {
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
      } else {
        try {
          const res = await axios({
            method: 'POST',
            url: 'https://hex-post-team-api-server.herokuapp.com/api/posts/private',
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
      }
    },
    async updatePost(data, postId, userToken) {
      try {
        const res = await axios({
          method: 'PUT',
          url: `https://hex-post-team-api-server.herokuapp.com/api/posts/${postId}`,
          data,
          headers: {
            authorization: `${userToken}`,
          },
        });
        if (res.data.status === 'success') {
          const replaceIndex = this.posts.findIndex((item) => item._id === res.data.data._id);
          const tempUser = this.posts[replaceIndex].user;
          this.posts.splice(replaceIndex, 1, res.data.data);
          this.posts[replaceIndex].user = tempUser;
        }
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
    async getUserDiary(userId) {
      const apiUrl = `https://hex-post-team-api-server.herokuapp.com/api/posts/private/${userId}`;
      try {
        const res = await axios.get(apiUrl);
        console.log(res);
        this.diarys = res.data.data;
        return res.data;
      } catch (err) {
        console.dir(err);
        return err;
      }
    },
    async buyDiary(data, userToken) {
      try {
        const res = await axios({
          method: 'POST',
          url: 'https://hex-post-team-api-server.herokuapp.com/api/order/pay/private',
          data,
          headers: {
            authorization: `${userToken}`,
          },
        });
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
        if (res.data.status === 'success') {
          const postIndex = this.posts.findIndex((item) => item._id === res.data.data.post);
          console.log(this.posts[postIndex]);
          this.posts[postIndex].comments.push(res.data.data);
        }
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
    async addLike(postId, userToken) {
      try {
        const res = await axios({
          method: 'POST',
          url: `https://hex-post-team-api-server.herokuapp.com/api/posts/like/${postId}`,
          headers: {
            authorization: `${userToken}`,
          },
        });
        console.log(res.data);
        if (res.data.status === 'success') {
          const postIndex = this.posts.findIndex((item) => item._id === res.data.data._id);
          console.log(this.posts[postIndex]);
          this.posts[postIndex].likes = res.data.data.likes;
        }
        return res.data;
      } catch (err) {
        console.dir(err);
        return err;
      }
    },
    async deleteLike(postId, userToken) {
      try {
        const res = await axios({
          method: 'DELETE',
          url: `https://hex-post-team-api-server.herokuapp.com/api/posts/like/${postId}`,
          headers: {
            authorization: `${userToken}`,
          },
        });
        console.log(res);
        if (res.data.status === 'success') {
          const postIndex = this.posts.findIndex((item) => item._id === res.data.data._id);
          console.log(this.posts[postIndex]);
          this.posts[postIndex].likes = res.data.data.likes;
        }
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
    resetPosts() {
      this.targetPost.contentType = 'article';
      this.targetPost.content = '';
      this.targetPost.image = '';
      this.targetPost.tag = [];
      this.newPostModel.open = false;
      this.newPostModel.action = 'new';
      this.newPostModel.id = '';
    },
    openPostModel(postType) {
      this.targetPost.type = postType;
      this.newPostModel.open = true;
    },
    closePostModel() {
      this.resetPosts();
    },
  },
});
export default postsStore;
