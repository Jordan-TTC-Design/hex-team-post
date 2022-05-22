<script>
import { ref } from 'vue';

// import PostCard from '@/components/front/PostCard.vue';
// import DynamicWall from '@/components/front/DynamicWall.vue';
import postsStore from '@/stores/postsStore';

export default {
  components: {
    // PostCard,
    // DynamicWall,
  },
  setup() {
    const postsData = postsStore();
    const postSort = ref('asc');
    const postQuery = ref('');
    postsData.getPosts();
    function sortPostsData() {
      postsData.getPosts(postSort.value, postQuery.value);
    }

    return {
      postSort,
      postQuery,
      postsData,
      sortPostsData,
    };
  },
};
</script>

<template>
  <div class="container d-flex">
    <div class="content">
      <div class="card userProfileCard mb-3">
        <div class="card-body userProfileCard-body">
          <img
            src="../../assets/image/user-picture.png"
            alt="user-picture"
            class="user-picture"
          />
          <div class="d-flex flex-column justify-content-center">
            <span class="userProfileCard-title">用戶名稱</span>
            <span class="userProfileCard-subtitle">200 人追蹤</span>
            <span class="userProfileCard-subtitle">200 人追蹤</span>
          </div>
          <div class="userProfileCard-more">
            <button class="btn btn-sm btn-outline text-primary">追蹤</button>
            <button class="btn btn-sm text-primary">
              <i class="bi bi-three-dots"></i>
            </button>
          </div>
        </div>
        <div class="userProfileCard-footer">
          <div class="userProfileCard-footer-item">貼文</div>
          <div class="userProfileCard-footer-item">私密日記</div>
          <div class="userProfileCard-footer-item">追蹤</div>
        </div>
      </div>
      <div class="card mb-3 tmp">
        <input
          type="text"
          class="form-control bg-white search"
          placeholder="搜尋關鍵字"
        />
        <div class="filter">
          最新貼文
          <div class="icon">
            <i class="bi bi-chevron-down"></i>
          </div>
        </div>
      </div>
      <div class="card mb-3">
        <div class="card-body">
          <div class="d-flex align-items-center mb-3">
            <img
              src="../../assets/image/user-picture.png"
              alt="user-picture"
              class="user-picture"
            />
            <div class="user-info">
              <span class="user-info-title">用戶名稱</span>
              <span class="user-info-subtitle">200 人追蹤</span>
            </div>
            <div class="btn btn-sm">追蹤</div>
          </div>
          <p class="mb-3">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio illo
            quis reprehenderit consequatur veritatis fugiat recusandae
            voluptatem similique. Totam non dicta exercitationem, rem soluta
            minima. Rem perferendis nesciunt suscipit ab! Voluptate perferendis
            eum, sit iste maiores temporibus accusantium corrupti ducimus itaque
            ab et nisi magni sed alias illum molestiae ut rem aperiam cupiditate
            officia eius
          </p>
          <img
            src="https://images.unsplash.com/photo-1614102073832-030967418971?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738"
            alt=""
            class="card-picture"
          />
          <div class="d-flex align-items-center">
            <div class="icon text-primary">
              <i class="bi bi-heart-fill"></i>
              <span class="">1234</span>
            </div>
            <div class="icon">
              <i class="bi bi-share"></i>
            </div>
            <span class="ms-auto">2022 / 01 / 01 12:12</span>
          </div>
        </div>
        <div class="card-body border-top d-flex align-items-center">
          <div class="user-picture"></div>
          <input
            type="text"
            class="form-control flex-grow-1"
            placeholder="回覆..."
          />
          <div class="btn ms-3">
            <i class="bi bi-play-fill"></i>
          </div>
        </div>
      </div>

      <div class="card mb-3">
        <div class="card-body">
          <div class="d-flex align-items-center mb-3">
            <div class="user-picture"></div>
            <div class="user-info">
              <span class="user-info-title">用戶名稱</span>
            </div>
            <div class="btn btn-sm text-primary">追蹤</div>
          </div>
          <div class="d-flex align-items-center mb-3">
            <div class="user-picture"></div>
            <div class="user-info">
              <span class="user-info-title">用戶名稱</span>
            </div>
            <div class="btn btn-sm text-primary">追蹤</div>
          </div>
        </div>
      </div>
    </div>
    <div class="side fix">
      <div class="card mb-3">
        <div class="card-body border-bottom">
          <div class="card-title">贊助方案</div>
        </div>
        <div class="card-body">
          <div class="sponsor">
            <span class="sponsor-title">NTD 1001 / 月</span>
            <span class="sponsor-subtitle">當月私密日記無限觀看</span>
          </div>
          <div class="sponsor">
            <span class="sponsor-title">NTD 1001 / 月</span>
            <span class="sponsor-subtitle">當月私密日記無限觀看</span>
          </div>
          <div class="sponsor active">
            <span class="sponsor-title">NTD 1001 / 月</span>
            <span class="sponsor-subtitle">當月私密日記無限觀看</span>
          </div>
        </div>
      </div>
      <div class="card mb-3">
        <div class="card-body border-bottom">
          <div class="card-title">創作者熱門貼文</div>
        </div>
        <div class="card-body"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tmp {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  .search {
  }

  .filter {
    width: 180px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding-left: 12px;
    &::before {
      content: '';
      border-left: 1px solid #dee2e6;
      position: absolute;
      width: 1px;
      height: 20px;
      left: 0;
    }
  }
}
</style>
