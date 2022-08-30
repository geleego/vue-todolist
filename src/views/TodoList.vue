<template>
  <div class="todoList">
    <Header />
    <button type="button" @click="todoWrite">
      할 일 추가
    </button>

    <table>
      <thead>
        <tr>
          <th v-for="(item, index) in columns" :key="index">
            {{ item }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="index">
          <td>{{ item.content }}</td>
          <td>{{ item.limitDate }}</td>
          <td>{{ item.isSuccess }}</td>
          <td>{{ item.dateCreate }}</td>
          <td>{{ item.dateUpdate }}</td>
          <td>{{ item.dateDelete }}</td>
          <td>{{ item.dateSuccess }}</td>
          <td>
            <button @click="todoEdit(item, index)">수정하기</button>
          </td>
          <td>
            <button @click="todoDelete(index)">삭제하기</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Header from "@/components/layout/Header.vue";
import AuthVue from '@/utill/Auth.js';

export default {
  name: 'todoList',
  components: {
    Header
  },
  watch: {},
  data() {
    return {
      userID: AuthVue.getUser(),
      columns: this.$store.state.attributes,
      list: undefined,
    };
  },
  beforeCreate() {},
  created() {
    this.list = JSON.parse(localStorage.getItem(this.userID));
  },
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
    todoEdit(item, index) {
      this.$router.push({ name: 'todoedit', params: { item: item, index: index } });
    },
    todoDelete(index) {
      this.deleteAsk() && (
        this.list.splice(index, 1),
        localStorage.setItem(this.userID, JSON.stringify(this.list))
      );
    },

    /**
     * 영구삭제 질문 alert
     * @return {boolean}
     */
    deleteAsk() {
      let msg = '정말 삭제하시겠습니까? \n삭제된 데이터는 다시 복구되지 않습니다.'
      return window.confirm(msg);
    }
  }
};
</script>