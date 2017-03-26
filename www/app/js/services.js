app.factory('userAPI', function ($http) {
    var _post = function (data) {
        return $http.post('http://appsend.com.br:21291/users', data);
    };
    var _login = function (data) {
        return $http.post('http://appsend.com.br:21291/users/login', data);
    };
    var _verify = function (data) {
        return $http.post('http://appsend.com.br:21291/users/verify', data);
    };
    var _putName = function (data) {
        return $http.put('http://appsend.com.br:21291/users/put-name', data);
    };
    var _putPhoto = function (data) {
        return $http.put('http://appsend.com.br:21291/users/put-photo', data);
    };
    var _delete = function (data) {
        return $http.post('http://appsend.com.br:21291/users/delete-verify', data);
    };
    var _putPassword = function (data) {
        return $http.put('http://appsend.com.br:21291/users/password', data);
    };
    var _putLicenseplate = function (data) {
        return $http.put('http://appsend.com.br:21291/users/put-licenseplate', data);
    };
    var _putAccount = function (data) {
        return $http.put('http://appsend.com.br:21291/users/put-account', data);
    };
    return {
        post: _post,
        login: _login,
        verify: _verify,
        putName: _putName,
        putPhoto: _putPhoto,
        delete: _delete,
        putPassword: _putPassword,
        putLicenseplate: _putLicenseplate,
        putAccount: _putAccount,
    };
});
app.factory('addressesAPI', function ($http) {
    var _post = function (data) {
        return $http.post('http://appsend.com.br:21291/users/addresses', data);
    };
    var _get = function (id) {
        return $http.get('http://appsend.com.br:21291/addresses/' + id);
    };
    var _delete = function (id) {
        return $http.delete('http://appsend.com.br:21291/user/addresses/' + id);
    };
    var _getUser = function (id) {
        return $http.get('http://appsend.com.br:21291/users/addresses/' + id);
    };
    var _put = function (data) {
        return $http.put('http://appsend.com.br:21291/users/addresses', data);
    };
    return {
        post: _post,
        get: _get,
        delete: _delete,
        getUser: _getUser,
        put: _put
    };
});
app.factory('mapsAPI', function ($http) {
    var _get = function (data) {
        return $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + data.lat + ',' + data.lng + 'key=AIzaSyDkLeCftQZdCwIdfLDkbFTkx4yPcArwUJk');
    };
    var _postTravel = function (data) {
        return $http.post('http://appsend.com.br:21291/travels', data);
    };
    var _getTravels = function (id) {
        return $http.get('http://appsend.com.br:21291/travels/' + id);
    };
    var _getDelivery = function (id) {
        return $http.get('http://appsend.com.br:21291/delivery/' + id);
    };
    var _putDelivery = function (data) {
        return $http.get('http://appsend.com.br:21291/delivery/put-status', data);
    };
    return {
        get: _get,
        postTravel: _postTravel,
        getTravels: _getTravels,
        getDelivery: _getDelivery,
        putDelivery: _putDelivery
    };
});
app.factory('deliverySearch', function ($http) {
    var _getDeliveryman = function (data) {
        return $http.get('http://appsend.com.br:21291/deliveryman',data);
    };
    return {
        getDeliveryman: _getDeliveryman
    };
});
