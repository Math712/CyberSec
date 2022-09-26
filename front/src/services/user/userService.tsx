import { axiosConfig } from '../axios/axiosConfig';

const API_URL = "/user";

class UserService {
  getCurrentUser() {
    return axiosConfig.get(API_URL + '/user-info');
  }
}

export default new UserService();