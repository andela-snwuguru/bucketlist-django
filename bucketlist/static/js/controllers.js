angular.module('bucketlist.controllers', [])
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

.controller('BucketlistCtrl', function($scope, BucketlistService, $rootScope, CONFIG) {
        $scope.bucketlists = [];
        $scope.bucketlist = {};
        $scope.next = false;
        $scope.previous = false;
        $scope.activeId = 0;
        $scope.total = 0;
        $scope.footer_text = 'Bucket list'

        $scope.showBucketListItems = function(index) {
            bucketlist_id = $scope.bucketlists[index].id
            $scope.activeId = bucketlist_id;
            Util.broadcast(bucketlist_id, $scope.bucketlists[index].name)
            $scope.toggleLeft();
        };

        $scope.getNextPage = function() {
            $scope.getBucketlist($scope.next);
        };

        $scope.getPreviousPage = function() {
            $scope.getBucketlist($scope.previous);
        };

        $scope.edit = function(index) {
            $scope.bucketlist = $scope.bucketlists[index];
            $scope.toggleBucketListForm();
        };

        $scope.delete = function(index) {
            bucketlist_id = $scope.bucketlists[index].id;
            BucketlistService.delete(bucketlist_id, $scope)
        };

        $scope.getBucketlist = function(url) {
            BucketlistService.get(url, $scope);
        };

        $scope.saveBucketlist = function() {
            BucketlistService.save($scope);
        };

        $scope.toggleBucketListForm = function() {
            $scope.newBucketlist = !$scope.newBucketlist;
        }

        $scope.getBucketlist('/bucketlists/');
    })
    .controller('BucketlistItemCtrl', function($scope, BucketlistItemService, CONFIG) {
        $scope.items = [];
        $scope.item = {};
        $scope.next = false;
        $scope.previous = false;
        $scope.total = 0;
        $scope.bucketlist_name = '';
        $scope.bucketlist_id = 0;
        $scope.currentItemUrl = '';
        $scope.footer_text = 'Bucket list items'

        $scope.getItems = function(url) {
            BucketlistItemService.get(url, $scope);
        };
        $scope.$on(CONFIG.loadItemsEvent, function(event, data) {
            $scope.bucketlist_name = data.bucketlist_name;
            $scope.bucketlist_id = data.bucketlist_id;
            $scope.currentItemUrl = '/bucketlists/' + data.bucketlist_id + '/items/';
            $scope.getItems($scope.currentItemUrl, $scope);
        });

        $scope.getNextPage = function() {
            $scope.getItems($scope.next);
        };

        $scope.getPreviousPage = function() {
            $scope.getItems($scope.previous);
        };

        $scope.saveItem = function() {
            BucketlistItemService.save($scope);
        };

        $scope.edit = function(index) {
            $scope.item = $scope.items[index];
            $scope.toggleRight();
        };

        $scope.delete = function(index) {
            $scope.item = $scope.items[index];
            BucketlistItemService.delete($scope)
        };



    });
