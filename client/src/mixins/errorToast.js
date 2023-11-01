export default {
    methods: {
      toast(errors) {
        errors.map((error) => {
          this.$toast.error(error.msg);
        });
      },
    },
  };
  