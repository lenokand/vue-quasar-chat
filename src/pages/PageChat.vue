<template>
  <q-page class="flex column">
    <q-banner class="bg-grey-5 q-pa-md"> User is offline {{ $route.params.id }} {{ messages2.messages }}</q-banner>
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="message in messages"
        :key="message.id"
        :name="message.from"
        :text="[message.text]"
        :sent="message.from === 'me' ? false : true"
      />
    </div>
    <q-footer class="q-pa-lg" elevated>
      <q-toolbar class="">
        <q-form class="full-width" @submit.prevent="sendMessage">
          <q-input
            bg-color="white"
            rounded
            outlined
            class="full-width"
            v-model="newMessage"
            label="Message"
            counter
            :dense="dense"
          >
            <template v-slot:append>
              <q-icon
                v-if="newMessage !== ''"
                name="close"
                @click="newMessage = ''"
                class="cursor-pointer"
              />
            </template>

            <template v-slot:after>
              <q-btn round color="white" @click="sendMessageInChatById($route.params.id, this.newMessage)" dense flat icon="send" />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { mapState } from "pinia";
import { useStore } from "../stores/store";
import { mapActions } from "pinia";
export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      newMessage: "",
    
    };
  },
  computed: {
    ...mapState(useStore, ["messages", "messages2"]),
  },
  methods: {
    ...mapActions(useStore, [ {sendMessageInStore: "sendMessage"}, "createChat", "getChatById", "sendMessageInChatById"]),

    sendMessage() {
      this.sendMessageInStore(this.newMessage);
      this.newMessage = "";
    },
  },
  mounted() {
    // Call getUsers from the store
    this.createChat(this.$route.params.id);
    this.getChatById(this.$route.params.id)
  },
});
</script>
