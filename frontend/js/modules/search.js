'use strict';

angular.module('esn.search', ['esn.application-menu', 'op.dynamicDirective', 'angularMoment'])
  .constant('SIGNIFICANT_DIGITS', 3)
  .constant('defaultSpinnerConfiguration', {
    spinnerKey: 'spinnerDefault',
    spinnerConf: {lines: 17, length: 15, width: 7, radius: 33, corners: 1, rotate: 0, direction: 1, color: '#555', speed: 1, trail: 60, shadow: false, hwaccel: false, className: 'spinner', zIndex: 2e9, top: 'auto', left: 'auto'}
  })
  .config(function(dynamicDirectiveServiceProvider) {
    var search = new dynamicDirectiveServiceProvider.DynamicDirective(true, 'application-menu-search', {priority: 34}); // after 35 of contact
    dynamicDirectiveServiceProvider.addInjection('esn-application-menu', search);
  })
  .directive('applicationMenuSearch', function(applicationMenuTemplateBuilder) {
    return {
      retrict: 'E',
      replace: true,
      template: applicationMenuTemplateBuilder('/#/search', 'mdi-magnify', 'Search')
    };
  })
  .directive('searchForm', function(defaultSpinnerConfiguration) {
    return {
      restrict: 'E',
      controller: function($scope) {
        $scope.spinnerKey = angular.isDefined($scope.spinnerKey) ? $scope.spinnerKey : defaultSpinnerConfiguration.spinnerKey;
        $scope.spinnerConf = angular.isDefined($scope.spinnerConf) ? $scope.spinnerConf : defaultSpinnerConfiguration.spinnerConf;
      },
      templateUrl: '/views/modules/search/searchForm.html'
    };
  })
  .factory('searchResultSizeFormatter', function(SIGNIFICANT_DIGITS) {
    return function(count) {

      if (!count) {
        return {
          hits: 0,
          isFormatted: false
        };
      }

      var searchResultFormattingLimit = Math.pow(10, SIGNIFICANT_DIGITS);

      if (count < searchResultFormattingLimit) {
        return {
          hits: count,
          isFormatted: false
        };
      }

      var len = Math.ceil(Math.log(count + 1) / Math.LN10);
      return {
        hits: Math.round(count * Math.pow(10, -(len - SIGNIFICANT_DIGITS))) * Math.pow(10, len - SIGNIFICANT_DIGITS),
        isFormatted: true
      };
    };
  })
  .controller('searchSidebarController', function($scope) {
    $scope.filters = [
      'All',
      'Events',
      'Mails',
      'Members',
      'Communities'
    ];
  })
  .controller('searchResultController', function($scope, moment) {
    $scope.groupedElements = [
      {
        name: 'Events',
        elements: [{
          title: 'Meeting with some people',
          start: moment(),
          end: moment().add(1, 'hour'),
          location: 'somewhere',
          templateUrl: '/calendar/views/components/event-search-item'
        }]
      },
      {
        name: 'Contacts',
        elements: [{
          displayName: 'Leigh Rafe'
        }]
      }
    ];
    $scope.infiniteScrollCompleted = true;
  });
