/**
 * Created by juciano on 20/03/17.
 */

app.controller('deliveryManCtrl',function ($rootScope, $scope, userAPI, addressesAPI, $location, $routeParams, $cordovaGeolocation, mapsAPI) {

    $scope.getDelivery = function () {
        mapsAPI.getDelivery({id: $scope.user._id}).then(function success (deliveries) {
            $rootScope.user.deliveries = deliveries.data;
        })
    };
    $scope.putStatus = function () {
        mapsAPI.putDelivery({deliverymanId:$scope.user._id,status:'Fechado'}).then(function success (delivery) {
            $rootScope.user.deliveries.status = delivery.data.status;
        })
    }
});