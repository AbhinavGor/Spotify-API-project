const express = require('express')
const cookieSession = require('cookie-session')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser');

const passport = require('passport')
require ('./passport')

const indexRouter = require('./routes/auth')
const userRouter = require('./routes/user')

const app = express()
const PORT = process.env.PORT || 3000

// Mongo Databse Connection
const mongoose = require("mongoose")
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(()=> {
    console.log("MONGO DB CONNECTED!")
}).catch((e)=>console.log("Cannot Connect to Mongo",e))

app.use(cookieSession({
    name: "spotify-auth-session",
    keys: ["key1", "key2"],
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    maxAge: 10*60*1000      //hours*min*sec*ms
}))

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use( express.static( "public" ) );

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '2mb'}));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
limit: '2mb',
extended: true
})); 

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', indexRouter)
app.use('/user', userRouter)

app.listen(PORT, () => console.log(`Server lisening to Kygo on port ${PORT}.`))