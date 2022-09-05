<template>
  <div>
    <Header subTitle="할 일 추가" />
    <Form :pageType="this.$route.params.pageType" />
  </div>
</template>

<script>
import Header from "@/components/layout/Header.vue";
import Form from "@/components/todo/Form.vue";

export default {
  name: 'todoWrite',
  components: {
    Header,
    Form
  },
  props: {
    pageType: String
  }
};
</script>