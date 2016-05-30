angular.module('BucketlistServices', [])

.factory('StorageService', function () {
  return {
    setItem:function (key,value) {
      window.localStorage.setItem(key, value);
    },
    storeObject:function (key,value) {
      window.localStorage.setItem(key, angular.toJson(value));
    },
    getObject:function (key,value) {
      var result = window.localStorage.getItem(key);
      return result ? angular.fromJson(result) : {};
    },
    getItem:function (key) {
      return window.localStorage.getItem(key);
    },
    removeItem:function (key) {
      window.localStorage.removeItem(key);
    }
  };
})

.factory('HttpService', function ($http, CONFIG) {
  return {
    send:function(endpoint, method, data, successCallback, errorCallback){
      $http({
        method: method,
        url: CONFIG.apiUrl+endpoint,
        data:data
      }).then(successCallback, errorCallback);
    },
    get:function(endpoint, successCallback, errorCallback){
      this.send(endpoint, 'GET', null, successCallback, errorCallback)
    },
    post:function(endpoint, data, successCallback, errorCallback){
      this.send(endpoint, 'POST', data, successCallback, errorCallback)
    },
    update:function(endpoint, data, successCallback, errorCallback){
      this.send(endpoint, 'PUT', data, successCallback, errorCallback)
    },
    delete:function(endpoint, successCallback, errorCallback){
      this.send(endpoint, 'DELETE', null, successCallback, errorCallback)
    },

  };

})