angular.module('BucketlistControllers', [])
  .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log, $mdBottomSheet) {
      $scope.bucketlists = [
        'test 1',
        'test 2',
        'test 3',
        'test 4'
      ];
      $scope.openMenu = function($mdOpenMenu, ev) {
        $mdOpenMenu(ev);
      };

      $scope.clickTest = function(){
        alert(1)
      }
      $scope.toggleLeft = buildDelayedToggler('left');
      $scope.toggleRight = buildToggler('right');
      $scope.isOpenRight = function(){
        return $mdSidenav('right').isOpen();
      };
      /**
       * Supplies a function that will continue to operate until the
       * time is up.
       */
      function debounce(func, wait, context) {
        var timer;
        return function debounced() {
          var context = $scope,
              args = Array.prototype.slice.call(arguments);
          $timeout.cancel(timer);
          timer = $timeout(function() {
            timer = undefined;
            func.apply(context, args);
          }, wait || 10);
        };
      }
      /**
       * Build handler to open/close a SideNav; when animation finishes
       * report completion in console
       */
      function buildDelayedToggler(navID) {
        return debounce(function() {
          $mdSidenav(navID)
            .toggle()
            .then(function () {
              $log.debug("toggle " + navID + " is done");
            });
        }, 200);
      }
      function buildToggler(navID) {

        return function() {
          $mdSidenav(navID)
            .toggle()
            .then(function () {
              $log.debug("toggle " + navID + " is done");
            });
        }
      }
      $scope.showSocialButtons = function() {
        $mdBottomSheet.show({
          templateUrl: 'social-buttons.html',
          controller: 'SocialButtonsCtrl',
          clickOutsideToClose: true
        });
      };

      $scope.showRegisterForm = function() {
        $mdBottomSheet.show({
          templateUrl: 'register.html',
          controller: 'RegisterCtrl',
          clickOutsideToClose: true
        });
      };

      $scope.sideClick = function(){
        alert(1);
      };
    })

  .controller('SocialButtonsCtrl', function($scope, $mdBottomSheet) {

    $scope.listItemClick = function() {
      $mdBottomSheet.hide();
    };
  })

  .controller('RegisterCtrl', function($scope, $mdBottomSheet) {

  })
  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {

    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };

    $scope.newBucketlist = false;
    $scope.bucketListIcon = 'cancel';

    $scope.toggleBucketListForm = function(){
      $scope.newBucketlist = !$scope.newBucketlist;
    }
  })
  .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };
  });