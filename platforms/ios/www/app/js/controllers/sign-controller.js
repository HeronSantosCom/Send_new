/**
 * Created by juciano on 16/03/17.
 */
app.controller('signCtrl', function ($rootScope, $scope, userAPI, $location, addressesAPI, mapsAPI , $cordovaGeolocation) {
    $scope.login = function (phone, password) {
        userAPI.login({phone: phone, password: password}).then(function success (user) {
            if (user.data === 'error') {
                Materialize.toast('Número de telefone ou senha estão incorretos.', 2000);
            } else {
                $rootScope.user = user.data;
                $rootScope.user.config = {notifications: true, statistics: true};
                addressesAPI.getUser(user.data._id).then(function success (addresses) {
                    $rootScope.user.addresses = addresses.data;
                    mapsAPI.getTravels(user.data._id).then(function success (travels) {
                        $rootScope.user.travels = travels.data;
                        $scope.storage.setItem('logged', JSON.stringify(user.data));
                        if(user.data.deliveryman===true)$scope.storage.setItem('deliveryman', JSON.stringify(user.data));
                        else $scope.storage.setItem('user', JSON.stringify(user.data));
                        $location.path('/');
                    });
                });
            };
        });
    };
    $scope.register = function (name, email, phone, password) {
        userAPI.verify({email: email, phone: phone}).then(function success (err) {
            if (err.data === 'invalid-phone') {
                Materialize.toast('Este número de telefone já está cadastrado.', 2000);
            } else {
                if (err.data === 'invalid-email') {
                    Materialize.toast('Este endereço de e-mail já está cadastrado.', 2000);
                } else {
                    userAPI.post({licenseplate:'AAAAAA',name: name, email: email, phone: phone, password: password,deliveryman:false}).then(function success (user) {
                        $rootScope.user = user.data;
                        $rootScope.user.config = {notifications: true, statistics: true};
                        $rootScope.user.addresses = [];
                        $rootScope.user.travels = [];
                        $scope.storage.setItem('user', JSON.stringify(user.data));
                        $scope.storage.setItem('logged', JSON.stringify(user.data));
                        $location.path('/first-config');
                    });
                };
            };
        });
    };
});