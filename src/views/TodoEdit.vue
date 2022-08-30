<template>
  <div class="todoEdit">
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

      <button type="button" @click="todoEdit">수정하기</button>
      <button type="button" @click="back">취소하기</button>
    </form>
  </div>
</template>

<script>
import Header from "@/components/layout/Header.vue";
import AuthVue from '@/utill/Auth.js';

export default {
  name: 'todoEdit',
  components: {
    Header
  },
  props: {
    item: {
      type: Object,
    },
    index: {
      type: Number,
    }
  },
  data() {
    return {
      items: [],
      userID: AuthVue.getUser(),
      content: '',
      limitDate: '',
      isSuccess: '',
      dateUpdate: this.$moment().format('YYYY-MM-DD'),
      dateSuccess: '', 
      initItem: undefined
    };
  },
  created() {
    this.items = JSON.parse(localStorage.getItem(this.userID));
    this.initItem = this.$route.params.item;

    // form 기존 초기 값 설정
    this.content = this.initItem.content;
    this.limitDate = this.initItem.limitDate;
    this.isSuccess = this.initItem.isSuccess;
  },
  mounted() {
  },
  methods: {
    todoEdit() {
      if(this.content && this.limitDate && this.isSuccess) {
        let item = this.items[this.$route.params.index];
        item.content = this.content;
        item.limitDate = this.limitDate;
        item.isSuccess = this.isSuccess;
        item.content = this.content;
        item.dateUpdate = this.dateUpdate;
        item.dateSuccess = this.dateSuccess;

        localStorage.setItem(`${this.userID}`, JSON.stringify(this.items));
        this.$router.push({ name: 'todolist' });
      } else {
        alert('빈칸을 채워주세요.');
      }
    },

    /**
     * isSuccess done 시, dateSuccess 기록
     */
    onSuccess() {
      if(this.isSuccess === 'done') {
        this.dateSuccess = this.$moment().format('YYYY-MM-DD');
      } else {
        this.dateSuccess = '';
      }
    },

    /**
     * 수정하지 않고, 뒤로 돌아가기
     */
    back() {
      this.noEditAsk() && (
        this.$router.push({ name: 'todolist' })
      );
    },

    /**
     * 수정취소 질문 alert
     * @return {boolean}
     */
    noEditAsk() {
      let msg = '수정을 취소하시겠습니까? \n취소한 내용은 적용되지 않습니다.'
      return window.confirm(msg);
    }
  }
};
</script>