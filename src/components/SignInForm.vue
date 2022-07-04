<template>
  <q-card class="form-container q-pa-xl">
    <q-form>
      <q-input
        outlined
        rounded
        v-model="username"
        label="Username"
        class="q-pb-md"
      />

      <q-input
        rounded
        outlined
        type="password"
        v-model="password"
        class="q-pb-md"
        label="Password"
      />
    </q-form>
    <q-btn
      :loading="loading"
      class="w-full"
      unelevated
      rounded
      color="primary"
      @click="onSubmit()"
      label="Sign In"
    />
  </q-card>
</template>
<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useAuthStore } from "stores/auth-store";
import { useRouter } from "vue-router";

export default {
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const username = ref(null);
    const password = ref(null);
    const loading = ref(false);
    const error = ref(null);

    return {
      username,
      password,
      loading,
      onSubmit() {
        loading.value = true;
        const authStore = useAuthStore();
        return authStore
          .login(username.value, password.value)
          .then(() => {
            loading.value = false;
            console.log("pushing");
            router.push("/");
          })
          .catch((e) => {
            error.value = e.toString();
            loading.value = false;
          });

        console.log("clicked");
        loading.value = true;
        setTimeout(() => {
          console.log("done");
          loading.value = false;
        }, 2000);
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.form-container {
  margin: auto;
  width: 30%;
}
</style>
