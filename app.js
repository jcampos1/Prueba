var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var auth = require('./auth');
var document = require('./controllers/document');
var middleware = require('./middleware');
var fs = require('fs');

// Configuramos Express
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.set('port', 3000);

app.use('/bower_Components', express.static('bower_Components'));
app.use('/client', express.static('client'));

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

// Rutas
router.post('/auth/login', auth.emailLogin);
router.get('/api/documents',middleware.ensureAuthenticated, document.list);
router.post('/api/documents',middleware.ensureAuthenticated, document.create);

app.use(router);

// Comprobar errores siempre
app.listen(app.get('port'), function(){
    console.log('Express corriendo en http://localhost:3000');
});