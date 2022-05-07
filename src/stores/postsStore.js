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
    getPosts() {
      axios
        .get('https://hex-post-w4.herokuapp.com/posts/all')
        .then((res) => {
          console.log(res.data);
          this.posts = res.data.data;
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    addPost(data) {
      console.log(data);
      axios
        .post('https://hex-post-w4.herokuapp.com/posts', data)
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    async upLoadImage(data) {
      let resultData = null;
      const formdata = new FormData();
      formdata.append('image', data);
      const config = {
        method: 'POST',
        url: 'https://hex-post-w4.herokuapp.com/other/image',
        data: formdata,
      };
      try {
        const res = await axios(config);
        console.log(res);
        resultData = res.data;
      } catch (err) {
        console.dir(err);
      }
      return resultData;
    },
  },
});
export default postsStore;
