const express = require('express');
const app = express();
const db = require('/home/sharmaketan14/Desktop/Codes/WebDevelopmentUdemy/BackEnd/QuotesWebAPI/database/database.js');
const routes = require('/home/sharmaketan14/Desktop/Codes/WebDevelopmentUdemy/BackEnd/QuotesWebAPI/routes/routes.js');
const middlewares = require('/home/sharmaketan14/Desktop/Codes/WebDevelopmentUdemy/BackEnd/QuotesWebAPI/middlewares/middleware.js');


app.use(express.urlencoded({extended: false}))


app.use('/',routes)

app.use(middlewares)

db.connectToDatabase().then(function(){
    app.listen(3000);
})
