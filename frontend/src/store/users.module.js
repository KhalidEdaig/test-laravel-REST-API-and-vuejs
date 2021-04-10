import userService from "@/services/api/users.service";
import router from "@/router";
export const users = {
  namespaced: true,
  state: {
    users: [],
    form: {
      validData: {
        has_error: false,
        errors: [],
      },
      user: {
        username: "",
        password: "",
        email: "",
        role: "",
        permissions: [],
      },
      permissions: {},
    },
  },
  actions: {
    GET_USERS({ commit }) {
      return userService
        .getUsers()
        .then((response) => commit("SET_USERS", response));
    },
    GET_USER_BY_ID({ commit }, id) {
      return userService
        .getUserById(id)
        .then((response) => commit("SET_USER", response));
    },
    ADD_USER({ state, commit, dispatch }) {
      commit("REARRANGE_PERMISSIONS");
      return userService.addUser(state.form.user).then(() => {
        commit("EMPTY_FORM");
        dispatch(
          "display/DISPLAY_NOTIFICATION",
          {
            title: "User ajouté! !",
            subtitle: "Le user a été ajouté avec succes.",
          },
          { root: true }
        );
      });
    },
    DELETE_USER({ state, dispatch }) {
      return userService.deleteUser(state.form.user.id).then(() => {
        dispatch(
          "display/DISPLAY_NOTIFICATION",
          {
            title: "User supprimer! !",
            subtitle: "les informations de ce User ont été supprimés.",
          },
          { root: true }
        );
      });
    },
    EDIT_USER({ state, commit, dispatch }) {
      commit("REARRANGE_PERMISSIONS");
      return userService.editUser(state.form.user).then(() => {
        commit("EMPTY_FORM");
        dispatch(
          "display/DISPLAY_NOTIFICATION",
          {
            title: "User modifié! !",
            subtitle: "les informations de ce User ont été modifiées.",
          },
          { root: true }
        );
      });
    },
    REGISTER_USER_SERVICE_OWNER({ commit }, payload) {
      return userService
        .registerUserServiceOwner(payload)
        .then(() => {
          commit("EMPTY_FORM");
          router.push({ name: "login" });
        })
        .catch((err) => {
          if (err.response.status === 422) {
            commit("SET_VALID_DATA", {
              has_error: true,
              errors: err.response.data.errors,
            });
          }
        });
    },
    REGISTER_BENIFICIARY({ commit }, payload) {
      return userService
        .registerBenificiary(payload)
        .then(() => {
          commit("EMPTY_FORM");
          router.push({ name: "login" });
        })
        .catch((err) => {
          if (err.response.status === 422) {
            commit("SET_VALID_DATA", {
              has_error: true,
              errors: err.response.data.errors,
            });
          }
        });
    },
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_USER(state, user) {
      state.form.user = user;
    },
    EMPTY_FORM(state) {
      state.form.user.username = "";
      state.form.user.email = "";
      state.form.user.password = "";
      state.form.user.role = "";
      state.form.user.permissions = [];
      state.form.validData.has_error = false;
      state.form.validData.errors = [];
    },

    UPDATE_USERNAME(state, username) {
      state.form.user.username = username;
    },
    UPDATE_EMAIL(state, email) {
      state.form.user.email = email;
    },
    UPDATE_PASSWORD(state, password) {
      state.form.user.password = password;
    },
    UPDATE_ROLE(state, role) {
      state.form.user.role = role;
    },
    UPDATE_PERMISSIONS(state, { permissions, storeId }) {
      if (permissions) state.form.permissions["store_" + storeId] = permissions;
    },
    REARRANGE_PERMISSIONS(state) {
      let permissions = [];
      Object.keys(state.form.permissions).forEach(
        (key) => (permissions = permissions.concat(state.form.permissions[key]))
      );
      state.form.user.permissions = permissions;
    },
    SET_VALID_DATA(state, payload) {
      state.form.validData.has_error = payload.has_error;
      state.form.validData.errors = payload.errors;
    },
  },
};
