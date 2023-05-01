const express = require('express');
const app = express();
const path = require('path');
const conso = require('consolidate');

//templating engine

app.engine('html', conso.swig);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use('/static', express.static(path.join(__dirname, 'public')));
//images
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));




app.use('/', require('./route'));



app.listen(3000, () => {
    console.log('All Goods at port 3000')
})