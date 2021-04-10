import Vue from "vue";

import Router from "vue-router";

import Login from "@/Login.vue";

import Home from "@/Home.vue";

import DashboardPage from "@/views/Dashboard";

import EmployeesPage from "@/views/employees";
import EmployeesListPage from "@/views/employees/list";

import CompaniesPage from "@/views/companies";
import CompaniesListPage from "@/views/companies/list";

Vue.use(Router);

const router = new Router({
  // mode: "history",
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },

    {
      name: "home",
      path: "/",
      component: Home,
      meta: { requiresAuth: true },
      children: [
        {
          name: "dashboard",
          path: "dashboard",
          component: DashboardPage,
        },

        {
          name: "employees",
          path: "employees",
          component: EmployeesPage,
          children: [
            {
              name: "employees-list",
              path: "list",
              component: EmployeesListPage,
            },
          ],
        },
        {
          name: "companies",
          path: "companies",
          component: CompaniesPage,
          children: [
            {
              name: "companies-list",
              path: "list",
              component: CompaniesListPage,
            },
          ],
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  let user = JSON.parse(localStorage.getItem("user"));
  if (to.path === "/") {
    if (user) {
      router.push({ name: "dashboard" });
    } else {
      return next({ name: "login" });
    }
  }

  if (to.name === "login") {
    if (user) {
      return next({ name: "dashboard" });
    } else {
      return next();
    }
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!user) {
      return next({ name: "login" });
    } else {
      return next();
    }
  } else {
    return next();
  }
});

export default router;
