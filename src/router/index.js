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
        path: 'recommend',
        name: 'RecommendPage',
        component: () => import('../views/front/RecommendPage.vue'),
      },
      {
        path: 'follow',
        name: 'FollowPage',
        component: () => import('../views/front/FollowPage.vue'),
      },

      {
        path: 'diary',
        name: 'FrontDiaryPage',
        component: () => import('../views/front/DiaryPage.vue'),
      },
      {
        path: 'profile/:id',
        component: () => import('../views/front/ProfilePage.vue'),
      },
    ],
  },
  {
    path: '/backstage/',
    name: 'BackstageLayout',
    component: () => import('../views/BackstageLayout.vue'),
    children: [
      {
        path: '',
        name: 'IndexPage',
        component: () => import('../views/backstage/IndexPage.vue'),
      },
      {
        path: 'member',
        name: 'MemberPage',
        component: () => import('../views/backstage/MemberPage.vue'),
      },
      {
        path: 'auther',
        name: 'AutherPage',
        component: () => import('../views/backstage/AutherPage.vue'),
      },
      {
        path: 'post',
        name: 'PostPage',
        component: () => import('../views/backstage/PostPage.vue'),
      },
      {
        path: 'diary',
        name: 'DiaryPage',
        component: () => import('../views/backstage/DiaryPage.vue'),
      },
      {
        path: 'payment',
        name: 'PaymentPage',
        component: () => import('../views/backstage/PaymentPage.vue'),
      },
      {
        path: 'setting',
        name: 'SettingPage',
        component: () => import('../views/backstage/SettingPage.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
