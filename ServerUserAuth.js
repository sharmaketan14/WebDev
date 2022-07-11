const path = require('path');
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session");
const express = require('express');
const csrf = require('csurf');

const db = require('/home/sharmaketan14/Desktop/Codes/WebDevelopmentUdemy/BackEnd/UserAuthentication/data/database.js');
const demoRoutes = require('/home/sharmaketan14/Desktop/Codes/WebDevelopmentUdemy/BackEnd/UserAuthentication/routes/demo.js');
const req = require('express/lib/request');


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join('/home/sharmaketan14/Desktop/Codes/WebDevelopmentUdemy/BackEnd/UserAuthentication/views'));

app.use(express.static('/home/sharmaketan14/Desktop/Codes/WebDevelopmentUdemy/BackEnd/UserAuthentication/public'));
app.use(express.urlencoded({ extended: false }));

const mongodbsession = MongoDBStore(session);

const sessionStore = new mongodbsession({
  uri : "mongodb://localhost:27017",
  databaseName : "auth-demo",
  collection : "sessions"
})


app.use(session({
  secret : 'super-secret',
  resave: false,
  saveUninitialized : false,
  sameSite : 'lax',
  store:sessionStore
}))

app.use(csrf());

app.use( async function(req, res, next){
  const user = req.session.user;
  const isAuth = req.session.isAuthenticated;
  
  if(!user || !isAuth){
    return next();
  }
  
  const userDoc = await db.getDb().collection('signedUsers').findOne({_id : user.id});
  const isAdmin = userDoc.isAdmin;
  res.locals.isAdmin = isAdmin;
  res.locals.isAuth = isAuth;

  next();
})

app.use(demoRoutes);

app.use(function(error, req, res, next) {
  res.render('500');
})

db.connectToDatabase().then(function () {
  app.listen(3000);
});

