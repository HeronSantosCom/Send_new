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
        mapsAPI.postTravel({title: title, origin: origin, destination: destination, id: $scope.user._id,notification:null,orderOld:false}).then(function success (travel) {
            $rootScope.user.travels.push(travel.data);
            $scope.storage.setItem('logged', JSON.stringify($scope.user));
            $('#loading-modal').modal('open');
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
