angular.module("myApp").factory('ut01', function($http, $log, $rootScope) {
    return {
        generateId: function(array){
            return generateId(array);
        }
    }

    //Se genera el id de la entidad
    function generateId(array) {
        var id = 1;
        if(array.length > 0) {
            id = array[array.length-1].document_id+1;
        }
        return id;
    }
});
