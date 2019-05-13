(function () {
  'use strict';

  angular.module('public')
  .controller('InfoController', InfoController);

  InfoController.$inject = ['MenuService', 'UserPreferenceService'];
  function InfoController(MenuService, UserPreferenceService) {
    var ctrl = this;
    ctrl.menuNumberInvalid = false;
    ctrl.saved = false;
    ctrl.userPreferences = UserPreferenceService.getUserPreferences();

    if (ctrl.userPreferences) {
      MenuService.getMenuItem(ctrl.userPreferences.favDish)
      .then(function (menuItem) {
        ctrl.favMenuItem = menuItem;
      })
    }
  }
}) ()