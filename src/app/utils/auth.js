import _ from 'lodash';
import cookies from './cookies';

class Auth {
  login(token, user) {
    cookies.save('auth-token', token);
    cookies.saveObject('user', user);
  }

  logout() {
    cookies.remove('auth-token');
    cookies.remove('user');
  }

  getUser() {
    return cookies.getObject('user');
  }

  getToken() {
    return cookies.get('auth-token');
  }

  isLoggedIn() {
    return _.isUndefined(this.getToken()) === false;
  }
}

export default new Auth();
