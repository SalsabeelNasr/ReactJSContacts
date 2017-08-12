import { browserHistory } from 'react-router';
import _ from 'lodash';
import auth from './utils/auth';

class AppRouter {
  constructor() {
    this.init();
  }

  init() {
    this.routes = {
      login: {
        path: '/login',
        public: true,
      },
      contacts: {
        path: '/contacts',
        public: true
      }
    };

    // set defaults and transform string routes to objects
    _.each(this.routes, (route, routeKey) => {
      if (_.isObject(route) === true) {
        route = _.defaults(route, {
          public: true,
        });
      } else {
        route = {
          path: route,
          public: false,
        };
      }

      this.routes[routeKey] = route;
    });
  }

  // we can implement any middleware logic here
  // for example, i will check here if user is loggedIn or not, and if route is public
  go(routeKey, params) {
    if (!this.routes[routeKey]) {
      throw new Error('route not found for key: ' + routeKey);
    }

    if (this.isPublic(routeKey) === false && auth.isLoggedIn() === false) {
      console.log(`tried to access ${routeKey} but redirected to login/`);
      return browserHistory.push(this.routes.login);
    }

    let routePath = this.routes[routeKey].path;

    // process route params
    if (_.isUndefined(params) === false) {
      _.each(params, (paramValue, paramKey) => {
        routePath = routePath.replace(new RegExp(':' + paramKey, 'g'), paramValue);
      });
    }

    // if missing path params
    let routeParams = routePath.match(new RegExp(':[a-zA-Z\-]+', 'gi'));

    if (routeParams) { // replace missing params with -1
      _.each(routeParams, (param) => {
        routePath = routePath.replace(new RegExp(param, 'g'), this.missingParamValue());
      });
    }

    browserHistory.push(routePath);
  }

  // @TODO: fails for routes with params
  get() {
    let path = window.location.pathname;
    return _.findKey(this.routes, (route) => this._matches(route.path, path));
  }

  _matches(routePath, path) {
    let routePathParts = routePath.split('/');
    let pathParts = path.split('/');

    if (routePathParts.length !== pathParts.length) {
      return false;
    }

    let isMatching = true;

    for (let i = 0; i < routePathParts.length; i++) {
      let routePathPart = routePathParts[i];
      let pathPart = pathParts[i];

      if (_.startsWith(routePathPart, ':')) {
        continue;
      }

      if (routePathPart !== pathPart) {
        isMatching = false;
        break;
      }
    }

    return isMatching;
  }

  getTabKey() {
    return this.get() ? this.routes[this.get()].tabKey : null;
  }

  is(routeKey) {
    if (!this.routes[routeKey]) {
      throw new Error('route not found for key: ' + routeKey);
    }

    return this.get() === routeKey;
  }

  back() {
    browserHistory.goBack();
  }

  isPublic(routeKey) {
    return this.routes[routeKey].public;
  }

  isMissingParam(paramValue) {
    return paramValue == this.missingParamValue();
  }

  missingParamValue() {
    return -1;
  }
}

export default new AppRouter();
