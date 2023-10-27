<template>
  <div class="my-12">
    <v-form ref="form">
      <v-card
        class="mx-auto pa-12 pb-8 my-12"
        elevation="8"
        max-width="500"
        rounded="lg"
      >
        <v-row>
          <v-col cols="6" sm="6" md="6">
            <div class="text-subtitle-1 text-medium-emphasis">FirstName</div>

            <v-text-field
              density="compact"
              placeholder="FirstName"
              :error-messages="v$.firstName.$errors.map((e) => e.$message)"
              variant="outlined"
              v-model="v$.firstName.$model"
              @input="v$.firstName.$touch"
            ></v-text-field>
          </v-col>

          <v-col cols="6" sm="6" md="6">
            <div class="text-subtitle-1 text-medium-emphasis">LastName</div>

            <v-text-field
              density="compact"
              placeholder="LastName"
              variant="outlined"
              v-model="lastName"
            ></v-text-field>
          </v-col>

          <v-col cols="6" sm="6" md="6" class="pt-0">
            <div class="text-subtitle-1 text-medium-emphasis">Username</div>

            <v-text-field
              density="compact"
              placeholder="Username"
              :error-messages="v$.userName.$errors.map((e) => e.$message)"
              variant="outlined"
              v-model="v$.userName.$model"
              @input="v$.userName.$touch"
            ></v-text-field>
          </v-col>

          <v-col cols="6" sm="6" md="6" class="pt-0">
            <div class="text-subtitle-1 text-medium-emphasis">About</div>

            <v-text-field
              density="compact"
              placeholder="About"
              variant="outlined"
              v-model="about"
            ></v-text-field>
          </v-col>
        </v-row>

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

        <div class="text-subtitle-1 text-medium-emphasis">Confirm Password</div>

        <v-text-field
          density="compact"
          placeholder="Comfirm Password"
          :error-messages="v$.confirmPassword.$errors.map((e) => e.$message)"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          v-model="confirmPassword"
          @input="v$.confirmPassword.$touch"
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
          Sign Up
        </v-btn>

        <v-card-text class="text-center">
          <v-btn class="text-black text-decoration-none" to="/login">
            Log In now
            <v-icon icon="mdi-chevron-right"></v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
import userApi from "../../services/users"

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data: () => ({
    visible: false,

    firstName: "",
    lastName: "",
    userName: "",
    about: "",
    email: "",
    password: "",
    confirmPassword: "",
  }),
  validations() {
    return {
      firstName: {
        minLength: minLength(3),
      },

      userName: {
        required,
        minLength: minLength(3),
      },

      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
      },
      confirmPassword: {
        required,
        sameAs: sameAs(this.password),
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
            firstname: this.firstName,
            lastname: this.lastName,
            username:this.userName,
            email: this.email,
            password: this.password,
            about: this.about,
            imageurl: this.imageurl,
          },

        };
        console.log(params)
        try {
          const response = await userApi.registerUser(params);

          if (response.status === 200) {
            await this.$store.commit("auth/setLogin");
            this.login = this.$store.getters["auth/getisLogin"];
            // localStorage.setItem('isLogin',true)
            this.$store.commit({
              type: "auth/setUser",
              value: response.data.user.id,
            });
            this.user = this.$store.getters["auth/getUserId"];

            this.$router.push({ path: "/" });
          }
        } catch (error) {
          console.log(error);

        }
      }
    },
  },
};
</script>
