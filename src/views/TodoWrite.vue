<template>
  <div class="todoWrite">
    <Header />

    <form>
      <div>
        <label for="content">할 일</label>
        <input name="content" v-model="content" placeholder="할 일을 입력하세요." type="text" />
      </div>
      <div>
        <label for="limitDate">만료일</label>
        <input name="limitDate" v-model="limitDate" type="date" />
      </div>
      <div>
        <label for="isSuccess">진행상태</label>
        <select name="isSuccess" v-model="isSuccess" @change="onSuccess" required>
          <option value="todo">Todo</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
      </div>

      <button type="button" @click="todoAdd">추가하기</button>
    </form>
  </div>
</template>

<script>
import Header from "@/components/layout/Header.vue";
import AuthVue from '@/utill/Auth.js';

export default {
  name: 'todoWrite',
  components: {
    Header
  },
  data() {
    return {
      items: [],
      list: undefined,
      userID: AuthVue.getUser(),
      key: '',
      todoID: 1,
      content: '',
      limitDate: this.$moment().format('YYYY-MM-DD'),
      isSuccess: this.$store.state.stateOptions[0].value,
      dateCreate: this.$moment().format('YYYY-MM-DD'),
      dateUpdate: '',
      dateSuccess: '',
    };
  },
  created() {
    this.list = JSON.parse(localStorage.getItem(this.userID));

    if (!this.list || this.list.length === 0) {
      this.key = `${AuthVue.getUser()}-${this.todoID}`;
    } else {
      // localStorage 기존 값 존재 시, 미리 items에 삽입
      this.items = this.list;

      // key 부여
      let lastKey = this.items[this.items.length - 1].key;  // list 마지막 배열 key 값
      this.todoID = Number(lastKey.split('-')[1]) + 1;      // index 값 + 1
      this.key = `${AuthVue.getUser()}-${this.todoID}`;     // todo 고유 key 생성
    }
  },
  mounted() {},
  methods: {
    todoAdd() {
      if (this.content && this.limitDate && this.isSuccess) {
        this.items.push({
          key: this.key,
          content: this.content,
          limitDate: this.limitDate,
          isSuccess: this.isSuccess,
          dateSuccess: this.dateSuccess,
          dateCreate: this.dateCreate,
        });
        localStorage.setItem(`${this.userID}`, JSON.stringify(this.items));
        this.$router.push({ name: 'todolist' });
      } else {
        alert('빈칸을 채워주세요.');
      }
    },

    /**
     * 진행상태 Done일 때, 완료일자 지정
     */
    onSuccess() {
      if(this.isSuccess === 'done') {
        this.dateSuccess = this.$moment().format('YYYY-MM-DD');
      } else {
        this.dateSuccess = '';
      }
    }
  }
};
</script>