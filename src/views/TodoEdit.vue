<template>
  <Form :pageType="this.$route.params.pageType" />
</template>

<script>
import Form from "@/components/todo/Form.vue";

export default {
  name: 'todoEdit',
  components: {
    Form
  },
  props: {
    pageType: String
  }
};
</script>