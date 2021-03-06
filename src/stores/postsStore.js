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
      has_next: false,
      has_prev: false,
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
    async getPosts(page = 1, timeSort = 'desc', query = '', like = '') {
      statusData.addLoading();
      if (page === 1 && this.posts.length > 0) {
        this.posts.length = 0;
      }
      let apiUrl = `https://hex-post-team-api-server.herokuapp.com/api/posts/normal?page=${page}&sort=${timeSort}`;
      if (query) {
        apiUrl += `&q=${query}`;
      }
      if (like) {
        apiUrl += `&like=${like}`;
      }
      try {
        const res = await axios.get(apiUrl);
        const result = res.data.data;
        this.posts.push(...result.data);
        return res.data;
      } catch (err) {
        return err;
      } finally {
        statusData.shiftLoading();
      }
    },
    async getMyFollowPosts(page = 1, timeSort = 'desc', query = '', userToken) {
      statusData.addLoading();
      if (page === 1 && this.posts.length > 0) {
        this.posts.length = 0;
      }
      try {
        const res = await axios({
          method: 'GET',
          url: `https://hex-post-team-api-server.herokuapp.com/api/follow/auth/followposts?page=${page}&sort=${timeSort}&q=${query}`,
          headers: {
            authorization: `${userToken}`,
          },
        });
        const result = res.data.data;
        this.posts.push(...result.data);
        return res.data;
      } catch (err) {
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
          statusData.shiftLoading();
          return res.data;
        } catch (err) {
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
          const newPost = res.data.data[0];
          if (newPost.type === 'group') {
            const replaceIndex = this.posts.findIndex((item) => item._id === newPost._id);
            const tempUser = this.posts[replaceIndex].user;
            this.posts.splice(replaceIndex, 1, newPost);
            this.posts[replaceIndex].user = tempUser;
          } else {
            const replaceIndex = this.diaries.findIndex((item) => item._id === newPost._id);
            const tempUser = this.diaries[replaceIndex].user;
            this.diaries.splice(replaceIndex, 1, newPost);
            this.diaries[replaceIndex].user = tempUser;
          }
        }
        return res.data;
      } catch (err) {
        return err;
      } finally {
        statusData.shiftLoading();
      }
    },
    async getUserPost(userId, page = 1, timeSort = 'desc', query = '') {
      statusData.addLoading();
      if (page === 1 && this.posts.length > 0) {
        this.posts.length = 0;
      }
      let url = `https://hex-post-team-api-server.herokuapp.com/api/posts/${userId}?page=${page}`;
      if (timeSort) {
        url += `&sort=${timeSort}`;
      }
      if (query) {
        url += `&q=${query}`;
      }
      try {
        const res = await axios({
          method: 'GET',
          url,
        });
        const result = res.data.data;
        this.posts.push(...result.data);
        return res.data;
      } catch (err) {
        return err;
      } finally {
        statusData.shiftLoading();
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
        return res.data;
      } catch (err) {
        return err;
      } finally {
        statusData.shiftLoading();
      }
    },
    async getHotPost() {
      statusData.addLoading();
      try {
        const res = await axios({
          method: 'GET',
          url: 'https://hex-post-team-api-server.herokuapp.com/api/posts/order/likes',
        });
        return res.data;
      } catch (err) {
        return err;
      } finally {
        statusData.shiftLoading();
      }
    },
    async getBuyDiary(page = 1, timeSort = 'desc', query = '', like = '', userToken) {
      statusData.addLoading();
      if (page === 1 && this.diaries.length > 0) {
        this.diaries.length = 0;
      }
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
        const result = res.data.data;
        this.diaries.push(...result.data);
        return res.data;
      } catch (err) {
        return err.respon.data;
      } finally {
        statusData.shiftLoading();
      }
    },
    async getMyDiary(userToken, page = 1, timeSort = 'desc', query = '') {
      statusData.addLoading();
      if (page === 1 && this.diaries.length > 0) {
        this.diaries.length = 0;
      }
      let url = `https://hex-post-team-api-server.herokuapp.com/api/posts/private?page=${page}`;
      if (timeSort) {
        url += `&sort=${timeSort}`;
      }
      if (query) {
        url += `&q=${query}`;
      }
      try {
        const res = await axios({
          method: 'GET',
          url,
          headers: {
            authorization: `${userToken}`,
          },
        });
        const result = res.data.data;
        this.diaries.push(...result.data);
        return res.data;
      } catch (err) {
        return err;
      } finally {
        statusData.shiftLoading();
      }
    },
    async getUserDiary(userId, userToken, page = 1, timeSort = 'desc', query = '') {
      statusData.addLoading();
      if (page === 1 && this.diaries.length > 0) {
        this.diaries.length = 0;
      }
      let url = `https://hex-post-team-api-server.herokuapp.com/api/posts/private/Auth/${userId}?page=${page}`;
      if (timeSort) {
        url += `&sort=${timeSort}`;
      }
      if (query) {
        url += `&q=${query}`;
      }

      try {
        const res = await axios({
          method: 'GET',
          url,
          headers: {
            authorization: `${userToken}`,
          },
        });
        const result = res.data.data;
        this.diaries.push(...result.data);
        return res.data;
      } catch (err) {
        return err;
      } finally {
        statusData.shiftLoading();
      }
    },
    async getUserDiaryNoLogin(userId, page = 1, timeSort = 'desc', query = '') {
      statusData.addLoading();
      if (page === 1 && this.diaries.length > 0) {
        this.diaries.length = 0;
      }
      let url = `https://hex-post-team-api-server.herokuapp.com/api/posts/private/${userId}?page=${page}`;
      if (timeSort) {
        url += `&sort=${timeSort}`;
      }
      if (query) {
        url += `&q=${query}`;
      }
      try {
        const res = await axios({
          method: 'GET',
          url,
        });
        const result = res.data.data;
        this.diaries.push(...result.data);
        return res.data;
      } catch (err) {
        return err;
      } finally {
        statusData.shiftLoading();
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
        statusData.shiftLoading();
        if (res.data.status === 'success') {
          statusData.openPopInfoModel('????????????');
          this.getPostWithToken(postId, userToken);
        }
        return res.data;
      } catch (err) {
        statusData.shiftLoading();
        return err.response.data;
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
        statusData.shiftLoading();
        if (res.data.status === 'success') {
          const resultIndex = this.diaries.findIndex((item) => item._id === res.data.data._id);
          this.diaries.splice(resultIndex, 1, res.data.data);
        }
        return res.data;
      } catch (err) {
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
        statusData.shiftLoading();
        return res.data;
      } catch (err) {
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
        return res.data;
      } catch (err) {
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
