<template>
  <div>
    <q-form class="q-pa-md">
      <q-input
        color="primary"
        rounded
        outlined
        v-model="newMessage"
        label="Type message here..."
      >
        <template v-slot:prepend>
          <q-icon name="mic" />
        </template>
        <template v-slot:append>
          <q-btn
            icon="send"
            color="primary"
            label="Send"
            rounded
            type="submit"
          />
        </template>
      </q-input>
    </q-form>
  </div>
</template>
<script setup>
import { ref } from "vue";

const newMessage = ref("");
</script>
