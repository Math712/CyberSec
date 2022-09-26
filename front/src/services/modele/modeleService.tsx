import axios from "axios";

const API_URL = "http://localhost:4000/modele/";

class ModeleService {
  getModeles() {
      return axios
        .get(API_URL)
        .then(response => {
          return response.data;
        });
  }

  addModele(payload: {}) {
    return axios
      .post(API_URL + "add", {
        payload
      })
      .then(response => {
        return response.data;
      });
  }

  updateModele(payload: {}) {
    return axios
      .patch(API_URL + "update", {
        payload
      })
      .then(response => {
        return response.data;
      });
  }

  deleteModele(payload: any) {
    return axios
      .delete(API_URL + "delete", payload)
      .then(response => {
        return response.data;
      });
  }
}

export default new ModeleService();