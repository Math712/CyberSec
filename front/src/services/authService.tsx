import { axiosConfig } from "./axios/axiosConfig";

const API_URL = "/user";

class AuthService {
  login(payload: Record<string, string>) {
    return axiosConfig
      .post(API_URL + "/check-credentials", {
        nom: payload.nom, password: payload.password
      })
      .then(response => {
        console.log(response)
        if (Object.keys(response.data.user!).length !== 0) {
          localStorage.setItem("user", JSON.stringify({id:response.data.user._doc.nom,nom:response.data.user._doc.nom}));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    return axiosConfig
      .post(API_URL + "/log-out")
      .then(response => {
        return response.data;
      });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }

  isLogged() {
    const userStr = localStorage.getItem("user");
    if (userStr) return true;

    return false;
  }
}

export default new AuthService();