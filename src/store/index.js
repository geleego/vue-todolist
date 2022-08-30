import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {  // 프로젝트 공통 사용 변수 정의
    // 진행상태 옵션
    stateOptions: [
      { value: 'todo', option: 'To Do' },
      { value: 'doing', option: 'Doing' },
      { value: 'done', option: 'Done' },
    ],
    attributes : [
      // 'No.',
      '할 일',
      '만료일',
      '진행상태',
      '생성일자',
      '수정일자',
      '삭제일자',
      '완료일자',
      '수정하기',
      '삭제하기'
    ]
  },
  getters: {  // 여러 component의 computed 공통 사용 정의
  },
  mutations: {  // state 변경 (commit) 
  },
  actions: {  // mutations 실행 (dispatch)
  },
  modules: {
  }
})
