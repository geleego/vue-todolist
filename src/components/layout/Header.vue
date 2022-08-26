<template>
  <div>
    <header>
      <h1>TODO LIST</h1>
      <LoginStateVue />
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
  data() {
    return {
    }
  }
}
</script>
