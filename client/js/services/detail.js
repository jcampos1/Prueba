angular.module("myApp").factory('dt01', function($http, $log, $rootScope) {
  return {	
		find: function(vm) {
			return find(vm);
		},
		
		isValid: function(data) {
			return data!=null && data!=undefined;
		},
  };

  //Lista de documentos
  function find(vm) {
        $http.get('/api/documents')
        .success(function(data) {
            vm.docs = data;
            console.log(data)
        })
        .error(function(data) {
            $log.error('Error: ' + data);
        });
  }

  //creacion de documentos
  function create(vm) {
    $http.post('/api/documents', vm.doc)
    .success(function(data) {
        vm.doc = new Object();
        find(vm);
        console.log(data)
    })
    .error(function(data) {
        $log.error('Error: ' + data);
    });
}
});