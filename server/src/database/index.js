const Sequelize = require('sequelize');
const databaseConfig = require('../config/database.js');
const User = require('../models/Users.js');
const Post = require('../models/Posts.js');
const Like = require('../models/Likes.js');
const Thumbnail = require('../models/Thumbnails.js');

const models = [User, Post, Like, Thumbnail];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));