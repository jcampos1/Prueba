angular
	.module("myApp")
    .controller("SignUpController", SignUpController)
    .controller("LoginController", LoginController)
    .controller("LogoutController", LogoutController);
    
function SignUpController($auth, $location) {
	var vm = this;
    this.signup = function() {
    	$auth.signup({
        	email: vm.email,
            password: vm.password
        })
        .then(function() {
        	// Si se ha registrado correctamente,
            // Podemos redirigirle a otra parte
            $location.path("/private");
        })
        .catch(function(response) {
        	// Si ha habido errores, llegaremos a esta función
        });
    }
}

function LoginController($auth, $location, $log, $http) {
    var vm = this;
    this.login = function(){
    	$auth.login({
        	username: vm.username,
            password: vm.password
        })
        .then(function(data){
            $log.info("Respuesta", data);
            $http.get("/sales");
            $location.path("/document")
            //$location.path("/private")
        })
        .catch(function(response){
            
        	// Si ha habido errores llegamos a esta parte
        });
    }
}

function LogoutController($auth, $location) {
	$auth.logout()
    	.then(function() {
        	// Desconectamos al usuario y lo redirijimos
            $location.path("/")
        });
}