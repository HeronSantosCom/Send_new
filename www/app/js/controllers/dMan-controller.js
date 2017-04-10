/**
 * Created by juciano on 20/03/17.
 */

app.controller('deliveryManCtrl',function ($rootScope, $scope, userAPI, addressesAPI, $location, $routeParams, $cordovaGeolocation, mapsAPI) {

    $scope.getDelivery = function () {
        mapsAPI.getDelivery({id: $scope.user._id}).then(function success (deliveries) {
            $rootScope.user.deliveries = deliveries.data;
        })
    };
    $scope.putStatus = function (id) {
        mapsAPI.putDelivery({deliveryId:id,status:'inProgress'}).then(function success (delivery) {
            $rootScope.user.deliveries.status = delivery.data.status;
        })
    };
    //$scope.$apply(function($rootScope, $scope, userAPI, $location, addressesAPI, mapsAPI) {

       // userAPI.login({phone: $rootScope.user.phone, password: $rootScope.user.password}).then(function success (user) {
          //      $rootScope.user = user.data;
           //     $rootScope.user.config = {notifications: true, statistics: true};
             //   addressesAPI.getUser(user.data._id).then(function success (addresses) {
               //     $rootScope.user.addresses = addresses.data;
                 //   mapsAPI.getTravels(user.data._id).then(function success (travels) {
                   //     $rootScope.user.travels = travels.data;
                     //   $scope.storage.setItem('logged', JSON.stringify(user.data));
                       // if(user.data.deliveryman===true){
                         //   $scope.storage.setItem('deliveryman', JSON.stringify(user.data));
                         //   mapsAPI.getDelivery(user.data._id).then(function success (deliveries) {
                           ///     $rootScope.user.deliveries = deliveries.data;
                           //
    // })
                       // }
                   //     else $scope.storage.setItem('user', JSON.stringify(user.data));
                 //       $location.path('/');
                  //  });
               // });
       // });
   // });
});