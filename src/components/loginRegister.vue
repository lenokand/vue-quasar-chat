<template>
  <div class="q-mx-auto q-pt-lg" style="max-width: 600px">
   
    <q-form class="flex column align-center" @submit.prevent="submitForm" >
      <q-input
        class="q-mb-md"
        v-if="tab == 'registration'"
        outlined
        v-model="formData.firstName"
        label="First name"
      />
      <q-input
        class="q-mb-md"
        v-if="tab == 'registration'"
        outlined
        v-model="formData.lastName"
        label="Last name"
      />
      <q-input
        class="q-mb-md"
        v-if="tab !== 'logout'"
        outlined
        v-model="formData.username"
        type="text"
        label="Username"
      />
      <q-input
        class="q-mb-md"
        v-if="tab !== 'logout'"
        outlined
        v-model="formData.password"
        type="password"
        label="Password"
      />
      <q-btn unelevated rounded color="primary" type="submit" :label="tab" />
      <q-btn class="q-mt-xl" unelevated rounded color="primary"  label="Go chat" to="/chats" v-if="tab=='logout'"/>
      <q-btn class="q-mt-xl" unelevated rounded color="primary"  label="Create a new chat" to="/users" v-if="tab=='logout'"/>
      <div class="q-pa-md text-deep-orange-8 text-weight-bold" >
      {{ errorMsg }}
      </div>
    </q-form>
  </div>
</template>

<script>
import { useStore } from "../stores/store";
import { mapActions } from "pinia";
import { mapState } from "pinia";
export default {
  props: ["tab"],
  data() {
    return {
      formData: {
        firstName: "",
        username: "",
        password: "",
        lastName:""
        
      },
    };
  },
  computed: {
    ...mapState(useStore, ["isAuthenticated", "errorMsg", "name"]),
  },
  methods: {
    ...mapActions(useStore, [ "registerdUser", "loginUser", "logoutUser" ]),
    submitForm() {
      
      if (this.tab == "login") {
        
        const loginData = {
          username: this.formData.username,
          password : this.formData.password
        }
        console.log("personalproject", {
          username: this.formData.username,
          password : this.formData.password
        } )
        this.loginUser(loginData)

        console.log("login", loginData);
        this.formData.firstName ="";
        this.formData.lastName ="";
        this.formData.username ="";
        this.formData.password ="";

      } else if (this.tab == "registration") {
        console.log("registration", this.formData);

        this.registerdUser(this.formData)

        this.formData.firstName ="";
        this.formData.lastName ="";
        this.formData.username ="";
        this.formData.password ="";
      }else {
        this.logoutUser()


      }
    },
  },
};
</script>
