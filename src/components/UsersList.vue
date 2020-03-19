<template>
  <table class="users-list">
    <thead>
      <th>Name</th>
      <th>Phone</th>
      <th>Company</th>
      <th></th>
    </thead>
    <tbody>
      <tr
        is="user-block"
        v-for="(user, index) in users"
        :key="user.id"
        :user="user"
        :rowNum="index"
      />
    </tbody>
  </table>
</template>

<script>
// import _ from "lodash/lang";
import UserBlock from "./UserBlock";

export default {
  name: "UsersList",
  computed: {
    users() {
      return this.$store.state.users;
    }
  },
  components: {
    UserBlock
  }
};
</script>

<style lang="scss">
$main-color: #0057d8;

.users-list {
  border-collapse: collapse;
  margin: 1rem 0 0 1rem;

  thead th {
    color: white;
    background-color: $main-color;
    border: 1px solid $main-color;
    text-align: left;
    font-weight: normal;
    padding: 3px;
  }
}
</style>
