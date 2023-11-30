//Invocar o importar express
const express = require('express');
const app = express();

//permite caprurar los datos de nuestro formulario media urlncoded
app.use(express.urlencoded({extended:false}))
app.use(express.json());

//Invocar o importar dotenv
const dotenv = require('dotenv');
dotenv.config({path: './env/.env'});

//Directorio public
app.use('/', express.static('public'));
app.use('/', express.static(__dirname + '/public'));

//Establecer motor de plantillas ejs
app.set('view engine', 'ejs');

//Invocar bcryptjs
const bcryptjs = require('bcryptjs');

//Variables de sesion
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

//Invocar el modulo de conecxion de nuestra DB
const connection=require('./database/db')


/*
app.get('/',(req, res)=>{
    res.send('Hello World')
})*/
app.get('/', (req, res)=>{
    res.render('index');
})

app.get('/Login', (req, res)=>{
    res.render('Login');
})

app.get('/register', (req, res)=>{
    res.render('register');
})

//Register
app.post('/register', async(req, res)=>{
    const user= req.body.user;
    const name= req.body.name;
    const rol= req.body.rol;
    const pass= req.body.pass;
    let paswordHash= await bcryptjs.hash(pass, 8);
    connection.query ('INSERT INTO users SET ?', {
        user:user, name:name, rol:rol, pass:paswordHash
    }, async(error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.send('Successful Registration')
        }
    })
})

app.listen(3000, (req, res)=>{
    console.log('Server running on https://localhost:3000/');

})