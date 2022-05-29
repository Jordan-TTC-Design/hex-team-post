<script>
import { computed, ref } from 'vue';
import backStatusStore from '@/stores/backstage/backStatusStore';
import FormInput from '@/components/helper/FormInput.vue';

export default {
  props: ['select-item', 'modal-open'],
  emits: ['get-posts', 'clear-item'],
  components: { FormInput },
  setup(props) {
    const backStageData = backStatusStore();
    const modalOpen = ref(false);
    const modalState = computed(() => props.modalState);
    const listState = ref(1);
    const editMember = ref({
      name: '',
      photo: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      auth: {
        users: false,
        posts: false,
        service: false,
        ad: false,
        members: false,
      },
    });
    return {
      modalState,
      modalOpen,
      listState,
      backStageData,
      editMember,
    };
  },
};
</script>

<template>
  <div
    class="silderBg--x z-silder"
    :class="{ active: backStageData.memberSettingSliderState }"
    @click="backStageData.memberSettingSliderState = false"
  ></div>
  <div
    class="silderBox--x z-silder"
    :class="{ active: backStageData.memberSettingSliderState === true }"
  >
    <div class="d-flex flex-column posotion-relative h-100">
      <div class="sliderHeader">
        <h3 class="title">管理者</h3>
        <button
          type="button"
          class="btn rounded py-1.5 px-2"
          @click="backStageData.memberSettingSliderState = false"
        >
          <i class="webIcon bi bi-x-lg"></i>
        </button>
      </div>
      <div class="flex-grow-1 p-4 overflow-auto">
        <div class="userImg mb-6">
          <img
            v-if="editMember.photo.length > 0"
            class="userImg__img"
            :src="editMember.photo"
            alt="用戶底圖"
          />
          <img
            v-if="editMember.photo.length === 0"
            class="userImg__img"
            src="@/assets/image/user-picture.png"
            alt="預設"
          />
          <label class="userImg__btn" for="imgUploader">變更照片</label>
          <input
            ref="imgUploadGetter"
            id="imgUploader"
            class="d-none"
            type="file"
            accept="image/png, image/jpeg"
          />
        </div>
        <FormInput class="mb-4" v-model="editMember.name" input-id="name" type="text">
          <template v-slot:default>暱稱</template>
        </FormInput>
        <FormInput class="mb-4" v-model="editMember.email" input-id="email" type="email">
          <template v-slot:default>email</template>
        </FormInput>
        <FormInput class="mb-4" v-model="editMember.phone" input-id="phone" type="phone">
          <template v-slot:default>手機號碼</template>
        </FormInput>
        <div class="d-flex gap-4">
          <FormInput class="mb-4" v-model="editMember.password" input-id="password" type="password">
            <template v-slot:default>密碼</template>
          </FormInput>
          <FormInput
            class="mb-4"
            v-model="editMember.confirmPassword"
            input-id="confirmPassword"
            type="password"
          >
            <template v-slot:default>重複確認密碼</template>
          </FormInput>
        </div>
        <div class="formRadio w-100 d-flex flex-column gap-1">
          <p class="ms-3">管理權限</p>
          <div class="row row-cols-3 g-2">
            <div class="col">
              <input
                class="formRadio__input"
                type="checkbox"
                id="authUsers"
                v-model="editMember.auth.users"
              />
              <label
                :class="{ active: editMember.auth.users }"
                class="formRadio__label"
                for="authUsers"
                >管理用戶</label
              >
            </div>
            <div class="col">
              <input
                class="formRadio__input"
                type="checkbox"
                id="authPosts"
                v-model="editMember.auth.posts"
              />
              <label
                :class="{ active: editMember.auth.posts }"
                class="formRadio__label"
                for="authPosts"
                >管理貼文</label
              >
            </div>
            <div class="col">
              <input
                class="formRadio__input"
                type="checkbox"
                id="autService"
                v-model="editMember.auth.service"
              />
              <label
                :class="{ active: editMember.auth.service }"
                class="formRadio__label"
                for="autService"
                >管理客服</label
              >
            </div>
            <div class="col">
              <input
                class="formRadio__input"
                type="checkbox"
                id="authAd"
                v-model="editMember.auth.ad"
              />
              <label :class="{ active: editMember.auth.ad }" class="formRadio__label" for="authAd"
                >設定推廣</label
              >
            </div>
            <div class="col">
              <input
                class="formRadio__input"
                type="checkbox"
                id="authMembers"
                v-model="editMember.auth.members"
              />
              <label
                :class="{ active: editMember.auth.members }"
                class="formRadio__label"
                for="authMembers"
                >管理其他管理者</label
              >
            </div>
          </div>
        </div>
      </div>
      <div class="sliderFooter p-4 justify-content-between">
        <button type="button" class="btn btn-danger">刪除用戶</button>
        <div class="d-flex gap-2">
          <button type="button" class="btn btn-outline">取消</button>
          <button type="button" class="btn btn-primary">確定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sliderHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 72px;
  border-bottom: 1px solid var(--bs-gray-middle);
  padding: 1rem 0.75rem;
}

.sliderFooter {
  padding: 0.75rem;
  border-top: 1px solid var(--bs-gray-middle);
  display: flex;
  gap: 0.5rem;
}
.formRadio {
  &__input {
    display: none;
  }
  &__label {
    border: 1px solid #e2e2e2;
    padding: 0.5rem;
    border-radius: 0.75rem;
    cursor: pointer;
    width: 100%;
    &.active {
      background-color: #f2e8fc;
      border: 1px solid #892092;
      color: #892092;
    }
  }
}
.userImg {
  border-radius: 50%;
  border: 2px solid #000;
  width: 108px;
  height: 108px;
  position: relative;
  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    cursor: pointer;
  }
  &__btn {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    white-space: nowrap;
    z-index: 100;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    transition: all 0.3s;
    cursor: pointer;
  }
  &:hover {
    &::after {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
