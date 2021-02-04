//import externos (node_modules)
const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser') 

//import internos
const conn = require('./database/database') 

//controllers
const categoriesController = require('./categories/CategoriesController')
const articleController = require('./article/articlesController')
const listController = require('./list/listController')

//models
const Article = require('./article/Article');
const Category = require('./categories/Category');

// view engine
app.set('view engine', 'ejs');

// static
app.use(express.static('public'));

//body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DATABSE
conn
    .authenticate()
    .then(() => console.log("Conexao Efetuada"))
    .catch((err) => console.log('Erro ao conectao DATABASE '+err))


// rotas exports
app.use('/', categoriesController);
app.use('/', articleController);
app.use('/', listController);



// rotas
app.get('/', (req, res) =>{

    Article
        .findAll({
            order: [
                ['id', 'DESC']
            ]
        })
        .then(articles => {

            Category
                .findAll()
                .then(categories => {
                    res.render('index', {articles: articles, categories: categories});
                })
        })
});

app.get('/:slug', (req,res) => {
    var slug = req.params.slug;
    Article
        .findOne({
        where: {
            slug: slug
        }
        })
        .then(article => {
            if(article != undefined){
                Category
                .findAll()
                .then(categories => {
                    res.render('article', {article: article, categories: categories});
                })
            }else{
                res.redirect('/')
            }
        })
        .catch( err => {
            res.redirect('/')
        })
})

app.get('/category/:slug', (req,res) => {
    var slug = req.params.slug;
    Category
        .findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
        })
        .then( category => {
            if(category != undefined){

                Category
                    .findAll()
                    .then(categories => {
                        res.render('index', {articles: category.articles, categories})
                    })

            }else{
                res.redirect('/')
            }
        })
        .catch( err => {
            res.redirect('/')
        })
})


//teste adicionado


// iniciar servidor
const PORT = 8080
app.listen(PORT, (err) => {

    if(err) console.log('ocorreu um erro')
    else console.log('Servidor iniciado http://localhost:'+PORT)

})

