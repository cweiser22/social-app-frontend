<template>
  <q-page>
    <div class="col">
      <div class="row row-grow">
        <messages-list v-if="selected" />
        <h1 v-else>Select a conversation</h1>
      </div>
      <div class="actions">
        <chat-actions />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { storeToRefs } from "pinia";
import ChatActions from "src/components/ChatActions.vue";
import MessagesList from "src/components/MessagesList.vue";
import { useConversationStore } from "src/stores/conversation-store";

const { selected } = storeToRefs(useConversationStore());
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;

  height: 100%;
}

.messages {
  flex-grow: 2;
}

.actions {
  background: white;
  position: sticky;
  bottom: 0px;
}

.page {
  display: flex !important;
  flex-direction: column;
}
</style>
