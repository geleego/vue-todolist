<template>
  <div class="todoWrite">
    <Header />
    <form>
      <div>
        <label for="content">할 일</label>
        <input name="content" v-model="content" placeholder="할 일을 입력하세요." type="text" />
      </div>
      <div>
        <label for="limitDate">임박일</label>
        <input name="limitDate" v-model="limitDate" type="date" />
      </div>
      <div>
        <label for="isSuccess">진행상태</label>
        <select name="isSuccess" v-model="isSuccess" required>
          <option value="todo">Todo</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
      </div>

      <button type="button" @click="addDo">추가하기</button>
    </form>
  </div>
</template>

<script>
import Header from "@/components/layout/Header.vue";
import AuthVue from '@/utill/Auth.js';

export default {
  name: 'todoWrite',
  components: {
    // LoginStateVue
    Header
  },
  data() {
    return {
      items: [],

      // todo 속성 값
      userID: AuthVue.getUser(),
      // key: `${sessionStorage.getItem('userID')}-${JSON.parse(localStorage.getItem('todo')).find}`,
      key: `${sessionStorage.getItem('userID')}`, // todo 고유키 
      content: '', // 할일 
      limitDate: this.$moment().format('YYYY-MM-DD'), // 만료일
      isSuccess: this.$store.state.stateOptions[0].value, // 상태값
      dateCreate: this.$moment().format('YYYY-MM-DD'), // 생성일
      dateUpdate: this.$moment().format('YYYY-MM-DD'), // 수정일
      dateDelete: this.$moment().format('YYYY-MM-DD'), // 삭제일 
      dateSuccess: '', // 완료일 
      stateDelete: '' // 삭제 값
    };
  },
  created() {
    // localStorage에 기존 값이 있다면 items에 미리 넣어놓기
    if (JSON.parse(localStorage.getItem('todo')) !== null) {
      this.items = JSON.parse(localStorage.getItem('todo'))
    }
  },
  mounted() {
  },
  methods: {
    /**
     * todo 추가하기 동작
     */
    addDo() {
      if (this.content && this.limitDate && this.isSuccess) {
        this.items.push({
          content: this.content,
          limitDate: this.limitDate,
          isSuccess: this.isSuccess,
          dateCreate: this.dateCreate
        });
        localStorage.setItem('todo', JSON.stringify(this.items));
        this.$router.push({ name: 'todolist' });
      } else {
        alert('빈칸을 채워주세요.');
      }
    }
  }
};
</script>