<script>
import userStore from '@/stores/userStore';

export default {
  props: {
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
      <div
        class="
          card-title
          border-bottom
          pb-3
          mb-3
          d-flex
          justify-content-between
        "
      >
        個人資料
        <i class="bi bi-pencil-square cp" @click="showEdit"></i>
      </div>
      <div class="tmp">
        <p class="a">暱稱</p>
        <p class="b">{{ userData.myProfile.name }}</p>
      </div>
      <div class="tmp">
        <p class="a">Email</p>
        <p class="b">{{ userData.myProfile.email }}</p>
      </div>
      <div class="tmp">
        <p class="a">生日</p>
        <p class="b">{{ userData.myProfile.birthday?.split('T')[0] }}</p>
      </div>
      <div class="tmp">
        <p class="a">性別</p>
        <p class="b">
          {{ userData.myProfile.gender ?
             userData.myProfile.gender === 'male' ? '男性' : '女性' : '' }}
        </p>
      </div>
      <div class="tmp">
        <p class="a">個人簡介</p>
        <p class="b">{{ userData.myProfile.memo }}</p>
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

.cp {
  cursor: pointer;
}

</style>
