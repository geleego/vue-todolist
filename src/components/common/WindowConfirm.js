export default {
  name: 'WindowConfirm',
  props: {
    msg: String
  },
  methods: {
    askAlert() {
      return window.confirm(this.$route.params.msg);
    }
  }
};
