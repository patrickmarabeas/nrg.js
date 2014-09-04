/* ng-Component.js v1.0.0
 * https://github.com/patrickmarabeas/ng-Component.js
 *
 * Copyright 2014, Patrick Marabeas http://marabeas.io
 * Released under the MIT license
 * http://opensource.org/licenses/mit-license.php
 *
 * Date: 03/09/2014
 */

;(function(window, document, angular, React, undefined) {
  'use strict';

  angular.module('ngComponent', [])

    .value('config', {
      'check': 'dirty'
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

    .directive('component', ['$timeout', 'config', 'ComponentFactory', function($timeout, config, ComponentFactory) {
      return {
        restrict: 'EA',
        scope: {
          ngModel: '='
        },
        link: function(scope, element, attrs) {
          config.check = attrs.check || config.check;
          config.namespace = attrs.namespace || undefined;
          config.attributes = {};
          angular.forEach(element[0].attributes, function(a) {
            config.attributes[a.name] = a.value;
          });

          ComponentFactory.render(config.namespace, attrs.component, element, scope, config.attributes);

          switch(config.check) {
            case 'dirty':
              scope.$watch('ngModel', function() {
                ComponentFactory.render(config.namespace, attrs.component, element, scope, config.attributes);
              });
              break;

            case 'listen':
              scope.$on('render-' + attrs.id, function() {
                /* timeout required because: ... */
                $timeout(function() {
                  ComponentFactory.render(config.namespace, attrs.component, element, scope, config.attributes);
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