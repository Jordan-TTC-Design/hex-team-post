import { createApp } from 'vue';
import { createPinia } from 'pinia';
import axios from 'axios';
import VueAxios from 'vue-axios';
import CKEditor from '@ckeditor/ckeditor5-vue';
import App from './App.vue';
import router from './router';

import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App);
app.use(CKEditor);
app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);

app.mount('#app');
