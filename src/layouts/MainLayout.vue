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
          {{ $route.name }}
        </q-toolbar-title>
        <q-btn
          class="q-pr-lg"
          flat
          dense
          round
          icon="account_circle"
          label="login"
          to="/auth"
        />
        <!-- <div class="flex items-center">
          Quasar v{{ $q.version }}
          <div class="bg-white">
            <img
              alt="Chat logo"
              src="https://www.wyssenavalanche.com/wp-content/uploads/2021/09/cropped-wyssen_logo_header-1.png"
              class="q-pa-xs q-pb-none"
            />
          </div>
        </div> -->
      </q-toolbar>
    </q-header>

    <!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

export default defineComponent({
  name: "MainLayout",

  // computed:{
  //   title(){
  //     return this.$route.name
  //   }
  // },

  components: {
    // EssentialLink,
  },

  setup() {
    // const leftDrawerOpen = ref(false);

    return {
      // essentialLinks: linksList,
      // leftDrawerOpen,
      // toggleLeftDrawer() {
      //   leftDrawerOpen.value = !leftDrawerOpen.value;
      // },
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
});
</script>
