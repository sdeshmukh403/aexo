const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize_connection');

var User = sequelize.define('users', {
    firstname:Sequelize.STRING,
    lastname:Sequelize.STRING,
    email:Sequelize.STRING,
    mobile_no:Sequelize.STRING,
    password:Sequelize.STRING,
    address:Sequelize.TEXT
});


module.exports = User;
