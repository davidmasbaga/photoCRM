const express = require('express');
const cors = require('cors');
const  {dBConnection} = require('../database/config')
class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/users';
        this.contactsPath = '/api/contacts';
        // this.invoices = '/api/invoices';        
        // this.leads = '/api/contacts';

        // Conectar Base de datos
        this.connectDB()

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async connectDB(){
        await dBConnection()
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        // this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.usuariosPath, require('../routes/users'));
        this.app.use( this.contactsPath, require('../routes/contacts'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('⚡ Server running at port', this.port );
        });
    }

}




module.exports = Server;
