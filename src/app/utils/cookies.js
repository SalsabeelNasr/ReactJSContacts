import cookie from 'react-cookie';

class CookiesManager {
  constructor() {
    this.init();
  }

  init() {
    this.cookieKeys = {
      'auth-token': 'auth-token-cookie',
      user: 'user-cookie',
    };

    this.options = {
      path: '/',
    };
  }

  save(key, val, isObject = false) {
    if (!this.cookieKeys[key]) {
      throw new Error('no cookie found for key: ' + key);
    }

    if (isObject) {
      val = JSON.stringify(val);
    }

    cookie.save(key, val, this.options);
    return val;
  }

  saveObject(key, val) {
    return this.save(key, val, true);
  }

  get(key, isObject = false) {
    if (!this.cookieKeys[key]) {
      throw new Error('no cookie found for key: ' + key);
    }

    return cookie.load(key, !isObject);
  }

  getObject(key) {
    return this.get(key, true);
  }

  remove(key) {
    if (!this.cookieKeys[key]) {
      throw new Error('no cookie found for key: ' + key);
    }

    cookie.remove(key, this.options);
  }
}

export default new CookiesManager();
