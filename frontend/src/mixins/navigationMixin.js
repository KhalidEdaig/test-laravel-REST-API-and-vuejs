import { mapGetters, mapActions } from "vuex";

var navigationMixin = {
  data() {
    return {
      activeClass: "text-gray-900",
    };
  },
  computed: {
    ...mapGetters("auth", {
      isAdmin: "isAdmin",
      Role: "Role",
    }),
    currentRoute() {
      return this.$route.name;
    },
    menu() {
      return [
        {
          name: "Tableau de board",
          route: "dashboard",
          icon: "home",
          show: this.isAdmin,
          hasBadge: false,
        },
        {
          name: "Entreprises",
          route: "companies-list",
          icon: "",
          show: this.isAdmin,
          hasBadge: false,
        },
        {
          name: "Collaborateurs",
          route: "employees-list",
          icon: "",
          show: this.isAdmin,
          hasBadge: false,
        },
      ];
    },
    filteredMenu() {
      return this.menu.filter((item) => item.show);
    },
  },
  methods: {
    ...mapActions("display", {
      getMenu: "GET_MENU",
    }),
  },
};

export default navigationMixin;
