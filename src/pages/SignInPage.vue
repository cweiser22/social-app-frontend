<template>
  <q-page class="flex flex-center">
    <sign-in-form />
  </q-page>
</template>
<script>
import SignInFormVue from "src/components/SignInForm.vue";
import SignInForm from "src/components/SignInForm.vue";

export default {
  setup() {},
  components: [SignInFormVue],
  components: { SignInForm },
};
</script>
