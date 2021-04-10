import axios from "axios";

export default {
  getEmployees(payload) {
    const query = `employees?page=${payload.page}`;
    return axios.get(query).then((response) => response.data.payload || []);
  },
  addEmployee(employee) {
    return axios
      .post("employees", employee)
      .then((response) => response.data.payload || null);
  },
  editEmployee(employee) {
    return axios
      .put(`employees/${employee.id}`, employee)
      .then((response) => response.data.payload || null);
  },
  deleteEmployee(id) {
    return axios.delete(`employees/${id}`);
  },
};
