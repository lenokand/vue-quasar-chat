<template>
  <q-page class="flex column">
    <q-banner class="bg-grey-5 q-pa-md"> User is offline </q-banner>
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
              <q-btn round color="white" dense flat icon="send" />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      newMessage: "",
      messages: [
        {
          id: 1,
          text: "Hey, hiw are you",
          from: "Jim",
        },
        {
          id: 2,
          text: "Good, thnx",
          from: "me",
        },
        {
          id: 3,
          text: "I'm glad",
          from: "Jim",
        },
      ],
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        this.messages.push({
          text: this.newMessage,
          from: "me",
        });
      }

      this.newMessage = "";
    },
  },
});
</script>
