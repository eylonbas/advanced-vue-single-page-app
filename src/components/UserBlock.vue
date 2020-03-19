<template>
  <tr
    class="users-list__user"
    v-tooltip.top="'User name is ' + user.username"
    :class="isEvenRow ? 'users-list__user--even' : 'users-list__user--odd'"
  >
    <td>{{user.name}}</td>
    <td>{{user.phone}}</td>
    <td>{{user.company.name}}</td>
    <td>
      <delete-button @delete="removeUser" />
    </td>
  </tr>
</template>

<script>
import DeleteButton from "./DeleteButton";

export default {
  name: "UserBlock",
  props: ["user", "rowNum"],
  components: {
    DeleteButton
  },
  computed: {
    isEvenRow() {
      return this.rowNum % 2 !== 0;
    }
  },
  methods: {
    removeUser() {
      this.$store.dispatch("removeUser", this.user.id);
    }
  }
};
</script>

<style lang="scss">
$main-color: #0057d8;

.users-list__user {
  td {
    border: 1px solid $main-color;
    padding: 3px;
    text-align: left;
  }

  &.users-list__user--even {
    background-color: lighten($main-color, 53%);
  }
}

.tooltip {
  background-color: white;
  color: $main-color;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 3px;
  padding: 5px 8px;
  margin-bottom: 5px;
}
</style>