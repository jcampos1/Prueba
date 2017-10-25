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
                templateUrl: "client/views/home.html",
                controller: "HomeController"
            })
            .state("login", {
            	url: "/login",
                templateUrl: "client/views/user/login.html",
                controller: "LoginController",
                controllerAs: "login"
            })
            .state("logout", {
            	url: "/logout",
                templateUrl: null,
                controller: "LogoutController"
            })
            .state("document", {
            	url: "/document",
                templateUrl: "client/views/document/list.html",
                controller: "DocumentController",
                controllerAs: "vm"
            })
            .state("documentNew", {
            	url: "/document/new",
                templateUrl: "client/views/document/new.html",
                controller: "DocumentNewController",
                controllerAs: "vm"
            });

            $urlRouterProvider.otherwise('home');
    });