import axios from "axios";

const API_URL = "http://localhost:4000/user/";

class AuthService {
  login(payload: Record<string, string>) {
    return axios
      .post(API_URL + "check-credentials", {
        nom: payload.nom, password: payload.password
      })
      .then(response => {
        if (Object.keys(response.data.user!).length !== 0) {
          localStorage.setItem("user", JSON.stringify(response.data.user._doc._id));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    return axios
      .post(API_URL + "log-out")
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
    console.log(userStr)
    if (userStr) return true;

    return false;
  }
}

export default new AuthService();