//import externos (node_modules)
const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser') 

//import internos
const conn = require('./database/database') 
const categoriesController = require('./categories/CategoriesController')
const articleController = require('./article/articlesController')

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



// rotas
app.get('/', (req, res) =>{
    res.render('index')
});

//teste adicionado


// iniciar servidor
const PORT = 8080
app.listen(PORT, (err) => {

    if(err) console.log('ocorreu um erro')
    else console.log('Servidor iniciado http://localhost:'+PORT)

})

