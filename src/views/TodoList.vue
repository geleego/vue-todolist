<template>
  <div class="todoList">
    <header>
      <h1>TODO LIST</h1>
      <LoginStateVue />
    </header>

    <button type="button" @click="goWritePage">
      할 일 추가
    </button>

    <table>
      <thead>
        <tr>
          <th>할 일</th>
          <th>임박일</th>
          <th>진행상태</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" v-bind:key="index">
          <!-- <td v-for="key in item" v-bind:key="key">
            {{ item[key] }}
          </td> -->
          <td>{{ item.content }}</td>
          <td>{{ item.limitDate }}</td>
          <td>{{ item.isSuccess }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import userList from "@/assets/users.json";
import LoginStateVue from "@/components/login/LoginState.vue";

export default {
  name: 'todoList',
  components: {
    LoginStateVue,
  },
  watch: {},
  data() {
    return {
      userLists: userList,
      userID: sessionStorage.getItem('userID'),
      list: localStorage.getItem('todo')
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    goWritePage() {
      this.$router.push({ name: 'todowrite' });
    }
  }
};
</script>