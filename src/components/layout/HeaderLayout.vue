<template>
  <div>
    <header>
      <h1>TODO LIST</h1>
      <h2>
        {{ subTitle }}
      </h2>
      <LoginStateVue
        v-if="this.$getUser()"
        :userID="this.$getUser()"
      />
    </header>
  </div>
</template>

<script>
import LoginStateVue from "@/components/login/LoginState.vue";

export default {
  name: 'headerLayout',
  components: {
    LoginStateVue
  },
  props: {
    subTitle: String
  },
  momonted() {
    if (!this.$getUser() && window.location.pathname === !'/') {
      window.alert("로그인 정보가 없어 로그인 페이지로 이동합니다.");
      this.$router.push({ path: "/" });
    }
  }
}
</script>
