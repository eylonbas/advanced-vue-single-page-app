<template>
  <img class="button button--delete" src="@/assets/delete.png" @click="$emit('delete')" />
</template>

<script>
export default {
  name: "DeleteButton"
};
</script>

<style lang="scss">
.button {
  cursor: pointer;

  &.button--delete {
    height: 1.4rem;
    padding: 0;
    margin: 0;
    background-color: transparent;
    margin-bottom: -5px;
  }
}
</style>