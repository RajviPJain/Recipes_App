<template>
  <div class="my-12">
    <v-form ref="form">
      <v-card
        class="mx-auto pa-12 pb-8 my-12"
        elevation="8"
        max-width="500"
        rounded="lg"
      >
        <div class="text-subtitle-1 text-medium-emphasis">Account</div>

        <v-text-field
          density="compact"
          placeholder="Email address"
          :error-messages="v$.email.$errors.map((e) => e.$message)"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="v$.email.$model"
          @input="v$.email.$touch"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Password

          <a
            class="text-caption text-decoration-none text-blue"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Forgot login password?</a
          >
        </div>

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          :error-messages="v$.password.$errors.map((e) => e.$message)"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          @input="v$.password.$touch"
          v-model="password"
        ></v-text-field>

        <v-card class="mb-4" color="surface-variant" variant="tonal"> </v-card>

        <v-btn
          block
          class="mb-4"
          color="black"
          size="large"
          variant="tonal"
          @click="submit()"
        >
          Log In
        </v-btn>

        <v-btn
          block
          class="mb-4"
          color="black"
          size="large"
          variant="tonal"
          @click="googleAuth()"
          >Log In with google</v-btn
        >
        <v-card-text class="text-center">
          <v-btn class="text-black text-decoration-none" to="/signup">
            Sign Up now
            <v-icon icon="mdi-chevron-right"></v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import userApi from "../../services/users";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data: () => ({
    visible: false,
    email: "trail@gmail.com",
    password: "P@ssword123",
    login: null,

    user: {},
  }),
  validations() {
    return {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
      },
    };
  },
  methods: {
    async submit() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        console.log("Valid");

        const params = {
          userdetails: {
            email: this.email,
            password: this.password,
          },
        };
        try {
          const response = await userApi.login(params);
          this.$toast.success(response.data.message);
          if (response.status == 200) {
            this.$router.push({ path: "/" });
          }
        } catch (error) {
          console.log(error);
          this.$toast.error(error.response.data.error);
        }
      }
    },

    async googleAuth() {
      try {
        window.location.href = "http://localhost:3000/users/auth/google";
        this.$toast.success("Login Successfull");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
