//Se genera el id de la entidad
exports.generateId = function(array) {
    var id = 1;
    if(array.length > 0) {
        id = array[array.length-1].document_id+1;
    }
    return id;
};