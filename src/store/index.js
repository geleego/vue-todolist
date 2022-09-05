import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {  // 프로젝트 공통 사용 변수 정의
    /* 테이블 속성 */
    attributes : [
      // '순번',
      '할 일',
      '만료일',
      '진행상태',
      '생성일자',
      '수정일자',
      // '삭제일자',
      '완료일자',
      '수정하기',
      '삭제하기'
    ],
    
    /* 진행상태 옵션 */
    stateOptions: [
    { value: 'todo', optionName: 'To Do' },
    { value: 'doing', optionName: 'Doing' },
    { value: 'done', optionName: 'Done' },
    ],
  },
  getters: {  // 여러 component의 computed 공통 사용 정의
  },
  mutations: {  // state 변경 (commit) - 동기처리 시 사용
  },
  actions: {    // mutations 실행 (dispatch) - 비동기처리 시 사용
  },
  modules: {
  }
})
