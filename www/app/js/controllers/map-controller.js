/**
 * Created by juciano on 16/03/17.
 */
app.controller('mapCtrl', function ($rootScope, $scope, $location, mapsAPI, $cordovaGeolocation, NgMap) {
    $('#filter-modal').modal();
    $('#origin-modal').modal();
    $('#destination-modal').modal();
    $('#confirm-modal').modal();
    $cordovaGeolocation.getCurrentPosition({timeout: 10000, enableHighAccuracy: false}).then(function (position) {
        $rootScope.user.location = [position.coords.latitude, position.coords.longitude];
        mapsAPI.get({lat: position.coords.latitude, lng: position.coords.longitude}).then(function success (address) {
            $scope.origin = address.data.results[0].formatted_address;
        });
    }, function (err) {
        Materialize.toast('Impossível obter sua localização.', 2000);
    });
    NgMap.getMap().then(function (map) {
        $scope.map = map;
    });
    $scope.confirmTravel = function (title,origin, destination) {
        mapsAPI.postTravel({title: title, origin: origin, destination: destination, id: $scope.user._id, notification: null, deliverymanId: '58d7448b3388c105b67e20a4',status:'open'}).then(function success (travel) {
            $rootScope.user.travels.push(travel.data);
            if ($rootScope.user.deliveryman==true) $scope.storage.setItem('deliveryman', JSON.stringify($scope.user));
            else $scope.storage.setItem('user', JSON.stringify($scope.user));
            Materialize.toast('Requisitando o entregador mais próximo.', 2000);
        });
    };
    $scope.updateLocation = function () {
        $cordovaGeolocation.getCurrentPosition({timeout: 10000, enableHighAccuracy: false}).then(function (position) {
            $scope.map.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
        }, function (err) {
            Materialize.toast('Impossível obter sua localização.', 2000);
        });
    };
});
