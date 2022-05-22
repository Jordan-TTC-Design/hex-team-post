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
      <div class="mb-3">
        <div class="title mb-3">熱門關鍵字</div>
        <div>
          <span class="btn btn-xs btn-white me-3 mb-3">標籤文字</span>
          <span class="btn btn-xs btn-white me-3 mb-3">標籤文字</span>
          <span class="btn btn-xs btn-white me-3 mb-3">標籤文字</span>
          <span class="btn btn-xs btn-white me-3 mb-3">標籤文字</span>
          <span class="btn btn-xs btn-white me-3 mb-3">標籤文字</span>
          <span class="btn btn-xs btn-white me-3 mb-3">標籤文字</span>
          <span class="btn btn-xs btn-white me-3 mb-3">標籤文字</span>
          <span class="btn btn-xs btn-white me-3 mb-3">標籤文字</span>
          <span class="btn btn-xs btn-white me-3 mb-3">標籤文字</span>
          <span class="btn btn-xs btn-white me-3 mb-3">標籤文字</span>
          <span class="btn btn-xs btn-white me-3 mb-3">標籤文字</span>
          <span class="btn btn-xs btn-white me-3 mb-3">標籤文字</span>
          <span class="btn btn-xs btn-white me-3 mb-3">標籤文字</span>
          <span class="btn btn-xs btn-white me-3 mb-3">標籤文字</span>
          <span class="btn btn-xs btn-white me-3 mb-3">標籤文字</span>
          <span class="btn btn-xs btn-white me-3 mb-3">標籤文字</span>
          <span class="btn btn-xs btn-white me-3 mb-3">標籤文字</span>
          <span class="btn btn-xs btn-white me-3 mb-3">標籤文字</span>
          <span class="btn btn-xs btn-white me-3 mb-3">標籤文字</span>
          <span class="btn btn-xs btn-white me-3 mb-3">標籤文字</span>
          <span class="btn btn-xs btn-white me-3 mb-3">標籤文字</span>
          <span class="btn btn-xs btn-white me-3 mb-3">標籤文字</span>
        </div>
      </div>
      <div class="mb-3">
        <div class="title mb-3">本週熱門創作者</div>
        <div class="row row-cols-5 gx-5">
          <div class="col">
            <div class="card">
              <div class="card-body">
                <div class="img-fluid bg-primary mb-3 rounded tmp"></div>
                <div>用戶名稱</div>
                <div>
                  <div class="icon">
                    <i class="bi bi-heart"></i>
                    <span>123</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <div class="card-body">
                <div class="img-fluid bg-primary mb-3 rounded tmp"></div>
                <div>用戶名稱</div>
                <div>
                  <div class="icon">
                    <i class="bi bi-heart"></i>
                    <span>123</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <div class="card-body">
                <div class="img-fluid bg-primary mb-3 rounded tmp"></div>
                <div>用戶名稱</div>
                <div>
                  <div class="icon">
                    <i class="bi bi-heart"></i>
                    <span>123</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <div class="card-body">
                <div class="img-fluid bg-primary mb-3 rounded tmp"></div>
                <div>用戶名稱</div>
                <div>
                  <div class="icon">
                    <i class="bi bi-heart"></i>
                    <span>123</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <div class="card-body">
                <div class="img-fluid bg-primary mb-3 rounded tmp"></div>
                <div>用戶名稱</div>
                <div>
                  <div class="icon">
                    <i class="bi bi-heart"></i>
                    <span>123</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <div class="title mb-3">本週熱門文章</div>
        <div class="row row-cols-2 gx-5">
          <div class="col">
            <div class="card">
              <div class="card-body">
                <div>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Velit eum veniam nemo quidem, expedita enim iure dolore dicta
                  ipsa excepturi ducimus voluptatem! Qui molestiae quos quas cum
                  fugiat numquam pariatur!
                </div>

                <div>
                  <div class="a">
                    <i class="bi bi-heart"></i>
                    <span class=""></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <div class="card-body">
                <div>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Velit eum veniam nemo quidem, expedita enim iure dolore dicta
                  ipsa excepturi ducimus voluptatem! Qui molestiae quos quas cum
                  fugiat numquam pariatur!
                </div>

                <div>
                  <div class="a">
                    <i class="bi bi-heart"></i>
                    <span class=""></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tmp {
  width: 300px;
  height: 300px;
}
</style>
