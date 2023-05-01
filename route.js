const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');
const sessions = require('express-session');
const bcrypt = require('bcrypt');
const app = express();
const bodyParser =  require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'JesusChri$t10',
    database: 'mmu'
})

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL is connected')
});

app.use(sessions({
    secret: '1234567890QWERT',
    resave: false,
    saveUninitialized: true
}));

router.get('/home', (req, res) => {
    res.render('index')
});

router.get('/product', (req, res) => {
    res.render('product')
})


module.exports = router;