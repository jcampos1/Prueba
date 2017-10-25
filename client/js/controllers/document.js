angular
	.module("myApp")
    .controller("DocumentController", DocumentController);
    
function DocumentController(ds01, ut01, $timeout, $location, $log) {
    var vm = this;
    
    //Lista de documentos
    find();
    vm.dets = new Array();

    //Agregar detalle
    vm.push = function(form) {
        if( form.$valid ) {
            vm.det.subtotal = vm.det.price*vm.det.quant;
            vm.dets.push(vm.det);
            totalizar();
            console.log("detalle agregado");
            console.log();
            vm.det = new Object();
        }
    }

    //Eliminar detalle
    vm.quit = function(key) {
        vm.dets.splice(key, 1);
        totalizar();
    }

    //Modificar detalle
    vm.showEditDetail = function(key) {
        vm.det = vm.dets[key];
        vm.key = key;
        angular.element(document.querySelector('#editDetail')).click();
    }

    //Actualizar detalle
    vm.updt = function(form){
        if( form.$valid ) {
            vm.dets[vm.key] = vm.det;
            totalizar();
            vm.det = new Object();
        }
    }

    vm.close = function( ) {
        vm.det = new Object();
    }

    //Crear documento
    vm.create = function(form) {
        if(form.$valid){
            if(vm.dets.length>0) {
                ds01.create(vm).success(function(data) {
                    vm.doc = new Object();
                    vm.dets = new Array();
                    find();
                })
                .error(function(data) {
                    $log.error('Error: ' + data);
                });
            }else{
                alert("Debe agregar al menos un detalle");
            }
        }
    }

    function find( ){
        ds01.find(vm).success(function(data) {
            vm.docs = data;
            console.log(data)
        })
        .error(function(data) {
            $log.error('Error: ' + data);
        });
    }

    function totalizar() {
        vm.doc.total = 0;
        vm.dets.forEach(function(det) {
            vm.doc.total += det.subtotal;
        }, this);
    }
}
