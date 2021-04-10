import axios from "axios";
import router from "@/router";
import store from "@/store";

// eslint-disable-next-line no-undef
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

axios.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user.access_token;
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const authErrorCode = 401;
    const ErrorCodes = [
      {
        code: 500,
        message: "une erreur est survenue !",
      },
      {
        code: 400,
        message: "une erreur est survenue !",
      },
      {
        code: 422,
        message: "une erreur est survenue !",
      },
      {
        code: 403,
        message: "cette action ne peut pas être executée !",
      },
    ];
    if (error.response.status === authErrorCode) {
      localStorage.removeItem("user");
      router.push({ name: "login" }).catch(() => {});
    }
    const errorReceived = error.response.status;
    const foundError = ErrorCodes.find((error) => error.code === errorReceived);
    if (foundError)
      store.dispatch(
        "display/DISPLAY_NOTIFICATION",
        { title: "Erreur", subtitle: foundError.message, type: "error" },
        { root: true }
      );
    return Promise.reject(error);
  }
);

export default axios;
