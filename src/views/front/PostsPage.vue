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
      <div class="card mb-3">
        <div class="card-body d-flex align-items-center">
          <div class="user-picture"></div>
          <div class="btn btn-default ms-auto me-3">
            <i class="bi bi-plus-lg"></i> 私密日記
          </div>
          <div class="btn btn-default">
            <i class="bi bi-plus-lg"></i> 新增貼文
          </div>
        </div>
      </div>
      <div class="mb-3 d-flex">
        <button type="button" class="btn btn-active me-2">全部</button>
        <button type="button" class="btn btn-white me-2">全部</button>
        <button type="button" class="btn btn-white me-2">全部</button>
        <button type="button" class="btn ms-auto">最新貼文</button>
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
          <div class="">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio illo
            quis reprehenderit consequatur veritatis fugiat recusandae
            voluptatem similique. Totam non dicta exercitationem, rem soluta
            minima. Rem perferendis nesciunt suscipit ab! Voluptate perferendis
            eum, sit iste maiores temporibus accusantium corrupti ducimus itaque
            ab et nisi magni sed alias illum molestiae ut rem aperiam cupiditate
            officia eius
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1614102073832-030967418971?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738"
          alt=""
          class="img-fluid"
        />
        <div class="card-body d-flex align-items-center">
          <div class="icon text-primary">
            <i class="bi bi-heart-fill"></i>
            <span class="">1234</span>
          </div>
          <div class="icon">
            <i class="bi bi-share"></i>
          </div>
          <span class="ms-auto">2022 / 01 / 01 12:12</span>
        </div>
        <div class="card-body border-top postCard-response">
          <div class="user-picture"></div>
          <input type="text" class="form-control" placeholder="回覆..." />
          <button class="btn">
            <i class="bi bi-play-fill"></i>
          </button>
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
          <div class="">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio illo
            quis reprehenderit consequatur veritatis fugiat recusandae
            voluptatem similique. Totam non dicta exercitationem, rem soluta
            minima. Rem perferendis nesciunt suscipit ab! Voluptate perferendis
            eum, sit iste maiores temporibus accusantium corrupti ducimus itaque
            ab et nisi magni sed alias illum molestiae ut rem aperiam cupiditate
            officia eius
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1614102073832-030967418971?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738"
          alt=""
          class="img-fluid"
        />
        <div class="card-body d-flex align-items-center">
          <div class="icon text-primary">
            <i class="bi bi-heart-fill"></i>
            <span class="">1234</span>
          </div>
          <div class="icon">
            <i class="bi bi-share"></i>
          </div>
          <span class="ms-auto">2022 / 01 / 01 12:12</span>
        </div>
        <div class="card-body border-top postCard-response">
          <div class="user-picture"></div>
          <input type="text" class="form-control" placeholder="回覆..." />
          <button class="btn">
            <i class="bi bi-play-fill"></i>
          </button>
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
          <div class="card-title">推薦追蹤</div>
        </div>
        <div class="card-body">
          <div class="d-flex align-items-center mb-3">
            <div class="user-picture"></div>
            <div class="user-info">
              <span class="user-info-title">用戶名稱</span>
              <span class="user-info-subtitle">200 人追蹤</span>
            </div>
            <div class="btn btn-sm text-primary">追蹤</div>
          </div>
          <div class="d-flex align-items-center mb-3">
            <div class="user-picture"></div>
            <div class="user-info">
              <span class="user-info-title">用戶名稱</span>
              <span class="user-info-subtitle">200 人追蹤</span>
            </div>
            <div class="btn btn-sm text-primary">追蹤</div>
          </div>
        </div>
      </div>
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
