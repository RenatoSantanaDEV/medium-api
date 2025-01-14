const dotenv = require('dotenv');
const express = require('express');
const userRoutes = require('./src/routes/userRoutes.js');
const tokenRoutes = require('./src/routes/tokenRoutes.js');
const thumbnailRoutes = require('./src/routes/thumbnailRoutes.js');
const postRoutes = require('./src/routes/postRoutes.js');
const cors = require('cors');

dotenv.config();

require('./src/database');

class App{
    constructor(){
        this.app = express();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.json({ limit: "100mb" }));
        this.app.use(express.text({ limit: "100mb" }));
        this.app.use(express.urlencoded({ limit: "100mb", extended: true }));
    }
    routes() {
        this.app.use('/users', userRoutes);
        this.app.use('/tokens', tokenRoutes);
        this.app.use('/posts', postRoutes);
        this.app.use('/thumbnails', thumbnailRoutes);
    }
}

module.exports = new App().app;