<template>
  <div class="todoList">
    <Header />
    <button type="button" @click="todoWrite">
      할 일 추가
    </button>
    <form>
      <span>검색</span>
      <input v-model="search">
    </form>

    <table v-if="searchData.length">
      <thead>
        <tr>
          <th v-for="(item, index) in columns" :key="index">
            {{ item }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in searchData" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.content }}</td>
          <td>{{ item.limitDate }}</td>
          <td>{{ item.isSuccess }}</td>
          <td>{{ item.dateCreate }}</td>
          <td>{{ item.dateUpdate }}</td>
          <td>{{ item.dateSuccess }}</td>
          <td>
            <button @click="todoEdit(item, index)">수정하기</button>
          </td>
          <td>
            <button @click="todoDelete(item, index)">삭제하기</button>
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
  data() {
    return {
      userID: AuthVue.getUser(),
      columns: this.$store.state.attributes,
      list: [],
      search: '',
      dateDelete: '',
      stateDelete: 0,  // 0: 유효, 1: 삭제
      visual: [],
    };
  },
  computed: {
    searchData() {
      const searchKey = this.search && this.search.toLowerCase();
      let data = this.visual;
      if (searchKey) {
        data = data.filter((row) => {
          return Object.keys(row).some((key) => {
            return String(row[key]).toLowerCase().indexOf(searchKey) > -1;
          })
        })
      }
      return data;
    },
  },
  beforeCreate() {},
  created() {
    // 로컬: 전체 리스트 저장
    this.list = JSON.parse(localStorage.getItem(this.userID));

    // 가시화: stateDelete = 0
    this.visual = this.list && this.list.length && this.list.filter(l => {
      return !l.stateDelete;
    })
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
    todoDelete(item) {
      this.deleteAsk() && (
        item.dateDelete = this.$moment().format('YYYY-MM-DD'),
        item.stateDelete = 1, // 1: 삭제
        localStorage.setItem(`${this.userID}`, JSON.stringify(this.list)),

        // 가시화: stateDelete = 0
        this.visual = this.list.length && this.list.filter(l => {
          return !l.stateDelete;
        })
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