<template>
  <div class="loginState">
    <b>{{ this.userID }}</b>님 환영합니다.
    <button @click="goLogout">로그아웃</button>
  </div>
</template>

<script>
export default {
  name: 'LoginState',
  data() {
    return {};
  },
  props: {
    userID: String
  },
  created() {
    this.userID ?? this.goLogout()
  },
  methods: {
    goLogout() {
      this.$logout();
      this.$router.push({ path: "/" });
    }
  }
}
</script>