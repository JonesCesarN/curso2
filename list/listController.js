const express = require('express')
const router = express.Router();
const Category = require('../categories/Category')
const Article = require('../article/Article')

router.get('/list', (req, res) => {
    Category
        .findAll()
        .then(categories => {
            res.render('list/index', {categories: categories})
        })
})

module.exports = router