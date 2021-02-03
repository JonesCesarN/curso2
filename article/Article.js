const Sequelize = require('sequelize').Sequelize;
const conn = require('../database/database');
const Category = require('../categories/Category');

const Article = conn.define('articles', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})


Category.hasMany(Article); // UMA categoria TEM MUITOS artigos
Article.belongsTo(Category); // UM ARTIGO PERTENCE A UMA CATEGORIA

// Article.sync({force:true})

module.exports = Article;