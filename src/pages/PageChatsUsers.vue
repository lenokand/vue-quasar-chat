<template>
  <div class="q-pa-md">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Contacts</q-toolbar-title>
    </q-toolbar>

    <q-list separator bordered>
      <q-item
        v-for="chat in chats"
        :key="chat.chatId"
        clickable
        v-ripple       
        :to="{ path: '/chat/'+chat.chatId , params: { id: chat.chatId } }"
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
          {{ console.log(chat) }}
            {{ String(chat.participants.find(participant => participant.userId !== userId).user.firstName).charAt(0).toUpperCase() }}
      
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ chat.participants.find(participant => participant.userId !== userId).user.firstName }}</q-item-label>
          <q-item-label caption lines="1"> {{ chat.participants.find(participant => participant.userId !== userId).user.firstName }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <!-- <q-icon name="chat_bubble" color="green" /> -->
          <q-badge :color="chat.lastActivity ? 'light-green-5' : 'grey-5'">
            {{ chat.lastActivity ? "Online" : "Offline" }}
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
  
  
  data() {
    return {};
  },
  computed: {
    ...mapState(useStore, ["chats", "userId"]),
  },
  methods: {
    ...mapActions(useStore, ["getChats"]),

  },
  mounted() {
    // Call getUsers from the store
    this.getChats();
  },
});
</script>
