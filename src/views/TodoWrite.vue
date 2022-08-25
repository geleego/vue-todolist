<template>
  <div class="todoWrite">
    <header>
      <h1>TODO LIST</h1>
      <LoginStateVue />
    </header>

    <form>
      <!-- 할 일, 임박일, 진행상태, 생성일자, 수정일자, 삭제일자, 완료일자 -->
      <div>
        <label for="content">할 일</label>
        <input name="content" v-model="content" type="text" />
      </div>
      <div>
        <label for="limitData">임박일</label>
        <input name="limitData" v-model="limitData" type="text" />
      </div>
      <div>
        <label for="isSuccess">진행상태</label>
        <select name="isSuccess" v-model="isSuccess" required>
          <option value="todo">Todo</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
      </div>
      <!-- <div>
        <label for="dateCreate">생성일자</label>
        <input name="dateCreate" v-model="dateCreate" type="text" />
      </div>
      <div>
        <label for="dateUpdate">수정일자</label>
        <input name="dateUpdate" v-model="dateUpdate" type="text" />
      </div>
      <div>
        <label for="dateDelete">삭제일자</label>
        <input name="dateDelete" v-model="dateDelete" type="text" />
      </div>
      <div>
        <label for="dateSuccess">완료일자</label>
        <input name="dateSuccess" v-model="dateSuccess" type="text" />
      </div>
      <div>
        <label for="stateDelete">종료상태</label>
        <input name="stateDelete" v-model="stateDelete" type="text" />
      </div> -->

      <button type="button" @click="addDo">추가하기</button>
    </form>
  </div>
</template>

<script>
import LoginStateVue from "@/components/login/LoginState.vue";
import AuthVue from '@/utill/Auth.js';

/**
 * 진행상태 옵션들
 */
const stateOptions = [
  { value: 'todo', option: 'To Do' },
  { value: 'doing', option: 'Doing' },
  { value: 'done', option: 'Done' },
];

export default {
  name: 'todoWrite',
  components: {
    LoginStateVue
  },
  data() {
    return {
      items: [],

      // todo 속성 값
      userID: AuthVue.getUser(),
      key: '',  // `todo-${num}`
      content: '',
      limitData: '',
      isSuccess: stateOptions[0].value,
      dateCreate: '',
      dateUpdate: '',
      dateDelete: '',
      dateSuccess: '',
      stateDelete: ''
    };
  },
  mounted() {
  },
  created() {
    // @TODO: local에 값이 있는지 확인하고, 있으면 items에 미리 값을 넣어둔다.
    localStorage.getItem('todo')
    ? this.items.push(JSON.parse(localStorage.getItem('todo'))) // 배열 전체로 오는 문제 조치 필요..
    : console.log(this.items);
  },
  methods: {
    /**
     * todo 작성 폼 체크
     */
    addDo() {
      this.content && this.limitData && this.isSuccess
      ? (
        this.items.push({
          content: this.content,
          limitData: this.limitData,
          isSuccess: this.isSuccess
        }),
        localStorage.setItem('todo', JSON.stringify(this.items))
        // this.$router.push({ name: 'todolist' })
      ) : (
        alert('빈칸을 채워주세요.')
      )
    }
  }
};
</script>