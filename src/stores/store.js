import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

export const useStore = defineStore("storeId", {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      token:'',
      count: 0,
      name: "",
      isAuthenticated: false,
      errorMsg:"",
      chats:[],
      userId: 0,
      users:[{}],
      users2: [
        {
          id: 1,
          name: "Ruddy2 Jedrzej",
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
      messages2:[],
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
  getters: {
    firstName: (state) => state.firstName,
    fullName: (state) => `${state.firstName} ${state.lastName}`,
    loggedIn: (state) => state.userId !== null,
    // combine with some state from other modules
    fullUserDetails: (state, getters, rootState, rootGetters) => {
      return {
        ...state,
        fullName: getters.fullName,
        // read the state from another module named `auth`
        ...rootState.auth.preferences,
        // read a getter from a namespaced module called `email` nested under `auth`
        ...rootGetters["auth/email"].details,
      };
    },

    messagesFromMeCount: (state) =>
      state.messages2.filter((message) => message.from === state.userId).length,
  },
  actions: {
    async registerdUser(user) {
      // const user = {...user}
      console.log(JSON.stringify(user) )
      
      try {
        this.errorMsg = ""
        const response = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user) 
        });
        if (response.ok) {
          console.log('User registered successfully!');
          this.errorMsg ='User registered successfully!'
        } else {
          this.errorMsg ='Registration failed.'
          console.error('Registration failed.');
        }
      } catch (error) {
        console.error('Error during registration:', error);
        this.errorMsg = 'Error during registration:' + error;
      }
    },
    async loginUser(user) {
      
      try {
        this.errorMsg = "";
        const response = await fetch('http://localhost:3000/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user) 
        });       
        if (response.ok) {   
          const data = await response.json();
          const token = data.token;    
          this.token = token;
          
          const decodedToken = jwtDecode(token);
          if (decodedToken) {
            const userId = decodedToken.sub; // Accessing the 'sub' claim from the decoded token
            // You can use userId as needed, e.g., assigning it to this.userId
            this.userId = userId;
            console.log(this.userId)
          } else {
            // Handle the case where decoding fails or token doesn't contain the expected information
            console.error('Failed to decode token or token does not contain the "sub" claim.');
          }
          // this.userId = user.sub
          this.name = user.username
          console.log('Login successful. Token:', token, this.userId);
          this.errorMsg = 'Login successful.'

          localStorage.setItem("token", token);
          this.isAuthenticated = true;

        } else if (response.status === 401) {
            console.error('Unauthorized - Invalid credentials.');
            this.errorMsg = 'Unauthorized - Invalid credentials. 401'
          } else {
            console.error('Login failed. Server returned:', response.status, response.statusText);
            this.errorMsg = 'Login failed. Server returned:', response.status, response.statusText
          }
      } catch (error) {
        console.error('Error during login:', error);
        this.errorMsg ='Error during login:' + error;
      }
    },
    logoutUser(){
      localStorage.removeItem("token");
      this.name = "";
      this.isAuthenticated = false;
    },
    async getUsers() {
      
      try {
        const response = await fetch('http://localhost:3000/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "bearer " + (this.token ? this.token : localStorage.getItem("token")),
          },});       
        if (response.ok) {   
          this.users = await response.json();
          console.log(this.users)

          } else {
            console.error('Login failed. Server returned:', response.status, response.statusText);
          }
      } catch (error) {
        console.error('Error during login:', error);
      }
    },
    async getChats() {
  
      try {
        const response = await fetch('http://localhost:3000/chats', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "bearer " + (this.token ? this.token : localStorage.getItem("token")),
          },});       
        if (response.ok) {   
          this.chats = await response.json();       

          } else {
            console.error('Login failed. Server returned:', response.status, response.statusText);
          }
      } catch (error) {
        console.error('Error during login:', error);
      }
    },

    async createChat(recipientId ) {
      console.log("createChat", recipientId)
      try {
        const response = await fetch('http://localhost:3000/chats', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "bearer " + (this.token ? this.token : localStorage.getItem("token")),
          },
          body: JSON.stringify({ recipient: recipientId }),
        });

        if (!response.ok) {
          throw new Error('Chat creation failed');
        }

        const chatId = (await response.json()).chatId;
        console.log('Chat created successfully');

        return chatId;
      } catch (error) {
        console.error('Error creating chat', error);
      }

    },
    async getChatById(recipientId ) {
 
      try {
        const response = await fetch(`http://localhost:3000/chats/${recipientId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "bearer " + (this.token ? this.token : localStorage.getItem("token")),
          }
        });

        if (!response.ok) {
          throw new Error('getChatById failed');
        } else {
          const tempMessages = await response.json()
          this.messages2 = tempMessages.messages
        }
        console.log('Chat fetch successfully');
      } catch (error) {
        console.error('Error fetching chat', error);
      }

    },
    async sendMessageInChatById(chatId, message ) {
      console.log(message)
      try {
        const response = await fetch(`http://localhost:3000/chats/${chatId}/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "bearer " + (this.token ? this.token : localStorage.getItem("token")),
          },
          body: JSON.stringify({ 
          message: message
         }),
        });
        
        if (!response.ok) {
          throw new Error('Chat send failed');
        } else {
          // console.log(await response)
          console.log("sendMessageInChatById")
        }
        console.log('Chat send successfully');
      } catch (error) {
        console.error('Error sending chat', error);
      }

    },



    sendMessage(newMessage) {
      if (newMessage.trim() !== "") {
        this.messages.push({
          text: newMessage,
          from: "me",
        });
      }
    },
  },
});
