<template>
  <div>
    <form v-if="searchData">
      <span>검색</span>
      <input type='text' @input="changeSearch">
    </form>

    <table v-if="searchData && searchData.length">
      <thead>
        <tr>
          <th
            v-for="(item, index) in columns"
            :key="index"
            @click="sortBy(item, index)"
          >
            {{ item }}
            <span
              v-if="item !== '순번' && item !== '수정하기' && item !== '삭제하기'"
              class="arrow"
              :class="sortOrders[item] > 0 ? 'asc' : 'dsc'"
            >
            </span>
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

export default {
  name: 'todoTable',
  components: {},
  props: {
  },
  emit: {},
  data() {
    return {
      userID: this.$getUser(),
      columns: this.$store.state.attributes,
      list: [],
      search: '',
      dateDelete: '',
      stateDelete: 0,  // 0: 유효, 1: 삭제
      visual: [],
      sortKey: '',
      sortOrders: this.$store.state.attributes.reduce((c, key) => (
        (c[key] = 1), c // 오름차순(1) 설정
      ), {})
    };
  },
  computed: {
    searchData() {
      let data = this.visual;

      if (this.search) {
        data = data.filter((row) => {
          // key, stateDelete 속성 검색 제외
          return Object.keys(row).filter(v => v !== 'key' && v !== 'stateDelete').some((key) => {
            return String(row[key]).toLowerCase().indexOf(this.search.toLowerCase()) > -1;
          });
        });        
      }
      return data;
    },
  },
  beforeCreate() {},
  created() {
    // 로컬: 전체 리스트 저장
    this.list = JSON.parse(localStorage.getItem(this.userID));
    
    // 가시화: stateDelete = 0 설정
    this.visual = this.list && this.list.length && this.list.filter(l => {
      return !l.stateDelete;
    });
    
    // attributes json -> objects 변경
    this.columns.reduce((o, key) => (
      (o[key] = 1), o
      ), {});
  },
  methods: {
    todoWrite() {
      this.$router.push({ name: 'todowrite', params: { pageType: 'write' } });
    },
    todoEdit(item, index) {
      this.$router.push({ name: 'todoedit', params: { pageType: 'edit', item: item, index: index } });
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
     * 한글입력 즉시 반영
     * @param {Event} e 
     */
    changeSearch(e) {
      this.search = e.target.value;
    },

    /**
     * 영구삭제 질문 alert
     * @return {boolean}
     */
    deleteAsk() {
      let msg = '정말 삭제하시겠습니까? \n삭제된 데이터는 다시 복구되지 않습니다.'
      return window.confirm(msg);
    },

    /**
     * 리스트 정렬
     * @param {string} item 
     * @param {number} index 
     */
    sortBy(item, index) {
      // 토글
      this.sortOrders[item] = this.sortOrders[item] * -1;

      // 리스트 정렬 
      this.visual.sort((a, b) => {
        let aIndex = Object.values(a)[index];
        let bIndex = Object.values(b)[index];

        const sortKey = index;
        const sortOrders = this.sortOrders;
        const order = Object.values(sortOrders)[sortKey] || 1;
        return (aIndex === bIndex ? 0 : aIndex > bIndex ? 1 : -1) * order;
      })
    }
  }
};
</script>

<style lang="scss" scoped>
  th {
    cursor: pointer;
  }
  .arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
  }
  .arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid rgb(0, 0, 0);
  }
  .arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid rgb(0, 0, 0);
  }
</style>