<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          class="hidden"
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-btn
          v-if="$route.path !== '/'"
          flat
          dense
          round
          icon="arrow_back"
          label="Back"
          @click="goBack"
        />

        <q-toolbar-title>
          {{ $route.name + " -- I sent " + messagesFromMeCount + " messages" }}
        </q-toolbar-title>

        <q-btn
          class="q-pr-lg"
          flat
          dense
          round
          icon="account_circle"
          :label="name == ''?  'login': name"
          to="/"
        />
      
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";

import { mapState } from "pinia";
import { useStore } from "src/stores/store";




export default defineComponent({
  name: "MainLayout",

  computed: {
    ...mapState(useStore, ["messagesFromMeCount", "name"]),
  },

  setup() {

    return {

    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
});
</script>
