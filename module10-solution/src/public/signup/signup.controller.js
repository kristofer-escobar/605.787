(function () {
  'use strict';

  angular.module('public')
  .controller('SignupController', SignupController);

  SignupController.$inject = ['MenuService', 'UserPreferenceService'];
  function SignupController(MenuService, UserPreferenceService) {
    var ctrl = this;
    ctrl.user = {};
    ctrl.menuNumberInvalid = false;
    ctrl.saved = false;

    ctrl.getMenuItem = function (shortName) {
      if (shortName) {
        return MenuService.getMenuItem(shortName)
        .then(function () {
          ctrl.menuNumberInvalid = false;
        }).catch(function () {
          ctrl.menuNumberInvalid = true;
        });;
      }

      ctrl.menuNumberInvalid = false;
    };

    ctrl.submit = function (form) {
      ctrl.getMenuItem(ctrl.user.favDish)
      .then(function () {
        UserPreferenceService.setUserPreferences(ctrl.user);
        ctrl.saved = true;
        form.$setPristine();
      }).catch(function () {
        ctrl.saved = false;
      });
    };
  }
}) ()