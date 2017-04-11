app.config(function ($routeProvider) {
	$routeProvider.when('/', {
		cache:false,
		templateUrl: 'view/map.html',
		controller: 'mapCtrl',
		resolve: {
			session: function ($rootScope, $location) {
                if (!$rootScope.storage.getItem('logged')) $location.path('/login');
			}
		}
	});
	$routeProvider.when('/login', {
		templateUrl: 'view/login.html',
		controller: 'signCtrl',
		resolve: {
			session: function ($rootScope, $location) {
				if ($rootScope.storage.getItem('logged')) $location.path('/');
			}
		}
	});
	$routeProvider.when('/register', {
		templateUrl: 'view/register.html',
		controller: 'signCtrl',
		resolve: {
			session: function ($rootScope, $location) {
				if ($rootScope.storage.getItem('logged')) $location.path('/');
			}
		}
	});
	$routeProvider.when('/first-config', {
		cache: false,
		templateUrl: 'view/first-config.html',
		controller: 'configCtrl',
		resolve: {
			session: function ($rootScope, $location) {
				if (!$rootScope.storage.getItem('logged')) $location.path('/login');
			}
		}
	});
	$routeProvider.when('/settings', {
        cache: false,
        templateUrl: 'view/settings.html',
		controller: 'configCtrl',
		resolve: {
			session: function ($rootScope, $location) {
				if (!$rootScope.storage.getItem('logged')) $location.path('/login');
			}
		}
	});
	$routeProvider.when('/user', {
        cache: false,
        templateUrl: 'view/user.html',
		controller: 'configCtrl',
		resolve: {
			session: function ($rootScope, $location) {
				if (!$rootScope.storage.getItem('logged')) $location.path('/login');
			}
		}
	});
	$routeProvider.when('/addresses', {
        cache: false,
        templateUrl: 'view/addresses.html',
		controller: 'configCtrl',
		resolve: {
			session: function ($rootScope, $location) {
				if (!$rootScope.storage.getItem('logged')) $location.path('/login');
			}
		}
	});
	$routeProvider.when('/add-address', {
        cache: false,
        templateUrl: 'view/add-address.html',
		controller: 'configCtrl',
		returnEnabled: true,
		resolve: {
			session: function ($rootScope, $location) {
				if (!$rootScope.storage.getItem('logged')) $location.path('/login');
			}
		}
	});
	$routeProvider.when('/edit-address/:address_id', {
        cache: false,
        templateUrl: 'view/edit-address.html',
		controller: 'configCtrl',
		returnEnabled: true,
		resolve: {
			session: function ($rootScope, $location) {
				if (!$rootScope.storage.getItem('logged')) $location.path('/login');
			}
		}
	});
	$routeProvider.when('/crop-profile-photo', {
        cache: false,
        templateUrl: 'view/crop-profile-photo.html',
		controller: 'configCtrl',
		returnEnabled: true,
		resolve: {
			session: function ($rootScope, $location) {
				if (!$rootScope.storage.getItem('logged')) $location.path('/login');
			},
			photo: function ($rootScope, $location) {
				if (!$rootScope.profilePhoto) $location.path('/user');
			}
		}
	});
	$routeProvider.when('/delete-account', {
        cache: false,
        templateUrl: 'view/delete-account.html',
		controller: 'configCtrl',
		returnEnabled: true,
		resolve: {
			session: function ($rootScope, $location) {
				if (!$rootScope.storage.getItem('logged')) $location.path('/login');
			}
		}
	});
	$routeProvider.when('/change-password', {
        cache: false,
        templateUrl: 'view/change-password.html',
		controller: 'configCtrl',
		returnEnabled: true,
		resolve: {
			session: function ($rootScope, $location) {
				if (!$rootScope.storage.getItem('logged')) $location.path('/login');
			}
		}
	});
	$routeProvider.when('/route', {
        cache: false,
        templateUrl: 'view/route.html',
		controller: 'mapCtrl',
		returnEnabled: true,
		resolve: {
			session: function ($rootScope, $location) {
				if (!$rootScope.storage.getItem('logged')) $location.path('/login');
			}
		}
	});
	$routeProvider.when('/travels', {
        cache: false,
        templateUrl: 'view/travels.html',
		controller: 'configCtrl',
		resolve: {
			session: function ($rootScope, $location) {
				if (!$rootScope.storage.getItem('logged')) $location.path('/login');
			}
		}
	});
	$routeProvider.when('/edit-address', {
        cache: false,
        templateUrl: 'view/edit-address.html',
		controller: 'configCtrl',
		resolve: {
			session: function ($rootScope, $location) {
				if (!$rootScope.storage.getItem('logged')) $location.path('/login');
			}
		}
	});
    $routeProvider.when('/up-account',{
        cache: false,
        templateUrl:'view/up-account.html',
        controller:'configCtrl',
        resolve:{
            session: function ($rootScope, $location){
                if (!$rootScope.storage.getItem('logged')) $location.path('/login');
            }
        }
    });
    $routeProvider.when('/deliveries',{
        cache: false,
        templateUrl:'view/deliveries.html',
        controller:'deliveryManCtrl',
        resolve:{
            session: function ($rootScope, $location){
                if (!$rootScope.storage.getItem('deliveryman')) $location.path('/login');
            }
        }
    });
});
app.config(function ($httpProvider) {
	$httpProvider.interceptors.push('errorInterceptor');
});
app.config(function ($compileProvider) {
	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|local|data):/);
});