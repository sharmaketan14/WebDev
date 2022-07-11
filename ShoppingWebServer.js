const express = require('express');
const path = require('path')
const csrf = require('csurf');
const app = express();
const expressSession = require('express-session');

const csrfMidlleware = require('./WebDevelopmentUdemy/ShoppingWebsite/middlewares_general/csrf.middleware')
const errorHandler = require('./WebDevelopmentUdemy/ShoppingWebsite/middlewares_general/errorHandlerMiddleware')
const sessionMiddleware = require('./WebDevelopmentUdemy/ShoppingWebsite/middlewares_general/createSessionMiddleware')
const db = require('./WebDevelopmentUdemy/ShoppingWebsite/data/database');
const authRoutes = require('./WebDevelopmentUdemy/ShoppingWebsite/routes/auth.routes');
const baseRoutes = require('./WebDevelopmentUdemy/ShoppingWebsite/routes/base.routes');
const productRoutes = require('./WebDevelopmentUdemy/ShoppingWebsite/routes/products.routes');
const CreateSessionConfig = require('./WebDevelopmentUdemy/ShoppingWebsite/middlewares_general/createSessionMiddleware');


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'WebDevelopmentUdemy','ShoppingWebsite','views'));

app.use(express.urlencoded({extended : false}));
app.use(express.static('/home/sharmaketan14/Desktop/Codes/WebDevelopmentUdemy/ShoppingWebsite/public'));

const sessionConfig = CreateSessionConfig();
app.use(expressSession(sessionConfig));
app.use(csrf());
app.use(csrfMidlleware);

app.use(async (req, res, next) => {
    const id = req.session._id;
    const user = db.getDb().collection('users').findOne({_id : id});
    const isAuth = req.session.isAuth;

    if(!user || !isAuth){
        return next();
    }
    res.locals.isAuth = isAuth;
    next();
})

app.use(baseRoutes);
app.use(productRoutes);
app.use(authRoutes);

//app.use(errorHandler);
db.connectToDatabase().then(function (){
    app.listen(3000);
}).catch((error) => {
    console.log("Failed to connect to database!")
    console.log(error);
})

