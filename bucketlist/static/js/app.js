angular.module('Bucketlist', ['bucketlist.controllers', 'bucketlist.services', 'ngMaterial'])
    .config(function($interpolateProvider, $httpProvider) {
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    })
    .constant('CONFIG', {
        apiUrl: document.domain == '127.0.0.1' ? '//127.0.0.1:8000/api/v1' : '//littlehope.herokuapp.com/api/v1',
        loadItemsEvent: 'active-bucketlist-change'
    }).run(function(StorageService){
        const token = StorageService.getItem('token');
        const path = document.location.href;
        const inDashboard = path.indexOf('dashboard');
        if(inDashboard > 0){
            if(!token){
                document.location.href = '/';
            }
        }else{
            if(token){
                document.location.href = '/dashboard/';
            }
        }
    });
