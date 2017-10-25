var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var auth = require('./auth');
var middleware = require('./middleware');
var fs = require('fs');

// Configuramos Express
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.set('port', 3000);

// Importamos nuestros modelos, 
// en este ejemplo nuestro modelo de usuario
//require('./models/user');

// Iniciamos las rutas de nuestro servidor/API
var router = express.Router();

//Pagina de inicio
router.get('/', function(req, res) {
    fs.readFile('client/views/index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
});

// Rutas de autenticación y login
router.post('/auth/signup', auth.emailSignup);
router.post('/auth/login', auth.emailLogin);

// Ruta solo accesible si estás autenticado
router.get('/private',middleware.ensureAuthenticated, function(req, res) {
    res.send("Tienes acceso");
} );

app.use(router);

// Comprobar errores siempre
app.listen(app.get('port'), function(){
    console.log('Express corriendo en http://localhost:3000');
});