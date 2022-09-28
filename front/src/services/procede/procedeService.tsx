import { axiosConfig } from "../axios/axiosConfig";

const API_URL = "/procede";

class ProcedeService {
  getProcedes() {
      return axiosConfig
        .get(API_URL + '/')
        .then(response => {
          return response.data;
        });
  }

  addProcede(payload: any) {
    return axiosConfig    
      .post(API_URL + "/add",
      {
        "nom": payload.nom,
        "description": payload.description,
        "modeles": payload.modeles,
        "etapes": payload.etapes
      })
      .then(response => {
        return response.data;
      });
  }

  updateProcede(payload: any) {
    return axiosConfig
      .patch(API_URL + "/update", 
        {
          "id": payload._id,
          "nom": payload.nom,
          "description": payload.description,
          "modeles": payload.modeles,
          "etapes": payload.etapes
        }
      )
      .then(response => {
        return response.data;
      });
  }

  deleteProcede(payload: any) {
    return axiosConfig
      .delete(API_URL + "/delete", {data: {"id": payload._id}})
      .then(response => {
        return response.data;
      });
  }
}

export default new ProcedeService();