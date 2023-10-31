<template>
  <div>
    <div v-for="item in items" :key="item.id" ref="card">
      <v-card width="400" height="200" :title="item"></v-card>

      <v-divider></v-divider>
      <button @click="top">Top</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 1,
      items: [],
    };
  },

  methods: {
    loadMore() {
      // Load 10 new items and add them to the items array
      for (let i = 1; i <= 10; i++) {
        this.items.push("Item " + this.counter++);
      }
      // Increment the counter
    },
    top() {
      window.scrollTo(0, 0);
    },
  },
  created() {
    window.addEventListener("beforeunload", () => {
      window.scrollTo(0, 0);
    });
    window.onscroll = () => {
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;

      if (bottomOfWindow) {
        console.log("bottom", bottomOfWindow);
        this.loadMore();
      }
    };

    // Initially load some items.

    this.loadMore();
  },
};
</script>
