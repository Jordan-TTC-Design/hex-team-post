<script>
import userStore from '@/stores/userStore';

export default {
  props: {
    user: Object,
  },
  setup(props, { emit }) {
    const userData = userStore();
    const showEdit = () => {
      emit('show-edit');
    };
    return {
      props,
      userData,
      showEdit,
    };
  },
};
</script>

<template>
  <div class="card" :class="props.class">
    <div class="card-body">
      <div class="card-title border-bottom pb-3 mb-3 d-flex justify-content-between">
        個人資料
        <i class="bi bi-pencil-square" @click="showEdit"></i>
      </div>
      <div class="tmp">
        <p class="a">暱稱</p>
        <p class="b">{{ userData.user?.name }}</p>
      </div>
      <div class="tmp">
        <p class="a">Email</p>
        <p class="b">{{ userData.user?.email }}</p>
      </div>
      <div class="tmp">
        <p class="a">生日</p>
        <p class="b">{{ userData.user?.birthday?.split('T')[0] }}</p>
      </div>
      <div class="tmp">
        <p class="a">性別</p>
        <p class="b">
          {{ userData.user?.gender ? (userData.user?.gender === 'male' ? '男性' : '女性') : '' }}
        </p>
      </div>
      <div class="tmp">
        <p class="a">個人簡介</p>
        <div v-html="userData.user?.memo" class="b"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tmp {
  padding: 12px 0;
  .a {
    font-size: 12px;
    color: #979797;
  }
  .b {
    font-size: 14px;
    color: #646464;
  }
}

.c {
  color: #1d1d1d;
}
</style>
