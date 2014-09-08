/* nrg.js v1.0.0
 * https://github.com/patrickmarabeas/nrg.js
 *
 * Copyright 2014, Patrick Marabeas http://marabeas.io
 * Released under the MIT license
 * http://opensource.org/licenses/mit-license.php
 *
 * Date: 08/09/2014
 */

;(function(window, document, angular, React, undefined) {
  'use strict';

  angular.module('nrg', [])

    .value('config', {
      'renderOn': 'watch'
    })

    .factory('ComponentFactory', [function() {
      return {
        render: function(namespace, component, element, scope, attrs) {
          if(namespace) {
            React.renderComponent(window[namespace][component]({
              scope: scope,
              attrs: attrs
            }), element[0]);
          } else {
            React.renderComponent(window[component]({
              scope: scope,
              attrs: attrs
            }), element[0]);
          }
        },
        unmount: function(element) {
          React.unmountComponentAtNode(element[0]);
        }
      }
    }])

    .directive('component', ['$controller', '$timeout', 'config', 'ComponentFactory', function($controller, $timeout, config, ComponentFactory) {
      return {
        restrict: 'EA',
        controller: function($scope, $element, $attrs){
          return ($attrs.ctrl)
            ? $controller($attrs.ctrl, {$scope:$scope, $element:$element, $attrs:$attrs})
            : null;
        },
        scope: {
          ngModel: '='
        },
        link: function(scope, element, attrs) {
          config.renderOn = attrs.check || config.renderOn;
          config.namespace = attrs.namespace || undefined;
          var attributes = {};
          angular.forEach(element[0].attributes, function(a) {
            attributes[a.name.replace('data-','')] = a.value;
          });

          ComponentFactory.render(config.namespace, attrs.component, element, scope, attributes);

          switch(config.renderOn) {
            case 'watch':
              scope.$watch('ngModel', function() {
                ComponentFactory.render(config.namespace, attrs.component, element, scope, attributes);
              }, true);
              break;

            case 'listen':
              /* requires the element to have an ID set */
              scope.$on('render-' + attrs.id, function() {
                /* timeout required to push the render to bottom of stack - after scope is updated */
                $timeout(function() {
                  ComponentFactory.render(config.namespace, attrs.component, element, scope, attributes);
                });
              });
              break;
          }

          scope.$on('$destroy', function () {
            ComponentFactory.unmount(element);
          });
        }
      }
    }]);

})(window, document, angular, React);