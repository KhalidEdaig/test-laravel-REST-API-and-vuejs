import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "./axios";
import VueAxios from "vue-axios";
import AppModal from "@/components/app/modals/AppModal.vue";
import Icons from "@/components/icons/Icons";
// Import tailwind styles
import "@/assets/css/tailwind.css";
Vue.component("app-modal", AppModal);
Vue.component("Icon", Icons);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
