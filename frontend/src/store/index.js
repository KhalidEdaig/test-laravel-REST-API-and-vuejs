import Vue from "vue";
import Vuex from "vuex";

import { auth } from "./auth.module";
import { users } from "./users.module";
import { display } from "./display.module";
import { employees } from "./employees.module";
import { companies } from "./companies.module";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    display,
    auth,
    employees,
    companies,
    users,
  },
});

export default store;
