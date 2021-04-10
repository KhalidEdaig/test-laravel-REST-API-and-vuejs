<template>
  <div class="pt-2 pb-6 md:py-6">
    <div class="flex items-center px-4 sm:px-6 md:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">Collaborateurs</h1>
      <span class="inline-flex rounded-md shadow-sm">
        <button
          @click="setAddOrEditModalState({ state: true, mode: 'add' })"
          type="button"
          class="inline-flex items-center px-4 py-2 ml-6 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
        >
          <svg
            class="-ml-1 mr-2 h-5 w-5"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z"
            />
          </svg>
          Nouveau Collaborateur
        </button>
      </span>
    </div>
    <div class="mt-4">
      <div class="flex flex-col">
        <div class="py-2 overflow-x-auto sm:px-6 lg:px-8">
          <div
            class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200"
          >
            <table class="min-w-full">
              <thead>
                <tr
                  class="cursor-pointer bg-indigo-600 rounded-l-lg text-white hover:bg-indigo-700"
                >
                  <th
                    class="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider"
                  >
                    Nom Complet
                  </th>
                  <th
                    class="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider"
                  >
                    Téléphone
                  </th>
                  <th
                    class="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider"
                  >
                    E-mail
                  </th>

                  <th
                    class="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider"
                  >
                    Date creation
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(employee, index) in employees"
                  :key="index"
                  class="bg-white"
                >
                  <td
                    class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-800"
                  >
                    {{ employee.firstname + " " + employee.lastname }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-800"
                  >
                    {{ employee.phone }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-800"
                  >
                    {{ employee.email }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-800"
                  >
                    {{ employee.created_at }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium"
                  >
                    <button
                      @click="
                        setAddOrEditModalState({
                          state: true,
                          mode: 'edit',
                          employee: employee,
                        })
                      "
                      class="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                    >
                      Editer
                    </button>
                    <button
                      class="text-red-500 hover:text-red-700 ml-2 cursor-pointer"
                      @click="
                        setDeleteModalState({
                          state: true,
                          employeeId: employee.id,
                        })
                      "
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- BEGIN navigation -->
          <app-pagination
            :pagination="pagination"
            @select-page="(page) => getEmployees({ page })"
            @next="getEmployees({ page: ++pagination.current_page })"
            @prev="getEmployees({ page: --pagination.current_page })"
          ></app-pagination>
          <!-- END navigation -->
        </div>
      </div>
    </div>
    <!-- BEGIN modal -->
    <app-modal
      v-show="isDeleteModalActive"
      :is-shown="isDeleteModalActive"
      title="Supprimer ce collaborateur"
      subtitle="Êtes-vous sûr de vouloir supprimer ce collaborateur? Toutes les données concernant ce collaborateur seront supprimées définitivement. Cette action ne peut pas être annulée."
      :loading="deleteModalLoading"
      @confirm="deleteEmployee()"
      @cancel="setDeleteModalState({ state: false })"
    ></app-modal>
    <!-- END modal -->
    <!-- BEGIN slide over -->
    <app-slide-over
      title="Ajouter un collaborateur"
      subtitle="Remplir le formulaire afin d'ajouter un nouveau collaborateur"
      v-show="isAddOrEditModalActive"
      :is-shown="isAddOrEditModalActive"
      @cancel="setAddOrEditModalState({ state: false })"
      @confirm="addOrEditEmployee"
    >
      <form action>
        <div>
          <label
            for="firstname"
            class="block text-sm font-medium leading-5 text-gray-700"
            >Nom
          </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              id="firstname"
              class="form-input block w-full sm:text-sm sm:leading-5 px-3 py-2 border-gray-400 border rounded"
              placeholder="El Hariry"
              type="text"
              v-model="firstname"
            />
          </div>
        </div>
        <div>
          <label
            for="lastname"
            class="block text-sm font-medium leading-5 text-gray-700"
            >Prénom
          </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              id="lastname"
              class="form-input block w-full sm:text-sm sm:leading-5 px-3 py-2 border-gray-400 border rounded"
              placeholder="Ali"
              type="text"
              v-model="lastname"
            />
          </div>
        </div>
        <div class="mt-4">
          <label
            for="url"
            class="block text-sm font-medium leading-5 text-gray-700"
            >Téléphone</label
          >
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              id="url"
              class="form-input block w-full sm:text-sm sm:leading-5 px-3 py-2 border-gray-400 border rounded"
              placeholder="0614158910"
              type="text"
              v-model="phone"
            />
          </div>
        </div>
        <div class="mt-4">
          <label
            for="email"
            class="block text-sm font-medium leading-5 text-gray-700"
            >E-mail</label
          >
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              id="email"
              class="form-input block w-full sm:text-sm sm:leading-5 px-3 py-2 border-gray-400 border rounded"
              placeholder="ali@gmail.com"
              type="email"
              v-model="email"
            />
          </div>
        </div>
        <div class="mt-4">
          <label
            for="city"
            class="block text-sm font-medium leading-5 text-gray-700"
            >Entreprise</label
          >
          <span
            class="mt-1 relative z-0 inline-flex shadow-sm rounded-md w-full"
          >
            <select
              v-model="companyId"
              id="cityId"
              class="-ml-px block form-select w-full pl-3 pr-9 py-2 rounded-l-none rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
              aria-label="Select message type"
            >
              <option v-if="mode != 'edit'"></option>
              <option
                v-for="(company, index) in allCompanies"
                :key="index"
                :value="company.id"
              >
                {{ company.name }}
              </option>
            </select>
          </span>
        </div>
      </form>
    </app-slide-over>
    <!-- END slide over -->
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import AppPagination from "@/components/app/pagination/AppPagination.vue";
import AppModal from "@/components/app/modals/AppModal.vue";
import AppSlideOver from "@/components/app/slideovers/AppSlideOver.vue";

export default {
  name: "EmployeesList",

  mounted() {
    this.getEmployees({
      page: 1,
    });
    this.getAllCompanies();
  },
  methods: {
    ...mapActions("employees", {
      getEmployees: "GET_EMPLOYEES",
      getAllCompanies: "GET_ALL_COMPANIES",
      deleteEmployee: "DELETE_EMPLOYEE",
      addOrEditEmployee: "ADD_OR_EDIT_EMPLOYEE",
    }),
    ...mapMutations("employees", {
      setDeleteModalState: "SET_DELETE_MODAL",
      setAddOrEditModalState: "SET_ADD_OR_EDIT_MODAL",
      closeNotification: "SET_NOTIFICATION",
      updateFirstname: "UPDATE_FIRST_NAME",
      updateLastname: "UPDATE_LAST_NAME",
      updatePhone: "UPDATE_PHONE",
      updateEmail: "UPDATE_EMAIL",
      updateCompanyId: "UPDATE_COMPANY_ID",
    }),
    display(object) {
      if (object.length > 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  computed: {
    ...mapState("employees", {
      employees: (state) => state.employees,
      pagination: (state) => state.pagination,
      allCompanies: (state) => state.all_companies,
      isDeleteModalActive: (state) => state.deleteModal.show,
      deleteModalLoading: (state) => state.deleteModal.loading,
      isAddOrEditModalActive: (state) => state.addOrEditModal.show,
    }),
    mode: {
      get() {
        return this.$store.state.employees.addOrEditModal.mode;
      },
    },
    firstname: {
      get() {
        return this.$store.state.employees.addOrEditModal.employee.firstname;
      },
      set(value) {
        this.updateFirstname(value);
      },
    },
    lastname: {
      get() {
        return this.$store.state.employees.addOrEditModal.employee.lastname;
      },
      set(value) {
        this.updateLastname(value);
      },
    },
    phone: {
      get() {
        return this.$store.state.employees.addOrEditModal.employee.phone;
      },
      set(value) {
        this.updatePhone(value);
      },
    },
    email: {
      get() {
        return this.$store.state.employees.addOrEditModal.employee.email;
      },
      set(value) {
        this.updateEmail(value);
      },
    },
    companyId: {
      get() {
        return this.$store.state.employees.addOrEditModal.employee.company_id;
      },
      set(value) {
        this.updateCompanyId(value);
      },
    },
  },
  components: {
    AppPagination,
    AppModal,
    AppSlideOver,
  },
};
</script>

<style></style>
