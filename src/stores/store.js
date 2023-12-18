import { defineStore } from "pinia";

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
      state.messages.filter((message) => message.from === "me").length,
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
          this.name = user.username
          console.log('Login successful. Token:', token);
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
            'Authorization': "bearer " + this.token,
          },});       
        if (response.ok) {   
          this.users = await response.json();
       

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
            'Authorization': "bearer " + this.token,
          },
          body: JSON.stringify({ recipient: recipientId }),
        });

        if (!response.ok) {
          throw new Error('Chat creation failed');
        }
        console.log('Chat created successfully');
      } catch (error) {
        console.error('Error creating chat', error);
      }

    },
    async getChatById(recipientId ) {
 
      try {
        const response = await fetch(`http://localhost:3000/chats/{$recipientId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "bearer " + this.token,
          },
          body: JSON.stringify({ recipient: recipientId }),
        });

        if (!response.ok) {
          throw new Error('Chat creation failed');
        } else {
          this.messages2 = await response.json()
          console.log("getChatById")
          console.log(await response.json())
        }
        console.log('Chat created successfully');
      } catch (error) {
        console.error('Error creating chat', error);
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
