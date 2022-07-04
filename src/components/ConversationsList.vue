<template>
  <q-list>
    <q-item-label header> Conversations </q-item-label>
    <div v-if="!conversationLoading">
      <q-item
        clickable
        class="q-my-sm"
        v-for="conversation in conversations"
        @click="handleSelect(conversation)"
        :active="selected ? selected.id === conversation.id : false"
        v-bind:key="conversation.id"
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white"> A </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>@testman123</q-item-label>
          <q-item-label caption lines="1">{{
            conversation.last_message ? conversation.last_message.content : ""
          }}</q-item-label>
        </q-item-section>
      </q-item>
    </div>
    <q-circular-progress v-else />
  </q-list>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useConversationStore } from "src/stores/conversation-store";
import { onMounted, ref } from "vue";

const { conversations, conversationsError, conversationLoading, selected } =
  storeToRefs(useConversationStore());

const { fetchConversations, handleSelect } = useConversationStore();

onMounted(() => {
  //conversations;
  fetchConversations();
  //console.log(conversationStore.conversations);
  //conversations.value = conversationStore.conversations;
});

function handleClick(c) {
  selected.value = c;
}
</script>
<style scoped>
.active-conversation {
  background: lightgray;
}
</style>
