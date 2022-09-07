<template>
  <div>
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
          <option
            v-for="option in this.$store.state.stateOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.optionName }}
          </option>
        </select>
      </div>

      <button
        v-if="this.$route.params.pageType === 'write'"
        type="button"
        @click="todoAdd"
      >
        추가하기
      </button>
      <button v-else type="button" @click="todoEdit">
        수정하기
      </button>
      <button type="button" @click="back">취소하기</button>
     
    </form>
  </div>
</template>

<script>
import { EventBus } from "@/utill/EventBus";

export default {
  name: 'todoForm',
  components: {},
  props: {
    item: Object,
    index: Number,
    pageType: String
  },
  emit: {},
  data() {
    return {
      items: [],
      list: [],
      userID: this.$getUser(),
      key: '',
      todoID: 1,
      content: '',
      limitDate: this.$moment().format('YYYY-MM-DD'),
      isSuccess: this.$store.state.stateOptions[0].value,
      dateCreate: this.$moment().format('YYYY-MM-DD'),
      dateUpdate: '',
      dateDelete: '',
      dateSuccess: '',
      stateDelete: 0, // 0: 유효, 1: 삭제
      initItem: undefined
    };
  },
  created() {
    this.list = JSON.parse(localStorage.getItem(this.userID));

    if(this.$route.params.pageType === 'write') {
      if (!this.list || !this.list.length) {
        this.key = `${this.$getUser()}-${this.todoID}`;
      } else {
        // localStorage 기존 값 존재 시, 미리 items에 삽입
        this.items = this.list;
        // key 부여
        let lastKey = this.items[this.items.length - 1].key;  // list 마지막 배열 key 값
        this.todoID = Number(lastKey.split('-')[1]) + 1;      // index 값 + 1
        this.key = `${this.$getUser()}-${this.todoID}`;     // todo 고유 key 생성
      }
    } else {
      this.initItem = this.$route.params.item;
      // form 기존 초기 값 설정
      this.content = this.initItem.content;
      this.limitDate = this.initItem.limitDate;
      this.isSuccess = this.initItem.isSuccess;
    }
    
  },
  methods: {
    todoAdd() {
      if (this.content && this.limitDate && this.isSuccess) {
        this.items.push({
          key: this.key,
          content: this.content,
          limitDate: this.limitDate,
          isSuccess: this.isSuccess,
          dateCreate: this.dateCreate,
          dateUpdate: this.dateUpdate,
          dateSuccess: this.dateSuccess,
          stateDelete: this.stateDelete
        });
        localStorage.setItem(`${this.userID}`, JSON.stringify(this.items));
        this.$router.push({ name: 'todolist' });
      } else {
        this.blankAlert();
      }
    },
    todoEdit() {
      if(this.content && this.limitDate && this.isSuccess) {
        let item = this.list[this.$route.params.index];
        item.key,
        item.content = this.content;
        item.limitDate = this.limitDate;
        item.isSuccess = this.isSuccess;
        item.dateCreate = this.dateCreate,
        item.dateUpdate = this.dateUpdate;
        item.dateUpdate = this.$moment().format('YYYY-MM-DD');
        item.dateSuccess = this.dateSuccess;
        item.stateDelete = this.stateDelete

        localStorage.setItem(`${this.userID}`, JSON.stringify(this.list));
        this.$router.push({ name: 'todolist' });
      } else {
        this.blankAlert();
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
      let msg = '취소하시겠습니까? \n취소한 내용은 저장되지 않습니다.';
      EventBus.$emit('confirm', { confirmMsg: msg, callback: () => {
        this.$router.back();
      }});
    },

    /**
     * 빈칸 alert
     */
    blankAlert() {
      alert('빈칸을 채워주세요.');
    }
  },
};
</script>