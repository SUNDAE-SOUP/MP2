const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const PORT = 4000


//templating engine

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/static', express.static(path.join(__dirname, 'public')));
//images
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));




app.use('/', require('./route'));



app.listen(PORT, () => {
    console.log('All Goods at port ${PORT}')
})

module.exports = app