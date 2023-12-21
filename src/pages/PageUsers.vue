<template>
  <div class="q-pa-md">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Contacts</q-toolbar-title>
    </q-toolbar>

    <q-list separator bordered>
      <q-item
        v-for="user in users"
        :key="user.authUserId"
        clickable
        v-ripple       
        @click="createAndGoToChat(user.authUserId)"
        
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ String(user.firstName).charAt(0).toUpperCase() }}
      
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.firstName }}</q-item-label>
          <q-item-label caption lines="1"> {{ user.lastName }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <!-- <q-icon name="chat_bubble" color="green" /> -->
          <q-badge :color="user.lastActivity ? 'light-green-5' : 'grey-5'">
            {{ user.lastActivity ? "Online" : "Offline" }}
          </q-badge>
        </q-item-section>
      </q-item>
    </q-list>
<!-- {{ getUsers }} -->
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useStore } from "../stores/store";
import { defineComponent } from "vue";
import { mapActions } from "pinia";

export default defineComponent({
  name: "IndexPage",
  
  data() {
    return {};
  },
  computed: {
    ...mapState(useStore, ["users"]),
  },

  methods: {    
    ...mapActions(useStore, ["getUsers", "createChat"]),

    async createAndGoToChat(authUserId){
      const chatId = await this.createChat(authUserId);
      
      this.$router.push({ path: '/chat/'+ chatId , params: { id: chatId }})
    }
  },
  mounted() {
    // Call getUsers from the store
    this.getUsers();
  },
});
</script>
