angular.module('BucketlistControllers', [])
    .controller('AppCtrl', function($scope, $timeout, $mdSidenav, $log, $mdBottomSheet, $mdToast) {
        $scope.toggleLeft = buildToggler('left');
        $scope.toggleRight = buildToggler('right');

        $scope.showToast = function(message) {
            $mdToast.show(
                $mdToast.simple()
                .textContent(message)
                .position('top right')
                .hideDelay(5000)
            );
        };

        $scope.openMenu = function($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };

        $scope.clickTest = function() {
            alert(1)
        }

        function buildToggler(navID) {
            return function() {
                $mdSidenav(navID)
                    .toggle();
            }
        }

        $scope.showSocialButtons = function() {
            $mdBottomSheet.show({
                templateUrl: 'social-buttons.html',
                controller: 'AuthCtrl',
                clickOutsideToClose: true
            });
        };

        $scope.showRegisterForm = function() {
            $mdBottomSheet.show({
                templateUrl: 'register.html',
                controller: 'AuthCtrl',
                clickOutsideToClose: true
            });
        };

        $scope.sideClick = function() {
            alert(1);
        };
    })

.controller('AuthCtrl', function($scope, $mdToast, $location, CONFIG, HttpService, Util) {
    $scope.user = {}

    $scope.login = function() {
        Util.toast("Authorization in progress");
        HttpService.post('/auth/login/', $scope.user, function(response) {
            if (response.data) {
                if (response.data.login) {
                    document.location.href = '/'
                }
            }
            Util.toast('Unable to complete login process')
        }, function(response) {
            Util.toast('Incorrect User credential')
        })
    }

    $scope.logout = function() {
        document.location.href = '/logout'
    }

    $scope.newAccount = function() {
        if ($scope.user.password != $scope.user.confirmPassword) {
            Util.toast("Password mismatch");
            return false
        }
        Util.toast("Creating account...");
        HttpService.post('/auth/register/', $scope.user, function(response) {
            if (response.data) {
                $scope.login();
                return false
            }
            Util.toast('Unable to complete registration');
        }, function(response) {
            if (response.data && response.data.username) {
                Util.toast(response.data.username[0])
            } else {
                Util.toast('Unable to complete registration')
            }
        });

    };
})

.controller('BucketlistCtrl', function($scope, HttpService) {
        $scope.bucketlists = [];
        $scope.next = false;
        $scope.previous = false;
        $scope.activeId = 0;


        $scope.showBucketListItems = function(index){
          bucketlist_id = $scope.bucketlists[index].id
          $scope.activeId = bucketlist_id;
        };

        $scope.getNextPage = function(){
          $scope.getBucketlist($scope.next);
        };

        $scope.getPreviousPage = function(){
          $scope.getBucketlist($scope.previous);
        };

        $scope.editBucketlist = function(index){
          bucketlist_id = $scope.bucketlists[index].id
          alert(bucketlist_id);
        };

        $scope.deleteBucketlist = function(index){
          bucketlist_id = $scope.bucketlists[index].id
          alert(bucketlist_id);
        };

        $scope.getBucketlist = function(url){
          HttpService.get(url, function(response) {
              if(response.data.results){
                if($scope.bucketlists.length == 0){
                  $scope.activeId = response.data.results[0].id;
                }
                $scope.bucketlists = response.data.results;
                $scope.next = response.data.next;
                $scope.previous = response.data.previous;
              }
            }, function(response) {
                console.log(response,'error');
            });
        };




        $scope.toggleBucketListForm = function() {
            $scope.newBucketlist = !$scope.newBucketlist;
        }

        $scope.getBucketlist('/bucketlists/');

    })
    .controller('RightCtrl', function($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function() {
            $mdSidenav('right').close()
                .then(function() {
                    $log.debug("close RIGHT is done");
                });
        };
    });
