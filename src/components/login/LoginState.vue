<template>
  <div class="loginState">
    <b>{{ userID }}</b>님 환영합니다.
    <button @click="goLogout">로그아웃</button>
  </div>
</template>

<script>
import AuthVue from '@/utill/Auth.js';

export default {
  name: 'LoginState',
  data() {
    return {
      userID: AuthVue.getUser(),
    };
  },
  created() {
    AuthVue.getUser() ?? this.goLogout()
    if (!AuthVue.getUser()) {
      this.goLogout();
    }
  },
  methods: {
    goLogout() {
      AuthVue.logout();
      this.$router.push({name: 'login'});
    }
  }
}
</script>