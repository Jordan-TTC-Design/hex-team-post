<script>
import { ref } from 'vue';
import PageTitleBox from '@/components/front/PageTitleBox.vue';

export default {
  components: {
    PageTitleBox,
  },
  setup() {
    const thumbUpData = ref([
      { user: { name: '阿爾敏' }, createdAt: '2022/2/2' },
      { user: { name: '米卡莎' }, createdAt: '2022/2/2' },
      { user: { name: '孫悟空' }, createdAt: '2022/2/2' },
    ]);
    return { thumbUpData };
  },
};
</script>

<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="col-7">
        <PageTitleBox class="mb-6" title-content="我按讚的貼文" />
        <ul class="d-flex flex-column gap-3">
          <li v-for="(item, index) in thumbUpData" :key="index">
            <div class="thumbUpBox">
              <div class="d-flex align-items-center gap-3">
                <img
                  class="thumbUpBox__img"
                  src="https://images.unsplash.com/photo-1648737154547-b0dfd281c51e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt=""
                />
                <div>
                  <p class="text--title mb-1">{{ item.user.name }}</p>
                  <p class="text--subTxt">發文時間：{{ item.createdAt }}</p>
                </div>
              </div>
              <div class="d-flex">
                <button type="button" class="btn btn--icon--col">
                  <i class="bi bi-hand-thumbs-up"></i>取消
                </button>
                <button type="button" class="btn btn--icon--col">
                  <i class="bi bi-arrow-right-circle"></i>查看
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.thumbUpBox {
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 0px #000400;
  border: 2px solid #000400;
  border-radius: 8px;
  opacity: 1;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: white;
  transition: all 0.3s;
  &__img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid #000;
  }
  &:hover {
    background-color: #f7f7f7;
  }
}
</style>
