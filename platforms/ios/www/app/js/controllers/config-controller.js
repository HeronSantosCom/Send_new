/**
 * Created by juciano on 16/03/17.
 */
app.controller('configCtrl', function ($rootScope, $scope, userAPI, addressesAPI, $location, $routeParams, $cordovaGeolocation, mapsAPI) {
    $('#home-config-modal').modal();
    $('#work-config-modal').modal();
    $('#success-config-modal').modal();
    if ($routeParams.address_id) {
        addressesAPI.get($routeParams.address_id).then(function success (address) {
            $scope.address = address.data;
            $scope.addressEdit = address.data;
        });
    };

    $scope.updateConfig = function (item, value) {
        $rootScope.user.config[item] = value;
        $scope.storage.setItem('logged', JSON.stringify($scope.user));
    };
    $scope.deleteAccount = function (phone, password) {
        userAPI.delete({id: $scope.user._id, phone: phone, password: password}).then(function success (err) {
            if (err.data) {
                Materialize.toast('Número de telefone ou senha estão incorretos.', 2000);
            } else {
                $rootScope.user = null;
                $scope.storage.removeItem('logged');
                $scope.storage.removeItem('user');
                $scope.storage.removeItem('deliveryman');
                $location.path('/login');
            };
        });
    };
    $scope.putPassword = function (currentPassword, newPassword) {
        userAPI.putPassword({currentPassword: currentPassword, newPassword: newPassword, id: $scope.user._id}).then(function success (user) {
            if (user.data === 'error') {
                Materialize.toast('Senha inserida está incorreta.', 2000);
            } else {
                $rootScope.user.password = user.data.password;
                $scope.storage.setItem('logged', JSON.stringify($scope.user));
                Materialize.toast('Senha atualizada com sucesso.', 2000);
                $location.path('/user');
            };
        });
    };
    $scope.triggerUploadPhoto = function () {
        $('#profile-img-upload').trigger('click');
    };
    $scope.uploadPhoto = function (photo) {
        $rootScope.profilePhoto = 'data:image/png;base64,' + photo.base64;
        $location.path('/crop-profile-photo');
    };
    $scope.updatePhoto = function (photo) {
        $('#loading-modal').modal('open');
        userAPI.putPhoto({id: $scope.user._id, photo: photo}).then(function success (user) {
            $rootScope.user.photo = user.data.photo;
            $scope.storage.setItem('logged', JSON.stringify($scope.user));
            Materialize.toast('Foto atualizada com sucesso.', 2000);
            $('#loading-modal').modal('close');
            $location.path('/user');
        });
    };
    $scope.openHomeConfig = function () {
        $('#loading-modal').modal('open');
        $cordovaGeolocation.getCurrentPosition({timeout: 10000, enableHighAccuracy: false}).then(function (position) {
            mapsAPI.get({lat: position.coords.latitude, lng: position.coords.longitude}).then(function success (address) {
                $scope.home = address.data.results[0].formatted_address;
                $('#loading-modal').modal('close');
                $('#home-config-modal').modal('open');
            });
        }, function (err) {
            $('#loading-modal').modal('close');
            Materialize.toast('Impossível obter sua localização.', 2000);
            $('#home-config-modal').modal('open');
        });
    };
    $scope.updateName = function (name) {
        userAPI.putName({name: name, id: $scope.user._id}).then(function success (user) {
            $rootScope.user.name = user.data.name;
            $scope.storage.setItem('logged', JSON.stringify($scope.user));
            Materialize.toast('Nome atualizado com sucesso.', 2000);
        });
    };
    $scope.updateAddress = function (name, address, id) {
        addressesAPI.put({name: name, address: address, id: id, userId: $scope.user._id}).then(function success (addresses) {
            $rootScope.user.addresses = addresses.data;
            $scope.storage.setItem('logged', JSON.stringify($scope.user));
            Materialize.toast('Endereço alterado.', 2000);
            $location.path('/addresses');
        });
    };
    $scope.postAddress = function (name, address, dontRedirect) {
        addressesAPI.post({name: name, address: address, id: $scope.user._id}).then(function success (address) {
            $rootScope.user.addresses.push(address.data);
            $scope.storage.setItem('logged', JSON.stringify($scope.user));
            Materialize.toast('Endereço adicionado.', 2000);
            if (!dontRedirect) {
                $location.path('/addresses');
            };
        });
    };
    $scope.deleteAddress = function (id) {
        addressesAPI.delete(id).then(function success (addresses) {
            $rootScope.user.addresses = addresses.data;
            $scope.storage.setItem('logged', JSON.stringify($scope.user));
            Materialize.toast('Endereço removido.', 2000);
        });
    };
    $scope.getAddress = function (id) {
        addressesAPI.get(id).then(function success(addresses) {
            $rootScope.user.addresses = addresses.data;
        })
    }
    $scope.deliveryMan = function(termos,licenseplate){
        userAPI.putLicenseplate({licenseplate:licenseplate,id:$scope.user._id}).then(function success(user){
            userAPI.putAccount({deliveryman:termos,id:$scope.user._id}).then(function success(user) {
                $rootScope.user = user.data;
                $scope.storage.setItem('logged', JSON.stringify($scope.user));
                Materialize.toast('Você é um entregador!.', 2000);
            })
        })
    }
});
