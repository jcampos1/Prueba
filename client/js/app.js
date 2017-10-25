angular
	.module("myApp", ["satellizer", "ui.router"])
    .config(function($authProvider, $stateProvider, $urlRouterProvider) {
    	// Parametros de configuración
        $authProvider.loginUrl = "http://localhost:3000/auth/login";
        $authProvider.signupUrl = "http://localhost:3000/auth/signup";
        $authProvider.tokenName = "token";
        $authProvider.tokenPrefix = "myApp";

        // Configuración de las rutas/estados
        $stateProvider
        	.state("home", {
            	url: "/",
                templateUrl: "../views/index.html",
                controller: "HomeController"
            })
            .state("login", {
            	url: "/login",
                templateUrl: "../views/user/login.html",
                controller: "LoginController",
                controllerAs: "login"
            })
            .state("logout", {
            	url: "/logout",
                templateUrl: null,
                controller: "LogoutController"
            })
            .state("private", {
            	url: "/private",
                templateUrl: "../views/document/create.html",
                controller: "CreateController",
                controllerAs: "create"
            });

            $urlRouterProvider.otherwise('home');
    });