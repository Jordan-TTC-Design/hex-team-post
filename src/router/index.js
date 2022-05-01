import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/posts',
    name: 'PostsPage',
    component: () => import('../views/PostsPage.vue'),
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('../views/LoginPage.vue'),
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: () => import('../views/RegisterPage.vue'),
  },
  {
    path: '/member-setting',
    name: 'MemberSetting',
    component: () => import('../views/MemberSetting.vue'),
  },
  {
    path: '/thumb-up',
    name: 'ThumbUpPage',
    component: () => import('../views/ThumbUpPage.vue'),
  },
  {
    path: '/follow',
    name: 'FollowPage',
    component: () => import('../views/FollowPage.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
