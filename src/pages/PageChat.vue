<template>
  <q-page class="flex column">
    <!-- <q-banner class="bg-grey-5 q-pa-md"> User is offline {{ userId }} </q-banner> -->
    <q-scroll-area style="height: 510px;" class="dialog">
      <div  class="q-pa-md column reverse col justify-end  no-wrap" style=" overflow-y: auto;">
        <!-- <q-scroll-area style="max-height: 400px;" class=" fill"> -->
          <q-chat-message
            v-for="message in messages2"
            
            :key="message.messageId"
            :name="message.sender.firstName"
            :text="[message.message]"
            :sent="message.senderId === userId ? false : true"
          />
          <!-- :text="convertEmojis(message.message)" -->

        <!-- </q-scroll-area> -->
      </div>
    </q-scroll-area>
    <q-footer class="q-pa-lg" elevated>
      <q-toolbar class="flex">
        <q-form class="full-width row no-wrap	items-start" @submit.prevent="sendMessage">
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

            
          </q-input>
          <q-btn round color="white"  size="24px"  dense flat icon="send"  type="submit" />

        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
// import twemoji from 'twemoji';

import { defineComponent } from "vue";
import { mapState } from "pinia";
import { useStore } from "../stores/store";
import { mapActions } from "pinia";
export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      newMessage: "",
      chatId: 0,
      chatInterval : null
    };
  },
  computed: {
    ...mapState(useStore, ["messages", "messages2", "userId"]),
  },
  methods: {
    ...mapActions(useStore, [  "getChatById", "sendMessageInChatById"]),

    async sendMessage() {
      if(this.newMessage ==""){
        return 
      }

      await this.sendMessageInChatById(this.$route.params.id, this.newMessage)
      this.newMessage = "";
      await this.getChatById(this.$route.params.id)
      this.scrollToBottom();
    },
    // Function to scroll to the bottom of the message container
     scrollToBottom() {
        const messageContainer = document.querySelector('.dialog .q-scrollarea__container');
        messageContainer.scrollTop = messageContainer.scrollHeight;
      },
      // convertEmojis(message) {
      // Use Twemoji to convert emoji shortcodes to images
    //   return twemoji.parse(message);
    // },
  },
  async mounted() {
    // Call getUsers from the store
    // this.chatId = await this.createChat(this.$route.params.id);
   await this.getChatById(this.$route.params.id);
    this.scrollToBottom();
    const chatInterval = setInterval(()=>{
      this.getChatById(this.$route.params.id)
      
    }, 9000);
   
  },
  beforeUnmount() {
  // Clear the interval before the component is destroyed
    clearInterval(chatInterval);
  },  
});
</script>
<style scoped>
.q-field__counter{
  position: absolute;
    top: 0;
    right: 0;
}
</style>