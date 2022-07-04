<template>
  <div class="q-pa-md w-full">
    <q-infinite-scroll ref="scrollTargetRef" reverse @load="onLoad">
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner color="primary" name="dots" size="40px" />
        </div>
      </template>

      <q-chat-message
        v-for="(message, index) in activeMessages"
        :key="index"
        :text="[message.content]"
        :sent="message.sender.pk == user.pk"
      />
    </q-infinite-scroll>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "src/stores/auth-store";
import { useConversationStore } from "src/stores/conversation-store";
import { ref } from "vue";

const { activeMessages, selected } = storeToRefs(useConversationStore());
const { fetchMessages } = useConversationStore();
const { user } = storeToRefs(useAuthStore());

function onLoad(index, done) {
  fetchMessages(selected.value, index);
  done();
}
</script>
