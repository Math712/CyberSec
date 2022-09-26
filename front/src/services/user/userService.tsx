import axios from 'axios';
import authHeader from '../authHeader';

const API_URL = 'http://localhost:4000/back/user/';

class UserService {
  getCurrentUser() {
    return axios.get(API_URL + 'user-info', { headers: authHeader() });
  }
}

export default new UserService();