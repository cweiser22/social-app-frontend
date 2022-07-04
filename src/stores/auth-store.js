import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import {} from "src/router";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    returnUrl: null,
  }),
  actions: {
    async login(username, password) {
      try {
        const loginResponse = (
          await api.post(
            `/auth/login/`,
            {
              username,
              password,
            },
            { "Content-Type": "application/json" }
          )
        ).data;

        console.log(loginResponse.user);

        this.$state.user = loginResponse.user;

        // store user details and jwt in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(this.$state.user));

        localStorage.setItem("access_token", loginResponse.access_token);
        localStorage.setItem("refresh_token", loginResponse.refresh_token);
      } catch (e) {
        console.log(e.toString());
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      router.push("/login");
    },
  },
});
