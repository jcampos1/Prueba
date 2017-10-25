var service = require('./services');
var path = require('path');
var users = require(path.resolve(__dirname, 'user.json'));

exports.emailSignup = function(req, res) {
	var user = new User({
    	// Creamos el usuario con los campos
        // que definamos en el Schema
        // nombre, email, etc...
    });
    
    user.save(function(err){
    	return res
    		.status(200)
        	.send({token: service.createToken(user)});
    });
};

exports.emailLogin = function(req, res) {
    Object.keys(users).forEach(function(key) {
        users.forEach(function(user) {
            if ( req.body.username == user.username ){
                console.log("Usuario encontrado");
                if( req.body.password == user.password ) {
                    console.log("Contrasena correcta");
                    return res.status(200).send({token: service.createToken(user)});
                }else{
                    return res.status(401).send({error: "Unauthorized"});
                }
            }else{
                return res.status(404).send({error: "User not found"});
            }
        }, this);
    });
};