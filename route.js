const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');
const sessions = require('express-session');
const bcrypt = require('bcrypt');
const app = express();
const bodyParser =  require('body-parser');
const { bracket } = require('consolidate');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const moment = require('moment-timezone');

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

router.get('/', (req, res) => {
    res.render('home')
    
});

router.get('/product', (req, res) => {
    res.render('product');
    

});

router.get('/loggedIn_home', (req, res) => {
    res.render('loggedIn_home', {
        'username': req.app.get('username'),

    });
});

router.get('/loggedIn_product', (req, res) => {
    res.render('loggedIn_product', {
        'username': req.app.get('username'),
    })
});


router.get('/dashboard', (req, res) => {
    res.render('dashboard');
})

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

router.post('/authenticate',urlencodedParser, (req, res) => {
    let emailLogin = req.body.emailLogin;
    let passwordLogin = req.body.passwordLogin;

    if (emailLogin && passwordLogin) {
        const params = [emailLogin];

        const sql = "SELECT * FROM users WHERE email = ?";

        db.query(sql, params, (err, result) => {
            if (err) {
                throw err;
            }
            else {
                if (result.length == 0) {
                    req.app.set('error', 'Invalid email!')
                    res.redirect('/home')
                }
                else {
                    var hashedPassword = result[0].password;
                    var response = bcrypt.compareSync(passwordLogin, hashedPassword);

                    if (response == false) {
                        req.app.set('error', 'Password verification failed!')
                        res.redirect('/home')
                    }
                    else {
                        let username = result[0].username;
                        req.app.set('username', username)
                        res.redirect('/loggedIn_home');

                    }
                }
            }
        })
    }
});

router.post('/transaction', (req, res) => {
    const productId = req.body.product_id;
    const username = req.body.cart_user;
    const statusName = "for_checkout";
    const now = moment.tz('Asia/Manila');
    const transactionDate = now.format('YYYY-MM-DD HH:mm:ss');

    
    const user = {
        'username': username,
        'product_id': productId, 
        'transaction_date': transactionDate,
        'completion_date': null,
        'status': statusName,
    };

    const sql = 'INSERT INTO transactions SET ?';
    db.query(sql, user, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            res.redirect('/loggedIn_product');
        }
    }) 

});


module.exports = router;