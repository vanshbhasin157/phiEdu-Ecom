const Sequelize = require("sequelize");
const dbConfig = require("../Database/primarySQL.js");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

database = {};

database.Sequelize = Sequelize;
database.sequelize = sequelize;
const { users } = require("./user.js");
database.users = users(sequelize, Sequelize);
module.exports = {
    database
}