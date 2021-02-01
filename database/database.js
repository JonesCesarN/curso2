const Sequelize = require('sequelize');

const conn = new Sequelize('guiapress','root','euesqueci',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = conn