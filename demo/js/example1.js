/** @jsx React.DOM */

;(function(window, document, angular, React, undefined) {
  'use strict';

  /* ANGULAR.JS */
  angular.module('demo', ['ngComponent'])
    .controller('EX1Controller', [ '$rootScope', '$scope', function($rootScope, $scope) {
      $scope.demo = {};
      $scope.demo.message = 'This is set in Angular';

      $scope.handleChange = function() {
        $rootScope.$broadcast('render-content');
      };
    }]);

  /* REACT.JS */
  window.fittext = React.createClass({displayName: 'fittext',
    handleChange: function(event) {
      /* React */
      this.forceUpdate();

      /* Angular */
      var _this = this;
      this.props.scope.$apply(function() {
        _this.props.scope.ngModel = event.target.value;
      });
    },

    render: function(){
      return (
        React.DOM.div(null, 
          React.DOM.p(null, React.DOM.strong(null, "this.props.scope.ngModel: "), this.props.scope.ngModel), 
          React.DOM.input({type: "text", value: this.props.scope.ngModel, onChange: this.handleChange})
        )
      )
    }
  });

})(window, document, angular, React);