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
      var url = endpoint.indexOf('http') == 0 ? endpoint : CONFIG.apiUrl+endpoint;
      $http({
        method: method,
        url: url,
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
.factory('Util', function ($http, $mdToast, CONFIG) {
  return {
   toast:function(message) {
        $mdToast.show(
            $mdToast.simple()
            .textContent(message)
            .position('top right')
            .hideDelay(5000)
        );
    }
  };

});