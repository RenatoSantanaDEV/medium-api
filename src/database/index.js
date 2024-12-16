const Sequelize = require('sequelize');
const databaseConfig = require('../config/database.js');
const User = require('../models/Users.js');

const models = [User];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
