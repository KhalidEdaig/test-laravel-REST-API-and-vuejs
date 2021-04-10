import CompaniesService from "@/services/api/companies.service";
export const companies = {
  namespaced: true,
  state: {
    companies: [],
    pagination: null,
    deleteModal: {
      show: false,
      loading: false,
      companyTodeleteId: null,
    },
    addOrEditModal: {
      show: false,
      loading: false,
      mode: null,
      company: {
        name: "",
        webSite: "",
        email: "",
        logo: null,
      },
    },
  },
  actions: {
    GET_COMPANIES({ commit }, payload) {
      return CompaniesService.getCompanies(payload).then((response) => {
        commit("SET_COMPANIES", response.companies);
        commit("SET_PAGINATION", response.meta);
      });
    },
    DELETE_COMPANY({ commit, state }) {
      return CompaniesService.deleteCompany(
        state.deleteModal.companyTodeleteId
      ).then(() => {
        commit("DELETE_COMPANY", state.deleteModal.companyTodeleteId);
      });
    },
    ADD_OR_EDIT_COMPANY({ state, dispatch, commit }) {
      let payload = (({ id, name, webSite, email }) => ({
        id,
        name,
        webSite,
        email,
      }))(state.addOrEditModal.company);
      if (state.addOrEditModal.mode === "add") {
        return CompaniesService.addCompany(payload).then((response) => {
          commit("ADD_COMPANY", response);
          commit("EMPTY_FORM");

          dispatch(
            "display/DISPLAY_NOTIFICATION",
            {
              title: "Entreprise ajouté !",
              subtitle: "Le entreprise a été ajoutée avec succes",
            },
            { root: true }
          );
        });
      }
      return CompaniesService.editCompany(payload).then((response) => {
        commit("EDIT_COMPANY", response);
        commit("EMPTY_FORM");
        dispatch(
          "display/DISPLAY_NOTIFICATION",
          {
            title: "Entreprise modifié !",
            subtitle: "les informations de ce entreprise ont été modifiées.",
          },
          { root: true }
        );
      });
    },
  },
  mutations: {
    SET_COMPANIES(state, companies) {
      state.companies = companies;
    },
    SET_PAGINATION(state, pagination) {
      state.pagination = pagination;
    },

    DELETE_COMPANY(state, id) {
      const index = state.companies.findIndex((employee) => employee.id === id);
      state.companies.splice(index, 1);
      state.deleteModal.show = false;
      state.deleteModal.loading = false;
    },
    ADD_COMPANY(state, company) {
      state.companies.push(company);
      state.addOrEditModal.show = false;
    },
    EDIT_COMPANY(state, newCompany) {
      const index = state.companies.findIndex(
        (company) => company.id === newCompany.id
      );
      state.companies.splice(index, 1, newCompany);
      state.addOrEditModal.show = false;
    },
    SET_DELETE_MODAL(state, payload) {
      if (payload.companyId)
        state.deleteModal.companyTodeleteId = payload.companyId;
      state.deleteModal.show = payload.state;
    },
    SET_ADD_OR_EDIT_MODAL(state, payload) {
      state.addOrEditModal.company.name = "";
      state.addOrEditModal.company.webSite = "";
      state.addOrEditModal.company.email = "";
      if (payload.mode === "edit")
        state.addOrEditModal.company = Object.assign({}, payload.company);
      state.addOrEditModal.mode = payload.mode;
      state.addOrEditModal.show = payload.state;
    },
    UPDATE_NAME(state, name) {
      state.addOrEditModal.company.name = name;
    },
    UPDATE_EMAIL(state, email) {
      state.addOrEditModal.company.email = email;
    },
    UPDATE_WEB_SITE(state, webSite) {
      state.addOrEditModal.company.webSite = webSite;
    },

    UPDATE_LOGO(state, logo) {
      state.addOrEditModal.company.logo = logo;
    },

    EMPTY_FORM(state) {
      state.addOrEditModal.company.name = "";
      state.addOrEditModal.company.email = "";
      state.addOrEditModal.company.webSite = "";
    },
  },
};
