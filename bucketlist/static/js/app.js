angular.module('Bucketlist', ['BucketlistControllers','BucketlistServices','ngMaterial','ngResource'])
.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
})
.constant('CONFIG', {
  apiUrl: 'http://127.0.0.1:8000/api/v1'
});