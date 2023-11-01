<template class="mt-7">
  <v-card class="mx-auto" width="1000">
    <v-card-item class="bg-black">
      <v-card-title>
        <span class="text-h3">User Profile</span>
      </v-card-title>
      <v-list-item>
        <template v-slot:prepend>
          <v-avatar size="150">
            <v-img
              :src="
                user.imageurl ||
                'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg'
              "
            ></v-img
          ></v-avatar>
        </template>

        <v-card-actions>
          <followerComponent type="followers" :followerCount="followerCount" @count="addFollowerCount">{{
            followerCount
          }}</followerComponent>
          <v-spacer></v-spacer>
          <followerComponent type="following" :followingCount="followingCount" @count="addFollowingCount">{{
            followingCount
          }}</followerComponent>
          <v-spacer></v-spacer>
          <v-btn icon="mdi-pencil" @click="editMode = !editMode"></v-btn>
        </v-card-actions>
      </v-list-item>
    </v-card-item>
    <v-form ref="form">
      <v-list>
        <v-divider inset></v-divider>

        <v-list-item v-if="!editMode" prepend-icon="mdi-account">{{
          user.username
        }}</v-list-item>
        <v-list-item v-else>
          <v-text-field
            prepend-icon="mdi-account"
            label="username"
            :error-messages="v$.user.username.$errors.map((e) => e.$message)"
            v-model="v$.user.username.$model"
            @input="v$.user.username.$touch"
          ></v-text-field>
        </v-list-item>

        <v-divider v-if="!editMode" inset></v-divider>

        <v-list-item v-if="!editMode" prepend-icon="mdi-information">{{
          user.about
        }}</v-list-item>
        <v-list-item v-else>
          <v-text-field
            prepend-icon="mdi-information"
            label="About"
            v-model="user.about"
          ></v-text-field>
        </v-list-item>

        <v-divider v-if="!editMode" inset></v-divider>

        <v-list-item v-if="!editMode" prepend-icon="mdi-email">{{
          user.email
        }}</v-list-item>

        <v-list-item v-else>
          <v-text-field
            prepend-icon="mdi-email"
            label="E-mail"
            :error-messages="v$.user.email.$errors.map((e) => e.$message)"
            v-model="v$.user.email.$model"
            @input="v$.user.email.$touch"
          ></v-text-field>
        </v-list-item>

        <v-list-item v-if="editMode">
          <v-text-field
            prepend-icon="mdi-camera"
            accept="image/*"
            label="Image Url*"
            :error-messages="v$.user.imageurl.$errors.map((e) => e.$message)"
            v-model="v$.user.imageurl.$model"
            @input="v$.user.imageurl.$touch"
          ></v-text-field>
        </v-list-item>

        <v-row justify="center" v-if="editMode && !verifiedPassword">
          <v-dialog v-model="dialog" persistent width="500">
            <template v-slot:activator="{ props }">
              <v-btn color="black" v-bind="props"> Change Password </v-btn>
            </template>
            <v-card>
              <v-card-title class="text-h5"> Change Password </v-card-title>
              <v-card-text>
                <v-list-item>
                  <v-text-field
                    prepend-icon="mdi-lock"
                    label="Enter old Password"
                    :error-messages="
                      v$.resetPassword.password.$errors.map((e) => e.$message)
                    "
                    v-model="v$.resetPassword.password.$model"
                    @input="v$.resetPassword.password.$touch"
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'"
                    @click:append-inner="visible = !visible"
                  ></v-text-field>
                </v-list-item>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green-darken-1"
                  variant="text"
                  @click="dialog = false"
                >
                  Closs
                </v-btn>
                <v-btn color="green-darken-1" variant="text" @click="verify()">
                  Verify
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>

        <v-list-item v-if="verifiedPassword">
          <v-text-field
            prepend-icon="mdi-lock"
            label="New Password"
            :error-messages="
              v$.resetPassword.newPassword.$errors.map((e) => e.$message)
            "
            v-model="v$.resetPassword.newPassword.$model"
            @input="v$.resetPassword.newPassword.$touch"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            @click:append-inner="visible = !visible"
          ></v-text-field>
        </v-list-item>

        <v-list-item v-if="verifiedPassword">
          <v-text-field
            prepend-icon="mdi-lock"
            label="Confirm Password"
            :error-messages="
              v$.resetPassword.confirmPassword.$errors.map((e) => e.$message)
            "
            v-model="v$.resetPassword.confirmPassword.$model"
            @input="v$.resetPassword.confirmPassword.$touch"
          ></v-text-field>
        </v-list-item>

        <v-btn
          v-if="verifiedPassword"
          class="me-4"
          @click.prevent="updatePassword()"
          :disabled="v$.$invalid"
        >
          Update Password</v-btn
        >

        <v-btn v-if="editMode" class="me-4" @click.prevent="submit()">
          Update
        </v-btn>

        <v-btn v-if="editMode" @click="handleReset()"> clear </v-btn>
      </v-list>
    </v-form>
  </v-card>
