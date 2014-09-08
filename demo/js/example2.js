/** @jsx React.DOM */

;(function(window, document, angular, React, undefined) {
  'use strict';

  /* ANGULAR.JS */
  angular.module('app')
    .controller('NumberController', ['$scope', function($scope) {

      $scope.numbers = [];
      ($scope.numGen = function(){
        for(var i = 0; i < 5000; i++) {
          $scope.numbers[i] = Math.floor(Math.random() * (999999999999999 - 1)) + 1;
        }
      })();

    }]);

  /* REACT.JS */
  window.ex2 = React.createClass({displayName: 'ex2',

    render: function() {
      var rows = this.props.scope.ngModel.map(function(number) {
        return (
          React.DOM.tr(null, 
            React.DOM.td(null, number)
          )
        );
      });

      return (
        React.DOM.table(null, rows)
      );
    }
  });

})(window, document, angular, React);