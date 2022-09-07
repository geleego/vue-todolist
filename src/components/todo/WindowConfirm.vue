<template>
  <div v-if="msg.length !== 0"></div>
</template>

<script>
import { EventBus } from '@/utill/EventBus';

export default {
  name: 'WindowConfirm',
  data() {
    return {
      msg: ''
    }
  },
  created() {
    EventBus.$on('confirm', (o) => {
      if (window.confirm(o.confirmMsg)) {
        o.callback();
      }
    });
  }
};
</script>