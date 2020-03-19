<template>
  <button type="button" class="button button--navigation" @click="updatePage">{{ page.displayName }}</button>
</template>

<script>
export default {
  Name: "NavButton",
  props: ["page"],
  methods: {
    updatePage() {
      this.$store.dispatch("updatePage", this.page.pageRef);
    }
  }
};
</script>

<style lang="scss">
$main-color: #0057d8;

.button--navigation {
  &.active {
    background-color: white;
    color: $main-color;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
}
</style>