</template>

<script>
import userapi from "../../services/users";
import followerComponent from "../../views/users/followerDialog.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, sameAs, url } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  
  data() {
    return {
      editMode: false,
      id: null,
      user: {
        username: "",
        email: "",
        imageurl: "",
        about: "",
      },
      resetPassword: {
        password: "",
        newPassword: "",
        confirmPassword: "",
      },
      followerCount: null,
      followingCount: null,
      verifiedPassword: false,
      dialog: false,
      visible: false,
    };
  },
  validations() {
    return {
      user: {
        username: {
          required,
          minLength: minLength(3),
        },
        email: {
          required,
          email,
        },
        imageurl: {
          url,
        },
      },
      resetPassword: {
        password: {
          required,
          minLength: minLength(8),
        },
        newPassword: {
          required,
          minLength: minLength(8),
        },
        confirmPassword: {
          required,
          sameAs: sameAs(this.resetPassword.newPassword),
        },
      },
    };
  },
  components: {
    followerComponent,
  },
  methods: {
    async addFollowerCount(count) {
      this.followerCount = count;
    },
    async addFollowingCount(count) {
      this.followingCount = count;
    },
    async getUserProfile() {
      try {
        const response = await userapi.getUser();
        console.log(response);
        this.id = response.data.id;
        this.user.username = response.data.username;
        this.user.about = response.data.about;
        this.user.email = response.data.email;
        this.followerCount = response.data.followers;
        this.followingCount = response.data.following;
        this.user.imageurl = response.data.imageurl;
      } catch (error) {
        console.log(error);
        this.$toast.error(error.response.data.error);
      }
    },
    async submit() {
      this.v$.user.$touch();
      if (!this.v$.user.$invalid) {
        console.log("Valid");
        const params = {
          userdata: {
            id: this.id,
            ...this.user,
          },
        };
        try {
          const response = await userapi.updateUser(params);
         
          if (response.status === 200) {
            this.$toast.success('Updated Successfully');
            this.editMode = false;
          this.verifiedPassword = false;
          }
        } catch (error) {
          console.log(error);
          this.$toast.error(error.response.data.error);
        }
      }
    },
    handleReset() {
      this.$refs.form.reset();
      this.v$.$reset();
    },
    async verify() {
      const params = {
        userdata: {
          id: this.id,
          oldPassword: this.resetPassword.password,
          email: this.user.email,
        },
      };
      try {
        const response = await userapi.verifyPassword(params);
        if (response.status === 200) {
          this.dialog = false;
          this.verifiedPassword = true;

        }
      } catch (error) {
        console.log(error);
        this.$toast.error(error.response.data.error);
      }
    },

    async updatePassword() {
      this.v$.resetPassword.$touch();
      if (this.v$.resetPassword.$invalid) {
        return;
      }
      const params = {
        userdata: {
          id: this.id,
          newPassword: this.resetPassword.newPassword,
        },
    };
      try {
        const response = await userapi.updatePassword(params);
        console.log(response);
        this.verifiedPassword = false;
        this.$toast.success('Password Updated Successfully');
      } catch (error) {
        console.log(error);
        this.$toast.error(error.response.data.error);
      }
    },
  },
  created() {
    this.getUserProfile();
  },
};
</script>

<style scoped></style>
