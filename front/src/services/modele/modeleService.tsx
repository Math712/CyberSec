import { axiosConfig } from "../axios/axiosConfig";

const API_URL = "/modele";

class ModeleService {
  getModeles() {
      return axiosConfig
        .get(API_URL + '/', {withCredentials: true})
        .then(response => {
          return response.data;
        });
  }

  addModele(payload: {}) {
    return axiosConfig    
      .post(API_URL + "/add", {
        payload
      },  { withCredentials: true })
      .then(response => {
        return response.data;
      });
  }

  updateModele(payload: {}) {
    return axiosConfig
      .patch(API_URL + "/update", {
        payload
      },  { withCredentials: true })
      .then(response => {
        return response.data;
      });
  }

  deleteModele(payload: any) {
    return axiosConfig
      .delete(API_URL + "/delete", payload)
      .then(response => {
        return response.data;
      });
  }
}

export default new ModeleService();