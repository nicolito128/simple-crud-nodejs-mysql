const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();
const customerRoutes = require('./routes/customer');
const { urlencoded } = require('express');

// Settings
app.set('port', process.env.PORT || 3000);
// motor de plantillas a utilizar
app.set('view engine', 'ejs');
// path.join() concatena nuestra ruta actual con views
app.set('views', path.join(__dirname, 'views'));

// Middlewares
// Funciones que se ejecutan antes de que vengan las peticiones de los usuarios
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'crudnodejsmysql'
}, 'single'));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', customerRoutes);

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Running server
app.listen(3000, () => {
    console.log('Server on port 3000')
});
