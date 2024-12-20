const dotenv = require('dotenv');
const express = require('express');
const userRoutes = require('./src/routes/userRoutes.js');
const tokenRoutes = require('./src/routes/tokenRoutes.js');
const postRoutes = require('./src/routes/postRoutes.js');

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
        this.app.use('/users', userRoutes);
        this.app.use('/tokens', tokenRoutes);
        this.app.use('/posts', postRoutes);
    }
}

module.exports = new App().app;