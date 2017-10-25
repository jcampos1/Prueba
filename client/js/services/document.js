angular.module("myApp").factory('ds01', function($http, $log, $rootScope) {
  return {	
		find: function(vm) {
			return find(vm);
        },
        create: function(vm) {
			return create(vm);
		},
		
		isValid: function(data) {
			return data!=null && data!=undefined;
		},
  };

  //Lista de documentos
  function find(vm) {
        return $http.get('/api/documents');
  }

  //Creacion
  function create(vm) {
        return $http.post('/api/documents', {doc: vm.doc, dets: JSON.stringify(vm.dets)});
  }
});