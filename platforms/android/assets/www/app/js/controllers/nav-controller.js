/**
 * Created by juciano on 16/03/17.
 */
app.controller('navCtrl', function ($rootScope, $scope, $location) {
    $scope.logout = function () {
        $rootScope.user = null;
        $scope.storage.removeItem('user');
        $location.path('/login');
    };
    $scope.goBack = function () {
        window.history.back();
    };
});
