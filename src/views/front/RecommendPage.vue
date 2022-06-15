<script>
import { ref } from 'vue';

import ArticleCard from '@/components/front/cards/ArticleCard.vue';
import postsStore from '@/stores/postsStore';
import followStore from '@/stores/followStore';

export default {
  components: {
    ArticleCard,
  },
  setup() {
    const postsData = postsStore();
    const followData = followStore();
    const postSort = ref('asc');
    const postQuery = ref('');
    const createrList = ref([]);
    const usersList = ref([]);
    const hotPostList = ref([]);
    async function init() {
      createrList.value = await followData.getHotCreater();
      usersList.value = await followData.getHotUser();
      const hotPostResult = await postsData.getHotPost();
      if (hotPostResult.status === 'success') {
        const tempArray = hotPostResult.data;
        hotPostList.value = tempArray.filter((item) => item.image.length > 0);
      }
    }
    init();
    return {
      postSort,
      createrList,
      usersList,
      postQuery,
      postsData,
      hotPostList,
    };
  },
};
</script>

<template>
  <div class="container container--mb">
    <div class="pageSection" v-show="createrList.length > 0">
      <div class="pageSection__title">熱門創作者</div>
      <div class="recommenedUser row row-cols-lg-4 row-cols-2 gy-6">
        <template v-for="(creater, index) in createrList" :key="creater._id">
          <div v-if="index < 4" class="col h-100">
            <RouterLink :to="`/profile/${creater._id._id}`" class="userCard card h-100">
              <div class="card-body d-flex flex-column justify-content-between gap-3 h-100">
                <div class="userCard__imgBox">
                  <img
                    class="userCard__img"
                    :src="creater._id.photo || 'https://i.imgur.com/ZWHoRPi.png'"
                    :alt="creater._id.name"
                  />
                </div>
                <div class="d-flex flex-column gap-2">
                  <p class="userCard__title">{{ creater._id.name }}</p>
                  <p class="d-flex gap-2 text-gray-dark">
                    <i class="webIcon-sm bi bi-heart-fill"></i>
                    {{ creater.totalsum || 0 }} 人
                  </p>
                </div>
              </div>
            </RouterLink>
          </div>
        </template>
      </div>
    </div>
    <div class="pageSection" v-show="usersList.length > 0">
      <div class="pageSection__title">熱門用戶</div>
      <div class="recommenedUser row row-cols-lg-4 row-cols-2 gy-6">
        <template v-for="(userItem, index) in usersList" :key="userItem._id">
          <div v-if="index < 8" class="col h-100">
            <RouterLink :to="`/profile/${userItem._id}`" class="userCard card h-100">
              <div class="card-body d-flex flex-column justify-content-between gap-3 h-100">
                <div class="userCard__imgBox">
                  <img
                    class="userCard__img"
                    :src="userItem.photo || 'https://i.imgur.com/ZWHoRPi.png'"
                    :alt="userItem.name"
                  />
                </div>
                <div class="d-flex flex-column gap-2">
                  <p class="userCard__title">{{ userItem.name }}</p>
                  <p class="d-flex gap-2 text-gray-dark">
                    <i class="webIcon-sm bi bi-file-person"></i>
                    {{ userItem.followersSize }} 人
                  </p>
                </div>
              </div>
            </RouterLink>
          </div>
        </template>
      </div>
    </div>
  </div>
  <div class="bg-white container--py" v-show="hotPostList.length > 0">
    <div class="container">
      <div class="pageSection">
        <div class="pageSection__title">本週熱門文章</div>
        <div class="row row-cols-xl-3 row-cols-md-2 row-cols-1 gy-6">
          <template v-for="(hotPost, index) in hotPostList" :key="hotPost._id">
            <div v-if="hotPost.image.length > 0" class="col h-100">
              <ArticleCard class="h-100" :post-item="hotPost" :post-index="index" />
            </div>
          </template>
          <div class="col"><p class="toBeCome">敬請期待</p></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container--mb {
  margin-bottom: 72px;
}
.container--py {
  padding-top: 72px;
  padding-bottom: 72px;
}
.pageSection {
  position: relative;
  &:not(:last-child) {
    padding-bottom: 4rem;
    margin-bottom: 4rem;
  }
  &:not(:last-child):after {
    content: '';
    position: absolute;
    width: 90%;
    left: 5%;
    bottom: 0;
    height: 1px;
    background-color: var(--bs-gray-middle);
  }
  &__title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--bs-dark);
    text-align: center;
    margin-bottom: 1.5rem;
  }
}
.recommenedUser {
  .userCard {
    height: 100%;
    display: block;
    .userCard__imgBox {
      border: 1px solid var(--bs-gray-middle);
      flex: 1;
      position: relative;
      border-radius: 0.5rem;
      overflow: hidden;
      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0);
        border-radius: 0.5rem;
        transition: all 0.3s;
      }
    }
    .userCard__title {
      font-size: 1rem;
      color: var(--bs-dark);
      transition: all 0.3s;
    }
    .userCard__img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
    &:hover {
      .userCard__imgBox::after {
        background-color: rgba(0, 0, 0, 0.24);
      }
      .userCard__title {
        color: var(--bs-primary);
      }
    }
  }
}
.tmp {
  width: 300px;
  height: 300px;
}
.toBeCome {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 10rem;
  background-color: var(--bs-gray-light);
  border-radius: 0.75rem 0.75rem;
  @media (max-width: 767.98px) {
    display: none;
  }
}
</style>
