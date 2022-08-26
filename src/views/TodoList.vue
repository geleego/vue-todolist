<template>
  <div class="todoList">
    <button type="button" @click="todoWrite">
      할 일 추가
    </button>

    <table>
      <thead>
        <tr>
          <th v-for="(item, index) in this.$store.state.attributes" :key="index">
            {{ item }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="index">
          <td>{{ item.key }}</td>
          <td>{{ item.content }}</td>
          <td>{{ item.limitDate }}</td>
          <td>{{ item.isSuccess }}</td>
          <td>{{ item.dateCreate }}</td>
          <td>{{ item.dateUpdate }}</td>
          <td>{{ item.dateDelete }}</td>
          <td>{{ item.dateSuccess }}</td>
          <td>
            <button @click="todoEdit">수정하기</button>
          </td>
          <td>
            <button @click="todoDelete">삭제하기</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import userList from "@/assets/users.json";

export default {
  name: 'todoList',
  watch: {},
  data() {
    return {
      userLists: userList,
      userID: sessionStorage.getItem('userID'),
      list: JSON.parse(localStorage.getItem('todo'))
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
    todoWrite() {
      this.$router.push({ name: 'todowrite' });
    },
    todoEdit() {
      this.$router.push({ name: 'todowrite' });
    },
    todoDelete() {
      this.$router.push({ name: 'todowrite' });
    }
  }
};
</script>