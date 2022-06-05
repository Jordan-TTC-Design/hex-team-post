import { defineStore } from 'pinia';
import axios from 'axios';
import statusStore from '@/stores/statusStore';

const statusData = statusStore();

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
    async getPosts(page = 1, timeSort = 'asc', query = '', like = '') {
      console.log(page, timeSort, query, like);
      statusData.addLoading();
      let apiUrl = `https://hex-post-team-api-server.herokuapp.com/api/posts/normal?page=${page}&sort=${timeSort}`;
      if (query) {
        apiUrl += `&q=${query}`;
      }
      if (like) {
        apiUrl += `&like=${like}`;
      }
      try {
        const res = await axios.get(apiUrl);
        console.log(res);
        this.posts = res.data.data;
        statusData.shiftLoading();
        return res.data;
      } catch (err) {
        statusData.shiftLoading();
        console.dir(err);
        return err;
      }
    },
    async addPost(data, userToken) {
      statusData.addLoading();
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
          statusData.shiftLoading();
          return res.data;
        } catch (err) {
          statusData.shiftLoading();
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
          statusData.shiftLoading();
          return res.data;
        } catch (err) {
          console.dir(err);
          statusData.shiftLoading();
          return err;
        }
      }
    },
    async updatePost(data, postId, userToken) {
      statusData.addLoading();
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
        statusData.shiftLoading();
        return res.data;
      } catch (err) {
        console.dir(err);
        statusData.shiftLoading();
        return err;
      }
    },
    async getUserPost(userToken) {
      statusData.addLoading();
      try {
        const res = await axios({
          method: 'GET',
          url: 'https://hex-post-team-api-server.herokuapp.com/api/posts/UserAll',
          headers: {
            authorization: `${userToken}`,
          },
        });
        console.log(res.data);
        statusData.shiftLoading();
        return res.data;
      } catch (err) {
        console.dir(err);
        statusData.shiftLoading();
        return err;
      }
    },
    async deletePost(postId, userToken) {
      statusData.addLoading();
      try {
        const res = await axios({
          method: 'DELETE',
          url: `https://hex-post-team-api-server.herokuapp.com/api/posts/${postId}`,
          headers: {
            authorization: `${userToken}`,
          },
        });
        console.log(res.data);
        statusData.shiftLoading();
        return res.data;
      } catch (err) {
        console.dir(err);
        statusData.shiftLoading();
        return err;
      }
    },
    async getUserDiary(userId) {
      statusData.addLoading();
      const apiUrl = `https://hex-post-team-api-server.herokuapp.com/api/posts/private/${userId}`;
      try {
        const res = await axios.get(apiUrl);
        console.log(res);
        this.diarys = res.data.data;
        statusData.shiftLoading();
        return res.data;
      } catch (err) {
        statusData.shiftLoading();
        console.dir(err);
        return err;
      }
    },
    async buyDiary(data, userToken) {
      statusData.addLoading();
      try {
        const res = await axios({
          method: 'POST',
          url: 'https://hex-post-team-api-server.herokuapp.com/api/order/pay/private',
          data,
          headers: {
            authorization: `${userToken}`,
          },
        });
        console.log(res);
        statusData.shiftLoading();
        return res.data;
      } catch (err) {
        console.dir(err);
        statusData.shiftLoading();
        return err;
      }
    },
    async getOtherUserPost(userId) {
      statusData.addLoading();
      try {
        const res = await axios({
          method: 'GET',
          url: `https://hex-post-team-api-server.herokuapp.com/api/posts/${userId}`,
        });
        console.log(res.data);
        statusData.shiftLoading();
        return res.data;
      } catch (err) {
        console.dir(err);
        statusData.shiftLoading();
        return err;
      }
    },
    async addComment(data, postId, userToken) {
      statusData.addLoading();
      const commentData = {
        comment: data,
      };
      try {
        const res = await axios({
          method: 'POST',
          url: `https://hex-post-team-api-server.herokuapp.com/api/comment/${postId}/comment`,
          data: commentData,
          headers: {
            authorization: `${userToken}`,
          },
        });
        if (res.data.status === 'success') {
          const postIndex = this.posts.findIndex((item) => item._id === res.data.data.post);
          console.log(this.posts[postIndex]);
          this.posts[postIndex].comments.push(res.data.data);
        }
        statusData.shiftLoading();
        return res.data;
      } catch (err) {
        console.dir(err);
        statusData.shiftLoading();
        return err;
      }
    },
    async deleteComment(commentId, userToken) {
      statusData.addLoading();
      try {
        const res = await axios({
          method: 'DELETE',
          url: `https://hex-post-team-api-server.herokuapp.com/api/comment/${commentId}`,
          headers: {
            authorization: `${userToken}`,
          },
        });
        console.log(res);
        statusData.shiftLoading();
        return res.data;
      } catch (err) {
        console.dir(err);
        statusData.shiftLoading();
        return err;
      }
    },
    async addLike(postId, userToken) {
      statusData.addLoading();
      try {
        const res = await axios({
          method: 'POST',
          url: `https://hex-post-team-api-server.herokuapp.com/api/posts/like/${postId}`,
          headers: {
            authorization: `${userToken}`,
          },
        });
        if (res.data.status === 'success') {
          const postIndex = this.posts.findIndex((item) => item._id === res.data.data._id);
          console.log(this.posts[postIndex]);
          this.posts[postIndex].likes = res.data.data.likes;
        }
        statusData.shiftLoading();
        return res.data;
      } catch (err) {
        console.dir(err);
        statusData.shiftLoading();
        return err;
      }
    },
    async deleteLike(postId, userToken) {
      statusData.addLoading();
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
        statusData.shiftLoading();
        return res.data;
      } catch (err) {
        console.dir(err);
        statusData.shiftLoading();
        return err;
      }
    },
    async upLoadImage(data, userToken) {
      statusData.addLoading();
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
        statusData.shiftLoading();
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
