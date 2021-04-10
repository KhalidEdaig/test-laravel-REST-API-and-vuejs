import axios from "axios";

export default {
  editUser(user) {
    return axios
      .put(`users/${user.id}`, user)
      .then((response) => response.data.payload || null);
  },
};
