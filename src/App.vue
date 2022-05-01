<template>
  <div id="nav" class="flex-grow-1">
    <router-link to="/">Home</router-link> | <router-link to="/posts">Posts</router-link> |
    <router-link to="/member-setting">Setting</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/thumb-up">ThumbUp</router-link> |
  </div>
  <router-view />
</template>

<style lang="scss">
@import './assets/style/all';
</style>
