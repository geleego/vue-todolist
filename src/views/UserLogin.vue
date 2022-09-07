<template>
  <div class="userLogin">
    <Header subTitle="로그인" />
    <div>
      <label for="userID">아이디</label>
      <br />
      <input
        name="userID"
        type="text"
        v-model="userID"
        placeholder="아이디를 입력하세요"
        required
      />
    </div>
    <div>
      <label for="userPW">비밀번호</label>
      <br />
      <input
        name="userPW"
        type="password"
        v-model="userPW"
        placeholder="비밀번호를 입력하세요"
        required
      />
    </div>
    <div>
      <button @click="userMatch">로그인</button>
    </div>
  </div>
</template>

<script>
import Header from "@/components/layout/Header.vue";
import userList from "@/assets/users.json";

export default {
  name: 'userLogin',
  components: {
    Header
  },
  data() {
    return {
      userID: '',
      userPW: ''
    };
  },
  methods: {
    /**
     * 사용자 검증
     */
    userMatch() {
      const match = userList.find( user => {
        return user.userID === this.userID && user.userPW === this.userPW;
      });

      if (match) {
        this.$setUser(this.userID);
        this.$router.push({ name: 'todolist' });
      } else {
        alert('잘못된 아이디이거나, 비밀번호 입니다.');
      }
    }
  }
};
</script>