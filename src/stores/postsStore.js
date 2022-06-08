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
      sort: 'desc',
      query: '',
    },
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
        this.posts = res.data.data;
        return res.data;
      } catch (err) {
        console.dir(err);
        return err;
      } finally {
        statusData.shiftLoading();
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
          return res.data;
        } catch (err) {
          console.dir(err);
          return err;
        } finally {
          statusData.shiftLoading();
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
      console.log(data, postId, userToken);
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
          const newPost = res.data.data[0];
          const replaceIndex = this.posts.findIndex((item) => item._id === newPost._id);
          const tempUser = this.posts[replaceIndex].user;
          this.posts.splice(replaceIndex, 1, newPost);
          this.posts[replaceIndex].user = tempUser;
        }
        return res.data;
      } catch (err) {
        console.dir(err);
        return err;
      } finally {
        statusData.shiftLoading();
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
    async getBuyDiary(page = 1, timeSort = 'dasc', query = '', like = '', userToken) {
      console.log(page, timeSort, query, like);
      statusData.addLoading();
      let apiUrl = `https://hex-post-team-api-server.herokuapp.com/api/posts/diary?page=${page}&sort=${timeSort}`;
      if (query) {
        apiUrl += `&q=${query}`;
      }
      if (like) {
        apiUrl += `&like=${like}`;
      }
      try {
        const res = await axios({
          method: 'GET',
          url: apiUrl,
          headers: {
            authorization: `${userToken}`,
          },
        });
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
    async buyDiary(postId, userToken) {
      const buyTargetData = {
        postId,
      };
      statusData.addLoading();
      try {
        const res = await axios({
          method: 'POST',
          url: 'https://hex-post-team-api-server.herokuapp.com/api/order/pay/private',
          data: buyTargetData,
          headers: {
            authorization: `${userToken}`,
          },
        });
        console.log(res);
        statusData.shiftLoading();
        if (res.data.status === 'success') {
          statusData.openPopInfoModel('資料錯誤');
          this.getPostWithToken(postId, userToken);
        }
        return res.data;
      } catch (err) {
        console.dir(err);
        statusData.shiftLoading();
        return err;
      }
    },
    async getPostWithToken(postId, userToken) {
      statusData.addLoading();
      try {
        const res = await axios({
          method: 'GET',
          url: `https://hex-post-team-api-server.herokuapp.com/api/posts/getOne/${postId}/verified`,
          headers: {
            authorization: `${userToken}`,
          },
        });
        console.log(res);
        statusData.shiftLoading();
        if (res.data.status === 'success') {
          console.log(res.data.data._id, this.diaries);
          const resultIndex = this.diaries.findIndex((item) => item._id === res.data.data._id);
          console.log(resultIndex);
          this.diaries.splice(resultIndex, 1, res.data.data);
        }
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
          const newPost = res.data.data[0];
          const replaceIndex = this.posts.findIndex((item) => item._id === newPost._id);
          this.posts.splice(replaceIndex, 1, newPost);
        }
        return res.data;
      } catch (err) {
        console.dir(err);
        return err;
      } finally {
        statusData.shiftLoading();
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
        return res.data;
      } catch (err) {
        console.dir(err);
        return err;
      } finally {
        statusData.shiftLoading();
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
          const result = res.data.data;
          if (result.type === 'group') {
            const postIndex = this.posts.findIndex((item) => item._id === result._id);
            this.posts[postIndex].likes = result.likes;
          } else {
            const postIndex = this.diaries.findIndex((item) => item._id === result._id);
            this.diaries[postIndex].likes = result.likes;
          }
        }
        return res.data;
      } catch (err) {
        console.dir(err);
        return err;
      } finally {
        statusData.shiftLoading();
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
          const result = res.data.data;
          if (result.type === 'group') {
            const postIndex = this.posts.findIndex((item) => item._id === result._id);
            this.posts[postIndex].likes = result.likes;
          } else {
            const postIndex = this.diaries.findIndex((item) => item._id === result._id);
            this.diaries[postIndex].likes = result.likes;
          }
        }
        return res.data;
      } catch (err) {
        console.dir(err);
        return err;
      } finally {
        statusData.shiftLoading();
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
      statusData.noScroll = true;
      this.targetPost.type = postType;
      this.newPostModel.open = true;
    },
    closePostModel() {
      this.resetPosts();
      statusData.noScroll = false;
    },
  },
});
export default postsStore;
