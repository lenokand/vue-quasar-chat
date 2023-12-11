<template>
  <q-page class="flex column q-pt-md">
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
</template>

<script>
import { defineComponent } from "vue";
import loginRegister from "src/components/loginRegister.vue";

export default {
  name: "IndexPage",
  data() {
    return {
      tab: "login",
    };
  },
  components: {
    loginRegister,
    // "login-register": require("components/loginRegister.vue").default,
  },
};
</script>
