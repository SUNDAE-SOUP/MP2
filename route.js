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
    res.render('home')
    
});

router.get('/product', (req, res) => {
    res.render('product');
    

});

router.post('/home', urlencodedParser, (req, res) => {
    const email = req.body.emailsignup;
    const username = req.body.namesignup;
    const password = req.body.passwordsignup;
    const role_name = 'user';

    let encryptedPassword = bcrypt.hashSync(password, salt)

    const user = {'email': email, 'username': username, 'password': encryptedPassword, 'role_name': role_name};
    const sql = "INSERT INTO users SET ?";
    db.query(sql, user, (err, result) => {
        if (err) {
        console.error(err);
        res.status(500).send("Error inserting user into database");
        } 
        else {
            res.render('loggedIn_home', {
                'username': username,
            })     
        }
    });
});




module.exports = router;