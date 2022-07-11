const express = require('express');
const bcrypt = require('bcryptjs');
const session = require("express-session");
const db = require('../data/database');
const res = require('express/lib/response');
const { render } = require('express/lib/response');


const router = express.Router();



router.get('/', function (req, res) {
  res.render('welcome');
});

router.get('/signup', function (req, res) {
  let sessiondata = req.session.inputData;
  const csrfToken = req.csrfToken();
  if (!sessiondata) {
    sessiondata = {
      hasError : false,
      email : '',
      con_email : '',
      pass : ''
    }
  }

  req.session.inputData = null;
 
  res.render('signup', {inputData : sessiondata, csrfToken:csrfToken})
});

router.get('/login', function (req, res) {
  res.render('login');
});

router.post('/signup', async function (req, res) {
  
  const enteredEmail = req.body.email;
  let ConfirmEmail = req.body.confirmemail;
  const enteredPassword = req.body.password
  const hashedPassword = await bcrypt.hash(enteredPassword, 12);
  console.log(hashedPassword)
  console.log(enteredEmail, enteredPassword)
  const data = {
    email: enteredEmail,
    password: hashedPassword
  }
  ConfirmEmail = data['email'];
  const alreadyEmail = await db.getDb().collection('signedUsers').findOne({ email: enteredEmail })
  console.log(alreadyEmail)
  if (!enteredEmail || !enteredPassword || enteredPassword.lenght < 6 || ConfirmEmail !== enteredEmail || alreadyEmail) {
    req.session.inputData = {
      hasError : true,
      message : "Input Data is Invalid -- Please Check",
      email : enteredEmail,
      con_email : ConfirmEmail,
      pass : enteredPassword
    }

    req.session.save(() => {
      res.redirect("/signup")
    })
    return;
    console.log("Could Not Sign Up!");
  }

  await db.getDb().collection('signedUsers').insertOne(data);
  res.redirect("/login");
});

router.post('/login', async function (req, res) {
  const enteredEmail = req.body.email;
  const enteredPassword = req.body.password
  const hashedPassword = await bcrypt.hash(enteredPassword, 12);
  console.log(hashedPassword)
  console.log(enteredEmail, enteredPassword)
  const data = {
    email: enteredEmail,
    password: hashedPassword
  }
  const alreadyEmail = await db.getDb().collection('signedUsers').findOne({ email: enteredEmail });
  const existingUser = await db.getDb().collection('signedUsers').findOne();
  console.log(alreadyEmail)

  if (!alreadyEmail) {
    console.log("Could Not Log In! -- Email Does Not Exists")
    res.redirect("/login");
    return;
  }
  const existingPass = alreadyEmail.password;
  const passwordEqual = await bcrypt.compare(enteredPassword, alreadyEmail.password);

  if (!passwordEqual) {
    console.log("Could Not Log In! -- Password Don't Match")
    res.redirect("/login");
    return;
  }
  req.session.user = { id: alreadyEmail._id, email: alreadyEmail.email, admin:existingUser.isAdmin };
  req.session.isAuthenticated = true;
  req.session.save(() => {
    res.redirect('/profile')
  })

});

router.get('/admin', async function (req, res) {
  if (!req.session.isAuthenticated) {
    return res.status(401).render('401');
  }

  // const user = await db.getDb().collection('signedUsers').findOne({_id: req.session.user.id});

  // if(!user || !user.admin){
  //   render('403')
  // }
  res.render('admin');
  
});

router.get('/profile', function (req, res) {
  if (!req.session.isAuthenticated) {
    return res.status(401).render('401');
  }
  res.render('profile');
  
  return;
});

router.post('/logout', function (req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect('/')
});

module.exports = router;
