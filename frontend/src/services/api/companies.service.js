import axios from "axios";

export default {
  getCompanies(payload) {
    const query = `companies?page=${payload.page}`;
    return axios.get(query).then((response) => response.data.payload || []);
  },
  getAllCompanies() {
    const query = "companies/all";
    return axios.post(query).then((response) => response.data.payload || []);
  },
  addCompany(company) {
    return axios
      .post("companies", company)
      .then((response) => response.data.payload || null);
  },
  editCompany(company) {
    return axios
      .put(`companies/${company.id}`, company)
      .then((response) => response.data.payload || null);
  },
  deleteCompany(id) {
    return axios.delete(`companies/${id}`);
  },
};
