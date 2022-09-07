<template>
  <div>
    <Header subTitle="할 일 편집" />
    <Form :pageType="this.$route.params.pageType" />
  </div>
</template>

<script>
import Header from "@/components/layout/Header.vue";
import Form from "@/components/todo/Form.vue";

export default {
  name: 'todoEdit',
  components: {
    Header,
    Form
  },
  props: {
    pageType: String
  }
};
</script>