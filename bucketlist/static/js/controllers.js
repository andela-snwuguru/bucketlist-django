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

.controller('AuthCtrl', function($scope, $mdToast, $location, CONFIG, HttpService, Util, StorageService) {
    $scope.user = {}

    $scope.login = function() {
        Util.toast("Authorization in progress");
        HttpService.post('/auth/login/', $scope.user, function(response) {
            if (response.data) {
                if (response.data.login) {
                    StorageService.setItem('token', response.data.token)
                    document.location.href = '/'
                }
            }
            Util.toast('Unable to complete login process')
        }, function(response) {
            Util.toast('Incorrect User credential')
        })
    }

    $scope.logout = function() {
        Util.logout();
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

.controller('BucketlistCtrl', function($scope, HttpService, Util) {
        $scope.bucketlists = [];
        $scope.bucketlist = {};
        $scope.next = false;
        $scope.previous = false;
        $scope.activeId = 0;
        $scope.totalBucketlist = 0;


        $scope.showBucketListItems = function(index) {
            bucketlist_id = $scope.bucketlists[index].id
            $scope.activeId = bucketlist_id;
        };

        $scope.getNextPage = function() {
            $scope.getBucketlist($scope.next);
        };

        $scope.getPreviousPage = function() {
            $scope.getBucketlist($scope.previous);
        };

        $scope.editBucketlist = function(index) {
            $scope.bucketlist = $scope.bucketlists[index];
            $scope.toggleBucketListForm();
        };

        $scope.deleteBucketlist = function(index) {
            bucketlist_id = $scope.bucketlists[index].id;
            HttpService.delete('/bucketlists/' + bucketlist_id, function(response) {
                if (response.status === 204) {
                    $scope.getBucketlist('/bucketlists/');
                }
            }, function(response) {
                Util.logout(response);
            });
        };

        $scope.getBucketlist = function(url) {
            HttpService.get(url, function(response) {
                if (response.data.results) {
                    $scope.activeId = response.data.results[0].id;
                    $scope.totalBucketlist = response.data.count;
                    $scope.bucketlists = response.data.results;
                    $scope.next = response.data.next;
                    $scope.previous = response.data.previous;
                    Util.refreshToken();
                }
            }, function(response) {
                Util.logout(response);
            });
        };

        $scope.saveBucketlist = function() {
            var func = 'post';
            var path = '/bucketlists/';
            if ($scope.bucketlist.date_created) {
                func = 'update'
                path += $scope.bucketlist.id + '/';
            }

            HttpService[func](path, $scope.bucketlist, function(response) {
                if (response.status === 200) {
                    $scope.bucketlist = {};
                    $scope.toggleBucketListForm();
                    $scope.getBucketlist('/bucketlists/');
                }
            }, function(response) {
                Util.logout(response);
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
