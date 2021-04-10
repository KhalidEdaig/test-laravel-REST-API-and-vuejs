import displayService from "@/services/api/display.service";

export const display = {
  namespaced: true,
  state: {
    handleErrors: {
      isError: false,
      message: [],
    },
    closeNavBar: true,
    notification: {
      show: false,
      type: "success",
      title: "",
      subtitle: "",
    },
    menu: {},
    isLoading: true,
  },
  getters: {
    menu: (state) => {
      return state.menu;
    },
  },
  actions: {
    DISPLAY_NOTIFICATION({ commit }, payload) {
      commit("SET_NOTIFICATION_TITLE", payload.title);
      commit("SET_NOTIFICATION_SUBTITLE", payload.subtitle);
      commit("SET_NOTIFICATION_TYPE", payload.type);
      commit("SHOW_NOTIFICATION");
    },
    GET_MENU({ commit, state }) {
      if (Object.keys(state.menu).length > 0) return;
      return displayService
        .getMenu()
        .then((response) => commit("SET_MENU", response));
    },
  },
  mutations: {
    SHOW_NOTIFICATION(state) {
      state.notification.show = true;
      setTimeout(() => {
        state.notification.show = false;
      }, 3000);
    },
    HIDE_NOTIFICATION(state) {
      state.notification.show = false;
    },
    SET_NOTIFICATION_TITLE(state, title) {
      state.notification.title = title;
    },
    SET_NOTIFICATION_SUBTITLE(state, subtitle) {
      state.notification.subtitle = subtitle;
    },
    SET_NOTIFICATION_TYPE(state, type) {
      state.notification.type = type || "success";
    },
    SET_MENU(state, menu) {
      state.menu = menu;
    },
    SET_CLOSE_NAV_BAR(state, status) {
      state.closeNavBar = status;
    },
    UPDATE_IS_ERRORS(state, value) {
      state.handleErrors.isError = value;
    },
    UPDATE_MESSAGE(state, errors) {
      state.handleErrors.message = errors;
    },
    SET_IS_LOADING(state, value) {
      state.isLoading = value;
    },
  },
};
