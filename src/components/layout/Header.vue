<template>
  <div>
    <header>
      <h1>TODO LIST</h1>
      <h2>
        {{ subTitle }}
      </h2>
      <LoginStateVue v-if="this.userState" />
    </header>
  </div>
</template>

<script>
import LoginStateVue from "@/components/login/LoginState.vue";
import AuthVue from '@/utill/Auth.js';

export default {
  name: 'headerLayout',
  components: {
    LoginStateVue
  },
  props: {
    subTitle: String
  },
  data() {
    return {
      userState: undefined
    }
  },
  created() {
    this.userState = AuthVue.getUser();
  }
}
</script>
