import { defineStore } from 'pinia';
import axios from 'axios';

const userStore = defineStore({
  id: 'userStore',
  state: () => ({
    user: {
      name: 'Jordan',
      photo:
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
  }),
  getters: {},
  actions: {
    signUp(data) {
      console.log(data);
      axios
        .post('https://hex-post-team-api-server.herokuapp.com/api/user', data)
        .then((res) => {
          console.log(res);
          return res.data;
        })
        .catch((err) => {
          console.dir(err);
        });
    },
  },
});
export default userStore;
