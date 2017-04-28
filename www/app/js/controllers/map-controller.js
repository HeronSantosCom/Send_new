/**
 * Created by juciano on 16/03/17.
 */
app.controller('mapCtrl', function ($rootScope, $scope, $location, mapsAPI, $cordovaGeolocation, NgMap) {
    $('#filter-modal').modal();
    $('#origin-modal').modal();
    $('#destination-modal').modal();
    $('#confirm-modal').modal();
    $('#travel-modal').modal();

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

        /*DISTANCE MATRIX */
        new google.maps.DistanceMatrixService().getDistanceMatrix({
            origins: ["Santa Catarina, Brasil"], // Origem (tem de ser um array)
            destinations: ["Santo André - SP, Brasil"], // (Destino '')
            travelMode: google.maps.TravelMode.DRIVING,
            avoidHighways: false,
            avoidTolls: false
        }, function (response) {
            $scope.distance = response;
        });

    $scope.confirmTravel = function (title,origin, destination) {
      mapsAPI.postTravel({
          title: title,
          origin: origin,
          destination: destination,
          id: $scope.user._id,
          notification: null,
          deliverymanId: '58e2e9b5f33e1a0d74bff1ad',
          status:'open',
          stars:0,
          payment :'open'
        }).then(function success (travel) {
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
    $scope.cancelTravel = function (id) {
        mapsAPI.cancelTravel({id:id, status:'canceled'}).then(function success () {
            mapsAPI.getTravels($rootScope.user._id).then(function success (travels) {
                $rootScope.user.travels = travels.data;
                $scope.$apply;
            })
        })
    };
    $scope.statusTravel = function (id,status) {
        mapsAPI.statusTravel({id:id, status:status}).then(function success () {
            mapsAPI.getTravels($rootScope.user._id).then(function success (travels) {
                $rootScope.user.travels = travels.data;
                $scope.$apply;
            })
        })
    };
    $scope.putStars = function(stars,id){
        mapsAPI.putStars({_id:id,stars:stars}).then(function success (star) {
            mapsAPI.getTravels($rootScope.user._id).then(function success (travels) {
                $rootScope.user.travels = travels.data;
                $scope.$apply;
            })
        })
    };
});
