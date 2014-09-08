;(function(window, document, angular, undefined) {
  'use strict';
  angular.module('app', ['nrg'])

    .controller('InjectedController', [ '$scope', function($scope) {
      $scope.ThisFunctionIsOnTheScope = function() {

      }
    }])

})(window, document, angular);