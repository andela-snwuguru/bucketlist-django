angular.module('Bucketlist', ['BucketlistControllers','ngMaterial'])
.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});