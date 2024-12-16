const dotenv = require('dotenv');
const express = require('express');
const userRoutes = require('./src/routes/userRoutes.js');
const tokenRoutes = require('./src/routes/tokenRoutes.js');

dotenv.config();

require('./src/database');
class App{
    constructor(){
        this.app = express();
        this.middlewares();
        this.routes();

    }
    middlewares() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());

    }
    routes() {
        this.app.use('/', userRoutes);
        this.app.use('/tokens', tokenRoutes);
    }
}

module.exports = new App().app;
