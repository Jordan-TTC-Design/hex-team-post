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
          // return res.data;
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
          // return res.data;
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    upLoadImage(data) {
      console.log(data);
      const formdata = new FormData();
      formdata.append('image', data);
      axios
        .post('https://hex-post-w4.herokuapp.com/other/image', formdata)
        .then((res) => {
          console.log(res.data);
          // return res.data;
        })
        .catch((err) => {
          console.dir(err);
        });
    },
  },
});
export default postsStore;
