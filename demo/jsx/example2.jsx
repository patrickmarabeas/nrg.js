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
  window.ex2 = React.createClass({

    render: function() {
      var rows = this.props.scope.ngModel.map(function(number) {
        return (
          <tr>
            <td>{number}</td>
          </tr>
        );
      });

      return (
        <table>{rows}</table>
      );
    }
  });

})(window, document, angular, React);