import { axiosConfig } from "../axios/axiosConfig";

const API_URL = "/modele";

class ModeleService {
  getModeles() {
      return axiosConfig
        .get(API_URL + '/')
        .then(response => {
          return response.data;
        });
  }

  addModele(payload: any) {
    return axiosConfig    
      .post(API_URL + "/add",
      {
        "id": payload._id,
        "nom": payload.nom,
        "description": payload.description,
        "pUHT": payload.pUHT,
        "gamme": payload.gamme,
        "ingredients": payload.ingredients,
        "grammage": payload.grammage
      })
      .then(response => {
        return response.data;
      });
  }

  updateModele(payload: any) {
    return axiosConfig
      .patch(API_URL + "/update", 
        {
          "id": payload._id,
          "nom": payload.nom,
          "description": payload.description,
          "pUHT": payload.pUHT,
          "gamme": payload.gamme,
          "ingredients": payload.ingredients,
          "grammage": payload.grammage
        }
      )
      .then(response => {
        return response.data;
      });
  }

  deleteModele(payload: any) {
    console.log(payload)
    return axiosConfig
      .delete(API_URL + "/delete", {data: {"id": payload._id}})
      .then(response => {
        return response.data;
      });
  }
}

export default new ModeleService();