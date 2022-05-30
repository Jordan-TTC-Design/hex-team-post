import { defineStore } from 'pinia';
import axios from 'axios';

const postsStore = defineStore({
  id: 'postsStore',
  state: () => ({
    posts: [],
    targetPost: {
      postContent: '',
      postImgUrl: '',
      tags: [],
    },
  }),
  getters: {},
  actions: {
    async getPosts(page = 1, timeSort = 'asc', query = '') {
      try {
        const res = await axios.get(
          // eslint-disable-next-line comma-dangle
          `https://hex-post-team-api-server.herokuapp.com/api/posts/?page=${page}&q=${query}&sort=${timeSort}`
        );
        console.log(res);
        this.posts = res.data.data;
        return res.data;
      } catch (err) {
        console.dir(err);
        return err;
      }
    },
    async addPost(data, userToken) {
      console.log(data);
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
