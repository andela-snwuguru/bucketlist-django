angular.module('Bucketlist', ['bucketlist.controllers', 'bucketlist.services', 'ngMaterial'])
    .config(function($interpolateProvider, $httpProvider) {
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    })
    .constant('CONFIG', {
        //apiUrl: 'https://littlehope.herokuapp.com/api/v1',
        apiUrl: 'http://localhost:8000/api/v1',
        loadItemsEvent: 'active-bucketlist-change'
    });
