const express = require('express');
const router = express.Router();
const db = require('/home/sharmaketan14/Desktop/Codes/WebDevelopmentUdemy/BackEnd/QuotesWebAPI/database/database.js');
const ct = require('/home/sharmaketan14/Desktop/Codes/WebDevelopmentUdemy/BackEnd/QuotesWebAPI/controllers/controller.js');
const getQuotes = require('/home/sharmaketan14/Desktop/Codes/WebDevelopmentUdemy/BackEnd/QuotesWebAPI/controllers/controller.js');

router.get('/',getQuotes)

module.exports = router;
