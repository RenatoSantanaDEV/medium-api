const dotenv = require('dotenv')

dotenv.config();

module.exports = {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASSWORD,
    define: {
        timetamps: true,
        underscored: true,
        underscoredAll: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
    dialectOptions: {
        timezone: 'America/Sao_Paulo',
    },
    timezone: 'America/Sao_Paulo',
};
