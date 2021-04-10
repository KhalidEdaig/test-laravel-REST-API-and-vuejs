import EmployeesService from "@/services/api/employees.service";
import CompaniesService from "@/services/api/companies.service";
export const employees = {
  namespaced: true,
  state: {
    employees: [],
    all_companies: [],
    pagination: null,
    deleteModal: {
      show: false,
      loading: false,
      employeeTodeleteId: null,
    },
    addOrEditModal: {
      show: false,
      loading: false,
      mode: null,
      employee: {
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        company_id: "",
      },
    },
  },
  actions: {
    GET_EMPLOYEES({ commit }, payload) {
      return EmployeesService.getEmployees(payload).then((response) => {
        commit("SET_EMPLOYEES", response.employees);
        commit("SET_PAGINATION", response.meta);
      });
    },
    GET_ALL_COMPANIES({ commit }) {
      return CompaniesService.getAllCompanies().then((response) => {
        commit("SET_ALL_COMPANIES", response);
      });
    },
    DELETE_EMPLOYEE({ commit, state }) {
      return EmployeesService.deleteEmployee(
        state.deleteModal.employeeTodeleteId
      ).then(() => {
        commit("DELETE_EMPLOYEE", state.deleteModal.employeeTodeleteId);
      });
    },
    ADD_OR_EDIT_EMPLOYEE({ state, dispatch, commit }) {
      let payload = (({
        id,
        firstname,
        lastname,
        phone,
        email,
        company_id,
      }) => ({
        id,
        firstname,
        lastname,
        phone,
        email,
        company_id,
      }))(state.addOrEditModal.employee);
      if (state.addOrEditModal.mode === "add") {
        return EmployeesService.addEmployee(payload).then((response) => {
          commit("ADD_EMPLOYEE", response);
          commit("EMPTY_FORM");

          dispatch(
            "display/DISPLAY_NOTIFICATION",
            {
              title: "Collaborateur ajouté !",
              subtitle: "Le collaborateur a été ajoutée avec succes",
            },
            { root: true }
          );
        });
      }
      return EmployeesService.editEmployee(payload).then((response) => {
        commit("EDIT_EMPLOYEE", response);
        commit("EMPTY_FORM");
        dispatch(
          "display/DISPLAY_NOTIFICATION",
          {
            title: "Collaborateur modifié !",
            subtitle: "les informations de ce collaborateur ont été modifiées.",
          },
          { root: true }
        );
      });
    },
  },
  mutations: {
    SET_EMPLOYEES(state, employees) {
      state.employees = employees;
    },
    SET_ALL_COMPANIES(state, companies) {
      state.all_companies = companies;
    },
    SET_PAGINATION(state, pagination) {
      state.pagination = pagination;
    },

    DELETE_EMPLOYEE(state, id) {
      const index = state.employees.findIndex((employee) => employee.id === id);
      state.employees.splice(index, 1);
      state.deleteModal.show = false;
      state.deleteModal.loading = false;
    },
    ADD_EMPLOYEE(state, employee) {
      state.employees.push(employee);
      state.addOrEditModal.show = false;
    },
    EDIT_EMPLOYEE(state, newEmployee) {
      const index = state.employees.findIndex(
        (employee) => employee.id === newEmployee.id
      );
      state.employees.splice(index, 1, newEmployee);
      state.addOrEditModal.show = false;
    },
    SET_DELETE_MODAL(state, payload) {
      if (payload.employeeId)
        state.deleteModal.employeeTodeleteId = payload.employeeId;
      state.deleteModal.show = payload.state;
    },
    SET_ADD_OR_EDIT_MODAL(state, payload) {
      state.addOrEditModal.employee.firstname = "";
      state.addOrEditModal.employee.lastname = "";
      state.addOrEditModal.employee.phone = "";
      state.addOrEditModal.employee.email = "";
      state.addOrEditModal.employee.company_id = "";
      if (payload.mode === "edit")
        state.addOrEditModal.employee = Object.assign({}, payload.employee);
      state.addOrEditModal.mode = payload.mode;
      state.addOrEditModal.show = payload.state;
    },
    UPDATE_FIRST_NAME(state, firstname) {
      state.addOrEditModal.employee.firstname = firstname;
    },
    UPDATE_LAST_NAME(state, lastname) {
      state.addOrEditModal.employee.lastname = lastname;
    },
    UPDATE_PHONE(state, phone) {
      state.addOrEditModal.employee.phone = phone;
    },

    UPDATE_EMAIL(state, email) {
      state.addOrEditModal.employee.email = email;
    },
    UPDATE_COMPANY_ID(state, id) {
      state.addOrEditModal.employee.company_id = id;
    },

    EMPTY_FORM(state) {
      state.addOrEditModal.employee.firstname = "";
      state.addOrEditModal.employee.lastname = "";
      state.addOrEditModal.employee.email = "";
      state.addOrEditModal.employee.phone = "";
      state.addOrEditModal.employee.company_id = "";
    },
  },
};
