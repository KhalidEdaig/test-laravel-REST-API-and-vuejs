const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null };

import authService from "@/services/api/auth.service";
import userService from "@/services/api/users.service";
import router from "@/router";

export const auth = {
  namespaced: true,
  state: {
    ...initialState,
    error: false,
  },
  getters: {
    isAdmin: (state) => {
      return state.user ? state.user.is_admin : false;
    },
    Role: (state) => {
      return state.user && state.user.roles ? state.user.roles[0] : null;
    },
  },
  actions: {
    LOGIN({ commit }, payload) {
      return authService
        .login(payload)
        .then((response) => {
          commit("LOGIN_SUCCESS", response);

          router.push({ name: "dashboard" });
        })
        .catch(() => commit("LOGIN_FAILURE"));
    },
    LOGOUT({ commit }) {
      return authService.logout().then(() => {
        commit("LOGOUT");
        router.push("/login");
      });
    },
    EDIT_USER_INFOS_AND_PASSWORD({ state, dispatch }, payload) {
      const { username, email } = state.user;
      payload.set("username", username);
      payload.set("email", email);
      return userService
        .editInfosAndPassword(state.user.id, payload)
        .then((response) => {
          let newUser = user;
          const { username, email } = response;
          newUser.username = username;
          newUser.email = email;
          localStorage.setItem("user", JSON.stringify(newUser));
          dispatch(
            "display/DISPLAY_NOTIFICATION",
            {
              title: "Profil",
              subtitle: "Les informations de votre profil ont été enregistrées",
            },
            { root: true }
          );
        });
    },
    CHANGE_PASSWORD({ dispatch }, payload) {
      return authService.changePassword(payload).then(() =>
        dispatch(
          "display/DISPLAY_NOTIFICATION",
          {
            title: "Mot de passe",
            subtitle: "Mot de passe a été changé avec succes",
          },
          { root: true }
        )
      );
    },
  },
  mutations: {
    LOGIN_SUCCESS(state, user) {
      state.status = { loggedIn: true };
      state.user = user;
      state.error = false;
    },
    LOGIN_FAILURE(state) {
      state.status = {};
      state.user = null;
      state.error = true;
    },
    LOGOUT(state) {
      state.status = {};
      state.user = null;
    },
    SET_AUTH_LASTNAME(state, username) {
      state.user.username = username;
    },
    SET_AUTH_EMAIL(state, email) {
      state.user.email = email;
    },
  },
};
