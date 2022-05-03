import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'FrontLayout',
    component: () => import('../views/FrontLayout.vue'),
    children: [
      {
        path: '',
        name: 'PostsPage',
        component: () => import('../views/front/PostsPage.vue'),
      },
      {
        path: '/my-page',
        name: 'Mypage',
        component: () => import('../views/front/MyPage.vue'),
      },
      {
        path: 'login',
        name: 'LoginPage',
        component: () => import('../views/front/LoginPage.vue'),
      },
      {
        path: 'register',
        name: 'RegisterPage',
        component: () => import('../views/front/RegisterPage.vue'),
      },
      {
        path: 'member-setting',
        name: 'MemberSetting',
        component: () => import('../views/front/MemberSetting.vue'),
      },
      {
        path: 'thumb-up',
        name: 'ThumbUpPage',
        component: () => import('../views/front/ThumbUpPage.vue'),
      },
      {
        path: 'follow',
        name: 'FollowPage',
        component: () => import('../views/front/FollowPage.vue'),
      },
      {
        path: 'person/:id',
        name: 'PersonPage',
        component: () => import('../views/front/PersonPage.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
