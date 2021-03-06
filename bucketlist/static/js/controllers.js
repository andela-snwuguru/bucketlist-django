angular.module('bucketlist.controllers', [])
    .controller('AppCtrl', function($scope, $mdSidenav, $mdBottomSheet, StorageService) {
        $scope.toggleLeft = buildToggler('left');
        $scope.toggleRight = buildToggler('right');
        $scope.token = StorageService.getItem('token');
        $scope.loggedUser = StorageService.getItem('user');
        $scope.openMenu = function($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };

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

    })

.controller('AuthCtrl', function($scope, $mdToast, $location, CONFIG, HttpService, Util, StorageService) {
    $scope.user = {}

    $scope.quotes = [{
        'name': 'Matt Cameron',
        'message': 'Live life to the fullest, and focus on the positive'
    }, {
        'name': 'Greg Anderson',
        'message': 'Focus on the journey, not the destination. Joy is found not in finishing an activity but in doing it.'
    }, {
        'name': 'Alexander Graham Bell',
        'message': `Concentrate all your thoughts upon the work at hand. The sun's rays do not burn until brought to a focus`
    }, {
        'name': 'Brian Tracy',
        'message': `The key to success is to focus our conscious mind on things we desire not things we fear`
    }, {
        'name': 'Gabby Douglas',
        'message': `It's very tough for me to focus. I'm like: 'Look, something shiny! No, focus. Oh, there goes a butterfly!`
    }]

    var counter = 0;
    $scope.quote = $scope.quotes[counter];
    setInterval(function() {
        counter += 1;
        if (counter > 4) {
            counter = 0;
        }
        $scope.quote = $scope.quotes[counter];
        $scope.$apply();
    }, 15000);


    $scope.login = function() {
        Util.toast("Authorization in progress");
        HttpService.post('/auth/login/', $scope.user, function(response) {
            if (response.data) {
                StorageService.setItem('token', response.data.token);
                StorageService.setItem('user', response.data.user);
                document.location.href = '/';
            }
            Util.toast('Unable to complete login process');
        }, function(response) {
            Util.toast('Incorrect User credential');
        })
    }

    $scope.logout = function() {
        Util.logout();
    }

    $scope.newAccount = function() {
        if ($scope.user
            .password != $scope.user.confirmPassword) {
            Util.toast("Password mismatch");
            return false
        }
        Util.toast("Creating account...");
        HttpService.post('/auth/register/', $scope.user, function(response) {
            if (response.data) {
                $scope.login();
                return false;
            }
            Util.toast('Unable to complete registration');
        }, function(response) {
            if (response.data && response.data.username) {
                Util.toast(response.data.username[0]);
            } else {
                Util.toast('Unable to complete registration');
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
            bucketlist_id = $scope.bucketlists[index].id;
            $scope.activeId = bucketlist_id;
            Util.broadcast(bucketlist_id, $scope.bucketlists[index].name);
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
            BucketlistService.delete(bucketlist_id, $scope);
        };

        $scope.getBucketlist = function(url) {
            BucketlistService.get(url, $scope);
        };

        $scope.saveBucketlist = function() {
            BucketlistService.save($scope);
        };

        $scope.toggleBucketListForm = function() {
            if ($scope.newBucketlist) {
                $scope.bucketlist = {};
            }
            $scope.newBucketlist = !$scope.newBucketlist;
        }

        $scope.getBucketlist('/bucketlists/');
    })
    .controller('BucketlistItemCtrl', function($scope, $timeout, BucketlistItemService, CONFIG) {
        $scope.items = [];
        $scope.item = {};
        $scope.next = false;
        $scope.previous = false;
        $scope.total = 0;
        $scope.bucketlist_name = '';
        $scope.bucketlist_id = 0;
        $scope.currentItemUrl = '';
        $scope.footer_text = 'Bucket List Items';

        $scope.newItem = function() {
            $scope.item = {};
            $scope.toggleRight();
        };

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
            BucketlistItemService.save($scope, true);
        };

        $scope.checkDone = function(index) {
            $scope.item = $scope.items[index];
            $timeout(function() {
                BucketlistItemService.save($scope);
            }, 200);

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
