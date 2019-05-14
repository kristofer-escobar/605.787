describe("FavoriteDishExist", function() {
  var $controller;
  var MenuService;
  var UserPreferenceService;
  var $httpBackend;
  var SignupController;
  var ApiPath;

  beforeEach(function() {
    module('public');

    inject(function($injector, _$controller_) {
      MenuService = $injector.get('MenuService');
      UserPreferenceService = $injector.get('UserPreferenceService');
      $httpBackend = $injector.get('$httpBackend');
      ApiPath = $injector.get('ApiPath');
      $controller = _$controller_;
    });

    SignupController = $controller('SignupController', {
      MenuService: MenuService,
      UserPreferenceService: UserPreferenceService
    });

    // itemsWithoutCookies = ['apples', 'pears', 'bananas'];
    // itemsWithCookies = ['bread', 'milk', 'Cookies'];
  });

  it("should be able to detect invalid menu item", function() {
    var shortName = 'ABCD';
    $httpBackend.whenGET(ApiPath + '/menu_items/' + shortName + '.json');

    SignupController.getMenuItem().then(function(response) {
      expect(response.data).toEqual(false);
    });

    $httpBackend.flush();
  });

  it("should be able to detect valid menu item", function() {
    var result = detectCookie(itemsWithCookies);
    expect(result).toBe(true);
  });
});
