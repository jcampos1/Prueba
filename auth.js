var service = require('./services');

var users = [
        {"username": "jcampos1","password": "jc1","nombre": "Junior Campos"},
        {"username": "fsilva","password": "fs","nombre": "Francisco Silva"}
    ];

exports.emailLogin = function(req, res) {
    var st = 404;
    var obj = Object();
    obj.error =  "User not found";
    console.log("usuario a buscar: "+req.body.username);
    console.log("contrasena a buscar: "+req.body.password);
    users.forEach(function(user) {
        console.log(user);
        if ( req.body.username == user.username ){
            console.log("Usuario encontrado");
            if( req.body.password == user.password ) {
                console.log("Contrasena correcta");
                st = 200;
                obj.token = service.createToken(user);
            }else{
                console.log("Contrasena incorrecta");
                st = 401;
                obj.error = "Unauthorized";
            }
        }
    }, this);
    return res.status(st).send(obj);
};