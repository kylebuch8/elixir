(function () {
    'use strict';

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function link(scope, element, attrs) {
        var $toggle = element[0].querySelector('.toggle'),
            $thumb = element[0].querySelector('.thumb'),
            $bar = element[0].querySelector('.bar'),
            rgbColor = hexToRgb(attrs.toggleColor);

        function toggle() {
            $toggle.classList.toggle('active');

            if (scope.active) {
                $thumb.style.backgroundColor = attrs.toggleColor;
                $bar.style.backgroundColor = 'rgba(' + rgbColor.r + ', ' + rgbColor.g + ', ' + rgbColor.b + ', 0.4)';
            } else {
                $thumb.style.backgroundColor = null;
                $bar.style.backgroundColor = null;
            }
        }

        element[0].addEventListener('click', function () {
            scope.active = !scope.active;
        });

        scope.$watch('active', function () {
            if (scope.active !== undefined) {
                toggle();
            }
        });
    }

    function uiToggle() {
        return {
            restrict: 'AE',
            scope: {
                active: '='
            },
            template: '<div class="toggle">' +
                          '<div class="bar"></div>' +
                          '<div class="thumb-container">' +
                              '<div class="thumb"></div>' +
                          '</div>' +
                      '</div>',
            link: link
        };
    }

    angular.module('directives.toggle', [])
        .directive('uiToggle', uiToggle);
}());
