const path = require('path');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


const port = 3000;

  ////////
// Import the functions you need from the SDKs you need
const  {initializeApp}  = require('firebase\\app') ;
const {getAnalytics}  = require('firebase\\analytics');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVXmvfTvqx-LmHr3EX0SbWxey915xV_wA",
  authDomain: "cakeshoponl-3904f.firebaseapp.com",
  projectId: "cakeshoponl-3904f",
  storageBucket: "cakeshoponl-3904f.appspot.com",
  messagingSenderId: "955002779189",
  appId: "1:955002779189:web:50cb3261b75de07f08e37c",
  measurementId: "G-6M7N00EKNS"
};

// Initialize Firebase
const apps = initializeApp(firebaseConfig);
const analytics = getAnalytics(apps);


///////
dotenv.config();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//template engine
app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources' ,'views'));

app.use('/public',express.static(path.join(__dirname, 'public')));
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
}));
app.use(cookieParser());

  app.use(function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-type');
    next();
  });

const route = require('./routes');

    route(app);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));



