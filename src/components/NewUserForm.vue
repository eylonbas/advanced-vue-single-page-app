<template>
  <ValidationObserver v-slot="{ handleSubmit }" ref="form">
    <form class="form form--new-user" @submit.prevent="handleSubmit(addUser)">
      <validation-provider
        rules="required|minChars:3"
        v-slot="{errors, changed, invalid}"
        name="Name"
        :bails="false"
        class="form__field"
      >
        <label class>Name</label>
        <input
          type="text"
          :class="{'form__input--invalid': invalid && changed}"
          v-model="name"
          placeholder="Yossi Cohen"
        />
        <span class="form__validation-errors">{{ errors[0] }}</span>
      </validation-provider>

      <validation-provider
        rules="required|minChars:5"
        v-slot="{errors, changed, invalid}"
        name="User Name"
        :bails="false"
        class="form__field"
      >
        <label class>User Name</label>
        <input
          type="text"
          :class="{'form__input--invalid': invalid && changed}"
          v-model="username"
          placeholder="Yossi_Hamelech23"
        />
        <span class="form__validation-errors">{{ errors[0] }}</span>
      </validation-provider>

      <validation-provider
        rules="required|numeric|minChars:10"
        v-slot="{errors, changed, invalid}"
        name="Phone"
        class="form__field"
      >
        <label class>Phone</label>
        <input
          type="text"
          :class="{'form__input--invalid': invalid && changed}"
          v-model="phone"
          placeholder="0526658492"
        />
        <span class="form__validation-errors">{{ errors[0] }}</span>
      </validation-provider>

      <validation-provider
        rules="required|minChars:2"
        v-slot="{errors, changed, invalid}"
        name="Company"
        :bails="false"
        class="form__field"
      >
        <label class>Company</label>
        <input
          type="text"
          :class="{'form__input--invalid': invalid && changed}"
          v-model="company"
          placeholder="Tipalti Solutions"
        />
        <span class="form__validation-errors">{{ errors[0] }}</span>
      </validation-provider>

      <button type="button" class="button button--reset" @click="resetForm">Reset</button>
      <button type="submit" class="button button--submit">Add</button>
    </form>
  </ValidationObserver>
</template>

<script>
import _ from "lodash/lang";
import { ValidationProvider, extend, ValidationObserver } from "vee-validate";

extend("required", {
  validate: value => {
    return !_.isEmpty(value) && !_.isEmpty(value.trim());
  },
  message: "The {_field_} field is required",
  computesRequired: true
});

extend("numeric", {
  validate: value => {
    return !isNaN(value);
  },
  message: "You can only type numbers in {_field_}"
});

extend("minChars", {
  validate: function(value, args) {
    return value.trim().length >= args.length;
  },
  params: ["length"],
  message: "{_field_} has to be {length} chars or longer"
});

export default {
  name: "NewUserForm",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      name: null,
      username: null,
      phone: null,
      company: null
    };
  },
  computed: {
    highestUserId() {
      return this.$store.getters.highestUserId;
    }
  },
  methods: {
    addUser() {
      this.$store.dispatch("addUser", {
        id: this.highestUserId + 1,
        name: this.name,
        username: this.username,
        phone: this.phone,
        company: { name: this.company }
      });
      this.resetForm();
      this.$store.dispatch("updatePage", "users-list");
    },
    resetForm() {
      this.name = null;
      this.username = null;
      this.phone = null;
      this.company = null;
      this.$refs.form.reset();
    }
  }
};
</script>

<style lang="scss">
$main-color: #0057d8;

.form {
  margin: 1rem 0 0 1rem;

  &.form--new-user {
    .form__field {
      display: flex;
      margin-top: 1rem;

      label {
        width: 120px;
      }

      input[type="text"] {
        border-radius: 3px;
        border: none;
        box-shadow: 0 0 0 1px lightgrey;
        padding: 5px;
        font-weight: bold;
        color: $main-color;
        outline: none;

        &.form__input--invalid {
          box-shadow: 0 0 0 1px red, 0 1px 3px rgba(255, 0, 0, 0.32),
            0 1px 2px rgba(255, 0, 0, 0.44);
        }

        &::placeholder {
          font-style: italic;
          font-weight: normal;
        }
      }

      .form__validation-errors {
        color: red;
        display: flex;
        flex-direction: column;
        margin-left: 1rem;
      }
    }
  }
}
</style>