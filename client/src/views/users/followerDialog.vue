<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable width="auto">
      <template v-slot:activator="{ props }">
        <v-row align="center" justify="center">
            <v-col cols="auto">
              <v-btn
          v-bind="props"
          :icon="
            type === 'followers'
              ? 'mdi-account-heart'
              : 'mdi-account-group-outline'
          "
          @click="getList()"
        >
        </v-btn><slot></slot>
            </v-col>
          </v-row>
      </template>

      <v-card>
        <v-card-title>{{
          type === "followers" ? "followers" : "following"
        }}</v-card-title>
        <v-divider></v-divider>

        <v-card-text v-if="isFollowerEmpty">
            No followers
        </v-card-text>
        <v-card-text v-else-if="isFollowingEmpty">
            No following
        </v-card-text>
        <v-list v-for="item in items" :key="item.id" v-else>
          <v-list-item>
            <template v-slot:prepend>
              <v-list-item :to="'/recipe/user/' + item.id" class="px-0"
                :prepend-avatar="
                  item.imageurl || 'https://picsum.photos/700?image=996'
                "
              >
                <template v-slot:title>
                  <span>{{ item.username }}</span>
                </template>
              </v-list-item>
            </template>

            <template v-slot:append>
              <v-icon
                icon="mdi-delete"
                v-if="type === 'followers'"
                style="cursor: pointer"
                @click="removeFollower(item.id)"
              ></v-icon>
              <v-btn variant="flat" v-else @click="unfollow(item.id)">Unfollow</v-btn></template
            >
          </v-list-item>

          <v-divider inset></v-divider>
        </v-list>

        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false" >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import userapi from "../../services/users";
export default {
  props: ["type","followerCount","followingCount"],
  data() {
    return {
      dialogm1: "",
      dialog: false,
      items: [],
      followers: [],
      following: [],

      isFollowerEmpty:false,
      isFollowingEmpty:false
    };
  },
  methods: {
    async getList() {
     
      if (this.type === "followers") {
    
        if(this.followerCount!=='0'){

          try{
            const response = await userapi.getFollowers();
          console.log(response);
  
          this.items = response.data;
          
          }
          catch(error){
            this.$toast.error(error.response.data.error);
          }
        }
        else{
           this.isFollowerEmpty=true
        }

      } else {
        if(this.followingCount!=='0'){

          try{
            const response = await userapi.getFollowing();
          console.log(response);
          this.items = response.data;
          }
          catch(error){
            this.$toast.error(error.response.data.error);
          }
        }else{
          this.isFollowingEmpty=true
        }
  
      }
    },

    async removeFollower(id){
        try{
            console.log(id)
            
            const response=await userapi.removeFollower(id)
            console.log(response)
            this.items=this.items.filter((item)=>item.id!==id)
            this.$toast.success(response.data);
            this.$emit('count',this.items.length)
        }
        catch(error){
          this.$toast.error(error.response.data.error);
        }
    },
    async unfollow(id){
        try{
          console.log(id)
            const response=await userapi.unfollow(id)
            this.$toast.success(response.data);
            this.items=this.items.filter((item)=>item.id!==id)
            this.$emit('count',this.items.length)
        }
        catch(error){
          this.$toast.error(error.response.data.error);
        }
    }
  },
};
</script>
