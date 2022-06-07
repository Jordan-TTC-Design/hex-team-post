<script>
import { ref } from 'vue';
import axios from 'axios';

import postsStore from '@/stores/postsStore';
import statusStore from '@/stores/statusStore';
import userStore from '@/stores/userStore';
import FormArticle from '@/components/helper/FormArticle.vue';
import FormInput from '@/components/helper/FormInput.vue';

export default {
  components: {
    FormArticle,
    FormInput,
  },
  setup() {
    const userData = userStore();
    const postsData = postsStore();
    const statusData = statusStore();
    const reportData = ref({
      userEamil: '',
      title: '',
      content: '',
    });
    function closeModel() {
      reportData.value.userEamil = '';
      reportData.value.title = '';
      reportData.value.content = '';
      statusData.emailModel = false;
      statusData.noScroll = false;
    }
    async function sendEmail() {
      statusData.addLoading();
      const tempData = reportData.value;
      try {
        const res = await axios({
          method: 'POST',
          url: 'https://hex-post-team-api-server.herokuapp.com/api/email',
          data: {
            to: 'callum.zhong@gmail.com',
            subject: `用戶${tempData.userEamil}來信：${tempData.title}`,
            html: `${tempData.content}<br><br><p>用戶${tempData.userEamil}來信</p>`,
          },
        });
        console.log(res.data);
        statusData.shiftLoading();
        if (res.data === '發信成功') {
          closeModel();
          statusData.openPopInfoModel('傳送成功');
        }
        return res.data;
      } catch (err) {
        console.dir(err);
        statusData.shiftLoading();
        statusData.openPopInfoModel('資料錯誤');
        return err;
      }
    }
    return {
      postsData,
      statusData,
      userData,
      reportData,
      sendEmail,
      closeModel,
    };
  },
};
</script>

<template>
  <div
    class="popModalContainer position-fixed top-0 left-0 z-popModal"
    :class="{ active: statusData.emailModel === true }"
  >
    <!-- Modal-Overlay -->
    <div class="popModalCover" @click="closeModel" />

    <!-- Modal-Window -->
    <div class="signUpModel popModal" :class="{ active: statusData.emailModel === true }">
      <button @click="closeModel" type="button" class="btn position-absolute popModel__btn">
        <i class="bi bi-x-lg"></i>
      </button>
      <div class="bg-secondary rounded-top p-6 position-relative overflow-hidden">
        <img src="@/assets/image/logo-row.svg" alt="logo" class="mb-2" />
        <p class="text-primary">感謝您的使用，填寫詳細您的疑問與需求我們將儘速回覆！</p>
        <img src="@/assets/image/logo-mark.svg" alt="logo-mark" class="signUpModel__logoMark" />
      </div>
      <div class="d-flex flex-column p-4 h-75 flex-grow-1">
        <div class="newPostContentBox d-flex flex-column gap-2 mb-4">
          <FormInput v-model="reportData.userEamil" input-id="reportUserEmail" input-type="email">
            <template v-slot:default>您的電子郵件</template>
          </FormInput>
          <FormInput v-model="reportData.title" input-id="reportUserTitle" input-type="email">
            <template v-slot:default>主旨</template>
          </FormInput>
          <div class="border-top p-2 flex-grow-1 mt-2">
            <p class="mb-1">內容</p>
            <FormArticle
              input-id="reportContent"
              input-name="reportContent"
              text-holder="填寫您的需求"
              v-model="reportData.content"
            />
          </div>
        </div>
        <button type="button" @click="sendEmail" class="btn btn-primary text-white rounded">
          聯絡客服
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.z-popModal {
  z-index: 2400;
}
.popModalContainer {
  height: 100vh;
  width: 100vw;
  transition: all 0.3s;
  pointer-events: none;
  .popModalCover {
    background-color: rgba(0, 0, 0, 0);
    transition: all 0.3s;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .popModal {
    opacity: 1;
    z-index: 100;
    position: absolute;
    border-radius: 0.5rem;
    opacity: 0;
    transform: scaleY(0) translate(-50%, -50%);
    left: 50%;
    top: 40%;
    transition: all 0.3s;
    background-color: #fff;
    width: 600px;
    height: 80vh;
    display: flex;
    flex-direction: column;

    @media (max-width: 998.98px) {
      width: 60vw;
    }
    @media (max-width: 767.98px) {
      width: 75vw;
    }
    @media (max-width: 575.98px) {
      width: 100vw;
      height: 100vh;
      border-radius: 0;
    }
  }
  .signUpModel {
    &__logoMark {
      position: absolute;
      right: 0;
      bottom: 0;
      transform: translate(-12%, 64%);
      opacity: 0.3;
    }
  }
}

.popModalContainer.active {
  pointer-events: auto;
  position: relative;
  .popModalCover {
    background-color: rgba(0, 0, 0, 0.5);
  }
  .popModal {
    opacity: 1;
    left: 50%;
    top: 50%;
    transform: scaleY(1) translate(-50%, -50%);
  }
  .popModel__btn {
    top: 0.75rem;
    right: 0.75rem;
    z-index: 1500;
    color: #1d1d1d;
  }
}
.userPhoto {
  width: 3rem;
  height: 3rem;
  border: 1px solid var(--bs-gray-middle);
  border-radius: 100%;
  object-fit: cover;
  object-position: center;
}
.newPostContentBox {
  flex-shrink: 1;
  flex-grow: 1;
  overflow-y: auto;
}
.newPostContentBox::-webkit-scrollbar {
  border: none;
  width: 0.5rem;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
}
.newPostContentBox::-webkit-scrollbar-thumb {
  background-color: #dddddd;
  border-radius: 0.5rem;
}
.newPostUpLoader {
  border: 1px solid #e2e2e2;
  padding: 0.5rem;
  border-radius: 0.5rem;
  text-align: center;
  cursor: pointer;
  display: block;
}
.newPost__imgBox {
  max-width: 100%;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f7f7f7;
  border: 1px solid #e2e2e2;
  border-radius: 0.5rem;
  &__img {
    max-width: 95%;
    max-height: 95%;
  }
}
</style>
