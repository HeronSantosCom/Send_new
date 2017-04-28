/**
 * Created by juciano on 20/03/17.
 */

app.controller('deliveryManCtrl',function ($rootScope, $scope, userAPI, addressesAPI, $location, $routeParams, $cordovaGeolocation, mapsAPI) {

    $scope.putStatus = function (id,status) {
        mapsAPI.putDelivery({deliveryId:id,status:status}).then(function success () {
            mapsAPI.getDelivery($rootScope.user._id).then(function success (deliveries) {
                $rootScope.user.deliveries = deliveries.data;
                $scope.$apply;
            })
        })
    };
});
