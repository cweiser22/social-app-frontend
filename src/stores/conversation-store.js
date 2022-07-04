import { defineStore } from "pinia";
import { api, generateAuthHeader } from "src/boot/axios";

export const useConversationStore = defineStore("conversations", {
  id: "conversations",
  state: () => ({
    // data fetching
    conversations: [],
    conversationLoading: false,
    conversationsError: false,

    // the currently selected conversation
    selected: null,

    // hold the messages of the currently active convo
    activeMessages: [],
    activeMessagesError: null,
    activeMessagesLoading: false,

    // websocket connection used to pull in new messages
    connection: null,
    connected: false,
  }),
  actions: {
    fetchConversations() {
      this.error = null;
      this.loading = true;
      api
        .get("/chat/conversations/", {
          headers: {
            Authorization: generateAuthHeader(),
          },
        })
        .then((response) => {
          this.conversations = response.data.results;
          this.loading = false;
        })
        .catch((e) => {
          this.error = e.toString();
          this.loading = false;
        });
    },
    setupConnection() {
      this.connection = new WebSocket(
        "ws://localhost:8000/ws/inbox/?token=" +
          localStorage.getItem("access_token")
      );

      this.connection.onmessage = function (event) {
        const store = useConversationStore();
        let message = JSON.parse(event.data);
        /*let index = -1;
        for (let i = 0; i < store.conversations.length; i++) {
          if (store.conversations[i].id == message.conversation_id) {
            index = i;
          }
        }*/
        const index = store.conversations.findIndex(
          (c, i) => c.id == message.conversation_id
        );
        console.log("index: " + index);
        store.conversations[index].last_message = message;
        store.conversations.sort(
          (a, b) =>
            new Date(b.last_message.created_at) -
            new Date(a.last_message.created_at)
        );
        store.activeMessages.push(message);
      };

      this.connection.onopen = function (event) {
        console.log("Connection established!");
        useConversationStore().connected = true;
      };
      this.connection.onclose = function (event) {
        console.log("Connection lost!");
        useConversationStore().connected = false;
      };
    },
    handleSelect(conversation) {
      api
        .get(
          "/chat/messages?conversationId=" + conversation.id + "&page=" + 1,
          {
            headers: {
              Authorization: generateAuthHeader(),
            },
          }
        )
        .then((res) => {
          if (this.activeMessages.length == 0) {
            const results = res.data.results.reverse();
            this.activeMessages = results;
            console.log("initial");
          } else {
            res.data.reverse();
            this.activeMessages.push(...res.data);
          }
        });
      this.selected = conversation;
      this.activeMessagesLoading = true;
    },
    fetchMessages(conversation, page) {
      console.log("c: " + conversation);
      api
        .get(
          "/chat/messages?conversationId=" + conversation.id + "&page=" + page,
          {
            headers: {
              Authorization: generateAuthHeader(),
            },
          }
        )
        .then((res) => {
          if (this.activeMessages.length == 0) {
            console.log("initial laod");
            const results = res.data.results.reverse();
            this.activeMessages = results;
          } else {
            res.data.reverse();
            this.activeMessages.push(...res.data);
          }
          console.log("then");
          console.log(this.activeMessages);
        })
        .catch((e) => {
          this.activeMessagesError = e.toString();
        })
        .finally(() => (this.activeMessagesLoading = false));
    },
    sendMessage(message) {
      this.connection.send(JSON.stringify(message));
    },
  },
});
