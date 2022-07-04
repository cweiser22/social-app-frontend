<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Chat App </q-toolbar-title>

        <div v-if="connected">Connected!</div>
        <div v-else>No Connection</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <conversations-list />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { storeToRefs } from "pinia";
import ConversationsList from "src/components/ConversationsList.vue";
import { useConversationStore } from "src/stores/conversation-store";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: { ConversationsList },

  setup() {
    const leftDrawerOpen = ref(false);
    const { connection, connected } = storeToRefs(useConversationStore());
    const conversationsStore = useConversationStore();
    const { setupConnection } = conversationsStore;

    onMounted(() => setupConnection());

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      connection,
      connected,
    };
  },
});
</script>
