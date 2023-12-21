<template>
<div class="q-pa-md">
    <q-parallax :height="200" :speed="0.5">
      <template v-slot:media>
        <img src="https://api.time.com/wp-content/uploads/2022/11/GettyImages-1358149692.jpg">
      </template>

      <h1 class="text-white">Chat</h1>
    </q-parallax>
  </div>
  <q-page class="flex column q-pt-md" v-if="!isAuthenticated">
    <q-tabs
      v-model="tab"
      dense
      align="justify"
      class="bg-primary text-white shadow-2"
      :breakpoint="0"
    >
      <q-tab name="login" icon="login" label="login" />
      <q-tab name="registration" icon="person_add" label="registration" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated class="flex justify-center">
      <q-tab-panel name="login">
        <loginRegister :tab="tab" />
      </q-tab-panel>
      <q-tab-panel name="registration">
        <loginRegister :tab="tab" />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
  <q-page class="flex column q-pt-md" v-if="isAuthenticated">
    <q-tabs
      v-model="tab2"
      dense
      align="justify"
      class="bg-primary text-white shadow-2"
      :breakpoint="0"
    >
      <q-tab name="logout" :label="name? `Hi, ${name}! What do you whant to do?`: null" />
      
    </q-tabs>
    <q-tab-panels v-model="tab2" animated class="flex justify-center">
      <q-tab-panel name="logout">
        <loginRegister :tab="tab2" />
        
      </q-tab-panel>
     
    </q-tab-panels>
 
  </q-page>
  
</template>

<script>
import { mapState } from "pinia";
import loginRegister from "src/components/loginRegister.vue";

import { useStore } from "../stores/store";

export default {
  name: "IndexPage",
  data() {
    return {
      tab: "login",
      tab2: "logout",
    };
  },
  computed: {
    ...mapState(useStore, ["name", "isAuthenticated", "errorMsg"]),
  },
  components: {
    loginRegister,
  },
  methods:{
    logout(){
      isAuthenticated === true ? this.tab = "logout" : null;
      // console.log(this.tab)
    }

  }
};
</script>
