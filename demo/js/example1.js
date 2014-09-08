/** @jsx React.DOM */

;(function(window, document, angular, React, undefined) {
  'use strict';

  /* ANGULAR.JS */
  angular.module('app')

    .controller('MainController', [ '$rootScope', '$scope', function($rootScope, $scope) {

      $scope.text = 'This is set in Angular';

      $scope.destroy = function() {
        $scope.$destroy();
        alert('Scope has been destroyed (which we listen for and unmount the react component). This was called from within the React component');
      }
    }]);

  /* REACT.JS */
  window.ex1 = React.createClass({displayName: 'ex1',

    render: function(){
      console.log(this.props.scope);
      return (
        React.DOM.div(null, 
          React.DOM.input({type: "text", value: this.props.scope.ngModel, onChange: this.handleChange}), 
          React.DOM.button({onClick: this.deleteScope}, "Destroy Scope"), 
          React.DOM.p(null, this.props.scope.ngModel)
        )
        )
    },

    handleChange: function(event) {
      var _this = this;
      this.props.scope.$apply(function() {
        _this.props.scope.ngModel = event.target.value;
      });
    },

    deleteScope: function(event) {
      this.props.scope.$parent.destroy();
    }

  });

})(window, document, angular, React);