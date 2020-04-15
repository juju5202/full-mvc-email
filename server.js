const express = require ("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

require('dotenv').config({path:"./config/keys.env"});

const app = express();

// MIDDLEWARE - tell express to set HANDLEBARS as the template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//BODY - PARSER middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

//load controllers to app object(main)
const generalController = require("./controllers/general");
const productController = require("./controllers/product");

//map each controllers to the app object(main)
app.use("/", generalController);
app.use("/product", productController);


//sets up the server
const PORT = process.env.PORT;

app.listen(PORT,()=>{

    console.log(`web server running`);
});