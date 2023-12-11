<template>
  <div class="q-pa-md">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Contacts</q-toolbar-title>
    </q-toolbar>

    <q-list separator bordered>
      <q-item
        v-for="user in users"
        :key="user.id"
        clickable
        v-ripple
        to="/chat"
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ user.name.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
          <q-item-label caption lines="1">{{ user.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <!-- <q-icon name="chat_bubble" color="green" /> -->
          <q-badge :color="user.online ? 'light-green-5' : 'grey-5'">
            {{ user.online ? "Online" : "Offline" }}
          </q-badge>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      users: [
        {
          id: 1,
          name: "Ruddy Jedrzej",
          email: "rjedrzej0@discuz.net",
          online: true,
        },
        {
          id: 2,
          name: "Mallorie Alessandrini",
          email: "malessandrini1@marketwatch.com",
          online: true,
        },
        {
          id: 3,
          name: "Elisabetta Wicklen",
          email: "ewicklen2@microsoft.com",
          online: false,
        },
        {
          id: 4,
          name: "Seka Fawdrey",
          email: "sfawdrey3@wired.com",
          online: true,
        },
      ],
    };
  },
});
</script>
