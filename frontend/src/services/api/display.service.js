import axios from "axios";

export default {
  getMenu() {
    return axios.get("menu").then((response) => response.data.payload || []);
  },
};
