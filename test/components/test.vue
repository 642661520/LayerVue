<template>
  <div id="movetest">
    template{{ id }}<br />
    <button @click="add">加一</button>
    <div>{{ a }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a: 1,
    };
  },
  props: { id: {} },
  methods: {
    add() {
      this.a++;
    },
  },
};
</script>
