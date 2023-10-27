<template class="mt-7">
  <v-card class="mx-auto" width="1000">
    <v-card-item class="bg-black">
      <v-card-title>
        <span class="text-h3">User Profile</span>
      </v-card-title>
      <v-list-item>
        <template v-slot:prepend>
          <v-avatar size="150">
            <v-img :src="imageurl || 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg'"></v-img
          ></v-avatar>
        </template>

        <v-card-actions>
          <followerComponent type="followers" @count="addFollowerCount">{{ followerCount }}</followerComponent>
          <v-spacer></v-spacer>
          <followerComponent type="following" @count="addFollowingCount">{{ followingCount }}</followerComponent>
          <v-spacer></v-spacer>
          <v-btn icon="mdi-pencil" @click="editMode = !editMode"></v-btn>
        </v-card-actions>
      </v-list-item>
    </v-card-item>
    <v-form ref="form">
    <v-list>
      <v-divider inset></v-divider>

      <v-list-item v-if="!editMode" prepend-icon="mdi-account">{{
        username
      }}</v-list-item>
      <v-list-item v-else>
        <v-text-field
          prepend-icon="mdi-account"
          label="username"
          :error-messages="v$.username.$errors.map((e) => e.$message)"
          v-model="v$.username.$model"
              @input="v$.username.$touch"
        ></v-text-field>
      </v-list-item>

      <v-divider v-if="!editMode" inset></v-divider>

      <v-list-item v-if="!editMode" prepend-icon="mdi-information">{{
        about
      }}</v-list-item>
      <v-list-item v-else>
        <v-text-field
          prepend-icon="mdi-information"
          label="About"
          v-model="about"

        ></v-text-field>
      </v-list-item>

      <v-divider v-if="!editMode" inset></v-divider>

      <v-list-item v-if="!editMode" prepend-icon="mdi-email">{{
        email
      }}</v-list-item>

      <v-list-item v-else>
        <v-text-field
          prepend-icon="mdi-email"
          label="E-mail"
          
          :error-messages="v$.email.$errors.map((e) => e.$message)"
          v-model="v$.email.$model"
              @input="v$.email.$touch"
        ></v-text-field>
      </v-list-item>

      <v-list-item v-if="editMode">
        <v-text-field
          prepend-icon="mdi-lock"
          label="New Password"
          :error-messages="v$.password.$errors.map((e) => e.$message)"
          v-model="v$.password.$model"
              @input="v$.password.$touch"
        ></v-text-field>
      </v-list-item>

      <v-list-item v-if="editMode">
        <v-text-field
          prepend-icon="mdi-lock"
          label="Confirm Password"
          :error-messages="v$.confirmPassword.$errors.map((e) => e.$message)"
          v-model="v$.confirmPassword.$model"
              @input="v$.confirmPassword.$touch"
        ></v-text-field>
      </v-list-item>

      <v-btn v-if="editMode" class="me-4" type="submit" @click.prevent="submit()"
      :disabled="v$.$invalid"> Update </v-btn>

      <v-btn v-if="editMode" @click="handleReset()"> clear </v-btn>
    </v-list>
  </v-form>
  </v-card>
</template>

<script>
import userapi from "../../services/users";
import followerComponent from "../../views/users/followerDialog.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email,minLength, sameAs } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      editMode: false,
      username: "",
      about: "",
      password: "",
      confirmPassword: "",
      email: "",
      followerCount: null,
      followingCount: null,
      imageurl:""
    };
  },
  validations() {
    return {
  
      username: {
        required,
        minLength: minLength(3)
      },

      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8)
      },
      confirmPassword: {
        required,
        sameAs: sameAs(this.password)
      },
    };
  },
  components: {
    followerComponent,
  },
  methods: {
    async addFollowerCount(count){
      console.log(count)
         this.followerCount=count
    },
    async addFollowingCount(count){
      console.log(count)
        this.followingCount=count
    },
    async getUserProfile() {
      try {
        const response = await userapi.getUser();
        console.log(response);
        this.username = response.data.username;
        this.about = response.data.about;
        this.email = response.data.email;
        this.followerCount = response.data.followers;
        this.followingCount = response.data.following;
        this.imageurl=response.data.imageurl
      } catch (error) {
        console.log(error);
      }
    },
    submit() {
        this.v$.$touch()
        if(!this.v$.$invalid){
            console.log('Valid')
        }
    },
    handleReset(){
      this.$refs.form.reset()
         this.v$.$reset()
    }
  },
  created() {
    this.getUserProfile();
  },
};
</script>

<style scoped></style>
