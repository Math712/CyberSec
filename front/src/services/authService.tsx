import { axiosConfig } from "./axios/axiosConfig";

const API_URL = "/user";

class AuthService {
  login(payload: Record<string, string>) {
    return axiosConfig
      .post(API_URL + "/check-credentials", {
        nom: payload.nom, password: payload.password
      })
      .then(response => {
        if (Object.keys(response.data.user!).length !== 0) {
          localStorage.setItem("user", JSON.stringify({id:response.data.user.id,nom:response.data.user.nom}));
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