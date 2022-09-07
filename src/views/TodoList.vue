<template>
  <div class="todoList">
    <Header subTitle="할 일 목록" />
    <button
      type="button"
      @click="todoWrite"
    >
      할 일 추가
    </button>
    <Table />
  </div>
</template>

<script>
import Header from "@/components/layout/HeaderLayout.vue";
import Table from "@/components/todo/TodoTable.vue";

export default {
  name: 'todoList',
  components: {
    Header,
    Table
  },
  data() {
    return {};
  },
  methods: {
    todoWrite() {
      this.$router.push({ name: 'todowrite', params: { pageType: 'write' } });
    }
  }
};
</script>