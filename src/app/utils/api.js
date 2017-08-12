import request from 'superagent';
import q from 'q';
import _ from 'lodash';
import auth from './auth';
import env from '../../../env';
import router from '../app.router';

class API {
  constructor() {
    this.IDProperty = 'id';

    this.apis = {
      // auth
      login: '/auth/login',
      logout: '/auth/logout',

      // lookups
      'connection-reaction': '/lookup/connection-reaction',
      'destination-type': '/lookup/destination-type',
      'connection-type': '/lookup/connection-type',

      // resources
      'talking-point': '/talking-point',
      term: '/term',
      paragraph: '/paragraph',
      'reasoning-circles': '/talking-point/:talkingPointID/reasoning-circle',
      'reasoning-circle': '/reasoning-circle',
      question: '/question',
    };
  }

  _makePath(resource, resourceID, params) {
    if (_.isNull(resourceID) === true) {
      resourceID = undefined;
    }

    // base url + resource relative path
    let path = env.api + this.apis[resource];

    _.each(params, (paramValue, paramKey) => {
      path = path.replace(new RegExp(':' + paramKey, 'ig'), paramValue);
    });

    return path + (_.isUndefined(resourceID) ? '' : `/${resourceID}`);
  }

  _makeHeaders(options) {
    if (_.isUndefined(options.anonymous) === true) {
      options.anonymous = false;
    }

    return {
      token: options.anonymous ? undefined : auth.getToken(),
      Accept: 'application/json',
    };
  }

  _getDefaultOptions(options) {
    return _.defaults(options, {
      anonymous: false,
    });
  }

  _validateResource(resource) {
    if (!this.apis[resource]) {
      throw new Error('api not found for resource: ' + resource);
    }
  }

  // generic success handler
  _handleSuccess(response, defer) {
    defer.resolve(response.body.data);
  }

  // generic error handler
  _handleError(error, defer) {
    if (_.has(error, 'response.body.error')) {
      error = error.response.body.error;
    }

    // not logged in, or having invalid/expired token
    // handle not authorized globally
    if (error.code === 401) {
      auth.logout();
      router.go('login');
    }

    error.message = error.message || 'something went wrong';
    defer.reject(error);
  }

  post(resource, object, options) {
    this._validateResource(resource);
    options = this._getDefaultOptions(options);

    let defer = q.defer();

    request
      .post(this._makePath(resource))
      .send(object)
      .set(this._makeHeaders(options))
      .then((response) => {
        this._handleSuccess(response, defer);
      }, (error) => {
        this._handleError(error, defer);
      });

    return defer.promise;
  }

  list(resource, options) {
    this._validateResource(resource);
    options = this._getDefaultOptions(options);

    let defer = q.defer();

    request
      .get(this._makePath(resource, null, options.params))
      .set(this._makeHeaders(options))
      .then((response) => {
        this._handleSuccess(response, defer);
      }, (error) => {
        this._handleError(error, defer);
      });

    return defer.promise;
  }

  get(resource, resourceID, options) {
    this._validateResource(resource);
    options = this._getDefaultOptions(options);

    let defer = q.defer();

    request
      .get(this._makePath(resource, resourceID, options.params))
      .set(this._makeHeaders(options))
      .then((response) => {
        this._handleSuccess(response, defer);
      }, (error) => {
        this._handleError(error, defer);
      });

    return defer.promise;
  }

  put(resource, object, options) {
    this._validateResource(resource);
    options = this._getDefaultOptions(options);

    let defer = q.defer();

    request
      .put(this._makePath(resource, object[this.IDProperty], options.params))
      .set(this._makeHeaders(options))
      .send(object)
      .then((response) => {
        this._handleSuccess(response, defer);
      }, (error) => {
        this._handleError(error, defer);
      });

    return defer.promise;
  }

  remove(resource, id, options) {
    this._validateResource(resource);
    options = this._getDefaultOptions(options);

    let defer = q.defer();

    request
      .delete(this._makePath(resource, id, options.params))
      .set(this._makeHeaders(options))
      .then((response) => {
        this._handleSuccess(response, defer);
      }, (error) => {
        this._handleError(error, defer);
      });

    return defer.promise;
  }
}

export default new API();
