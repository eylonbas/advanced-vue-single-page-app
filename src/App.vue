<template>
  <div id="app">
    <div class="navigation-bar">
      <nav-button
        v-for="page in pages"
        :class="{ active: page.pageRef === currentPage }"
        :key="page.pageRef"
        :page="page"
      />
    </div>
    <keep-alive>
      <component class="app__current-page" :is="currentPage" />
    </keep-alive>
  </div>
</template>

<script>
import UsersList from "./components/UsersList.vue";
import NewUserForm from "./components/NewUserForm.vue";
import NavButton from "./components/NavButton.vue";

export default {
  name: "App",
  components: {
    UsersList,
    NewUserForm,
    NavButton
  },
  computed: {
    pages() {
      return this.$store.state.pages;
    },
    currentPage() {
      return this.$store.state.currentPage;
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Poppins&display=swap");
$main-color: #0057d8;

* {
  font-family: Poppins, sans-serif;
}

body {
  margin: 0;
}

.button {
  border: none;
  padding: 5px 8px;
  border-radius: 3px;
  margin: 1rem 0 0 1rem;
  background-color: $main-color;
  color: white;
  outline: none;
  transition: all 0.1s linear;
}
</style>