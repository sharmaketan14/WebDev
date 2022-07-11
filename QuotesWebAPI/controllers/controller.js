//Retrieve Quotes Controller
const Quote = require('/home/sharmaketan14/Desktop/Codes/WebDevelopmentUdemy/BackEnd/QuotesWebAPI/models/models.js');

async function getQuotes(req,res,next){
    const randomQuote = await Quote.fetch();
    res.json({
        quote : randomQuote
    })
}

module.exports = getQuotes;